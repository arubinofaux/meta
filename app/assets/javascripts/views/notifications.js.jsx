/** @jsx React.DOM */
$(document).ready(function() {

var NotificationsList = React.createClass({
  render: function() {
    var productNodes = this.props.data.map(function(entry){
      badge = null;
      if (entry.count > 0) {
        badge = <span className="badge pull-right">{entry.count}</span>
      }

      var url = entry.product.url + '/discuss';

      return <li key={entry.product.slug}>
        <a href={url}>{badge} {entry.product.name}</a>
      </li>
    });

    var productsPath = '/users/'+this.props.username;
    return (
      <ul className="dropdown-menu">
        {productNodes}
        <li className="divider" />
        <li><a href={productsPath}>All Products</a></li>
      </ul>
    );
  }
});

var Notifications = React.createClass({
  getInitialState: function() {
    return { data: [] }
  },
  total: function() {
    var count = _.countBy(this.state.data, function(entry){ return entry.count > 0 });
    return count.true;
  },
  sortByCount: function() {
    return _.sortBy(this.state.data, function(entry){ return -entry.count; });
  },
  fetchNotifications: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentWillMount: function() {
    var _this = this;
    var debouncedFetch = _.debounce(this.fetchNotifications, 1000);

    $(document).bind('readraptor.tracked', debouncedFetch);
    this.onPush(function(event) {
      if (_.contains(event.mentions, _this.props.username)) {
        _this.desktopNotify(event);
      }
      debouncedFetch();
    });
    window.visibility(function(visible) {
      if (visible) { debouncedFetch(); }
    });
    debouncedFetch();
  },
  onPush: function(fn) {
    if (window.pusher) {
      channel = window.pusher.subscribe('@'+this.props.username);
      channel.bind('chat', fn);
    }
  },
  desktopNotify: function(event) {
    var n = new Notify("New message on " + (event.wip.product_name), {
      body: (event.actor.username + ": " + event.body_sanitized),
      icon: 'https://d8izdk6bl4gbi.cloudfront.net/80x/http://f.cl.ly/items/1I2a1j0M0w0V2p3C3Q0M/Assembly-Twitter-Avatar.png',
      timeout: 10,
      notifyClick: function() {
        $(window).focus();
        if (window.app.wip.id != event.wip.id) {
          window.app.redirectTo(event.wip.url);
        }
      }
    });
    return n.show();
  },

  render: function() {
    badge = null;
    var classes = "glyphicon glyphicon-bell";
    var total = this.total();
    if (total > 0) {
      badge = <span className="badge">{total}</span>
      classes += " glyphicon-highlight";
    }

    var sorted = this.sortByCount(this.state.data)
    return (
      <ul className="nav navbar-nav navbar-notifications js-notifications">
        <li>
          <a href="#notifications" data-toggle="dropdown">
            <span className={classes}></span>
            {badge}
          </a>
          <NotificationsList data={sorted} username={this.props.username} />
        </li>
      </ul>
    );
  }
});

var url = $('meta[name=unread-url]').attr('content');
var username = $('meta[name=user-username]').attr('content');
var el = document.getElementById('js-notifications');
if(el) {
  React.renderComponent(
    <Notifications url={url} username={username} />,
    document.getElementById('js-notifications')
  )
}
});

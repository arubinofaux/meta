/** @jsx React.DOM */

describe('TagList', function() {
  var TagList = require.requireActual(pathToFile('components/tag_list.js.jsx'));
  var Dispatcher = require(pathToFile('dispatcher'));

  it('renders a default TagList', function() {
    var tagList = TestUtils.renderIntoDocument(
      <TagList
          destination={false}
          tags={["one", "two", "three"]} />
    );

    var tags = TestUtils.scryRenderedDOMComponentsWithTag(tagList, 'li');

    expect(tagList.state.tags).toEqual(["one", "two", "three"]);
    expect(tags.length).toEqual(3);
  });

  describe('tags()', function() {
    it('returns a list of tags styled by whether or not they have been added');
  });
});

/*!
* Masonry PACKAGED v3.1.5
* Cascading grid layout library
* http://masonry.desandro.com
* MIT License
* by David DeSandro
*/

!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c(a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(this),function(a){function b(a){"function"==typeof a&&(b.isReady?a():f.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==e.readyState;if(!b.isReady&&!c){b.isReady=!0;for(var d=0,g=f.length;g>d;d++){var h=f[d];h()}}}function d(d){return d.bind(e,"DOMContentLoaded",c),d.bind(e,"readystatechange",c),d.bind(a,"load",c),b}var e=a.document,f=[];b.isReady=!1,"function"==typeof define&&define.amd?(b.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],d)):a.docReady=d(a.eventie)}(this),function(){function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:this.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function c(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}return a}function d(a){function d(a){if("string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var d=f(a);if("none"===d.display)return c();var e={};e.width=a.offsetWidth,e.height=a.offsetHeight;for(var k=e.isBorderBox=!(!j||!d[j]||"border-box"!==d[j]),l=0,m=g.length;m>l;l++){var n=g[l],o=d[n];o=h(a,o);var p=parseFloat(o);e[n]=isNaN(p)?0:p}var q=e.paddingLeft+e.paddingRight,r=e.paddingTop+e.paddingBottom,s=e.marginLeft+e.marginRight,t=e.marginTop+e.marginBottom,u=e.borderLeftWidth+e.borderRightWidth,v=e.borderTopWidth+e.borderBottomWidth,w=k&&i,x=b(d.width);x!==!1&&(e.width=x+(w?0:q+u));var y=b(d.height);return y!==!1&&(e.height=y+(w?0:r+v)),e.innerWidth=e.width-(q+u),e.innerHeight=e.height-(r+v),e.outerWidth=e.width+s,e.outerHeight=e.height+t,e}}function h(a,b){if(e||-1===b.indexOf("%"))return b;var c=a.style,d=c.left,f=a.runtimeStyle,g=f&&f.left;return g&&(f.left=a.currentStyle.left),c.left=b,b=c.pixelLeft,c.left=d,g&&(f.left=g),b}var i,j=a("boxSizing");return function(){if(j){var a=document.createElement("div");a.style.width="200px",a.style.padding="1px 2px 3px 4px",a.style.borderStyle="solid",a.style.borderWidth="1px 2px 3px 4px",a.style[j]="border-box";var c=document.body||document.documentElement;c.appendChild(a);var d=f(a);i=200===b(d.width),c.removeChild(a)}}(),d}var e=a.getComputedStyle,f=e?function(a){return e(a,null)}:function(a){return a.currentStyle},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],d):"object"==typeof exports?module.exports=d(require("get-style-property")):a.getSize=d(a.getStyleProperty)}(window),function(a,b){function c(a,b){return a[h](b)}function d(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function e(a,b){d(a);for(var c=a.parentNode.querySelectorAll(b),e=0,f=c.length;f>e;e++)if(c[e]===a)return!0;return!1}function f(a,b){return d(a),c(a,b)}var g,h=function(){if(b.matchesSelector)return"matchesSelector";for(var a=["webkit","moz","ms","o"],c=0,d=a.length;d>c;c++){var e=a[c],f=e+"MatchesSelector";if(b[f])return f}}();if(h){var i=document.createElement("div"),j=c(i,"div");g=j?c:f}else g=e;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return g}):window.matchesSelector=g}(this,Element.prototype),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){for(var b in a)return!1;return b=null,!0}function d(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function e(a,e,f){function h(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}var i=f("transition"),j=f("transform"),k=i&&j,l=!!f("perspective"),m={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[i],n=["transform","transition","transitionDuration","transitionProperty"],o=function(){for(var a={},b=0,c=n.length;c>b;b++){var d=n[b],e=f(d);e&&e!==d&&(a[d]=e)}return a}();b(h.prototype,a.prototype),h.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},h.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},h.prototype.getSize=function(){this.size=e(this.element)},h.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=o[c]||c;b[d]=a[c]}},h.prototype.getPosition=function(){var a=g(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=parseInt(a[c?"left":"right"],10),f=parseInt(a[d?"top":"bottom"],10);e=isNaN(e)?0:e,f=isNaN(f)?0:f;var h=this.layout.size;e-=c?h.paddingLeft:h.paddingRight,f-=d?h.paddingTop:h.paddingBottom,this.position.x=e,this.position.y=f},h.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={};b.isOriginLeft?(c.left=this.position.x+a.paddingLeft+"px",c.right=""):(c.right=this.position.x+a.paddingRight+"px",c.left=""),b.isOriginTop?(c.top=this.position.y+a.paddingTop+"px",c.bottom=""):(c.bottom=this.position.y+a.paddingBottom+"px",c.top=""),this.css(c),this.emitEvent("layout",[this])};var p=l?function(a,b){return"translate3d("+a+"px, "+b+"px, 0)"}:function(a,b){return"translate("+a+"px, "+b+"px)"};h.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={},k=this.layout.options;h=k.isOriginLeft?h:-h,i=k.isOriginTop?i:-i,j.transform=p(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},h.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},h.prototype.moveTo=k?h.prototype._transitionTo:h.prototype.goTo,h.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},h.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},h.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var q=j&&d(j)+",opacity";h.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:q,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(m,this,!1))},h.prototype.transition=h.prototype[i?"_transition":"_nonTransition"],h.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},h.prototype.onotransitionend=function(a){this.ontransitionend(a)};var r={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};h.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,d=r[a.propertyName]||a.propertyName;if(delete b.ingProperties[d],c(b.ingProperties)&&this.disableTransition(),d in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[d]),d in b.onEnd){var e=b.onEnd[d];e.call(this),delete b.onEnd[d]}this.emitEvent("transitionEnd",[this])}},h.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(m,this,!1),this.isTransitioning=!1},h.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var s={transitionProperty:"",transitionDuration:""};return h.prototype.removeTransitionStyles=function(){this.css(s)},h.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},h.prototype.remove=function(){if(!i||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.on("transitionEnd",function(){return a.removeElem(),!0}),this.hide()},h.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options;this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0})},h.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options;this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},h.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},h}var f=a.getComputedStyle,g=f?function(a){return f(a,null)}:function(a){return a.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],e):(a.Outlayer={},a.Outlayer.Item=e(a.EventEmitter,a.getSize,a.getStyleProperty))}(window),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){return"[object Array]"===l.call(a)}function d(a){var b=[];if(c(a))b=a;else if(a&&"number"==typeof a.length)for(var d=0,e=a.length;e>d;d++)b.push(a[d]);else b.push(a);return b}function e(a,b){var c=n(b,a);-1!==c&&b.splice(c,1)}function f(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()}function g(c,g,l,n,o,p){function q(a,c){if("string"==typeof a&&(a=h.querySelector(a)),!a||!m(a))return void(i&&i.error("Bad "+this.constructor.namespace+" element: "+a));this.element=a,this.options=b({},this.constructor.defaults),this.option(c);var d=++r;this.element.outlayerGUID=d,s[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var r=0,s={};return q.namespace="outlayer",q.Item=p,q.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},b(q.prototype,l.prototype),q.prototype.option=function(a){b(this.options,a)},q.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),b(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},q.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},q.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},q.prototype._filterFindItemElements=function(a){a=d(a);for(var b=this.options.itemSelector,c=[],e=0,f=a.length;f>e;e++){var g=a[e];if(m(g))if(b){o(g,b)&&c.push(g);for(var h=g.querySelectorAll(b),i=0,j=h.length;j>i;i++)c.push(h[i])}else c.push(g)}return c},q.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},q.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},q.prototype._init=q.prototype.layout,q.prototype._resetLayout=function(){this.getSize()},q.prototype.getSize=function(){this.size=n(this.element)},q.prototype._getMeasurement=function(a,b){var c,d=this.options[a];d?("string"==typeof d?c=this.element.querySelector(d):m(d)&&(c=d),this[a]=c?n(c)[b]:d):this[a]=0},q.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},q.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},q.prototype._layoutItems=function(a,b){function c(){d.emitEvent("layoutComplete",[d,a])}var d=this;if(!a||!a.length)return void c();this._itemsOn(a,"layout",c);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f],i=this._getItemLayoutPosition(h);i.item=h,i.isInstant=b||h.isLayoutInstant,e.push(i)}this._processLayoutQueue(e)},q.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},q.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},q.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},q.prototype._postLayout=function(){this.resizeContainer()},q.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},q.prototype._getContainerSize=k,q.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},q.prototype._itemsOn=function(a,b,c){function d(){return e++,e===f&&c.call(g),!0}for(var e=0,f=a.length,g=this,h=0,i=a.length;i>h;h++){var j=a[h];j.on(b,d)}},q.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},q.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},q.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},q.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e(d,this.stamps),this.unignore(d)}},q.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=d(a)):void 0},q.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},q.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},q.prototype._manageStamp=k,q.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,d=n(a),e={left:b.left-c.left-d.marginLeft,top:b.top-c.top-d.marginTop,right:c.right-b.right-d.marginRight,bottom:c.bottom-b.bottom-d.marginBottom};return e},q.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},q.prototype.bindResize=function(){this.isResizeBound||(c.bind(a,"resize",this),this.isResizeBound=!0)},q.prototype.unbindResize=function(){this.isResizeBound&&c.unbind(a,"resize",this),this.isResizeBound=!1},q.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},q.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},q.prototype.needsResizeLayout=function(){var a=n(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},q.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},q.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},q.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},q.prototype.reveal=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.reveal()}},q.prototype.hide=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.hide()}},q.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},q.prototype.getItems=function(a){if(a&&a.length){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c],f=this.getItem(e);f&&b.push(f)}return b}},q.prototype.remove=function(a){a=d(a);var b=this.getItems(a);if(b&&b.length){this._itemsOn(b,"remove",function(){this.emitEvent("removeComplete",[this,b])});for(var c=0,f=b.length;f>c;c++){var g=b[c];g.remove(),e(g,this.items)}}},q.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize(),delete this.element.outlayerGUID,j&&j.removeData(this.element,this.constructor.namespace)},q.data=function(a){var b=a&&a.outlayerGUID;return b&&s[b]},q.create=function(a,c){function d(){q.apply(this,arguments)}return Object.create?d.prototype=Object.create(q.prototype):b(d.prototype,q.prototype),d.prototype.constructor=d,d.defaults=b({},q.defaults),b(d.defaults,c),d.prototype.settings={},d.namespace=a,d.data=q.data,d.Item=function(){p.apply(this,arguments)},d.Item.prototype=new p,g(function(){for(var b=f(a),c=h.querySelectorAll(".js-"+b),e="data-"+b+"-options",g=0,k=c.length;k>g;g++){var l,m=c[g],n=m.getAttribute(e);try{l=n&&JSON.parse(n)}catch(o){i&&i.error("Error parsing "+e+" on "+m.nodeName.toLowerCase()+(m.id?"#"+m.id:"")+": "+o);continue}var p=new d(m,l);j&&j.data(m,a,p)}}),j&&j.bridget&&j.bridget(a,d),d},q.Item=p,q}var h=a.document,i=a.console,j=a.jQuery,k=function(){},l=Object.prototype.toString,m="object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1===a.nodeType&&"string"==typeof a.nodeName},n=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],g):a.Outlayer=g(a.eventie,a.docReady,a.EventEmitter,a.getSize,a.matchesSelector,a.Outlayer.Item)}(window),function(a){function b(a,b){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}var c=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++){var e=a[c];if(e===b)return c}return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],b):a.Masonry=b(a.Outlayer,a.getSize)}(window);;/*! Magnific Popup - v0.9.9 - 2014-09-06
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2014 Dmitry Semenov; */
;(function($) {

	/*>>core*/
	/**
	*
	* Magnific Popup Core JS file
	*
	*/


	/**
	* Private static constants
	*/
	var CLOSE_EVENT = 'Close',
	BEFORE_CLOSE_EVENT = 'BeforeClose',
	AFTER_CLOSE_EVENT = 'AfterClose',
	BEFORE_APPEND_EVENT = 'BeforeAppend',
	MARKUP_PARSE_EVENT = 'MarkupParse',
	OPEN_EVENT = 'Open',
	CHANGE_EVENT = 'Change',
	NS = 'mfp',
	EVENT_NS = '.' + NS,
	READY_CLASS = 'mfp-ready',
	REMOVING_CLASS = 'mfp-removing',
	PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


	/**
	* Private vars
	*/
	var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
	MagnificPopup = function(){},
	_isJQ = !!(window.jQuery),
	_prevStatus,
	_window = $(window),
	_body,
	_document,
	_prevContentType,
	_wrapClasses,
	_currPopupType;


	/**
	* Private functions
	*/
	var _mfpOn = function(name, f) {
		mfp.ev.on(NS + name + EVENT_NS, f);
	},
	_getEl = function(className, appendTo, html, raw) {
		var el = document.createElement('div');
		el.className = 'mfp-'+className;
		if(html) {
			el.innerHTML = html;
		}
		if(!raw) {
			el = $(el);
			if(appendTo) {
				el.appendTo(appendTo);
			}
		} else if(appendTo) {
			appendTo.appendChild(el);
		}
		return el;
	},
	_mfpTrigger = function(e, data) {
		mfp.ev.triggerHandler(NS + e, data);

		if(mfp.st.callbacks) {
			// converts "mfpEventName" to "eventName" callback and triggers it if it's present
			e = e.charAt(0).toLowerCase() + e.slice(1);
			if(mfp.st.callbacks[e]) {
				mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
			}
		}
	},
	_getCloseBtn = function(type) {
		if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
			mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
			_currPopupType = type;
		}
		return mfp.currTemplate.closeBtn;
	},
	// Initialize Magnific Popup only when called at least once
	_checkInstance = function() {
		if(!$.magnificPopup.instance) {
			mfp = new MagnificPopup();
			mfp.init();
			$.magnificPopup.instance = mfp;
		}
	},
	// CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
	supportsTransitions = function() {
		var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
		v = ['ms','O','Moz','Webkit']; // 'v' for vendor

		if( s['transition'] !== undefined ) {
			return true;
		}

		while( v.length ) {
			if( v.pop() + 'Transition' in s ) {
				return true;
			}
		}

		return false;
	};



	/**
	* Public functions
	*/
	MagnificPopup.prototype = {

		constructor: MagnificPopup,

		/**
		* Initializes Magnific Popup plugin.
		* This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
		*/
		init: function() {
			var appVersion = navigator.appVersion;
			mfp.isIE7 = appVersion.indexOf("MSIE 7.") !== -1;
			mfp.isIE8 = appVersion.indexOf("MSIE 8.") !== -1;
			mfp.isLowIE = mfp.isIE7 || mfp.isIE8;
			mfp.isAndroid = (/android/gi).test(appVersion);
			mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
			mfp.supportsTransition = supportsTransitions();

			// We disable fixed positioned lightbox on devices that don't handle it nicely.
			// If you know a better way of detecting this - let me know.
			mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
			_document = $(document);

			mfp.popupsCache = {};
		},

		/**
		* Opens popup
		* @param  data [description]
		*/
		open: function(data) {

			if(!_body) {
				_body = $(document.body);
			}

			var i;

			if(data.isObj === false) {
				// convert jQuery collection to array to avoid conflicts later
				mfp.items = data.items.toArray();

				mfp.index = 0;
				var items = data.items,
				item;
				for(i = 0; i < items.length; i++) {
					item = items[i];
					if(item.parsed) {
						item = item.el[0];
					}
					if(item === data.el[0]) {
						mfp.index = i;
						break;
					}
				}
			} else {
				mfp.items = $.isArray(data.items) ? data.items : [data.items];
				mfp.index = data.index || 0;
			}

			// if popup is already opened - we just update the content
			if(mfp.isOpen) {
				mfp.updateItemHTML();
				return;
			}

			mfp.types = [];
			_wrapClasses = '';
			if(data.mainEl && data.mainEl.length) {
				mfp.ev = data.mainEl.eq(0);
			} else {
				mfp.ev = _document;
			}

			if(data.key) {
				if(!mfp.popupsCache[data.key]) {
					mfp.popupsCache[data.key] = {};
				}
				mfp.currTemplate = mfp.popupsCache[data.key];
			} else {
				mfp.currTemplate = {};
			}



			mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data );
			mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

			if(mfp.st.modal) {
				mfp.st.closeOnContentClick = false;
				mfp.st.closeOnBgClick = false;
				mfp.st.showCloseBtn = false;
				mfp.st.enableEscapeKey = false;
			}


			// Building markup
			// main containers are created only once
			if(!mfp.bgOverlay) {

				// Dark overlay
				mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
					mfp.close();
				});

				mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
					if(mfp._checkIfClose(e.target)) {
						mfp.close();
					}
				});

				mfp.container = _getEl('container', mfp.wrap);
			}

			mfp.contentContainer = _getEl('content');
			if(mfp.st.preloader) {
				mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
			}


			// Initializing modules
			var modules = $.magnificPopup.modules;
			for(i = 0; i < modules.length; i++) {
				var n = modules[i];
				n = n.charAt(0).toUpperCase() + n.slice(1);
				mfp['init'+n].call(mfp);
			}
			_mfpTrigger('BeforeOpen');


			if(mfp.st.showCloseBtn) {
				// Close button
				if(!mfp.st.closeBtnInside) {
					mfp.wrap.append( _getCloseBtn() );
				} else {
					_mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
						values.close_replaceWith = _getCloseBtn(item.type);
					});
					_wrapClasses += ' mfp-close-btn-in';
				}
			}

			if(mfp.st.alignTop) {
				_wrapClasses += ' mfp-align-top';
			}



			if(mfp.fixedContentPos) {
				mfp.wrap.css({
					overflow: mfp.st.overflowY,
					overflowX: 'hidden',
					overflowY: mfp.st.overflowY
				});
			} else {
				mfp.wrap.css({
					top: _window.scrollTop(),
					position: 'absolute'
				});
			}
			if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
				mfp.bgOverlay.css({
					height: _document.height(),
					position: 'absolute'
				});
			}



			if(mfp.st.enableEscapeKey) {
				// Close on ESC key
				_document.on('keyup' + EVENT_NS, function(e) {
					if(e.keyCode === 27) {
						mfp.close();
					}
				});
			}

			_window.on('resize' + EVENT_NS, function() {
				mfp.updateSize();
			});


			if(!mfp.st.closeOnContentClick) {
				_wrapClasses += ' mfp-auto-cursor';
			}

			if(_wrapClasses)
				mfp.wrap.addClass(_wrapClasses);


				// this triggers recalculation of layout, so we get it once to not to trigger twice
				var windowHeight = mfp.wH = _window.height();


				var windowStyles = {};

				if( mfp.fixedContentPos ) {
					if(mfp._hasScrollBar(windowHeight)){
						var s = mfp._getScrollbarSize();
						if(s) {
							windowStyles.marginRight = s;
						}
					}
				}

				if(mfp.fixedContentPos) {
					if(!mfp.isIE7) {
						windowStyles.overflow = 'hidden';
					} else {
						// ie7 double-scroll bug
						$('body, html').css('overflow', 'hidden');
					}
				}



				var classesToadd = mfp.st.mainClass;
				if(mfp.isIE7) {
					classesToadd += ' mfp-ie7';
				}
				if(classesToadd) {
					mfp._addClassToMFP( classesToadd );
				}

				// add content
				mfp.updateItemHTML();

				_mfpTrigger('BuildControls');

				// remove scrollbar, add margin e.t.c
				$('html').css(windowStyles);

				// add everything to DOM
				mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || _body );

				// Save last focused element
				mfp._lastFocusedEl = document.activeElement;

				// Wait for next cycle to allow CSS transition
				setTimeout(function() {

					if(mfp.content) {
						mfp._addClassToMFP(READY_CLASS);
						mfp._setFocus();
					} else {
						// if content is not defined (not loaded e.t.c) we add class only for BG
						mfp.bgOverlay.addClass(READY_CLASS);
					}

					// Trap the focus in popup
					_document.on('focusin' + EVENT_NS, mfp._onFocusIn);

				}, 16);

				mfp.isOpen = true;
				mfp.updateSize(windowHeight);
				_mfpTrigger(OPEN_EVENT);

				return data;
			},

			/**
			* Closes the popup
			*/
			close: function() {
				if(!mfp.isOpen) return;
				_mfpTrigger(BEFORE_CLOSE_EVENT);

				mfp.isOpen = false;
				// for CSS3 animation
				if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
					mfp._addClassToMFP(REMOVING_CLASS);
					setTimeout(function() {
						mfp._close();
					}, mfp.st.removalDelay);
				} else {
					mfp._close();
				}
			},

			/**
			* Helper for close() function
			*/
			_close: function() {
				_mfpTrigger(CLOSE_EVENT);

				var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

				mfp.bgOverlay.detach();
				mfp.wrap.detach();
				mfp.container.empty();

				if(mfp.st.mainClass) {
					classesToRemove += mfp.st.mainClass + ' ';
				}

				mfp._removeClassFromMFP(classesToRemove);

				if(mfp.fixedContentPos) {
					var windowStyles = {marginRight: ''};
					if(mfp.isIE7) {
						$('body, html').css('overflow', '');
					} else {
						windowStyles.overflow = '';
					}
					$('html').css(windowStyles);
				}

				_document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
				mfp.ev.off(EVENT_NS);

				// clean up DOM elements that aren't removed
				mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
				mfp.bgOverlay.attr('class', 'mfp-bg');
				mfp.container.attr('class', 'mfp-container');

				// remove close button from target element
				if(mfp.st.showCloseBtn &&
					(!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
						if(mfp.currTemplate.closeBtn)
							mfp.currTemplate.closeBtn.detach();
						}


						if(mfp._lastFocusedEl) {
							$(mfp._lastFocusedEl).focus(); // put tab focus back
						}
						mfp.currItem = null;
						mfp.content = null;
						mfp.currTemplate = null;
						mfp.prevHeight = 0;

						_mfpTrigger(AFTER_CLOSE_EVENT);
					},

					updateSize: function(winHeight) {

						if(mfp.isIOS) {
							// fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
							var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
							var height = window.innerHeight * zoomLevel;
							mfp.wrap.css('height', height);
							mfp.wH = height;
						} else {
							mfp.wH = winHeight || _window.height();
						}
						// Fixes #84: popup incorrectly positioned with position:relative on body
						if(!mfp.fixedContentPos) {
							mfp.wrap.css('height', mfp.wH);
						}

						_mfpTrigger('Resize');

					},

					/**
					* Set content of popup based on current index
					*/
					updateItemHTML: function() {
						var item = mfp.items[mfp.index];

						// Detach and perform modifications
						mfp.contentContainer.detach();

						if(mfp.content)
							mfp.content.detach();

							if(!item.parsed) {
								item = mfp.parseEl( mfp.index );
							}

							var type = item.type;

							_mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
							// BeforeChange event works like so:
							// _mfpOn('BeforeChange', function(e, prevType, newType) { });

							mfp.currItem = item;





							if(!mfp.currTemplate[type]) {
								var markup = mfp.st[type] ? mfp.st[type].markup : false;

								// allows to modify markup
								_mfpTrigger('FirstMarkupParse', markup);

								if(markup) {
									mfp.currTemplate[type] = $(markup);
								} else {
									// if there is no markup found we just define that template is parsed
									mfp.currTemplate[type] = true;
								}
							}

							if(_prevContentType && _prevContentType !== item.type) {
								mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
							}

							var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
							mfp.appendContent(newContent, type);

							item.preloaded = true;

							_mfpTrigger(CHANGE_EVENT, item);
							_prevContentType = item.type;

							// Append container back after its content changed
							mfp.container.prepend(mfp.contentContainer);

							_mfpTrigger('AfterChange');
						},


						/**
						* Set HTML content of popup
						*/
						appendContent: function(newContent, type) {
							mfp.content = newContent;

							if(newContent) {
								if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
									mfp.currTemplate[type] === true) {
										// if there is no markup, we just append close button element inside
										if(!mfp.content.find('.mfp-close').length) {
											mfp.content.append(_getCloseBtn());
										}
									} else {
										mfp.content = newContent;
									}
								} else {
									mfp.content = '';
								}

								_mfpTrigger(BEFORE_APPEND_EVENT);
								mfp.container.addClass('mfp-'+type+'-holder');

								mfp.contentContainer.append(mfp.content);
							},




							/**
							* Creates Magnific Popup data object based on given data
							* @param  {int} index Index of item to parse
							*/
							parseEl: function(index) {
								var item = mfp.items[index],
								type;

								if(item.tagName) {
									item = { el: $(item) };
								} else {
									type = item.type;
									item = { data: item, src: item.src };
								}

								if(item.el) {
									var types = mfp.types;

									// check for 'mfp-TYPE' class
									for(var i = 0; i < types.length; i++) {
										if( item.el.hasClass('mfp-'+types[i]) ) {
											type = types[i];
											break;
										}
									}

									item.src = item.el.attr('data-mfp-src');
									if(!item.src) {
										item.src = item.el.attr('href');
									}
								}

								item.type = type || mfp.st.type || 'inline';
								item.index = index;
								item.parsed = true;
								mfp.items[index] = item;
								_mfpTrigger('ElementParse', item);

								return mfp.items[index];
							},


							/**
							* Initializes single popup or a group of popups
							*/
							addGroup: function(el, options) {
								var eHandler = function(e) {
									e.mfpEl = this;
									mfp._openClick(e, el, options);
								};

								if(!options) {
									options = {};
								}

								var eName = 'click.magnificPopup';
								options.mainEl = el;

								if(options.items) {
									options.isObj = true;
									el.off(eName).on(eName, eHandler);
								} else {
									options.isObj = false;
									if(options.delegate) {
										el.off(eName).on(eName, options.delegate , eHandler);
									} else {
										options.items = el;
										el.off(eName).on(eName, eHandler);
									}
								}
							},
							_openClick: function(e, el, options) {
								var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


								if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey ) ) {
									return;
								}

								var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

								if(disableOn) {
									if($.isFunction(disableOn)) {
										if( !disableOn.call(mfp) ) {
											return true;
										}
									} else { // else it's number
										if( _window.width() < disableOn ) {
											return true;
										}
									}
								}

								if(e.type) {
									e.preventDefault();

									// This will prevent popup from closing if element is inside and popup is already opened
									if(mfp.isOpen) {
										e.stopPropagation();
									}
								}


								options.el = $(e.mfpEl);
								if(options.delegate) {
									options.items = el.find(options.delegate);
								}
								mfp.open(options);
							},


							/**
							* Updates text on preloader
							*/
							updateStatus: function(status, text) {

								if(mfp.preloader) {
									if(_prevStatus !== status) {
										mfp.container.removeClass('mfp-s-'+_prevStatus);
									}

									if(!text && status === 'loading') {
										text = mfp.st.tLoading;
									}

									var data = {
										status: status,
										text: text
									};
									// allows to modify status
									_mfpTrigger('UpdateStatus', data);

									status = data.status;
									text = data.text;

									mfp.preloader.html(text);

									mfp.preloader.find('a').on('click', function(e) {
										e.stopImmediatePropagation();
									});

									mfp.container.addClass('mfp-s-'+status);
									_prevStatus = status;
								}
							},


							/*
							"Private" helpers that aren't private at all
							*/
							// Check to close popup or not
							// "target" is an element that was clicked
							_checkIfClose: function(target) {

								if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
									return;
								}

								var closeOnContent = mfp.st.closeOnContentClick;
								var closeOnBg = mfp.st.closeOnBgClick;

								if(closeOnContent && closeOnBg) {
									return true;
								} else {

									// We close the popup if click is on close button or on preloader. Or if there is no content.
									if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
										return true;
									}

									// if click is outside the content
									if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
										if(closeOnBg) {
											// last check, if the clicked element is in DOM, (in case it's removed onclick)
											if( $.contains(document, target) ) {
												return true;
											}
										}
									} else if(closeOnContent) {
										return true;
									}

								}
								return false;
							},
							_addClassToMFP: function(cName) {
								mfp.bgOverlay.addClass(cName);
								mfp.wrap.addClass(cName);
							},
							_removeClassFromMFP: function(cName) {
								this.bgOverlay.removeClass(cName);
								mfp.wrap.removeClass(cName);
							},
							_hasScrollBar: function(winHeight) {
								return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
							},
							_setFocus: function() {
								(mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
							},
							_onFocusIn: function(e) {
								if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
									mfp._setFocus();
									return false;
								}
							},
							_parseMarkup: function(template, values, item) {
								var arr;
								if(item.data) {
									values = $.extend(item.data, values);
								}
								_mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

								$.each(values, function(key, value) {
									if(value === undefined || value === false) {
										return true;
									}
									arr = key.split('_');
									if(arr.length > 1) {
										var el = template.find(EVENT_NS + '-'+arr[0]);

										if(el.length > 0) {
											var attr = arr[1];
											if(attr === 'replaceWith') {
												if(el[0] !== value[0]) {
													el.replaceWith(value);
												}
											} else if(attr === 'img') {
												if(el.is('img')) {
													el.attr('src', value);
												} else {
													el.replaceWith( '<img src="'+value+'" class="' + el.attr('class') + '" />' );
												}
											} else {
												el.attr(arr[1], value);
											}
										}

									} else {
										template.find(EVENT_NS + '-'+key).html(value);
									}
								});
							},

							_getScrollbarSize: function() {
								// thx David
								if(mfp.scrollbarSize === undefined) {
									var scrollDiv = document.createElement("div");
									scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
									document.body.appendChild(scrollDiv);
									mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
									document.body.removeChild(scrollDiv);
								}
								return mfp.scrollbarSize;
							}

						}; /* MagnificPopup core prototype end */




						/**
						* Public static functions
						*/
						$.magnificPopup = {
							instance: null,
							proto: MagnificPopup.prototype,
							modules: [],

							open: function(options, index) {
								_checkInstance();

								if(!options) {
									options = {};
								} else {
									options = $.extend(true, {}, options);
								}


								options.isObj = true;
								options.index = index || 0;
								return this.instance.open(options);
							},

							close: function() {
								return $.magnificPopup.instance && $.magnificPopup.instance.close();
							},

							registerModule: function(name, module) {
								if(module.options) {
									$.magnificPopup.defaults[name] = module.options;
								}
								$.extend(this.proto, module.proto);
								this.modules.push(name);
							},

							defaults: {

								// Info about options is in docs:
								// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

								disableOn: 0,

								key: null,

								midClick: false,

								mainClass: '',

								preloader: true,

								focus: '', // CSS selector of input to focus after popup is opened

								closeOnContentClick: false,

								closeOnBgClick: true,

								closeBtnInside: true,

								showCloseBtn: true,

								enableEscapeKey: true,

								modal: false,

								alignTop: false,

								removalDelay: 0,

								prependTo: null,

								fixedContentPos: 'auto',

								fixedBgPos: 'auto',

								overflowY: 'auto',

								closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',

								tClose: 'Close (Esc)',

								tLoading: 'Loading...'

							}
						};



						$.fn.magnificPopup = function(options) {
							_checkInstance();

							var jqEl = $(this);

							// We call some API method of first param is a string
							if (typeof options === "string" ) {

								if(options === 'open') {
									var items,
									itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
									index = parseInt(arguments[1], 10) || 0;

									if(itemOpts.items) {
										items = itemOpts.items[index];
									} else {
										items = jqEl;
										if(itemOpts.delegate) {
											items = items.find(itemOpts.delegate);
										}
										items = items.eq( index );
									}
									mfp._openClick({mfpEl:items}, jqEl, itemOpts);
								} else {
									if(mfp.isOpen)
										mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
									}

								} else {
									// clone options obj
									options = $.extend(true, {}, options);

									/*
									* As Zepto doesn't support .data() method for objects
									* and it works only in normal browsers
									* we assign "options" object directly to the DOM element. FTW!
									*/
									if(_isJQ) {
										jqEl.data('magnificPopup', options);
									} else {
										jqEl[0].magnificPopup = options;
									}

									mfp.addGroup(jqEl, options);

								}
								return jqEl;
							};


							//Quick benchmark
							/*
							var start = performance.now(),
							i,
							rounds = 1000;

							for(i = 0; i < rounds; i++) {

							}
							console.log('Test #1:', performance.now() - start);

							start = performance.now();
							for(i = 0; i < rounds; i++) {

							}
							console.log('Test #2:', performance.now() - start);
							*/


							/*>>core*/

							/*>>inline*/

							var INLINE_NS = 'inline',
							_hiddenClass,
							_inlinePlaceholder,
							_lastInlineElement,
							_putInlineElementsBack = function() {
								if(_lastInlineElement) {
									_inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
									_lastInlineElement = null;
								}
							};

							$.magnificPopup.registerModule(INLINE_NS, {
								options: {
									hiddenClass: 'hide', // will be appended with `mfp-` prefix
									markup: '',
									tNotFound: 'Content not found'
								},
								proto: {

									initInline: function() {
										mfp.types.push(INLINE_NS);

										_mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
											_putInlineElementsBack();
										});
									},

									getInline: function(item, template) {

										_putInlineElementsBack();

										if(item.src) {
											var inlineSt = mfp.st.inline,
											el = $(item.src);

											if(el.length) {

												// If target element has parent - we replace it with placeholder and put it back after popup is closed
												var parent = el[0].parentNode;
												if(parent && parent.tagName) {
													if(!_inlinePlaceholder) {
														_hiddenClass = inlineSt.hiddenClass;
														_inlinePlaceholder = _getEl(_hiddenClass);
														_hiddenClass = 'mfp-'+_hiddenClass;
													}
													// replace target inline element with placeholder
													_lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
												}

												mfp.updateStatus('ready');
											} else {
												mfp.updateStatus('error', inlineSt.tNotFound);
												el = $('<div>');
											}

											item.inlineElement = el;
											return el;
										}

										mfp.updateStatus('ready');
										mfp._parseMarkup(template, {}, item);
										return template;
									}
								}
							});

							/*>>inline*/

							/*>>ajax*/
							var AJAX_NS = 'ajax',
							_ajaxCur,
							_removeAjaxCursor = function() {
								if(_ajaxCur) {
									_body.removeClass(_ajaxCur);
								}
							},
							_destroyAjaxRequest = function() {
								_removeAjaxCursor();
								if(mfp.req) {
									mfp.req.abort();
								}
							};

							$.magnificPopup.registerModule(AJAX_NS, {

								options: {
									settings: null,
									cursor: 'mfp-ajax-cur',
									tError: '<a href="%url%">The content</a> could not be loaded.'
								},

								proto: {
									initAjax: function() {
										mfp.types.push(AJAX_NS);
										_ajaxCur = mfp.st.ajax.cursor;

										_mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
										_mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
									},
									getAjax: function(item) {

										if(_ajaxCur)
											_body.addClass(_ajaxCur);

											mfp.updateStatus('loading');

											var opts = $.extend({
												url: item.src,
												success: function(data, textStatus, jqXHR) {
													var temp = {
														data:data,
														xhr:jqXHR
													};

													_mfpTrigger('ParseAjax', temp);

													mfp.appendContent( $(temp.data), AJAX_NS );

													item.finished = true;

													_removeAjaxCursor();

													mfp._setFocus();

													setTimeout(function() {
														mfp.wrap.addClass(READY_CLASS);
													}, 16);

													mfp.updateStatus('ready');

													_mfpTrigger('AjaxContentAdded');
												},
												error: function() {
													_removeAjaxCursor();
													item.finished = item.loadError = true;
													mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
												}
											}, mfp.st.ajax.settings);

											mfp.req = $.ajax(opts);

											return '';
										}
									}
								});







								/*>>ajax*/

								/*>>image*/
								var _imgInterval,
								_getTitle = function(item) {
									if(item.data && item.data.title !== undefined)
										return item.data.title;

										var src = mfp.st.image.titleSrc;

										if(src) {
											if($.isFunction(src)) {
												return src.call(mfp, item);
											} else if(item.el) {
												return item.el.attr(src) || '';
											}
										}
										return '';
									};

									$.magnificPopup.registerModule('image', {

										options: {
											markup: '<div class="mfp-figure">'+
											'<div class="mfp-close"></div>'+
											'<figure>'+
											'<div class="mfp-img"></div>'+
											'<figcaption>'+
											'<div class="mfp-bottom-bar">'+
											'<div class="mfp-title"></div>'+
											'<div class="mfp-counter"></div>'+
											'</div>'+
											'</figcaption>'+
											'</figure>'+
											'</div>',
											cursor: 'mfp-zoom-out-cur',
											titleSrc: 'title',
											verticalFit: true,
											tError: '<a href="%url%">The image</a> could not be loaded.'
										},

										proto: {
											initImage: function() {
												var imgSt = mfp.st.image,
												ns = '.image';

												mfp.types.push('image');

												_mfpOn(OPEN_EVENT+ns, function() {
													if(mfp.currItem.type === 'image' && imgSt.cursor) {
														_body.addClass(imgSt.cursor);
													}
												});

												_mfpOn(CLOSE_EVENT+ns, function() {
													if(imgSt.cursor) {
														_body.removeClass(imgSt.cursor);
													}
													_window.off('resize' + EVENT_NS);
												});

												_mfpOn('Resize'+ns, mfp.resizeImage);
												if(mfp.isLowIE) {
													_mfpOn('AfterChange', mfp.resizeImage);
												}
											},
											resizeImage: function() {
												var item = mfp.currItem;
												if(!item || !item.img) return;

												if(mfp.st.image.verticalFit) {
													var decr = 0;
													// fix box-sizing in ie7/8
													if(mfp.isLowIE) {
														decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
													}
													item.img.css('max-height', mfp.wH-decr);
												}
											},
											_onImageHasSize: function(item) {
												if(item.img) {

													item.hasSize = true;

													if(_imgInterval) {
														clearInterval(_imgInterval);
													}

													item.isCheckingImgSize = false;

													_mfpTrigger('ImageHasSize', item);

													if(item.imgHidden) {
														if(mfp.content)
															mfp.content.removeClass('mfp-loading');

															item.imgHidden = false;
														}

													}
												},

												/**
												* Function that loops until the image has size to display elements that rely on it asap
												*/
												findImageSize: function(item) {

													var counter = 0,
													img = item.img[0],
													mfpSetInterval = function(delay) {

														if(_imgInterval) {
															clearInterval(_imgInterval);
														}
														// decelerating interval that checks for size of an image
														_imgInterval = setInterval(function() {
															if(img.naturalWidth > 0) {
																mfp._onImageHasSize(item);
																return;
															}

															if(counter > 200) {
																clearInterval(_imgInterval);
															}

															counter++;
															if(counter === 3) {
																mfpSetInterval(10);
															} else if(counter === 40) {
																mfpSetInterval(50);
															} else if(counter === 100) {
																mfpSetInterval(500);
															}
														}, delay);
													};

													mfpSetInterval(1);
												},

												getImage: function(item, template) {

													var guard = 0,

													// image load complete handler
													onLoadComplete = function() {
														if(item) {
															if (item.img[0].complete) {
																item.img.off('.mfploader');

																if(item === mfp.currItem){
																	mfp._onImageHasSize(item);

																	mfp.updateStatus('ready');
																}

																item.hasSize = true;
																item.loaded = true;

																_mfpTrigger('ImageLoadComplete');

															}
															else {
																// if image complete check fails 200 times (20 sec), we assume that there was an error.
																guard++;
																if(guard < 200) {
																	setTimeout(onLoadComplete,100);
																} else {
																	onLoadError();
																}
															}
														}
													},

													// image error handler
													onLoadError = function() {
														if(item) {
															item.img.off('.mfploader');
															if(item === mfp.currItem){
																mfp._onImageHasSize(item);
																mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
															}

															item.hasSize = true;
															item.loaded = true;
															item.loadError = true;
														}
													},
													imgSt = mfp.st.image;


													var el = template.find('.mfp-img');
													if(el.length) {
														var img = document.createElement('img');
														img.className = 'mfp-img';
														item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
														img.src = item.src;

														// without clone() "error" event is not firing when IMG is replaced by new IMG
														// TODO: find a way to avoid such cloning
														if(el.is('img')) {
															item.img = item.img.clone();
														}

														img = item.img[0];
														if(img.naturalWidth > 0) {
															item.hasSize = true;
														} else if(!img.width) {
															item.hasSize = false;
														}
													}

													mfp._parseMarkup(template, {
														title: _getTitle(item),
														img_replaceWith: item.img
													}, item);

													mfp.resizeImage();

													if(item.hasSize) {
														if(_imgInterval) clearInterval(_imgInterval);

														if(item.loadError) {
															template.addClass('mfp-loading');
															mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
														} else {
															template.removeClass('mfp-loading');
															mfp.updateStatus('ready');
														}
														return template;
													}

													mfp.updateStatus('loading');
													item.loading = true;

													if(!item.hasSize) {
														item.imgHidden = true;
														template.addClass('mfp-loading');
														mfp.findImageSize(item);
													}

													return template;
												}
											}
										});



										/*>>image*/

										/*>>zoom*/
										var hasMozTransform,
										getHasMozTransform = function() {
											if(hasMozTransform === undefined) {
												hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
											}
											return hasMozTransform;
										};

										$.magnificPopup.registerModule('zoom', {

											options: {
												enabled: false,
												easing: 'ease-in-out',
												duration: 300,
												opener: function(element) {
													return element.is('img') ? element : element.find('img');
												}
											},

											proto: {

												initZoom: function() {
													var zoomSt = mfp.st.zoom,
													ns = '.zoom',
													image;

													if(!zoomSt.enabled || !mfp.supportsTransition) {
														return;
													}

													var duration = zoomSt.duration,
													getElToAnimate = function(image) {
														var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
														transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
														cssObj = {
															position: 'fixed',
															zIndex: 9999,
															left: 0,
															top: 0,
															'-webkit-backface-visibility': 'hidden'
														},
														t = 'transition';

														cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

														newImg.css(cssObj);
														return newImg;
													},
													showMainContent = function() {
														mfp.content.css('visibility', 'visible');
													},
													openTimeout,
													animatedImg;

													_mfpOn('BuildControls'+ns, function() {
														if(mfp._allowZoom()) {

															clearTimeout(openTimeout);
															mfp.content.css('visibility', 'hidden');

															// Basically, all code below does is clones existing image, puts in on top of the current one and animated it

															image = mfp._getItemToZoom();

															if(!image) {
																showMainContent();
																return;
															}

															animatedImg = getElToAnimate(image);

															animatedImg.css( mfp._getOffset() );

															mfp.wrap.append(animatedImg);

															openTimeout = setTimeout(function() {
																animatedImg.css( mfp._getOffset( true ) );
																openTimeout = setTimeout(function() {

																	showMainContent();

																	setTimeout(function() {
																		animatedImg.remove();
																		image = animatedImg = null;
																		_mfpTrigger('ZoomAnimationEnded');
																	}, 16); // avoid blink when switching images

																}, duration); // this timeout equals animation duration

															}, 16); // by adding this timeout we avoid short glitch at the beginning of animation


															// Lots of timeouts...
														}
													});
													_mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
														if(mfp._allowZoom()) {

															clearTimeout(openTimeout);

															mfp.st.removalDelay = duration;

															if(!image) {
																image = mfp._getItemToZoom();
																if(!image) {
																	return;
																}
																animatedImg = getElToAnimate(image);
															}


															animatedImg.css( mfp._getOffset(true) );
															mfp.wrap.append(animatedImg);
															mfp.content.css('visibility', 'hidden');

															setTimeout(function() {
																animatedImg.css( mfp._getOffset() );
															}, 16);
														}

													});

													_mfpOn(CLOSE_EVENT+ns, function() {
														if(mfp._allowZoom()) {
															showMainContent();
															if(animatedImg) {
																animatedImg.remove();
															}
															image = null;
														}
													});
												},

												_allowZoom: function() {
													return mfp.currItem.type === 'image';
												},

												_getItemToZoom: function() {
													if(mfp.currItem.hasSize) {
														return mfp.currItem.img;
													} else {
														return false;
													}
												},

												// Get element postion relative to viewport
												_getOffset: function(isLarge) {
													var el;
													if(isLarge) {
														el = mfp.currItem.img;
													} else {
														el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
													}

													var offset = el.offset();
													var paddingTop = parseInt(el.css('padding-top'),10);
													var paddingBottom = parseInt(el.css('padding-bottom'),10);
													offset.top -= ( $(window).scrollTop() - paddingTop );


													/*

													Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

													*/
													var obj = {
														width: el.width(),
														// fix Zepto height+padding issue
														height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
													};

													// I hate to do this, but there is no another option
													if( getHasMozTransform() ) {
														obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
													} else {
														obj.left = offset.left;
														obj.top = offset.top;
													}
													return obj;
												}

											}
										});



										/*>>zoom*/

										/*>>iframe*/

										var IFRAME_NS = 'iframe',
										_emptyPage = '//about:blank',

										_fixIframeBugs = function(isShowing) {
											if(mfp.currTemplate[IFRAME_NS]) {
												var el = mfp.currTemplate[IFRAME_NS].find('iframe');
												if(el.length) {
													// reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
													if(!isShowing) {
														el[0].src = _emptyPage;
													}

													// IE8 black screen bug fix
													if(mfp.isIE8) {
														el.css('display', isShowing ? 'block' : 'none');
													}
												}
											}
										};

										$.magnificPopup.registerModule(IFRAME_NS, {

											options: {
												markup: '<div class="mfp-iframe-scaler">'+
												'<div class="mfp-close"></div>'+
												'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
												'</div>',

												srcAction: 'iframe_src',

												// we don't care and support only one default type of URL by default
												patterns: {
													youtube: {
														index: 'youtube.com',
														id: 'v=',
														src: '//www.youtube.com/embed/%id%?autoplay=1'
													},
													vimeo: {
														index: 'vimeo.com/',
														id: '/',
														src: '//player.vimeo.com/video/%id%?autoplay=1'
													},
													gmaps: {
														index: '//maps.google.',
														src: '%id%&output=embed'
													}
												}
											},

											proto: {
												initIframe: function() {
													mfp.types.push(IFRAME_NS);

													_mfpOn('BeforeChange', function(e, prevType, newType) {
														if(prevType !== newType) {
															if(prevType === IFRAME_NS) {
																_fixIframeBugs(); // iframe if removed
															} else if(newType === IFRAME_NS) {
																_fixIframeBugs(true); // iframe is showing
															}
														}// else {
															// iframe source is switched, don't do anything
															//}
														});

														_mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
															_fixIframeBugs();
														});
													},

													getIframe: function(item, template) {
														var embedSrc = item.src;
														var iframeSt = mfp.st.iframe;

														$.each(iframeSt.patterns, function() {
															if(embedSrc.indexOf( this.index ) > -1) {
																if(this.id) {
																	if(typeof this.id === 'string') {
																		embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
																	} else {
																		embedSrc = this.id.call( this, embedSrc );
																	}
																}
																embedSrc = this.src.replace('%id%', embedSrc );
																return false; // break;
															}
														});

														var dataObj = {};
														if(iframeSt.srcAction) {
															dataObj[iframeSt.srcAction] = embedSrc;
														}
														mfp._parseMarkup(template, dataObj, item);

														mfp.updateStatus('ready');

														return template;
													}
												}
											});



											/*>>iframe*/

											/*>>gallery*/
											/**
											* Get looped index depending on number of slides
											*/
											var _getLoopedId = function(index) {
												var numSlides = mfp.items.length;
												if(index > numSlides - 1) {
													return index - numSlides;
												} else  if(index < 0) {
													return numSlides + index;
												}
												return index;
											},
											_replaceCurrTotal = function(text, curr, total) {
												return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
											};

											$.magnificPopup.registerModule('gallery', {

												options: {
													enabled: false,
													arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
													preload: [0,2],
													navigateByImgClick: true,
													arrows: true,

													tPrev: 'Previous (Left arrow key)',
													tNext: 'Next (Right arrow key)',
													tCounter: '%curr% of %total%'
												},

												proto: {
													initGallery: function() {

														var gSt = mfp.st.gallery,
														ns = '.mfp-gallery',
														supportsFastClick = Boolean($.fn.mfpFastClick);

														mfp.direction = true; // true - next, false - prev

														if(!gSt || !gSt.enabled ) return false;

														_wrapClasses += ' mfp-gallery';

														_mfpOn(OPEN_EVENT+ns, function() {

															if(gSt.navigateByImgClick) {
																mfp.wrap.on('click'+ns, '.mfp-img', function() {
																	if(mfp.items.length > 1) {
																		mfp.next();
																		return false;
																	}
																});
															}

															_document.on('keydown'+ns, function(e) {
																if (e.keyCode === 37) {
																	mfp.prev();
																} else if (e.keyCode === 39) {
																	mfp.next();
																}
															});
														});

														_mfpOn('UpdateStatus'+ns, function(e, data) {
															if(data.text) {
																data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
															}
														});

														_mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
															var l = mfp.items.length;
															values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
														});

														_mfpOn('BuildControls' + ns, function() {
															if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
																var markup = gSt.arrowMarkup,
																arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),
																arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);

																var eName = supportsFastClick ? 'mfpFastClick' : 'click';
																arrowLeft[eName](function() {
																	mfp.prev();
																});
																arrowRight[eName](function() {
																	mfp.next();
																});

																// Polyfill for :before and :after (adds elements with classes mfp-a and mfp-b)
																if(mfp.isIE7) {
																	_getEl('b', arrowLeft[0], false, true);
																	_getEl('a', arrowLeft[0], false, true);
																	_getEl('b', arrowRight[0], false, true);
																	_getEl('a', arrowRight[0], false, true);
																}

																mfp.container.append(arrowLeft.add(arrowRight));
															}
														});

														_mfpOn(CHANGE_EVENT+ns, function() {
															if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

															mfp._preloadTimeout = setTimeout(function() {
																mfp.preloadNearbyImages();
																mfp._preloadTimeout = null;
															}, 16);
														});


														_mfpOn(CLOSE_EVENT+ns, function() {
															_document.off(ns);
															mfp.wrap.off('click'+ns);

															if(mfp.arrowLeft && supportsFastClick) {
																mfp.arrowLeft.add(mfp.arrowRight).destroyMfpFastClick();
															}
															mfp.arrowRight = mfp.arrowLeft = null;
														});

													},
													next: function() {
														mfp.direction = true;
														mfp.index = _getLoopedId(mfp.index + 1);
														mfp.updateItemHTML();
													},
													prev: function() {
														mfp.direction = false;
														mfp.index = _getLoopedId(mfp.index - 1);
														mfp.updateItemHTML();
													},
													goTo: function(newIndex) {
														mfp.direction = (newIndex >= mfp.index);
														mfp.index = newIndex;
														mfp.updateItemHTML();
													},
													preloadNearbyImages: function() {
														var p = mfp.st.gallery.preload,
														preloadBefore = Math.min(p[0], mfp.items.length),
														preloadAfter = Math.min(p[1], mfp.items.length),
														i;

														for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
															mfp._preloadItem(mfp.index+i);
														}
														for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
															mfp._preloadItem(mfp.index-i);
														}
													},
													_preloadItem: function(index) {
														index = _getLoopedId(index);

														if(mfp.items[index].preloaded) {
															return;
														}

														var item = mfp.items[index];
														if(!item.parsed) {
															item = mfp.parseEl( index );
														}

														_mfpTrigger('LazyLoad', item);

														if(item.type === 'image') {
															item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
																item.hasSize = true;
															}).on('error.mfploader', function() {
																item.hasSize = true;
																item.loadError = true;
																_mfpTrigger('LazyLoadError', item);
															}).attr('src', item.src);
														}


														item.preloaded = true;
													}
												}
											});

											/*
											Touch Support that might be implemented some day

											addSwipeGesture: function() {
											var startX,
											moved,
											multipleTouches;

											return;

											var namespace = '.mfp',
											addEventNames = function(pref, down, move, up, cancel) {
											mfp._tStart = pref + down + namespace;
											mfp._tMove = pref + move + namespace;
											mfp._tEnd = pref + up + namespace;
											mfp._tCancel = pref + cancel + namespace;
										};

										if(window.navigator.msPointerEnabled) {
										addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
									} else if('ontouchstart' in window) {
									addEventNames('touch', 'start', 'move', 'end', 'cancel');
								} else {
								return;
							}
							_window.on(mfp._tStart, function(e) {
							var oE = e.originalEvent;
							multipleTouches = moved = false;
							startX = oE.pageX || oE.changedTouches[0].pageX;
						}).on(mfp._tMove, function(e) {
						if(e.originalEvent.touches.length > 1) {
						multipleTouches = e.originalEvent.touches.length;
					} else {
					//e.preventDefault();
					moved = true;
				}
			}).on(mfp._tEnd + ' ' + mfp._tCancel, function(e) {
			if(moved && !multipleTouches) {
			var oE = e.originalEvent,
			diff = startX - (oE.pageX || oE.changedTouches[0].pageX);

			if(diff > 20) {
			mfp.next();
		} else if(diff < -20) {
		mfp.prev();
	}
}
});
},
*/


/*>>gallery*/

/*>>retina*/

var RETINA_NS = 'retina';

$.magnificPopup.registerModule(RETINA_NS, {
	options: {
		replaceSrc: function(item) {
			return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
		},
		ratio: 1 // Function or number.  Set to 1 to disable.
	},
	proto: {
		initRetina: function() {
			if(window.devicePixelRatio > 1) {

				var st = mfp.st.retina,
				ratio = st.ratio;

				ratio = !isNaN(ratio) ? ratio : ratio();

				if(ratio > 1) {
					_mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
						item.img.css({
							'max-width': item.img[0].naturalWidth / ratio,
							'width': '100%'
						});
					});
					_mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
						item.src = st.replaceSrc(item, ratio);
					});
				}
			}

		}
	}
});

/*>>retina*/

/*>>fastclick*/
/**
* FastClick event implementation. (removes 300ms delay on touch devices)
* Based on https://developers.google.com/mobile/articles/fast_buttons
*
* You may use it outside the Magnific Popup by calling just:
*
* $('.your-el').mfpFastClick(function() {
*     console.log('Clicked!');
* });
*
* To unbind:
* $('.your-el').destroyMfpFastClick();
*
*
* Note that it's a very basic and simple implementation, it blocks ghost click on the same element where it was bound.
* If you need something more advanced, use plugin by FT Labs https://github.com/ftlabs/fastclick
*
*/

(function() {
	var ghostClickDelay = 1000,
	supportsTouch = 'ontouchstart' in window,
	unbindTouchMove = function() {
		_window.off('touchmove'+ns+' touchend'+ns);
	},
	eName = 'mfpFastClick',
	ns = '.'+eName;


	// As Zepto.js doesn't have an easy way to add custom events (like jQuery), so we implement it in this way
	$.fn.mfpFastClick = function(callback) {

		return $(this).each(function() {

			var elem = $(this),
			lock;

			if( supportsTouch ) {

				var timeout,
				startX,
				startY,
				pointerMoved,
				point,
				numPointers;

				elem.on('touchstart' + ns, function(e) {
					pointerMoved = false;
					numPointers = 1;

					point = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0];
					startX = point.clientX;
					startY = point.clientY;

					_window.on('touchmove'+ns, function(e) {
						point = e.originalEvent ? e.originalEvent.touches : e.touches;
						numPointers = point.length;
						point = point[0];
						if (Math.abs(point.clientX - startX) > 10 ||
							Math.abs(point.clientY - startY) > 10) {
								pointerMoved = true;
								unbindTouchMove();
							}
						}).on('touchend'+ns, function(e) {
							unbindTouchMove();
							if(pointerMoved || numPointers > 1) {
								return;
							}
							lock = true;
							e.preventDefault();
							clearTimeout(timeout);
							timeout = setTimeout(function() {
								lock = false;
							}, ghostClickDelay);
							callback();
						});
					});

				}

				elem.on('click' + ns, function() {
					if(!lock) {
						callback();
					}
				});
			});
		};

		$.fn.destroyMfpFastClick = function() {
			$(this).off('touchstart' + ns + ' click' + ns);
			if(supportsTouch) _window.off('touchmove'+ns+' touchend'+ns);
		};
	})();

	/*>>fastclick*/
	_checkInstance(); })(window.jQuery || window.Zepto);

	$(document).ready(function(){function a(){var a=$(this).scrollTop();Math.abs(d-a)<=e||(a>d&&a>f?($("header.global").addClass("nav--hide"),$("body").removeClass("nav--open")):a+$(window).height()<$(document).height()&&$("header.global").removeClass("nav--hide"),d=a)}var b=$(window).height();$(".nav_trigger").click(function(){$("body").toggleClass("nav--open")}),$(".hero, .story_block").css("height",b),$(window).resize(function(){var a=$(window).height();$(".hero, .story_block").css("height",a)});var c,d=0,e=5,f=$("header.global").outerHeight();$(window).scroll(function(){c=!0,$("header.global").toggleClass("not_top",$(window).scrollTop()>=$(".hero").height()),$(".the_story").toggleClass("stick_it",$(window).scrollTop()>=$(".hero").height()),$(".the_story").toggleClass("too_far",$(window).scrollTop()>=$(".ship").offset().top),$(".idea .story_graphic").toggleClass("go",$(window).scrollTop()>=$(".idea").offset().top-150),$(".rally .story_graphic").toggleClass("go",$(window).scrollTop()>=$(".rally").offset().top-150),$(".ship .the_product").toggleClass("go",$(window).scrollTop()>=$(".ship").offset().top-150),$(".ship .success").toggleClass("go",$(window).scrollTop()>=$(".ship").offset().top-150)}),setInterval(function(){c&&(a(),c=!1)},250),$(".popup-video").magnificPopup({disableOn:700,type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!1,fixedContentPos:!1})}),$(window).load(function(){var a=$(".community_grid");a.masonry({gutter:20})});

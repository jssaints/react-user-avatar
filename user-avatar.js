'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var initials = require('initials');
var addPx = require('add-px');
var contrast = require('contrast');

// from https://flatuicolors.com/
var defaultColors = ['#2ecc71', // emerald
'#3498db', // peter river
'#8e44ad', // wisteria
'#e67e22', // carrot
'#e74c3c', // alizarin
'#1abc9c', // turquoise
'#2c3e50'];

var defaultLength = 2;

function sumChars(str) {
  var sum = 0;
  for (var i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

var UserAvatar = function (_React$Component) {
  _inherits(UserAvatar, _React$Component);

  function UserAvatar() {
    _classCallCheck(this, UserAvatar);

    return _possibleConstructorReturn(this, (UserAvatar.__proto__ || Object.getPrototypeOf(UserAvatar)).apply(this, arguments));
  }

  _createClass(UserAvatar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$borderRadius = _props.borderRadius,
          borderRadius = _props$borderRadius === undefined ? '100%' : _props$borderRadius,
          src = _props.src,
          srcset = _props.srcset,
          name = _props.name,
          title = _props.title,
          color = _props.color,
          _props$colors = _props.colors,
          colors = _props$colors === undefined ? defaultColors : _props$colors,
          size = _props.size,
          length = _props.length,
          style = _props.style,
          onClick = _props.onClick,
          className = _props.className,
          id = _props.id;


      if (!name) {
        name = "";
      }
      /* throw new Error('UserAvatar requires a name'); */

      var abbr = initials(name, { length: length ? length : defaultLength });
      size = addPx(size);

      var imageStyle = {
        display: 'block',
        borderRadius: borderRadius
      };

      var innerStyle = {
        lineHeight: size,
        textAlign: 'center',
        borderRadius: borderRadius
      };

      if (size) {
        imageStyle.width = innerStyle.width = innerStyle.maxWidth = size;
        imageStyle.height = innerStyle.height = innerStyle.maxHeight = size;
      }

      var inner = void 0,
          classes = [className, 'UserAvatar'];
      if (src || srcset) {
        inner = React.createElement('img', { className: 'UserAvatar--img', style: imageStyle, src: src, srcSet: srcset, alt: name });
      } else {
        var background = void 0;
        if (color) {
          background = color;
        } else {
          var fullName = name;
          if (id !== undefined) {
            fullName += id;
          }
          // pick a deterministic color from the list
          var i = sumChars(fullName) % colors.length;
          background = colors[i];
        }

        innerStyle.backgroundColor = background;

        inner = abbr;
      }

      if (innerStyle.backgroundColor) {
        classes.push('UserAvatar--' + contrast(innerStyle.backgroundColor));
      }
      var tooltip = title || name;

      return React.createElement(
        'div',
        { 'aria-label': name, className: classes.join(' '), style: style, title: tooltip },
        React.createElement(
          'div',
          { className: 'UserAvatar--inner projkey', style: innerStyle },
          inner
        )
      );
    }
  }]);

  return UserAvatar;
}(React.Component);

module.exports = UserAvatar;

//# sourceMappingURL=user-avatar.js.map
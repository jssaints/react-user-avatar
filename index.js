const React = require('react');
const initials = require('initials');
const addPx = require('add-px');
const contrast = require('contrast');

// from https://flatuicolors.com/
const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

const defaultLength = 2;

function sumChars(str) {
  let sum = 0;
  for(let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

class UserAvatar extends React.Component {
  render() {
    let {
      borderRadius='100%',
      src,
      srcset,
      name,
      color,
      colors=defaultColors,
      size,
      length,
      style,
      onClick,
      className,
      id
    } = this.props;

    if (!name) {
      name = "";
    }  
    /* throw new Error('UserAvatar requires a name'); */

    const abbr = initials(name, { length: (length) ? length : defaultLength});
    size = addPx(size);

    const imageStyle = {
      display: 'block',
      borderRadius
    };

    const innerStyle = {
      lineHeight: size,
      textAlign: 'center',
      borderRadius
    };

    if (size) {
      imageStyle.width = innerStyle.width = innerStyle.maxWidth = size;
      imageStyle.height = innerStyle.height = innerStyle.maxHeight = size;
    }

    let inner, classes = [className, 'UserAvatar'];
    if (src || srcset) {
      inner = <img className="UserAvatar--img" style={imageStyle} src={src} srcSet={srcset} alt={name} />
    } else {
      let background;
      if (color) {
        background = color;
      } else {
        let fullName = name;
        if (id !== undefined) {
          fullName += id;
        }
        // pick a deterministic color from the list
        let i = sumChars(fullName) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = abbr;
    }

    if (innerStyle.backgroundColor) {
      classes.push(`UserAvatar--${contrast(innerStyle.backgroundColor)}`);
    }

    return (
      <div aria-label={name} className={classes.join(' ')} style={style} title={name}>
        <div className="UserAvatar--inner projkey" style={innerStyle}>
          {inner}
        </div>
      </div>
    )
  }
}

module.exports = UserAvatar;

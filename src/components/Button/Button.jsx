import { Component } from "react";
import css from "./Button.module.css";
import PropTypes from "prop-types";
class Button extends Component {
  render() {
    const { onClick, isHidden } = this.props;
    const hiddenStyle = isHidden ? css["isHidden"] : "";
    return (
      <button
        className={`${css.Button} ${hiddenStyle}`}
        type="button"
        onClick={onClick}
      >
        Loar more
      </button>
    );
  }
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
};
export default Button;

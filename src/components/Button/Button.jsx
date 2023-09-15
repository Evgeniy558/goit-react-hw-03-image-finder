import { Component } from "react";
import css from "./Button.module.css";
class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className={css.Button} type="button" onClick={onClick}>
        Loar more
      </button>
    );
  }
}
export default Button;

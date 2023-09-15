import { Component } from "react";
import css from "./Modal.module.css";
class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this.props.onClick();
    }
  };
  render() {
    const { largeImageURL, onClick, onKeyDown } = this.props;
    return (
      <div className={css.Overlay} onClick={onClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
export default Modal;

import { Component } from "react";
import css from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL /*largeImageURL*/ } = this.props;
    return (
      <li key={id} className={css.ImageGalleryItem}>
        {" "}
        <img
          src={webformatURL}
          alt=""
          className={css.ImageGalleryItem_image}
          loading="lazy"
        />
      </li>
    );
  }
}
export default ImageGalleryItem;

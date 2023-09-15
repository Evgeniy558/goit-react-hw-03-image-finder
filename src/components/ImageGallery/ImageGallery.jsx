import { Component } from "react";
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends Component {
  // componentWillUnmount() {
  //   console.log("unmount");
  //   this.props.updateApp();
  // }
  shouldComponentUpdate(nextProps) {
    if (
      JSON.stringify(nextProps.pictures) !== JSON.stringify(this.props.pictures)
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { pictures } = this.props;
    // console.log("render");

    return (
      <ul className={css.ImageGallery}>
        {pictures.map((picture) => {
          return (
            <ImageGalleryItem
              key={picture.id}
              id={picture.id}
              webformatURL={picture.webformatURL}
              largeImageURL={picture.largeImageURL}
            />
          );
        })}
      </ul>
    );
  }
}
export default ImageGallery;

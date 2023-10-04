import { Component } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import Loader from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import { requestToApi } from "./serveces/requestToApi";
import Notiflix from "notiflix";
const LOADINGDEFAULTPAGE = 1;
// test

class App extends Component {
  state = {
    pictures: [],
    isLoarding: false,
    searchValue: "",
    page: "",
    isHidden: false,
  };

  setDefaultAppState = () => {
    this.setState({ pictures: [] });
    this.setState({ page: 1 });
    this.setState({ isHidden: false });
  };

  submit = async (ev) => {
    ev.preventDefault();
    this.setDefaultAppState();
    if (this.state.searchValue) {
      await this.renderPictures(LOADINGDEFAULTPAGE);
    }
    ev.target.reset();
    return;
  };

  renderPictures = async (page) => {
    this.setState({ isLoarding: true });
    try {
      const responce = await requestToApi(page, this.state.searchValue);
      this.setState(
        (prevState) => ({
          pictures: [...prevState.pictures, ...responce.hits],
          page: prevState.page + 1,
        }),
        () => {
          if (responce.totalHits === this.state.pictures.length) {
            this.setState({ isHidden: true });
          }
        }
      );
    } catch (error) {
      Notiflix.Notify.failure(`Error ${error}`);
    } finally {
      this.isLoaded();
    }
  };

  //hide loager
  isLoaded = () => {
    this.setState({ isLoarding: false });
  };

  getSearchValue = (ev) => {
    this.setState({ searchValue: ev.target.value });
  };

  render() {
    const { pictures, isLoarding, page, isHidden } = this.state;
    return (
      <div className="App">
        {isLoarding ? (
          <>
            <Searchbar />
            <Loader />
          </>
        ) : (
          <>
            <Searchbar onSubmit={this.submit} onChange={this.getSearchValue} />
            <ImageGallery
              pictures={pictures}
              setDefaultAppState={this.setDefaultAppState}
            />
            {pictures.length > 0 && (
              <Button
                isHidden={isHidden}
                onClick={() => {
                  this.renderPictures(page);
                }}
              />
            )}
          </>
        )}
      </div>
    );
  }
}

export default App;

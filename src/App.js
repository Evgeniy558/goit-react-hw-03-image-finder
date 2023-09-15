import { Component } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import Button from "./components/Button/Button";

const IMG_PER_PAGE = 12;

class App extends Component {
  state = {
    pictures: [],
    isLoarding: false,
    searchValue: "",
    page: 1,
  };

  componentDidUpdate() {
    // this.setState((prevState) => ({ page: prevState.page + 1 }));
    console.log("did update");
  }
  componentDidMount() {
    console.log("did mount");
  }
  componentWillUnmount() {
    console.log("unmount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(nextState.pictures) !== JSON.stringify(this.state.pictures)
    ) {
      this.setState((prevState) => ({ page: prevState.page + 1 }));
      return true;
    }
    return false;
  }

  updateAppState = () => {
    this.setState({ pictures: [], page: 1 });
  };

  requestToApi = async (page) => {
    try {
      const responce = await axios.get("https://pixabay.com/api/", {
        params: {
          key: "36234067-70acfbfc80ca70cd9e73eaaab",
          q: this.state.searchValue,
          image_type: "photo",
          orientation: "horizontal",
          safesearch: true,
          page: page,
          per_page: IMG_PER_PAGE,
        },
      });

      this.setState((prevState) => ({
        pictures: [...prevState.pictures, ...responce.data.hits],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoarding: false });
    }
  };

  submit = async (ev) => {
    ev.preventDefault();
    this.updateAppState();
    if (this.state.searchValue) {
      this.setState({ isLoarding: true });
      await this.requestToApi(1);
    }
    return;
  };

  loardMore = async () => {
    await this.requestToApi(this.state.page);
  };

  getSearchValue = (ev) => {
    this.setState({ searchValue: ev.target.value });
  };

  render() {
    console.log("render");
    const { pictures, isLoarding } = this.state;
    return (
      <div className="App">
        {isLoarding ? (
          <>
            {" "}
            <Searchbar />
            <Loader />
          </>
        ) : (
          <>
            {" "}
            <Searchbar onSubmit={this.submit} onChange={this.getSearchValue} />
            <ImageGallery pictures={pictures} updateApp={this.updateAppState} />
            {pictures.length > 0 && (
              <Button
                onClick={() => {
                  this.loardMore();
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

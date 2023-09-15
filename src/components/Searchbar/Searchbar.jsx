import { Component } from "react";
import css from "./Searchbar.module.css";

class Searchbar extends Component {
  render() {
    const { onSubmit, onChange } = this.props;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onSubmit}>
          <button className={css.SearchForm_button} type="submit">
            <span className={css.SearchForm_button_label}></span>
          </button>
          <input
            name="searchValue"
            type="text"
            className={css.SearchForm_input}
            placeholder="Search images and photos"
            onChange={onChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

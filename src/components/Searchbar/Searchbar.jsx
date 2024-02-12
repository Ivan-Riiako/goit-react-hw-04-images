import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

class Searchbar extends PureComponent {
  state = {
    value: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ value });
  };

  handleSubmit = e => {
    const { onSubmit } = this.props;
    // const { value } = this.state;

    e.preventDefault();

    // if (value.trim() === '') {
    // return
    // }

    onSubmit(this.state);
    // e.currentTarget.reset();
  };
  render() {
    const { value } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm}>
          <button
            type="submit"
            aria-label="Search"
            className={style.SearchForm_button}
            onClick={handleSubmit}
          >
            {/* <span className={style.SearchForm_button_label} >
                  Search
                </span> */}
          </button>
          
          <input
            onChange={handleChange}
            value={value}
            className={style.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            aria-label="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
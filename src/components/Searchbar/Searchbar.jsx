import  {  useState } from 'react';
import PropTypes from 'prop-types';
// import toast, { Toaster } from 'react-hot-toast';
import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setValue(value)
  };

  const handleSubmit = e => {
    e.preventDefault();
    // if (value.trim() === '') {
    // toast('Please enter a search query');
    // return
    // }
    onSubmit(value);
  };

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
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
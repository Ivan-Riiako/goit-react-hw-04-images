import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import style from './App.module.css';

import API from 'services/PixabayAPI';
import imagesArreyNormalaize from 'services/imagesArreyNormalaize';
import queryNormalaize from 'services/queryNormalaize';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';

class App extends Component {
  state = {
    query: '',
    arrayPictures: [],
    error:null,
    isLoading: false,
    currentPage: 1,
    totalPage: 0,
  };
  async componentDidUpdate(_, prevState) {
    const { currentPage, query } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      try {
        this.setState({
          isLoading: true,
        });
        const queryPure = queryNormalaize(query);
        const arrayImages = await API.fetchPhoto(`${queryPure}`, currentPage);
        const { arrayPictures, totalPage } = imagesArreyNormalaize(arrayImages);

        if (arrayPictures.length === 0) {

          toast('no images found, try again!', {
            style: {
              backgroundColor: 'rgba(209, 191, 53, 0.2',
            },
          });
          this.setState({
            error:true,
          });
          return;
        }

        this.setState(prevState => ({
          arrayPictures: [...prevState.arrayPictures, ...arrayPictures],
          totalPage,
          error:null
        }));
      } catch (error) {
        this.setState({
          error
        });
        toast.error('This is an error!');
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }
  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  handleSubmit = data => {
    const { value } = data;

    if (value.trim() === '') {
      toast('Please enter a search query');
      this.setState({
        arrayPictures: [],
        totalPage:0,
      });
      return;
    }

    this.setState({
      query: `${Date.now()}/${value}`,
      arrayPictures: [],
      currentPage: 1,
    });
  };

  render() {
    const { arrayPictures, isLoading, currentPage, totalPage,error } = this.state;
    const { handleSubmit, handleLoadMore } = this;
    const isLoadMore = currentPage < totalPage && !isLoading && !error; 
    return (
      <div className={style.App}>
        <Searchbar onSubmit={handleSubmit} />
        {arrayPictures.length!==0 && <ImageGallery arrayPictures={arrayPictures} />}
        <Toaster />
        {isLoading && <Loader />}
        {isLoadMore && <Button onLoadMore={handleLoadMore} />}
      </div>
    );
  }
}

export default App;

import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import style from './App.module.css';

import API from 'services/PixabayAPI';
import imagesArreyNormalaize from 'services/imagesArreyNormalaize';
import queryNormalaize from 'services/queryNormalaize';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';

const App = () => {
  const [query, setQuery] = useState('');
  const [arrayPictures, setArrayPictures] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const controllerRef = useRef();

  useEffect(() => {
    if (query === '') {
      return;
    }
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    async function fethQuery() {

      try {
        setIsLoading(true);
        setError(null);
        const queryPure = queryNormalaize(query);
        const arrayImages = await API.fetchPhoto(
          `${queryPure}`,
          currentPage,
          controllerRef.current
        );
        const { arrayPictures, totalPage } = imagesArreyNormalaize(arrayImages);

        if (arrayPictures.length === 0) {
          toast('no images found, try again!', {
            style: {
              backgroundColor: 'rgba(209, 191, 53, 0.2',
            },
          });
          setError(true);
          return;
        }

        setArrayPictures(prevArray => [...prevArray, ...arrayPictures]);
        setTotalPage(totalPage);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          toast.error('This is an error!');
          setError(error);
        }
        console.log('so many reqvest, wait wait:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fethQuery();
    return () => {
      controllerRef.current.abort();
    }
  }, [query, currentPage]);


  const handleSubmit = data => {
    if (data === '') {
      toast('Please enter a search query');
      setArrayPictures([]);
      setTotalPage(0);
      return;
    }
    setCurrentPage(1);
    setArrayPictures([]);
    setQuery(`${Date.now()}/${data}`);
  };

  const isLoadMore = currentPage < totalPage && !isLoading && !error;
  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleSubmit} />
      {arrayPictures.length !== 0 && (
        <ImageGallery arrayPictures={arrayPictures} />
      )}
      <Toaster />
      {isLoading && <Loader />}
      {isLoadMore && <Button onLoadMore={()=>setCurrentPage(prev => prev + 1)} />}
    </div>
  );
};

export default App;

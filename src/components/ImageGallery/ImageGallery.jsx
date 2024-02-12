import React from 'react';
import PropTypes from 'prop-types';
import style from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery= ({arrayPictures})=> {
      return (
        <ul className={style.ImageGallery}>
          {arrayPictures.map(({ webformatURL, tags, largeImageURL, id }) => (
              <ImageGalleryItem
                tags={tags}
                webformatURL={webformatURL}
                key={id}
                largeImageURL={largeImageURL}
              />
            ))}
        </ul>
      );
  }

ImageGallery.propTypes = {
  arrayPictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ImageGallery;

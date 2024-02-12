import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';
// import Modal from 'components/Modal';
import Modal from 'components/Modal';



class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { showModal } = this.state;
    const { toggleModal } = this;


    return (
      <>
        <li className={style.ImageGalleryItem}>
          <img
            className={style.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
            onClick={toggleModal}
          />
        </li>
        {/* Old Modal  */}
        {/* {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )} */}

        <Modal isModalOpen={showModal} toggleModal={toggleModal}>
          <img  src={largeImageURL} alt={tags} />
        </Modal>
      </>
    );
  }
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

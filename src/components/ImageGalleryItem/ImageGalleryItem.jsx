import  {  useState } from 'react';
import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';

const ImageGalleryItem=({ webformatURL, tags, largeImageURL }) =>{
  const [showModal, setShowModal] = useState(false)

    return (
      <>
        <li className={style.ImageGalleryItem}>
          <img
            className={style.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
            onClick={() => setShowModal(true)}
          />
        </li>
        <Modal isModalOpen={showModal} onCloseModal={()=>setShowModal(false)}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      </>
    );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

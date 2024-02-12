
import PropTypes from 'prop-types';
import './Modal.css';
import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');


const Modal = ({ isModalOpen, onCloseModal, children }) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      contentLabel="Example Modal"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      {children}
    </ReactModal>
  );
};
Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
export default Modal;

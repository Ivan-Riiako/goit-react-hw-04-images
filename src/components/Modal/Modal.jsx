
import PropTypes from 'prop-types';
import './Modal.css'
import React, { Component } from 'react'
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');


class Modal extends Component {

  render() {
    const { isModalOpen, toggleModal } = this.props;
    return (
      <ReactModal 
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Example Modal"
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
      >
        {this.props.children}
      </ReactModal>
    );
  }
}
Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
export default Modal;

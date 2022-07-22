import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };
  keyUpHandler = () => {
    this.props.closeModal();
  };
  componentDidMount() {
    window.addEventListener('keyup', this.keyUpHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyUpHandler);
  }

  render() {
    const { largeImageURL, alt, closeModal } = this.props;
    return (
      <div onClick={closeModal} className={css['Overlay']}>
        <div className={css['Modal']}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}

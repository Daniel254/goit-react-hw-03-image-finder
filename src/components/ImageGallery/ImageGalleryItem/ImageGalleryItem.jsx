import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    thumbImageURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  render() {
    const { thumbImageURL, largeImageURL, alt, openModal } = this.props;
    return (
      <li
        className={css['ImageGalleryItem']}
        onClick={() => openModal(largeImageURL)}
      >
        <img
          src={thumbImageURL}
          alt={alt}
          className={css['ImageGalleryItem-image']}
        />
      </li>
    );
  }
}

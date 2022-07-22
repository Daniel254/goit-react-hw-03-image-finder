import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  static propTypes = { images: PropTypes.array };

  // Show 404 if images array is empty
  render() {
    const { images, openModal } = this.props;
    return (
      <ul className={css['ImageGallery']}>
        {images.map(({ id, thumbImageURL, largeImageURL, alt }) => (
          <ImageGalleryItem
            key={id}
            thumbImageURL={thumbImageURL}
            largeImageURL={largeImageURL}
            alt={alt}
            openModal={openModal}
          />
        ))}
      </ul>
    );
  }
}

import React from 'react';
import { Oval } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import pixabayApi from 'api/pixabay';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';

export default class App extends React.Component {
  state = {
    searchQuery: '',
    searchPage: null,
    images: [],
    totalImages: null,
    status: 'idle',
    error: null,
    showModal: false,
    modalImageURL: '',
  };
  async componentDidUpdate(_, prevState) {
    const { images, searchQuery, searchPage } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.searchPage !== searchPage
    ) {
      try {
        this.setState({ status: 'pending' });
        const getImagesByQueryResult = await pixabayApi(
          searchQuery,
          searchPage
        );
        this.setState({
          images:
            searchPage === 1
              ? [...getImagesByQueryResult.images]
              : [...images, ...getImagesByQueryResult.images],
          totalImages: getImagesByQueryResult.total,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
      if (searchPage === 1) {
        setTimeout(() => {
          window.scroll({
            top: 0,
            behavior: 'smooth',
          });
        });
      } else if (searchPage > 1) {
        const scrollOffset = window.document.body.offsetHeight - 155;
        setTimeout(() => {
          window.scroll({
            top: scrollOffset,
            behavior: 'smooth',
          });
        });
      }
    }
  }
  submitHandler = e => {
    e.preventDefault();
    const newSearchQuery = e.currentTarget.elements.searchQuery.value;

    this.setState({
      searchQuery: newSearchQuery,
      searchPage: 1,
    });
  };
  loadMoreHandler = () => {
    this.setState(prev => ({
      searchPage: prev.searchPage + 1,
    }));
  };
  openModal = e => {
    this.setState({
      showModal: true,
      modalImageURL: e.currentTarget.dataset.largeimageurl,
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, totalImages, status, error, showModal, modalImageURL } =
      this.state;
    const showLoadMoreButton = images.length > 0 && images.length < totalImages;
    return (
      <div className={css['App']}>
        <Searchbar onSubmit={this.submitHandler} />
        <ImageGallery images={images} openModal={this.openModal} />
        {status === 'pending' && (
          <Oval
            color="#00BFFF"
            height={40}
            width={40}
            wrapperStyle={{ justifyContent: 'center' }}
          />
        )}
        {status === 'resolved' && showLoadMoreButton && (
          <Button onClick={this.loadMoreHandler} label="Load more" />
        )}
        {status === 'rejected' && (
          <h1 style={{ textAlign: 'center' }}>{error.message}</h1>
        )}
        {showModal && (
          <Modal
            largeImageURL={modalImageURL}
            closeModal={this.closeModal}
            alt="image"
          />
        )}
      </div>
    );
  }
}

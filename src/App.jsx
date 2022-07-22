import React from 'react';
import { Oval } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from 'components/Searchbar/Searchbar';
import pixabayApi from 'api/pixabay';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import css from './App.module.css';
// import './App.module.css';
import Modal from './components/Modal/Modal';

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
        console.log('searchQuery', searchQuery);
        //
        const getImagesByQueryResult = await pixabayApi(
          searchQuery,
          searchPage
        );
        this.setState({
          images: [...images, ...getImagesByQueryResult.images],
          totalImages: getImagesByQueryResult.total,
          status: 'resolved',
        });

        // console.log(getImagesByQueryResult);
      } catch (error) {
        console.log('Error!!!: ', error.message);
        this.setState({ error, status: 'rejected' });
        // throw new Error(error);
      }
      if (
        prevState.searchQuery === searchQuery &&
        prevState.searchPage !== searchPage
      ) {
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
      images: [],
    });

    // console.log('submitHandler in App called:', searchQuery);
  };
  loadMoreHandler = () => {
    console.log('loadMore clicked');
    this.setState(prev => ({
      searchPage: prev.searchPage + 1,
    }));
    //   const { height: cardHeight } = document
    // .querySelector(".gallery")
    // .firstElementChild.getBoundingClientRect();
  };
  openModal = e => {
    console.log('Open modal called');
    // console.log(e.currentTarget.dataset.largeimageurl);
    this.setState({
      showModal: true,
      modalImageURL: e.currentTarget.dataset.largeimageurl,
    });
  };
  closeModal = () => {
    console.log('close modal called');
    this.setState({
      showModal: false,
    });
  };

  render() {
    const {
      images,
      totalImages,
      status,
      searchPage,
      error,
      showModal,
      modalImageURL,
    } = this.state;
    const showLoadMoreButton = images.length > 0 && images.length < totalImages;
    // const isNoImages = images.length === 0;
    console.log('page:', searchPage);
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
        {/* {status === 'resolved' && <ImageGallery images={images} />} */}
        {status === 'resolved' && showLoadMoreButton && (
          <Button onClick={this.loadMoreHandler} />
        )}
        {status === 'rejected' && (
          <h1 style={{ textAlign: 'center' }}>{error.message}</h1>
        )}
        {showModal && (
          <Modal
            largeImageURL={modalImageURL}
            closeModal={this.closeModal}
            alt="12"
          />
        )}
      </div>
      // <div
      //   style={{
      //     height: '100vh',
      //     display: 'flex',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     fontSize: 40,
      //     color: '#010101'
      //   }}
      // >
      //   React homework template
      // </div>
    );
  }
}

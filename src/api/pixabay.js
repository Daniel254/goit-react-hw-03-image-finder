import { API_KEY } from 'constants/pixabay';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    page: 1,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

const getImagesByQuery = async (q, page = 1) => {
  try {
    const result = await axiosInstance.get('/', {
      params: {
        q,
        page,
      },
    });
    const receivedImages = result.data.hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        thumbImageURL: webformatURL,
        largeImageURL,
        alt: tags,
      })
    );
    const quantityImages = result.data.totalHits;

    if (result.data.totalHits === 0) {
      throw new Error('Images not found');
    }
    return {
      images: receivedImages,
      total: quantityImages,
    };
  } catch (error) {
    // ?
    throw new Error(error.message);
  }
};

export { getImagesByQuery as default };

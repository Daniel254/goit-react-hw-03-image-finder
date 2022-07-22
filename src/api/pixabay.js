// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
// defaults:
//   page 1
//   per_page 12
//   id - уникальный идентификатор
// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL

import axios from 'axios';
const API_KEY = '27666990-12b4bba2fe6e2b052765abd44';

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
  console.log('pixabayApi.getImagesByQuery: ', q);
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

    console.log('fetch result', result);
    if (result.data.totalHits === 0 && result.status === 200) {
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

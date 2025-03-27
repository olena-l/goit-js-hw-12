import axios from 'axios';

export const fetchData = async (searchQuery, page = 1, perPage = 15) => {
  const API_KEY = '49447810-de68c09371bf9037b3e54ca3c';
  const BASE_URL = 'https://pixabay.com/api/';
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return { hits: [], totalHits: 0 };
  }
};

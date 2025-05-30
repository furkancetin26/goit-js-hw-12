import axios from 'axios';

const API_KEY = "50461526-1c4ae7086be4914a89297c276";
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 40) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Pixabay API Hatası: ${error.message}`);
  }
}

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33947023-c15fa4d03e325678c88d2d925';
const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
});
// Запрос на сервер
 
async function fetchPhoto (value="", page = 1)  {
  return await instance({ params: { q: `${value}`, page: `${page}` } })
};

const API = { fetchPhoto };
export default API;
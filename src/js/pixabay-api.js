import axios from 'axios';

const API_KEY = '50766153-5ae10d1890b4c2498d85a8209';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  try {
    const params = {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    };

    const response = await axios.get(BASE_URL, { params });
    
    // Проверяем, что получили корректный ответ
    if (!response.data || typeof response.data.hits === 'undefined') {
      throw new Error('Invalid API response structure');
    }
    
    return response.data;
  } catch (error) {
    // Обработка различных типов ошибок
    if (error.response) {
      // Ошибка от сервера (4xx, 5xx)
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен (проблемы с сетью)
      throw new Error('Network Error: Unable to connect to Pixabay API');
    } else {
      // Другие ошибки
      throw new Error(`Request Error: ${error.message}`);
    }
  }
}
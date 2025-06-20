import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalPages = 0;
const perPage = 15;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const searchInput = form.elements.searchQuery.value.trim();

  if (searchInput === '') {
    iziToast.warning({ 
      message: 'Please enter a search term.', 
      position: 'topRight' 
    });
    return;
  }

  // Если это новый поиск, сбрасываем состояние
  if (query !== searchInput) {
    query = searchInput;
    page = 1;
    clearGallery();
    hideLoadMoreButton();
  }

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.info({ 
        message: 'Sorry, there are no images matching your search query. Please try again.', 
        position: 'topRight' 
      });
      return;
    }

    // Уведомление об общем количестве найденных изображений только при первом поиске
    if (page === 1) {
      iziToast.success({ 
        message: `Hooray! We found ${data.totalHits} images.`, 
        position: 'topRight' 
      });
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / perPage);

    // Проверяем, есть ли еще страницы для загрузки
    if (page < totalPages) {
      showLoadMoreButton();
    } else if (page === totalPages && data.totalHits > perPage) {
      // Показываем сообщение о конце результатов только если было больше одной страницы
      iziToast.info({ 
        message: "We're sorry, but you've reached the end of search results.", 
        position: 'topRight' 
      });
    }
  } catch (error) {
    console.error('Search error:', error);
    iziToast.error({ 
      message: 'Something went wrong. Please try again later.', 
      position: 'topRight' 
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    // Плавная прокрутка после рендера новых изображений
    smoothScroll();

    // Проверяем, достигли ли конца коллекции
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({ 
        message: "We're sorry, but you've reached the end of search results.", 
        position: 'topRight' 
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Load more error:', error);
    iziToast.error({ 
      message: 'Failed to load more images. Please try again.', 
      position: 'topRight' 
    });
    // Возвращаем страницу назад в случае ошибки
    page -= 1;
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  // Получаем первую карточку галереи для расчета высоты
  const card = galleryContainer.querySelector('li:first-child');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
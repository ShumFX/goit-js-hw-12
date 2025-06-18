import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
    iziToast.warning({ message: 'Please enter a search term.', position: 'topRight' });
    return;
  }

  query = searchInput;
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found. Try another keyword.', position: 'topRight' });
      return;
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / perPage);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({ message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again later.', position: 'topRight' });
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

    smoothScroll();

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to load more images.', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const card = document.querySelector('.gallery a');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}


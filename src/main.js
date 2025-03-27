import { fetchData } from './js/pixabay-api.js';
import {
  clearGallery,
  formGallery,
  renderError,
  toggleLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more');
const loaderMore = document.querySelector('.loader');

let page = 1;
let searchQuery = '';
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  clearGallery(gallery);
  loadMoreBtn.classList.add('visually-hidden');

  const search = event.target['search-text'].value.trim();
  if (!search) {
    iziToast.error({
      backgroundColor: '#EF4040',
      messageColor: '#FAFAFB',
      theme: 'dark',
      progressBarColor: '#B51B1B',
      maxWidth: '432',
      messageSize: '16',
      position: 'topRight',
      message: `Input field should not be empty.`,
    });
    return;
  }

  searchQuery = search;
  page = 1;
  toggleLoader(true);

  try {
    const { hits, totalHits: newTotalHits } = await fetchData(
      searchQuery,
      page
    );

    totalHits = newTotalHits;
    if (hits.length === 0) {
      renderError();
    } else {
      formGallery(hits, gallery);
      toggleLoadMoreBtn(hits.length > 0);
    }
  } catch (error) {
    renderError();
  } finally {
    toggleLoader(false);
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  toggleLoader(true);
  loaderMore.classList.remove('visually-hidden');

  try {
    const { hits } = await fetchData(searchQuery, page);

    if (hits.length === 0 || gallery.children.length >= totalHits) {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#EF4040',
      });
      toggleLoadMoreBtn(false);
    } else {
      formGallery(hits, gallery);
      toggleLoadMoreBtn(true);
      scrollToNextGroup();
    }
  } catch (error) {
    renderError();
  } finally {
    toggleLoader(false);
    loaderMore.classList.add('visually-hidden');
  }
});

function toggleLoadMoreBtn(visible) {
  if (visible) {
    loadMoreBtn.classList.remove('visually-hidden');
  } else {
    loadMoreBtn.classList.add('visually-hidden');
  }
}

function scrollToNextGroup() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    const firstItem = galleryItems[galleryItems.length - 1];
    const { height } = firstItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}

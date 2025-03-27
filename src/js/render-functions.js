import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a');

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

export function formGallery(images, gallery) {
  // Create markup for each image
  const galleryMarkup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <ul class="cards-data">
          <li class="card-data"><h3>Likes</h3><p>${likes}</p></li>
          <li class="card-data"><h3>Views</h3><p>${views}</p></li>
          <li class="card-data"><h3>Comments</h3><p>${comments}</p></li>
          <li class="card-data"><h3>Downloads</h3><p>${downloads}</p></li>
        </ul>
      </li>
    `
    )
    .join('');

  // Insert markup
  gallery.insertAdjacentHTML('beforeend', galleryMarkup);

  lightbox.refresh();
}

export function renderError() {
  iziToast.error({
    backgroundColor: '#EF4040',
    messageColor: '#FAFAFB',
    theme: 'dark',
    progressBarColor: '#B51B1B',
    maxWidth: '432',
    messageSize: '16',
    position: 'topRight',
    message: `Sorry, there are no images matching your search query. Please try again!`,
  });
}

export function toggleLoader(loading) {
  const loader = document.querySelector('.loader');
  if (loading) {
    loader.classList.remove('visually-hidden');
  } else {
    loader.classList.add('visually-hidden');
  }
}

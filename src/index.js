import './css/styles.css';
import PixabayApiService from './js-components/pixabay-API';

// const APIKEY = '29521518-5bff3e3ab528698c58648398d';
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

// const options = {
//   headers: {
//     Accept: 'application/json',
//   },
// };

const pixabayApiService = new PixabayApiService();

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();
  clearPictureContainer();

  pixabayApiService.query =
    evt.currentTarget.elements.namedItem('searchQuery').value;
  pixabayApiService.resetPage();

  pixabayApiService.fetchPictures().then(hits => {
    console.log(hits);
    appendPictureMarkup(hits);
  });
}

function onLoadMore() {
  pixabayApiService.fetchPictures().then(hits => {
    console.log(hits);
    appendPictureMarkup(hits);
  });
}

function appendPictureMarkup(hits) {
  const markup = hits
    .map(
      hit => `<div class="photo-card">
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${hit.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function clearPictureContainer() {
  galleryEl.innerHTML = '';
}

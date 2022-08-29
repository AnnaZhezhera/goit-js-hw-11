import './css/styles.css';
import PixabayApiService from './js-components/pixabay-API';
import Notiflix from 'notiflix';

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
hideBtnOnLoadMore();

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore, false);

function onSearch(evt) {
  evt.preventDefault();
  clearPictureContainer();

  pixabayApiService.query =
    evt.currentTarget.elements.namedItem('searchQuery').value;

  if (pixabayApiService.query.trim() === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
    return;
  }

  pixabayApiService.resetPage();

  pixabayApiService.fetchPictures().then(hits => {
    console.log(hits);
    // console.log('TOTALItems', pixabayApiService.totalItems);
    appendPictureMarkup(hits);
    Notiflix.Notify.success(
      `Hooray! We found ${pixabayApiService.totalAvailableItemsCount} images.`
    );
    showBtnOnLoadMore();
  });
}

function onLoadMore() {
  if (pixabayApiService.query.trim() === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
    return;
  }

  pixabayApiService.fetchPictures().then(hits => {
    appendPictureMarkup(hits);
    if (
      pixabayApiService.loadedItemsCount >=
      // galleryEl.children.length >=
      pixabayApiService.totalAvailableItemsCount
    ) {
      hideBtnOnLoadMore();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function appendPictureMarkup(hits) {
  const markup = hits
    .map(
      hit => `<div class="photo-card">
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b><br>${hit.likes}
    </p>
    <p class="info-item">
    <b>Views:</b><br>${hit.views}
    </p>
    <p class="info-item">
    <b>Comments:</b><br>${hit.comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b><br>${hit.downloads}
    </p>
  </div>
</div>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function clearPictureContainer() {
  galleryEl.innerHTML = '';
  hideBtnOnLoadMore();
}

function showBtnOnLoadMore() {
  loadMoreBtn.style.visibility = 'visible';
}

function hideBtnOnLoadMore() {
  loadMoreBtn.style.visibility = 'hidden';
}

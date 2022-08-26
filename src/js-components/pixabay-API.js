export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPictures() {
    try {
      return fetch(
        `https://pixabay.com/api/?key=29521518-5bff3e3ab528698c58648398d&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=40`
      )
        .then(response => response.json())
        .then(data => {
          this.page += 1;

          console.dir(data);
          return data.hits;
        });
    } catch (error) {
      console.log('error:', error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

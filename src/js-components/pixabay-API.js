export default class PixabayApiService {
  searchQuery;
  page;
  items;
  totalItems;

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.items = 0;
    this.totalItems = 0;
  }

  async fetchPictures() {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=29521518-5bff3e3ab528698c58648398d&q=${this.searchQuery}&image_type=photo&page=${this.page}&orientation=horizontal&safesearch=true&per_page=40`
      );
      return response.json().then(data => {
        this.page += 1;
        this.items += 40;
        this.totalItems = data.totalHits;

        console.log('items on page:', this.items);
        console.log('Total hits', data.totalHits);
        console.dir(data);
        if (!data.hits.length) {
          throw new Error('No image found');
        }

        return data.hits;
      });
    } catch (error) {
      console.log('error:', error);
    }
  }

  resetPage() {
    this.page = 1;
    this.items = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get photoItems() {
    return this.items;
  }

  get loadedItemsCount() {
    return this.items;
  }

  get totalAvailableItemsCount() {
    return this.totalItems;
  }
}

// export default class PixabayApiService {
//   searchQuery;
//   page;
//   items;
//   totalItems;

//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.items = 0;
//     this.totalItems = 0;
//   }

//   fetchPictures() {
//     try {
//       return fetch(
//         `https://pixabay.com/api/?key=29521518-5bff3e3ab528698c58648398d&q=${this.searchQuery}&image_type=photo&page=${this.page}&orientation=horizontal&safesearch=true&per_page=40`
//       )
//         .then(response => response.json())
//         .then(data => {
//           this.page += 1;
//           this.items += 40;
//           this.totalItems = data.totalHits;

//           console.log('items on page:', this.items);
//           console.log('Total hits', data.totalHits);
//           console.dir(data);
//           if (!data.hits.length) {
//             throw new Error('No image found');
//           }

//           return data.hits;
//         });
//     } catch (error) {
//       console.log('error:', error);
//     }
//   }

//   resetPage() {
//     this.page = 1;
//     this.items = 0;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }

//   get photoItems() {
//     return this.items;
//   }

//   get loadedItemsCount() {
//     return this.items;
//   }

//   get totalAvailableItemsCount() {
//     return this.totalItems;
//   }
// }

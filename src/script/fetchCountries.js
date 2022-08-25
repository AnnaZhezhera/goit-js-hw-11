export default function fetchCountries(name = 'Afghanistan') {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(res => {
    console.log('res:', res);
    if (!res.ok) {
      throw Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return res.json();
  });
}

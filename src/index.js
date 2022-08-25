import './css/styles.css';
import fetchCountries from './script/fetchCountries';
import countryCardTpl from './templates/country-template.hbs';
import countryListTpl from './templates/country-list-tpl.hbs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

// app.set('view engine', 'hbs');
//test

// fetchCountries().then(country => {
//   console.log(country);
//   countryCard(country);
//   // .forEach(obj => console.log(obj));
//   const markup = countryCard(country);
//   countryInfoEl.insertAdjacentHTML('beforeend', markup);
//   console.log(markup);
// });

inputEl.addEventListener(
  'input',
  debounce(onCountrySearchChange, DEBOUNCE_DELAY)
);

function onCountrySearchChange(event) {
  let input = event.target.value.trim();
  console.log('Input', input);
  if (!input) {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
    return;
  }
  fetchCountries(input)
    .then(countries => {
      console.log('Then:', countries);

      countryListEl.innerHTML = '';
      countryInfoEl.innerHTML = '';

      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 1) {
        const markupList = countryListTpl(countries);
        countryListEl.innerHTML = markupList;
      } else if (countries.length === 1) {
        const markup = countryCardTpl(countries);
        countryInfoEl.innerHTML = markup;
      }
      //   else if (countries.length === 0) {
      //     alert('No country found');
      //     console.log('no data');
      //   }

      // countries.forEach(country => {
      //   console.log('Country:', country);

      //   const markup = countryCard(country);
      //   countryInfoEl.innerHTML = markup;
      //   console.log(markup);
      // });
      // countryCard(country);
      // // .forEach(obj => console.log(obj));
      // const markup = countryCard(country);
      // countryInfoEl.insertAdjacentHTML('beforeend', markup);
      // console.log(markup);
    })
    .catch(err => {
      console.log('err:', err);
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    });
}

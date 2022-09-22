import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchcountries.js';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const refs = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
refs.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(e) {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
  var name = e.target.value;
  name = name.trim();
  if (name.length !== 0) {
    API.ffol(name)
      .then(renderCountryCard)
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        console.log(error);
      });
  }
}

function renderCountryCard(country) {
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (country.length > 1) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    let CountryNames = createLi(country);
    countryList.insertAdjacentHTML('beforeend', CountryNames);
  } else {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    let info = createCard(country);
    countryInfo.insertAdjacentHTML('beforeend', info);
  }
}
function createCard(country) {
  let card = country[0];
  let leng = Object.values(card.languages).join(', ');
  return `<div><img src="${card.flags.svg}"  alt="${card.name.official}" width=25px> ${card.name.official}</div>
    <ul> 
    <li>Capital: ${card.capital}</li>
    <li>Population: ${card.population}</li>
    <li>languages: ${leng}</li>
    </ul>`;
}
function createLi(countrys) {
  return countrys
    .map(country => {
      return `<li><img src="${country.flags.svg}"  alt="${country.name.official}" width=25px> ${country.name.official}</li>`;
    })
    .join('');
}

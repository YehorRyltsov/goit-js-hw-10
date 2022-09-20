import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
refs.addEventListener('input', fetchCountries);

function fetchCountries(e) {
  var name = e.target.value;
  console.log(name);
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}

function renderCountryCard(country) {
  console.log(country);
  if (country.length > 1) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    let CountryNames = createLi(country);
    console.log(CountryNames);
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

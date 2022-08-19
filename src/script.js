//injecting current weekday and time
let now = new Date();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = week[now.getDay()];
let currentDate = document.querySelector("#current-date");
let hours = now.getHours() + "";
hours.padStart(2, 0);
let minutes = now.getMinutes() + "";
minutes.padStart(2, 0);
currentDate.innerHTML = `${weekday} ${hours}:${minutes}`;
//end of date injecting

//getting the current temperature
let apiKey = "aa0712e4fdeba47b56ee9e5d84ebf0ca";
function showCurrentTemperature(response) {
  let currentDegree = document.querySelector("#degree");
  let Temperature = Math.round(response.data.main.temp);
  currentDegree.innerHTML = `${Temperature}`;
}
//end of getting emperature

//showing searching city and temperature
let searchingInput = document.querySelector("#inlineFormInputGroupUsername");
let submitButton = document.querySelector("#search-button");

function showCurrentsearch(event) {
  event.preventDefault();
  let searchingInput = document.querySelector("#inlineFormInputGroupUsername");
  let currentCity = document.querySelector("#searching-city");
  currentCity.innerHTML = `${searchingInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchingInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

submitButton.addEventListener("click", showCurrentsearch);
//enf of showing searching city and temperature

//converting Celsius to Fahrenheit

let currentDegree = document.querySelector("#degree");
let celsiusLink = document.querySelector("#celsiusDegree");
let fahrenheitLink = document.querySelector("#fahrenheitDegree");
let celsius = currentDegree.innerHTML;

//function showCelsius(event) {
// event.preventDefault();
//let currentDegree = document.querySelector("#degree");
// currentDegree.innerHTML = celsius;
// let plus = document.querySelector("#plus");
// if (currentDegree.innerHTML <= 0) {
//   plus.innerHTML = "";
// }
//let celsius = Math.round(((fahrenheit - 32) * 5) / 9);
//}
function showFahrenheit(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#degree");
  let celsius = currentDegree.innerHTML;
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  currentDegree.innerHTML = fahrenheit;
  let plus = document.querySelector("#plus");
  if (currentDegree.innerHTML <= 0) {
    plus.innerHTML = "";
  }
  let fahrenheitLink = document.querySelector("#fahrenheitDegree");
  fahrenheitLink.setAttribute("onclick", "return false");
}

//celsiusLink.addEventListener("click", showCelsius);
//fahrenheitLink.addEventListener("click", showFahrenheit);
//end of converting Celsius to Fahrenheit

//Show Weather by current geolocation

function showGeoTemperature(response) {
  let currentCity = document.querySelector("#searching-city");
  currentCity.innerHTML = `${response.data.name}`;
  let currentDegree = document.querySelector("#degree");
  let Temperature = Math.round(response.data.main.temp);
  currentDegree.innerHTML = `${Temperature}`;
}

function showGeoWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showGeoTemperature);
}

function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showGeoWeather);
}

let geoBtn = document.querySelector("#geoBtn");
geoBtn.addEventListener("click", getGeolocation);

//End of Show Weather by current geolocation

//Reload the page
function reloadPage(event) {
  event.preventDefault();
  document.location.reload();
}

let reloadBtn = document.querySelector("#reload");
reloadBtn.addEventListener("click", reloadPage);
//End reloading

//Clear the search input
function clearSearchInput(event) {
  event.preventDefault();
  let searchingInput = document.querySelector("#inlineFormInputGroupUsername");
  searchingInput.value = "";
}

let clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", clearSearchInput);
// End of Clear the search input

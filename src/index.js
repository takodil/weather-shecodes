function showTemp(response) {
  let cityName = document.querySelector("#city-name");
  let cityTemp = document.querySelector("#current-temp");
  let cityWind = document.querySelector("#current-wind");
  let cityHumidity = document.querySelector("#current-humidity");
  let cityFeelsLike = document.querySelector("#current-feels-like");
  let searchedCity = response.data.name;
  let searchedCityTemp = Math.round(response.data.main.temp);
  let searchedCityWind = response.data.wind.speed;
  let searchedCityHumidity = response.data.main.humidity;
  let searchedCityFeelsLike = Math.round(response.data.main.feels_like);
  cityName.innerHTML = searchedCity;
  cityTemp.innerHTML = `${searchedCityTemp}°`;
  cityWind.innerHTML = `${searchedCityWind}m/s`;
  cityHumidity.innerHTML = `${searchedCityHumidity}%`;
  cityFeelsLike.innerHTML = `${searchedCityFeelsLike}°`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input");
  let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${unit}`;
  if (city.value) {
    axios.get(`${apiCityUrl}`).then(showTemp);
  } else {
    alert("Please enter a city");
  }
}

// function handlePosition(position) {
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${unit}&lon=${lon}&lat=${lat}`;
//   axios.get(`${apiCityUrl}`).then(showTemp);
// }

// function currentCity(response) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(handlePosition);
// }

function minuteFormatter(min) {
  var temp = min;
  temp += (min < 10 ? ":0" : ":") + min;
  return temp;
}

let now = new Date();
let day = now.getDay();
let dayName = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wedday",
  "Thuday",
  "Friday",
  "Saturday"
];
day = dayName[day];
let apiKey = "211e843ea737bc5c3e45b740358e30e3";
let unit = "metric";
let hours = now.getHours();
let minutes = now.getMinutes();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${hours}:${minuteFormatter(minutes)}`;

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

// let myLocationButton = document.querySelector("#my-location-button");
// searchButton.addEventListener("click", currentCity);

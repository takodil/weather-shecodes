function showTemp(response) {
  let cityName = document.querySelector("#city-name");
  let cityTemp = document.querySelector("#current-temp");
  let cityWind = document.querySelector("#current-wind");
  let cityHumidity = document.querySelector("#current-humidity");
  let cityFeelsLike = document.querySelector("#current-feels-like");
  let cityWeatherIcon = document.querySelector("#selected-weather-icon");
  let cityWeatherDescription = document.querySelector("#weather-description");
  let currentTime = document.querySelector("#current-time");
  let searchedCity = response.data.name;
  celsiusTemperature = Math.round(response.data.main.temp);
  let searchedCityWind = response.data.wind.speed;
  let searchedCityHumidity = response.data.main.humidity;
  let searchedCityFeelsLike = Math.round(response.data.main.feels_like);
  let searchedWeatherIcon = response.data.weather[0].icon;
  let searchedWeatherDescription = response.data.weather[0].description;

  currentTime.innerHTML = `${formatDateResponse(response.data.dt * 1000)}`;
  cityName.innerHTML = searchedCity;
  cityTemp.innerHTML = `${celsiusTemperature}`;
  cityWind.innerHTML = `${searchedCityWind}m/s`;
  cityHumidity.innerHTML = `${searchedCityHumidity}%`;
  cityFeelsLike.innerHTML = `${searchedCityFeelsLike}°C`;
  cityWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${searchedWeatherIcon}@2x.png`
  );
  cityWeatherDescription.innerHTML = searchedWeatherDescription;
}

function showCity(city) {
  let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiCityUrl}`).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = null;
  let firstHour = null;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  for (let i = 0; i < 6; i++) {
    forecast = response.data.list[i];
    firstHour = formatHoursResponse(forecast.dt * 1000);
    firstHour.innerHTML = firstHour;
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
          ${firstHour}
      </h3>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png">
      <div class="weather-forecast-temp">
          <strong>
              ${Math.round(forecast.main.temp_max)}°
          </strong>
          ${Math.round(forecast.main.temp_min)}°
      </div>
  </div>
  `;
  }
}

function formatHoursResponse(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatDateResponse(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day}, ${formatHoursResponse(timestamp)}`;
}

function searchCity() {
  let city = document.querySelector("#city-search-input");
  if (city.value) {
    showCity(city.value);
  } else {
    alert("Please enter a city");
  }
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${unit}&lon=${lon}&lat=${lat}`;
  axios.get(`${apiCityUrl}`).then(showTemp);
}

function currentCity(response) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function minuteFormatter(min) {
  var temp = min;
  temp += (min < 10 ? ":0" : ":") + min;
  return temp;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  celciusConvertLink.classList.remove("active");
  fahrenheitConvertLink.classList.add("active");
  let tempFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(tempFahrenheit);
}

function displayCelciusTemp(response) {
  let tempCelcius = document.querySelector("#current-temp");
  celciusConvertLink.classList.add("active");
  fahrenheitConvertLink.classList.remove("active");
  tempCelcius.innerHTML = celsiusTemperature;
}

let apiKey = "211e843ea737bc5c3e45b740358e30e3";
let unit = "metric";

let celsiusTemperature = null;

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

let myLocationButton = document.querySelector("#my-location-button");
myLocationButton.addEventListener("click", currentCity);

let fahrenheitConvertLink = document.querySelector("#fahrenheit-link");
fahrenheitConvertLink.addEventListener("click", convertToFahrenheit);

let celciusConvertLink = document.querySelector("#celcius-link");
celciusConvertLink.addEventListener("click", displayCelciusTemp);

showCity("Berlin");

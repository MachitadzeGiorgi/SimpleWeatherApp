const cityName = document.getElementById("cityname");
const dateElement = document.getElementById("date");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const visibilityElement = document.getElementById("visibility");
const feelsLikeElement = document.getElementById("feelslike");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const iconElement = document.getElementById("icon");
const sunElement = document.getElementById("sun");

const apiKey = "901a873c89c7644f176de6250ec3f438";
let url = "";

function getWeatherData(latitude, longitude) {
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      cityName.textContent = data.name;
      dateElement.textContent = new Date().toLocaleDateString();
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
      visibilityElement.textContent = `${data.visibility / 1000}km`;
      feelsLikeElement.textContent = `${Math.round(data.main.feels_like)}°C`;
      humidityElement.textContent = `${data.main.humidity}%`;
      windElement.textContent = `${Math.round(data.wind.speed)}km/h`;
      iconElement.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    })
    .catch((error) => console.log(error));
}

function showError(error) {
  cityName.textContent = "Unable to retrieve your location";
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeatherData(latitude, longitude);
  }, showError);
} else {
  cityName.textContent = "Geolocation is not supported by this browser.";
}

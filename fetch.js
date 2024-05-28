import * as listeners from "./listeners.js";
import * as script from "./script.js";
import { ui, updateUi } from "./ui.js";

const API_KEY = "f1053c4cf59e4d2783b143837242605";
let weatherDataStore = {};

async function fetchWeather(q) {
  ui.loader.style.display = "flex";
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${q}&days=7&aqi=yes&alerts=yes`,
      { mode: "cors" }
    );

    const weatherData = await response.json();

    if (weatherData.error === undefined) {
      weatherDataStore = weatherData;
      updateUi(weatherDataStore);
    } else {
      alert("Error: " + weatherData.error.message);
    }
    ui.loader.style.display = "none";
  } catch (error) {
    console.log(error);
    ui.loader.style.display = "none";
  }
}

function fetchByLocation() {
  ui.loader.style.display = "flex";
  try {
    navigator.geolocation.getCurrentPosition(locationSucces, locationError, {
      enableHighAccuracy: true,
      maximumAge: 10000,
    });

    function locationSucces(location) {
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      fetchWeather(`${lat},${lon}`);
    }
    ui.loader.style.display = "none";
    function locationError() {
      let errorMessage;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          errorMessage = "An unknown error occurred.";
          break;
      }
      alert(errorMessage);
    }
  } catch (error) {
    alert("error getting location data");
    ui.loader.style.display = "none";
  }
}

export { fetchWeather, weatherDataStore, fetchByLocation };

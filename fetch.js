import * as listeners from "./listeners.js";
import * as script from "./script.js";
import { ui, updateUi } from "./ui.js";

const API_KEY = "f1053c4cf59e4d2783b143837242605";
let weatherDataStore = {};

async function fetchWeather(q) {
    try {
        ui.loader.style.display = 'flex';
        const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${q}&days=7&aqi=yes&alerts=yes`,
            { mode: "cors" }
          );
        
          const weatherData = await response.json();

          if(weatherData.error === undefined) {
            weatherDataStore = weatherData;
            updateUi(weatherDataStore);
          } else {
            alert("Error: " + weatherData.error.message);
          }
        ui.loader.style.display = 'none';
    } catch (error) {
        console.log(error);
    }
  }

function fetchByLocation () {
    navigator.geolocation.getCurrentPosition(locationSucces, locationError);

        function locationSucces (location) {
            const lat = location.coords.latitude;
            const lon = location.coords.longitude;

            fetchWeather(`${lat},${lon}`);
        }
    
        function locationError () {
            alert("No permission for location. Search for location by input!");
        }
}

  export {fetchWeather, weatherDataStore, fetchByLocation}
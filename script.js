const API_KEY = "f1053c4cf59e4d2783b143837242605";

async function fetchWeather(cityName) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=yes&alerts=yes`,
    { mode: "cors" }
  );

  const weatherData = await response.json();

  console.log(weatherData);
}

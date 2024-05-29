const ui = {
  gpsLocate: document.querySelector("#gps_locate"),
  loader: document.querySelector("#loader"),
  input: document.querySelector("input"),
  changeC: document.querySelector("#change_c"),
  changeF: document.querySelector("#change_f"),
  cityName: document.querySelector("#cityName"),
  temp: document.querySelector("#temp"),
  tempUnit: document.querySelector("#temp_unit"),
  currentImg: document.querySelector("#currentImg"),
  currentDay: document.querySelector("#current_day"),
  currentTime: document.querySelector("#current_time"),
  condition: document.querySelector("#condition"),
  humidity: document.querySelector("#humidity"),
  feels_like: document.querySelector("#feels_like"),
  forecastCards: document.querySelector("#forecastCards"),
  uvIndex: document.querySelector("#uv-index"),
  wind: document.querySelector("#wind"),
  windUnit: document.querySelector("#wind_unit"),
  windDir: document.querySelector("#wind-dir"),
  sunrise: document.querySelector("#sunrise"),
  sunset: document.querySelector("#sunset"),
  humidityCard: document.querySelector("#humidity_card"),
  visibility: document.querySelector("#visibility"),
  visibilityUnit: document.querySelector("#visibility-unit"),
  forecastByHour: document.querySelector('#forecastByHour'),
};

function updateUi(
  weatherData,
  unit = ui.changeC.classList.contains("active") ? "c" : "f"
) {
  const location = weatherData.location;
  const forecast = weatherData.forecast.forecastday;
  const current = weatherData.current;

  console.log(location);
  console.log(forecast);
  console.log(current);

  //Main screen
  ui.cityName.textContent = location.name;
  ui.currentImg.src = `./assets/images/weather${getImagePath(
    current.condition.icon
  )}`;
  ui.currentDay.textContent = getDayName(current.last_updated);
  ui.currentTime.textContent = `${new Date(
    current.last_updated
  ).getHours()}:${String(new Date(current.last_updated).getMinutes()).padStart(2, '0')}`;
  ui.condition.textContent = current.condition.text;
  ui.humidity.textContent = `${current.humidity}%`;
  ui.uvIndex.textContent = current.uv;
  ui.windDir.textContent = current.wind_dir;
  ui.sunrise.textContent = forecast[0].astro.sunrise;
  ui.sunset.textContent = forecast[0].astro.sunset;
  ui.humidityCard.textContent = current.humidity;

  //By hour
  let hourCards = '';
  let currentTime = new Date();

  forecast[0].hour.forEach((forecast) => {
    let time = new Date(forecast.time);
    if (time >= currentTime) {
        const temp = unit === "c" ? parseInt(forecast.temp_c) + "°" : parseInt(forecast.temp_f) + "°";
        const rain = forecast.chance_of_rain + "%";
        hourCards += `<div class="hour-card">
                        <div class="day-card_day">${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}</div>
                        <div class="day-card_icon"><img src="./assets/images/weather${getImagePath(
                            forecast.condition.icon
                          )}" alt="" width="55"></div>
                        <div class="day-card_temp"><span>${temp} </span><img src="./assets/images/raindrop.png" width="12" alt=""><span> ${rain}</span>
                        </div>
                    </div>`
    }
  })
  ui.forecastByHour.innerHTML = hourCards;

  //Forecast
  let forecastCards = "";
  forecast.forEach((day) => {
    const min =
      unit === "c" ? parseInt(day.day.mintemp_c) : parseInt(day.day.mintemp_f);
    const max =
      unit === "c" ? parseInt(day.day.maxtemp_c) : parseInt(day.day.maxtemp_f);
      forecastCards += `<div class="day-card">
                <div class="day-card_day bold">${getDayName(day.date).substring(
                  0,
                  3
                )}</div>
                <div class="day-card_icon"><img src="${`./assets/images/weather${getImagePath(
                  day.day.condition.icon
                )}`}" alt="" width="55"></div>
                <div class="day-card_temp"><span>${max}&#176; </span> <span class="grey">${min}&#176;</span>
                </div>
            </div>`;
  });
  ui.forecastCards.innerHTML = forecastCards;

  if (unit === "c") {
    //Main screen
    ui.tempUnit.textContent = "C";
    ui.temp.textContent = parseInt(current.temp_c);
    ui.feels_like.textContent = parseInt(current.feelslike_c) + "°C";
    ui.wind.textContent = current.wind_kph;
    ui.windUnit.textContent = "km/h";
    ui.visibility.textContent = current.vis_km;
    ui.visibilityUnit.textContent = "km";
  } else {
    //Main screen
    ui.tempUnit.textContent = "F";
    ui.temp.textContent = parseInt(current.temp_f);
    ui.feels_like.textContent = parseInt(current.feelslike_f) + "°F";
    ui.wind.textContent = current.wind_mph;
    ui.windUnit.textContent = "m/h";
    ui.visibility.textContent = current.vis_miles;
    ui.visibilityUnit.textContent = "miles";
  }
}

function getImagePath(url) {
  let parts = url.split("/");
  let substring = "/" + parts[parts.length - 2] + "/" + parts[parts.length - 1];
  return substring;
}

function getDayName(dateString) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(dateString);
  return days[date.getDay()];
}

window.getDayName = getDayName;

export { ui, updateUi };

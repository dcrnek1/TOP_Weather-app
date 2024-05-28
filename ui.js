const ui = {
    gpsLocate: document.querySelector('#gps_locate'),
    loader: document.querySelector('#loader'),
    input: document.querySelector('input'),
    changeC: document.querySelector('#change_c'),
    changeF: document.querySelector('#change_f'),
    cityName: document.querySelector('#cityName'),
    temp: document.querySelector('#temp'),
    tempUnit: document.querySelector('#temp_unit'),
    currentImg: document.querySelector('#currentImg'),
    currentDay: document.querySelector("#current_day"),
    currentTime: document.querySelector("#current_time"),
    condition: document.querySelector("#condition"),
    humidity: document.querySelector("#humidity"),
    feels_like: document.querySelector("#feels_like"),
}

function updateUi (weatherData, unit = 'c') {
    const location = weatherData.location;
    const forecast = weatherData.forecast;
    const current = weatherData.current;

    console.log(location);
    console.log(forecast);
    console.log(current);

    ui.cityName.textContent = location.name;
    ui.currentImg.src = `./assets/images/weather${getImagePath(current.condition.icon)}`;
    ui.currentDay.textContent = getDayName(current.last_updated);
    ui.currentTime.textContent = `${(new Date(current.last_updated)).getHours()}:${(new Date(current.last_updated)).getMinutes()}`;
    ui.condition.textContent = current.condition.text;
    ui.humidity.textContent = current.humidity + "%";

    if (unit === 'c') {
        ui.tempUnit.textContent = 'C'
        ui.temp.textContent = current.temp_c;
        ui.feels_like.textContent = current.feelslike_c + "°C";
    } else {
        ui.tempUnit.textContent = 'F'
        ui.temp.textContent = current.temp_f;
        ui.feels_like.textContent = current.feelslike_f + "°F";
    }
}

function getImagePath(url) {
    let parts = url.split('/');
    let substring = "/" + parts[parts.length - 2] + "/" + parts[parts.length - 1];
    return substring;
}

function getDayName(dateString) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date(dateString);
    return days[date.getDay()];
}

window.getDayName = getDayName;

export {ui, updateUi};
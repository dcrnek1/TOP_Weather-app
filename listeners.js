import * as fetch from "./fetch.js";
import { ui, updateUi } from "./ui.js";

ui.gpsLocate.addEventListener('click', fetch.fetchByLocation)

ui.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        fetch.fetchWeather(e.target.value);
        e.target.value = '';
        e.target.blur();
    }
})

ui.changeC.addEventListener('click', (e) => {
    updateUi(fetch.weatherDataStore, 'c');
    ui.changeC.classList.add('active');
    ui.changeF.classList.remove('active');
})

ui.changeF.addEventListener('click', (e) => {
    updateUi(fetch.weatherDataStore, 'f');
    ui.changeF.classList.add('active');
    ui.changeC.classList.remove('active');
})

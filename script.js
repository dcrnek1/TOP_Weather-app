import * as listeners from "./listeners.js";
import * as fetch from "./fetch.js";
import { updateUi } from "./ui.js";

fetch.fetchWeather("London");

function changeUnit(unit) {
  updateUi(fetch.weatherDataStore, unit);
}

window.changeUnit = changeUnit;

export {};

/*jshint esversion: 8 */
const API_key = "a9953a940685c631ebcd1117eeb25ca4";
async function getGeoCode() {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a9953a940685c631ebcd1117eeb25ca4`,
    { mode: "cors" }
  );
  const data = await response.json();
  const latitude = data[0].lat;
  const longitude = data[0].lon;
  console.log(latitude, longitude);
}

async function getWeather() {
  const lat = "51.5073219";
  const lon = "-0.1276474";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`,
    { mode: "cors" }
  );
  const data = await response.json();
  console.log(data);
}

getGeoCode();
getWeather();

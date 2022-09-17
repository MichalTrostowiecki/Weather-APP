/*jshint esversion: 8 */

const API_key = "a9953a940685c631ebcd1117eeb25ca4";

// We are getting a cordinates for specific city that API needs to display data for us
async function getGeoCode() {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_key}`,
    { mode: "cors" }
  );
  const data = await response.json();
  const latitude = data[0].lat;
  const longitude = data[0].lon;
  getWeather(latitude, longitude);
}

// get weather based on latitute and longitute provided
//That's how the API knows what location we want to get data for
async function getWeather(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`,
    { mode: "cors" }
  );
  const data = await response.json();
  console.log(data);
}

getGeoCode();

/*jshint esversion: 8 */

async function getGeoCode() {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a9953a940685c631ebcd1117eeb25ca4`,
    { mode: "cors" }
  );
  const data = await response.json();
  const latitude = data[0].lat;
  const longitude = data[0].lon;
  console.log(latitude, longitude);
  console.log(data[0]);
}

// async function getWeather()

getGeoCode();

/*jshint esversion: 8 */

const API_key = "a9953a940685c631ebcd1117eeb25ca4";

// We are getting a cordinates for specific city that API needs to display data for us
async function getGeoCode(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_key}`,
      { mode: "cors" }
    );
    const data = await response.json();
    await getWeather(data[0].lat, data[0].lon);
  } catch (error) {
    console.error(error);
  }
}

// get weather based on latitute and longitute provided
//That's how the API knows what location we want to get data for
async function getWeather(lat, lon) {
  units = "metric";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=${units}`,
    { mode: "cors" }
  );
  const data = await response.json();
  displayData(data);
}

// getGeoCode();

// DOM manipulation functions below
function usersCity() {
  const inputBtn = document.querySelector(".btn-input");
  inputBtn.addEventListener("click", () => {
    const input = document.querySelector(".user-input");
    getGeoCode(input.value);
  });
}

// this function will display all the weather info based on user input
function displayData(data) {
  let secSunrise = data.sys.sunrise;
  let dateSunrise = new Date(secSunrise * 1000);
  let timeStrSunrise = dateSunrise.toLocaleTimeString();

  let secSunset = data.sys.sunset;
  let dateSunset = new Date(secSunset * 1000);
  let timeStrSunset = dateSunset.toLocaleTimeString();

  document.querySelector("#city").innerHTML = `${data.name}`;
  document.querySelector(
    "#img"
  ).src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.querySelector("#current-temp").textContent = `Temperature: ${
    Math.round(data.main.temp) + "°C"
  }`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind Speed: ${data.wind.speed} Km/h`;
  document.querySelector(
    "#feels-like"
  ).textContent = `Feels Like:${data.main.feels_like}`;
  document.querySelector(
    "#humidity"
  ).textContent = `Humidity: ${data.main.humidity}`;
  document.querySelector("#sunrise").textContent = `${timeStrSunrise}`;
  document.querySelector("#sunset").textContent = `${timeStrSunset}`;

  console.log(data);
}

usersCity();

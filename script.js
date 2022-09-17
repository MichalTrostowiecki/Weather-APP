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
    await get5day(data[0].lat, data[0].lon);
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

  //I've written that to capitalize first letter of the description as API sends it with small letters
  const weatherDescription = data.weather[0].description;
  let capitalizeDescription =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

  document.querySelector(
    "#weather-description"
  ).textContent = `${capitalizeDescription}`;

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
  document.querySelector("#feels-like").textContent = `Feels Like: ${Math.round(
    data.main.feels_like
  )}°C`;
  document.querySelector(
    "#humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  document.querySelector("#sunrise").textContent = `${timeStrSunrise}`;
  document.querySelector("#sunset").textContent = `${timeStrSunset}`;
}

async function get5day(lat, lon) {
  try {
    units = "metric";
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=${units}`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    displayNext3Hours(data);
  } catch (error) {
    console.error(error);
  }
}
//This function extracts whatever hours left for today to show me a weather
function displayNext3Hours(data) {
  let today = new Date();
  let day = String(today.getDate());

  console.log(day);
  const days = data.list;
  for (i = 0; i < days.length; i++) {
    let sec = data.list[i].dt;
    let date = new Date(sec * 1000);
    let currentDay = String(date.getDate());
    let timeStrSunrise = date.toLocaleDateString();
    if (day === currentDay) {
      console.log(data.list[i].main);
    } else {
    }
  }
}

usersCity();

/*jshint esversion: 8 */

const API_key = "a9953a940685c631ebcd1117eeb25ca4";

function creatingDom() {
  const weatherCard = document.querySelector(".weatherCard-container");
  weatherCard.innerHTML = `
  <div class="main-info">
        <p id="city"></p>
        <p id="current-temp"></p>
        <img src="#" alt="img" id="img" />
        <p id="weather-description"></p>
      </div>
      <div class="other-info">
        <div class="sunrise-sunset">
          <div class="sunrise-container">
            <img src="./sunrise.png">
            <p id="sunrise"></p> 
          </div>
          <div class="sunset-container">
            <img src="./sunset.png">
            <p id="sunset"></p> 
          </div>
        </div>
        
          <div class="wind">
            <i class="fa-solid fa-wind"></i>
            <p id="wind"></p>
          </div>
          <p id="feels-like"></p>
          <p id="humidity"></p>
      </div>`;
}

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
  creatingDom();
  displayData(data);
}

// getGeoCode();

// DOM manipulation functions below
function usersCity() {
  const inputBtn = document.querySelector(".btn-input");
  const resetBtn = document.querySelector(".reset-btn");
  inputBtn.addEventListener("click", () => {
    const input = document.querySelector(".user-input");
    clear3hoursDisplay();
    getGeoCode(input.value);
  });
  resetBtn.addEventListener("click", clearWindow);
}

// this function clears previous weather search;
function clearWindow() {
  const weatherCard = document.querySelector(".weatherCard-container");
  const hourlyWeather = document.querySelector(".hourlyWeather");
  if (weatherCard.innerHTML !== "") {
    weatherCard.innerHTML = "";
    hourlyWeather.innerHTML = "";
  }
}

function clear3hoursDisplay() {
  const hourlyWeather = document.querySelector(".hourlyWeather");
  hourlyWeather.innerHTML = "";
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

  document.querySelector("#current-temp").textContent = `${
    Math.round(data.main.temp) + "°C"
  }`;
  document.querySelector("#wind").innerHTML = `${data.wind.speed} Km/h`;
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
    displayNext3Hours(data);
  } catch (error) {
    console.error(error);
  }
}
// This function display weather for the next 24 hours
function displayNext3Hours(data) {
  for (i = 0; i < 9; i++) {
    threeHoursDisplay(data);
  }
}

// this function create all the DOM elements for 3 hours display
function threeHoursDisplay(weatherData) {
  const container = document.querySelector(".hourlyWeather");
  const weatherDisplayCard = document.createElement("div");
  const timeOfDay = document.createElement("p");
  const temperature = document.createElement("p");
  const icon = document.createElement("img");
  const weatherDescription = document.createElement("p");

  //This capitalize first letter of the weather description
  const description = weatherData.list[i].weather[0].description;
  let capitalizeDescription =
    description.charAt(0).toUpperCase() + description.slice(1);

  weatherDisplayCard.classList.add("three-hourly-display");
  container.classList.add("active");
  timeOfDay.textContent = weatherData.list[i].dt_txt;
  temperature.textContent = Math.round(weatherData.list[i].main.temp) + "°C";
  icon.src = `http://openweathermap.org/img/w/${weatherData.list[i].weather[0].icon}.png`;
  weatherDescription.textContent = capitalizeDescription;

  container.appendChild(weatherDisplayCard);
  weatherDisplayCard.appendChild(timeOfDay);
  weatherDisplayCard.appendChild(temperature);
  weatherDisplayCard.appendChild(icon);
  weatherDisplayCard.appendChild(weatherDescription);
  activateDisplay(container);
}

usersCity();

// This function add "active" class to hourlyWeather container
// I'll use it later for toggle and styling
function activateDisplay(container) {
  if (container.classList.contains("active")) {
    console.log("I'm active");
  } else {
    console.log("I'm not");
  }
}

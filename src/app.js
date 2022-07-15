function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = ` 0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = ` 0${minutes}`;
  }
  let dates = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "	May",
    "June",
    "July",
    "	August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `<strong>${day} ${dates} ${month} ${hours}:${minutes}</strong>`;
}
let time = document.querySelector("#timeId");
let now = new Date();
time.innerHTML = formatDate(now);

function displayForcast(response) {
  console.log(response.data.daily);
  let dayElement = response.data.daily;

  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = ` <div class="days" id="forcast">`;
  //let days = [dayElementone, dayElementwo, dayElementtree, dayElementfour];
  let allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let tempMin = response.data.daily[0].temp.min;

  let tempMax = response.data.daily[0].temp.max;
  let icon = response.data.daily[0].weather[0].icon;
  console.log(icon);
  console.log(tempMin);
  dayElement.forEach(function (forcastDay) {
    forcastHTML =
      forcastHTML +
      ` 
        <div class="week Sun">
          <div class="weather-forcast-date">${forcastDay.dt}</div>
          
           <br /><img src=" http://openweathermap.org/img/wn/10d@2x.png" width="66px";
           height="55px"/></i><br />
           <div class="weather-forcast-temperatures">
            <span class="weather-forcast-temperatures-max">
            ${forcastDay[0].temp.max}°
            </span> 
           <span class="weather-forcast-temperature-min">
           ${forcastDay[0].temp.min}°
           </span>
          </div>
        </div>
        `;
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
  console.log(forcastHTML);
}
function getForecast(coords) {
  console.log(coords.lon);
  let apiKey = "1916e467d6475f3e271325f70b379c90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
  console.log(apiUrl);
}

function elementTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let h2 = document.querySelector("#temp");
  let sky = document.querySelector("#skyId");
  let humidity = document.querySelector("#humId");
  let visiblity = document.querySelector("#visiblyId");
  celeciusTemperature = response.data.main.temp;
  h2.innerHTML = Math.round(celeciusTemperature);
  let elementSky = `${response.data.weather[0].main}`;
  let elementHumidity = `${response.data.main.humidity}`;
  let visibility = `${response.data.visibility}`;
  let newCity = document.querySelector("h1");
  let city = `${response.data.name}`;
  sky.innerHTML = elementSky;
  humidity.innerHTML = elementHumidity;
  visiblity.innerHTML = visibility;
  newCity.innerHTML = city;
  getForecast(response.data.coord);
}
function showCity(city) {
  let apiKey = "1916e467d6475f3e271325f70b379c90";
  let unite = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(elementTemperature);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#inputId").value;
  showCity(city);
}
let button = document.querySelector("#formId");
button.addEventListener("submit", search);

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unite = "metric";
  let apiKey = "1916e467d6475f3e271325f70b379c90";
  let apiEndpint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(elementTemperature);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function displayFaranhaitTemperature(event) {
  event.preventDefault();
  celsusitLink.classList.remove("active");
  faranhaitLink.classList.add("active");
  let temp = document.querySelector("#temp");
  let faranhaitTemp = (celeciusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(faranhaitTemp);
}
function displaycelsiusTemperature(event) {
  event.preventDefault();
  celsusitLink.classList.add("active");
  faranhaitLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celeciusTemperature);
}

let celeciusTemperature = null;

let clickbutton = document.querySelector("#currentId");
clickbutton.addEventListener("click", currentPosition);

let faranhaitLink = document.querySelector("#faranhait-link");
faranhaitLink.addEventListener("click", displayFaranhaitTemperature);

let celsusitLink = document.querySelector("#celsius-link");
celsusitLink.addEventListener("click", displaycelsiusTemperature);

showCity("Madrid");

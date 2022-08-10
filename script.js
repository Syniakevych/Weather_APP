let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
document.getElementById("date").innerHTML = `${day}, ${date} ${month} ${year}`;

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
document.querySelector("#time").innerHTML = `${hours}:${minutes}`;


function showWeather(response){
  let iconElement=document.querySelector("#icon");
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#temp").innerHTML=Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML=response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  celsiusTemp = response.data.main.temp;
}


function searchCity(city) {
  let apiKey="0037126c84f0bf4c3edaf22e63429f61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city=document.querySelector("#city-input").value;
  searchCity(city);
}
let button = document.querySelector("#search-form");
button.addEventListener("click", search);

function showLocation(position) {
  let apiKey = "0037126c84f0bf4c3edaf22e63429f61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showFahrenheitTemp(event) {
event.preventDefault();
let temperatureElement=document.querySelector("#temp");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemp=(temperatureElement.innerHTML * 1.8) + 32;
temperatureElement.innerHTML=Math.round(fahrenheitTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
  let temperatureElement=document.querySelector("#temp");
  temperatureElement.innerHTML=Math.round(celsiusTemp);
}

function displayForecast(){
  let forecastElement=document.querySelector("#weather-forecast");
  let days=["Thu","Fri","Sat","Sun","Mon"];
  let forecastHTML=`<div class="row">`;   
  days.forEach(function(day) {
    forecastHTML=
      forecastHTML+
              `
            <div class="col">
              <div class="data">${day}</div>
              <img src="cloudy.png" alt="cloudy" width="50" />
              <br />
              20℃ <span class="night">11℃</span>
            </div>
            `;
  });
    forecastHTML=forecastHTML+`</div>`;
    forecastElement.innerHTML=forecastHTML;
   }

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",showCelsiusTemp);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",showFahrenheitTemp);

searchCity("Lviv");

displayForecast();
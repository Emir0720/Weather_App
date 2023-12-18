const api = {
    key: "e0a31e68051920d2e35846c4972b2a45",
    base: "https://api.openweathermap.org/data/2.5/"
}

const weatherForm = document.getElementById("weatherForm");
weatherForm.addEventListener("submit", getInput);

function getInput(event) {
    event.preventDefault();
    const search = document.querySelector(".search");
    getData(search.value);
    console.log(search.value);
}

function getData(city) {
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
}

function displayData(response) {
    if (response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        error.style.color = "red";
        error.style.fontWeight = "bold";
        error.style.backgroundColor = "white";
        search.value = "";
    } else {

        const mainContainer = document.querySelector(".main-container");
    mainContainer.classList.remove("sunny", "rainy", "cloudy");

    const weatherCondition = response.weather[0].main.toLowerCase();
    if (weatherCondition === "clear") {
        mainContainer.classList.add("sunny");
    } else if (weatherCondition === "rain") {
        mainContainer.classList.add("rainy");
    } else if (weatherCondition === "clouds") {
        mainContainer.classList.add("cloudy");
    }

    const locationCurrent = document.querySelector(".location, .current");
    locationCurrent.style.color = "white";
    locationCurrent.style.backgroundColor = "rgba(21, 21, 21, 0.5)";
    locationCurrent.style.padding = "10px";
    locationCurrent.style.borderRadius = "5px";
    locationCurrent.style.marginTop = "10px";

    const tempWeatherTempRange = document.querySelector(".temp, .weather, .temp-range");
    tempWeatherTempRange.style.padding = "5px";
    tempWeatherTempRange.style.borderRadius = "3px";
    tempWeatherTempRange.style.marginTop = "5px";
    tempWeatherTempRange.style.fontWeight = "bold";

    const cityDate = document.querySelector(".city, .date");
    cityDate.style.fontWeight = "bold";

    const tempSpan = document.querySelector(".temp span");
    tempSpan.style.fontWeight = "bold";

    const weatherIcon = document.querySelector(".weather-icon");
    const iconURL = "http://openweathermap.org/img/w/";
    weatherIcon.src = iconURL + response.weather[0].icon + ".png";

    const error = document.querySelector(".error");
    error.textContent = ""; // Hata mesajını temizle

    const city = document.querySelector(".city");
    city.innerText = `${response.name}, ${response.sys.country}`;

    const today = new Date();
    const date = document.querySelector(".date");
    date.innerText = dateFunction(today);

    const temp = document.querySelector(".temp");
    temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

    const weather = document.querySelector(".weather");
    weather.innerText = `Weather: ${response.weather[0].main}`;

    const tempRange = document.querySelector(".temp-range");
    tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

    // Hava durumu bilgilerini gösterdikten sonra
    locationCurrent.style.display = "block";
    tempWeatherTempRange.style.display = "block";
}
}

function dateFunction(d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

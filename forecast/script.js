mapboxgl.accessToken = '';
const weathearApiKey = ''
const searchApiKey = ''

const exclude = 'minutely,hourly,alerts'
const weekDays = ["SUNDAY", 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

const backgroundButton = document.querySelector(".bg-button")
const searchInput = document.querySelector(".search__input")
const searchButton = document.querySelector(".search__button")
const tempUnits = document.querySelector(".temp-units")
const coordinateLng = document.querySelector(".coordinate__lng")
const coordinateLat = document.querySelector(".coordinate__lat")
const currentTemp = document.querySelector(".current__temp")
const currentPlace = document.querySelector(".current__place")
const currentDatetime = document.querySelector(".current__date")
const currentWeatherDesc = document.querySelector(".current__weather-desc")
const currentWeatherIcon = document.querySelector(".current__weather-icon")
const forecast = document.querySelector(".forecast")
const forecastCardTemps = document.querySelectorAll(".card__temp")

const myMap = document.querySelector(".map")
const map = new mapboxgl.Map({
    container: 'map',                                   // container ID
    style: 'mapbox://styles/mapbox/streets-v11',        // style URL
    center: [28.106545993011792, 54.02065059650613],    // starting position [lng, lat]
    zoom: 9                                             // starting zoom
});

setLngLat()
setWeather()

setInterval(setCurrnetDateTime, 1000)

myMap.addEventListener('mouseup', () => setWeather())
myMap.addEventListener('mousemove', () => setLngLat())
myMap.addEventListener('mousewheel', () => setLngLat())

backgroundButton.addEventListener('click', () => {
    backgroundImgUrl = getRandomBackgroundUrl()
    document.querySelector('body').style.backgroundImage = `url(${backgroundImgUrl})`
})

searchButton.addEventListener('click', async () => {
    let q = searchInput.value
    let searchData = await getSearchData(q)

    let lng = retrieveLng(searchData)
    let lat = retrieveLat(searchData)
    let currentPlace = retrieveCurrentPlace(searchData)

    map.setCenter([lng, lat])

    setWeather()
    setLngLat()
    setCurrentPlace(currentPlace)
})

tempUnits.addEventListener('change', function (event) {
    let convertFunc = event.target.value === "C"
        ? (numF) => (numF - 32) / 1.8
        : (numC) => (numC * 1.8) + 32
    convertTemp(convertFunc)
})

function convertTemp(convertFunc) {
    currentTemp.firstChild.data = Math.round(convertFunc(+currentTemp.firstChild.data))
    for(temp of forecastCardTemps) {
        let amount = parseInt(temp.innerText)
        temp.innerText = `${Math.round(convertFunc(amount))}°`
    }
}

function getRandomBackgroundUrl() {
    let num = Math.round(Math.random() * 4) + 1
    return `./image/bg/${num}.jpg`
}

function retrieveCurrentPlace(searchData) {
    let displayName = searchData[0].display_name
    return displayName.slice(0, displayName.indexOf(',')) + displayName.slice(displayName.length - 1, displayName.lastIndexOf(','))
}

function retrieveLng(searchData) {
    return +searchData[0].lon
}

function retrieveLat(searchData) {
    return +searchData[0].lat
}

function getWeatherData() {
    return fetch(getWeatherApiUrl())
        .then(resp => resp.json())
        .then(data => data)
        .catch(er => Error("Can't get weather forecast..."))
}

function getSearchData(q) {
    return fetch(getSearchApiUrl(q))
        .then(resp => resp.json())
        .then(data => data)
        .catch(er => Error("Can't find desired location..."))
}

function getSearchApiUrl(q) {
    return `https://eu1.locationiq.com/v1/search.php?key=${searchApiKey}&q=${q}&format=json&limit=1`
}

function getWeatherApiUrl() {
    let lat = map.getCenter().lat
    let lng = map.getCenter().lng

    let units = document.querySelector('input[name="temp"]:checked').value === "C" ? "metric" : "imperial"

    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=${exclude}&units=${units}&appid=${weathearApiKey}`
}

function getWeatherIconUrl(iconId) {
    return `http://openweathermap.org/img/wn/${iconId}@4x.png`
}

function setLngLat() {
    let lngText = `Longitude: ${map.getCenter().lng}`
    let latText = `Latitude: ${map.getCenter().lat}`

    coordinateLng.innerText = lngText
    coordinateLat.innerText = latText
}

function setCurrentPlace(newPlace) {
    currentPlace.innerText = newPlace.toUpperCase()
}

function setCurrnetDateTime() {
    let date = Date().toString()
    currentDatetime.innerText = date.slice(0, date.indexOf("GMT"))
}

async function setWeather() {
    wData = await getWeatherData();
    setCurrentWeather(wData.current)
    setDailyForecast(wData.daily)
}

function setCurrentWeather(current) {
    currentTemp.firstChild.data = Math.round(current.temp)

    let weatherIconId = current.weather[0].icon
    currentWeatherIcon.src = getWeatherIconUrl(weatherIconId)

    for (let child of currentWeatherDesc.children) {
        switch (child.classList[0]) {
            case 'general':
                child.innerText = current.weather[0].main.toUpperCase();
                break;
            case 'feels-like':
                let feelsLike = Math.round(current.feels_like)
                child.innerText = `FEELS LIKE: ${feelsLike}°`;
                break;
            case 'wind':
                let windSpeed = current.wind_speed
                child.innerText = `WIND: ${windSpeed} m/s`;
                break;
            case 'humidity':
                let humidity = current.humidity
                child.innerText = `HUMIDITY: ${humidity}%`;
                break;
        }
    }
}

function setDailyForecast(daily) {
    let cards = forecast.children;
    for (let i = 0; i < 3; i++) {
        let day = daily[i + 1]
        let card = cards[i]

        let weekDayIndex = new Date(day.dt * 1000).getDay()
        let temp = Math.round(day.temp.day)
        let weatherIconId = day.weather[0].icon

        card.children[0].innerText = weekDays[weekDayIndex]
        card.children[1].innerText = temp + '°'
        card.children[2].src = getWeatherIconUrl(weatherIconId)
    }
}

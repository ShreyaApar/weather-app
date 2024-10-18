const apiKey = "9d2e0141c090e7e22e4ed81363af4af6" ; // Replace with your API key
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const unitToggle = document.getElementById('unit-toggle');

let unit = 'metric';

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    getWeather(city);
});

unitToggle.addEventListener('click', () => {
    unit = unit === 'metric' ? 'imperial' : 'metric';
    unitToggle.textContent = unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius';
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const response = await fetch(`/weather?city=${city}&unit=${unit}`);
    const data = await response.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    const iconCode = data.icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById('icon').innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
    document.getElementById('temperature').textContent = `${Math.round(data.temperature)}° ${unit === 'metric' ? 'C' : 'F'}`;
    document.getElementById('description').textContent = `Condition: ${data.description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind} m/s`;
    document.getElementById('pressure').textContent = `Pressure: ${data.pressure} hPa`;
}

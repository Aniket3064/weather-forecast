const apiKey = '451682616cd91e1264cbd876a6858aa0'; // Replace with your actual OpenWeatherMap API key

document.getElementById('getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

// Function to handle successful location retrieval
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    getWeather(lat, lon); // Fetch weather using latitude and longitude
}

// Function to handle error in location retrieval
function error() {
    alert('Unable to retrieve your location.');
}

// Function to fetch weather data
function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            return response.json();
        })
        .then(data => {
            const weather = data.weather[0].description;
            const temp = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            displayWeather(weather, temp, humidity, windSpeed);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('weather').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to display weather data
function displayWeather(weather, temp, humidity, windSpeed) {
    document.getElementById('weather').innerHTML = `
        <h2>Weather Details</h2>
        <p>Description: ${weather}</p>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}
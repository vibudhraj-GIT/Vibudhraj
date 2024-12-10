const apiKey = 'b33853b43386cfc95b47486d0f6e421d'; // Replace with your OpenWeatherMap API key

// Function to fetch weather data
async function getWeather() {
    const city = document.getElementById("city-input").value;
    const weatherInfo = document.getElementById("weather-info");
    const loading = document.getElementById("loading");

    // Clear previous data
    weatherInfo.innerHTML = '';
    weatherInfo.style.display = 'none';
    loading.style.display = 'none';

    // Display loading indicator while fetching data
    if (city.trim() === '') {
        weatherInfo.innerHTML = "<p class='error'>Please enter a city name!</p>";
        weatherInfo.style.display = 'block';
        return;
    }

    loading.style.display = 'block';

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        // Check if the city is valid
        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        // Process and display the weather data
        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherInfo.innerHTML = `
            <img src="${weatherIcon}" alt="Weather Icon">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherInfo.style.display = 'block';
    } catch (error) {
        // Display error message
        weatherInfo.innerHTML = `<p class='error'>Error: ${error.message}</p>`;
        weatherInfo.style.display = 'block';
    } finally {
        // Hide loading indicator after fetch
        loading.style.display = 'none';
    }
}

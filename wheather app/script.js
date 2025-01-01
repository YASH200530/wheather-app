const apiKey = 'e33825b0b93c91d2c9bb2e8ee598e8fa'; 
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim(); // Get and trim the city name
  console.log("City entered:", city); // Debug log to check if city input is captured
  if (city) {
    fetchWeather(city); // Pass the city to the fetchWeather function
  } else {
    weatherResult.innerHTML = '<p>Please enter a city name.</p>';
  }
});

// Function to fetch weather data from the API
function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  console.log("Fetching data for:", url); // Debug log to ensure the URL is correct

  fetch(url)
    .then((response) => {
      console.log("Response status:", response.status); // Debug log to check response status
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather data received:", data); // Debug log to check API response
      displayWeather(data); // Pass the API response to displayWeather
    })
    .catch((error) => {
      console.error("Error:", error); // Debug log to check errors
      weatherResult.innerHTML = `<p>${error.message}</p>`;
    });
}

// Function to display the weather information
function displayWeather(data) {
  const { name, main, weather } = data;
  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p>${weather[0].description}</p>
    <p>Temperature: ${main.temp}°C</p>
    <p>Feels like: ${main.feels_like}°C</p>
    <p>Humidity: ${main.humidity}%</p>
  `;
}

const apiKey = 'e13a58f5afaf55e8ffe48821f901d742';
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.log('Error', error)
    }
}

// Function to update the date
function updateDate() {
    const currentDate = new Date();
    const dateElement = document.querySelector('.date');
    dateElement.textContent = currentDate.toDateString();
}

// Call the function to update the date
updateDate();

// Event listener for the form submission
const formElement = document.querySelector('.search-form');
const inputElement = document.querySelector('.searchbar');

formElement.addEventListener('submit', function(e) {
    e.preventDefault();

    const city = inputElement.value.trim();
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

// Function to update the weather UI
function updateWeatherUI(data) {
    const cityElem = document.querySelector(".city");
    const temp = document.querySelector('.temp');
    const windSpeed = document.querySelector('.wind-speed');
    const humidity = document.querySelector('.humidity');
    const visibility = document.querySelector('.visibility-distance'); // Update the visibility distance element
    const descriptionText = document.querySelector('.description-text');
    const date = document.querySelector('.date');
    const descriptionIcon = document.querySelector(".description i");

    cityElem.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`; // Convert visibility to km
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

// Function to map weather conditions to icon names
function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloud",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || 'help'; //default to help icon if no match found in map
}

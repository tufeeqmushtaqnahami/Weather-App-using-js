// OpenWeatherMap API key  
let id = 'f15f69ac81bc2569169465f40a5b1d62';  

// Base URL for fetching weather data (units set to metric for Celsius)  
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;  

// Selecting elements from the DOM  
let city = document.querySelector('.name');  // Element where city name and flag will be displayed  
let form = document.querySelector("form");  // Form element for search input  
let temperature = document.querySelector('.temperature');  // Element where temperature details will be displayed  
let description = document.querySelector('.description');  // Element where weather description will be displayed  
let valueSearch = document.getElementById('name');  // Input field for city name  
let clouds = document.getElementById('clouds');  // Element to display cloud percentage  
let humidity = document.getElementById('humidity');  // Element to display humidity  
let pressure = document.getElementById('pressure');  // Element to display atmospheric pressure  
let main = document.querySelector('main');  // Main container element  

// Event listener for form submission  
form.addEventListener("submit", (e) => {
    e.preventDefault();  // Prevents page refresh on form submission  
    if(valueSearch.value != ''){  // Checks if the input field is not empty  
        searchWeather();  // Calls the function to fetch weather data  
    }
});

// Function to fetch weather data from the API  
const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)  // Appends the searched city name to the API URL  
        .then(response => response.json())  // Converts the response to JSON format  
        .then(data => {
            console.log(data);  // Logs the API response data for debugging  
            if(data.cod == 200){  // Checks if the response status code is 200 (successful)  
                // Updates city name and flag  
                city.querySelector('figcaption').innerHTML = data.name;  
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;  

                // Updates temperature and weather icon  
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;  
                temperature.querySelector('span').innerText = data.main.temp;  

                // Updates weather description  
                description.innerText = data.weather[0].description;  

                // Updates additional weather details  
                clouds.innerText = data.clouds.all;  
                humidity.innerText = data.main.humidity;  
                pressure.innerText = data.main.pressure;  
            } else {  
                // If the city is not found or an error occurs, show an error effect  
                main.classList.add('error');  
                setTimeout(() => {  
                    main.classList.remove('error');  
                }, 1000);  // Error effect disappears after 1 second  
            }
            valueSearch.value = '';  // Clears the input field after search  
        })
}

// Function to initialize the app with a default city (Washington)  
const initApp = () => {
    valueSearch.value = 'Srinagar';  // Sets the default city  
    searchWeather();  // Calls the function to fetch weather data for the default city  
}

// Calls the initialization function when the script loads  
initApp();

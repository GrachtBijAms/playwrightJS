function showAlert() {
            alert('Button was clicked!');
        }

function greetUser() {
    const nameInput = document.getElementById('name');
    const resultDiv = document.getElementById('result');
    if (!nameInput || !resultDiv) {
        console.error('DOM elements not ready');
        return;
    }
    const name = nameInput.value.trim() || 'World';
    resultDiv.innerHTML = `Hello, ${name}!`;
}

function items() {
    return ['apple', 'banana', 'cherry'];
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();  // Same effect as return false
    greetUser();
});
});

async function fetchUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) throw new Error('Network error');
    console.log(response);
    const user = await response.json();
    console.log(user.address.city);
    console.log(user.name);
    console.log(user);
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

async function getCurrentWeather() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=52.31&longitude=4.86&current_weather=true`;
  
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  console.log('Temperature:', data.current_weather.temperature, data.current_weather_units.temperature);
  console.log('Wind speed:', data.current_weather.windspeed, data.current_weather_units.windspeed);
}
getCurrentWeather();
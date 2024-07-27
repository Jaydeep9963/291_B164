const fetch = require("node-fetch");
const readline = require("readline");

const apiKey = "8df612d1cd450c3595ec170dcf2ce070"; // Replace with your actual OpenWeatherMap API key

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter city name: ", (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        console.log(`Current weather in ${city}:`);
        console.log(`- Temperature: ${temp}°C`);
        console.log(`- Description: ${description}`);
        console.log(`- Icon: ${iconUrl}`);
      } else {
        console.error("City not found or API error.");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    })
    .finally(() => {
      rl.close();
    });
});



async function loadInfo() {
  try {
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const geoObj = await response.json();
    const { city, latitude, longitude } = geoObj;
    console.log(city, latitude, longitude);
    const cityElement = document.querySelector(".cityGeo");
    cityElement.textContent = city;
    loadWeatherData(latitude, longitude);
  } catch (err) {
    console.log(err);
  }
}

async function loadWeatherData(latitude, longitude) {
  try {
    const apiKey = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,rain,weathercode,winddirection_10m`;
    const response = await fetch(apiKey);
    const data = await response.json();
    console.log(data);

    // Поиск элементов лучше производить по ID
    const tempElement = document.getElementById("temp");
    const windElement = document.getElementById("wind");
    const weatherCodeElement = document.getElementById("weatherCode");
    console.log(data.current_weather);
    // ДЕСТРУКТУРИЗАЦИЯ
    const { temperature, windspeed, weathercode } = data.current_weather;
    console.log(temperature, windspeed, weathercode);

    tempElement.textContent = temperature + "°C";
    windElement.textContent = windspeed + " km/h";

    let weatherDescription;
    switch (weathercode) {
      case 0:
        weatherDescription = "Clear sky";
        break;
      case 1:
      case 2:
      case 3:
        weatherDescription = "Mainly clear, partly cloudy, and overcast";
        break;
      case 45:
      case 48:
        weatherDescription = "Fog and depositing rime fog";
        break;
      case 51:
      case 53:
      case 55:
        weatherDescription = "Drizzle: Light, moderate, and dense intensity";
        break;
      case 56:
      case 57:
        weatherDescription = "Freezing Drizzle: Light and dense intensity";
        break;
      case 61:
      case 63:
      case 65:
        weatherDescription = "Rain: Slight, moderate and heavy intensity";
        break;
      case 66:
      case 67:
        weatherDescription = "Freezing Rain: Light and heavy intensity";
        break;
      case 71:
      case 73:
      case 75:
        weatherDescription = "Snow fall: Slight, moderate, and heavy intensity";
        break;
      case 77:
        weatherDescription = "Snow grains";
        break;
      case 80:
      case 81:
      case 82:
        weatherDescription = "Rain showers: Slight, moderate, and violent";
        break;
      default:
        weatherDescription = "Unknown";
    }
    weatherCodeElement.textContent = weatherDescription;
  } catch (error) {
    console.log(error);
  }
}
loadInfo();

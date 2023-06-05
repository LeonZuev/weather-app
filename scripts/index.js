

async function loadInfo() {
  try {
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const geoObj = await response.json();
    const { city, latitude, longitude } = geoObj;
    console.log(city, latitude, longitude);
    const cityElement = document.querySelector(".cityGeo");
    cityElement.textContent = city;
    await loadWeatherData(latitude, longitude);
  } catch (err) {
    console.log(err);
  }
}

async function loadWeatherData(latitude, longitude) {
  try {
    const apiKey = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,weathercode,winddirection_10m`;
    const response = await fetch(apiKey);
    const data = await response.json();
    console.log(data);

    const tempElement = document.querySelector(".temp");
    const windElement = document.querySelector(".wind");
    const weatherCodeElement = document.querySelector(".weatherCode");
    const rainMmElement = document.querySelector(".rainMm");

    if (data && data.hourly && data.hourly.length > 0) {
      const hourlyData = data.hourly[0];

      tempElement.textContent = hourlyData.temperature_2m_1h?.value + "°C";
      windElement.textContent = hourlyData.winddirection_10m_1h?.value + "°";
      weatherCodeElement.textContent = hourlyData.weathercode?.value;
      rainMmElement.textContent = hourlyData.rain_1h?.value + " mm";
    } else {
      console.log("Недоступны данные о погоде");
    }
  } catch (error) {
    console.log(error);
  }
}

loadInfo();

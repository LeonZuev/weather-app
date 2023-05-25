async function loadInfo() {
  try {
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const geoObj = await response.json();
    const { city, latitude, longitude } = geoObj;
    console.log(city, latitude, longitude);
    const cityElement = document.querySelector(".cityGeo");
    cityElement.textContent = city;
    loadWeatherData(latitude, longitude);
  }
  catch (err) {
    console.log(err);
  }
}
loadInfo();

async function loadWeatherData(latitude, longitude) {
  try {
    const apiKey = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,weathercode,winddirection_10m`;
    const response = await fetch(apiKey);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}


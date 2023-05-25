async function loadInfo(){
  try {
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const geoObj = await response.json();
    const {city, latitude, longitude} = geoObj;
  console.log(city, latitude, longitude);
  const cityElement = document.querySelector(".cityGeo");
  cityElement.textContent = city;
  }
  catch(err){
    console.log(err);

  }
  
}

loadInfo();
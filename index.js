window.addEventListener('DOMContentLoaded', () => {
    fetch('https://get.geojs.io/v1/ip/geo.json')
      .then(response => response.json())
      .then(data => {
        const latitude = data.latitude;
        const longitude = data.longitude;
        document.getElementById('latitude').textContent = latitude;
        document.getElementById('longitude').textContent = longitude;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  });
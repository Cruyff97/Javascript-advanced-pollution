import css from "/Users/Matteo/Documents/GitHub/Javascript-advanced-pollution/";
/*GPS*/
function getgps() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    var crd = position.coords;

    const lat = await `${crd.latitude}`;
    const lon = await ` ${crd.longitude}`;
    const lati = document.getElementById("lat");
    lati.textContent = "Latitude:";

    lati.textContent += lat;
    const longi = document.getElementById("lon");
    longi.textContent = "Longitude:";
    longi.textContent += lon;
    const api_url = `https://api.waqi.info/feed/geo:${crd.latitude};${crd.longitude}/?token=${process.env.API_KEY}`;
    const response = await fetch(api_url);
    const json = await response.json();
    const quality = document.getElementById("airquality");
    quality.textContent = "";
    console.log(json);
    /*results*/
    if (json.data.aqi <= 50) {
      quality.textContent =
        "Air quality is considered satisfactory, and air pollution poses little or no risk";
      const currentDiv = document.getElementById("gps");
      currentDiv.appendChild(quality);
    } else if (json.data.aqi <= 100) {
      quality.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      const currentDiv = document.getElementById("gps");
      currentDiv.appendChild(quality);
    } else if (json.data.aqi <= 150) {
      quality.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      const currentDiv = document.getElementById("gps");
      currentDiv.appendChild(quality);
    } else if (json.data.aqi <= 200) {
      quality.textContent =
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
      const currentDiv = document.getElementById("gps");
      currentDiv.appendChild(quality);
    } else if (json.data.aqi <= 300) {
      quality.textContent =
        "Health warnings of emergency conditions. The entire population is more likely to be affected.";
      const currentDiv = document.getElementById("gps");
      currentDiv.appendChild(quality);
    } else if (json.data.aqi > 300) {
      quality.textContent =
        "	Health alert: everyone may experience more serious health effects.";
      const currentDiv = document.getElementById("gps");
      currentDiv.appendChild(quality);
    }
    let city = document.getElementById("mycity");
    let cities = `${json.data.city}`;
    console.log(cities);
    city.textContent = await `${json.data.city.name}`;
    console.log(city);
  });
}

/*CITY*/
/*handling errors*/
window.onload = function () {
  const citySearchh = document.querySelector(".citySearch");

  citySearchh.addEventListener("click", () => citySearch());
  async function citySearch() {
    const inputSearch = document.querySelector("input#city");
    console.log(inputSearch.value);

    const token = "?token=" + "dcea96088aa8fcf31c0694940d111cf32367ad81";
    const city = inputSearch.value + "/";
    const url1 = "https://api.waqi.info/feed/";
    const city_url = url1 + city + token;
    console.log(city_url);
    const response = await fetch(city_url);
    const json = await response.json();
    const cityqual = document.getElementById("cityquality");
    cityqual.textContent = "";
    console.log(json);
    // if (response.status = 'error') {
    //   document.getElementsByClassName('unknownCity').textContent='';
    //   let unknownCity =document.createElement('h4');
    //   unknownCity.classList.add('unknownCity');
    //   unknownCity.textContent = 'search another city';
    //   let main = document.querySelector('.main');
    //   unknownCity.appendChild(main);

    // };
    if (json.data.aqi <= 50) {
      console.log(cityqual);
      cityqual.textContent =
        "Air quality is considered satisfactory, and air pollution poses little or no risk";
    } else if (json.data.aqi <= 100) {
      cityqual.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
    } else if (json.data.aqi <= 150) {
      cityqual.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
    } else if (json.data.aqi <= 200) {
      cityqual.textContent =
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
    } else if (json.data.aqi <= 300) {
      cityqual.textContent =
        "Health warnings of emergency conditions. The entire population is more likely to be affected.";
    } else if (json.data.aqi > 300) {
      cityqual.textContent =
        "	Health alert: everyone may experience more serious health effects.";
    }
  }
};

window.onload = function () {
  const submitLatLon = document.querySelector("input#submitlatlon");
  console.log(submitLatLon);
  submitLatLon.addEventListener("click", () => latlonSearch());
  async function latlonSearch() {
    const inputLanCity = document.querySelector("input#latitude");
    console.log(inputLanCity.value);
    const inputLonCity = document.querySelector("input#longitude");
    console.log(inputLonCity.value);
    const latlon_url = `https://api.waqi.info/feed/geo:${inputLanCity.value};${inputLonCity.value}/?token=dcea96088aa8fcf31c0694940d111cf32367ad81`;
    const response2 = await fetch(latlon_url);
    const json2 = await response2.json();
    console.log(json2);
    const latlonqual = document.getElementById("qual");
    latlonqual.textContent = "";
    if (json2.data.aqi <= 50) {
      latlonqual.textContent =
        "Air quality is considered satisfactory, and air pollution poses little or no risk";
    } else if (json2.data.aqi <= 100) {
      latlonqual.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
    } else if (json2.data.aqi <= 150) {
      latlonqual.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
    } else if (json2.data.aqi <= 200) {
      latlonqual.textContent =
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
    } else if (json2.data.aqi <= 300) {
      latlonqual.textContent =
        "Health warnings of emergency conditions. The entire population is more likely to be affected.";
    } else if (json2.data.aqi > 300) {
      latlonqual.textContent =
        "	Health alert: everyone may experience more serious health effects.";
    }
  }
};

/*GPS*/

window.onload = function () {
  let btngps = document.querySelector("button#getgps");
  console.log(btngps);
  btngps.addEventListener("click", () => getgps());
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
      let vote=document.querySelector('#vote');
      vote.textContent='';
      let gpsDiv= document.querySelector('#gpsDiv');
      let voteDiv= document.querySelector('#divVote');
      voteDiv.style.border='';
      voteDiv.style.border= '1px solid white';
      /*results*/
      if (json.data.aqi <= 50) {
        gpsDiv.style.backgroundColor= '';
        gpsDiv.style.backgroundColor= 'green';
        vote.textContent='Good'
        quality.textContent =
          "Air quality is considered satisfactory, and air pollution poses little or no risk";
       
      } else if (json.data.aqi <= 100) {
        gpsDiv.style.backgroundColor= '';
        gpsDiv.style.backgroundColor= "#ffde33";
        vote.textContent='Moderate'
        quality.textContent =
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
        
      } else if (json.data.aqi <= 150) {
        gpsDiv.style.backgroundColor= '';
        gpsDiv.style.backgroundColor= '#ff9933';
        vote.textContent='Unhealthy for Sensitive Groups';
        quality.textContent =
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
        
      } else if (json.data.aqi <= 200) {
        gpsDiv.style.backgroundColor= '';
        gpsDiv.style.backgroundColor= '#cc0033';
        vote.textContent='Unhealthy';
        quality.textContent =
          "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
       
      } else if (json.data.aqi <= 300) {
        gpsDiv.style.backgroundColor= '';
        gpsDiv.style.backgroundColor= '#660099';
        vote.textContent='Very Unhealthy';
        quality.textContent =
          "Health warnings of emergency conditions. The entire population is more likely to be affected.";
        
      } else if (json.data.aqi > 300) {
        gpsDiv.style.backgroundColor= '';
        gpsDiv.style.backgroundColor= '#7e0023';
        vote.textContent='Hazardous';
        quality.textContent =
          "	Health alert: everyone may experience more serious health effects.";
        
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

  const citySearchh = document.querySelector("button.citySearch");
  console.log(citySearchh);
  citySearchh.addEventListener("click", () => citySearch());
  async function citySearch() {
    const inputSearch = document.querySelector("input#city");
    console.log(inputSearch.value);
    console.log(citySearchh);

    const token = "?token=" + `${process.env.API_KEY}`;
    const city = inputSearch.value + "/";
    const url1 = "https://api.waqi.info/feed/";
    const city_url = url1 + city + token;
    console.log(city_url);
    const response = await fetch(city_url);
    const json = await response.json();
    const cityqual = document.getElementById("cityquality");
    cityqual.textContent = "";
    console.log(json);
    const backgroundRes = document.querySelector(".result");

    if (json.data.aqi <= 50) {
      const backgroundRes = document.querySelector(".result");
      backgroundRes.style.backgroundColor = "";
      backgroundRes.style.backgroundColor = "green";
      console.log(cityqual);
      cityqual.textContent =
        "Air quality is considered satisfactory, and air pollution poses little or no risk";
    } else if (json.data.aqi <= 100) {
      backgroundRes.style.backgroundColor = "";
      backgroundRes.style.backgroundColor = "#ffde33";
      console.log(cityqual);
      cityqual.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
    } else if (json.data.aqi <= 150) {
      backgroundRes.style.backgroundColor = "";
      backgroundRes.style.backgroundColor = "#ff9933";
      console.log(cityqual);
      let result = document.querySelector(".result");
      console.log(result);
      cityqual.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
    } else if (json.data.aqi <= 200) {
      backgroundRes.style.backgroundColor = "";
      backgroundRes.style.backgroundColor = "#cc0033";
      cityqual.textContent =
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
    } else if (json.data.aqi <= 300) {
      backgroundRes.style.backgroundColor = "";
      backgroundRes.style.backgroundColor = "#660099";
      cityqual.textContent =
        "Health warnings of emergency conditions. The entire population is more likely to be affected.";
    } else if (json.data.aqi > 300) {
      backgroundRes.style.backgroundColor = "";
      backgroundRes.style.backgroundColor = "#7e0023";
      cityqual.textContent =
        "	Health alert: everyone may experience more serious health effects.";
    } else if ((json.data.aqi = "error")) {
      backgroundRes.style.backgroundColor = "";
    }
  }
  const submitLatLon = document.querySelector("button#submitlatlon");
  console.log(submitLatLon);
  submitLatLon.addEventListener("click", () => latlonSearch());
  async function latlonSearch() {
    const inputLanCity = document.querySelector("input#latitude");
    console.log(inputLanCity.value);
    const inputLonCity = document.querySelector("input#longitude");
    console.log(inputLonCity.value);
    const latlon_url = `https://api.waqi.info/feed/geo:${inputLanCity.value};${inputLonCity.value}/?token=${process.env.API_KEY}`;
    const response2 = await fetch(latlon_url);
    const json2 = await response2.json();
    console.log(json2);
    const latlonqual = document.getElementById("qual");
    latlonqual.textContent = "";
    const backgroundRes2= document.querySelector('div#latlonres.result');
    let divlatlonvote= document.querySelector('#divlatlonvote');
    let latlonvoteh3= document.querySelector('#latlonvoteh3');
    if (json2.data.aqi <= 50) {
      latlonvoteh3.textContent='';
      latlonvoteh3.textContent='Good';
      divlatlonvote.style.border='';
      divlatlonvote.style.border=' 0.5px solid white'
      backgroundRes2.style.backgroundColor = "green";
      latlonqual.textContent =
        "Air quality is considered satisfactory, and air pollution poses little or no risk";
    } else if (json2.data.aqi <= 100) {
      latlonvoteh3.textContent='';
      latlonvoteh3.textContent='Moderate';
      divlatlonvote.style.border='';
      divlatlonvote.style.border=' 0.5px solid white'
      backgroundRes2.style.backgroundColor = "#ffde33";
      latlonqual.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
    } else if (json2.data.aqi <= 150) {
      latlonvoteh3.textContent='';
      latlonvoteh3.textContent='Unealthy for Sensitive People';
      divlatlonvote.style.border='';
      divlatlonvote.style.border=' 0.5px solid white'
      backgroundRes2.style.backgroundColor ="#ff9933";
      latlonqual.textContent =
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
    } else if (json2.data.aqi <= 200) {
      latlonvoteh3.textContent='';
      latlonvoteh3.textContent='Unealthy';
      divlatlonvote.style.border='';
      divlatlonvote.style.border=' 0.5px solid white'
      backgroundRes2.style.backgroundColor ="#cc0033";
      latlonqual.textContent =
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
    } else if (json2.data.aqi <= 300) {
      latlonvoteh3.textContent='';
      latlonvoteh3.textContent='Very Unealthy';
      divlatlonvote.style.border='';
      divlatlonvote.style.border=' 0.5px solid white'
      backgroundRes2.style.backgroundColor ="#660099";
      latlonqual.textContent =
        "Health warnings of emergency conditions. The entire population is more likely to be affected.";
    } else if (json2.data.aqi > 300) {
      latlonvoteh3.textContent='';
      latlonvoteh3.textContent='Hazardous';
      divlatlonvote.style.border='';
      divlatlonvote.style.border=' 0.5px solid white'
      backgroundRes2.style.backgroundColor ="#7e0023";
      latlonqual.textContent =
        "	Health alert: everyone may experience more serious health effects.";
    }
  }
};

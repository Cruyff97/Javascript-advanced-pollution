//fix env & apykeys
async function callLambdaFunction() {
  const response = await fetch("/.netlify/functions/lambda");
  const data = await response.json();
}

callLambdaFunction();

/*GPS*/
import { Circle } from "progressbar.js";
window.onload = function () {
  let btngps = document.querySelector("button#getgps");

  btngps.addEventListener("click", () => getgps());
  function getgps() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      var crd = position.coords;

      const lat = await `${crd.latitude}`;
      const lon = await ` ${crd.longitude}`;

      var bargps = new Circle("#progressbargps", {
        strokeWidth: 6,
        easing: "easeInOut",
        duration: 1400,
        color: "#C56824",
        trailColor: "#eee",
        trailWidth: 1,
        svgStyle: null,
      });
      bargps.animate(1.0);
      let progressbargps = document.querySelector("#progressbargps");
      progressbargps.classList.add("active");
      const api_key= process.env.API_KEY
      const api_url = `https://api.waqi.info/feed/geo:${crd.latitude};${crd.longitude}/?token=${api_key}`;
      const response = await fetch(api_url);
      const json = await response.json();
      const quality = document.getElementById("airquality");
      quality.textContent = "";
      
      let vote = document.querySelector("#vote");
      vote.textContent = "";
      let gpsDiv = document.querySelector("#gpsDiv");
      gpsDiv.style.boxShadow = "0 0 5px #8888";
      let voteDiv = document.querySelector("#divVote");
      voteDiv.style.border = "";
      voteDiv.style.border = "1px solid white";
      let imgpos = document.querySelector("img#pos");
      imgpos.style.display = "none";
      imgpos.style.display = "inline";
      progressbargps.classList.add("active");
      progressbargps.classList.remove("active");
      progressbargps.innerHTML = "";
      /*results*/
      if (json.data.aqi <= 50) {
        gpsDiv.style.backgroundColor = "";
        gpsDiv.style.backgroundColor = "green";
        vote.textContent = "Good";
        quality.textContent =
          "Air quality is considered satisfactory, and air pollution poses little or no risk";
      } else if (json.data.aqi <= 100) {
        gpsDiv.style.backgroundColor = "";
        gpsDiv.style.backgroundColor = "#ffde33";
        vote.textContent = "Moderate";
        quality.textContent =
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      } else if (json.data.aqi <= 150) {
        gpsDiv.style.backgroundColor = "";
        gpsDiv.style.backgroundColor = "#ff9933";
        vote.textContent = "Unhealthy for Sensitive Groups";
        quality.textContent =
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      } else if (json.data.aqi <= 200) {
        gpsDiv.style.backgroundColor = "";
        gpsDiv.style.backgroundColor = "#cc0033";
        vote.textContent = "Unhealthy";
        quality.textContent =
          "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
      } else if (json.data.aqi <= 300) {
        gpsDiv.style.backgroundColor = "";
        gpsDiv.style.backgroundColor = "#660099";
        vote.textContent = "Very Unhealthy";
        quality.textContent =
          "Health warnings of emergency conditions. The entire population is more likely to be affected.";
      } else if (json.data.aqi > 300) {
        gpsDiv.style.backgroundColor = "";
        gpsDiv.style.backgroundColor = "#7e0023";
        vote.textContent = "Hazardous";
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

  //fix//
  window.addEventListener("keypress", (e) => {
    var enter = e.keyCode || e.which;
    var cityTab = document.getElementById("city");
    var geolocalTab = document.getElementById("geolocal");
    var gpsTab = document.getElementById("gps");

    if (enter == 13 && cityTab.classList.contains("active")) {
      e.preventDefault();
      citySearch();
    }

    if (enter == 13 && geolocalTab.classList.contains("active")) {
      latlonSearch();
      e.preventDefault;
    }
    if (enter == 13 && gpsTab.classList.contains("active")) {
      getgps();
      e.preventDefault;
    }
  });

  /*CITY*/
  /*handling errors*/

  const citySearchh = document.querySelector("button.citySearch");
  console.log(citySearchh);
  citySearchh.addEventListener("click", () => citySearch());
  async function citySearch() {
    let inputSearch = document.querySelector("input#city");
    if (inputSearch.value == "") {
      let inputSearch = document.querySelector("input#city");
      let formcity = document.querySelector("#formcity");
      let errorcity = document.querySelector(".pError");
      errorcity.innerText = "Insert a City name";
      formcity.insertBefore(errorcity, citySearchh);
      inputSearch.style.borderColor = "red";
      citySearchvoteh3.textContent = "";
      citySearchDiv.style.border = "";
      return;
    }

    var barp = new Circle("#progressbargeo", {
      strokeWidth: 6,
      easing: "easeInOut",
      duration: 1400,
      color: "#C56824",
      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: null,
    });
    barp.animate(1.0);
    let progressbargeo = document.querySelector("#progressbargeo");
    progressbargeo.classList.add("active");
    console.log(inputSearch.value);
    console.log(citySearchh);
    const api_key= process.env.API_KEY
    const token = "?token=" + `${api_key}`;
    const city = inputSearch.value + "/";
    const url1 = "https://api.waqi.info/feed/";
    const city_url = url1 + city + token;
    
    const response = await fetch(city_url).catch(function () {});

    const json3 = await response.json();
    const cityqual = document.getElementById("cityquality");
    cityqual.textContent = "";
    console.log(city_url);
    const backgroundRes = document.querySelector(".result");
    const citySearchvoteh3 = document.querySelector("#citySearchvoteh3");
    const citySearchDiv = document.querySelector("#citySearchDiv");
    const aqiStat = document.querySelector("#aqicit");
    console.log(aqiStat);
    aqiStat.textContent = "";
    inputSearch.style.borderColor = "";
    let errorcity = document.querySelector(".pError");
    errorcity.innerText = "";
    let minecity = document.querySelector("#minecity");
    minecity.textContent = "";
    backgroundRes.style.backgroundColor = "";
    if (json3.status !== "error") {
      aqiStat.textContent = "AQI:" + " " + (await `${json3.data.aqi}`);
      let minecity = document.querySelector("#minecity");
      console.log(minecity);
      let cities = await `${json3.data.city}`;
      console.log(cities);
      minecity.textContent = await `${json3.data.city.name}`;
      let imgposcity = document.querySelector("img#poscity");
      imgposcity.style.display = "none";
      imgposcity.style.display = "inline";
      if (json3.data.aqi <= 50) {
        citySearchvoteh3.textContent = "";
        citySearchvoteh3.textContent = "Good";
        citySearchDiv.style.border = "";
        citySearchDiv.style.border = "0.5px solid white";
        const backgroundRes = document.querySelector(".result");
        backgroundRes.style.backgroundColor = "";
        backgroundRes.style.backgroundColor = "green";
        console.log(cityqual);
        cityqual.textContent =
          "Air quality is considered satisfactory, and air pollution poses little or no risk";
      } else if (json3.data.aqi <= 100) {
        citySearchvoteh3.textContent = "";
        citySearchvoteh3.textContent = "Moderate";
        citySearchDiv.style.border = "";
        citySearchDiv.style.border = "0.5px solid white";
        backgroundRes.style.backgroundColor = "";
        backgroundRes.style.backgroundColor = "#ffde33";
        console.log(cityqual);
        cityqual.textContent =
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      } else if (json3.data.aqi <= 150) {
        citySearchvoteh3.textContent = "";
        citySearchvoteh3.textContent = "Unealthy for Sensitive Group";
        citySearchDiv.style.border = "";
        citySearchDiv.style.border = "0.5px solid white";
        backgroundRes.style.backgroundColor = "";
        backgroundRes.style.backgroundColor = "#ff9933";
        console.log(cityqual);
        let result = document.querySelector(".result");
        console.log(result);
        cityqual.textContent =
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      } else if (json3.data.aqi <= 200) {
        citySearchvoteh3.textContent = "";
        citySearchvoteh3.textContent = "Unealthy";
        citySearchDiv.style.border = "";
        citySearchDiv.style.border = "0.5px solid white";
        backgroundRes.style.backgroundColor = "";
        backgroundRes.style.backgroundColor = "#cc0033";
        cityqual.textContent =
          "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
      } else if (json3.data.aqi <= 300) {
        citySearchvoteh3.textContent = "";
        citySearchvoteh3.textContent = "Very Unealthy";
        citySearchDiv.style.border = "";
        citySearchDiv.style.border = "0.5px solid white";
        backgroundRes.style.backgroundColor = "";
        backgroundRes.style.backgroundColor = "#660099";
        cityqual.textContent =
          "Health warnings of emergency conditions. The entire population is more likely to be affected.";
      } else if (json3.data.aqi > 300) {
        citySearchvoteh3.textContent = "";
        citySearchvoteh3.textContent = "Hazardous";
        citySearchDiv.style.border = "";
        citySearchDiv.style.border = "0.5px solid white";
        backgroundRes.style.backgroundColor = "";
        backgroundRes.style.backgroundColor = "#7e0023";
        cityqual.textContent =
          "	Health alert: everyone may experience more serious health effects.";
      }
    }

    if (json3.status == "error") {
      let imgposcity = document.querySelector("img#poscity");
      imgposcity.style.display = "none";

      let formcity = document.querySelector("#formcity");
      let errorcity = document.querySelector(".pError");
      errorcity.innerText = "City not found";

      formcity.insertBefore(errorcity, citySearchh);

      inputSearch.style.borderColor = "red";
      citySearchvoteh3.textContent = "";
      citySearchDiv.style.border = "";
    } else if (json3.data.aqi == "error") {
      backgroundRes.style.backgroundColor = "";
    }
    progressbargeo.classList.remove("active");
    progressbargeo.innerHTML = "";
  }

  //latlon//
  let imgposLatLon = document.querySelector("#poslatlon");
  imgposLatLon.style.display = "none";
  const submitLatLon = document.querySelector("button#submitlatlon");
  console.log(submitLatLon);
  submitLatLon.addEventListener("click", () => latlonSearch());
  async function latlonSearch() {
    let mainlatlon = document.querySelector(".main");
    // let overlay= document.createElement('div');
    // overlay.classList.add('overlay');
    // console.log(overlay);
    // overlay.appendChild(mainlatlon);
    var bar = new Circle("#progressbar", {
      strokeWidth: 6,
      easing: "easeInOut",
      duration: 1400,
      color: "#C56824",
      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: null,
    });
    let progressbar = document.querySelector("#progressbar");
    progressbar.classList.add("active");

    bar.animate(1.0);
    const inputLanCity = document.querySelector("input#latitude");
    console.log(inputLanCity.value);
    const inputLonCity = document.querySelector("input#longitude");
    console.log(inputLonCity.value);
    const api_key= process.env.API_KEY;
    const latlon_url = `https://api.waqi.info/feed/geo:${inputLanCity.value};${inputLonCity.value}/?token=${api_key}`;
    const response2 = await fetch(latlon_url);
    const json2 = await response2.json();
   console.log(json2);
    const latlonqual = document.getElementById("qual");
    latlonqual.textContent = "";
    const backgroundRes2 = document.querySelector("div#latlonres.result");
    backgroundRes2.style.backgroundColor = "";
    let divlatlonvote = document.querySelector("div#divlatlonvote");

    divlatlonvote.style.border = "";
    let errorgeo = document.querySelector("#errorgeo");
    errorgeo.textContent = "";
    errorgeo.style.color = "";
    let latlonvoteh3 = document.querySelector("#latlonvoteh3");
    console.log(latlonvoteh3);
    latlonvoteh3.textContent = "";
    let minecitylatlon = document.querySelector("#minecitylatlon");
    minecitylatlon.textContent = "";
    let imgposLatLon = document.querySelector("#poslatlon");
    imgposLatLon.style.display = "none";
    let aqiStatGeo = document.querySelector("h3#aqiCity");
    aqiStatGeo.textContent = "";
    if (inputLanCity.value == "") {
      let errorgeo = document.querySelector("#errorgeo");
      errorgeo.textContent = "Insert valid geo position";
      errorgeo.style.color = "red";
    }
    if (json2.status !== "error") {
      let imgposLatLon = document.getElementById("poslatlon");
      imgposLatLon.style.display = "inline";
      let citylatlon = document.getElementById("minecitylatlon");
      citylatlon.textContent = await `${json2.data.city.name}`;
      let aqiStatGeo = document.querySelector("h3#aqiCity");
      aqiStatGeo.textContent = "AQI:" + " " + (await `${json2.data.aqi}`);
      if (json2.data.aqi <= 50) {
        latlonvoteh3.textContent = "";
        latlonvoteh3.textContent = "Good";
        divlatlonvote.style.border = "";
        divlatlonvote.style.border = " 0.5px solid white";
        backgroundRes2.style.backgroundColor = "green";
        latlonqual.textContent =
          "Air quality is considered satisfactory, and air pollution poses little or no risk";
      } else if (json2.data.aqi <= 100) {
        latlonvoteh3.textContent = "";
        latlonvoteh3.textContent = "Moderate";
        divlatlonvote.style.border = "";
        divlatlonvote.style.border = " 0.5px solid white";
        backgroundRes2.style.backgroundColor = "#ffde33";
        latlonqual.textContent =
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      } else if (json2.data.aqi <= 150) {
        latlonvoteh3.textContent = "";
        latlonvoteh3.textContent = "Unealthy for Sensitive People";
        divlatlonvote.style.border = "";
        divlatlonvote.style.border = " 0.5px solid white";
        backgroundRes2.style.backgroundColor = "#ff9933";
        latlonqual.textContent =
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      } else if (json2.data.aqi <= 200) {
        latlonvoteh3.textContent = "";
        latlonvoteh3.textContent = "Unealthy";
        divlatlonvote.style.border = "";
        divlatlonvote.style.border = " 0.5px solid white";
        backgroundRes2.style.backgroundColor = "#cc0033";
        latlonqual.textContent =
          "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
      } else if (json2.data.aqi <= 300) {
        latlonvoteh3.textContent = "";
        latlonvoteh3.textContent = "Very Unealthy";
        divlatlonvote.style.border = "";
        divlatlonvote.style.border = " 0.5px solid white";
        backgroundRes2.style.backgroundColor = "#660099";
        latlonqual.textContent =
          "Health warnings of emergency conditions. The entire population is more likely to be affected.";
      } else if (json2.data.aqi > 300) {
        latlonvoteh3.textContent = "";
        latlonvoteh3.textContent = "Hazardous";
        divlatlonvote.style.border = "";
        divlatlonvote.style.border = " 0.5px solid white";
        backgroundRes2.style.backgroundColor = "#7e0023";
        latlonqual.textContent =
          "	Health alert: everyone may experience more serious health effects.";
      }
    } else if (json2.status == "error") {
      let errorgeo = document.querySelector("#errorgeo");
      errorgeo.textContent = "Insert valid geo position";
      errorgeo.style.color = "red";
    }

    progressbar.classList.remove("active");
    progressbar.innerHTML = "";
  }
};
console.log(process.env.API_KEY);
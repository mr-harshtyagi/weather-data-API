const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");
const { isUndefined } = require("util");

// initialize app express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.set("view engine", "ejs");

const apiKey = "f4c4753cee53daf25667f695906767e4";

//get request for home route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//post request for home route
app.post("/", function (req, res) {
  let city = " ";
  city = req.body.cityName;
  let url;
  console.log(city);
  if (typeof city !== "undefined") {
    url =
      "https://api.openweathermap.org/data/2.5/weather?appid=" +
      apiKey +
      "&q=" +
      city +
      "&units=metric";
  } else {
    console.log("Current location button pressed");
    res.sendFile(__dirname + "/error.html");
  }

  // const lat = position.coords.latitude;
  // const long = position.coords.longitude;
  // const url =
  //   "https://api.openweathermap.org/data/2.5/weather?appid=" +
  //   apiKey +
  //   "&q=" +
  //   city +
  //   "&units=metric";
  https.get(url, function (response) {
    if (response.statusCode == 200) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const city_Name = weatherData.name;
        const country = weatherData.sys.country;
        const city_Temp = Math.round(weatherData.main.temp);
        const max_Temp = Math.round(weatherData.main.temp_max);
        const min_Temp = Math.round(weatherData.main.temp_min);
        const feels_Like = Math.round(weatherData.main.feels_like);
        const humidity = weatherData.main.humidity;
        const description = weatherData.weather[0].description;
        let icon =
          "http://openweathermap.org/img/wn/" +
          weatherData.weather[0].icon +
          "@2x.png";

        res.render("weather-data", {
          city: city_Name,
          temp: city_Temp,
          country: country,
          max_Temp: max_Temp,
          min_Temp: min_Temp,
          feels_Like: feels_Like,
          humidity: humidity,
          description: description,
          icon: icon,
        });
      });
    } else {
      res.sendFile(__dirname + "/error.html");
    }
  });
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json({ limit: "1mb" }));
app.set("view engine", "ejs");

const apiKey = process.env.API_KEY;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;
  let url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    apiKey +
    "&q=" +
    city +
    "&units=metric";

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

app.get("/currentlocation", function (req, res) {
  res.sendFile(__dirname + "/error.html");
});

app.post("/currentlocation", function (req, res) {
  const latitude = req.body.lat;
  const longitude = req.body.long;
  let url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    apiKey +
    "&lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric";

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
        //   console.log(city_Name);
        //   console.log(country);
        //   console.log(city_Temp);

        // console.log(max_Temp);
        // console.log(min_Temp);
        // console.log(feels_Like);
        // console.log(humidity);
        // console.log(description);
        // res.render("weather-data", {
        //   city: city_Name,
        //   temp: city_Temp,
        //   country: country,
        //   max_Temp: max_Temp,
        //   min_Temp: min_Temp,
        //   feels_Like: feels_Like,
        //   humidity: humidity,
        //   description: description,
        //   icon: icon,
        // });
        res.sendFile(__dirname + "/error.html");
      });
    } else {
      res.sendFile(__dirname + "/error.html");
    }
  });
});

const PORT = process.env.port || 3000;
app.listen(PORT, function () {
  console.log("Server started at port 3000");
});

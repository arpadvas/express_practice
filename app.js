"use strict";

var express = require("express");

var app = express();
var request = require("request");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "jade");
app.set("views", __dirname + "/src/templates");

app.get("/", function(req, res) {
	res.render("index");
});

app.post("/city", function(req, res) {
	var city = req.body.city;
	request.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=c55d418452d87000440c7941c24c86d7', function(err, response, body) {
		var weatherInfo = JSON.parse(body);
		var weatherData = [];
		if (!err && response.statusCode == 200) {
			for (var i = 0; i < 8; i++)
			weatherData.push(weatherInfo.list[i]);
			weatherData[0].city = weatherInfo.city.name;
			res.render("post", {weatherData: weatherData});
        } else {
        	res.render("index", weatherInfo);
        }
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log("The frontend server is running on port 3000!");
});
"use strict";

var express = require("express");
var posts = require("./src/mock/posts.json");

var app = express();
var request = require("request");

app.set("view engine", "jade");
app.set("views", __dirname + "/src/templates");

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/:city", function(req, res) {
	var city = req.params.city;
	request.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=c55d418452d87000440c7941c24c86d7', function(err, response, body) {
		if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
		res.render("post", locals);
        }
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log("The frontend server is running on port 3000!");
});
"use strict";

var express = require("express");
var posts = require("./src/mock/posts.json");

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
		var locals = JSON.parse(body);
		if (!err && response.statusCode == 200) {
			res.render("post", locals);
        } else {
        	res.render("index", locals);
        }
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log("The frontend server is running on port 3000!");
});
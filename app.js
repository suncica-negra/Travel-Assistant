const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));


app.get("/", function (req, res) {
	res.render("index");
});

app.get("/countries", function (req, res) {
	res.render("countries");
});

app.get("/cities", function (req, res) {
	res.render("cities");
});

app.get("/airports", function (req, res) {
	res.render("airports");
});

app.get("/airlines", function (req, res) {
	res.render("airlines");
});

app.get("/airplanes", function (req, res) {
	res.render("airplanes");
});

app.get("/timezones", function (req, res) {
	res.render("timezones");
});

app.get("/currencies", function (req, res) {
	res.render("currencies");
});

app.get("/languages", function (req, res) {
	res.render("languages");
});

app.get("/planyourtrip", function (req, res) {
	res.render("planyourtrip");
});


app.post("/countries", function (req, res) {

	request("https://api.loocpi.com/v1/countries?key=YOUR_KEY", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("countries1", {
			data: data
		});

	});

});

app.post("/cities", function (req, res) {

	request("https://api.loocpi.com/v1/cities?key=YOUR_KEY", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("cities1", {
			data: data
		});

	});

});

app.post("/airports", function (req, res) {

	request("https://api.loocpi.com/v1/airports?key=YOUR_KEY", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("airports1", {
			data: data
		});

	});

});

app.post("/airlines", function (req, res) {

	request("https://api.loocpi.com/v1/airlines?key=YOUR_KEY", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("airlines1", {
			data: data
		});

	});

});

app.post("/airplanes", function (req, res) {

	request("https://api.loocpi.com/v1/airplanes?key=YOUR_KEY", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("airplanes1", {
			data: data
		});

	});

});

app.post("/timezones", function (req, res) {

	request("https://api.loocpi.com/v1/timezones?key=YOUR_KEY", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("timezones1", {
			data: data
		});

	});

});

app.post("/currencies", function (req, res) {

	request("https://api.loocpi.com/v1/currencies?key=YOUR_KEY", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("currencies1", {
			data: data
		});

	});

});

app.post("/languages", function (req, res) {

	request("https://api.loocpi.com/v1/languages?key=YOUR_KEY", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("languages1", {
			data: data
		});

	});

});


app.listen(process.env.PORT || 3000, function () {
	console.log("Server is running.")
});
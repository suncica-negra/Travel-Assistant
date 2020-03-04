const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const request = require("request");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

mongoose.connect("mongodb+srv://YOUR_USER_NAME:YOUR_PASSWORD@cluster0-2itcl.mongodb.net/ticketDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});
mongoose.set("useCreateIndex", true);

const ticketSchema = new mongoose.Schema({
	from: String,
	through: String,
	to: String,
	date1: String,
	date2: String,
	dateOfOrdering: {
		type: Date,
		default: Date.now
	}
});

const Ticket = new mongoose.model("Ticket", ticketSchema);


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

app.get("/planyourtrip1", function (req, res) {
	res.render("planyourtrip1");
});

app.get("/planyourtrip2", function (req, res) {
	res.render("planyourtrip2");
});

app.get("/planyourtrip3", function (req, res) {
	res.render("planyourtrip3");
});

app.get("/tickets", function (req, res) {

	Ticket.find({}).sort({
		dateOfOrdering: -1
	}).exec(function (err, tickets) {
		res.render("tickets", {
			tickets: tickets,
		});
	});
});


app.delete("/:ticketId", function (req, res) {

	const ticketId = req.params.ticketId;

	Ticket.findOneAndDelete({
		_id: ticketId
	}, function (err, res) {
		if (!err) {
			console.log("Ticket successfully deleted.");
		}
	});

	Ticket.find({}).sort({
		dateOfOrdering: -1
	}).exec(function (err, tickets) {
		res.render("tickets", {
			tickets: tickets,
		});
	});
});


app.post("/planyourtrip1", function (req, res) {

	const ticket = new Ticket({
		from: req.body.from,
		to: req.body.to,
		date1: req.body.date1
	});

	ticket.save(function (err) {
		if (!err) {
			res.render("planyourtrip-save");
		}
	});
});

app.post("/planyourtrip2", function (req, res) {

	const ticket = new Ticket({
		from: req.body.from,
		to: req.body.to,
		date1: req.body.date1,
		date2: req.body.date2
	});

	ticket.save(function (err) {
		if (!err) {
			res.render("planyourtrip-save");
		}
	});
});

app.post("/planyourtrip3", function (req, res) {

	const ticket = new Ticket({
		from: req.body.from,
		through: req.body.through,
		to: req.body.to,
		date1: req.body.date1,
		date2: req.body.date2
	});

	ticket.save(function (err) {
		if (!err) {
			res.render("planyourtrip-save");
		}
	});
});

app.post("/countries", function (req, res) {

	request("https://api.loocpi.com/v1/countries?key=YOUR_KEY&sort[name]=ASC", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("countries1", {
			data: data
		});
	});
});

app.post("/cities", function (req, res) {

	request("https://api.loocpi.com/v1/cities?key=YOUR_KEY&sort[name]=ASC", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("cities1", {
			data: data
		});
	});
});

app.post("/airports", function (req, res) {

	request("https://api.loocpi.com/v1/airports?key=YOUR_KEY&sort[name]=ASC", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("airports1", {
			data: data
		});
	});
});

app.post("/airlines", function (req, res) {

	request("https://api.loocpi.com/v1/airlines?key=YOUR_KEY&sort[name]=ASC", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("airlines1", {
			data: data
		});
	});
});

app.post("/airplanes", function (req, res) {

	request("https://api.loocpi.com/v1/airplanes?key=YOUR_KEY&sort[name]=ASC", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("airplanes1", {
			data: data
		});
	});
});

app.post("/timezones", function (req, res) {

	request("https://api.loocpi.com/v1/timezones?key=YOUR_KEY&sort[name]=ASC", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("timezones1", {
			data: data
		});
	});
});

app.post("/currencies", function (req, res) {

	request("https://api.loocpi.com/v1/currencies?key=YOUR_KEY&sort[name]=ASC", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("currencies1", {
			data: data
		});
	});
});

app.post("/languages", function (req, res) {

	request("https://api.loocpi.com/v1/languages?key=YOUR_KEY&sort[name]=ASC", function (err, response, body) {
		var data = JSON.parse(body);

		res.render("languages1", {
			data: data
		});
	});
});


app.listen(process.env.PORT || 3000, function () {
	console.log("Server is running.")
});
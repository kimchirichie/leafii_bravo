// IMPORT MODULES
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var pug = require("pug");
var fs = require('fs');

// SERVER OPERATION
var app = express();

// VIEW ENGING
app.set("view engine", "pug")

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// PUBLIC ASSETS BEFORE PRIVATE ASSETS
app.use(express.static(path.join(__dirname, "vendors")));
app.use(express.static(path.join(__dirname, "bower_components")));

// TRANSLATING DOMAIN TO FOLDER STRUCTURE
if (process.env.ENV === "production") {
	app.use(function (req, res, next) {
		console.log("GET: /:hostname : Rerouting to Apartment");
		var splitname = req.hostname.split(".")
		var namespace = splitname[splitname.length-2];
		req.url="/"+namespace+req.url;
		next();
	});
}

// PERSONAL CONTROLLERS ADDED
var files = fs.readdirSync('./apartment')
for (var i=0; i<files.length; i++) {
	file = './apartment/'+files[i]+'/controller.js'
	if(fs.existsSync(file)){
		app.use('/'+files[i]+'/',require(file));
	}
}

// PERSONALIZED ASSETS
app.use(express.static(path.join(__dirname, "apartment")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handlers
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	if (process.env.ENV === "development") {
		// development error handler
		// will print stacktrace
		res.render("error",{message: err.message,error: err});
	} else {
		// production error handler
		// no stacktraces leaked to user
		res.render("error",{message: err.message,error: {}});
	}
});

module.exports = app;
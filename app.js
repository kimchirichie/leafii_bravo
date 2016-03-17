// IMPORT MODULES
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var cors = require('cors');

// DATABASE MODEL
var User = require("./models/user");

// ROUTER
var database = require("./router/database");
var traffic = require("./router/traffic");
var auth = require("./router/authentication");

// SERVER OPERATION
var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// PASSPORT CONFIG
app.use(session({ secret: "87dfyas9fy78234y82f25g35tg" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // flash message
passport.serializeUser(function(user, done) {
  console.log("Serialize User: " + user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("Deserialize User: " + id);
  User.findById(id).then(function(user) {
    done(null, user);
  });
});

// LOG TRAFFIC
app.use(/\/$/, traffic);
app.use("/db", database);
app.use("/auth", auth);

// PUBLIC ASSETS BEFORE PRIVATE ASSETS
app.use(express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "vendors")));

// PRIVATE ASSETS AFTER PUBLIC ASSETS
if (app.get("env") === "production") {
  app.use(function (req, res, next) {
    console.log("GET: /:hostname : Rerouting to Apartment");
    var splitname = req.hostname.split(".")
    var namespace = splitname[splitname.length-2];
    req.url="/"+namespace+req.url;
    next();
  });
}

app.use(express.static(path.join(__dirname, "apartment")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
// IMPORT MODULES
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// DATABASE MODULE
var sqlite3 = require('sqlite3').verbose();


// ROUTER
var database = require('./router/database.js')
var traffic = require('./router/traffic.js')

// SERVER OPERATION
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// LOG TRAFFIC
app.use(/\/$/, traffic);
app.use('/db', database)

// PUBLIC ASSETS BEFORE PRIVATE ASSETS
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'vendors')));

// PRIVATE ASSETS AFTER PUBLIC ASSETS
if (app.get('env') === 'production') {
  app.use(function (req, res, next) {
    console.log('GET: /:hostname : Rerouting to Apartment');
    var splitname = req.hostname.split(".")
    var namespace = splitname[splitname.length-2];
    req.url="/"+namespace+req.url;
    next();
  });
}

app.use(express.static(path.join(__dirname, 'apartment')));

// PRODUCTION LAST FALL BACK
if (app.get('env') === 'production') {
  app.use(function (req, res) {
    console.log('ROUTER: Found no match. Forward to landing page')
    // should log this in database for err
    res.redirect('http://leafii.com');
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
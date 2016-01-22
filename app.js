var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined, undefined, {
  dialect: 'sqlite',
  storage: 'db/leafii_dev.db'
});

var Signup = sequelize.define('signup', {
  name: {type: Sequelize.STRING},
  email: {type: Sequelize.STRING},
  phone: {type: Sequelize.STRING}
});

var Traffic = sequelize.define('traffic', {
  hostname: {type: Sequelize.STRING},
  ip: {type: Sequelize.STRING}
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// log traffic for analysis
app.use(/\/$/, function(req, res, next){
  console.log('GET / : Recording Traffic');
  var namespace = req.hostname.match(/^[^\.]*/);
  Traffic.sync().then(function(){
    var data = {
      hostname: namespace,
      ip: req.ip
    }
    Traffic.create(data).then(function(traffic){
      console.dir(traffic.get());
    })
  });
  next();
});

// serve public assets before private
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'vendors')));

// serve private assets after public
app.use(function(req, res, next) {
  console.log('GET /:hostname : Rerouting to Apartment');
  var namespace = req.hostname.match(/^[^\.]*/);
  req.url="/"+namespace+req.url;
  next();
});
app.use(express.static(path.join(__dirname, 'apartment')));

// landing page signup form
app.post('/signup', function(req, res){
  console.log('POST /signup : Recording Signup');
  Signup.sync().then(function(){
    var data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }

    Signup.create(data).then(function(signup){
      console.dir(signup.get());
    })
  });
  res.sendStatus(200);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
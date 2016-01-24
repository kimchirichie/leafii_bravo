var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined, undefined, {
  dialect: 'sqlite',
  storage: 'db/leafii_dev.db'
});

// DATABASE MODEL
var Traffic = sequelize.define('traffic', {
  hostname: {type: Sequelize.STRING, allowNull: false},
  ip: {type: Sequelize.STRING, allowNull: false}
});

// LOG TRAFFIC
router.use(function (req, res, next){
  console.log('MIDDLEWARE: Recording Traffic');
  var splitname = req.hostname.split(".")
  var namespace = splitname[splitname.length-2] || 'localhost';
  console.log('NAMESPACE: ' + namespace);
  Traffic.sync().then(function (){
    var data = {
      hostname: namespace,
      ip: req.ip
    }
    Traffic.create(data).then(function (traffic){
      console.dir(traffic.get());
    })
  });
  next();
});

module.exports = router;
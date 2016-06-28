var express = require('express');
var app = express();
var Sequelize = require('sequelize');

var database;
if (app.get('env') === 'production') {
	database = 'db/leafii_prod.db';
} else if (app.get('env') === 'development') {
	database = 'db/leafii_dev.db';
} else {
	database = 'db/leafii_test.db';
}

var sequelize = new Sequelize(undefined,undefined, undefined, {
	dialect: 'sqlite',
	storage: database
});

module.exports = sequelize.define('profiles', {
	user_id: {type: Sequelize.INTEGER},
	first: {type: Sequelize.STRING},
	last: {type: Sequelize.STRING},
	email: {type: Sequelize.STRING},
	phone: {type: Sequelize.STRING},
	company: {type: Sequelize.STRING},
	about: {type: Sequelize.STRING},
	contents: {type: Sequelize.TEXT}
});
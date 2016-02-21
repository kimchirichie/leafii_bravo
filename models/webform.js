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

module.exports = sequelize.define('webforms', {
	first: {type: Sequelize.STRING, allowNull: false},
	last: {type: Sequelize.STRING, allowNull: false},
	email: {type: Sequelize.STRING, allowNull: false},
	phone: {type: Sequelize.STRING, allowNull: false},
	domains: {type: Sequelize.TEXT, allowNull: false},
	school: {type: Sequelize.STRING},
	program: {type: Sequelize.STRING},
	profession: {type: Sequelize.STRING},
	quote: {type: Sequelize.STRING},
	about: {type: Sequelize.STRING},
	contents: {type: Sequelize.TEXT}
});
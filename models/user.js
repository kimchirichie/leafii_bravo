var express = require("express");
var app = express();
var Sequelize = require("sequelize");

var database;
if (app.get("env") === "production") {
	database = "db/leafii_prod.db";
} else if (app.get("env") === "development") {
	database = "db/leafii_dev.db";
} else {
	database = "db/leafii_test.db";
}

var sequelize = new Sequelize(undefined,undefined, undefined, {
	dialect: "sqlite",
	storage: database
});

module.exports = sequelize.define("user", {
	username: {type: Sequelize.STRING, allowNull: false, unique: true},
	password: {type: Sequelize.STRING, allowNull: false},
	salt: {type: Sequelize.STRING, allowNull: false},
	admin: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
});
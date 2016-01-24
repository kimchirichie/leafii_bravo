var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined, undefined, {
  dialect: 'sqlite',
  storage: 'db/leafii_dev.db'
});

// DATABASE MODEL
var Signup = sequelize.define('signup', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false},
  phone: {type: Sequelize.STRING, allowNull: false}
});

var Template = sequelize.define('templates', {
  first: {type: Sequelize.STRING, allowNull: false},
  last: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false},
  phone: {type: Sequelize.STRING, allowNull: false},
  school: {type: Sequelize.STRING},
  program: {type: Sequelize.STRING},
  profession: {type: Sequelize.STRING},
  about: {type: Sequelize.STRING},
  contents: {type: Sequelize.TEXT}
});

// LOG TIME
router.use(function (req, res, next){
	console.log('DATABASE: ', Date.now());
	next();
});

// ROUTES
router.route('/template')
	.get(function (req, res) {
		console.log('GET: /template : Querying Templates');
		Template.all().then(function (templates){
			res.json(templates);
		});
	})
	.post(function (req,res){
		console.log('POST: /template : Recording Template');
		console.dir(req.body);
		console.log(JSON.stringify(req.body.contents));
		Template.sync().then(function (){
			var data = req.body
			data.contents = JSON.stringify(data.contents);
			console.log(data);
			Template.create(data).then(function (template){
				console.dir(template.get());
			});
		});
		res.sendStatus(200);
	});

router.route('/signup')
	.get(function (req,res){
		res.send('coming soon');
	})
	.post(function (req, res){
		console.log('POST: /signup : Recording Signup');
		Signup.sync().then(function (){
			var data = {
				name: req.body.name,
				email: req.body.email,
				phone: req.body.phone
			}

			Signup.create(data).then(function (signup){
				console.dir(signup.get());
			});
		});
		res.sendStatus(200);
	});

module.exports = router;
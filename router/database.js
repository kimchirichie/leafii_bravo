var express = require('express');
var app = express();
var router = express.Router();
var Sequelize = require('sequelize');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
  	console.log(file);
    cb(null, file.originalname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage });

var database;
if (app.get('env') === 'production') {
	database = 'db/leafii_prod.db';
} if (app.get('env') === 'development') {
	database = 'db/leafii_dev.db';
} else {
	database = 'db/leafii_test.db';
}

var sequelize = new Sequelize(undefined,undefined, undefined, {
  dialect: 'sqlite',
  storage: database
});

// DATABASE MODEL
var Signup = sequelize.define('signup', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false},
  phone: {type: Sequelize.STRING, allowNull: false}
});

var Webform = sequelize.define('webforms', {
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

// LOG TIME
router.use(function (req, res, next){
	console.log('DATABASE: ', Date.now());
	next();
});

// ROUTES
router.route('/webform')
	.get(function (req, res) {
		console.log('GET: /webform : Querying Webform');
		Webform.all().then(function (webform){
			res.json(webform);
		});
	})
	.post(function (req,res){
		console.log('POST: /webform : Recording webform');
		console.dir(req.body);
		console.log(JSON.stringify(req.body.contents));
		Webform.sync().then(function (){
			var data = req.body
			data.contents = JSON.stringify(data.contents);
			data.domains = JSON.stringify(data.domains);
			console.log(data);
			Webform.create(data).then(function (webform){
				console.dir(webform.get());
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

router.post('/files', upload.single('file'), function(req, res){
	console.log('POST: /files : File Upload Complete');
	// console.log(req.)
	res.sendStatus(200);
});

module.exports = router;
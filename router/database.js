var express = require('express');
var app = express();
var router = express.Router();
var multer  = require('multer');

// MULTER UPLOAD
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

// DATABASE MODEL
var Webform = require('../models/webform');

// LOG TIME
router.use(function (req, res, next){
	console.log('DATABASE: ', Date.now());
	next();
});

// ROUTES
router.route('/webform')
	.get(function (req, res) {
		console.log("Authenticating user");
		req.login(req.user, function(err) {
			console.log("err: ", err);
			if (err) { 
				console.log("Failed authenticating user. Redirecting to sign in page");
				return res.redirect("/auth/signin"); 
			} else {
				console.log("Succeeded authenticating user");
			}
		});
		console.log('GET: /webform : Querying Webform');
		// FILTER WITH AUTHENTICATION THIS SHOULD BE CHANGED!
		Webform.all({
			where: {
				user_id: req.user.id
			}
		}).then(function (webform){
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

router.post('/files', upload.single('file'), function(req, res){
	console.log('POST: /files : File Upload Complete');
	res.json({filename: req.file.filename});
});

module.exports = router;
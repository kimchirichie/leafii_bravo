var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt   = require('bcrypt-nodejs');


// DATABASE MODEL
var User = require("../models/user.js");

// LOG TIME
router.use(function (req, res, next){
	console.log("AUTH: ", Date.now());
	next();
});

// PASSPORT
passport.use(new LocalStrategy(
	function(username, password, done){
		console.log("Local Auth Strategy Init");
		User.findOne({where:{username: username}}).then(function (user) {
			console.log("Database query finished. Checking data");
			console.log("password: ", password);
			console.log("salt: ", user.salt);
			console.log("hash input+salt: ", bcrypt.hashSync(password, user.salt, null));
			console.log("hash password: ", user.password);
			console.log("match: ", bcrypt.compareSync(password, user.password))
			if (!user){
				console.log("Local Auth Strategy Failed: No user found");
				return done(null, false, {message: "Incorrect username"});
			}
			if (!bcrypt.compareSync(password, user.password)) {
				console.log("Local Auth Strategy Failed: Password Mismatch");
				return done(null, false, {message: "Incorrect password"});
			}
			console.log("User authenticated");
			return done(null, user);
		});
	}
));

// ROUTES
router.route('/signup')
	.get(function (req,res){
		console.log("GET /signin : Getting signup page");
		res.sendFile(path.join(__dirname, "../views/signup.html"));
	})
	.post(function (req, res){
		console.log('POST: /signup : Recording Signup');
		if (req.body.password != req.body.confirm){
			res.send("passwords do not match"); // CHANGE THIS TO PROPERLY RESPOND
		} else if (req.body.username == "" || req.body.password == "") {
			res.send("required fields can not be blank"); // CHANGE THIS TO PROPERLY RESPOND
		}
		User.sync().then(function (){
			var data = req.body;
			data.salt = bcrypt.genSaltSync(8);
			data.password = bcrypt.hashSync(req.body.password, data.salt, null);
			console.log(data);
			User.create(data).then(function (user){
				console.dir(user.get());
			})
		});
		res.sendStatus(200);
	});

router.route("/signin")
	.get(function (req, res){
		console.log(req.user);
		res.sendFile(path.join(__dirname, "../views/signin.html"));
	})
	.post(passport.authenticate("local", {
			successRedirect: "/auth/user",
			failureRedirect: "/auth/signin",
			failureFlash: true
	}));

router.all("/signout",function(req, res){
		req.logout();
		res.redirect('/auth/signin');
	});

router.route("/user")
	.get(function (req, res){
		console.log("GET /user : Getting user page");
		res.sendFile(path.join(__dirname, "../views/user.html"));
	});

module.exports = router;
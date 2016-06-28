var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt   = require("bcrypt-nodejs");


// DATABASE MODEL
var User = require("../models/user.js");
var Profile = require("../models/profile.js");

// PASSPORT
passport.use(new LocalStrategy(
	function(username, password, done){
		console.log("Local Auth Strategy Init");
		User.findOne({where:{username: username}}).then(function (user){
			if (!user){
				console.log("Local Auth Strategy Failed: No user found");
				return done(null, false, {message: "Incorrect username"});
			}
			console.log("Database query finished. Checking data");
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
router.route("/signup")
	.get(function(req, res){
		console.log("GET: /signup : Getting signup page");
		if (req.user){
			console.log("User session found. Invoke error");
			res.redirect("/auth/signin");
		} else {
			res.render("auth/signup");
		}
	})
	.post(function(req, res){
		console.log("POST: /signup : Recording Signup");
		if (req.user){
			console.log("User session found. Invoke error");
			res.send("can not be signed in!"); // CHANGE THIS TO PROPERLY RESPOND
		} else if (req.body.password != req.body.confirm){
			console.log("Passwords mismatch. Invoke error");
			res.send("passwords do not match"); // CHANGE THIS TO PROPERLY RESPOND
		} else if (req.body.username == "" || req.body.password == "") {
			console.log("Required fields blank. Invoke error");
			res.send("required fields can not be blank"); // CHANGE THIS TO PROPERLY RESPOND
		} else {
			console.log("Parameters all good. Proceed to record in database")
			User.sync().then(function (){
				var data = req.body;
				data.salt = bcrypt.genSaltSync(8);
				data.password = bcrypt.hashSync(req.body.password, data.salt, null);
				console.log(data);
				User.create(data).then(function (user){
					console.log("Successfully recorded user in database");
					console.dir(user.get());
					Profile.sync().then(function (){
						Profile.create({user_id: user.id}).then(function (){
							console.log("Successfully recorded Profile for user");
							res.redirect("/auth/signin");
						})
					})
				});
			});
			// res.redirect("/auth/signin");
		}
	});

router.route("/signin")
	.get(function(req, res){
		console.log("GET: /signin : Getting signin page");
		if (req.user) { 
			console.log("User session found. Redirecting to user page");
			return res.redirect("/profile");
		} else {
			console.log("User session not found. Continue to signin page");
			res.render("auth/signin");
		}
	})
	.post(function(req, res, next){
			console.log("POST: /signin : Authenticating user");
			next();
		},passport.authenticate("local", {
			successRedirect: "/profile",
			failureRedirect: "/auth/signin",
			failureFlash: true
		}
	));

router.all("/signout", function(req, res){
		console.log("ANY: /signout : Signing out user");
		req.logout();
		console.log("Redirecting to signin page");
		res.redirect("/auth/signin");
	});

module.exports = router;
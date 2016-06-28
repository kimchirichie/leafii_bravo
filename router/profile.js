var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");


// DATABASE MODEL
var User = require("../models/user.js");
var Profile = require("../models/profile.js");

// ROUTES
router.route("/")
	.get(function(req, res){
		console.log("GET: / : Getting profile page");
		if (!req.user){
			console.log("User not found. Redirect");
			res.redirect("/auth/signin");
		}
		Profile.findOne({where:{user_id: req.user.id}}).then(function(profile){
			res.render("profile/index",{profile: profile});
		}, function(err){
			console.log(err);
			res.sendStatus(500);
		});
	})
	.post(function(req, res){
		console.log("POST: / : Updating profile");
		if (!req.user){
			console.log("User not found. Redirect");
			res.sendStatus(401);
		}
		Profile.findOne({where:{user_id: req.user.id}}).then(function(profile){
			if(!profile){
				console.log("No profile found");
				return done(null, false, {message: "No profile found"});
			} else {
				profile.update(req.body);
				console.log("Profile updated")
				res.redirect("/profile");
			}
		}, function(err){
			console.log(err);
			res.sendStatus(500);
		});
	});

router.route("/edit")
	.get(function(req, res){
		console.log("GET: /edit : Getting profile edit page");
		if (!req.user){
			console.log("User not found. Redirect");
			res.redirect("/auth/signin");
		}
		Profile.findOne({where:{user_id: req.user.id}}).then(function(profile){
			res.render("profile/edit",{profile: profile});
		}, function(err){
			console.log(err);
			res.sendStatus(500);
		});
	});

module.exports = router;
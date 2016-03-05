var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var multer  = require("multer");

// MULTER UPLOAD
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
  	console.log(file);
    cb(null, file.originalname + "-" + Date.now())
  }
})
var upload = multer({ storage: storage });

// DATABASE MODEL
var User = require("../models/user");
var Webform = require("../models/webform");

// LOG TIME
router.use(function (req, res, next){
	console.log("DATABASE: ", Date.now());
	next();
});

// ROUTES

	// ADMINISTRATION OF USERS
router.route("/admin")
	// serves up static user administration page
	// requires: user session to exist
	// requires: user to have privilege
	.get(function (req, res){
		console.log("GET /admin : Getting admin page");
		if (!req.user){
			console.log("User session not found. Redirecting to signin page");
			res.redirect("/auth/signin");
		} else if (!req.user.admin){
			console.log("User/admin privilege not found. Responding with 404");
			res.sendStatus(404)
		} else {
			console.log("Admin authenticated. Getting admin page");
			res.sendFile(path.join(__dirname, "../views/serveradmin.html"));
		}
	})
	.post(function (req, res){
		console.log("POST: /admin : coming soon");
		res.sendStatus(404);
	});

	// WEBFORM
router.route("/webform")
	// serves up webform JSON
	.get(function (req, res){
		console.log("GET: /webform : Getting webform JSON");
		if (!req.user){
			//FIXME: NEED PUBLIC ACCESS
			console.log("User session not found. Responding with 401");
			res.sendStatus(401);
		} else if (req.query.id){
			Webform.findOne({where:{id:req.query.id}}).then(function (webform){
				console.log("Found webform to update. Checking ownership");
				console.log(webform);
				if (!webform){
					console.log("No webform found. Responding with 401");
					res.sendStatus(401);
				} else if (webform.user_id != req.user.id && !req.user.admin){
					console.log("Not admin/owner of webform. Responding with 401");
					res.sendStatus(401);
				} else {
					console.log("Confirmed admin/owner of webform. Updating webform");
					res.json(webform);
				}
			})

		} else if (req.user.admin){
			console.log("Getting admin level JSON response");
			Webform
				.all()
				.then(function (webform){
					res.json(webform);
				});
		} else {
			//FIXME: NEED A WAY TO QUERY ONE WEBFORM, NOT EVERYTHING
			console.log("Getting user level JSON response");
			Webform
				.all({where: {user_id: req.user.id}})
				.then(function (webform){
					res.json(webform);
				});
		}
	})
	// records new webform
	.post(function (req,res){
		console.log("POST: /webform : Recording webform");
		Webform.sync().then(function (){
			var data = req.body
			data.contents = JSON.stringify(data.contents);
			data.domains = JSON.stringify(data.domains);
			if (req.user){
				data.user_id = req.user.id;
			}
			console.log(data);
			Webform.create(data).then(function (webform){
				console.log("Successfully recorded user in database");
				console.dir(webform.get());
				res.sendStatus(200);
			});
		});
	})
	// updates a webform
	.put(function (req,res){
		console.log("PUT: /webform : Updating webform");
		if (!req.user){
			console.log("User session not found. Responding with 401");
			res.sendStatus(401);
		} else {
			console.log("User session found. Querying webform");
			Webform.findOne({where:{id:req.body.id}}).then(function (webform){
				console.log("Found webform to update. Checking ownership");
				console.log(webform);
				if (!webform){
					console.log("No webform found. Responding with 401");
					res.sendStatus(401);
				} else if (webform.user_id != req.user.id && !req.user.admin){
					console.log("Not admin/owner of webform. Responding with 401");
					res.sendStatus(401);
				} else {
					console.log("Confirmed admin/owner of webform. Updating webform");
					var data = req.body
					delete data.id;
					delete data.user_id;
					delete data.domains;
					data.contents = JSON.stringify(data.contents);
					console.log(data);
					webform.update(data);
					res.sendStatus(200);
				}
			});
		}
	})
	// deletes a webform
	.delete(function (res,res){
		console.log("DELETE: /webform : coming soon");
		res.sendStatus(404);
	});

	// USERS
router.route("/users")
	// serves up static user page
	// requires: user session to exist
	.get(function (req, res){
		console.log("GET: /users : Getting user list");
		if (!req.user){
			console.log("User session not found. Redirecting to signin page");
			return res.redirect("/auth/signin");
		} else if (req.user.admin){
			User.all().then(function (users){
				res.json(users);
			});
		}
	})
	.post(function (req, res){
		res.sendStatus(404);
	})

	// FILES
router.route("/files")
	// serves up static files
	.get(function (req, res){
		console.log("GET: /files : coming soon");
		res.sendStatus(404);
	})
	// uploads static files
	.post(upload.single("file"), function(req, res){
		console.log("POST: /files : File Upload Complete");
		res.json({filename: req.file.filename});
	})
	// updates static files
	.put(function (req, res){
		console.log("PUT: /files : coming soon");
		res.sendStatus(404);
	})
	// deletes static files
	.delete(function (req, res){
		console.log("DELETE: /files : coming soon");
		res.sendStatus(404);
	});

module.exports = router;
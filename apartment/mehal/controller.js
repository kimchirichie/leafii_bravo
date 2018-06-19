var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/redcounter';
// to access $ mongo localhost:27017/redcounter

// SECURITY VERIFICATION TO KEEP CREEPS OFF SERVER
var authenticate = function(req, res, next){
	// LOG NUMBER OF ATTEMPS TO BLOCK BRUTE FORCE
	if(req.session.tries === undefined){
		req.session.tries = 1;
	}

	// RECORD INPUT PASSWORD
	if(req.body && req.body.password){
		req.session.password = req.body.password;
	}

	// RENDER FAIL FOR OVER-ATTEMPT;
	// RENDER LOGIN FOR NEW SESSION;
	if (req.session.password === undefined) {
		console.log("ATTEMPT #"+req.session.tries);
		if (req.session.tries && req.session.tries > 3){
			console.log("ATTEMP EXCEEDED MAX TRIES. BOOTING CLIENT");
			req.session.tries++;
			res.sendFile(__dirname +'/fail.html');
		} else {
			res.sendFile(__dirname +'/login.html');
		}
		return;
	}

	// IF PASSWORD INVALID INCERMENT ATTEMPT
	if(req.session.password !== 'abc'){
		delete req.session.password;
		console.log("ATTEMPT #"+req.session.tries+" FAILED")
		req.session.tries++;
		res.sendFile(__dirname +'/fail.html');
		return
	}

	next();
};


/* GET home page. */
router.get('/', authenticate, function(req, res, next) {
	res.sendFile(__dirname +'/index.html');
});

router.post('/', authenticate, function(req, res, next) {
	res.redirect('.');
});


router.get('/msgs', authenticate, function(req, res, next){
	res.sendFile(__dirname +'/msgs.html');
})

router.post('/msgs', authenticate, function(req, res, next){
	console.log(req.body)
	if(req.body.msg){
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			db.collection('msgs').insertOne({msg:req.body.msg, user:req.body.user, createdAt: new Date()}, function(err, r) {
				assert.equal(null, err);
				assert.equal(1, r.insertedCount);
				db.close();
			});
		});
	}
	res.redirect('./msgs');
})

router.get('/sent', authenticate, function(req, res, next){
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('msgs').find({},{sort:"createdAt"}).toArray(function(err, data) {
			db.close();
			res.json(data);
		});
	});
})


router.get('/kiss', authenticate, function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('redcounter').insertOne({type:"kiss", createdAt: new Date()}, function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
			db.close();
		});
	});

	res.redirect('.');
});


router.get('/lick', authenticate, function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('redcounter').insertOne({type:"lick", createdAt: new Date()}, function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
			db.close();
		});
	});

	res.redirect('.');
});


router.get('/sex', authenticate, function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('redcounter').insertOne({type:"sex", createdAt: new Date()}, function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
			db.close();
		});
	});

	res.redirect('.');
});

router.get('/stats', authenticate, function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('redcounter').count({type:"kiss"}).then(function(kiss) {
			db.collection('redcounter').count({type:"lick"}).then(function(lick) {
				db.collection('redcounter').count({type:"sex"}).then(function(sex) {
					db.close();
					res.json({kiss:kiss, lick:lick, sex:sex});
				});
			});
		});
	});
});


module.exports = router;

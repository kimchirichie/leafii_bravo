var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/*', function(req, res, next) {
	console.log(req.hostname)
	console.log(req.baseUrl)
	console.log(req.originalUrl)
	console.log(req.path)
	console.log(req.method)
	console.log(req.body)
	console.log(req.query)
	console.log(req.param)
	res.send({
		hostname:req.hostname,
		baseUrl:req.baseUrl,
		originalUrl:req.originalUrl,
		path:req.path,
		method:req.method,
		body:req.body,
		query:req.query,
		param:req.param,
	});
});

module.exports = router;
var App = angular.module('adminApp', []);

App.controller("adminController", function ($http){
	$http.get("/db/webform").then(function(webform){
		console.log(webform);
	});

	console.log("admin loaded");
});
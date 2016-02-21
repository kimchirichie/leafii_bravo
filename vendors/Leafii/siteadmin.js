var App = angular.module('siteadminApp', []);

App.controller("siteadminController", function ($http){

	var vm = this;

	console.log("siteadmin controller injected");
	// add all user + webforms to manipulate

	$http.get("/db/webform").then(function (res){
		console.log(res.data);
	});
});
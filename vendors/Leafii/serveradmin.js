var App = angular.module('serveradminApp', []);

App.controller("serveradminController", function ($http){

	var vm = this;

	console.log("serveradmin controller injected");
	// add all user + webforms to manipulate

	$http.get("/db/webform").then(function (res){
		console.log(res.data);
	});
});
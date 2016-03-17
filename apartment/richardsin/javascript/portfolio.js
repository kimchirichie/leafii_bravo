var App = angular.module('portfolioApp', []);

App.controller("portfolioController", function ($http){

	var vm = this;
	var formId = 1;
	vm.user = {};

	vm.getform = function (){
		// var link = "/db/webform?id="+formId;
		var link = "http://leafii.com/db/webform?id=1";
		$http.get(link).then(function(res){
			vm.user = res.data;
			vm.user.domains = JSON.parse(vm.user.domains);
			vm.user.contents = JSON.parse(vm.user.contents);
			console.log(res.data);
		});
	}
	
	vm.getform();
});

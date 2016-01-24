'use strict'

/*
 * THE TEMPLATE CONTROLLER
 * ------------------------------------
 * Controls the Template frame
 */

App.controller('TemplateController', function($http){

	var vm = this;
	
	vm.initialize = function(){
		vm.user = {contents:[{field:"",value:""}]};
	}

	vm.addmore = function(){
		vm.user.contents.push({field:"",value:""});
	}

	vm.delete = function(index){
		vm.user.contents.splice(index,1);
	}

	vm.submit = function(){
		console.log(vm.user);
		$http.post('/db/template', vm.user)
		.success(function (response){
			alert('Thank you! We will get working on it right away!');
			console.log('posting template successful');
			window.location.replace('http://leafii.com');
		}).error(function (response){
			alert('posting template unsuccessful');
			console.log(response);
		});
	}

	vm.initialize();
});
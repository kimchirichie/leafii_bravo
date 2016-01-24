'use strict'

/*
 * THE TEMPLATE CONTROLLER
 * ------------------------------------
 * Controls the Template frame
 */

App.controller('TemplateController', function($http){

	var vm = this;
	vm.user = {contents:[{field:"",value:""}]};

	vm.addmore = function(){
		vm.user.contents.push({field:"",value:""});
	}

	vm.delete = function(index){
		vm.user.contents.splice(index,1);
	}

	vm.submit = function(){
		console.log(vm.user);
	}
});
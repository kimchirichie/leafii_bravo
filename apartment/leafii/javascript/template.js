'use strict'

/*
 * THE TEMPLATE CONTROLLER
 * ------------------------------------
 * Controls the Template frame
 */

App.controller('TemplateController', function($http){

	var vm = this;
	vm.user = {contents:[{field:"experiences",value:"blah"}]};

	vm.addmore = function(){
		vm.user.contents.push({field:"new field",value:"blah"});
	}

	vm.delete = function(index){
		vm.user.contents.splice(index,1);
	}	
});
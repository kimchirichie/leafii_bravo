var App = angular.module('useradminApp', []);

App.controller("useradminController", function ($http){

	var vm = this;

	vm.getforms = function (){
		$http.get("/db/webform").then(function(res){
			vm.webforms = res.data;
			for (var i=0; i<vm.webforms.length; i++){
				vm.webforms[i].domains = JSON.parse(vm.webforms[i].domains);
				vm.webforms[i].contents = JSON.parse(vm.webforms[i].contents);

			}
			console.log(res.data);
		});
	}

	vm.edit = function (index){
		vm.editindex = index;	
	}

	vm.cancel = function (){
		delete vm.editindex;
	}

	vm.editting = function (index){
		return vm.editindex == index;
	}

	vm.update = function (webform){
		console.log(webform);
		$http.put("/db/webform", webform).then(function(res){
			console.log(res);
			vm.cancel();
		}, function(err){
			console.log(err);
		});
	}

	vm.addMore = function (webform){
		webform.contents.push({field:"",value:"",uploaded:[]});
	}

	vm.getforms();
});
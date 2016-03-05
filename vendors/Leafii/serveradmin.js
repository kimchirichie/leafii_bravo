var App = angular.module('serveradminApp', []);

App.controller("serveradminController", function ($http){

	var vm = this;
	vm.editindex = false;
	
	vm.getUsers = function (){
		$http.get("/db/users").then(function (res){
			vm.users = res.data;
			console.log(res.data);
		});
	}

	vm.findUser = function(users, id){
		for (var i=0; i<users.length; i++){
			if(users[i].id == id){
				return users[i];
			}
		}
	}

	vm.getForms = function (){
		$http.get("/db/webform").then(function(res){
			vm.webforms = res.data;
			for (var i=0; i<vm.webforms.length; i++){
				var webform = vm.webforms[i];
				webform.domains = JSON.parse(webform.domains);
				webform.contents = JSON.parse(webform.contents);
				webform.user = vm.findUser(vm.users, webform.user_id)
			}
			console.log(res.data);
		});
	}

	vm.edit = function(webform){
		console.log(webform);
		vm.webform = webform;
		return;
	}
	
	vm.cancel = function (){
		vm.webform = false;
	}

	vm.delete = function (webform, index){
		webform.contents.splice(index,1);
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

	vm.getUsers();
	vm.getForms();
});
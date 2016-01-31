'use strict'

/*
 * THE WEBFORM CONTROLLER
 * ------------------------------------
 * Controls the Webform frame
 */

App.controller('WebformController', function($http, Upload, $timeout){

	var vm = this;

	vm.initialize = function(){
		vm.user = {contents:[{field:"",value:"",uploaded:[]}]};
	}

	vm.addmore = function(){
		vm.user.contents.push({field:"",value:"",uploaded:[]});
	}

	vm.delete = function(index){
		if (confirm('are you sure?')){
			vm.user.contents.splice(index,1);
		}
	}

	vm.submit = function(webform){
		console.log(vm.user);
		if (webform.$invalid){
			alert('Please fill in the required fields');
		}
		else {
			for (var i = 0; i < vm.user.contents.length; i++){
				delete vm.user.contents[i].files;
			}
			$http.post('/db/webform', vm.user)
			.success(function (response){
				console.log('posting webform successful');
				window.location.replace('thankyou.html');
			}).error(function (response){
				alert('posting webform unsuccessful');
				console.log(response);
			});
		}	
	}

	vm.upload = function (content) {
		var files = content.files;
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				if (!file.$error) {
					Upload.upload({url: '/db/files',data: {file: file}})
					.then(function (resp) {
						$timeout(function() {
							console.log(resp.config.data.file);
							console.log('file: ' + resp.config.data.file.name + ', Response: ' + JSON.stringify(resp.data));
							content.uploaded.push(resp.config.data.file.name);

						});
					}, null, function (evt) {
						for (var i = 0; i < files.length; i++) {
							if (files[i].name == evt.config.data.file.name){
								var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
								files[i].progress = progressPercentage;
								if (progressPercentage == 100){
									files.splice(i,1)
								}
								break;
							}
						}
						console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
					});
				}
			}
		}
	};
	vm.initialize();
});
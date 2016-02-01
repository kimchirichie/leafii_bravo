'use strict'

/*
 * THE WEBFORM CONTROLLER
 * ------------------------------------
 * Controls the Webform frame
 */

App.controller('WebformController', function($http, Upload, $timeout){

	var vm = this;

	// vm.tabsHeight = angular.element().Height();

	
	vm.initialize = function(){
		vm.user = {contents:[{field:"",value:""}]};
	}

	vm.addmore = function(){
		vm.user.contents.push({field:"",value:""});
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
			$http.post('/db/webform', vm.user)
			.success(function (response){
				alert('Thank you! We will get working on it right away!');
				console.log('posting webform successful');
				window.location.replace('http://leafii.com');
			}).error(function (response){
				alert('posting webform unsuccessful');
				console.log(response);
			});
		}	
	}

    vm.upload = function (content) {
    	console.log(vm.user);
    	var files = content.files;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
            	// file.progress = 0;
                Upload.upload({
                    url: '/db/files',
                    data: {
                      somekey: 'somevalue',
                      file: file  
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        console.log('file: ' + resp.config.data.file.name + ', Response: ' + JSON.stringify(resp.data));
                    });
                }, null, function (evt) {
                	console.log('-----------');
                	console.log('event!');

                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                	file.progress = progressPercentage;
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
              }
            }
        }
    };
	vm.initialize();
});
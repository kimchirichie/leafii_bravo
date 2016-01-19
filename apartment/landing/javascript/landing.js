'use strict'

/*
 * THE LANDING CONTROLLER
 * ------------------------------------
 * Controls the Landing frame
 */

App.controller('LandingController',function($scope, $mdDialog, $mdMedia, $http){
	
	var dialogController = function($scope, $mdDialog) {

		$scope.cancel = function() {
			if(confirm('are you sure?')){
				$mdDialog.cancel();
			}
		};
		$scope.answer = function(valid) {
			if(!valid){
				alert('email and/or phone number is invalid');
				return;
			} else {
				$mdDialog.hide($scope.user);
			}
		};
	};

	$scope.showAdvanced = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
			controller: dialogController,
			templateUrl: 'try',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		}).then(function(answer) {
			console.log(answer);
			$http.post('/submit', {home : answer})
			.success(function successCallback(response) {
				alert('Thank You! We will get in touch with you very soon!');
				console.log('posting contact successful');
			}).error(function errorCallback(response) {
				alert('posting contact unsuccessful');
				console.log(response)
			});
		}, function() {
			console.log('dialog cancled');
		});

		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	  };


})
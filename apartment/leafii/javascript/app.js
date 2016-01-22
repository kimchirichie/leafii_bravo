window.App = angular.module('EfolioApp', ['ngMaterial'])

$(document).on('ready page:load', function(){
	angular.bootstrap(document.body, ["EfolioApp"]);
});
window.App = angular.module('TalentPage', ['ngMaterial'])

$(document).on('ready page:load', function(){
	angular.bootstrap(document.body, ["TalentPage"]);
});
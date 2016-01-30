window.App = angular.module("SamplePage", ["ngMaterial"])

$(document).on("ready page:load", function(){
	angular.bootstrap(document.body, ["SamplePage"]);
});
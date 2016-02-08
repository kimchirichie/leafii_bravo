window.App = angular.module("LeafiiApp", ["ngMaterial"])

$(document).on("ready page:load", function(){
	angular.bootstrap(document.body, ["LeafiiApp"]);
});
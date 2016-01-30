window.App = angular.module("LeafiiApp", ["ngMaterial", "ngFileUpload"])

$(document).on("ready page:load", function(){
	angular.bootstrap(document.body, ["LeafiiApp"]);
});
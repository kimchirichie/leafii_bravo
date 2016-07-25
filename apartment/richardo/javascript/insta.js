$(document).ready(function(){
	console.log('ready');
	$.getJSON('https://www.instagram.com/kimchirichie/media/', function(data){
		console.log(data);
	});
});
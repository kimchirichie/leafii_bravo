$(document).ready(function(){
	console.log('ready');
	var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=3003518730.4f7d05e.692ba15071134640939c4233d241182d';
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: url, 
		success: function(data) {
			var media = data.data;
			for(var i=0; i<media.length; i++){
				var url = media[i].link+"media/?size=m";
				console.log(url);
				$('#album').append('<div class="photo" style="background-image:url(' + url + ')"></div>');
			}
			$('.photo').each(function(){
				var maxtime = 1000;
				var randtime = Math.floor(Math.random()*maxtime)+1
				console.log(randtime);
				$(this).delay(randtime).fadeTo('slow', 1)

			})
		}
	});
});
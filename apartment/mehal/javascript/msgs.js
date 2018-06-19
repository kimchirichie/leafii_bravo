$(document).ready(function(){
	
	$.get('../sent',function(data){
		var len = data.length
		if(len) $('.nothing').hide();
		for(var i=0; i<len; i++){
			var $p = $("<p>", {class: "bubble"});
			if(data[i].user==="mehal"){
				$p.addClass("me");
			} else {
				$p.addClass("them");
			}

			$p.html(data[i].msg);
			$('#msg-box').append($p)
		}
		// var d = $('#msg-box');
		// d.scrollTop(d.prop("scrollHeight"));
	});

})
$(function() {
	setTimeout(function(){
		$('.content').show();
		$('#first').css('visibility','visible').hide().fadeIn('slow');
		setTimeout(function(){
			$('#second').css('visibility','visible').hide().fadeIn('slow');
		},1000);
	},1000);
});
$(function() {
    setTimeout(
    	function(){
    		$('#overlay').fadeOut("fast");
    		setTimeout(
    			function(){
    				$('#fourth').fadeIn("fast");
    				setTimeout(function(){
    					$('#fifth').css('visibility','visible').hide().fadeIn('slow');
    					setTimeout(function(){
    						$('#sixth').css('visibility','visible').hide().fadeIn('slow');
    						setTimeout(function(){
	    						$('#seventh').css('visibility','visible').hide().fadeIn('slow');
	    						setTimeout(function(){
		    						$('#eighth').css('visibility','visible').hide().fadeIn('slow');
		    						setTimeout(function(){
			    						$('#nineth').fadeIn('slow');
			    						
			    					}, 1000)
		    					}, 500)
	    					}, 500)
    					}, 500)
    				},1000)
    			},1000);

    	},5000);
});
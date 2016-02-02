$(function() {
	setTimeout(function(){
		$('#overlay').fadeOut("fast");
		$('.content').show();
		setTimeout(function(){
			$('#fourth').css('visibility','visible').hide().fadeIn('slow');
			setTimeout(function(){
				$('#fifth').css('visibility','visible').hide().fadeIn('slow');
				setTimeout(function(){
					$('#sixth').css('visibility','visible').hide().fadeIn('slow');
					setTimeout(function(){
						$('#seventh').css('visibility','visible').hide().fadeIn('slow');
						setTimeout(function(){
							$('#eighth').css('visibility','visible').hide().fadeIn('slow');
							setTimeout(function(){
								$('.nineth').css('visibility','visible').hide().fadeIn('slow');
								setTimeout(function(){
									$('.tenth').css('visibility','visible').hide().fadeIn('slow');
									setTimeout(function(){
										$('#what-i-do li').each(function(i) {
											$(this).delay( i * 200 ).css('visibility','visible').hide().fadeIn('slow');
											setTimeout(function(){
												$('#eleventh').css('visibility','visible').hide().fadeIn('slow');
												setTimeout(function(){
													$('#most-important span').each(function(i){
														$(this).delay( i * i * 400).css('visibility','visible').hide().fadeIn();
													});
													setTimeout(function(){
														$('#resume').css('visibility','visible').hide().fadeIn('slow');
														$('#twelveth').css('visibility','visible').hide().fadeIn('slow');
													},2000);
												},1000);
											},200*($('#what-i-do li').length)+1);
										});
									}, 500);
								}, 1000);
							}, 500);
						}, 500);
					}, 500);
				},1000);
			},1000);
		},1000);
	},5000);
});
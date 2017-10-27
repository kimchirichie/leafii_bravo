$(document).ready(function() {
    $(window).scroll( function(){
        $('.hideme').each( function(i){
            var half_of_object = $(this).offset().top + $(this).outerHeight() / 2;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > half_of_object ){
                $(this).animate({'opacity':'1'},500);
            }
        }); 
    });
});
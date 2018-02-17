$(document).ready(function(){
	var i = 0;
	var fadeTime = 12000;
	var testimonials = [
		{name:"Rishika G. - Student",testimonial:"Richard is always so patient and thorough in making sure that I understand the material. But more than that, through his own passion for the subject, Richard inspires me to see a deeper beauty in the material that I am learning—to understand why we study the things that we do, and to explore ideas that are not limited to the confines of the curriculum."},
		{name:"Lori M. - Parent",testimonial:"My son began tutoring with Richard for high school math. When Richard saw Nick's aptitude for computers, he customized his sessions to incorporate this so Nick could learn math in a different way. Richard is passionate about helping his students succeed. Richard's skills in tutoring is a rare find. Nick could not have had the success he had without Richard."},
		{name:"Natasha C. - Student",testimonial:"Through my tutoring sessions with Richard I quickly saw not only my physics grade rise but also my understanding of the material. We were short on time and cramming for exams but the tutoring really helped me feel confident going into my final examination!"},
		{name:"Dallas C. - Student",testimonial:"Richard is an excellent tutor. He is helping me learn grade 12 university physics in a whole new way, as he is able to help explain each question to me in full detail. I have seen improvements in my marks since he has started to see me, and he has very good availability, allowing me to see him even as late as the night before a test if need be."},
		{name:"Michelle M. - Student",testimonial:"Richard tutored me in grade 12 physics and helped me get the grade I needed to get into McMaster university. I actually used the problem solving methods he taught me in first year physics also."},
	]
	var nextTestimonial = function(){
		i = (i+1)%testimonials.length;

		$('.quote').fadeOut('slow', function(){
			$('.quote').html('"'+testimonials[i].testimonial+'"');
		});
		$('.name').fadeOut('slow', function(){
			$('.name').html(testimonials[i].name);
		});

		$('.quote').fadeIn('slow');
		$('.name').fadeIn('slow');

		setTimeout(nextTestimonial, fadeTime);
	}

	setTimeout(nextTestimonial, fadeTime);

})

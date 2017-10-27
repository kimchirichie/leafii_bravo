var faqs = [
	{
		question: 'If I have a family doctor, will they mind if I use clickMD?',
		answer: 'Unlike going to regular walk-in clinics, your doctor will not be penalized if you use clickMD.'
	},
	{
		question: 'How much does a consultation cost?',
		answer: 'The cost for service is $59.00 per issue. You do not pay HST.'
	},
	{
		question: 'What types of problems can you help me with?',
		answer: 'Simple primary healthcare issues that do not require an in-depth physical examination in person. Examples could include colds, rashes, allergies, mild anxiety, childcare advice, second opinions on bloodwork, x-rays, etc...'
	},
	{
		question: 'Can you prescribe medication?',
		answer: 'Yes! We can even send your prescription to your regular pharmacist who may deliver your medication directly to you. However, we do not provide prescriptions for restricted substances such as narcotics, benzodiazepines or anabolic steroids.'
	},
	{
		question: 'Is my privacy and medical information protected?',
		answer: 'Yes. Our service is PHIPA-compliant. We do not store any of your medical information on the internet and our video conferencing system is secure. We do, however, store your medical records on our secure and government-approved electronic medical record system.'
	},
	{
		question: 'Who are your doctors?',
		answer: 'Our doctors are all primary care physicians that are fully-licensed to practice in the province of Ontario. At this time, we CANNOT see any patients outside the province of Ontario.'
	},
	{
		question: 'What fixed & mobile devices do you support?',
		answer: 'You can use clickMD from your PC/laptop, tablet, Android 4.4 or higher smartphone and iOS 9or higher iPhone 5 and above. '
	},
	{
		question: 'What is Telemedicine?',
		answer: 'Telemedicine is the utilization of modern telecommunications technology to provide remote, interactive healthcare services. Through nearly any web enabled computer, tablet, or smart phone, our telemedicine technology connects patients and healthcare providers in ways never before possible. clickMD\'s secure, cloud based telemedicine platform is paving the way for more efficient diagnosis, treatment, and communication between healthcare providers and patients. Live, encrypted high-definition video, voice, instant messaging/chat, medical imaging, screen sharing and remote diagnostics are all a part of clickMD\'s telemedicine technology solution.'
	},
	{
		question: 'Who Benefits from Telemedicine?',
		answer: 'Everybody benefits with the implementation of telemedicine technology as a component of healthcare delivery. By virtue of telemedicine technology, healthcare providers can extend the reach of care, improve outcomes and reduce operating costs.'
	},
	{
		question: 'What is the Future of Telemedicine?',
		answer: 'The ultimate goal of telemedicine technology development is to empower the "Medical Home". The "Medical Home" model is based on the idea that a comprehensive coordinated approach focused on quality and safety will yield the best patient care. clickMD\'s telemedicine platform allows patient-centered, team-based, diagnosis, treatment, and communication to become a reality. Our technology encourages patients, wherever they are, to better manage a wide range of conditions.'
	}
];

var i = 0;
var delay = 5000

$(document).ready(function(){
	myTimer();
	setInterval(myTimer, delay);
});

function myTimer() {
    $('#faq-question').fadeOut(function(){
    	$('#faq-question').html('Q: ' + faqs[i%faqs.length].question);    	
    });
    $('#faq-answer').fadeOut(function(){
    	$('#faq-answer').html('A: ' + faqs[i%faqs.length].answer)
    });
    $('#faq-question').fadeIn();
    $('#faq-answer').fadeIn();
    i++;
}
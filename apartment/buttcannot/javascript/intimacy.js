$(document).ready(function(){
	var images = [
	'backwards.png',
	'building.png',
	'canal.png',
	'car.png',
	'ketchup.png',
	'panties.png',
	'pc.png',
	'phone.png',
	'sleep.png',
	'sleeper.png',
	'snap.png',
	'spagburger.png',
	'street.png',
	'train.png',
	'up.png',
	'us.png'
	]
	
	$.get('./stats',function(data){
		var kiss_goal = 100;
		var lick_goal = 100;
		var sex_goal = 100;
		var kissprog = parseFloat(data.kiss)*(100/kiss_goal);
		var lickprog = parseFloat(data.lick)*(100/lick_goal);
		var sexprog = parseFloat(data.sex)*(100/sex_goal);
		var totalprog = (kissprog+lickprog+sexprog)/3;
		var image = 0;
		if (kissprog < 5) kissprog = 5;
		if (lickprog < 5) lickprog = 5;
		if (sexprog < 5) sexprog = 5;
		if (totalprog < 5) totalprog = 5;

		$('#kisscount').html(parseFloat(data.kiss)*5);
		$('#lickcount').html(data.lick);
		$('#sexcount').html(data.sex);

		$('#kissbar').width(kissprog+"%");
		$('#lickbar').width(lickprog+"%");
		$('#sexbar').width(sexprog+"%");
		$('#totalbar').width(totalprog+"%");

		if(kissprog >=60){
			$('#kissbar').parent().addClass('orange');
		}

		if(lickprog >= 60){
			$('#lickbar').parent().addClass('orange');
		}

		if(sexprog >= 80){
			$('#sexbar').parent().addClass('red');
			$('#totalbar').parent().addClass('red');
			fadeout();
		} else if (sexprog >= 40){
			$('#sexbar').parent().addClass('orange');
			$('#totalbar').parent().addClass('orange');
		}

		if(totalprog >= 60){
			$('#fire').show();
		}

		changePhoto();
	});

	fadeout = function(){
		$('#warning').fadeOut('slow', fadein);
	};

	fadein = function(){
		$('#warning').fadeIn('slow', fadeout);
	}

	changePhoto = function(){
		setTimeout(function(){
			var i = Math.floor(Math.random()*(images.length-1));
			$("#photo").attr("src","image/"+images[i]);
			changePhoto()
		}, 3000);
	}

})
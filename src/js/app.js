function scrollToElement(el, ms){
	var speed = (ms) ? ms : 600;
    $('html,body').animate({
        scrollTop: $(el).offset().top
    }, speed);
}

function changeBackground(img){
	var elmLand = $('#landing'),
		elmPort = $('#landing .container'),
		isLand = ($(document).width() > 767) ? true : false;
	
	if (isLand) {
		elmLand.fadeTo('slow', 0.3, function(ev){
	    	$(this).css('background-image', 'url(src/img/camada_'+img+'.png)');
		}).fadeTo('slow', 1);	
	} else {
		elmPort.fadeTo('slow', 0.3, function(ev){
			var size= (img === 'landing_1') ? 'contain':'cover';
	    	$(this).css({
	    		'background-image': 'url(src/img/camada_'+img+'.png)',
	    		'background-position': 'center 125px',
	    		'background-size': size,
	    	});
		}).fadeTo('slow', 1);	
	}
    
}

var slider = {
	show : 3,
	elms: [
		'slider_1',
		'slider_2',
		'slider_3',
		'slider_4',
		'slider_5',
		'slider_6',
		'slider_7',
		'slider_8',
		'slider_9',
	],
	prev: function(slide){
		
		console.log(slide)
		$('.single-slider-container').removeClass('active')
		
		for (var i = 0; i < slider.elms.length; i++) {
			console.log(slider.elms[slide])
		}

		// $.each(slider.elms, function(index, el) {
		// 	console.log(index, el)	
		// 	$('#'+slider.elms[slide]).addClass('active')
		// });		
	},
	next: function(slide){
		
		console.log(parseInt(slide)+1)
		$('.single-slider-container').removeClass('active')
		
		$.each(slider.elms, function(index, el) {
			console.log(index, el)	
			$('#'+slider.elms[parseInt(slide)]).addClass('active')
		});		
	}
}

$(document).ready(function(){
	console.log('im ready'); 
	
	$('#landingGoDown').on('click', function(ev){
		scrollToElement('#slider', 1000);
	})

	$('.arrow-slider').on('click', function(event) {
		var arrow = $(this).attr('class').split('arrow-slider ')[1],
			actives = $('.slider-container').find('.single-slider-container.active'),
			prev = actives[0].id.split('slider_')[1],
			next = actives[2].id.split('slider_')[1];

		if (arrow === 'left') {
			slider.prev(prev)			
		} else {
			slider.next(next)
		}
	});

	$('.dot').on('click', function(ev){
		var elm = $(this);
		changeBackground(this.id);
		$('.dot').removeClass('active')
		elm.addClass('active')
	})

	$('.accordion-button').on('click', function(ev){
		var elm = $(this);

		if (elm.hasClass('active')){
			elm.removeClass('active')
		} else {
			$('.accordion-button').removeClass('active');
			elm.addClass('active')
		}

	})

	$('.input-container').on('click', function(ev) {
		$(this).children('input,textarea').focus()
	});
})
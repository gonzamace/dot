var Dot = {

	isMobile: function(){
		if ($(document).width() < 767) {
			$('body').addClass('mobile');
			return true
		} else {
			$('body').removeClass('mobile');
			return false
		}
	},

	setup: function(data, callback){

		for (var i = 0; i < data.length; i++) {

			$.each(data[i].data, function(id, obj) {

				var $clone = $('#'+data[i].elm)
								.clone()
								.attr('id', data[i].elm+id);
				$clone
					.find('img')
					.attr('src', obj.img)
				$clone
					.find('h2')	
					.text(obj.title)
				$clone
					.find('p')
					.text(obj.txt);
				
				$clone.appendTo(data[i].holder)
			});

			$('#'+data[i].elm).remove()
		}

	  	if (typeof callback === 'function') {
	        callback.call(this);
	    }

		this.adjustViewport()
	},

	scrollToElement: function($elm){
		$($elm).get(0).scrollIntoView({ block: 'start',  behavior: 'smooth' })
	},

	changeBackground: function($elm){
		var elmLand = $('#landing'),
			elmPort = $('#landing .container'),
			isLand = ($(document).width() > 767) ? true : false,
			img = $elm.attr('id'),
			dots = img.split('_')[0],
			size;

		$('[id^="'+dots+'"]').removeClass('active')
			
		if (isLand) {		
	    	elmLand.css('background-image', 'url(img/camada_'+img+'.png)');
			
		} else {
			size = (img === 'landing_1') ? 'contain':'cover';
			elmPort.css({
	    		'background-image': 'url(img/camada_'+img+'.png)',
	    		'background-position': 'center 125px',
	    		'background-size': size,
	    	})
		}

		$elm.addClass('active')
	    
	},

	adjustViewport: function(){

		var _isMobile = this.isMobile()

		if (_isMobile) {
			
			$(Slider.sliders.holder)
				.find('.single-slider-container')
				.removeClass('active')
				.first()
				.addClass('active')
				
		} else { //Desktop

			$(Slider.sliders.holder)
				.children('.single-slider-container')
				.removeClass('active')
				.slice(0,3)
				.addClass('active')
		}

	},
	
	_isMobile: function(){
		return $('body').hasClass('mobile');
	}
}

var Accordion = {
	accordions: accordions,

	setup: function() {
		$(Accordion.accordions.holder)
			.find('.accordion-button')
			.eq(2)
			.addClass('active')

		$(Accordion.accordions.holder)
			.find('.accordion-button')
			.first()
			.addClass('radius-border-top')

		$(Accordion.accordions.holder)
			.find('.accordion-button')
			.last()
			.addClass('radius-border-bottom last')
	},

	switch: function($elm){

		if ($elm.hasClass('active')){

			$elm.removeClass('active')

			if ($elm.hasClass('last')) {
				$elm
					.addClass('radius-border-bottom')
					.next()
					.removeClass('radius-border-bottom')
			}

		} else {

			$('.accordion-button').removeClass('active');

			if ($elm.hasClass('last')) {
				$elm
					.removeClass('radius-border-bottom')
					.next()
					.addClass('radius-border-bottom')
			} else {

			}
			$elm.addClass('active')
		}

		// var $container = $elm.closest('#accordion-container')

		// if (!$container.find('.active').length) {
		// 	$container.addClass('all-close')
		// } else {
		// 	$container.removeClass('all-close')
		// }
	}

}

var Slider = {
	
	sliders: sliders,

	slide: function(direction){

		var $activeSlides, 
			prev, 
			next, 
			newSlides,
			_isMobile = Dot.isMobile();

		$activeSlides = $(Slider.sliders.holder).find('.active');

		if ( _isMobile ) {
			prev = parseInt($activeSlides.get(0).id.split(Slider.sliders.elm)[1])-1;
			next = prev+2;
			if (direction === 'left' && prev > -1) {
				newSlides = [prev];
			} else if (direction === 'right' && next < Slider.sliders.data.length ){
				newSlides = [next];
			} else {
				return false;
			}
		} else {
			prev = parseInt($activeSlides.get(0).id.split(Slider.sliders.elm)[1]);
			next = parseInt($activeSlides.get(2).id.split(Slider.sliders.elm)[1]);
			if (direction === 'left' && prev > 0) {
				newSlides = [prev-1, prev, prev+1];
			} else if (direction === 'right' && next < Slider.sliders.data.length - 1 ){
				newSlides = [next-1, next, next+1];
			} else {
				return false;
			}
		}

		$(Slider.sliders.holder)
			.children('.single-slider-container')
			.removeClass('active')

		for (var i = 0; i < newSlides.length; i++) {
			$('#'+Slider.sliders.elm+newSlides[i]).addClass('active')
		}	
	}
}

$(window).on('resize', function(){

	Dot.adjustViewport()

});

$(document).ready(function(){
	console.log('im ready to go'); 

	Dot.setup([Slider.sliders, Accordion.accordions], Accordion.setup)

	$('#landing_arrow').on('click', function(ev){
		Dot.scrollToElement('#slider');
	})

	$('.dot').on('click', function(ev){
		var $elm = $(this);
		Dot.changeBackground($elm);
	})

	$('[id^="arrow_slider-"]').on('click', function(ev) {
		var $elm = $(this),
			direction = $elm.attr('id').split('arrow_slider-')[1];
		Slider.slide(direction)
	});

	$('.accordion-button').on('click', function(ev){
		var $elm = $(this);
		Accordion.switch($elm)
	})

	$('.input-container').on('click', function(ev) {
		$(this).children('input,textarea').focus()
	});
})
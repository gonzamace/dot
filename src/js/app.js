function scrollToElement(el){
    $(el).get(0).scrollIntoView();
}

function changeBackground($elm){
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
    
}

function switchAccordion($elm){

	if ($elm.hasClass('active')){
		$elm.removeClass('active')
		if ($elm.hasClass('last')) {
			$elm
				.removeClass('default-border')
				.next()
				.removeClass('radius-border')
		}

	} else {

		$('.accordion-button').removeClass('active');

		if ($elm.hasClass('last')) {
			$elm
				.addClass('default-border')
				.next()
				.addClass('radius-border')
		}
		$elm.addClass('active')
	}

	var $container = $elm.closest('.container')
	if (!$container.find('.active').length) {
		$container.addClass('all-close')
	} else {
		$container.removeClass('all-close')
	}
}

var Slider = {
	elm: 'slide_',
	holder: '#slider-container',
	sliders: [
		{
			img: 'img/camada_landing_1.png',
			title: 'magna aliqua',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_2.png',
			title: 'dolor sit',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_3.png',
			title: 'consectetur',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_4.jpg',
			title: 'adipiscing',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_5.jpg',
			title: 'elit',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		}
		,
		{
			img: 'img/camada_landing_6.jpg',
			title: 'sed do',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_7.jpg',
			title: 'eiusmod',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_8.jpg',
			title: 'incididunt',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_9.jpg',
			title: 'labore',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		}
	],

	setup: function(direction){

		$.each(Slider.sliders, function(i,obj) {

			var $clone = $('#'+Slider.elm).clone();

			$clone
				.attr('id', Slider.elm+i)
				.find('img')
					.attr('src', obj.img)
				.next()
			 		.children()
			 		.text(obj.title)
			 		.next()
			 		.text(obj.txt);
			
			$clone.appendTo(Slider.holder)
		})
		
		$('#'+Slider.elm).remove()
		
		Slider.adjustViewport()
	},

	init: function(direction){
		if ( $(Slider.holder).hasClass('mobile') ) {
			return Slider.initMobile(direction)
		}

		var activeSlides = $(Slider.holder).find('.active'),
			prev = parseInt(activeSlides[0].id.split(Slider.elm)[1]),
			next = parseInt(activeSlides[2].id.split(Slider.elm)[1]),
			newSlide;
	
		if (direction === 'left' && prev !== 0) {
			newSlide = [prev-1, prev, prev+1];
		} else if(direction === 'right' && next !== Slider.sliders.length - 1){
			newSlide = [next-1, next, next+1];
		} else {
			return false;
		}

		Slider.slide(newSlide)
	},

	initMobile: function(direction){

		var activeSlides = $(Slider.holder).find('.active'),
			slide = parseInt(activeSlides[0].id.split(Slider.elm)[1]),
			newSlide;

		if (direction === 'left' && slide !== 0) {
			newSlide = [slide-1];
		} else if(direction === 'right' && slide !== Slider.sliders.length - 1){
			newSlide = [slide+1];
		} else {
			return false;
		}

		Slider.slide(newSlide)
	},

	slide: function(newSlide){
		$(Slider.holder)
			.find('[id^="'+Slider.elm+'"]')
			.removeClass('active')
		for (var i = 0; i < newSlide.length; i++) {
			$('#'+Slider.elm+newSlide[i]).addClass('active')
		}	
	},

	adjustViewport: function(){
		var _isMobile = ($(document).width() < 767) ? true : false;

		if (_isMobile) {
			$(Slider.holder)
				.addClass('mobile')
				.find('.single-slider-container')
					.removeClass('active')
				.first()
					.addClass('active')
				
		} else {
			$(Slider.holder)
				.removeClass('mobile')
				.find('.single-slider-container')
					.removeClass('active')
				.nextAll(':lt(3)') 
					.addClass('active')
		}
	}	
}

$(window).on('resize', function(){

	Slider.adjustViewport()

});

$(document).ready(function(){
	console.log('im ready to go'); 
	
	Slider.setup()

	$('#landing_arrow').on('click', function(ev){
		scrollToElement('#slider');
	})

	$('.dot').on('click', function(ev){
		var $elm = $(this);
		changeBackground($elm);
	})

	$('[id^="arrow_slider-"]').on('click', function(ev) {
		var elm = $(this),
			direction = elm.attr('id').split('arrow_slider-')[1];
		Slider.init(direction)
	});


	$('.accordion-button').on('click', function(ev){
		var elm = $(this);
		switchAccordion(elm)
	})

	$('.input-container').on('click', function(ev) {
		$(this).children('input,textarea').focus()
	});
})
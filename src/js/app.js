function scrollToElement(el){
    $(el).get(0).scrollIntoView();
}

function changeBackground(elm){
	var elmLand = $('#landing'),
		elmPort = $('#landing .container'),
		isLand = ($(document).width() > 767) ? true : false,
		img = elm.attr('id'),
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

	elm.addClass('active')
    
}

function switchAccordion(elm){
	if (elm.hasClass('active')){
		
		elm.removeClass('active')
		if (elm.hasClass('last'))elm.removeClass('default-border')

	} else {
		
		$('.accordion-button').removeClass('active');
		if (elm.hasClass('last')) elm.addClass('default-border') 
		elm.addClass('active')
	}
}

function adjustMobile(){
	$('#slider')
		.find('#slider-container')
			.addClass('mobile')
		.find('.single-slider-container')
			.removeClass('active')
		.first()
			.addClass('active')
}

var Slider = {
	total : 9,
	elm: 'slider_',
	holder: '#slider-container',
	sliders: [
		{
			img: 'img/camada_landing_1.png',
			title: 'LOREM IPSUM',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_2.png',
			title: 'BARILOCHE',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_3.png',
			title: 'PRAIA DO ROSA',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_1-mobile.png',
			title: 'LOREM IPSUM',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_1-mobile.png',
			title: 'LOREM IPSUM',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		}
		,
		{
			img: 'img/camada_landing_1-mobile.png',
			title: 'LOREM IPSUM',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_1-mobile.png',
			title: 'LOREM IPSUM',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_1-mobile.png',
			title: 'LOREM IPSUM',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		},
		{
			img: 'img/camada_landing_1-mobile.png',
			title: 'LOREM IPSUM',
			txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
		}
	],

	setup: function(direction){

		// if ( $(Slider.holder).hasClass('mobile') ) {
		// 	return Slider.setupMobile(direction)
		// }
		

		$.each(Slider.sliders, function(i,obj) {
			var $clone = $('#'+Slider.elm).clone();

			$clone
				.attr('id', Slider.elm+i)
				.find('img')
					.attr('src', obj.img)
				.next('.text-container')
			 		.children('h2')
			 		.text(obj.title)
			 		.next('p')
			 		.text(obj.txt);
			if (i < 3) {
				$clone.addClass('active')
			}

			$clone.appendTo(Slider.holder)
		})
		$('#'+Slider.elm).remove()
		// console.log(clone)

		// for (var i = 0; i < Slider.total; i++) {
		// 	$(Slider.holder).append(html)
		// }

		// var activeSlides = $(Slider.holder).find('.active'),
		// 	prev = parseInt(activeSlides[0].id.split('slider_')[1]),
		// 	next = parseInt(activeSlides[2].id.split('slider_')[1]),
		// 	newSlide;
	
		// if (direction === 'left' && prev !== 1) {
		// 	newSlide = [prev-1, prev, prev+1];
		// } else if(direction === 'right' && next !== Slider.total){
		// 	newSlide = [next-1, next, next+1];
		// } else {
		// 	return false;
		// }

		// Slider.slide(newSlide)
		
	},
	init: function(){

	},
	setupMobile: function(direction){

		var activeSlides = $(Slider.holder).find('.active'),
			slide = parseInt(activeSlides[0].id.split('slider_')[1]),
			newSlide;

		if (direction === 'left' && slide !== 1) {
			newSlide = [slide-1];
		} else if(direction === 'right' && slide !== Slider.total){
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
	}	
}

$(document).ready(function(){
	console.log('im ready'); 
	
	Slider.setup()

	var isMobile = ($(document).width() < 767) ? true : false;

	if (isMobile) adjustMobile()


	$('#landing_arrow').on('click', function(ev){
		scrollToElement('#slider', 1000);
	})

	$('.dot').on('click', function(ev){
		var elm = $(this);
		changeBackground(elm);
	})

	// $('[id^="arrow_slider-"]').on('click', function(ev) {
	// 	var elm = $(this),
	// 		direction = elm.attr('id').split('arrow_slider-')[1];
	// 	Slider.setup(direction)
	// });

	

	$('.accordion-button').on('click', function(ev){
		var elm = $(this);
		switchAccordion(elm)
	})

	$('.input-container').on('click', function(ev) {
		$(this).children('input,textarea').focus()
	});
})
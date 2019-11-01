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

		if (elm.hasClass('last')) {
			elm
				.removeClass('default-border')
				.next()
				.removeClass('radius-border')
		}

	} else {
		$('.accordion-button').removeClass('active');
		if (elm.hasClass('last')) {
			elm
				.addClass('default-border')
				.next()
				.addClass('radius-border')
		}
		elm.addClass('active')
	}

	var $container = elm.closest('.container')
	if (!$container.find('.active').length) {
		$container.addClass('all-close')
	} else {
		$container.removeClass('all-close')
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
			txt: 'Integer euismod euismod risus eu consectetur. Cras ac metus metus. Pellentesque tempus faucibus urna, sed cursus felis consectetur et. Fusce suscipit, libero a accumsan rhoncus, nisl sem luctus sem, eu pharetra quam.'
		},
		{
			img: 'img/camada_landing_3.png',
			title: 'consectetur',
			txt: 'Vivamus commodo ex et eleifend mollis. Ut in iaculis arcu. In in bibendum enim. Morbi eleifend fermentum turpis, nec dictum lectus condimentum eget. Quisque augue urna, sollicitudin at tempor et, molestie eget.'
		},
		{
			img: 'img/camada_landing_4.jpg',
			title: 'adipiscing',
			txt: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec cursus lorem ut tellus blandit mattis. Vestibulum rutrum dolor nisl, in finibus magna consequat in. Suspendisse vitae eros.'
		},
		{
			img: 'img/camada_landing_5.jpg',
			title: 'elit',
			txt: 'Phasellus malesuada posuere lorem, at malesuada risus consectetur eu. Integer justo elit, euismod nec ligula ac, mattis ultricies ipsum. Sed volutpat orci nec erat blandit placerat. Vestibulum fringilla consequat odio vel aliquet.'
		}
		,
		{
			img: 'img/camada_landing_6.jpg',
			title: 'sed do',
			txt: 'Nunc at erat faucibus, aliquet metus ut, tristique urna. Quisque viverra tellus at erat viverra sollicitudin. Sed pulvinar ipsum nulla, a efficitur justo pellentesque vitae. Curabitur sit amet risus eget dui dignissim.'
		},
		{
			img: 'img/camada_landing_7.jpg',
			title: 'eiusmod',
			txt: 'Praesent interdum accumsan aliquet. In in ipsum consequat turpis accumsan vehicula. Quisque dignissim tempus ante vel tincidunt. Donec pharetra tellus dolor, vitae malesuada massa tempor quis. Pellentesque vestibulum egestas tellus ut pharetra.'
		},
		{
			img: 'img/camada_landing_8.jpg',
			title: 'incididunt',
			txt: 'Fusce ultricies turpis sed libero gravida aliquam. Praesent accumsan sollicitudin libero, ac rhoncus nisl porta vitae. Aenean porta placerat nisl quis pretium. Etiam sit amet vulputate elit, eu varius mauris. Aenean pharetra.'
		},
		{
			img: 'img/camada_landing_9.jpg',
			title: 'labore',
			txt: 'Donec vel sodales neque. Aliquam id condimentum erat. Nullam laoreet turpis vitae felis laoreet, ut lobortis libero luctus. Suspendisse ut sapien condimentum, cursus lectus ut, sollicitudin sapien. Donec dignissim est at facilisis.'
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
			if (i < 3) {
				$clone.addClass('active')
			}

			$clone.appendTo(Slider.holder)
		})
		
		$('#'+Slider.elm).remove()
		
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
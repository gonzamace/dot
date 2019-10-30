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
	    		'background-position': 'center 150px',
	    		'background-size': size,
	    	});
		}).fadeTo('slow', 1);	
	}
    
}

$(window).on('resize', function(event) {
	// console.log('resize')
	// changeBackground(this.id);
});

$(document).ready(function(){
	console.log('im ready'); 
	
	$('#landingGoDown').on('click', function(ev){
		scrollToElement('#slider', 1000);
	})

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
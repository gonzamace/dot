function scrollToElement(el, ms){
	var speed = (ms) ? ms : 600;
    $('html,body').animate({
        scrollTop: $(el).offset().top
    }, speed);
}

function changeBackground(img){
	var image = $('#landing');

    image.fadeTo('slow', 0.3, function(){
	    $(this).css('background-image', 'url(src/img/camada_'+img+'.png)');
	}).fadeTo('slow', 1);
}


$(document).ready(function(){
	console.log('im ready'); 
	
	$('#landingGoDown').on('click', function(ev){
		scrollToElement('#slider', 1000);
	})

	$('.dot').on('click', function(ev){
		changeBackground(this.id);
		$('.dot').removeClass('active')
		$(this).addClass('active')

	})
})
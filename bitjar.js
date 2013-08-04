$(document).ready(function() {
	
	$('.accordion p').each(function(){
	  $(this).hide();
	});
	$('.accordion > li > div').click(function(){
		if( false == $(this).is(':visible')) {
		  $('.accordion p').slideUp(280);
	}
	$(this).next().slideToggle(280);
	});

});

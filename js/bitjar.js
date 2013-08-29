$(document).ready(function() {

//FAQ accordion	
	$('.accordion p').each(function(){
	  $(this).hide();
	});
	$('.accordion > li > div').click(function(){
		if( false == $(this).is(':visible')) {
		  $('.accordion p').slideUp(280);
	}
	$(this).next().slideToggle(280);
	});


//Budget

	//Stay on same tab when hash is reloaded
	$(function(){
	  var hash = window.location.hash;
	  hash && $('ul.nav a[href="' + hash + '"]').tab('show');
	  $(document).scrollTop(0);

	  $('.nav-tabs a').click(function(e) {
		$(this).tab('show');
		window.location.hash = this.hash;
		$(document).scrollTop(0);
	  });
	});

	var budget = {
		income : '',
		food : '',
		housing : '',
		utilities : '',
		transportation : '',
		shopping : '',
		medical : '',
		entertainment : '',
		debt : '',
		miscellaneous : ''
	};

	$('.input_error').hide();

	//Display list function
});

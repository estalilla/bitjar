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

	var chartData = $('#chartData'),
		income = {},
		budget = {
		Income : '',
		Food : '',
		Housing : '',
		Utilities : '',
		Transportation : '',
		Shopping : '',
		Medical : '',
		Entertainment : '',
		Debt : '',
		Miscellaneous : ''
	};

	$('.input_error').hide();

	//Display list function
    function addTableData(e){
	  chartData.html('');
	  chartData.append('<tr> <th>myBudget</th> <th>Monthly ($)</th>  </tr>');
	  $.each(budget, function(prop, value) { 
		if(parseInt(value) > 0){
		  console.log(prop + '='+ value);
		  chartData.append(
			'<tr> <td>'+prop+'</td> <td>'+value+'</td> </tr>'
		  )			    
		} 
	});
	};	

	$('#inputs_form').submit(function(e){
	  e.preventDefault();
	  //get values from user inputs
	  income.Income = $('#monthly_income').val();
	  budget.Food = $('#food_expense').val();
	  budget.Housing = $('#housing_expense').val();
	  budget.Utilities = $('#utilities_expense').val();
	  budget.Transportation = $('#transportation_expense').val();
	  budget.Shopping = $('#shopping_expense').val();
	  budget.Medical = $('#medical_expense').val();
	  budget.Entertainment = $('#entertainment_expense').val();
	  budget.Debt = $('#debt_expense').val();
	  budget.Miscellaneous = $('#miscellaneous_expense').val();

		var sum = 0;
		$.each(budget, function(prop, value){
		  if (parseInt(value) > 0) {
		    sum += parseInt(value);
		  }
		});
		var savings = parseInt(budget.Income) - (sum - parseInt(budget.Income));
		console.log(savings);  
	  if (sum > 0) {
 	    addTableData();
	  }
	  if (savings > 0) {
		chartData.append('<tr> <td>Savings</td> <td>'+savings+'</td>');
	  }

/*	  $.each(budget, function(prop, value) { 
		if(parseInt(value) > 0){
		  console.log(prop + '='+ value);
		  $('#chartData').append(
			'<tr> <td>'+prop+'</td> <td>'+value+'</td> </tr>'
		  )			    
		} 
	  });
*/
	  $(pieChart);		
	}); //Close submit function

	$('#clear_all').click(function(){
	 $('#inputs_form').each(function(){
		this.reset();
	  });
	  chartData.html('');
	  var canvas = $('#chart')[0]; // Erase canvas by resetting its width
	  canvas.width = canvas.width; 
	});



});

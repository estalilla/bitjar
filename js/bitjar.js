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

	var chartData = $('#chartData');
	var budget = {
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
	  budget.Income = $('#monthly_income').val();
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

	  addTableData();
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
	}); //Close submit function

	$('#clear_all').click(function(){
	 $('#inputs_form').each(function(){
		this.reset();
	  });
	  chartData.html('');
	});


	//Pie Chart
	$(pieChart);
	function pieChart() {
	  //Config
	  var chartSizePercent = 55;
	  var sliceBorderWidth = 1;			  
	  var sliceBorderStyle = "#fff";	  //Color of border around each slice
	  var sliceGradientColour = "#ddd";   //Color to use for end of the chart gradient
	  var maxPullOutDistance = 25;	  //Length in pixels pull-out slice will travel
	  var pullOutFrameStep = 4;		  //How many pixels to move a slice with each animation frame
	  var pullOutFrameInterval = 40;  //Length in milliseconds between each animation frame 
	  var pullOutLabelPadding = 65;   //Padding between pulled-out slice and its label
	  var pullOutLabelFont = "bold 16px 'Trebuchet MS', Verdana, sans-serif";
	  var pullOutValueFont = "bold 12px 'Trebuchet MS', Verdana, sans-serif";  
	  var pullOutValuePrefix = "$";				  //Pull-out slice value prefix
	  var pullOutShadowColor = "rgba( 0,0,0,.5)"; //Shadow color
	  var pullOutShadowOffsetX = 5;			//X-offset of pull-out slice
	  var pullOutShadowOffsetY = 5;			//Y-offset of pull-out slice
	  var pullOutShadowBlur =5;			    //Amount of blur for slice
	  var pullOutBorderWidth = 2;		    //Width of pull-out slice border in pixels
	  var pullOutBorderStyle = "#333";      //Color of pull-out slice border
	  var chartStartAngle = -.5 * Math.PI;  //Start at 12 o'clock position
	
	  // Declare some variables for the chart
	  var canvas;
	  var currentPullOutSlice = -1;		//Slice currently pulled out (-1 = no slice)
	  var currentPullOutDistance = 0;	//How many pixels the pulled-out slice is currently at in the animation
	  var animationId = 0; 				//Tracks the interval ID for the animation created by setInterval
	  var chartData = []; 				//Chart data (labels, values, and angles
	  var chartColors = [];				//Colors pulled from HTML table
	  var totalValue = 0;				//Total of all values in the chart
	  var canvasWidth;					//Width of the canvas, in pixels
	  var canvasHeight;					
	  var centerX;						//X-coordinate of center of canvas/chart
	  var centerY;

	  init();

	  function init() {
		//Get the canvas element in the page
		canvas = document.getElementById('chart');
		//Exit if browswer isn't canvas-capable
		if (typeof canvas.getContext === 'undefined') return;
		//Initialize properties
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
		centerX = canvasWidth / 2;
		centerY = canvasHeight / 2;
		chartRadius = Math.min(canvasWidth, canvasHeight) / 2 & (chartSizePercent / 100);
		//Grab data from table
		var currentRow = -1;
		var currentCell = 0;

		$('#chartData td').each(function() {
		  currentCell ++;
		  if (currentCell % 2 != 0 ) {
			currentRow ++;
			chartData[currentRow] = [];
			chartData[currentRow]['label'] = $(this).text();
		  } else {
			var value = parseFloat($(this).text());
			totalValue += value;
			chartData[currentRow]['value'] = value;
		  }

		  //Store the slice index in this cell and attach click handler
		  $(this).data('slice', currentRow);
		  $(this).click(handleTableClick);

		  //Extract and store the cell color
		  if (rgb = $(this).css('color').match( /rgb\((\d+), (\d+), (\d+)/) ) {
			chartColors[currentRow] = [ rgb[1], rgb[2], rgb[3] ];
			} else if (hex = $(this).css('color').match(/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/) ) {
			  chartColors[currentRow] = [ parseInt(hex[1],16), parseInt(hex[2],16), parseInt(hex[3], 16) ];
			} else {
			  alert( "Error: Color could not be determined! Please specify table colors" );
			  return;
			}

			});

			//Now compute and store the start and end angles of each slice in the chart data
			var currentPos = 0; //Current position from 0 to 1;
			for (var slice in chartData) {
			  chartData[slice]['startAngle'] = 2*Math.PI*currentPos;
			  chartData[slice]['endAngle'] = 2*Math.PI*(currentPos+(chartData[slice]['value']/totalValue));
			  currentPos += chartData[slice]['value'] / totalValue;
			}

			//Draw pie chart and add click handler
			drawChart();
			$('#chart').click(handleChartClick);
		  } //Close init function
		
		  //Click handler function toggles slice in/out
		  //@param Event The click event
		  function handleChartClick(clickEvent){
			//Get mouse cursor position at time of click, relative to canvas
			var mouseX = clickEventpageX - this.offsetLeft;
			var mouseY = clickEventpageY - this.offsetTop;

			//Check if click was within pie chart
			var xFromCenter = mouseX - centerX;
			var yFromCenter = mouseY - centerY;
			var distanceFromCenter = Math.sqrt(Math.pow(Math.abs(xFromCenter),2)+Math.pow(Math.abs(yFromCenter),2));
			if (distanceFromCenter <= chartRadius) {
			  //If yes, click was within chartRadius
			  //Find the slice that was clicked by comparing the angles relative to the chart center
			  var clickAngle = Math.atan2(yFromCenter, xFromCenter) - chartStartAngle;
			  if (clickAngle < 0) clickAngle = 2*Math.PI + clickAngle;
			  for (var slice in chartData) {
				//Slice found. Toggle push/pull 
				toggleSlice (slice);
				return;			
			  }
			}
		    pushIn();
		} //Close handleChartClick function
		//Event handler for Table clicks		 
		function handleTableClick(clickEvent){
		  var slice = $(this).data('slice');
		  toggleSlice(slice);
		}
		//Function to toggle slice in/out
		function toggleSlice(slice) {
		  if (slice == currentPullOutSlice) {
			pushIn();
		  } else {
			startPullOut(slice);
		  }
		}
		//Function to animate slice pull out
		function startPullOut (slice) {
		  //Exit if already pulling out this slice
		  if (currentPullOutSlice == slice) return;
		  //Record the slice that we're pulling out, clear previous animations, then start animation
		  currentPullOutSlice = slice;
		  currentPullOutDistance = 0;
	   	  clearInterval(animationId);
		  animationId = setInterval(function() { animatePullOut(slice);}, pullOutFrameInterval);

		  //Highlight the corresponding row in the key table
		  $('#chartData td').removeClass('highlight');
		  var labelCell = $('#chartData td: eq(' + (slice*2) + ')');
		  var valueCell = $('#chartData td: eq(' + (slice*2+1) + ')');
		  labelCell.addClass('highlight');
		  valueCell.addClass('highlight');
		} //Close startPullOut function

		function animatePullOut (slice) {
		  //Pull the slice out
		  currentPullOutDistance += pullOutFrameStep;
		  //Stop if limit reached
		  if (currentPullOutDistance >= maxPullOutDistance) {
			clearInterval(animationId);
			return;
		  }
		  drawChart();
		}

		function pushIn() {
		  currentPullOutSlice = -1;
		  currentPullOutDistance = 0;
		  clearInterval (animationId);
		  drawChart();
		  $('#chartData td').removeClass('highlight');
		}

		//Draw chart
		function drawChart() {
		  //Get drawing context
		  var context = canvas.getContext('2d');
		  //Clear canvas
		  context.clearRect (0,0, canvasWidth, canvasHeight);
		  //Draw each slice of the chart, skip pulled-out slices
		  for (var slice in chartData) {
			if (slice != currentPullOutSlice) drawSlice(context, slice);
		  }
		  //If there's a pulledout slice, draw it here. Drawn last so drop shadow isn't painted over
		  if (currentPullOutSlice != -1) drawSlice(context, currentPullOutSlice);	
		}

		function drawSlice(context, slice) {
		  //Compute the adjusted start and end angles for the slice
		  var startAngle = chartData[slice]['startAngle'] + chartStartAngle;
		  var endAngle = chartData[slice]['endAngle'] + chartStartAngle;

		  if (slice == currentPullOutSlice) {
			//Pull out slice and offset it from center, label it, and add drop shadow
			var midAngle = (startAngle + endAngle) / 2;
			var actualPullOutDistance = currentPullOutDistance * easeOut(currentPullOutDistance/maxPullOutDistance, .8);
			startX = centerX + Math.cos(midAngle)*actualPullOutDistance;
			startY = centerY + Math.sin(midAngle)*actualPullOutDistance;
			context.fillStyle = 'rgb(' + chartColors[slice].join(',')+')';
			context.textAlign = 'center';
			context.font = pullOutLabelFont;
			context.fillText = (chartData[slice]['label'], centerX + Math.cos(midAngle) * ( chartRadius + maxPullOutDistance + pullOutLabelPadding ), centreY + Math.sin(midAngle) * ( chartRadius + maxPullOutDistance + pullOutLabelPadding ) );
			context.font = pullOutValueFont;
	        context.fillText( pullOutValuePrefix + chartData[slice]['value'] + " (" + ( parseInt( chartData[slice]['value'] / totalValue * 100 + .5 ) ) +  "%)", centreX + Math.cos(midAngle) * ( chartRadius + maxPullOutDistance + pullOutLabelPadding ), centreY + Math.sin(midAngle) * ( chartRadius + maxPullOutDistance + pullOutLabelPadding ) + 20 );
      		context.shadowOffsetX = pullOutShadowOffsetX;
            context.shadowOffsetY = pullOutShadowOffsetY;
      		context.shadowBlur = pullOutShadowBlur;
		  } else {
			//This slice isn't pulled out so draw it from center
			startX = centerX;
			startY = centerY;
		  }
		// Set up the gradient fill for the slice
	    var sliceGradient = context.createLinearGradient( 0, 0, canvasWidth*.75, canvasHeight*.75 );
        sliceGradient.addColorStop( 0, sliceGradientColour );
        sliceGradient.addColorStop( 1, 'rgb(' + chartColors[slice].join(',') + ')' );

        // Draw the slice
		context.beginPath();
		context.moveTo(startX, startY);
		context.arc(startX, startY, chartRadius, startAngle, endAngle, false);
		context.lineTo(startX, startY);
		context.closePath();
		context.fillStyle = sliceGradient;
		context.shadowColor = (slice == currentPullOutSlice) ? pullOutShadowColor : "rgba(0,0,0,0)";
		context.fill();
		context.shadowColor = "rgba(0,0,0,)";		
		//Style the slice border
		if (slice == currentPullOutSlice) {
		  context.lineWidth = pullOutBorderWidth;
		  context.strokeStyle = pullOutBorderStyle;
		} else {
		  context.lineWidth = sliceBorderWidth;
		  context.strokeStyle = sliceBorderStyle;
		}
		context.stroke //Draw slice border
		} //Close drawSlice function
		
		//Create an easing function
		function easeOut (ration, power) {
		  return (Math.pow (1 - ratio, power) + 1);
		}
	  } //Close pieChart function


});

/* Author: Chris Nilghe

*/
$(document).ready(function() {

    $('#entercode').click(function() {
        checkCode($('#usercode').val());
    });

});

/* Check the code the user entered to see if they have a card */
function checkCode(code) {

    var array = [	"nilghe4", 
					"himpster2", 
					"anna8", 
					"scheirer88",
					"wdwmarriage",
					"cjme980",
					"cutebutton",
					"brewer",
					"applebois",
					"twitters",
					"sneakysneaky",
					"kate",
					"bbqmaster",
					"utsunomiya",
					"cousin",
					"parham",
					"amazingrace",
					"ember",
					"toofarr",
					"mandee",
                    "merrychristmas"];

    if (jQuery.inArray(code, array) != -1)
    {
	
		$('#instruction-wrapper').css('z-index', '2');
		$('#loader').fadeIn(2000);
		
		fillCard(code);
		
		//Shift background image
		$('.redbox').animate({"backgroundPosition" : "-1000px"}, 20000);
		
		//Shift the instructions off screen
		// $('#instruction').animate({"left":"-600px"},2000, function(){
			// showLoading("#loadingOne", 1);
			// window.setTimeout(showLoading, 4000, "#loadingTwo", 1);
			// window.setTimeout(showLoading, 8000, "#loadingThree", 0);
		// });
		
		$('#instruction').animate({"left":"-600px"},2000);
		$('#loadingOne').queue(function() {
			showLoading($(this), 1);
			$(this).dequeue();
		});
		$('#loadingTwo').delay(4000).queue(function() {
			showLoading($(this), 1);
			$(this).dequeue();
		});
		$('#loadingThree').delay(8000).queue(function() {
			showLoading($(this), 0);
			$(this).dequeue();
		});
    }
    else
    {
        alert("Sorry there is no card for you");
    }
}

/* Grab the card from json and display */
function fillCard(code) {
	$.getJSON("cards.json",
    function(data) {
        $.each(data.cards, function(i, item) {
			if (item.id == code){
				$('#name').append(item.name);
				$('#message').append("<p>" + item.message + "</p>");
			}
        });

    });
}

//Show the loading Text and animations
function showLoading(id, finish) {

	$(id).animate({"left":"50%"}, 2000, function(){
		$(id).delay("1000").animate({left:"-600px"}, 2000, function(){
			if (finish == 0) { window.setTimeout(showCard, 1000); } //Show card once we are done "loading"
		});
	});
	
}

//Display the Card and the Name
function showCard() {
	
	$('#loader').fadeOut(2000);
	
	//Shift Reciepant on screen
	$('#name').animate({"left":"4%"},3000, function(){
		//Shift Vertical Ribbon
		$('#redboxVertical').animate({"left":"80px"}, 2000);

		//Reset the z-index of the instruction wrapper so the card displays properly
		$('#instruction-wrapper').css('z-index', '');

		//Display Card
		$('#card-wrapper').show();
		$('#card-wrapper').animate({"height":"400px"}, 2000, function(){
			$('#message').fadeIn('slow');
		});
	});
}


























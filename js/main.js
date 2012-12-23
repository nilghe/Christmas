/* Author: Chris Nilghe
   version: 1.0.1
   updated: December 22nd, 2012
*/
$(document).ready(function() {

	var queryString = GetQueryString('code');

	/* If card code exists in the query string then display the get card button
	 * Otherwise allow the user to enter a code */
	(queryString != null) ? $('#code-enter').hide() : $('#no-code').hide();

    $('#entercode').click(function() {
        getCard($('#usercode').val());
    });    

    $('#get-card').click(function() {
        getCard(queryString);
    });

});

/* Get the users card */
function getCard(code) {

	var hasCard = false;

	$.getJSON("cards.json",
    function(cardList) {
        $.each(cardList.cards, function(i, item) {
			if (item.id == code){
				hasCard = true;
				return;
			}
        });

	    if (hasCard)
	    {
		
			$('#instruction-wrapper').css('z-index', '2');
			$('#loader').fadeIn(2000);
			
			fillCard(code, cardList);
			
			//Shift background image
			$('.redbox').animate({"backgroundPosition" : "-1000px"}, 20000);
			
			$('#instruction').animate({"left":"-9999px"}, 5000);
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
	        alert("Sorry, the code you entered is invalid. Try entering it again. If the error persists please contact Chris. ");
	        
	        /* If the query string did not work then allow the user to enter it manually */
	        $('#code-enter').show(); 
	        $('#no-code').hide();
	    }

    });

}

/* Grab the card from json and display */
function fillCard(code, cardList) {
    $.each(cardList.cards, function(i, item) {
		if (item.id == code){
			$('#name').append(item.name);
			$('#message').append("<p>" + item.message + "</p>");
		}
    });
}

//Show the loading Text and animations
function showLoading(id, finish) {

	$(id).animate({"left":"50%"}, 5000, function(){
		$(id).delay("1000").animate({left:"-9999px"}, 5000, function(){
			if (finish == 0) { window.setTimeout(showCard, 1000); } //Show card once we are done "loading"
		});
	});
	
}

//Display the Card and the Name
function showCard() {
	
	$('#loader').fadeOut(2000);
	
	
	//Shift Vertical Ribbon
	$('#redboxVertical').animate({"left":"80px"}, 2000, function(){

		//Shift Reciepant on screen
		$('#name').animate({"left":"4%"}, 4000);

		//Reset the z-index of the instruction wrapper so the card displays properly
		$('#instruction-wrapper').css('z-index', '');

		//Display Card
		$('#card-wrapper').show();
		$('#card-wrapper').animate({"height":"450px"}, 2000, function(){
			$('#message').fadeIn('slow');
		});
	});
}

//Get query string
function GetQueryString(param) {
    var pageURL = window.location.search.substring(1);
    var urlVariables = pageURL.split('&');
    for (var i = 0; i < urlVariables.length; i++) 
    {
        var parameterName = urlVariables[i].split('=');
        if (parameterName[0] == param) 
        {
            return parameterName[1];
        }
    }
}

























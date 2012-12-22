/* Author: Chris Nilghe

*/
$(document).ready(function() {

    $('#entercode').click(function() {
        checkCode($('#usercode').val());
    });

});

/* Check the code the user entered to see if they have a card */
function checkCode(code) {

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
	        alert("Sorry there is no card for you");
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
		$('#card-wrapper').animate({"height":"500px"}, 2000, function(){
			$('#message').fadeIn('slow');
		});
	});
}


























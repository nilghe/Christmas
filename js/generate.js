$(document).ready(function() {

    var template = $('#letter').html(); //grab the letter template

    /* For each card generate a template */
    $.getJSON("cards.json",
    function(data) {
        $.each(data.cards, function(i, item) {    
            $('body').append(template); //add the html of the letter template
        });

        /* Add the users code id for their card */
        $('.letter').each(function(i){
            $(this).find('.code').append(data.cards[i].id);
            $(this).find('.card-url-raw').append('?code=' + data.cards[i].id);
        });
    });

});
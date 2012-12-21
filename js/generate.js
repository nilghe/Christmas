$(document).ready(function() {

    var template = $('#letter').html();

    $.getJSON("cards.json",
    function(data) {
        $.each(data.cards, function(i, item) {    
            $('body').append(template);
        });

        $('.letter').each(function(i){
            $(this).find('.code').append(data.cards[i].id);
        });

    });

});
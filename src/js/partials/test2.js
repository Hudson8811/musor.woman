$(function() {

    var handle = $( "#slider-value" );
    $( "#slider" ).slider({
        create: function() {
            handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handle.text( ui.value );
            var scale = 1;
            handle.css('transform','scale('+scale+')')
        }
    });

});
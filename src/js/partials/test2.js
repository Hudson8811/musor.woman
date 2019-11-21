$(function() {


    $.getJSON('test2.json', function(data) {
        test2 = data.test;
        test2Count = test2.length;

        cur2 = 1;

        text = test2[0].text;
        min = parseInt(test2[0].min);
        max = parseInt(test2[0].max);
        step = parseInt(test2[0].step);
        correct = parseInt(test2[0].correct);
        ed = test2[0].ed;
        no = test2[0].no;
        yes = test2[0].yes;

        $('#test2 .vopros-block .vopros').html(text);
        sliderInit(min,max,step);
    });



    function sliderInit(min,max,step) {
        var value = $( "#slider-value" );
        var handle = $( "#custom-handle" );

        $( "#slider" ).slider({
            min: min,
            max: max,
            step: step,
            value: (max + min)/2,
            create: function() {
                value.text( numberWithSpaces($( this ).slider( "value" ))+' '+ed);
                var left = parseInt(handle[0].style.left);
                var scale = 0.3 + left/100;
                handle.css('transform','scale('+scale+')');
            },
            slide: function( event, ui ) {
                value.text( numberWithSpaces(ui.value) +' '+ed);
                var left = parseInt(handle[0].style.left);
                var scale = 0.3 + left/100;
                handle.css('transform','scale('+scale+')');
            }
        });
    }
    
    $('#test2 .ansver-btn').click(function () {
        $(this).hide();
        $( "#slider" ).slider( "disable" );
        if (cur2 < test2Count) {
            $('#test2 .next-vopros').css('display','flex')
        }

        var value = $( "#slider" ).slider("value");

        if ( value >= correct*0.85  && value  <= correct*1.15 ){
            $('#test2 .ansver-text').html(yes);
            $('#test2 .ansver-text').css('left',$("#custom-handle")[0].style.left);

        } else {
            $('#test2 .ansver-text').html(no);

            $( "#slider" ).slider( "value", correct );

            var handle = $( "#custom-handle" );
            var handle2 = $( "#custom-handle-2" );
            var left = handle[0].style.left;
            var scale = 0.3 + parseInt(left)/100;
            handle2.css('transform','scale('+scale+')');
            handle2.css('left',left);

            $( "#slider" ).slider( "value", value );

            $('#test2 .ansver-text').css('left',left);
            $('#custom-handle-2').show();
        }
        $('#test2 .ansver-text').show();
    });

    $('#test2 .next-vopros').click(function () {
        cur2++;
        $(this).hide();
        $('#test2 .ansver-text').hide();
        $('#test2 .ansver-btn').css('display','flex')
        $('#test2 .ansver div').removeClass('active');
        $('#test2 .ansver-text').hide();
        $('#custom-handle-2').hide();

        text = test2[cur2-1].text;
        min = parseInt(test2[cur2-1].min);
        max = parseInt(test2[cur2-1].max);
        step = parseInt(test2[cur2-1].step);
        correct = parseInt(test2[cur2-1].correct);
        ed = test2[cur2-1].ed;
        no = test2[cur2-1].no;
        yes = test2[cur2-1].yes;

        val = (max + min) / 2;

        $('#test2 .vopros-block .vopros').html(text);
        $( "#slider" ).slider( "enable" );
        $( "#slider" ).slider( "option", { min: min, max: max, step: step} );

        $( "#slider" ).slider( "value", val );

        var handle = $( "#custom-handle" );
        var left = parseInt(handle[0].style.left);
        var scale = 0.3 + left/100;
        handle.css('transform','scale('+scale+')');

        var value = $( "#slider-value" );
        console.log(val);
        value.text( numberWithSpaces($( "#slider" ).slider( "value" ))+' '+ed);
    });


    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

});


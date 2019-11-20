$(function() {

    $.getJSON('test3.json', function(data) {
        test3 = data.test;
        test3Count = test3.length;

        cur3 = 1;

        $('#test3 .vopros-block .vopros img').attr('src','img/'+test3[0].image+'.png');
        $('#test3 .vopros-block .vopros .label').html(test3[0].text);
        type = test3[0].type;
    });


    $('#draggable').draggable({ revert: "invalid" });

    $('#bin-1, #bin-2, #bin-3, #bin-4').droppable({
        drop: function() {
            var val = $(this).data('val');
            $('#test3 .vopros').hide();
            $('#test3 .ansver-block').css('display','flex');
            if (cur3 === test3Count){
                $('#test3 .next-vopros').hide();
            }
            if (val === type) {
                $(this).addClass('yes');
                $('#test3 .ansver .yes').addClass('active');
            } else {
                $('#test3 .bin[data-val="'+type+'"]').addClass('yes');
                $(this).addClass('no');
                $('#test3 .ansver .no').addClass('active');
            }
        },
    });

    $('#test3 .next-vopros').click(function () {
        cur3++;
        $('#test3 .vopros-block .vopros img').attr('src','img/'+test3[cur3-1].image+'.png');
        $('#test3 .vopros-block .vopros .label').html(test3[cur3-1].text);
        type = test3[cur3-1].type;
        $('#draggable').removeAttr('style').css('position','relative');
        $('#test3 .ansver-block').hide();
        $('#test3 .vopros').css('display','flex');
        $('#test3 .ansver .yes,#test3 .ansver .no').removeClass('active');
        $('#test3 .bin').removeClass('yes no');
    });


});
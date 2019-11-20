$(function() {

    $.getJSON('test1.json', function(data) {
        test1 = data.test;
        test1Count = test1.length;

        cur1 = 1;

        var i;
        var dots = '';
        for (i = 0; i < test1Count; i++) {
            dots += '<div class="dot"></div>';
        }
        $('#test1 .count-dots').html(dots);
        $('#test1 .count-dots .dot').eq(cur1-1).addClass('active');

        $('#test1 .vopros-block .vopros').html(test1[0].text);
        $('#test1 .otvet-block .otvet').html(test1[0].ansver);
        var mifs = test1[0].type;
        if (mifs == 'yes') {
            $('#test1 .otvet-block .img-block .true').addClass('active');
        } else {
            $('#test1 .otvet-block .img-block .lie').addClass('active');
        }
    });


    $('#test1 .vopros-block button').click(function () {
        if (test1Count == cur1){
            $('#test1 .otvet-block .next-vopros').hide();
        }
        $('#test1 .vopros-block').hide();
        $('#test1 .otvet-block').show();
    });

    $('#test1 .otvet-block .next-vopros').click(function () {
        cur1++;
        $('#test1 .otvet-block .img-block .true').removeClass('active');
        $('#test1 .otvet-block .img-block .lie').removeClass('active');
        $('#test1 .count-dots .dot').eq(cur1-1).addClass('active').siblings('.dot').removeClass('active');

        $('#test1 .vopros-block .vopros').html(test1[cur1-1].text);
        $('#test1 .otvet-block .otvet').html(test1[cur1-1].ansver);
        var mifs = test1[cur1-1].type;
        if (mifs == 'yes') {
            $('#test1 .otvet-block .img-block .true').addClass('active');
        } else {
            $('#test1 .otvet-block .img-block .lie').addClass('active');
        }
        $('#test1 .otvet-block').hide();
        $('#test1 .vopros-block').show();
    });

});
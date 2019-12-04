$(function() {

    function initCheck(){
        checked = 0;
        $('#opros .variants input').change(function() {
            if(this.checked) {
                $(this).addClass('checked');
                checked++;
            } else {
                $(this).removeClass('checked');
                checked--;
            }
            if (countAnsvers > 0){
                if (checked >= countAnsvers){
                    $('#opros .variants input:not(.checked),#opros .variants textarea:not(.checked)').prop( "disabled", true);
                } else{
                    $('#opros .variants input:not(.checked),#opros .variants textarea:not(.checked)').prop( "disabled", false );
                }
            }
        });
        $("#opros .variants textarea").bind("propertychange change click keyup input paste blur", function(event) {
            var val = $(this).val();

            if(val.length && !$(this).hasClass('checked')) {
                $(this).addClass('checked');
                checked++;
            } else if (!val.length && $(this).hasClass('checked')) {
                $(this).removeClass('checked');
                checked--;
            }
            if (countAnsvers > 0){
                if (checked >= countAnsvers){
                    $('#opros .variants input:not(.checked),#opros .variants textarea:not(.checked)').prop( "disabled", true);
                } else{
                    $('#opros .variants input:not(.checked),#opros .variants textarea:not(.checked)').prop( "disabled", false );
                }
            }
        });
    }

    $.getJSON('opros.json', function(data) {
        opros = data.test;
        oprosCount = opros.length;

        curo = 1;


        $('#opros .vopros').html(opros[0].text);
        countAnsvers = opros[0].count;
        var ansvers = opros[0].ansvers;
        $.each(ansvers, function( index, value ) {
            if (value != 'open' && value != 'other'){
                $('#opros .variants').append('<div><label class="checkbox"><input type="checkbox" name="opros'+value+'[]" value="'+value+'"><span>'+value+'</span></label></div>');
            } else {
                $('#opros .variants').append('<div><textarea name="opros'+value+'[]" class="'+value+'" placeholder="другое (вписать)"></textarea></div>');
            }
        });

        initCheck();

    });



    oprosResults =[];

    $('#opros .next-vopros').click(function () {
        var push = [];
        $('#opros .variants .checked').each(function () {
            var val = $(this).val();
            push.push(val);
        });
        if (push.length){
            oprosResults.push(push);
            if (oprosCount == curo){
                $('#opros .next-vopros').hide();
                $('#opros .vopros').hide();
                $('#opros .variants').hide();
                $('#opros .thanks').show();

                var resultSend = JSON.stringify( oprosResults );
                $.ajax({
                    type: "POST",
                    url: "/save_quests/",
                    data: resultSend,
                    success: function(data) {
                        //some code
                    }
                });

            } else {
                curo++;
                $('#opros .variants').html('');
                $('#opros .vopros').html(opros[curo-1].text);
                countAnsvers = opros[curo-1].count;
                var ansvers = opros[curo-1].ansvers;
                $.each(ansvers, function( index, value ) {
                    if (value != 'open' && value != 'other'){
                        $('#opros .variants').append('<div><label class="checkbox"><input type="checkbox" name="opros'+index+'[]" value="'+value+'"><span>'+value+'</span></label></div>');
                    } else {
                        $('#opros .variants').append('<div><textarea name="opros'+index+'[]" class="'+value+'" placeholder="другое (вписать)"></textarea></div>');
                    }
                });

                initCheck();
            }
        }

    });

});
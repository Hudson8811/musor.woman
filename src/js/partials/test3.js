$(function() {

    $('#draggable').draggable({ revert: "invalid" });

    $('#bin-1, #bin-2, #bin-3, #bin-4').droppable({
        drop: function() {
            var val = $(this).data('val');
            console.log(val);
        },
    });

});
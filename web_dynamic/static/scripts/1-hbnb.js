#!/usr/bin/node

document.addEventListener("DOMContentLoaded", function(){
    var checked_amn = {};
    $('div.amenities > h4').css({"text-overflow":"ellipsis", "white-space":"nowrap", "overflow":"hidden"});
    $("input[type=checkbox]").click( function() {
        if ($(this).prop("checked")){
            checked_amn[$(this).attr('data-name')] = $(this).attr('data-id')
            $('div.amenities > h4').html('&nbsp;');
            let i = 0;
            $.each(checked_amn, function(key, value){
                if (i === 0)
                    $('div.amenities > h4').append(key);
                else
                    $('div.amenities > h4').append(', ' + key);
                i += 1;
            });
        } else {
            delete checked_amn[$(this).attr('data-name')];
            $('div.amenities > h4').html('&nbsp;');
            let i = 0;
            $.each(checked_amn, function(key, value){
                if (i === 0) {
                    $('div.amenities > h4').append(key);
                } else {
                    $('div.amenities > h4').append(', ' + key);
                }
                i += 1;
            });
        }
    });
});

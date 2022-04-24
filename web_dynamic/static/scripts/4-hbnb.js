#!/usr/bin/node

document.addEventListener("DOMContentLoaded", function(){
    var checked_amn = [];
    $('div.amenities > h4').css({"text-overflow":"ellipsis", "white-space":"nowrap", "overflow":"hidden"});

    const url_search = "http://0.0.0.0:5001/api/v1/places_search";
    let query_dict;
    if (checked_amn.length > 0) {
        query_dict = JSON.stringify({"amenities": checked_amn});
    } else {
        query_dict = JSON.stringify({});
    }
    console.log(query_dict);
    $.ajax({
        type: "POST",
        url: url_search,
        data: query_dict,
        dataType: "json",
        contentType: "application/json",
        success: function(place) {
            for (let i = 0; i < place.length; i++) {
                place_markup = '<ARTICLE><DIV class="headline"><H2>' + (place[i]).name + '</H2><DIV class="price_by_night">$' + (place[i]).price_by_night + '</DIV></DIV><DIV class="information"><DIV class="max_guest"><DIV class="guest_icon"></DIV><P>' + (place[i]).max_guest + 'Guest</P></DIV><DIV class="number_rooms"><DIV class="bed_icon"></DIV><P>' + (place[i]).number_rooms + 'Room</P></DIV><DIV class="number_bathrooms"><DIV class="bath_icon"></DIV><P>' + (place[i]).number_bathrooms + 'Bathroom</P></DIV></DIV><DIV class="description">' + ((place[i]).description).replace("<BR /><BR />", "\n") + '</DIV></ARTICLE>'
            $("section.places").append(place_markup);
            }
        }
    });

    $("input[type=checkbox]").click( function() {
        if ($(this).prop("checked")){
            checked_amn.push($(this).attr('data-name'))
            $('div.amenities > h4').html('&nbsp;');
            let i = 0;
            $.each(checked_amn, function(index, value){
                if (i === 0)
                    $('div.amenities > h4').append(value);
                else
                    $('div.amenities > h4').append(', ' + value);
                i += 1;
            });
        } else {
            let index_of = checked_amn.indexOf($(this).attr('data-name'));
            checked_amn.splice(index_of, 1);
            $('div.amenities > h4').html('&nbsp;');
            let i = 0;
            $.each(checked_amn, function(index, value){
                if (i === 0) {
                    $('div.amenities > h4').append(value);
                } else {
                    $('div.amenities > h4').append(', ' + value);
                }
                i += 1;
            });
        }
    });
    const url_status = "http://0.0.0.0:5001/api/v1/status/";
    $.get(url_status, function(data, textStatus, jqXHR) {
        if (data.status === "OK") {
            $("div#api_status").addClass("available");
        }
    });
    $("button").on("click", function (event) {
        const url_search = "http://0.0.0.0:5001/api/v1/places_search";
        let query_dict;
        if (checked_amn.length > 0) {
            query_dict = JSON.stringify({"amenities": checked_amn});
        } else {
            query_dict = JSON.stringify({});
        }
        $("section.places").html("<h1>Places</>");
        $.ajax({
            type: "POST",
            url: url_search,
            data: query_dict,
            dataType: "json",
            contentType: "application/json",
            success: function(place) {
                for (let i = 0; i < place.length; i++) {
                    place_markup = '<ARTICLE><DIV class="headline"><H2>' + (place[i]).name + '</H2><DIV class="price_by_night">$' + (place[i]).price_by_night + '</DIV></DIV><DIV class="information"><DIV class="max_guest"><DIV class="guest_icon"></DIV><P>' + (place[i]).max_guest + 'Guest</P></DIV><DIV class="number_rooms"><DIV class="bed_icon"></DIV><P>' + (place[i]).number_rooms + 'Room</P></DIV><DIV class="number_bathrooms"><DIV class="bath_icon"></DIV><P>' + (place[i]).number_bathrooms + 'Bathroom</P></DIV></DIV><DIV class="description">' + ((place[i]).description).replace("<BR /><BR />", "\n") + '</DIV></ARTICLE>'
                $("section.places").append(place_markup);
                }
            }
        });
    })
});

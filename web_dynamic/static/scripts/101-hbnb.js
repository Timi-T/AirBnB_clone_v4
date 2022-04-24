#!/usr/bin/node

$(document).ready(function(){
    var checked_amn = [];
    var checked_st = [];
    var checked_ct = [];
    var checked_st_ct = [];
    $('div.amenities > h4').css({"text-overflow":"ellipsis", "white-space":"nowrap", "overflow":"hidden"});
    $('div.locations > h4').css({"text-overflow":"ellipsis", "white-space":"nowrap", "overflow":"hidden"});

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
                place_markup = '<ARTICLE><DIV class="headline"><H2>' + (place[i]).name + '</H2><DIV class="price_by_night">$' + (place[i]).price_by_night + '</DIV></DIV><DIV class="information"><DIV class="max_guest"><DIV class="guest_icon"></DIV><P>' + (place[i]).max_guest + 'Guest</P></DIV><DIV class="number_rooms"><DIV class="bed_icon"></DIV><P>' + (place[i]).number_rooms + 'Room</P></DIV><DIV class="number_bathrooms"><DIV class="bath_icon"></DIV><P>' + (place[i]).number_bathrooms + 'Bathroom</P></DIV></DIV><DIV class="description">' + ((place[i]).description).replace("<BR /><BR />", "\n") + '</DIV><DIV class="reviews"><H2 class="rev_title">Reviews <span class="show_revs" id="' + (place[i]).id + '">show...</span></H2><UL class="rev_list"></UL></DIV></ARTICLE>'
            $("section.places").append(place_markup);
            }
        }
    });

    $("input[id=amenities]").click( function() {
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

    $("input[id=states]").click( function() {
        if ($(this).prop("checked")){
            checked_st.push($(this).attr('data-id'));
            checked_st_ct.push($(this).attr('data-name'));
            $('div.locations > h4').html('&nbsp;');
            let i = 0;
            $.each(checked_st_ct, function(index, value){
                if (i === 0)
                    $('div.locations > h4').append(value);
                else
                    $('div.locations > h4').append(', ' + value);
                i += 1;
            });
        } else {
            let index_of = checked_st.indexOf($(this).attr('data-id'));
            checked_st.splice(index_of, 1);
            let index_of_st_ct = checked_st_ct.indexOf($(this).attr('data-name'));
            checked_st_ct.splice(index_of_st_ct, 1);
            $('div.locations > h4').html('&nbsp;');
            let i = 0;
            $.each(checked_st_ct, function(index, value){
                if (i === 0) {
                    $('div.locations > h4').append(value);
                } else {
                    $('div.locations > h4').append(', ' + value);
                }
                i += 1;
            });
        }
    });

    $("input[id=cities]").click( function() {
        if ($(this).prop("checked")){
            checked_ct.push($(this).attr('data-id'));
            checked_st_ct.push($(this).attr('data-name'));
            $('div.locations > h4').html('&nbsp;');
            let i = 0;
            $.each(checked_st_ct, function(index, value){
                if (i === 0)
                    $('div.locations > h4').append(value);
                else
                    $('div.locations > h4').append(', ' + value);
                i += 1;
            });
        } else {
            let index_of = checked_ct.indexOf($(this).attr('data-id'));
            checked_ct.splice(index_of, 1);
            let index_of_st_ct = checked_st_ct.indexOf($(this).attr('data-name'));
            checked_st_ct.splice(index_of_st_ct, 1);
            $('div.locations > h4').html('&nbsp;');
            let i = 0;
            $.each(checked_st_ct, function(index, value){
                if (i === 0) {
                    $('div.locations > h4').append(value);
                } else {
                    $('div.locations > h4').append(', ' + value);
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
        let query_dict = {};
        if (checked_st.length > 0) {
            query_dict['states'] = checked_st;
        }
        if (checked_ct.length > 0) {
            query_dict['cities'] = checked_ct;
        }
        if (checked_amn.length > 0) {
            query_dict['amenities'] = checked_amn;
        }
        query_dict = JSON.stringify(query_dict);
        $("section.places").html("<h1>Places</h1>");
        $.ajax({
            type: "POST",
            url: url_search,
            data: query_dict,
            dataType: "json",
            contentType: "application/json",
            success: function(place) {
                for (let i = 0; i < place.length; i++) {
                    var place_markup = '<ARTICLE><DIV class="headline"><H2>' + (place[i]).name + '</H2><DIV class="price_by_night">$' + (place[i]).price_by_night + '</DIV></DIV><DIV class="information"><DIV class="max_guest"><DIV class="guest_icon"></DIV><P>' + (place[i]).max_guest + 'Guest</P></DIV><DIV class="number_rooms"><DIV class="bed_icon"></DIV><P>' + (place[i]).number_rooms + 'Room</P></DIV><DIV class="number_bathrooms"><DIV class="bath_icon"></DIV><P>' + (place[i]).number_bathrooms + 'Bathroom</P></DIV></DIV><DIV class="description">' + ((place[i]).description).replace("<BR /><BR />", "\n") + '</DIV><DIV class="reviews"><H2 class="rev_title">Reviews <span class="show_revs" id="' + (place[i]).id + '">show...</span></H2><UL class="rev_list">'
                    
                    rev_url = "http://0.0.0.0:5001/api/v1/places/";
                    rev_url += (place[i]).id + "/reviews";
                    $.get(rev_url, function(review, textStatus, jqXHR) {
                        for (let j = 0; j < review.length; j++) {
                            place_markup += '<li><p>' + (review[j]).text + '</p></li>';
                        }
                        place_markup += '</UL></DIV></ARTICLE>';
                        console.log(place_markup);
                        $("section.places").append(place_markup);
                    });
                    //place_markup += '</UL></DIV></ARTICLE>';
                    //$("section.places").append(place_markup);
                }
            }
        });
    });
});


$(".container").on("load", function() {
    $("span").on("click", function (event) {
        console.log("Review!!!");
    });
});

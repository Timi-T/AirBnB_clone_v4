$(document).ready(function () {
  /* function for POST request  and create an article tag representing a Place in the section.places */
  function post (data) {
    $('SECTION.places').empty();
    $('SECTION.places').append('<h1>Places</h1>');
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: data,
      datatype: 'json',
      contentType: 'application/json',
      success: function (data) {
        data.forEach(function (place) {
          const template = '<article> <div class="headline"> <h2>' + place.name + '</h2> ' +
           '<div class="price_by_night">$' + place.price_by_night + '</div>' + '</div>' + '<div class="information">' +
           '<div class="max_guest"> <div class="guest_icon"></div>' + '<p>' + place.max_guest + ' Guest</p>' + '</div>' +
           '<div class="number_rooms"> <div class="bed_icon"></div>' + '<p>' + place.number_rooms + ' Room</p>' + '</div>' +
           '<div class="number_bathrooms"> <div class="bath_icon"></div>' + '<p>' + place.number_bathrooms +
           ' Bathroom</p> </div> </div>' + '<div class="description">' + place.description + '</div>' + '</article>';
          $('SECTION.places').append(template);
        });
        if (data.length === 0) {
          $('SECTION.places').empty();
          $('SECTION.places').append('<h1>Places</h1>');
          $('SECTION.places').append('<h2>Oops! No Places Found. Kindly adjust your search.</h2>');
          $('.places > h2').css('color', 'red');
        }
      }
    });
  }

  let checked = [];
  let checkedIDs = [];
  /* CHECKBOX INTERACTION */
  /* Works for checkboxes only in the amenities class */
  $('input[type=checkbox]', '.amenities').change(
    function () {
      if (this.checked) {
        checked.push(($(this).attr('data-name')));
        checkedIDs.push(($(this).attr('data-id')));
      } else {
        checked = checked.filter(id => id !== $(this).attr('data-name'));
        checkedIDs = checkedIDs.filter(id => id !== $(this).attr('data-id'));
      }
      /* UPDATE H4 TAG INSIDE DIV Amenities WITH LIST OF Amenities CHECKED */
      /* append all amenity names in list to empty string */
      console.log(checkedIDs);
      let names = '';
      checked.forEach(function (name, idx, array) {
        if (idx === array.length - 1) {
          names += name;
        } else {
          names += name + ', ';
        }
      });
      /* if string is empty replace text with blankspace else replace text in h4 with amenity names */
      if (names === '') {
        $('.amenities > h4').html('&nbsp;');
      } else {
        $('.amenities > h4').text(names);
      }
    });

  /* TURNS CIRCLE COLOR TO RED IF URL (API) GET REQUEST IS SUCCESSFUL ELSE GREY */
  $.get('http://0.0.0.0:5001/api/v1/status/')
    .done(function (data, status) {
      $('div#api_status').addClass('available');
    })
    .fail(function () {
      $('div#api_status').removeClass('available');
    });

  /* LOAD PLACES FROM THE API */
  post('{}');

  /* LOAD PLACES WITH SELECTED AMENTIES WHEN THE SEARCH BUTTON IS CLICKED */
  $('button').click(function () {
    post(JSON.stringify({ amenities: checkedIDs }));
    console.log(JSON.stringify({ amenities: checkedIDs }));
  });
});

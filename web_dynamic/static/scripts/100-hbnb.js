$(document).ready(function () {
  /* FUNCTION: MAKES POST REQUEST AND CREATES AN ARTICLE REPRESENTING
  A PLACE IN section.places */
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
        console.log(data);
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

  /* FUNCTION: UPDATES TAG WITH GIVEN LIST OF NAMES */
  function updateTag (list, tag) {
    /* append all strings in list to empty string */
    let names = '';
    list.forEach(function (name, idx, array) {
      if (idx === array.length - 1) {
        names += name;
      } else {
        names += name + ', ';
      }
    });
    /* if string is empty replace text with blankspace
    else replace text in given tag with names */
    if (names === '') {
      $(tag).html('&nbsp;');
    } else {
      $(tag).text(names);
    }
  }

  /* CHECKBOX INTERACTION */
  let amenityNames = [];
  let locations = [];
  const filter = { states: [], cities: [], amenities: [] };

  /* checkboxes for states */
  $('.states > input[type=checkbox]').change(
    function () {
      if (this.checked) {
        locations.push(($(this).attr('data-name')));
        filter.states.push(($(this).attr('data-id')));
        console.log(locations);
      } else {
        locations = locations.filter(id => id !== $(this).attr('data-name'));
        filter.states = filter.states.filter(id => id !== $(this).attr('data-id'));
        console.log(locations);
      }
      updateTag(locations, '.locations > h4');
    });

  /* checkboxes for cities */
  $('.cities > input[type=checkbox]').change(
    function () {
      if (this.checked) {
        locations.push(($(this).attr('data-name')));
        filter.cities.push(($(this).attr('data-id')));
        console.log(locations);
      } else {
        locations = locations.filter(id => id !== $(this).attr('data-name'));
        filter.cities = filter.cities.filter(id => id !== $(this).attr('data-id'));
        console.log(locations);
      }
      updateTag(locations, '.locations > h4');
    });

  /* checkboxes for  amenities */
  $('input[type=checkbox]', '.amenities').change(
    function () {
      if (this.checked) {
        amenityNames.push(($(this).attr('data-name')));
        filter.amenities.push(($(this).attr('data-id')));
      } else {
        amenityNames = amenityNames.filter(id => id !== $(this).attr('data-name'));
        filter.amenities = filter.amenities.filter(id => id !== $(this).attr('data-id'));
      }
      updateTag(amenityNames, '.amenities > h4');
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

  /* LOAD PLACES WITH SELECTED FILTERS WHEN THE SEARCH BUTTON IS CLICKED */
  $('button').click(function () {
    post(JSON.stringify(filter));
    console.log(filter);
  });
});

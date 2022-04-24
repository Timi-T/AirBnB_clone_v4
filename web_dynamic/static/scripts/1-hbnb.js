$(document).ready(function () {
  let checked = [];
  /* Works for checkboxes only in the amenities class */
  $('input[type=checkbox]', '.amenities').change(
    function () {
      if (this.checked) {
        checked.push(($(this).attr('data-name')));
        console.log(checked);
      } else {
        checked = checked.filter(id => id !== $(this).attr('data-name'));
        console.log(checked);
      }
      /* append all names in list to empty string */
      let names = '';
      checked.forEach(function (name, idx, array) {
        if (idx === array.length - 1) {
          names += name;
        } else {
          names += name + ', ';
        }
      });
      /* if string is empty replace text with blankspace else replace text in h4 */
      if (names === '') {
        $('.amenities > h4').html('&nbsp;');
      } else {
        $('.amenities > h4').text(names);
      }
    });
});

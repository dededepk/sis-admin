"use strict";

$(document).ready(function(){

  // SHOW-HIDE PASSWORD
  $(".toggle-password").click(function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});
// END SHOW-HIDE PASSWORD

// floating label
$('.field__input').on('input', function() {
  var $field = $(this).closest('.field-floating-label');
  if (this.value) {
    $field.addClass('field--not-empty');
  } else {
    $field.removeClass('field--not-empty');
  }
});

// End floating label

// Select2

// $(".select2").select2({
//   theme: 'bootstrap4',
// });
//
// $(".select2-multiple").select2({
//   theme: 'bootstrap4',
// });

// End select2

// $("#show-resumen").click(function() {
//   $("#content-sorteo").hide();
//   $("#content-resumen").show();
// });

// $("#show-sorteo").click(function() {
//   $("#content-sorteo").show();
//   $("#content-resumen").hide();
// });

});
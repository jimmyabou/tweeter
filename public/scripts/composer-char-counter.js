
//counts the characters in the text area input 
// returns the remainig characters 
// turns the counter color to red if input exceeds 140
$(document).ready(function () {
  const tweet = $('#tweet-text');
  tweet.on('input', function (event) {
    let $input=$(this);
    let input = $(this).val();
    let length = input.length;
    const $form=$input.closest('form');
    const $label=$form.find('.counter');
    // let $label = $('.counter');
    let remainder = 140 - length;
    $label.text(remainder);
    if (remainder < 0) {
      // $label.css({ 'color': 'red' });
      $label.addClass('form-red');
    } else {
      $label.removeClass('form-red');
    }
  });

});

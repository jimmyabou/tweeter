
$(document).ready(function() {
  const tweet=$('#tweet-text');
  
  console.log("loaded");
  // tweet.on('keyup',function(e){
  //   let buttonValue = tweet.val();
  //   console.log('Key up event:', buttonValue.length);
  // });
  tweet.on('input', function(event) {
    let input = $(this).val();
    let value=input.length;
    // console.log('Key up event:', value);
    // let label = $(this).find('output');
    
    let label =$('.counter');
    let result=140-value;
    label.text(result);
    if (result < 0) {
      label.css({'color':'red'});
    } else {
      label.css({'color': ''}); 
    }
    // console.log('sibling:', label);
  });
  // tweet.on('keydown', function(event) {
  //   console.log('Key down event:', event.key);
  // });
  // tweet.on('change',function(e){
  //   console.log('Key up event:', e.key);
  // });
  // tweet.on('input', function(event) {
  //   console.log('Key press event:', event.key);
  // });
  
  // tweet.on('blur', function(event) {
  //   console.log('Key down event:', event.key);
  // });

});

// const inputElement = document.getElementsByTagName('textarea')[0];

// inputElement.addEventListener('keyup', function(event) {
//   console.log('Key up event:', event.key);
// });

// inputElement.addEventListener('keypress', function(event) {
//   console.log('Key press event:', event.key);
// });

// inputElement.addEventListener('keydown', function(event) {
//   console.log('Key down event:', event.key);
// });
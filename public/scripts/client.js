/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];


// const markup = `
// <article class="tweet">
// <header>
//   <div class="person">
//     <img src="${object.user.avatar}">
//     <p>${object.user.name}</p>
//   </div>
//   <div>
//     <p>"${object.user.handle}"</p>
//   </div>
// </header>

// <div class="content">
//   <p>
//   ${object.content.text}
//   </p>
// </div>

// <footer>
//   <div>${object.created_at}</div>
//   <div>
//     <i class="fa-solid fa-flag"></i>
//     <i class="fa-solid fa-retweet"></i>
//     <i class="fa-solid fa-heart"></i>
//   </div>

// </footer>
// </article>
// `;

const renderTweets = function (tweets) {
  // loops through tweets
  for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    $('#section').prepend(createTweetElement(tweet));
    // takes return value and appends it to the tweets container
  }

};
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const error=function(error){
  const $error=$(`<section id="error">
  <i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>
  <div>${error}</div>
  <i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>
</section>`);
return $error;

}

const createTweetElement = function (object) {
  let time = timeago.format(object.created_at);

  let $tweet = $(`
  <article class="tweet">
  <header>
    <div class="person">
      <img src="${object.user.avatars}">
      <p>${object.user.name}</p>
    </div>
    <div>
      <p>${object.user.handle}</p>
    </div>
  </header>
  
  <div class="content">
    <p>
    ${escape(object.content.text)}
    </p>
  </div>
  
  <footer>
    <div>${time}</div>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  
  </footer>
  </article>
  `);
  // ...
  // console.log($tweet);
  return $tweet;
};
$(document).ready(function () {

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (data) {
        console.log('Success: ', data);
        renderTweets(data);;
      });
  }
  // renderTweets(data); 

  // $('#form-tweet').submit(function(event) {
  //   event.preventDefault();
  $("#form-tweet").on("submit", function (event) {
    //  alert( "Handler for `submit` called." );
    event.preventDefault();
    const inputLength = $("#tweet-text").val().length;
    $('#tweets-container').find('#error').remove();
    // console.log(input);
    if (inputLength === 0) {
      
      const text="No Input"
      $('#tweets-container').prepend(error(text));
      // alert("No Input");
    }
    else if (inputLength > 140){
      const text=" Input exceeds length"
      $('#tweets-container').prepend(error(text));
      // alert(" Input exceeds length");
    } else {
      // $('#tweet-text').text();
      const data = $('form').serialize();
      
      // data.text();
      console.log(data);
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: data
      }).then(function(){
        loadTweets();
        $('#tweet-text').val('');
      }
      )
     
    }
  });


  
}
);

// url: 'https://example.com/api/endpoint'
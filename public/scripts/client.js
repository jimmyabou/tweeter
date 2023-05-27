
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const error = function (error) {
  const $error = $(`<section id="error">
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
  return $tweet;
};

$(document).ready(function () {
  const $container=$('#section').empty();
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      $container.prepend(createTweetElement(tweet));
    }

  };
  //toggle menu
  $('#form-tweet').hide();
  $('#toggleIcon').click(function() {
    $('#form-tweet').toggle();
  });
  
  //toggle menu
  function loadTweets() {
    $.get('/tweets')
      .then(function (data) {
        
        renderTweets(data);
      });
  }

  $("#form-tweet").on("submit", function (event) {
    event.preventDefault();
    const inputLength = $("#tweet-text").val().length;
    $('#tweets-container').find('#error').remove();
    if (inputLength === 0) {
      const text = "No Input"
      $('#tweets-container').prepend(error(text));
    }
    else if (inputLength > 140) {
      const text = " Input exceeds length"
      $('#tweets-container').prepend(error(text));
    } else {
      const data = $('form').serialize();

      console.log(data);
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: data
      }).then(function () {
        $('output').html('140');
        $('#section').empty();
        $('#tweet-text').val('');
        loadTweets();
        

      })
    }
  });
  loadTweets();
});

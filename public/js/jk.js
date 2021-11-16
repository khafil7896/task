window.onload = function () {
    animateSequence();
    animateRandom();
  };

  function animateSequence() {
    var a = document.getElementsByClassName('sequence');
    for (var i = 0; i < a.length; i++) {
      var $this = a[i];
      var letter = $this.innerHTML;
      letter = letter.trim();
      var str = '';
      var delay = 100;
      for (l = 0; l < letter.length; l++) {
        if (letter[l] != ' ') {
          str += '<span style="animation-delay:' + delay + 'ms; -moz-animation-delay:' + delay + 'ms; -webkit-animation-delay:' + delay + 'ms; ">' + letter[l] + '</span>';
          delay += 150;
        } else
          str += letter[l];
      }
      $this.innerHTML = str;
    }
  }
  function animateRandom() {
    var a = document.getElementsByClassName('random');
    for (var i = 0; i < a.length; i++) {
      var $this = a[i];
      var letter = $this.innerHTML;
      letter = letter.trim();
      var delay = 70;
      var delayArray = new Array;
      var randLetter = new Array;
      for (j = 0; j < letter.length; j++) {
        while (1) {
          var random = getRandomInt(0, (letter.length - 1));
          if (delayArray.indexOf(random) == -1)
            break;
        }
        delayArray[j] = random;
      }
      for (l = 0; l < delayArray.length; l++) {
        var str = '';
        var index = delayArray[l];
        if (letter[index] != ' ') {
          str = '<span style="animation-delay:' + delay + 'ms; -moz-animation-delay:' + delay + 'ms; -webkit-animation-delay:' + delay + 'ms; ">' + letter[index] + '</span>';
          randLetter[index] = str;
        } else
          randLetter[index] = letter[index];
        delay += 80;
      }
      randLetter = randLetter.join("");
      $this.innerHTML = randLetter;
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  // Center sidebar vertically in window
  var el_height = $('.social-share').height();
  $('.social-share').css('margin-top', - ( el_height / 2 ));
  
  // Trigger hide button event
  $('.social-share li.hide-button a').click(function(){
    $('.social-share').toggleClass('hidden');
  });
  
  // Get Facebook share count
  $.get(
    'https://graph.facebook.com/?id=' + share_url,
    function (msg) {
      $('.facebook a span').text(msg.shares);
    }, 
    'jsonp'
  );
  
  // Get Twitter share count
  $.get(
    'https://cdn.api.twitter.com/1/urls/count.json?url=' + share_url,
    function (msg) {
      $('.twitter a span').text(msg.count);
    }, 
    'jsonp'
  );
  
  // Get Pinterest share count
  $.get(
    'https://api.pinterest.com/v1/urls/count.json?url=' + share_url,
    function (msg) {
      $('.pinterest a span').text(msg.count);
    }, 
    'jsonp'
  );
  
  // Get LinkedIn share count
  $.get(
    'https://www.linkedin.com/countserv/count/share?url=' + share_url,
    function (msg) {
      $('.linkedin a span').text(msg.count);
    }, 
    'jsonp'
  );
  
  // Get Google+ share count
  
  



  


  
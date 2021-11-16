$(document).ready(function () {
  const accessToken = "2d1ddeaadc20462dba88c9beebbe0a21";
  const baseUrl = "https://api.api.ai/api/query?v=20150910";
  const sessionId = "1";
  const loader = `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`;
  const errorMessage = "My apologies, I'm not available at the moment. =^.^=";
  const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  const loadingDelay = 700;
  const aiReplyDelay = 1800;

  const $document = document;
  const $chatbot = $document.querySelector(".chatbot");
  const $chatbotMessageWindow = $document.querySelector(
    ".chatbot__message-window");

  const $chatbotHeader = $document.querySelector(".chatbot__header");
  const $chatbotMessages = $document.querySelector(".chatbot__messages");
  const $chatbotInput = $document.querySelector(".chatbot__input");
  const $chatbotSubmit = $document.querySelector(".chatbot__submit");

  document.addEventListener(
    "keypress",
    event => {
      if (event.which == 13) {
        validateMessage();
      }
    },
    false);


  $chatbotHeader.addEventListener(
    "click",
    () => {
      // toggle($chatbot, "chatbot--closed");
      // $chatbotInput.focus();
      var element = document.getElementsByClassName("chatbot");
      element[0].style.display = "none";
      document.getElementById("chat-circle").style.display = "block";
    },
    false);


  $chatbotSubmit.addEventListener(
    "click",
    () => {
      validateMessage();
    },
    false);

  document.getElementById("chat-circle").addEventListener(
    "click",
    () => {
      var element = document.getElementsByClassName("chatbot");
      element[0].classList.remove("chatbot--closed");
      element[0].style.display = "block";
      $chatbotInput.focus();
      console.log(this);
      document.getElementById("chat-circle").style.display = "none";

    });

  const toggle = (element, klass) => {
    const classes = element.className.match(/\S+/g) || [],
      index = classes.indexOf(klass);
    index >= 0 ? classes.splice(index, 1) : classes.push(klass);
    element.className = classes.join(" ");
  };

  const userMessage = content => {
    $chatbotMessages.innerHTML += `<li class='is-user animation'>
<p class='chatbot__message'>
${content}
</p>
<span class='chatbot__arrow chatbot__arrow--right'></span>
</li>`;
  };

  const aiMessage = (content, isLoading = false, delay = 0) => {
    setTimeout(() => {
      removeLoader();
      $chatbotMessages.innerHTML += `<li 
class='is-ai animation' 
id='${isLoading ? "is-loading" : ""}'>
<div class="is-ai__profile-picture">
<svg class="icon-avatar" viewBox="0 0 32 32">
<use xlink:href="#avatar" />
</svg>
</div>
<span class='chatbot__arrow chatbot__arrow--left'></span>
<div class='chatbot__message'>
${content}
</div>
</li>`;
      scrollDown();
    }, delay);
  };

  const removeLoader = () => {
    let loadingElem = document.getElementById("is-loading");
    if (loadingElem) {
      $chatbotMessages.removeChild(loadingElem);
    }
  };

  const escapeScript = unsafe => {
    const safeString = unsafe.
      replace(/</g, " ").
      replace(/>/g, " ").
      replace(/&/g, " ").
      replace(/"/g, " ").
      replace(/\\/, " ").
      replace(/\s+/g, " ");
    return safeString.trim();
  };

  const linkify = inputText => {
    return inputText.replace(urlPattern, `<a href='$1' target='_blank'>$1</a>`);
  };

  const validateMessage = () => {
    const text = $chatbotInput.value;
    const safeText = text ? escapeScript(text) : "";
    if (safeText.length && safeText !== " ") {
      resetInputField();
      userMessage(safeText);
      send(safeText);
    }
    scrollDown();
    return;
  };

  const multiChoiceAnswer = text => {
    const decodedText = text.replace(/zzz/g, "'");
    userMessage(decodedText);
    send(decodedText);
    scrollDown();
    return;
  };

  const processResponse = val => {
    removeLoader();

    if (val.fulfillment) {
      let output = "";
      let messagesLength = val.fulfillment.messages.length;

      for (let i = 0; i < messagesLength; i++) {
        if (window.CP.shouldStopExecution(0)) break;
        let message = val.fulfillment.messages[i];
        let type = message.type;

        switch (type) {
          // 0 fulfillment is text
          case 0:
            let parsedText = linkify(message.speech);
            output += `<p>${parsedText}</p>`;
            break;

          // 1 fulfillment is card
          case 1:
            // let imageUrl = message.imageUrl
            // let imageTitle = message.title
            // let imageSubtitle = message.subtitle
            // output += `<img src='${imageUrl}' alt='${imageTitle}${imageSubtitle}' />`
            break;

          // 2 fulfillment is button list
          case 2:
            let title = message.title;
            let replies = message.replies;
            let repliesLength = replies.length;
            output += `<p>${title}</p>`;

            for (let i = 0; i < repliesLength; i++) {
              if (window.CP.shouldStopExecution(1)) break;
              let reply = replies[i];
              let encodedText = reply.replace(/'/g, "zzz");
              output += `<button onclick='multiChoiceAnswer("${encodedText}")'>${reply}</button>`;
            } window.CP.exitedLoop(1);

            break;

          // 3 fulfillment is image
          case 3:
            // console.log('Fulfillment is image - TODO')
            break;
        }

      } window.CP.exitedLoop(0);

      return output;
    } else {
      return val;
    }
  };

  const setResponse = (val, delay = 0) => {
    setTimeout(() => {
      aiMessage(processResponse(val));
    }, delay);
  };

  const resetInputField = () => {
    $chatbotInput.value = "";
  };

  const scrollDown = () => {
    const distanceToScroll =
      $chatbotMessageWindow.scrollHeight - (
        $chatbotMessages.lastChild.offsetHeight + 60);
    $chatbotMessageWindow.scrollTop = distanceToScroll;
    return false;
  };

  const send = (text = "") => {
    fetch(`${baseUrl}&query=${text}&lang=en&sessionId=${sessionId}`, {
      method: "GET",
      dataType: "json",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json; charset=utf-8"
      }
    }).


      then(response => response.json()).
      then(res => {
        if (res.status < 200 || res.status >= 300) {
          let error = new Error(res.statusText);
          throw error;
        }
        return res;
      }).
      then(res => {
        setResponse(res.result, loadingDelay + aiReplyDelay);
      }).
      catch(error => {
        setResponse(errorMessage, loadingDelay + aiReplyDelay);
        resetInputField();
        console.log(error);
      });

    aiMessage(loader, true, loadingDelay);
  };

  //aos//
  AOS.init();
  //cluod

  // back to top
  (function ($) {
    $.getQuery = function (query) {

    };
  })(jQuery);
  $(function () {
    // Change URIs\
    // Set theme based on URI
    if ($.getQuery('theme') === 'image') {
      $(function () {
        $.scrollUp({
          animation: 'fade',
          activeOverlay: '#00FFFF',
          scrollImg: {
            active: true,
            type: 'background',
            src: 'img/top.png'
          }
        });
      });
    } else {
      $(function () {
        $.scrollUp({
        });
      });
    }
    // Toggle overlay
  });

  //letter jump
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
  //scroll
  jQuery(function ($) {
    // Function which adds the 'animated' class to any '.animatable' in view
    var doAnimations = function () {
      // Calc current offset and get all animatables
      var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $(".animatable");
      // Unbind scroll handler if we have no animatables
      if ($animatables.length == 0) {
        $(window).off("scroll", doAnimations);
      }
      // Check all animatables and animate them if necessary
      $animatables.each(function (i) {
        var $animatable = $(this);
        if ($animatable.offset().top + $animatable.height() - 20 < offset) {
          $animatable.removeClass("animatable").addClass("animated");
        }
      });
    };
    // Hook doAnimations on scroll, and trigger a scroll
    $(window).on("scroll", doAnimations);
    $(window).trigger("scroll");
  });



  // Gets the video src from the data-src on each button

  var $videoSrc;
  $('.video-btn').click(function () {
    $videoSrc = $(this).data("src");
  });
  console.log($videoSrc);



  // when the modal is opened autoplay it  
  $('#myModal').on('shown.bs.modal', function (e) {

    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
  });
  // stop playing the youtube video when I close the modal
  $('#myModal').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $("#video").attr('src', $videoSrc);
  });
  jQuery(document).ready(function ($) {
    var $form_modal = $('.cd-user-modal'),
      $form_login = $form_modal.find('#cd-login'),
      $form_signup = $form_modal.find('#cd-signup'),
      $form_forgot_password = $form_modal.find('#cd-reset-password'),
      $form_modal_tab = $('.cd-switcher'),
      $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
      $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
      $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
      $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
      $main_nav = $('.main-nav');

    //open modal
    $main_nav.on('click', function (event) {

      if ($(event.target).is($main_nav)) {
        // on mobile open the submenu
        $(this).children('label').toggleClass('is-visible');
      } else {
        // on mobile close submenu
        $main_nav.children('label').removeClass('is-visible');
        //show modal layer
        $form_modal.addClass('is-visible');
        //show the selected form
        ($(event.target).is('.cd-signup')) ? signup_selected() : login_selected();
      }

    });

    //close modal
    $('.cd-user-modal').on('click', function (event) {
      if ($(event.target).is($form_modal) || $(event.target).is('.cd-close-form')) {
        $form_modal.removeClass('is-visible');
      }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function (event) {
      if (event.which == '27') {
        $form_modal.removeClass('is-visible');
      }
    });

    //switch from a tab to another
    $form_modal_tab.on('click', function (event) {
      event.preventDefault();
      ($(event.target).is($tab_login)) ? login_selected() : signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function () {
      var $this = $(this),
        $password_field = $this.prev('input');

      ('password' == $password_field.attr('type')) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
      ('Hide' == $this.text()) ? $this.text('Show') : $this.text('Hide');
      //focus and move cursor to the end of input field
      $password_field.putCursorAtEnd();
    });

    //show forgot-password form 
    $forgot_password_link.on('click', function (event) {
      event.preventDefault();
      forgot_password_selected();
    });

    //back to login from the forgot-password form
    $back_to_login_link.on('click', function (event) {
      event.preventDefault();
      login_selected();
    });

    function login_selected() {
      $form_login.addClass('is-selected');
      $form_signup.removeClass('is-selected');
      $form_forgot_password.removeClass('is-selected');
      $tab_login.addClass('selected');
      $tab_signup.removeClass('selected');
    }

    function signup_selected() {
      $form_login.removeClass('is-selected');
      $form_signup.addClass('is-selected');
      $form_forgot_password.removeClass('is-selected');
      $tab_login.removeClass('selected');
      $tab_signup.addClass('selected');
    }

    function forgot_password_selected() {
      $form_login.removeClass('is-selected');
      $form_signup.removeClass('is-selected');
      $form_forgot_password.addClass('is-selected');
    }

    //REMOVE THIS - it's just to show error messages 
    $form_login.find('input[type="submit"]').on('click', function (event) {
      event.preventDefault();
      $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
    $form_signup.find('input[type="submit"]').on('click', function (event) {
      event.preventDefault();
      $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });



  });


  //credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
  jQuery.fn.putCursorAtEnd = function () {
    return this.each(function () {
      // If this function exists...
      if (this.setSelectionRange) {
        // ... then use it (Doesn't work in IE)
        // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
        var len = $(this).val().length * 2;
        this.setSelectionRange(len, len);
      } else {
        // ... otherwise replace the contents with itself
        // (Doesn't work in Google Chrome)
        $(this).val($(this).val());
      }
    });
  };

  var share_url = 'https://codepen.io/';

  // Center sidebar vertically in window
  var el_height = $('.social-share').height();
  $('.social-share').css('margin-top', - (el_height / 2));

  // Trigger hide button event
  $('.social-share li.hide-button a').click(function () {
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


  // Get Google+ share count

  // Fakes the loading setting a timeout
  setTimeout(function () {
    $('body').addClass('loaded');
  }, 1000);



});

var imgLast = $(".sliderCont .sliderImg").length;

$(document).ready(function () {
  $("#slider1").css("display", "block");
  $("#slider2").css({
    "display": "block",
    "left": "45%"
  });
  $("#slider" + imgLast).css({
    "display": "block",
    "left": "-45%"
  });
});

var centerImgCount = 1;

//disable button while animations run
function buttonDelay() {
  $(".button").prop("disabled", true);
  setTimeout(function () {
    $(".button").prop("disabled", false);
  }, 800);
}

$("#slideLeft").on("click", function () {

  buttonDelay();

  //slide center image to the left
  $("#slider" + centerImgCount).animate({ "left": "-45%" });

  //slide rightmost image to the center
  if (centerImgCount === imgLast) {
    $("#slider1").animate({ "left": "0" });
  } else {
    $("#slider" + (centerImgCount + 1)).animate({ "left": "0" });
  }

  //slide next image from out of frame to the right
  if ((centerImgCount + 1) === imgLast) {
    $("#slider1").css("left", "100%").show().animate({ "left": "45%" });
  } else if (centerImgCount === imgLast) {
    $("#slider2").css("left", "100%").show().animate({ "left": "45%" });
  } else {
    $("#slider" + (centerImgCount + 2)).css("left", "100%").show().animate({ "left": "45%" });
  }

  //slide leftmost image out of the frame
  if (centerImgCount === 1) {
    $("#slider" + imgLast).animate({ "left": "-100%" }).delay(400).hide(0);
  } else {
    $("#slider" + (centerImgCount - 1)).animate({ "left": "-100%" }).delay(400).hide(0);
  }

  //increment image count
  if (centerImgCount === imgLast) {
    centerImgCount = 1;
  } else {
    centerImgCount++;
  }

});

$("#slideRight").on("click", function () {

  buttonDelay();

  //slide center image to the right
  $("#slider" + centerImgCount).animate({ "left": "45%" });

  //slide leftmost image to the center
  if (centerImgCount === 1) {
    $("#slider" + imgLast).animate({ "left": "0" });
  } else {
    $("#slider" + (centerImgCount - 1)).animate({ "left": "0" });
  }

  //slide next image from out of frame to the left
  if (centerImgCount === 1) {
    $("#slider" + (imgLast - 1)).css("left", "-100%").show().animate({ "left": "-45%" });
  } else if (centerImgCount === 2) {
    $("#slider" + imgLast).css("left", "-100%").show().animate({ "left": "-45%" });
  } else {
    $("#slider" + (centerImgCount - 2)).css("left", "-100%").show().animate({ "left": "-45%" });
  }

  //slide rightmost image out of the frame
  if (centerImgCount === imgLast) {
    $("#slider1").animate({ "left": "100%" }).delay(400).hide(0);
  } else {
    $("#slider" + (centerImgCount + 1)).animate({ "left": "100%" }).delay(400).hide(0);
  }

  //increment image count
  if (centerImgCount === 1) {
    centerImgCount = imgLast;
  } else {
    centerImgCount--;
  }
});

$(document).ready(function () {
  $('.santhanam').click(function () {
    $('#fade-wrapper').fadeIn();
  });

  $('#fade-wrapper').click(function () {
    $(this).fadeOut();
  });

  $('body').on('hidden.bs.modal', '.modal', function () {
    $('video').trigger('pause');
  });
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  $("#cr_tnpsc").click(function () {
    window.open("http://www.vidhvaa.com/demo4/2page.html", '_self');
  });
  $("#boom").click(function () {
    window.open("http://www.vidhvaa.com/demo4/banner.html", '_self').show("p.very-fast");
  });
  $("#on").click(function () {
    window.open("http://www.vidhvaa.com/demo4/onlinepage.html", '_self').show("p.very-fast");
  });

  $("#cr_upsc").click(function () {
    window.open("http://www.vidhvaa.com/demo4/upsc.html", '_self').show("p.very-fast");
  });
  $("#cr_ssc").click(function () {
    window.open("http://www.vidhvaa.com/demo4/ssc.html", '_self').show("p.very-fast");
  });
  $("#cr_rrb").click(function () {
    window.open("http://www.vidhvaa.com/demo4/rrb.html", '_self').show("p.very-fast");
  });
  $("#cr_banking").click(function () {
    window.open("http://www.vidhvaa.com/demo4/BANKING.HTML", '_self').show("p.very-fast");
  });

  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    margin: 25,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });

  const accessToken = "2d1ddeaadc20462dba88c9beebbe0a21";
  const baseUrl = "https://api.api.ai/api/query?v=20150910";
  const sessionId = "1";
  const loader = `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`;
  const errorMessage = "My apologies, I'm not available at the moment. =^.^=";
  const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  const loadingDelay = 700;
  const aiReplyDelay = 1800;

  const $document = document;
  const $chatbot = $document.querySelector(".chatbot");
  const $chatbotMessageWindow = $document.querySelector(
    ".chatbot__message-window");

  const $chatbotHeader = $document.querySelector(".chatbot__header");
  const $chatbotMessages = $document.querySelector(".chatbot__messages");
  const $chatbotInput = $document.querySelector(".chatbot__input");
  const $chatbotSubmit = $document.querySelector(".chatbot__submit");

  document.addEventListener(
    "keypress",
    event => {
      if (event.which == 13) {
        validateMessage();
      }
    },
    false);


  $chatbotHeader.addEventListener(
    "click",
    () => {
      // toggle($chatbot, "chatbot--closed");
      // $chatbotInput.focus();
      var element = document.getElementsByClassName("chatbot");
      element[0].style.display = "none";
      document.getElementById("chat-circle-mob").style.display = "block";
    },
    false);


  $chatbotSubmit.addEventListener(
    "click",
    () => {
      validateMessage();
    },
    false);

  document.getElementById("chat-circle-mob").addEventListener(
    "click",
    () => {
      var element = document.getElementsByClassName("chatbot");
      element[0].classList.remove("chatbot--closed");
      element[0].style.display = "block";
      $chatbotInput.focus();
      console.log(this);
      document.getElementById("chat-circle-mob").style.display = "none";

    });

  const toggle = (element, klass) => {
    const classes = element.className.match(/\S+/g) || [],
      index = classes.indexOf(klass);
    index >= 0 ? classes.splice(index, 1) : classes.push(klass);
    element.className = classes.join(" ");
  };

  const userMessage = content => {
    $chatbotMessages.innerHTML += `<li class='is-user animation'>
<p class='chatbot__message'>
${content}
</p>
<span class='chatbot__arrow chatbot__arrow--right'></span>
</li>`;
  };

  const aiMessage = (content, isLoading = false, delay = 0) => {
    setTimeout(() => {
      removeLoader();
      $chatbotMessages.innerHTML += `<li 
class='is-ai animation' 
id='${isLoading ? "is-loading" : ""}'>
<div class="is-ai__profile-picture">
<svg class="icon-avatar" viewBox="0 0 32 32">
<use xlink:href="#avatar" />
</svg>
</div>
<span class='chatbot__arrow chatbot__arrow--left'></span>
<div class='chatbot__message'>
${content}
</div>
</li>`;
      scrollDown();
    }, delay);
  };

  const removeLoader = () => {
    let loadingElem = document.getElementById("is-loading");
    if (loadingElem) {
      $chatbotMessages.removeChild(loadingElem);
    }
  };

  const escapeScript = unsafe => {
    const safeString = unsafe.
      replace(/</g, " ").
      replace(/>/g, " ").
      replace(/&/g, " ").
      replace(/"/g, " ").
      replace(/\\/, " ").
      replace(/\s+/g, " ");
    return safeString.trim();
  };

  const linkify = inputText => {
    return inputText.replace(urlPattern, `<a href='$1' target='_blank'>$1</a>`);
  };

  const validateMessage = () => {
    const text = $chatbotInput.value;
    const safeText = text ? escapeScript(text) : "";
    if (safeText.length && safeText !== " ") {
      resetInputField();
      userMessage(safeText);
      send(safeText);
    }
    scrollDown();
    return;
  };

  const multiChoiceAnswer = text => {
    const decodedText = text.replace(/zzz/g, "'");
    userMessage(decodedText);
    send(decodedText);
    scrollDown();
    return;
  };

  const processResponse = val => {
    removeLoader();

    if (val.fulfillment) {
      let output = "";
      let messagesLength = val.fulfillment.messages.length;

      for (let i = 0; i < messagesLength; i++) {
        if (window.CP.shouldStopExecution(0)) break;
        let message = val.fulfillment.messages[i];
        let type = message.type;

        switch (type) {
          // 0 fulfillment is text
          case 0:
            let parsedText = linkify(message.speech);
            output += `<p>${parsedText}</p>`;
            break;

          // 1 fulfillment is card
          case 1:
            // let imageUrl = message.imageUrl
            // let imageTitle = message.title
            // let imageSubtitle = message.subtitle
            // output += `<img src='${imageUrl}' alt='${imageTitle}${imageSubtitle}' />`
            break;

          // 2 fulfillment is button list
          case 2:
            let title = message.title;
            let replies = message.replies;
            let repliesLength = replies.length;
            output += `<p>${title}</p>`;

            for (let i = 0; i < repliesLength; i++) {
              if (window.CP.shouldStopExecution(1)) break;
              let reply = replies[i];
              let encodedText = reply.replace(/'/g, "zzz");
              output += `<button onclick='multiChoiceAnswer("${encodedText}")'>${reply}</button>`;
            } window.CP.exitedLoop(1);

            break;

          // 3 fulfillment is image
          case 3:
            // console.log('Fulfillment is image - TODO')
            break;
        }

      } window.CP.exitedLoop(0);

      return output;
    } else {
      return val;
    }
  };

  const setResponse = (val, delay = 0) => {
    setTimeout(() => {
      aiMessage(processResponse(val));
    }, delay);
  };

  const resetInputField = () => {
    $chatbotInput.value = "";
  };

  const scrollDown = () => {
    const distanceToScroll =
      $chatbotMessageWindow.scrollHeight - (
        $chatbotMessages.lastChild.offsetHeight + 60);
    $chatbotMessageWindow.scrollTop = distanceToScroll;
    return false;
  };

  const send = (text = "") => {
    fetch(`${baseUrl}&query=${text}&lang=en&sessionId=${sessionId}`, {
      method: "GET",
      dataType: "json",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json; charset=utf-8"
      }
    }).


      then(response => response.json()).
      then(res => {
        if (res.status < 200 || res.status >= 300) {
          let error = new Error(res.statusText);
          throw error;
        }
        return res;
      }).
      then(res => {
        setResponse(res.result, loadingDelay + aiReplyDelay);
      }).
      catch(error => {
        setResponse(errorMessage, loadingDelay + aiReplyDelay);
        resetInputField();
        console.log(error);
      });

    aiMessage(loader, true, loadingDelay);
  };



});
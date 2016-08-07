define(['jquery', 'lodash'], function($,_) {

  imgHtmlRemove = "<img src=\"img/remove.svg\" alt=\"\" /></li>";

  function addItem() {
      var inputVal = $('.entry input').val();
      var searchText = inputVal.toLowerCase().trim();
      $('li > span').each(function(){
        if (searchText == $(this).text().toLowerCase().trim()) {
          if ($(this).parent().hasClass('todo')) {
            $(this).parent().animateCss('shake');
            $('.entry input').val('');
          }
          else {
            $(this).parent().removeClass("done");
            $(this).parent().addClass("todo");
            $(this).parent().animateCss('rubberBand');
            $('.entry input').val('');
          }
        }
      });
      inputVal = $('.entry input').val();
      if (inputVal != '') {
        var el = $("<li class=\"todo\"><span>"+inputVal+"</span>"+imgHtmlRemove);
        $('.todo-list').prepend(el);
        el.animateCss('fadeIn', false);
        $('.entry input').val('');
      }
  }

  $('.todo-list').on('click', 'span', function() {
    if ($(this).parent().hasClass("todo")) {
      $(this).parent().removeClass("todo");
      $(this).parent().addClass("done");
    }
    else{
      $(this).parent().removeClass("done");
      $(this).parent().addClass("todo");
    }
  });

  $('.todo-list').on('click', 'img', function() {
    $(this).parent().animateCss('fadeOut', true);
  });

  $('.entry input').keyup(function (e) {
    if (e.keyCode == 13) {
      addItem();
    }
  });

  $('.entry').on('click', 'img', addItem);

  $.fn.extend({
    animateCss: function (animationName, remove) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          $(this).addClass('animated ' + animationName).one(animationEnd, function() {
              $(this).removeClass('animated ' + animationName);
              if (remove)
                $(this).remove();
          });
      }
  });

});




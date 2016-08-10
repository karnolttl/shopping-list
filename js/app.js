define(['jquery', 'lodash'], function($,_) {

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
        //load item html template
        var itm = _.trim($('#item').text(), "'");
        // use lodash template function
        var compiled = _.template(itm);
        var el = $(compiled({'cls': 'todo', 'itm': inputVal}));
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

  $('.entry').on('click', 'img', sortUl);

  function sortUl(){
    var listItems = [];
    $('.todo-list span').each(function() { listItems.push({'cls':
      $(this).parent().hasClass('todo') ? 'todo' : 'done', 'itm': $(this).text()})
    });
    listItems = _.orderBy(listItems, ['cls', 'itm'], ['desc', 'asc']);
    _.forEach(listItems, function(o) {
      console.log('cls: ' + o.cls + '  itm: ' + o.itm);
    });
    $('.todo-list').children('li').remove();
  };

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




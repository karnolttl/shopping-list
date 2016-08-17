define(['jquery', 'lodash'], function($,_) {

  $('.entry').on('click', 'img', addItem);
  $('#sort').on('click', sortUl);
  $('#filter').on('click', filterInput);
  $('#remove-all').on('click', clearUl);

  function addItem() {
    var found = false;
    var $input = $('.entry input');
    var inputVal = $input.val();
    var searchText = inputVal.toLowerCase().trim();
    $('.todo-list li').each(function(){
      if (searchText == $(this).find('span').text().toLowerCase().trim()) {
        found = true;
        $input.val('');
        if ($(this).hasClass('todo')) {
          $(this).animateCss('shake');
        }
        else {
          $(this).toggleClass('todo done');
          $(this).animateCss('rubberBand');
        }
      }
    });
    if (!found) {
      //load item html template
      var itm = $('#item').text();
      // use lodash template function
      var compiled = _.template(itm);
      var el = $(compiled({'cls': 'todo', 'itm': inputVal}));
      $('.todo-list').prepend(el);
      el.animateCss('fadeIn', false);
      $input.val('');
    }
  }

  $('.todo-list').on('click', 'span', function() {
    $(this).parent().toggleClass('todo done');
  });

  $('.todo-list').on('click', 'img', function() {
    $(this).parent().animateCss('fadeOut', true);
  });

  $('.entry input').keyup(function (e) {
    if (e.keyCode == 13) {
      addItem();
    }
  });

  function sortUl(){
    function sortLi(a,b){
      return ($(b).text()) < ($(a).text()) ? 1 : -1;
    }
    $('.todo-list .todo').sort(sortLi).appendTo('.todo-list');
    $('.todo-list .done').sort(sortLi).appendTo('.todo-list');
  };

  function clearUl(){
    $('.todo-list li').remove();
    $('.entry input').val('');
  }

  function filterInput(){
    var $this = $(this);
    var $input = $('.entry input');
    $this.toggleClass('filter-icon');
    var placeholderText = 'add item';
    if ($this.hasClass('filter-icon')) {
      placeholderText = 'filter item';
    }
    $input.attr('placeholder', placeholderText);
  }

  $('entry input').on('input', filterIn);

  function filterIn() {
    //$('.hidden').removeClass('hidden');
    //var inpt = $('.entry input').val();
    //if (inpt != '') {
      //var re = new RegExp(inpt, "i")
      //$('.todo-list span').each(function() {
        //var OK = re.exec($(this).text());
        //if (!OK)
          //$(this).parent().addClass('hidden');
      //});
    //}
  }

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




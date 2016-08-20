define(['jquery', 'lodash'], function($,_) {

  var items = [];
  var isStorageAvailable = true;
  var historyObj = { "list" : [] };

  initialize();

  function initialize(){
    if(!storageAvailable('localStorage')){
      isStorageAvailable = false;
      return;
    }
    if(localStorage.getItem('history')){
      var historyStr = localStorage.getItem('history');
      historyObj = JSON.parse(historyStr);
      var i = historyObj.list.length;
      var itm = $('#item').text();
      var compiled = _.template(itm);
      while(i--) {
        var el = $(compiled({'cls': 'todo', 'itm': historyObj.list[i]}));
        $('.todo-list').prepend(el);
      } // while loop through historyObj list
    } // if history is populated
  }

  function storageAvailable(type) {
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return false;
    }
  }

  $('.entry').on('click', 'img', addItem);

  $('.entry input').keyup(function (e) {
    if (e.keyCode == 13) {
      addItem();
    }
  });

  function addItem() {
    var found = false;
    var $input = $('.entry input');
    var inputVal = $input.val();
    var searchText = inputVal.toLowerCase().trim();
    $('.todo-list li').each(function(){
      var $this = $(this);
      if (searchText == $this.find('span').text().toLowerCase().trim()) {
        found = true;
        $input.val('');
        if ($this.hasClass('todo')) {
          $this.animateCss('shake');
        }
        else {
          $this.toggleClass('todo done');
          $this.animateCss('rubberBand');
        }
      }
    });
    if (inputVal !== '' && !found) {
      if (isStorageAvailable && !contains(historyObj.list, inputVal)) {
        historyObj.list.push(inputVal);
        localStorage.setItem('history', JSON.stringify(historyObj));
      }// if storage is available and new item is not in history

      var itm = $('#item').text();
      var compiled = _.template(itm);
      var el = $(compiled({'cls': 'todo', 'itm': inputVal}));
      $('.todo-list').prepend(el);
      el.animateCss('fadeIn', false);
      $input.val('');
    }
  }

  function contains(a, obj) {
    var i = a.length;
    while (i--) {
      if (a[i].toLowerCase() === obj.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  var sortAsc = 1;
  var sortDsc = -1;
  $('#sort').on('click', function sortUl(){
    $('.todo-list .todo').sort(function(a,b){
    return ($(b).text()) < ($(a).text()) ? sortAsc : sortDsc;
    }).appendTo('.todo-list');
    $('.todo-list .done').sort(function(a,b){
    return ($(b).text()) < ($(a).text()) ? sortAsc : sortDsc;
    }).appendTo('.todo-list');
    sortAsc *= -1;
    sortDsc *= -1;
  });

  $('#filter').on('click', function(){
    var $this = $(this);
    var $input = $('.entry input');
    $this.toggleClass('filter-icon');
    var placeholderText = 'add item';
    $input.off('input', filter);
    $('.hidden').removeClass('hidden');
    if ($this.hasClass('filter-icon')) {
      placeholderText = 'filter item';
      $input.on('input', function () {
        $('.hidden').removeClass('hidden');
        var val = $('.entry input').val();
        if (val != '') {
          var re = new RegExp(val, "i")
          $('.todo-list li').each(function() {
            var $this = $(this);
            var OK = re.exec($this.find('span').text());
            if (!OK)
              $this.addClass('hidden');
          });
        }
      });
    }
    $input.attr('placeholder', placeholderText);
  });

  function removeFromLocalStorage (itm) {
    if (isStorageAvailable && contains(historyObj.list, itm)) {
      var i = historyObj.list.length;
      var arr = [];
      while (i--) {
        arr.unshift(historyObj.list[i].toLowerCase());
      }
      var idx = arr.indexOf(itm.toLowerCase());
      historyObj.list.splice(idx, 1);
      localStorage.setItem('history', JSON.stringify(historyObj));
    }// if storage is available and new item is not in history
  }
  $('#remove-all').on('click', function(){
      $('.todo-list li').remove();
      $('.entry input').val('');
    });

  $('.todo-list').on('click', 'span', function() {
    $(this).parent().toggleClass('todo done');
  });

  $('.todo-list').on('click', 'img', function() {
    $(this).parent().animateCss('fadeOut', true);
    removeFromLocalStorage($(this).prev().text());
  });

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

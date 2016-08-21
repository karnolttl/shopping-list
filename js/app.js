define(['jquery', 'lodash'], function($,_) {

  var isStorageAvailable = true;
  var historyObj = { "list" : [] };
  var sortAsc = 1;
  var sortDsc = -1;
  var savedLists = 0;

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
        var el = $(compiled({'cls': historyObj.list[i].cls, 'itm': historyObj.list[i].itm}));
        $('.todo-list').prepend(el);
      } // while loop through historyObj list
    } // if history is populated
    savedLists = localStorage.getItem('saved_lists');
    if(savedLists){
      for(var i = 0; i < savedLists; i++) {
        var listName = 'list' + i;
        var list = localStorage.getItem(listName);
        if (list) {
          var tpl = $('#icon-list').text();
          var comp = _.template(tpl);
          var el = $(comp({'list': listName}));
          $('.saved-lists').append(el);
        }// if saved list exists in local storage
      }// loop through # of saved lists
    }// if savedLists count key / value pair is found within local storage
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
        historyObj.list.unshift({"cls" : "todo", "itm": inputVal});
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

  function contains(a, itm) {
    var i = a.length;
    while (i--) {
      if (a[i].itm.toLowerCase() === itm.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  $('#sort').on('click', function(){
    $('.todo-list .todo').sort(function(a,b){
    return ($(b).text()) < ($(a).text()) ? sortAsc : sortDsc;
    }).appendTo('.todo-list');
    $('.todo-list .done').sort(function(a,b){
    return ($(b).text()) < ($(a).text()) ? sortAsc : sortDsc;
    }).appendTo('.todo-list');
    sortAsc *= -1;
    sortDsc *= -1;

    if (isStorageAvailable){
      historyObj.list = [];
      $('.todo-list li').each(function() {
        var $this = $(this);
        var cls = ($this.hasClass('done')) ? 'done' : 'todo';
        var itm = $this.find('span').text();
        historyObj.list.push({"cls" : cls, "itm": itm});
      });
      localStorage.setItem('history', JSON.stringify(historyObj));
    }
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
          });//match each li
        }// if input is not blank
      });// input onchange event handler function
    }// if filter is active
    else {
      $input.off('input'); // remove input onchange event function
    }
    $input.attr('placeholder', placeholderText);
  });

  function indexOfObjArray(itm) {
    var len = historyObj.list.length;
    var idx = -1;
    for (var i = 0; i < len; i++) {
      if (historyObj.list[i].itm.toLowerCase() === itm.toLowerCase()) {
        idx = i;
        break;
      }// if item matches
    }// for loop
    return idx;
  }

  function removeFromLocalStorage (itm) {
    if (isStorageAvailable && contains(historyObj.list, itm)) {
      var idx = indexOfObjArray(itm);
      if (idx !== -1){
        historyObj.list.splice(idx, 1);
      }
      localStorage.setItem('history', JSON.stringify(historyObj));
    }// if storage is available and item is in history
  }

  $('#remove-all').on('click', function(){
    $('.todo-list span').each( function(){
      removeFromLocalStorage($(this).text());
    });
      $('.todo-list li').remove();
      $('.entry input').val('');
    });

  $('.todo-list').on('click', 'span', function() {
    $(this).parent().toggleClass('todo done');
    var idx = indexOfObjArray($(this).text());
    if (idx !== -1){
      var cls = ($(this).parent().hasClass('done')) ? 'done' : 'todo';
      historyObj.list[idx].cls = cls;
      localStorage.setItem('history', JSON.stringify(historyObj));
    }
  });

  $('.todo-list').on('click', 'img', function() {
    $(this).parent().animateCss('fadeOut', true);
    removeFromLocalStorage($(this).prev().text());
  });

  $('#save').on('click', function(){

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

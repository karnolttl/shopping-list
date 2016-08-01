var imgHtmlRemove = "<img src=\"img/remove.svg\" alt=\"\" /></li>";

function addItem() {
    var found = false;
    var inputVal = $('.entry input').val();
    var searchText = inputVal.toLowerCase().trim();
    $('.todo-list > span').each(function(){
      if (searchText == $(this).text().toLowerCase().trim()) {
        found = true;
        if ($(this).parent().hasClass('todo')) {
          $(this).parent().remove();
        }
        else {
          $(this).parent().removeClass("done");
          $(this).parent().addClass("todo");
        }
      }
    });
    if (inputVal != '' && !found) {
      var el = $("<li class=\"todo\"><span>"+inputVal+"</span>"+imgHtmlRemove);
      $('.todo-list').prepend(el);
      $('.entry input').val('');
    }
}

$('.todo-list').on('click', 'li[class="todo"]', function() {
  $(this).removeClass("todo");
  $(this).addClass("done");
});

$('.todo-list').on('click', 'img', function() {
  $(this).parent().remove();
});

$('.todo-list').on ('click', 'li[class="done"]', function() {
  $(this).removeClass("done");
  $(this).addClass("todo");
});

$('.entry input').keyup(function (e) {
  if (e.keyCode == 13) {
    addItem();
  }
});

$('.entry').on('click', 'img', function() {
  addItem();
});


//function sortList(ul){
  //var new_ul = ul.cloneNode(false);

  //var lst = [];
  //for(var i = ul.childNodes.length; i--;){
    //if(ul.childNodes[i].nodeName === 'LI')
      //lst.push(ul.childNodes[i]);
  //}

  //lst.sort();

  //for(var i = 0; i < lst.length; i++)
    //new_ul.appendChild(lst[i]);
  //ul.parentNode.replaceChild(new_ul, ul);
//}




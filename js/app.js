var imgHtmlRemove = "<img src=\"img/remove.svg\" alt=\"\" /></li>";

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
    var found = false;
    var inputVal = $(this).val();
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
      $(this).val('');
    }
  }
});


function addToDone(item) {
  $('.list-done').append("<li>"+item+"</li>");
}

function addToDo(item2) {
  $('.list-todo').append("<li>"+item2+"</li>");
}

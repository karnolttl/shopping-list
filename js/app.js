$('.list-todo').on('click', 'li', function() {
  console.log($(this).text());
  var el = $("<li>"+$(this).text()+"</li>");
  $('.list-done').prepend(el);
  $(this).remove();
});

$('.list-done').on ('click', 'li', function() {
  console.log($(this).text());
  var el = $("<li>"+$(this).text()+"</li>");
  $('.list-todo').prepend(el);
  $(this).remove();
});

$('.entry input').keyup(function (e) {
  if (e.keyCode == 13) {
    var inputVal = $(this).val();
    console.log(inputVal);
    if (inputVal != '') {
      var el = $("<li>"+inputVal+"</li>");
      $('.list-todo').prepend(el);
      $(this).val('');
    }
  }
});


function addToDone(item) {
  $('.list-done').prepend("<li>"+item+"</li>");
}

function addToDo(item2) {
  $('.list-todo').prepend("<li>"+item2+"</li>");
}

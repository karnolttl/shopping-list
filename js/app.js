$('.list-todo').on('click', 'li', function() {
  //console.log($(this).text());
  var el = $("<li>"+$(this).text()+"</li>");
  $('.list-done').append(el);
  $(this).remove();
});

$('.list-done').on ('click', 'li', function() {
  //console.log($(this).text());
  var el = $("<li>"+$(this).text()+"</li>");
  $('.list-todo').prepend(el);
  $(this).remove();
});

$('.entry input').keyup(function (e) {
  if (e.keyCode == 13) {
    if ($(this).val() == ":c") {
      $('li').each(function() {
        $(this).remove();
      });
      $(this).val('');
      return;
    }
    var found = false;
    var inputVal = $(this).val();
    var searchText = inputVal.toLowerCase().trim();
    $('.list-todo > li').each(function(){
      if (searchText == $(this).text().toLowerCase().trim()) {
        console.log("yep!");
        found = true;
      }
    });
    $('.list-done > li').each(function(){
      if (searchText == $(this).text().toLowerCase().trim()) {
        console.log("yep");
        $(this).remove();
      }
    });
    //console.log(inputVal);
    if (inputVal != '' && !found) {
      var el = $("<li>"+inputVal+"</li>");
      $('.list-todo').prepend(el);
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

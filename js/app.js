var imgHtmlRemove = "<img src=\"img/remove.svg\" alt=\"\" /></li>";

$('.list-todo').on('click', 'span', function() {
  console.log($(this).text());
  var el = $("<li><span>"+$(this).text()+"</span>"+imgHtmlRemove);
  $('.list-done').append(el);
  $(this).parent().remove();
});

$('ul[class^="list-"]').on('click', 'img', function() {
  $(this).parent().remove();
});

$('.list-done').on ('click', 'span', function() {
  console.log($(this).text());
var el = $("<li><span>"+$(this).text()+"</span>"+imgHtmlRemove);
  $('.list-todo').prepend(el);
  $(this).parent().remove();
});


$('.entry input').keyup(function (e) {
  if (e.keyCode == 13) {
    var found = false;
    var inputVal = $(this).val();
    var searchText = inputVal.toLowerCase().trim();
    $('.list-todo > li').each(function(){
      if (searchText == $(this).text().toLowerCase().trim()) {
        found = true;
      }
    });
    $('.list-done > li').each(function(){
      if (searchText == $(this).text().toLowerCase().trim()) {
        $(this).remove();
      }
    });
    if (inputVal != '' && !found) {
      var el = $("<li><span>"+inputVal+"</span>"+imgHtmlRemove);
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

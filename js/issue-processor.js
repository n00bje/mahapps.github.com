$(function() {
  $(".post").each(function(element) {
    var replaced = $(this).html().replace(/(#([0-9]+))/g, '<a href="https://github.com/MahApps/MahApps.Metro/issues/$2">$1</a>');
    $(this).html(replaced);
  });
})
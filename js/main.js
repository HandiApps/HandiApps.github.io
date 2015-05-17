$( document ).ready(function() {
  var distance = $('#title').offset().top, $window = $(window);

  $window.scroll(function() {
      if ( $window.scrollTop() >= distance ) {
        $('#nav>.menu').fadeIn().removeClass('hidden');
      }
      else {
        $('#nav>.menu').fadeOut();
      }
  });
});

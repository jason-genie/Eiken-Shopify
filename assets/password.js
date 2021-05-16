jQuery(window).ready(function(){
  if($().countdown && $("#coming-countdown").length > 0) {
    var t = new Date(),
        o = new Date(
          parseInt($("#coming-countdown").data("year")),
          parseInt($("#coming-countdown").data("month")) - 1,
          $("#coming-countdown").data("day")
        );
    if(o > t){ 
      $("#coming-countdown").countdown({ until: o });
    }
  }
  //  Min Height for #content container
  var bodyWidth = $(window).width();
  $(window).resize(function () {
    var bodyWidth = $(window).width();
    var wrapperHeight = $('#content').innerHeight();
    $('#content').css('min-height',wrapperHeight);

  });

});
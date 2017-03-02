$(document).ready(function() {

    var countDownDate = new Date("Jul 6, 2017 00:00:00").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $(".days-1 .top").html(Math.floor(days / 100));
    $(".days-2 .top").html(Math.floor(days / 10 % 10));
    $(".days-3 .top").html(Math.floor(days % 10));
    $(".hours-1 .top").html(Math.floor(hours / 10));
    $(".hours-2 .top").html(Math.floor(hours % 10));
    $(".min-1 .top").html(Math.floor(minutes / 10));
    $(".min-2 .top").html(Math.floor(minutes % 10));
    $(".sec-1 .top").html(Math.floor(seconds / 10));
    $(".sec-2 .top").html(seconds % 10);
    $(".days-1 .bottom").html(Math.floor(days / 100));
    $(".days-2 .bottom").html(Math.floor(days / 10 % 10));
    $(".days-3 .bottom").html(Math.floor(days % 10));
    $(".hours-1 .bottom").html(Math.floor(hours / 10));
    $(".hours-2 .bottom").html(Math.floor(hours % 10));
    $(".min-1 .bottom").html(Math.floor(minutes / 10));
    $(".min-2 .bottom").html(Math.floor(minutes % 10));
    $(".sec-1 .bottom").html(Math.floor(seconds / 10));
    $(".sec-2 .bottom").html(seconds % 10);

    var startTimer = setInterval(function() {

      var now = new Date().getTime();
      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      animateFigure($(".sec-2"), seconds % 10); //animateFigure for every last digit of seconds

      if(seconds % 10 == 9) {
        animateFigure($(".sec-1"), Math.floor(seconds / 10)); //animateFigure for first digit of seconds when last digit hits 0
        if(seconds % 59 == 0) {
          animateFigure($(".min-2"), Math.floor(minutes % 10)); //animateFigure for last digit of minutes when the seconds is 00
          if(minutes % 10 == 9) {
            animateFigure($(".min-1"), Math.floor(minutes / 10)); //animateFigure for first digit of minutes when last digit hits 0
            if(minutes % 59 == 0) {
              animateFigure($(".hours-2"), Math.floor(hours % 10)); //animateFigure for last digit of hours when the minutes is 00
              if(hours % 23 == 0 || hours % 19 == 0 || hours % 9 == 0) {
                animateFigure($(".hours-1"), Math.floor(hours / 10)); //animateFigure for first digit of hours when last digit hits 0
                if(hours % 23 == 0) {
                  animateFigure($(".days-3"), Math.floor(days % 10)); //animateFigure for last digit of days when the hours is 00
                  if(days % 10 == 9) {
                    animateFigure($(".days-2"), Math.floor(days / 10 % 10)); //animateFigure for 2nd digit of days when last digit hits 0
                    if((days+1) % 100 == 0) {
                      animateFigure($(".days-1"), Math.floor(days / 100)); //animateFigure for first digit of days when 2nd digit hits 0
                    }
                  }
                }
              }
            }
          }
        }
      }

      if(days == 0) {
        clearInterval(startTimer);
      }

    }, 1000);

    function animateFigure (element, value) {

      var $top         = element.find('.top'),
          $bottom      = element.find('.bottom'),
          $back_top    = element.find('.top-back'),
          $back_bottom = element.find('.bottom-back');

      $back_top.find('span').html(value);
      $back_bottom.find('span').html(value);

      TweenMax.to($top, 0.8, {
        rotationX           : '-180deg',
        transformPerspective: 300,
  	    ease                : Quart.easeOut,
        onComplete          : function() {
          $top.html(value);
          $bottom.html(value);
          TweenMax.set($top, { rotationX: 0 });
        }
      });

      TweenMax.to($back_top, 0.8, {
        rotationX           : 0,
        transformPerspective: 300,
  	    ease                : Quart.easeOut,
        clearProps          : 'all'
      });
    }
});

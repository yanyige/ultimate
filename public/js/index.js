
$(document).ready(function(){


	jQuery.start = function(){
		var motto = $(".motto");
		var welcome = $(".welcome");
		var welcomeRight = $(".welcome-right");
		var intro = $(".intro");

		intro.hide();
		welcomeRight.hide();

		motto.animate({left: '15%'}, 'slow');
		welcome.animate({left: '15%'}, 'slow', function(){
			welcomeRight.show();
			welcomeRight.animate({right: '15%'}, 'slow', function(){
				intro.fadeIn('slow');
			});
		});
	}
	$.start();

	jQuery.imqq = function(){
		var ele = arguments;
		$(window).scroll(function(){
			var temp = (ele[0].offset().top - $(window).scrollTop()) * 0.03;
	        var pos = "50% "+temp+"px";
	        $(".section1Img").css({"background-position":pos});
		});
	}
	$.imqq($(".section1"));

});
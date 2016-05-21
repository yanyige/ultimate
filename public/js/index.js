
$(document).ready(function(){

	//首页文字效果
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

	//图片跟随滚动 attachment
	jQuery.imqq = function(){
		var ele = arguments;
		$(window).scroll(function(){
			var temp = (ele[0].offset().top - $(window).scrollTop()) * 0.03;
	        var pos = "50% "+temp+"px";
	        $(".section1Img").css({"background-position":pos});
		});
	}
	$.imqq($(".section1"));

	//时间轴timeline
	var timeItem = [
		{
			content: '测试',
			time: '2016年5月18日20:24:40'
		},
		{
			content: '测试',
			time: '2016年5月18日20:24:40'
		},
		{
			content: '测试',
			time: '2016年5月18日20:24:40'
		},
		{
			content: '测试',
			time: '2016年5月18日20:24:40'
		},
		{
			content: '测试',
			time: '2016年5月18日20:24:40'
		}
	]
	jQuery.timeLine = function(){
		var animateFlag = false;
		var myTimeLine = $(".myTimeLine");
		var timeLineWidth = myTimeLine.width();
		var marginLeft = (timeLineWidth - 30) / (timeItem.length - 1);
		$.each(timeItem, function(index, item){
			var myTimeLineItem = $("<div class='myTimeLine-item'>").appendTo($(".myTimeLine"));
			var myTimeLineItemImg = $("<div class='myTimeLine-item-img'>").appendTo(myTimeLineItem);
			var myTimeLineItemImg = $("<div class='myTimeLine-item-content'>").appendTo(myTimeLineItem);
			myTimeLineItem.css({'margin-left': marginLeft * index});
			// .myTimeLine-item.clearfix
			// 		.myTimeLine-item-img
			// 		.myTimeLine-item-content
		});
		myTimeLine.children().hide();
		// $(window).on("scroll", scrollFunction(myTimeLine, test));
		$(window).on("scroll",{dom:".myJumbotron",
			callBack1: function (){
				myTimeLine.addClass(myTimeLine.data('animation'));
			},
			callBack2: function (){
				myTimeLine.removeClass(myTimeLine.data('animation'));
			},
			callBack3: function(){
				var delayTime = (5 / myTimeLine.children().length) * 1000;
				var temp = delayTime;
				console.log(delayTime);
				myTimeLine.children().each(function(index, item){
					$(item).fadeIn(temp);
					temp += delayTime;
				});
			},
			callBack4: function(){
				myTimeLine.children().hide();
			}
			}, scrollFunction);
	

	}
	$.timeLine();


});

function scrollFunction(event){
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var domTop = $(event.data.dom).offset().top;
	if(scrollTop > domTop){
		event.data.callBack1();
		event.data.callBack3();
	}else{
		event.data.callBack2();
		event.data.callBack4();
	}
}
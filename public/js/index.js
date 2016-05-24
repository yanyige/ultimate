
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
			content: '1993年11月13日的这天我出生啦~~~',
			time: '1993年11月13日'
		},
		{
			content: '6岁上小学，湖北省荆门市实验小学。',
			time: '1999年9月01日'
		},
		{
			content: '2011年9月考取东北师范大学。',
			time: '2011年9月1日'
		},
		{
			content: '2016.5.18日开始制作我的个人网站~',
			time: '2016年5月18日'
		}
	]
	jQuery.timeLine = function(){
		var animateFlag = false;
		var myTimeLine = $(".myTimeLine");
		var timeLineWidth = myTimeLine.width();
		var marginLeft = (timeLineWidth - 30) / (timeItem.length - 1);
		$.each(timeItem, function(index, item){
			var myTimeLineItem = $("<div class='myTimeLine-item clearfix'>").appendTo($(".myTimeLine"));
			var myTimeLineItemImg = $("<div class='myTimeLine-item-img clearfix'>").appendTo(myTimeLineItem);
			var myTimeLineItemContent = $("<div class='myTimeLine-item-content clearfix'>").appendTo(myTimeLineItemImg);
			var svg = $("<svg data-src='../images/bubble.svg' width='200' height='100'>").appendTo(myTimeLineItemContent);
			myTimeLineItem.css({'margin-left': marginLeft * index});
			myTimeLineItemContent.css({'left': '-90px','top': '-130px'});
			var pWrapper = $("<div class='pWrapper'></div>").appendTo(myTimeLineItemContent);
			var p = $('<p>'+item.content+'</p>').appendTo(pWrapper);
			var timeWrapper = $("<div class='timeWrapper'></div>").appendTo(myTimeLineItemContent);
			var time = $('<p>'+item.time+'</p>').appendTo(timeWrapper);
		});
		myTimeLine.children().hide();
		// 事件绑定
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
				myTimeLine.children().each(function(index, item){
					$(item).fadeIn(temp);
					temp += delayTime;
				});
			},
			callBack4: function(){
				myTimeLine.children().hide();
			}
			}, scrollFunction);
	
		//Ajax加载图片
		(function(){
			$("svg[data-src]").each(function(index, item){
				var src = $(item).data("src");
				$.ajax({
					url: src,
					dataType: 'xml',
					success: function(content){
						var doc = content.documentElement;
						$(doc).attr({
							width: $(item).attr('width'),
							height: $(item).attr('height')
						});
						$(item).after(doc).remove();
					}
				});
			});
		})();
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
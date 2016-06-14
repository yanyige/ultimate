
$(document).ready(function(){
	var localLoop = 1;
	var localLoop1 = 1;
	$(".article-content").children().each(function(index, item){ 
		switch (item.nodeName){
			case 'H1': 
			var tIndex = 't'+index;
			$("<p class='firstLayer'><a href=#"+tIndex+">"+localLoop+"."+$(item).text()+"</a></p>").appendTo($(".detail-content"));
			$(item).find("a").attr("name", "t"+index);
			localLoop = localLoop + 1;
			break;
			case 'H2':
			var tIndex = 't'+index;
			$("<p class='secondLayer'><a href=#"+tIndex+">"+localLoop1+"."+$(item).text()+"</a></p>").appendTo($(".detail-content"));
			$(item).find("a").attr("name", "t"+index);
			localLoop1 = localLoop1 + 1;
			break;
		}
	});
	$(".detail-content").hide();
	$(".contentBar").hover(function(){
		$(this).stop().animate({right: "-20px"}, 2000);
		$(".detail-content").stop().fadeIn("slow");
	},function(){
		$(this).stop().animate({right: "0px"}, 2000);
		$(".detail-content").stop().fadeOut("slow");
	});

});




	
//幻灯片区域
var i=0;
function bannergo(){
		
	i++;
	if(i>2){i=0;}
$(".banner_img img").eq(i).show().siblings().hide();
$(".bannerclick span").eq(i).css("background","#fb565d").siblings().css("background","#000");
}
var time;
time=setInterval(bannergo,3000)
$(".bannerclick span").each(function(a, element) {
$(this).mouseover(function(){
	$(this).css("background","#fb565d").siblings().css("background","#000");
	$(".banner_img img").eq(a).show().siblings().hide();
	clearInterval(time);
})
$(this).mouseout(function(){

	time=setInterval(bannergo,3000);
})

})

//更多

$(".warp .more a ").hover(function(){
	$(this).animate({marginLeft:"8px"},250)
	$(this).find("span").css({"transform":"translateX(20px)","transition":"all .5s"})
	$(this).find(".span1").css({"transitionDelay":".07s"})
	},function(){
	$(this).animate({marginLeft:"0px"},250)	
	$(this).find("span").css({"transform":"translateX(0px)","transition":"all .5s"})
	$(this).find(".span2").css({"transitionDelay":".07s"})
	})


//中秋专场
$(".September_click").mouseover(function(){
	
	$(".September_click_show").css({"top":"0px","transition":".5s"})
	$(".September_click_show").find("span").css({"transform":"rotate(90deg)","transition":".2s"});
	$(".September_click_show").find("h4").css({"marginTop":"2.1rem","transition":".5s"})
})
$(".September_click").mouseout(function(){
	
	$(".September_click_show").css({"top":"82%","transition":".5s"})
	$(".September_click_show").find("span").css({"transform":"rotate(-90deg)","transition":".5s"});
	$(".September_click_show").find("h4").css({"marginTop":".5rem","transition":".2s"})
})

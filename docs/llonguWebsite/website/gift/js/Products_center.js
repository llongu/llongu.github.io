
//默认样式
$(".picture_main .picture_list").eq(0).show();
$(".page_go .number_page").eq(0).css({"borderColor":"#fb565c","color":"#fb565c"});

var i=0;

$(".page_go .next").click(function(){//下一张
	
	i++;
	
	$(".picture_main .picture_list").eq(i).show().siblings(".picture_list").hide();
	})
$(".page_go .prev").click(function(){//上一张
	
	i--;
	if(i<=0){i=0;}
	$(".picture_main .picture_list").eq(i).show().siblings(".picture_list").hide();
	})
$(".page_go .nexts").click(function(){//最后一张
	
	
	i=5;
	$(".picture_main .picture_list").eq(5).show().siblings(".picture_list").hide();
	})
$(".page_go .prevs").click(function(){//第一张
	
	i=0;
	$(".picture_main .picture_list").eq(0).show().siblings(".picture_list").hide();
	})

$(".page_go .number_page").click(function(){//点击页数切换效果
	$(this).css({"borderColor":"#fb565c","color":"#fb565c"}).siblings(".number_page").css({"borderColor":"#c0c1c4","color":"#cfd0d1"});
	})

$(".page_go").click(function(){
	scroll(0,130)
})
$(".pierce_inner a").not(".pierce_none").click(function(){
$(this).css("color","#fb565c").siblings().not(".pierce_none").css("color","#2d313d")

})

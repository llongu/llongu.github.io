//
////图片列表放上去和退出时候
//$(".main_pircture .picture_list li").mouseover(function(){
//	$(this).css({"background":"#fb565c","border":"#fff 1px solid"});
//	$(this).find(".list_bottom .right a:first-child img").attr('src','images/search52.png')
//	$(this).find(".list_bottom .right a:last-child img").attr('src','images/search42.png')
//	$(this).find(".list_bottom p a").css("color","#fff")
//	$(this).find(".list_bottom span").css("color","#fff")
//})
//
//$(".main_pircture .picture_list li").mouseout(function(){
//	$(this).css({"background":"","border":"#96989e 1px solid"});
//	$(this).find(".list_bottom .right a:first-child img").attr('src','images/search5.png')
//	$(this).find(".list_bottom .right a:last-child img").attr('src','images/search4.png')
//	$(this).find(".list_bottom p a").css("color","#2d313d")
//	$(this).find(".list_bottom span").css("color","#2d313d")
//})
//
////默认样式
//$(".main_pircture .main_list").eq(0).show();
//$(".page_go .number_page").eq(0).css({"borderColor":"#fb565c","color":"#fb565c"});
//
//var i=0;
//
//$(".page_go .next").click(function(){//下一张
//	
//	i++;
//	
//	$(".main_pircture .main_list").eq(i).show().siblings(".main_list").hide();
//	})
//$(".page_go .prev").click(function(){//上一张
//	
//	i--;
//	if(i<=0){i=0;}
//	$(".main_pircture .main_list").eq(i).show().siblings(".main_list").hide();
//	})
//$(".page_go .nexts").click(function(){//最后一张
//	
//	
//	i=5;
//	$(".main_pircture .main_list").eq(5).show().siblings(".main_list").hide();
//	})
//$(".page_go .prevs").click(function(){//第一张
//	
//	i=0;
//	$(".main_pircture .main_list").eq(0).show().siblings(".main_list").hide();
//	})
//
//$(".page_go .number_page").click(function(){//点击页数切换效果
//	$(this).css({"borderColor":"#fb565c","color":"#fb565c"}).siblings(".number_page").css({"borderColor":"#c0c1c4","color":"#cfd0d1"});
//	})
//
//$(".page_go").click(function(){
//	scroll(0,130)
//})


//$(".pierce_inner a").not(".pierce_none").click(function(){
//$(this).css("color","#fb565c").siblings().not(".pierce_none").css("color","#2d313d")
//
//})
/*图片放上去效果*/
$(".gary_picture").css({"transform":"scale(0)"})
$(".new_right_picture li").mouseover(function(){
	$(this).find(".gary_picture").css({"transform":"scale(1)","transition":"transform .5s ease","opacity":"1"})
})
$(".new_right_picture li").mouseout(function(){
	$(this).find(".gary_picture").css({"transform":"scale(0)","transition":"transform .5s ease",})
})



/*点击滚动效果*/
$(".new_right_button .picture_next").click(nexts);
$(".new_right_button .picture_prev").click(prevs);
console.log();
var i=0;
function nexts(){

	i++;
	if(i>3){i=0;}
	if(i==0){setTimeout(nexts,0);$(".new_right_picture").css({"transition":"0s" })
	
	}else{
		$(".new_right_picture").css({"transition":".8s" })
		}
	goes();
	console.log(i);
	
}
function prevs(){
	i--;
	if(i<0){i=3;}
	if(i==3){$(".new_right_picture").css({"transition":"0s" });setTimeout(prevs,0)
	
	}else{
		$(".new_right_picture").css({"transition":".8s" })
		}
	goes();
}

function goes(){$(".new_right_picture").css({"marginTop":-(603*i)+"px" })}//603是加上11px的边距


//验证电话号码
function getgo(){
	var valus=$(".new_left_text .numbers").val();
	objs=/^1[34578]\d{9}$/;
	//  ^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
	if(objs.test(valus)==true){return true;}else{alert("This phone number is fake");return false;}
}


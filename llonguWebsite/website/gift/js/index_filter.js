$(".banner .goods_main li").eq(0).css("display","block")

$(".banner .menu li").eq(0).css({"background": "#f4f4f5"})
$(".banner .menu li").eq(0).find("p").css({"color": "#2d313d"})
$(".banner .menu li").eq(0).find(".menu_list").css({"border": "#none"})


//左边菜单导航效果区域
$(".banner .menu li").each(function(index, element) {
	
	
	//菜单导航放上去的时候
    $(this).mouseover(function(){
    	$(this).css("background","#f4f4f5").siblings().css("background","#fb565c");//当前li背景改变其他恢复
    	
    	$(this).find(".menu_list p").css("color","#2d313d").parents("li").siblings().find(".menu_list p").css("color","#fff");//当前字体颜色改变其他恢复
    	
    	
    	$(this).find(".menu_list ").css({"border":"none"}).parents("li").siblings().find(".menu_list").css({"border-bottom":"1px solid #fff"});//当前的边框消失其他的恢复
    	$(this).prev().find(".menu_list ").css("border","none");//上一个的边框也给去掉

    	$(this).find(".menu_list i").css({"marginLeft":"6px","transition":"margin .3s "}).parents("li").siblings().find(".menu_list i").css({"marginLeft":"0px"});
    	//用边距移动i图标的位置并过渡
    	
    	
    	$(this).find(".menu_list i").css("background-position-x","-20px").parents("li").siblings().find(".menu_list i").css("background-position-x","-1px");
    	//当前i的背景定位和恢复
    	
    	
    	
    	
    	//下面是右边商品分类显示隐藏效果
    	
    	$(".banner .goods_main li").eq(index).show().siblings().hide();//大盒子里面列表实现切换效果
    	
    	//.hover放上去和退出去时
    	$(".banner .goods_main li").hover(//列表放上去的时候
    		function(){
    			//在商品显示出来时候右边的菜单对应的样式（只是加了一个对应下标index）
    			
    			$(".banner .menu li").eq($(this).index(".banner .goods_main li")).css({"background":"#f4f4f5"}).siblings().css({"background":"#fb565c"});
    			$(".banner .menu li").eq($(this).index(".banner .goods_main li")).find("p").css("color","#2d313d").parents("li").siblings().find(".menu_list p").css("color","#fff");
    			$(".banner .menu li").eq($(this).index(".banner .goods_main li")).find(".menu_list ").css({"border":"none"}).parents("li").siblings().find(".menu_list").css({"border-bottom":"1px solid #fff"});
    			$(".banner .menu li").eq($(this).index(".banner .goods_main li")).prev().find(".menu_list ").css("border","none");
    			$(".banner .menu li").eq($(this).index(".banner .goods_main li")).find(".menu_list i").css("background-position-x","-20px").parents("li").siblings().find(".menu_list i").css("background-position-x","-1px");
    			$(".banner .menu li").eq($(this).index(".banner .goods_main li")).find(".menu_list i").css({"marginLeft":"6px","transition":"margin .3s "}).parents("li").siblings().find(".menu_list i").css({"marginLeft":"0px"});
    			
    			},function(){
    		
    			
				
    				}
    		)
    
    
    
    })
    $(".banner .warp").hover(function(){},function(){
    	$(".banner .goods_main li").eq(0).show().siblings().hide();
    	$(".banner .menu li").eq(0).css({"background":"#f4f4f5"}).siblings().css({"background":"#fb565c"});
    	$(".banner .menu li").eq(0).find("p").css("color","#2d313d").parents("li").siblings().find(".menu_list p").css("color","#fff");
    	$(".banner .menu li").eq(0).find(".menu_list ").css({"border":"none"}).parents("li").siblings().find(".menu_list").css({"border-bottom":"1px solid #fff"});
    	$(".banner .menu li").eq(0).prev().find(".menu_list ").css("border","none");
    	$(".banner .menu li").eq(0).find(".menu_list i").css("background-position-x","-20px").parents("li").siblings().find(".menu_list i").css("background-position-x","-1px");
    	$(".banner .menu li").eq(0).find(".menu_list i").css({"marginLeft":"6px","transition":"margin .3s "}).parents("li").siblings().find(".menu_list i").css({"marginLeft":"0px"});
    	
    
    	
    })
 
    
 			
    //退出去的时候
    $(this).mouseout(function(){
    	
 		$(this).css("background","#fb565c");
    	$(this).find(".menu_list p").css("color","#fff")
    	$(this).find(".menu_list").css({"border-bottom":"1px solid #fff","transform":"translateX(0px)"});
    	$(this).prev().find(".menu_list ").css({"border-bottom":"1px solid #fff"})
    	$(this).find(".menu_list i").css("background-position-x","-1px");
    	$(this).find(".menu_list i").css({"marginLeft":"0px"});//移动i图标的位置
		
    })
});




     


	


//更多
$(".warp .more a ").hover(function(){
	$(this).animate({marginLeft:"8px"},250)
},function(){
	$(this).animate({marginLeft:"0px"},250)
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

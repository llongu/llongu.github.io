//ipad判断
function is_iPad(){
    var ua = navigator.userAgent.toLowerCase(); 
    if(ua.match(/iPad/i)=="ipad") { 
    	$(".wrap").css("height","16.133333rem")
    } 
}
is_iPad();

//初始化动画
function init(){
	//随机骰子
	$(".index_dice").addClass("index_dice"+Math.ceil(Math.random()*6))
			
	//标题动画
	setTimeout(function(){
		$(".title_gift img").css("top","0")
		$(".title_boy img").css("top","0")
	},500)
	
	setTimeout(function(){
		 $(".title_text").addClass(" tada");//不能把animated固定在 元素上  否则没过度效果 也可以把animated删除掉 自定义
	},1500)
	
	//向左无间隙滚动
	var left=document.getElementById("scorll_wrap");
	var left1=document.getElementById("dom1");
	var left2=document.getElementById("dom2");
	//console.log($("#dom1").width())
	//设置main盒子的宽度等于  left1盒子的实际宽度*2
	document.getElementById("scorll_main").style.width=2*(left1.offsetWidth)+"px";
	left2.innerHTML=left1.innerHTML;
	function scrollLeft(){
		left.scrollLeft++;
		if(left.scrollLeft==left1.offsetWidth){
			//清空初始padding
			$("#dom1 li:first-child").css("padding-left","0")
			left.scrollLeft=0;
		}
	}
	var times=setInterval(scrollLeft,10);	
}

//	活动规则开启按钮		
	$('.rule_button').click(function(){
//		$(".pop").show();
//		setTimeout(function(){
//			$(".rule_pop").addClass("rule_pop_scale")
//		},50)
	})
	
//	活动规则关闭按钮
	$('.rule_pop .close').click(function(){
		$(".pop").hide();
		$(".rule_pop").removeClass("rule_pop_scale")
	})
//	活动规则选项卡切换
	$(".tab li").click(function(){
		$(".arrow").hide();
		$(this).find(".arrow").show()
		$(".tab_main li").eq($(this).index()).show().siblings().hide();
	})	



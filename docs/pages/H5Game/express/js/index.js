	
//	活动规则关闭按钮
	$('.rule_pop .close').click(function(){
		//游戏结束页面禁止关闭
		if($(".game_over_pop2").is(":hidden")){
			$(".pop").hide();
		}
		$(".rule_pop").hide();
	})
	
//	活动规则选项卡切换
	$(".tab li").click(function(){
		$(".arrow").hide();
		$(this).find(".arrow").show()
		$(".tab_main li").eq($(this).index()).show().siblings().hide();
	})	

//	表单弹窗关闭按钮
	$('.close2').click(function(){
		$(".pop").hide();
		$(this).parent().hide();
	})	

//	页面滑动功能
	function Wrap_move(){
			$(".game_wrap").show();
			$("body").animate({
				"scrollTop":parseInt($(".index_wrap").css("height"))
			},300,function(){
				$(".index_wrap").hide();
				 //开启倒计时
				 Countdown();	
				 //移除手指监听
				 document.removeEventListener("touchstart",Touchstarts)
				 document.removeEventListener("touchend",Touchends)
			})
			
	}
	
//	点击滑动
	$(".begin_game").click(function(){
			Wrap_move();
	})

	var startx,starty;
	
	//手指监听
//  document.addEventListener("touchstart",Touchstarts, false);
//  document.addEventListener("touchend", Touchends,false);
    
    //获得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };
 
    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;
 		
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
 
        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
 
        return result;
    }
	
	//手指接触屏幕
    function Touchstarts(e){
    	  startx = e.touches[0].pageX;
          starty = e.touches[0].pageY;
    }
    
    //手指离开屏幕
    function Touchends(e) {
    	//有弹窗显示 禁止滑动
    	if($(".pop").is(":visible"))return false;
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(startx, starty, endx, endy);
        switch (direction) {
            case 0:
//              alert("未滑动！");
                break;
            case 1:
//              alert("向上！")
				Wrap_move();
                break;
            case 2:
//              alert("向下！")
                break;
            case 3:
//              alert("向左！")
                break;
            case 4:
//              alert("向右！")
                break;
            default:
        }
    };
	
	//开始时间倒计时
	function Countdown(){
		musicPlay("time");
		$("#score span").html("0")
		$("#ss").html("30")
		$("#ms").html("0")
		
		$(".Countdown_wrap").show();
		$(".Countdown_wrap div").hide();
		$(".Countdown3").show();
		var CountdownNum=3;
		var Counttimer=setInterval(function(){
			CountdownNum--;
			if(CountdownNum<1){
				$(".Countdown_wrap").hide();
				clearInterval(Counttimer)
				//开始游戏
				game.start();
				setTimeout(function(){
					musicPlay("bg");
				},500)
				return;
			}
			
			$(".Countdown_wrap div").fadeOut();
			$(".Countdown"+CountdownNum).fadeIn();
		},1000)
		
	}
	
	//再玩一次
	$("#gain_button,#gain_button2").click(function(){
		$(".pop,.game_over_pop").hide();
		//开始游戏
		Countdown();
	})



		
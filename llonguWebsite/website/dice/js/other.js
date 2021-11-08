
//	活动规则开启按钮
	$('.rule_button').click(function(){
		$(".pop").show();
		$(".rule_pop").show();
	})
//	活动规则关闭按钮
	$('.rule_pop .rule_close').click(function(){
		$(".pop").hide();
		$(".rule_pop").hide();
	})
//	活动规则选项卡切换
	$(".tab li").click(function(){
		$(".arrow").hide();
		$(this).find(".arrow").show()
		$(".tab_main li").eq($(this).index()).show().siblings().hide();
	})	

//弹窗关闭按钮（此按钮必须在第一层）
	$(".game_close").click(function(){
		$(".pop").hide();
		$(this).parent().hide();
	})
/*------------景点礼包点击-----------*/
$(".place_people_gift").click(function(){
	//景点弹窗隐藏
	$(this).parents(".place_box").removeClass("place_box_pop")
	//人物显示
	$("#people").show();
	//奖品弹窗显示
	$(".pop").show();
	$(".open_gift").show();
})

/*------------设置后续人物图片------------*/
	$(".cosplay_boy").click(function(){
		$(this).find(".choose_click").addClass("choose_click_move");
		setTimeout(function(){
			$(".choose_click").removeClass("choose_click_move")
		},300)
	 	peopel_Img=CosplayArr[0];
	 	SetImg($(this))
	 })
	  $(".cosplay_girl").click(function(){
	  	$(this).find(".choose_click").addClass("choose_click_move");
		setTimeout(function(){
			$(".choose_click").removeClass("choose_click_move")
		},300)
	 	peopel_Img=CosplayArr[1];
	 	SetImg($(this))
	 })
	  
	 function SetImg(Tihs){
	 	//箭头显示隐藏
	 	if(Tihs){
	 		$(".cosplay_choose").hide();
	 		Tihs.find(".cosplay_choose").show();
	 	}
	 	//行走表情
	 	$("#people img").attr('src',"img/"+peopel_Img[0]+".png");
	 	//表情设置完成
	 	Flicker();
	 	//景点表情
	 	$(".place_people_expression img").attr('src',"img/"+peopel_Img[1]+".png")
	 	//分享表情
	 	$(".share_success_expression img").attr('src',"img/"+peopel_Img[1]+".png");
	 	//空白格表情
	 	$(".blank_place_expression img").attr('src',"img/"+peopel_Img[2]+".png");
	 	//前进后退表情
	 	$(".go_dice_expression img").attr('src',"img/"+peopel_Img[2]+".png");
	 	$(".back_dice_expression img").attr('src',"img/"+peopel_Img[2]+".png");
	 	//打开礼盒表情
	 	$(".open_gift_expression img").attr('src',"img/"+peopel_Img[0]+".png");
	 	//获得礼物表情
	 	$(".get_gift_expression img").attr('src',"img/"+peopel_Img[3]+".png"); 
	 	//输入手机号码表情
	 	$(".phone_pop_expression img").attr('src',"img/"+peopel_Img[3]+".png");
	 }
	 


/*------初始化移动人物至存储坐标------*/
function SaveMove(Num){
	begin.placeNum=Num;
	$("#people").css({
		"left":(begin.placeArr[Number(Num)].x)/75+"rem",
		"top":(begin.placeArr[Number(Num)].y+12)/75+"rem"
	})
	//坐标设置完成
	Flicker();
	//判断屏幕位置
	Center();
}
//在 人物行走表情,人物初始位  置移动设置完成后再显示页面 防止闪烁
function Flicker(){
			flicker++;
		 	if(flicker>=2){
		 		$(".wrap").show();
		 	}
}
/*------判断是否在屏幕内  保证内容在可视区域内------*/
function Center(Name){
	
	     				 //人物top值是否超出屏幕一半高度
						if($("#people").offset().top-$("body").scrollTop()+$("#people").height()>window.screen.height/2){
							console.log("1")
							$("body").animate({
									"scrollTop":$("#people").offset().top-window.screen.height/2+$("#people").height()*1.5
							},500)
						}else if($("#people").offset().top<$("body").scrollTop()+window.screen.height/2){
							console.log("2")
							$("body").animate({
									"scrollTop":$("#people").offset().top-window.screen.height/2+$("#people").height()*1.5
							},500)
						}
}
		
		



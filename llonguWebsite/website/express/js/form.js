//页面初始化
function InitData(){
				$("#loadingText").hide()
	            $(".wrap").css("height",document.documentElement.clientHeight);
	            $(".index_wrap").show();
				//查询是否中奖
}

//游戏结束调用
function game_over(){
	clearInterval(self.goodsTimer);
		//展示分数
		$(".now_score_num span").html($("#score span").html())
	setTimeout(function(){Pop_state(2)},1000)
}

//摇一摇开关控制	
var shakeSwitch=true;

//立即抽奖
$("#now_button").click(function(){
	//查询是否有机会抽奖 且 达到600分
	
	//显示摇一摇弹窗
	Pop_state(3)
	//开启摇动 
	ShakeIng();
	
//	//测试弹窗
//	Pop_state(7)
})

//摇一摇
function ShakeIng(state){
	 
	if(window.DeviceMotionEvent) {  
		var speed = 15;   
	    var x = y = z = lastX = lastY = lastZ = 0;  
	    window.addEventListener('devicemotion', function(){  
	        var acceleration =event.accelerationIncludingGravity;  
	        x = acceleration.x;  
	        y = acceleration.y;  
	        
	        if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {  
	        	//开关未开启，禁止摇动
	            if(shakeSwitch){
	            	shakeSwitch=false;
	            	musicPlay("yiy")
	            	//查询是否中奖
	            	Pop_state(7)
	            	//未中奖  Pop_state(4) 
	            	//中奖      Pop_state(5) 
	            	//中奖后	变量赋值判断要填写的表单是哪个	
	            }
	             
	        }  
	        
	        lastX = x;  
	        lastY = y;  
	    }, false);  
	}  
	
}

//弹窗管理
function Pop_state(num){
	switch (num){
		case 1://游戏规则
			$(".rule_pop").show();
			break;
		case 2://游戏结束
			$(".game_over_pop2").show().siblings().hide();
			break;
		case 3://摇一摇界面
			$(".shake_pop").show().siblings().hide();
			break;		
		case 4://未到600分
			$(".game_no_score_pop").show().siblings().hide();
			break;
		case 5://未中奖还有机会
			$(".no_gift_pop,.have_chance").show().siblings().hide();
			break;	
		case 6://未中奖没有机会
			$(".no_gift_pop,.no_chance").show().siblings().hide();
			break;	
		case 7://已中奖
			$(".get_gift_pop").show().siblings().hide();
			break;
		case 8://填写全部中奖信息
			$(".gift_form_pop").show().siblings().hide();
			break;	
		case 9://填写中奖信息（手机号码）
			$(".gift_form_pop2").show().siblings().hide();
			break;
		case 10://填写成功
			$(".form_success_pop1").show().siblings().hide();
			break;
		case 11://填写成功（手机号码）
			$(".form_success_pop2").show().siblings().hide();
			break;	
		case 12:
			//未中奖其他情况
			$(".no_gift_other_pop").show().siblings().hide();
			break;
		case 13:
			//关注二维码页面
			$(".code_pop").show().siblings().hide();
			break;	
		case 14:
			//分享成功
			$(".share_success_pop").show().siblings().hide();
			break;		
			
	}
	$(".pop").show();
}

//立即领奖
$("#now_get_gift").click(function(){
	//通过变量赋值判断要弹起哪个表单
	Pop_state(8)
//	Pop_state(9)
})

//表单提交
$("#submit,#submit2").click(function(){
						//表单验证
						var status=FormValidate($(this));
						if(status!==undefined){
							if(status.k==true){
								console.log(status.data)
								Pop_state(10)
							}
						}
						
		})
		
//表单验证
function FormValidate(This){
			var k=true;
			//保存数据
			var datas={
				name:"",
				phone:"",
				addres:"",
				mail:"",
				cars:"",
				cards:""
			}

//正则表达式
var names=/^[\u4E00-\u9FA5]{1,6}$/; 
var phones=/^1[34578]\d{9}$/;
var addres=/^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]+/;
var mail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
var cars=/(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领a-z]{1}[a-z]{1}[a-z0-9]{4}[a-z0-9挂学警港澳]{1}$)/i;
var cards=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			
			
			for(var i=0;i<This.siblings("form").find(".form_box").length;i++){
				
				var thiss=This.siblings("form").find(".form_box").eq(i);
				var thisClass=thiss.attr("class");
				var thisCss=thiss.css("display");
				var thisVlue=thiss.find("input").val();
				var thisVlue2=thiss.find("textarea").val();
				
				if(thisClass.indexOf("name_box")>-1 && thisCss=="block"){//判断input类型 并且是否存在
					if(names.test(thisVlue)){
						datas.name=thisVlue;
					}else{
						$(".erro_mesg").html("你的名字格式不正确哦！")
						k=false;
						return;
					}
				}else if(thisClass.indexOf("phone_box")>-1 && thisCss=="block"){
					if(phones.test(thisVlue)){
						datas.phone=thisVlue;
					}else{
						$(".erro_mesg").html("你的电话格式不正确哦！")
						k=false;
						return;
					}
				}else if(thisClass.indexOf("addres_box")>-1 && thisCss=="block"){
					if(addres.test(thisVlue)){
						datas.addres=thisVlue;
					}else{
						$(".erro_mesg").html("你的地址格式不正确哦！")
						k=false;
						return;
					}
				}else if(thisClass.indexOf("mail_box")>-1 && thisCss=="block"){
					if(mail.test(thisVlue)){
						datas.mail=thisVlue;
					}else{
						$(".erro_mesg").html("你的邮箱格式不正确哦！")
						k=false;
						return;
					}
				}else if(thisClass.indexOf("cars_box")>-1 && thisCss=="block"){
					if(cars.test(thisVlue)){
						datas.cars=thisVlue;
					}else{
						$(".erro_mesg").html("你的车牌格式不正确哦！")
						k=false;
						return;
					}
				}else if(thisClass.indexOf("cards_box")>-1 && thisCss=="block"){
					
					if(cards.test(thisVlue)){
						datas.cards=thisVlue;
					}else{
						$(".erro_mesg").html("你的身份证格式不正确哦！")
						k=false;
						return;
					}
				}
			}
			//保存成功
			if(k){
				$(".erro_mesg").html("")
				return {"k":k,"data":datas};
			}
				
		}	

//	活动规则开启按钮		
	$('.rule_button,#ranking_button').click(function(){
//		Pop_state(1);
//		//如果是排行榜按钮 主动显示排行榜
//		if($(this).attr("id")=="ranking_button"){
//			$(".arrow").hide();
//			$(".tab li").eq(1).find(".arrow").show();
//			$(".tab_main li").eq(1).show().siblings().hide();
//		}
	})
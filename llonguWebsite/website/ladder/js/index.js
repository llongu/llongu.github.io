	var $pop = $(".pop");
	
	//开始游戏
	$(".begin_game").click(function(){
		UseFn.begin_game();
	})
	//活动规则  排行榜  显示
	$(".rule_button,.ranking_button").click(function() {
//		UseFn.get_rule_data($(this));
	})
	//再玩一次 
	$(".gain_button").click(function(){
		$pop.hide();
		UseFn.rest_game();
	})
	//分享成功开始游戏
	$(".share_pop_button").click(function(){
		//判断是否在游戏页面
		if($(".game_wrap").is(":visible")) {
			$pop.hide();
		    UseFn.rest_game();
		}else{
			UseFn.begin_game();
		}
	})
	
	//抽奖赢话费
	$("#now_button").click(function(){
		UseFn.play_gift()
	})

	//摇一摇开关控制
	var shakeSwitch = true;
	
	//摇一摇
	function ShakeIng(state) {
		if(window.DeviceMotionEvent) {
			var speed = 15;
			var x = y = z = lastX = lastY = lastZ = 0;
			window.addEventListener('devicemotion', function() {
				var acceleration = event.accelerationIncludingGravity;
				x = acceleration.x;
				y = acceleration.y;
				if(Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
					//开关未开启，禁止摇动
					if(shakeSwitch) {
						shakeSwitch = false;
						//播放音乐
						UseFn.musicPlay("yiy")
						//查询是否中奖
						UseFn.get_shake_data()
					}
				}
				lastX = x;
				lastY = y;
			}, false);
		}
	}
	
	//表单提交
	$("#submit").click(function() {
		//表单验证
		var status = FormValidate($(this));
		if(status !== undefined) {
			if(status.k) {
				console.log(status.data)
				UseFn.sure_form__data()
			}
		}
	})
	
	//确认提交
	$("#submit_sure").click(function(){
		UseFn.send_form_data()
	})
	
	//重填
	$("#rest_phone").click(function(){
		Pop_state("form_pop");
	})
	
	//活动规则 切换
	$(".rule_tab li").on("touchstart",function() {
		$(".rule_tab_arrow").hide();
		$(this).find(".rule_tab_arrow").show()
		$(".rule_tab_main li").eq($(this).index()).show().siblings().hide();
	})
	
	//活动规则 关闭
	$('.rule_close').click(function() {
		//判断是否在游戏页面
		if($(".game_wrap").is(":visible")) {
			if(game.score>=500){
				//显示游戏 结束页面
				Pop_state("play_gift");
			}else{
				//显示游戏 未达到分数页面
				Pop_state("score_miss");
			}
		}else{
			$pop.hide();
			$(".rule_pop").hide()
		}
	})
	
	
	//没抽奖机会知道了按钮 和 未中奖按钮
	$(".know_button,.no_gift_close").click(function(){
		//显示游戏 结束页面  未中奖的知道了不能显示结束页面
		Pop_state('play_gift')
	})

	//表单弹窗关闭按钮
	$('.close').click(function() {
		$pop.hide();
		$(this).parent().hide();
	})

	//表单验证
	function FormValidate(This) {
		var k = true;
		//保存数据
		var datas = {
			name: "",
			phone: "",
			addres: "",
			mail: "",
			cars: "",
			cards: ""
		}
	
		//正则表达式
		var names = /^[\u4E00-\u9FA5]{1,6}$/;
		var phones = /^1[34578]\d{9}$/;
		var addres = /^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]+/;
		var mail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		var cars = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领a-z]{1}[a-z]{1}[a-z0-9]{4}[a-z0-9挂学警港澳]{1}$)/i;
		var cards = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	
		for(var i = 0; i < This.siblings("form").find(".form_box").length; i++) {
	
			var thiss = This.siblings("form").find(".form_box").eq(i);
			var thisClass = thiss.attr("class");
			var thisCss = thiss.css("display");
			var thisVlue = thiss.find("input").val();
			var thisVlue2 = thiss.find("textarea").val();
	
			if(thisClass.indexOf("name_box") > -1 && thisCss == "block") { //判断input类型 并且是否存在
				if(names.test(thisVlue)) {
					datas.name = thisVlue;
				} else {
					$(".erro_mesg").html("你的名字格式不正确哦！")
					k = false;
					return;
				}
			} else if(thisClass.indexOf("phone_box") > -1 && thisCss == "block") {
				if(phones.test(thisVlue)) {
					datas.phone = thisVlue;
				} else {
					$(".erro_mesg").html("你的电话格式不正确哦！")
					k = false;
					return;
				}
			} else if(thisClass.indexOf("addres_box") > -1 && thisCss == "block") {
				if(addres.test(thisVlue)) {
					datas.addres = thisVlue;
				} else {
					$(".erro_mesg").html("你的地址格式不正确哦！")
					k = false;
					return;
				}
			} else if(thisClass.indexOf("mail_box") > -1 && thisCss == "block") {
				if(mail.test(thisVlue)) {
					datas.mail = thisVlue;
				} else {
					$(".erro_mesg").html("你的邮箱格式不正确哦！")
					k = false;
					return;
				}
			} else if(thisClass.indexOf("cars_box") > -1 && thisCss == "block") {
				if(cars.test(thisVlue)) {
					datas.cars = thisVlue;
				} else {
					$(".erro_mesg").html("你的车牌格式不正确哦！")
					k = false;
					return;
				}
			} else if(thisClass.indexOf("cards_box") > -1 && thisCss == "block") {
	
				if(cards.test(thisVlue)) {
					datas.cards = thisVlue;
				} else {
					$(".erro_mesg").html("你的身份证格式不正确哦！")
					k = false;
					return;
				}
			}
		}
		//保存成功
		if(k) {
			$(".erro_mesg").html("")
			return {
				"k": k,
				"data": datas
			};
		}
	
	}
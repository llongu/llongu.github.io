	import 'jquery'
	var names = /^[\u4E00-\u9FA5]{1,6}$/;
		var phones = /^1[34578]\d{9}$/;
		//获取验证码
		$("#get_code").click(function() {
				var card_val = $("#card").val(),
				name_val = $("#name").val(),
				phone_val = $("#phone").val();
			if(card_val == "") {
				error(".card_box", "请输入您的员工编码！");
			} else if(!names.test(name_val)) {
				error(".name_box", "您输入的姓名有误！");
			} else if(!phones.test(phone_val)) {
				error(".phone_box", "您输入的手机号码有误！");
			}else{
				//提示
				layer.open({
					content: '验证码已发送，请注意查收！',
					skin: 'msg',
					time: 3 //2秒后自动关闭
				});
				time();
			}

		})
		//绑定
		$("#submit").click(function() {
			$(".form_box").removeClass("input_error");
			var card_val = $("#card").val(),
				name_val = $("#name").val(),
				phone_val = $("#phone").val(),
				code_val = $("#code").val(),
				send_data = null;

			if(card_val == "") {
				error(".card_box", "请输入您的员工编码！");
			} else if(!names.test(name_val)) {
				error(".name_box", "您输入的姓名有误！");
			} else if(!phones.test(phone_val)) {
				error(".phone_box", "您输入的手机号码有误！");
			} else if(code_val == "") {
				error(".cod_box", "请输入您的验证码!");
			} else {
				$("#erro_mesg").html("");
				send_data = {
					card: card_val,
					name: name_val,
					phone: phone_val,
					code: code_val
				}
				console.log(send_data)
				time("success");
			}

		})
		
		//错误提示
		function error(obj, msg) {
			$("#erro_mesg").html(msg)
			$(obj).addClass("input_error");
		}

		//倒计时
		function time(type) {
			var num = null,$dom=null,timer=null;
			clearInterval(timer);
			if(type=="success"){
				$(".success").show().siblings().hide();
				 num = 3;
				 $dom=$("#time");
			}else{
				 $("#get_code").hide().siblings("#time_out").show();
				 num = 60;
				 $dom=$("#time_out span");
			}
			
			 timer = setInterval(function(){
				num--;		
				if(num == 0) {
					clearInterval(timer);
					if(type == "success"){
						window.location.href = "../personal/personal.html";
					}else{
						 num = 60;
						 $("#time_out").hide().siblings("#get_code").show();
					}
				}
				$dom.html(num);	
			}, 1000)
		}
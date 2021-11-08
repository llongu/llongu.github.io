$(function(){
	
//$.ajax({
// 		type:"post",
// 		url:"",
// 		data:{
// 			username:names,
// 			plate:plates,
// 			tel:tels,
// 			idcard:idcards
//
// 		},
//		dataType:"json",
// 		success:function(zhusu)	{
//			
// 		//接收分数
//		$(".my_score_round .my_score").html()
// 		//接收刮奖礼品
//		$(".gift_main span").html("饥饿")
// 		
// 			}
//	})
//	
	
	
	
	
	//		晒晒成绩单按钮
		$(".sun_score").click(function(){
			
			$(".share_box").show();
		})
	//		分享关闭按钮
		$(".share_box .share_close").click(function(){
			
			$(this).parents(".share_box").hide();			
		})
		
		$(".share_close").click(function(){
			
			$(this).parents(".index_pop_up").hide();			
		})
	
	
	//没刮到将的返回首页
	$(".go_index").click(function(){
		
		window.location.href="index.html";
		
	})
	
	

	
	
	
	
	
	
	
		//刮奖开始
			addEventListener( "load", init, false );

			var notice = 0;//等于0  判断为false

			function init( event ) {
		//                  completeFunction: function() {  alert("gg") }//擦除比率达到后执行的函数 用于直接判断	
		
			 $('#redux').eraser({
                    size: 20,
                    completeRatio: 1,
                    progressFunction: function(p) {//接收比率 用于多次判断  
                        var progress = Math.round(p*100);//转换整数
                        if(!notice){/*开始*/
                      
                            if(progress >= 45){
                                notice = 1;
                                $('#redux').eraser('clear');
                                setTimeout(function(){
                                	$(".index_pop_up").show();//弹窗显示
                                },1000)
                                
                                
                                var random = Math.round(Math.random()*3);//创建随机数
                                
                                if(random == 1){//如果5折柚子卷
                                   $(".gift_yes").show();//中奖显示
                                   $(".five_gift_form_main").show();//5折卷
                                   
                                }else if(random == 2){//如果 2折柚子卷
                                	$(".gift_yes").show();//中奖显示
                                	$(".aiqiyi_gift_form_main").show();//爱奇艺卷里的2折卷
                                	$(".two_gift").show();//2折柚子卷显示
                                	$(".car_div").hide();//车牌隐藏
                                	$(".card_div").hide();//身份证隐藏
                                	
                                }else if(random == 3){//如果爱奇艺月卡 如果爱奇艺季卡 如果 油卡
                                	 $(".gift_yes").show();//中奖显示
                                	 $(".aiqiyi_gift_form_main").show();//爱奇艺卷显示
                                	 $(".two_gift").hide();//2折柚子卷隐藏
                                	$(".letter_bottom_text").hide();//文字隐藏
                                	
                                }else if(random == 0){//如果都没有
                                	$(".gift_no").show();
                                }
                                
                            }
                        }/*结束*/else{
//                      	alert("no")
                        }
                    }
                });
			}
		
			
			
//			确定按钮表单验证
		var names=/^[\u4E00-\u9FA5]{1,6}$/; /*[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
		var phones=/^1[34578]\d{9}$/;
		var addres=/^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]+/;
		var cars=/(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;
		var cards=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		

		$(".sure_button").click(function(){
	
			form_go();
			
			
		})
		
	//已保存关闭按钮
	$(".index_pop_up2 .share_close").click(function(){
		
		
	})
			
			
			
			



//表单判断
function form_go(){
		var form_num=0;//判断有几个个INPUT填写正确
		var nums=0;//判断有几个INPUT
		var names_val,phone_val,addres_val,car_val,card_val;
		var arr_val=[];
		var form_main=$(".gift_form_main");
			for(i in form_main){
				if(form_main.eq(i).css("display")=="block"){
					var inputs=form_main.eq(i).find("input");
					for(a=0;a<inputs.length;a++){
						//判断当前表单是否显示
						if(inputs.eq(a).is(":visible")) {
							nums+=1;
							console.log(inputs.eq(a).attr("id"))
								if(inputs.eq(a).attr("id")=="name_text"){
									if(!(names.test(inputs.eq(a).val()))){//输入如果不正确
										inputs.eq(a).attr("placeholder","请输入正确姓名");
										inputs.eq(a).css("borderColor","black");
										
									}else{
										inputs.eq(a).css("borderColor","#e53c0d")
										form_num+=1;
										arr_val.push(inputs.eq(a).val());
									}
								}else if(inputs.eq(a).attr("id")=="phone_number"){
									if(!(phones.test(inputs.eq(a).val()))){
										inputs.eq(a).attr("placeholder","请输入正确电话");
										inputs.eq(a).css("borderColor","black")
									}else{
										inputs.eq(a).css("borderColor","#e53c0d");
										form_num+=1;
										arr_val.push(inputs.eq(a).val());
									}
								}else if(inputs.eq(a).attr("id")=="addres_text"){
									if(!(addres.test(inputs.eq(a).val()))){
										inputs.eq(a).attr("placeholder","请输入正确地址");
										inputs.eq(a).css("borderColor","black")
									}else{
										inputs.eq(a).css("borderColor","#e53c0d");
										form_num+=1;
										arr_val.push(inputs.eq(a).val());
									}
								
								
								}else if(inputs.eq(a).attr("id")=="car_number"){
									if(!(cars.test(inputs.eq(a).val()))){
										inputs.eq(a).attr("placeholder","请输入正确车牌");
										inputs.eq(a).css("borderColor","black")
									}else{
										inputs.eq(a).css("borderColor","#e53c0d");
										form_num+=1;
										arr_val.push(inputs.eq(a).val());
									}
								
								}else if(inputs.eq(a).attr("id")=="card_number"){
									if(!(cards.test(inputs.eq(a).val()))){
										inputs.eq(a).attr("placeholder","请输入正确身份证号码");
										inputs.eq(a).css("borderColor","black")
									}else{
										inputs.eq(a).css("borderColor","#e53c0d");
										form_num+=1;
										arr_val.push(inputs.eq(a).val());
									}
								}
								
						}
					}
				}
			}
//			console.log(nums)
//			console.log(form_num)
		if(nums==form_num){
			alert(arr_val)
			$(".index_pop_up2").show();//已保存
			setTimeout(function(){
				window.location.href="index.html";				
			},2000)
		}
}



})//最后
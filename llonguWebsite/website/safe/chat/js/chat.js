		import 'jquery'
		var msg_main=document.getElementById("msg_main");
		var msg_div=msg_main.getElementsByClassName("msg_box");
		var send_box=document.getElementById("send_box");
		var scrollHeight=send_box.clientHeight;
		
		LastMsg();
			
		document.getElementById("send_msg").addEventListener("input",function(){
			LastMsg();
			//send_box 高度变化 滚动条位置不变
			if(send_box.clientHeight-scrollHeight>0){
				msg_main.scrollTop=msg_main.scrollTop+(send_box.clientHeight-scrollHeight);
			}
			scrollHeight=send_box.clientHeight;
		})
		
		//最后一条信息间距
		function LastMsg(){
			msg_div[msg_div.length-1].style.marginBottom=send_box.clientHeight+"px";
		}
		//重置
		function TestMsg(){
			msg_div[msg_div.length-1].style.marginBottom=0;
		}
		//插入新消息 去除margin  赋值margin  插入  滚动条置底
		function NewMsg(msg){
			TestMsg();
			$("#msg_main").append(msg);
			LastMsg();
			$("#msg_main").animate({
				"scrollTop":msg_main.scrollHeight
			})
		}
		

				//提示
//				layer.open({
//					content: '',
//					skin: 'msg',
//					time: 3 //2秒后自动关闭
//				});
	//send  
	$("#send_button").click(function(){
		var msg=$("#send_msg").text();
			if(msg.trim()=="")return;
		var time=new Date().Format('hh:mm:ss');
		var selfMsg='<div class="msg_box self">'+
					'<div class="msg_img"><img src="img/people.png" alt="" /></div>'+
					'<div class="msg_text">'+msg+'</div>'+
					'<div class="msg_time ">'+time+'</div>'+
					'</div>';
					
		//清空  
		$("#send_msg").empty();
		//插入
		NewMsg(selfMsg);
		//回复
		setTimeout(function(){
			 replys()
		},1000)
	})

	function replys(){
		var msgArr=['呵呵','废话','你再说一次试试？','骚等一下嘛！','数据匹配中请稍后...','无聊'];
		var time=new Date().Format('hh:mm:ss');
		var otherMsg='<div class="msg_box other">'+
					'<div class="msg_img"><img src="img/people.png" alt="" /></div>'+
					'<div class="msg_text">'+msgArr[Math.floor(Math.random()*msgArr.length)]+'</div>'+
					'<div class="msg_time ">'+time+'</div>'+
					'</div>';	
		//清空  
		$("#send_msg").empty();
		//插入
		NewMsg(otherMsg);			
	}
	
		
		
	// 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

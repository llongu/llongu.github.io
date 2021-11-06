import 'jquery'

var TouchMoveFn=function(options){
			var name=options.substring(0,1),dom=null,events,x,y,xN,yN;
			switch (name){
				case "#":
					dom=document.getElementById(options.substring(1,options.length))
					break;
				case ".":
					dom=document.getElementsByClassName(options.substring(1,options.length)).item(0);
					break;	
				default:
					dom=document.getElementsByTagName(options).item(0);
					break;
			}
			
			hasTouch()=="touchstart" ? dom.addEventListener("touchstart",Movestart,false) : dom.addEventListener("mousedown",Movestart,false);
			
			function Movestart(e){
				if(hasTouch()=="touchstart"){
					events=e.targetTouches[0];
					document.addEventListener("touchmove",Moveing,false);
					document.addEventListener("touchend",Moveleave,false);
				}else{
					events=e||event;
					document.addEventListener("mousemove",Moveing,false);
					document.addEventListener("mouseup",Moveleave,false)
				}
				x=events.pageX-dom.offsetLeft;
				y=events.pageY-dom.offsetTop;
			}
			
			function Moveing(e){
				e.preventDefault();
					hasTouch()=="touchstart" ?events=e.targetTouches[0] : events=e||event;
					var xN=events.pageX-x;
					var yN=events.pageY-y;
					xN -15 < 0 ? xN = 0:null;
					yN -15 < 0 ? yN = 0:null;
					xN + dom.clientWidth + 15 >= document.documentElement.clientWidth ? xN = document.documentElement.clientWidth - dom.clientWidth:null;
					yN + dom.clientHeight + 15>= document.documentElement.clientHeight ? yN = document.documentElement.clientHeight - dom.clientHeight:null;
//					dom.style.left=xN+"px";
					dom.style.top=yN+"px";
			}
			
			function Moveleave(e){
				document.removeEventListener("touchmove",Moveing);
				document.removeEventListener("mousemove",Moveing);
				document.removeEventListener("mouseup",Moveleave);
			}
			
			function hasTouch(){
		        var touchObj={};
		        touchObj.isSupportTouch = "ontouchend" in document ? true : false;
		        touchObj.isEvent=touchObj.isSupportTouch?'touchstart':'click';
		        return touchObj.isEvent;
   	    	}
		}
		
	TouchMoveFn("#round")
				//提示
	//				layer.open({
	//					content: '',
	//					skin: 'msg',
	//					time: 3 //2秒后自动关闭
	//		});
	
	//点击签到
	$("#click_sign").click(function(){
		if($(this).html()=="已签到")return;
		$(this).html('已签到')
		//经验值
		var min=Number($("#min").html());
		var max=Number($("#max").html());
		//天数,积分增加
		Day_add();
		
		//判断是否升级
		if(min+1000>=max){
			$("#min").html(max-min);
			//等级增加
			Grade_add();
		}else{
			$("#min").html(min+1000);
		}
		Bar_num();
	})
	//经验条计算
	Bar_num();
	function Bar_num(){
		$(".personal_grade_bar_num").css("width",Number($("#min").html())/Number($("#max").html())*100+"%")
	}
	//天数,积分增加
	function Day_add(){
		$("#integral_add").html(Number($("#integral_add").html())+1000);
		$("#all_day").html(Number($("#all_day").html())+1);
		$("#sign_day").html(Number($("#sign_day").html())+1);
	}
	//等级增加
	function Grade_add(){
		$("#grade_num").html(Number($("#grade_num").html())+1);
		$("#grade_next").html(Number($("#grade_next").html())+1);
	}

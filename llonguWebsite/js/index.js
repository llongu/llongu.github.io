

	
		$('.banner').height($(window).height())
			$("#time_warp").css({"opacity":"1","transition":"all 1s  ease"})
			IronM();
			Opus();
		
		
			


//监听滚动
var Smyself=350,Stitle=900,Spen=1300;
$(window).scroll(function(){
	var scroll=document.body.scrollTop || document.documentElement.scrollTop;
		if(scroll>=Smyself){
			Smyself=$('body').height();
			//个人信息
			$(".p1").alertWhileClick({
				settime:"120",
				sign:"|"
			})
		}
		//我会什么
		if(scroll>=Stitle){
			Stitle=$('body').height();
			$(".what_can h2").css("transform","translateY(0)");
			var can_line=$(".can_line"),m=-1,timer;
			timer=setInterval(function(){
					m++;
					can_line.eq(m).css("width","100%")
					if(m>can_line.length){clearInterval(timer)}
			},900)
		}
		//笔
		if(scroll>=Spen){
			Spen=$('body').height();
			$(".works_show .pen").css("marginTop","-2px")
		}
})
//时间效果
function gettime(){
	var windowtime=new Date(),
	    hours=windowtime.getHours(),//小时
	    minute=windowtime.getMinutes(),//分钟
	    second=windowtime.getSeconds(),//秒数
	    _time=$("#time"),
	    hours1_text=_time.find(".hours1"),//小时1
	    hours2_text=_time.find(".hours2"),//小时2
	    minute_text=_time.find(".minute"),//分钟
	    second_text=_time.find(".second"),//秒数
	    fenhao_text=_time.find(".fenhao"),//分号
	    hours=hours+"",
	    a=hours.split("");
	
		//console.log(a.length)
		if(a.length>1){
			hours1_text.html(a[0]);
			hours2_text.html(a[1]);
			hours1_text.css("marginRight","-5px")
			
		}else{
			hours1_text.html(a[0]);
		}
		
		if(second>9){
			second_text.html(second);
			
		}else{
			second_text.html("0"+second);
		}
		minute_text.html(minute);
		fenhao_text.html(":")
}
setInterval(gettime,1000);

//作品
function Opus(){
		 var list = $('.portfolio-items'),
		 	showVisibleItems=function(){
		 		list.children('.item:not(.falldown)').each(function(el, i){
		          var $this = $(this);
		          if($this.isVisible()){
		            $this.addClass('falldown');
		          }
		        });
		 	};
		 	showVisibleItems();
	  
			  list.scroll(function(){
			    showVisibleItems();
			  });
		  
			  list.mousewheel(function(event, delta) {
			      this.scrollLeft -= (delta * 60);
			      event.preventDefault();
			   });
}


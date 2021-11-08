	import 'jquery'
	//排序
	var sortArr,$Num=null;
	
	
	$(".sort_box").click(function(){
		var $this=$(this);

		$Num=Number($this.attr('data-sortNum'));
		$Num==0 ? $Num=2:$Num--;
		$this.attr('data-sortNum',$Num);
		
		//状态
		$this.addClass('sortOrange')
		if($Num==0){
			$this.removeClass('sortOrange')
		}else if($Num==1){
			$this.find(".icon-arrowt").addClass("sortGray").siblings().removeClass("sortGray");
		}else if($Num==2){
			$this.find(".icon-arrowb").addClass("sortGray").siblings().removeClass("sortGray");
		}
		SendSort();
	})
	

	//轮播
	layui.use('carousel', function(){
				var carousel = layui.carousel;
				//建造实例
				carousel.render({
				    elem: '.banner'
				    ,width: '100%' //设置容器宽度
				    ,height:"5rem"
				    ,arrow: 'none' //不显示箭头
				      ,anim: 'default' //切换动画方式
				      ,autoplay:true
				      ,indicator:"block"

				});
	});
	
	//搜索
		$("#search").on({
		    focus:function(){
		    	$(this).attr("placeholder","请输入关键词搜索")
				$(".search_lable span").hide();
				$(this).css("text-align","left")
				$(".search_lable").css({"text-align":"left"})
		    },
		    blur:function(){
			    if($(this).val()==""){
					$(this).attr("placeholder","")
					$(this).css("text-align","center")
					$(".search_lable span").show();
					$(".search_lable").css({"text-align":"center"})
				}
		    },
		    search:function(){//提交
		    	console.log($(this).val())
		    },
		    input:function(){
		    	
		    }
		});
		
		
		/*排序 Send  0==>取消 1==>低 2==>高*/
		function SendSort(){
			sortArr=[];
			for(var i=0;i<$(".sort_box").length;i++){
				sortArr.push(Number($(".sort_box").eq(i).attr('data-sortNum')));
			}
			console.log(sortArr)
		}
		
		
		$(".nav_main li").click(function(){
			$(this).addClass('nav_li').siblings().removeClass('nav_li');
		})
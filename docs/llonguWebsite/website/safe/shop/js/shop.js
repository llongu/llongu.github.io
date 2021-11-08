	import 'jquery'
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
				      ,indicator:"none"

				});
	});
	
	//类型选择
	$(".sort_type ").click(function(){
		if(!$(".dropdown").is(":hidden")){
			$(".dropdown").fadeOut();
		}else{
			$(".dropdown").fadeIn();
		}

	})
	
	//下拉菜单
	$(document).on("click",".dropdown li",function(e){
		e.stopPropagation();
		var $this=$(this);
		$this.addClass("dropdown_active").siblings("li").removeClass("dropdown_active");
		$(".dropdown").fadeOut();
		$(".sort_type .sort_title").html($(this).html()).addClass("sortOrange");
		//排序
		$this.parent().siblings(".sort_type").attr('data-sortNum',$this.attr('data-value'));
		SendSort();
	})
	
	//排序
	var sortArr,$Num=null;
	
	$(".sort_box").not(".sort_type").click(function(){
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
	
	//商品加减
	function ShopWay(way){
			var num=Number($("#ShopNum").val());
			if(way=='puls'){
				num++;
			}else if(way=='minus'){
				num--;
			}
			if(num<1){num=1}
			if(num>parseInt($(".detail_title_save").text())){num=parseInt($(".detail_title_save").text())}
			$("#ShopNum").val(num)
			$("#ShopPrice").html(num*Price)
			
			$("#sure_ShopNum").html('x'+num)
			$("#sure_ShopPrice").html(num*Price);
	}
	
	//关闭
	$(".close,.no_intagral").click(function(){
		$(".pop,.sure_change").hide();
	})
	

					//提示
//				layer.open({
//					content: '',
//					skin: 'msg',
//					time: 3 //3秒后自动关闭
//				});

	/*Send  0==>取消 1==>低 2==>高*/
	function SendSort(){
		sortArr=[];
		for(var i=0;i<$(".sort_box").length;i++){
			sortArr.push(Number($(".sort_box").eq(i).attr('data-sortNum')));
		}
		console.log(sortArr)
	}
	
	
	//<a href="shop_detail.html">兑换</a>
	$(".change_button").click(function(){
		
	})
	
	function rule_pop(e){
		if(e){
			$(".pop,.rule_pop").show()
		}else{
			$(".pop,.rule_pop").hide()
		}
	}
	
	//兑换
		$("#change_button").not(".change_button_false").click(function(){
			$(".pop,.sure_change").show();
		})
		//确定兑换
		$(".sure_button").click(function(){
			window.location.href="success.html"
		})
		
		//商品加减
		var Price=Number($("#ShopPrice").html());
		$("#puls").click(function(){
			ShopWay('puls')
		})
		$("#minus").click(function(){
			ShopWay('minus')
		})
		$("#ShopNum").on("input",function(){
			ShopWay()
		})
		
	window.rule_pop=rule_pop;

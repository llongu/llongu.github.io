	import 'jquery'
	//类型
	$(".search_type ").click(function(){
		if(!$(".dropdown").is(":hidden")){
			$(".dropdown").fadeOut();
		}else{
			$(".dropdown").fadeIn();
		}
	})
	
	//下拉菜单
	$(document).on("click",".dropdown li",function(e){
		e.stopPropagation();
		$(this).addClass("dropdown_active").siblings("li").removeClass("dropdown_active").parent().siblings("span").html($(this).html());
		$(".dropdown").fadeOut();
	})
				//提示
//				layer.open({
//					content: '',
//					skin: 'msg',
//					time: 3 //2秒后自动关闭
//				});
		//搜索
		$("#search").on({
		    focus:function(){
		    	$(this).attr("placeholder","请输入关键词搜索").css("text-align","left")
		    	$('.search_lable').css({"text-align":"left"}).find('span').hide()

		    },
		    blur:function(){
			    if($(this).val().trim()==""){
					$(this).attr("placeholder","").css("text-align","center")
					$('.search_lable').css({"text-align":"center"}).find('span').show()
				}
		    },
		    //提交
		    search:function(){
		    	 if($(this).val().trim()=="")return;
		    		Search($(this).val())
		    },
		    input:function(){
		    	
		    }
		});
		
		//关键词
		$(".keyword").click(function(){
			$("#search").focus()
			$("#search").val($(this).text());
			Search($(this).text())
		})	
		
		//send
		function Search(val){
			console.log(val)
			console.log($(".dropdown_active").text())
		}
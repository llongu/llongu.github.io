 $(function(){
 	//请求剩余游戏次数  历史分数
// 	$.ajax({
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
 	
 	
 	//首页文字动画
	function animations(){
		$(".fenbi").css({"animation":"fenbi 2s linear "});
		$(".black_text i").hide();
		var time_i=$(".black_text i");
		var times=1000;
		for(var i=0;i<time_i.length;i++){
			time_i.eq(i).fadeIn(times+=500)
		}
	}
		 	
				 //图片加载
            function imgLoad(arr,callBack){
                var len = arr.length;//所有图片的个数
                var imgs = {};//创建一个空的JSON,去存我们的所有图片
                var loaded = 0;//记录我们加载了多少张图片
				 
				var maths=100/len;//增加的百分比
				var baifenbi=0;//增加的百分比
				var num=0;//进度条的百分比
				var kaiguan=true;
				
				
				var loading_blue_num=($(".loading_line_box").width()-$(".loading_blue").width())/100;
				var loading_blue=10;//蓝色盒子进度
                for(var i = 0; i < len; i ++){
                    var img = new Image();
                    img.onload = function(){
//                     loaded ++ ;//增加了一张图片
                   	   baifenbi+=maths;//每次加载图片增加的百分比
             	function loading(){
                 
                   	   	var timer=setInterval(function(){
                   	   		num++;
                   	   		loading_blue+=loading_blue_num;//每次增加平均的像素
                   	   		
						if(num>baifenbi){
							clearInterval(timer)
							kaiguan=true;
						}
						if(num==100){//加载完成
							num=100;
							setTimeout(function(){
								$(".loading_warp").hide();
                          	 	$(".index_warp").show();
                          	 	
                          	 	setTimeout(animations(),2500);
                          	 	
							},1000)
							
						}
						console.log(num)
						$(".loading_line").css("width",num+"%")	
						$(".loading_round").css("left",(num-10)+"%")				
						$(".loading_blue").css("left",loading_blue+"px")	
						$(".loading_blue").html(num-1+"%")	
						},1000/24)
                   	   	
                }
             	
                 	 if(kaiguan==true){
							loading();
						}
						kaiguan=false;
                   	   
						//加载完成
//                     if(loaded == len){
//                           //loading加载完毕
//                           setTimeout(function(){
//                           	
//                           	console.log(arr.length)
//             				 },1000);
//               				
//                           callBack();
//                    }
                    }
                    
                    img.src = arr[i];
                    
//                 if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
//						document.getElementsByClassName("loading_warp").item(0).style.display="none";//加载图片隐藏
//						callBack();
//   					return; // 直接返回，不用再处理onload事件
//				}
                    var name1 = arr[i].split("/");
                    var name2 = name1[name1.length-1]; 
                    var name = name2.split(".")[0];
                    imgs[name] = arr[i];
//                   console.log(imgs);
                }
                
            }
		
             //存放预加载图片数组 

            var  arr = [
            "images/img/beign.png",
            "images/img/gift.png",
            "images/img/book.png",
            "images/img/game.png",
            "images/img/close.png",
            "images/img/my_gift.png",
            "images/img/game_over.jpg",
            "images/img/game_rule.jpg",
            "images/img/my_score_bg.jpg",
            "images/img/my_score.png",
            "images/img/shares.png",
            "images/img/close.png",
            "images/img/a.png",
            "images/img/b.png",
            "images/img/c.png",
            "images/img/d.png",
            "images/img/a1.png",
            "images/img/b1.png",
            "images/img/c1.png",
            "images/img/d1.png",
            "images/img/title.png",
            "images/img/next.png",
            "images/img/yes.png",
            "images/img/people2.png",
            "images/img/index_bg2.jpg",
            "images/img/fenbi.png",
            "images/img/game_bg.jpg",
            "images/img/my_score_round.png"//28
            ];
            
//			 imgLoad(arr,function(){
//          setTimeout(function(){
//                    			 document.getElementsByClassName("loading").item(0).style.display="none";//加载图片隐藏
//             				 },1000);
//        });


		 




//		点击开始
		$(".button_begin").click(function(){
			//如果达到次数
//			$(".index_pop_up").show();
//			$(".game_over").show();
		
//			游戏界面显示	
			$(this).parents(".index_warp").hide();
			
			$(".game_begin_warp").show();
			//游戏时间开始
			setTimeout(fiftimes,1000)

		})
		
//		我的奖品		
		$(".button_gift").click(function(){
			$(".index_pop_up").show();
			$(".my_gift_main").show();
			//如果有奖品
			$(".my_gift_yes").show();
			$(".my_gift_no").hide();
			//如果没有奖品
//			$(".my_gift_no").show();
//			$(".my_gift_yes").hide();
		})
		

//		游戏规则
//		$(".button_game").click(function(){
//			$(".index_pop_up").show();
//			$(".game_rule").show();
//		})
//		关闭按钮
		$(".index_close").click(function(){
			
			$(this).parent().hide();
			$(".index_pop_up").hide();
		})
		
//		我的证书
		$(".button_book").click(function(){
			
			$(".my_book").css("transform","scale(1)")
		})
//		晒晒成绩单按钮
		$(".sun_score").click(function(){
			
			$(".share_box").show();
		})
//		分享关闭按钮
		$(".share_close").click(function(){
			
			$(this).parents(".share_box").hide();			
		})
//      我的证书返回		
		$(".go_back").click(function(){
			$(".my_book").css("transform","scale(0)")
		})
		

//ABCD选项点击效果
		function buttonclick(){
			for(var i=0;i<$(".game_abcd button").length;i++){
			var other_src=$(".game_abcd button").eq(i).find(".button_bg").attr("src");
				if(other_src.indexOf("1")>-1){
						var splits=other_src.split("1")
						var srcs=splits.splice(",",1)
						$(".game_abcd button").eq(i).find(".button_bg").attr("src",srcs+".png");
				
				}
			}
		}	
		
//                   ABCD选项	
		// 正确答案 
 		var answers_button="";
 		
$(".game_abcd").find("button").click(function(){
			buttonclick();
			var imgs=$(this).find(".button_bg");
			var srcs=imgs.attr("src");
			console.log(srcs)
			var splipt_src=srcs.split(".");
//			console.log(splipt_src)
				if(splipt_src[0].indexOf("1")>-1){
						
				}else{
//					$(this).find(".button_bg").attr("src",splipt_src[0]+"."+splipt_src[1]+"."+splipt_src[2]+1+".png")
					$(this).find(".button_bg").attr("src",splipt_src[0]+1+".png")
				}
			
         	 answers_button=srcs;
		})		
	
/*---------------------游戏开始---------------------*/

	//设置分数
	var socre=0;
		
//			游戏时间
			var fiftime=15;
			var cleartime=null;		
		function fiftimes(){
		cleartime=setInterval(function(){
				fiftime--;
				if(fiftime<=0){
					fiftime=0;
					alert("游戏结束")
				}
			$(".game_loading .times").find("span").html(fiftime)		
				
			},1000)
			
		}
			
			
 			//存放10个不同随机数的数组
            var arr2 = [];

            //产生5个不重复的随机数
            function my_ran(n,min,max){
              var arr1=[];
              for(var i=0;i<max-min+1;i++){//i小于30
                arr1[i]=i+1;//0+1 1+1 2+1 3+1 
//              console.log(arr1[i])
              }
              for(var i=0;i<n;i++){//循环5次
                var x=parseInt(Math.random()*arr1.length);
                arr2[i]=arr1[x];//存入5个arr1里面的随机数组给arr2
//              console.log(arr2[i])
                for(var j=x;j<arr1.length;j++){//j等于随机数X  j（随机数）要 小于30 
                  arr1[j]=arr1[j+1];	
                }
                arr1.length=arr1.length-1;
             
              }
              
            }

            my_ran(10,1,30); 
          console.log(arr2);
          
			//答题图片预加载，添加进arr数组
            function imgInsert(){
                for(var i = 0;i < 10;i++){
                    var arrLength = arr.length;//数组里面图片的长度 每次要相对应的加1张
                    arr[arrLength] = "images/pictures/picture" + arr2[i] + ".png";
                    arr[arrLength + 1] = "images/answers/answer" + arr2[i] + "-1.png";
                    arr[arrLength + 2] = "images/answers/answer" + arr2[i] + "-2.png";
                    arr[arrLength + 3] = "images/answers/answer" + arr2[i] + "-3.png";
                    arr[arrLength + 4] = "images/answers/answer" + arr2[i] + "-4.png";
//              	console.log(arrLength)
                }
            }
            imgInsert();
           
            imgLoad(arr);//存进预加载

			 //获取的类名
            var objClass = "";
            //文字
            var title_text="";
            //更换题目
            function subject(args){
				//中间图片
				$(".game_picture").find("img").attr("src","images/pictures/picture" + args + ".png")
				//ABCD选项
				$(".a_button .text_pictures").find("img").attr("src","images/answers/answer" + args + "-1.png")
				$(".b_button .text_pictures").find("img").attr("src","images/answers/answer" + args + "-2.png")
				$(".c_button .text_pictures").find("img").attr("src","images/answers/answer" + args + "-3.png")
				$(".d_button .text_pictures").find("img").attr("src","images/answers/answer" + args + "-4.png")

				for(var i in answers){//循环json数组
                    if(i.indexOf("title") > -1){
                        var num = parseInt(i.substring(5));//截取题目
                     	  
                        if(args == num){//是否等等1到30
                        	if(args==19){//某个问题字体大小
                        		$(".game_question").css("fontSize","0.32rem")
                        	}else{
                        		$(".game_question").css("fontSize","0.4rem")
                        	}
                        	
                            objClass = answers[i][0].result;//判断  是哪个正确答案
							title_text=answers[i][0].texts;
							//问题文字
							$(".game_question ").html(title_text);
                            
                            console.log(objClass + ' ' + i);//正确按钮和  是第多少个logo数组
                     	   }
                        }
                }
            }
            
			subject(arr2[0]);
			
//			题目++
			var subjectNum=0;

//			游戏进度
			var time_line=10;
			
//          头部题目
			var  game_title= ["一", "二", "三", "四", "五", "六", "七", "八", "九","十"];   
			
	
            
		//下一题
		$(".next_button").click(function(){
			
				subjectNum++;
				time_line+=10;
				
				//更新题目
				setTimeout(function(){
                     
                     subject(arr2[subjectNum]);
                     //更新点击效果
                      buttonclick();
                 },1000);
                 //更新头部标题
	          	 	$(".game_title span").html();
	          	 //更新时间
	          		fiftime=16;
	            	clearInterval(cleartime);
                 	fiftimes();
			   //游戏进度
			  		 if(time_line>=100){time_line=100;}
			  		 $(".game_loading_main").css("width",time_line+"%");
			   //文字进度
			 		 $(".loading_texts span").html(subjectNum+1);
			   //头部题目
			  		 $(".game_title span").html(game_title[subjectNum]);
			  	//判断答题是否正确
//			  	console.log(answers_button)
			  	var answers_button_split=answers_button.split("/");
//			  	console.log(answers_button_split)
			  	if(answers_button_split[answers_button_split.length-1].indexOf(objClass)>-1){
			  		console.log("正确")
			  		socre+=10;//分数10
			  	}else{
			  		console.log("错误")
			  	}
			  	answers_button="";//清空src
			  	//判断答题是否完成
			  	if(subjectNum==9){
			  		$(this).find("img").attr("src","images/img/yes.png");
			  		console.log(socre)
			  	}
			  	if(subjectNum>9){//答题完成
			  		window.location.href="socre.html?socre="+socre; 
			  		$(".my_score_round .my_score").html(socre);//我的整数分数
			  		$(".next_button").off("click");
			  		}
			  	
			  	
			})



})
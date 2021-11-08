;(function(){
	var game=window.game=function(params){
	
		//读取资源
		this.Data=params.Data;
		//图片计数
		this.imgNum=0;
		//游戏分数
		this.score=0;
		//游戏时间
		this.ss=60;
		this.ms=9;
		//游戏时间定时器
		this.timeTimer=null;
		//商品创建定时器
		this.goodsTimer=null;
		//商品创建开关
		this.timerSwitch=true;
		//商品创建定时器速度
		this.timerNum=350;
		//商品创建及分数标识
		this.num=0;
		//设置商品连续点击分数阶段
		this.startNum=200;
		this.endNum=400;
		//创建文件对象 n
		this.R={};
		//this绑定
		var self=this;
		
			//开始游戏
			this.loadAllResource(function(){
				//初始化
				InitData();
			})
	}
	
	//开始游戏
	game.prototype.start=function(){
			var self=this;
				//重置所有数据
				this.score=0;
				this.ss=60;
				this.ms=9;
				this.timerSwitch=true;
				this.timerNum=350;
				this.num=0;
				this.startNum=200;
				this.endNum=400;
			
				//定时创建
				self.goodsTimer=setInterval(function(){
					self.creatGoods();
				},self.timerNum)
				//点击监听
				self.click();
				//启动倒计时
				self.time();
				
	}
	
	//读取资源
	game.prototype.loadAllResource=function(callback){
		var self=this;
		
		self.imgNum=0;//图片计数
		//请求json文件
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			
			if(xhr.readyState==4){
				var data=JSON.parse(xhr.responseText);
				var loadNum=Math.ceil(100/data.images.length);
				var loadNum2=0;
				for(var i=0;i<data.images.length;i++){
					self.R[data.images[i].name]=new Image();//创建图片对象
					self.R[data.images[i].name].src=data.images[i].url;//赋值url
					self.R[data.images[i].name].state=data.images[i].state;//赋值状态
					self.R[data.images[i].name].onload=function(){
						self.imgNum++;
						loadNum2=self.imgNum*loadNum;
						if(loadNum2>=100){
							loadNum2=100;
						}
						//提示文字
						var texts="资源加载中"+loadNum2+"%"+"请稍后...";
						$("#loadingText").html(texts);
						//全部图片加载完毕
						if(self.imgNum==data.images.length){
							callback();
						}
					}
					
				}
			
//				console.log(data.images.length)
			}
			
		}
		
		xhr.open("get",this.Data,true);
		xhr.send(null);
	}
	
	//创建商品
	game.prototype.creatGoods=function(){
				var self=this;
					self.num++;
					var good=new goods();
				
				var Div=document.createElement("div");
					Div.className="goods goods"+self.num;
					Div.setAttribute("data-state",good.state);//商品状态
					Div.setAttribute("data-click","yes");//商品点击标识
					Div.style.width=good.w/75+"rem";
					Div.style.height=good.h/75+"rem";
					Div.style.left=good.x+"px";
					Div.style.top=good.y+"px";
						//在此阶段图片放大
						if(self.score>=self.startNum && self.score<=self.endNum){
							Div.style.width=good.w/65+"rem";
							Div.style.height=good.h/65+"rem";
						}
					Div.innerHTML='<img src='+good.image.src+'>';
//					Div.innerHTML='<img src="img/goods1.png">';
					
					$("#game_main").append(Div)
					
						//在此阶段禁止清除
						if(self.score>=self.startNum && self.score<=self.endNum){
						
						}else{
							//定时清除
							self.clear("goods",self.num);
						}
					
//					clearInterval(self.goodsTimer);
		
	}
	
	//创建加减分数状态
	game.prototype.creatScore=function(ScoreImg,place,width){
				var self=this;
					self.num++;
					
				var Div=document.createElement("div");
					Div.className="scoreMove scoreMove"+self.num;
					Div.style.left=place.left+width+"px";
					Div.style.top=place.top-10+"px";
				
					
					//分数右边显示禁止超出屏幕  118（分数宽度）
					if(parseInt(Div.style.left)+118>window.screen.width){
						Div.style.left=window.screen.width-118+"px";
					}
					
					Div.innerHTML='<img src='+ScoreImg+'>';
					$("#game_main").append(Div)
					
					//做动画
					$(".scoreMove"+self.num).animate({
						"top":$(".scoreMove"+self.num).offset().top-50,
						"opacity":"0"
					},800,function(){
						$(this).remove();
					})
					
					//如果大于此阶段后重启定时器
					if(self.score>self.endNum && self.timerSwitch){
						//递增
						self.startNum+=400;
						self.endNum+=400;
						self.timerSwitch=false;
						clearInterval(self.goodsTimer);
						self.goodsTimer=setInterval(function(){
							self.creatGoods();
						},self.timerNum)
					}
					//定时清除
//					Begin.celars("scoreMove",num);
	}
	
	//定时清除
	game.prototype.clear=function(name,num){
		var self=this;
				setTimeout(function(){
					$("."+name+num).remove();
				},1300)
	}
	
	//点击监听
	game.prototype.click=function(){
			var self=this;
				//监听点击
				$(document).on("click",".goods",function(){
//						//限制点击
						if($(this).attr("data-click")=="yes"){
							$(this).attr("data-click","false");
							//传入this+自身位置+自身宽度
							self.state($(this),$(this).offset(),$(this).width());	
						}
				})
	}
	
	//状态判断
	game.prototype.state=function(This,place,width){
			var self=this;
				//获取状态
				var state=This.attr("data-state")
				//加减分数				
				var ScoreImg=null;
				switch (state){
					case "+10":
						self.score+=10;
						musicPlay("click");
						ScoreImg=self.R.score10.src;
						break;
					case "+20": 
						musicPlay("click");
						ScoreImg=self.R.score20.src;
						self.score+=20;
						break;
					case "-5":
						musicPlay("boom");
						self.score-=5;
						ScoreImg=self.R.score5.src;
						break;
				}
				
				//显示分数
				if(self.score<0){self.score=0;}
				$("#score span").html(self.score);
				//加减分数状态展示
				self.creatScore(ScoreImg,place,width); 
				
				
				//在此阶段 展示相同位置的图片
				if(self.score>=self.startNum && self.score<=self.endNum){
						//停止定时器创建，手动创建及清除
						This.remove();
						clearInterval(self.goodsTimer);
						$(".goods").remove();
						self.creatGoods(); 
				}else{
						//定时器速度递增
						self.timerNum-=10;
						if(self.timerNum<=200){self.timerNum=200;}
						//重置定时器
						clearInterval(self.goodsTimer);
						self.goodsTimer=setInterval(function(){
							if(self.ss<=0 && self.ms<=0){
								self.over();
							}
							self.creatGoods();
						},self.timerNum)
						//淡出
						This.fadeOut(250);
				}
				
				
				
				
			}
	
	//游戏时间倒计时
	game.prototype.time=function(){
		var self=this;
			
		self.timeTimer=setInterval(function(){
			self.ms--;
			if(self.ms<=0){
				if(self.ss<=0){
					//游戏结束
					self.over();
				}else{
					self.ms=9;
					self.ss--;
				}
			}
			$("#ss").html(self.ss)
			$("#ms").html(self.ms)
		},100)
		
	}
	
	//游戏结束
	game.prototype.over=function(){
		var self=this;
		
		clearInterval(self.timeTimer);
		clearInterval(self.goodsTimer);
		$(".goods").remove();
		musicPlay("bgpause");
		game_over();
	}

})();
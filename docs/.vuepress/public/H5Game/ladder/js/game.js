;(function(){
	var game=window.game=function(params){

		//获取画布
		this.canvas=document.getElementById(params.id);
		//获取分数
		this.scoreHtml=document.getElementById(params.scoreId);
		//设置宽高
		this.canvas.width=$(".wrap").width();
		this.canvas.height=$(".wrap").height();
		//上下文
		this.ctx=this.canvas.getContext("2d");
		//读取资源
		this.Data=params.Data;
		//图片计数
		this.imgNum=0;
		//游戏分数
		this.score=0;
		//分数倍数
		this.scoreTimes=1;
		//ladder Y轴定位间隔(递增)
		this.ladderSpace=0;
		//ladder 数组
		this.ladderArr=[];
		//雪块数组
		this.snowArr=[];
		//创建文件对象 n
		this.R={};
		//this绑定
		var self=this;
		
			//开始游戏
			this.loadAllResource(function(){
				UseFn.init();
				//先重置
				self.Rest();
			})

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
						$("#loadingLine").css("width",loadNum2+"%");
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
	
	//渲染器
	game.prototype.Render=function(){return;}
	
	//渲染场景
	game.prototype.RenderFn=function(){
			//清屏
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			
			//绘制梯子场景
			this.ladderArr.forEach(function(l, i) {
					l.Render();
					l.Impact();
			});
			
			//绘制雪块
			this.snowArr.forEach(function(l, i) {
					l.Updata();
					l.Render();
			});
			
			//绘制雪场景 
			this.snowBG.Updata();
			this.snowBG.Render();
			this.snowBG.Impact();
			
			//绘制人物场景
			this.peopleFn.Updata();	
			this.peopleFn.Impact();
			this.peopleFn.Render();
	}
	
	//游戏重置
	game.prototype.Rest=function(rest){

		var self=this;
				//重置分数
				this.score=0;
				this.scoreTimes=1;
				this.scoreHtml.innerHTML=0;
				//ladder Y轴定位间隔(递增)
				this.ladderSpace=0;
				//ladder 数组
				this.ladderArr=[];
				//雪块数组
				this.snowArr=[];
				//人物场景
				this.peopleFn=new people();
				this.peopleFn.Sensor();
				//雪背景
				this.snowBG=new snowBG();
				//雪块2个
				for(var i=0;i<4;i++){
					new Smove();
				}
				//梯子3个
				for(var i=0;i<3;i++){
				var ladderFn=new ladder();
					ladderFn.Updata();
					ladderFn.Render();
					//梯子间隔递增
					this.ladderSpace += (this.canvas.height / 3);
					ladderFn.y = this.ladderSpace;
					//第一个梯子避开人物
					if(i==1){
						ladderFn.x=(this.peopleFn.x+this.peopleFn.w)+Math.random()*(this.canvas.width-(this.peopleFn.x+this.peopleFn.w)-ladderFn.w);
						ladderFn.Render();
					}
				}
//				console.log(this.ladderArr)
				
				//绑定点击事件
//				this.ClickS();
//				
		this.Render=function(){
			self.RenderFn();
		}

	}
	
	//开始游戏
	game.prototype.Start=function(){
		$(".snow").remove();
		this.Render();
		requestAnimFrame(this.Start.bind(this))
	}
	
	//点击跳跃
	game.prototype.ClickS=function(){
		//绑定this指向，保存bind新函数用于解绑
		this.thisFN=this.peopleFn.Jump.bind(this.peopleFn);
		this.canvas.addEventListener("touchstart",this.thisFN,false);
	}
	
	//游戏结束
	game.prototype.GameOver=function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.Render=function(){return};
		UseFn.game_over();
		this.canvas.removeEventListener("touchstart",this.thisFN,false)
	}
	
	
})()
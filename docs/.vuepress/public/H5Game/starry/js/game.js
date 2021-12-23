(function(){
	var game=window.game=function(params){
		//获得画布
		this.canvas=document.getElementById(params.id);
		//上下文
		this.ctx=this.canvas.getContext("2d");
		//初始化 宽高度
		this.init();
		
		//障碍物数组
		this.obArr=[];
		//食物数组
		this.foodsArr=[];
		//障碍物 食物 速度
		this.speed=5;
	   
		//帧数
		this.fn=0;
		//分数
		this.socre=0;
		this.die=false;
	}
	
	//初始化 宽高度
	game.prototype.init=function(){
		var WindowW=document.documentElement.clientWidth;
		var WindowH=document.documentElement.clientHeight;
		if(WindowW>768){
			WindowW=768;
		}else if(WindowW<320){
			WindowW=320;
		}
		if(WindowH>1366){
			WindowH=1366;
		}else if(WindowH<500){
			WindowH=500;
		}
		this.canvas.width=WindowW;
		this.canvas.height=WindowH;
	}
	

	//开始
	game.prototype.start=function(){
		var self=this;
		this.Bg=new Background();//获取背景
		this.people=new people();//获取人物
		
		this.people.moveing();//开启触摸移动
		this.people.sensor();//开启重力感应
		loop();
		function loop(){
			timer=requestAnimFrame(loop)
			//清屏
			self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);	
			
			self.fn++;
			self.Bg.updata()//更新背景
			self.Bg.drawing()//渲染背景
			
			self.people.updata()//更新人物
			self.people.drawing()//渲染人物
			
		
			for(var i=0;i<self.obArr.length;i++){
				self.obArr[i].speed=self.speed;//更新速度
				self.obArr[i].updata();//更新障碍物
				self.obArr[i].drawing();//渲染障碍物
			}
			
			for(var i=0;i<self.foodsArr.length;i++){
				self.foodsArr[i].speed=self.speed;//更新速度
				self.foodsArr[i].updata();//更新食物
				self.foodsArr[i].drawing();//渲染食物
			}
			
			//每40帧获取障碍物  食物
			if(self.fn % 40 == 0){
				self.obstacle=new obstacle();
				new foods();
			}
			
		}
		
			
	}  
	
	game.prototype.over=function(){
		this.die=true;
		window.cancelAnimationFrame(timer);
		this.ctx.fillStyle="#fff";
		this.ctx.font="30px 微软雅黑";
		this.ctx.textAlign='center';
		this.ctx.fillText("Game Over",this.canvas.width/2,this.canvas.height/1.8);
		setTimeout(function(){window.location.reload()},2000)
	}
	
	
})();
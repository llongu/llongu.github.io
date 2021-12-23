(function(){
	var people=window.people=function(){
		//获取人物
		this.image=imgObj.people;
		
		//宽高
		this.w=74;
		this.h=90;
		
		//x y坐标
		this.x=game.canvas.width/2-24;
		this.y=game.canvas.height/2;
		//拖拽开关
		this.dragSwitchs=false;
		//重力感应开关
		this.sensorSwitchs=true;
		//跳跃开关
		this.flySwitchs=true;
		//拖拽定时器
		this.dragtimer="";
		//拖拽时间
		this.dragtime=0;
		//速度
		this.speed=0;
		
	}
	
	people.prototype.updata=function(){
		if(!this.sensorSwitchs)return;//如果拖拽开启则关闭此功能
		if(this.flySwitchs){
			//下落算法
			this.y+=0.2*this.speed;
		}else{
			this.speed=-25;
			this.flySwitchs=true;
		}
		
		//速度自增
		this.speed++;
		this.testwll();	
	}
	
	//绘制
	people.prototype.drawing=function(){
		game.ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
	}
	
	//触摸移动
	people.prototype.moveing=function(){
		var self=this;
		var offx,offy;
		
		//开始
		this.Drawstart=function(e){
			e.preventDefault();
			if(e.touches.length==1){
					if(e.touches[0].pageX>self.x && e.touches[0].pageX<self.x+self.w && e.touches[0].pageY>self.y && e.touches[0].pageY<self.y+self.h){//判断是否触摸物体
						//保存第一次触摸的内边距 
						offx=parseInt(e.touches[0].pageX-self.x)
						offy=parseInt(e.touches[0].pageY-self.y)
						game.canvas.addEventListener("touchmove",self.Drawmove,false)
						game.canvas.addEventListener("touchend",self.Drawend,false)

					}else{
						//如果不是触摸的笑脸体则跳跃
						self.fly();
					}
				}
		}
		
		//移动
		this.Drawmove=function(e){
			//拖拽开关
			if(!self.dragSwitchs || game.die)return;
			self.sensorSwitchs=false;//如果拖拽 那么重力感应就失效
			
			//当前触摸距离减去内边距（保持物体位置不变动）
			self.x = e.touches[0].pageX - offx;
			self.y = e.touches[0].pageY - offy;
			
			self.drawing();
		}
		
		//结束
		this.Drawend=function(e){
			game.canvas.removeEventListener("touchmove",self.Drawmove,false)
			self.sensorSwitchs=true;//重力感应开启
		}
		
		game.canvas.addEventListener("touchstart",self.Drawstart,false)
	}
	
	
	//重力感应
	people.prototype.sensor=function(){
		var self=this;
			
	 this.DeviceOrientationHandler=function(e){
	 	if(!self.sensorSwitchs || game.die)return;//如果拖拽开启则关闭此功能
		//重力加速度
		var accGravity = e.accelerationIncludingGravity;
//		self.y+=accGravity.y;
		if(is_IOS()){
				self.x+=accGravity.x+0.1;
			}else{
				self.x-=accGravity.x+0.1;
		}
		self.testwll();	
		self.drawing()
	 }
	 
	 if(window && window.DeviceOrientationEvent){
            window.addEventListener("devicemotion", self.DeviceOrientationHandler, false);
		}else{
			alert("你收不支持DeviceOrientationEvent")
	    }
	
	}
	
	//跳跃
	people.prototype.fly=function(){
		this.flySwitchs=false;
		this.speed=0;
	}
	
	//四周碰撞检测
	people.prototype.testwll=function(){
			if(this.x<=0){this.x=0}
			if(this.x+this.w>=game.canvas.width){this.x=game.canvas.width-this.w}	
			if(this.y<=0){this.y=0}
			if(this.y>game.canvas.height){
				game.over();
				
			}
	}
	
})();

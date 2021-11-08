;(function(){
	var people=window.people=function(){

		//获取链接
		this.image=game.R.people;
		this.image2=game.R.people2;
		
		//获取图片宽 高
//		this.w=this.image.width;
//		this.h=this.image.height;

		this.w=game.canvas.width*this.image.width/750;
		this.h=game.canvas.width*this.image.height/750;
		this.footerW=game.canvas.width*82/750;//人物脚的宽度82
		//位置
//		this.x=game.canvas.width/2-this.w/2;
		this.x=30;
		this.y=game.canvas.height/2-this.h/2;
		//初始下落速度
		this.speed=10;
		//兼容速度
		this.speed2=0;
		//重力
		this.gravity=0.4;
		//记录第一次跳跃开关
		this.oneSpeed=false;
		this.Math= Math.ceil(((game.canvas.height / 2.5) - (this.h / 2))/20)+2.5;
		if(UseFn.is_IPad()){
			this.Math+=2;
		}
//		console.log(this.Math+"不同设备的跳跃高度")
		//每次人物最多上升的高度 => 梯子下降的距离*1    
//		console.log((game.canvas.height / 2.5) - (this.h / 2)+"=>最大跳跃高度")
	}
	

	//更新
	people.prototype.Updata=function(){
			var self=this;
		/*
		 * 人物y坐标 大于 屏幕一半(减0.5) 则保持绘制 (此jump则上升)
		 * 如果小于那么则限制只能跳屏幕一半(减0.5) 强制下落
		 * 
		 */
		if(this.y >= (game.canvas.height / 2.5) - (this.h / 2)) {
				this.y+=this.speed;
				this.speed+=this.gravity;
		}else{
				game.ladderArr.forEach(function(l, i) {
					//当人物的 vy速度小于0 时候(就是跳跃的时候 vy为-8 或-16)
					if(game.peopleFn.speed < 0 && self.oneSpeed) {
						//平台的y轴滚动递减 -vy  --为正数 
						l.y -= game.peopleFn.speed;
					}
					
					//如果平台y轴大于屏幕高度 重新new y轴置顶
					if(l.y > game.canvas.height) {
//						game.ladderArr[i] = new ladder();
						game.ladderArr[i].sign=true;
						game.ladderArr[i].x=Math.random()*(game.canvas.width-game.ladderArr[i].w);
						game.ladderArr[i].Score();
						game.ladderArr[i].y = l.y - game.canvas.height;
					}

				});
				//如果人物y坐标小于屏幕一半且速度依然是负数   
				this.speed +=this.gravity; //-this.speed+=0.2
				if(this.speed >= 0){
					//保证 速度不是负数(下落)
					this.y += this.speed;
					this.speed += this.gravity;
				}
		}
		
	}
	
	//渲染
	people.prototype.Render=function(){
		if(this.speed>=0){
			game.ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
		}else{
			game.ctx.drawImage(this.image2,this.x,this.y,this.w,this.h)
		}
//			game.ctx.drawImage(this.image2,this.x,this.y,this.w,this.h)
	}
	
	//碰撞检测
	people.prototype.Impact=function(){
		//超出屏幕
		if(this.y>game.canvas.height){
		  	game.GameOver();
		  }
		
		//穿墙术
		if(this.x > game.canvas.width){
			this.x=0-this.w;
		}else if(this.x<0-this.w){
			this.x=game.canvas.width;
		}
		
	}
	
	//重力感应
	people.prototype.Sensor=function(){
		var self=this;
			
		 this.DeviceOrientationHandler=function(e){
			//重力加速度
			var accGravity = e.accelerationIncludingGravity;
			if(UseFn.is_IOS()){
				self.x+=accGravity.x+0.4;
			}else{
				self.x-=accGravity.x+0.4;
			}
//			self.y+=accGravity.y;
		 }
		 
	 	if(window && window.DeviceOrientationEvent){
            window.addEventListener("devicemotion", self.DeviceOrientationHandler, false);
		}else{
			alert("你的手机不支持DeviceOrientationEvent！无法正常体验该游戏")
	    }
	}
	
	//人物跳跃
	people.prototype.Jump=function(){
			//分数判断难度
			if(game.score>2000){//跳5 
				game.scoreTimes=50;
				this.speed=-(this.Math*3)-this.speed2;
				this.gravity=0.7;
			}else if(game.score>1200){//4
				game.scoreTimes=40;
				this.speed=-(this.Math*2+this.Math/2)-this.speed2;
				this.gravity=0.6;
			}else if(game.score>600){//3
				game.scoreTimes=30;
				this.speed=-(this.Math*2)-this.speed2;
				this.gravity=0.5;
			}else if(game.score>200){//2
				game.scoreTimes=20;
				this.speed=-(this.Math+this.Math/2)-this.speed2;
				this.gravity=0.4;
			}else{//1
				game.scoreTimes=10;
				this.speed=-this.Math;
				this.gravity=0.3;
			}
//		if(game.score>=20){
//			this.speed=-(this.Math*3)-this.speed2;
//			this.gravity=0.75;
//		}else if(game.score>=15){
//			this.speed=-(this.Math*2+this.Math/2)-this.speed2;
//			this.gravity=0.65;
//		}else if(game.score>=10){
//			this.speed=-(this.Math*2)-this.speed2;
//			this.gravity=0.55;
//		}else if(game.score>=5){
//			this.speed=-(this.Math+this.Math/2)-this.speed2;
//			this.gravity=0.45;
//		}else{
//			this.speed=-this.Math;
//			this.gravity=0.35;
//		}
		
		if(UseFn.is_IPad()){this.gravity+=0.2;}
	}
	

})()

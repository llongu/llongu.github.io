(function(){
	var Background=window.Background=function(){
		
		//获取自己的背景
		this.image=game.R.bg_day;
		
		//自己的 X,Y 轴位置
		this.x=0;
		this.y=0.75*game.canvas.height-400;
		//图片宽 高
		this.w=288;
		this.h=512;
		//速度
		this.speed=1;
	}
	
	
	//更新移动背景
	Background.prototype.updata=function(){
		var self=this;
		this.x-=this.speed;	//绘制背景向左边移动
		if(this.x<=-this.w){//如果超出自己宽度就还原
			self.x=0;
		}

	}
	
	//渲染背景
	Background.prototype.render=function(){
		//绘制背景  克隆5张背景一起运动(兼容ipad宽度 一张背景宽度288)
		game.ctx.drawImage(this.image,this.x,this.y)
		game.ctx.drawImage(this.image,this.x+this.w,this.y)
		game.ctx.drawImage(this.image,this.x+this.w*2,this.y)
		game.ctx.drawImage(this.image,this.x+this.w*3,this.y)
		game.ctx.drawImage(this.image,this.x+this.w*4,this.y)
		//补色（天空）
		game.ctx.fillStyle="#4EC0CA";
		game.ctx.fillRect(0,0,game.canvas.width,this.y+10);//(10是误差)
		
	}
	
	

})()

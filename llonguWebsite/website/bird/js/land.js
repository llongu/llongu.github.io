(function(){
	var Land=window.Land=function(){
		
		//获取自己的大地
		this.image=game.R.land;
		//自己的 X,Y 轴位置
		this.x=0;
		this.y=game.canvas.height*0.75;
		//图片宽 高
		this.w=336;
		this.h=112;
		//速度
		this.speed=2;
	}
	
	//更新大地
	Land.prototype.updata=function(){
		var self=this;
		this.x-=this.speed;	//绘制大地向左边移动
		if(this.x<=-this.w){//如果超出自己宽度就还原
			self.x=0;
		}
	}
	
	//渲染大地
	Land.prototype.render=function(){
		//绘制大地  克隆5张背景一起运动
		game.ctx.drawImage(this.image,this.x,this.y)
		game.ctx.drawImage(this.image,this.x+this.w,this.y)
		game.ctx.drawImage(this.image,this.x+this.w*2,this.y)
		game.ctx.drawImage(this.image,this.x+this.w*3,this.y)
		game.ctx.drawImage(this.image,this.x+this.w*4,this.y)
		//补色（大地）
		game.ctx.fillStyle="#DED895";
		game.ctx.fillRect(0,this.y+this.h-10,game.canvas.width,game.canvas.height-(this.y+this.h-10));//(10是误差)
	}
	
	

})()

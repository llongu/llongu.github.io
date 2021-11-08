(function(){
	var Background=window.Background=function(){
		
		//获取自己的背景
		this.image=imgObj.bg;
		
		//自己的 X,Y 轴位置
		this.x=0;
		this.y=0;
		//图片宽 高
		this.w=game.canvas.width;
		this.h=game.canvas.height;
		//速度
		this.speed=1;
	}
	
	
	//更新移动
	Background.prototype.updata=function(){
		var self=this;
		this.y+=this.speed;	
		if(this.y>=this.h){//超出 还原
			self.y=0;
		}
	}
	
	//渲染背景
	Background.prototype.drawing=function(){
		//绘制背景  克隆2张背景一起运动
		game.ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
		game.ctx.drawImage(this.image,this.x,this.y-this.h,this.w,this.h)
	}

})();

	

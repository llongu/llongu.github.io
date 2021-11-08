(function(){
	var goods=window.goods=function(){
		
		//获取链接
		this.image=game.R[this.createUrl()];
		//获取状态
		this.state=this.image.state;
		//获取图片宽 高
		this.w=this.image.width;
		this.h=this.image.height;
		//获取X,Y 轴位置
		this.x=this.createPlace().x;
		this.y=this.createPlace().y;
		
	}
	
	//创建 链接
	goods.prototype.createUrl=function(){
		var num="";
		
		//在此阶段 展示20分的图片
		if(game.score>=game.startNum && game.score<=game.endNum){ 
				num=Math.ceil(Math.random()*7+10);
			}else if(Math.ceil(Math.random()*100)>1 && Math.ceil(Math.random()*100)<25){
				num=Math.ceil(Math.random()*3+17);	
			}else{
				num=Math.ceil(Math.random()*20);
			}
		return "goods"+num;
	}

	//创建 位置
	goods.prototype.createPlace=function(){
		var self=this;
			var x,y;
			//在此阶段 展示相同位置的图片
			if(game.score>=game.startNum && game.score<=game.endNum){
				x=window.screen.width/2-50;
				y=window.screen.height/2-50;
			}else{
				x=5+(parseInt(Math.random()*(window.screen.width-self.w-20)));
				y=100+(parseInt(Math.random()*(window.screen.height-self.h-110)));
			}
			
			return {"x":x,"y":y}
	}	
	
})();

(function(){
	var obstacle=window.obstacle=function(){
		var num='obstacle'+Math.ceil(Math.random()*6);
		//获取自己障碍物
		this.image=imgObj[num];
		
		//图片宽 高
		this.w=700;
		this.h=40;
		
		//设置空隙(固定)
		this.interspace=200;
		
		//左右 障碍物宽度(最小10, 最大 随机*(10+屏幕宽减去固定空隙后)/1.5)
		this.Wleft=10+parseInt(Math.random()*((game.canvas.width-this.interspace)/1.5));
		this.Wright=game.canvas.width-(this.Wleft+this.interspace);
		//左右  X轴位置
		this.xleft=this.w-this.Wleft;
		this.xright=this.Wleft+this.interspace;
		//y轴位置
		this.y=-game.canvas.height;
		
		//速度
		this.speed=game.speed;
		
		//障碍物数组
		game.obArr.push(this);
		
	}
	
	//更新移动
	obstacle.prototype.updata=function(){
		var self=this;
		this.y+=this.speed;
		
		//碰撞检测
		if(game.people.x<self.Wleft || game.people.x+game.people.w>self.Wleft+self.interspace){//不在在空隙内
			if(game.people.y+game.people.h>self.y && game.people.y<self.y+self.h){//在障碍物内
				game.over()
			}
		}
		
		//超出屏幕删除
		if(this.y>game.canvas.height){
			for(var i=0;i<game.obArr.length;i++){
				if(game.obArr[i]===this){
					game.obArr.splice(i,1);
				}
			}
		}
	}
	
	//渲染障碍物
	obstacle.prototype.drawing=function(){
		game.ctx.drawImage(this.image,-this.xleft,this.y,this.w,this.h);
		game.ctx.drawImage(this.image,this.xright,this.y,this.w,this.h);
	}
	
})();

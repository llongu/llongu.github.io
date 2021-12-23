(function(){
	var foods=window.foods=function(){
		//随机食物  
		this.foodsNumArr=[
			{"effect":"drag","src":imgObj.foods1},
			{"effect":"normal","src":imgObj.foods2},
			{"effect":"normal","src":imgObj.foods3},
			{"effect":"normal","src":imgObj.foods4},
			{"effect":"normal","src":imgObj.foods5},
			{"effect":"normal","src":imgObj.foods6},
			{"effect":"normal","src":imgObj.foods7},
			{"effect":"fast","src":imgObj.foods8}

		]
		
		this.foodsNum=parseInt(Math.random()*this.foodsNumArr.length);
		//获取自己食物
		this.image=this.foodsNumArr[this.foodsNum].src;
		
		//食物图片宽 高
		this.w=60;
		this.h=60;
		
		
		//食物坐标判断
		this.coordinate=function(){
			var self=this;
			//随机 x坐标   
			var xNum=(game.obstacle.Wleft/1.5)+(Math.random()*game.canvas.width);
			var yNum=-game.canvas.height;
			//随机 x坐标位置控制
			if(xNum+self.w>game.canvas.width){
				xNum=xNum-game.canvas.width/1.2;
			}
			//如果随机X坐标 不在障碍物空隙内 那么y坐标就不能和障碍物重叠
			if(xNum+self.w>game.obstacle.Wleft+game.obstacle.interspace || xNum<game.obstacle.Wleft){
				yNum=game.obstacle.y-self.h*1.5;
			}
			return {"xNum":xNum,"yNum":yNum}
		}
		
		//食物x y坐标
		this.xycoordinate=this.coordinate();
		this.x=this.xycoordinate.xNum;
		this.y=this.xycoordinate.yNum;
		
		//速度
		this.speed=game.speed;
		
		//食物数组
		game.foodsArr.push(this);
	}
	
	//更新移动
	foods.prototype.updata=function(){
		var self=this;
		this.y+=this.speed;
		
		//碰撞检测
		if(game.people.x+game.people.w>self.x&& game.people.x<self.x+self.w){//x轴碰撞
			if(game.people.y+game.people.h>self.y && game.people.y<self.y+self.h){//y轴碰撞
				//碰撞删除
				for(var i=0;i<game.foodsArr.length;i++){
					if(game.foodsArr[i]===this){
						game.foodsArr.splice(i,1);
					}
				}
				//更新分数
				game.socre++;
				
				//碰撞效果检测
				self.effect(self.foodsNum)
			}
		}
		
		
		//超出屏幕删除
		if(this.y>game.canvas.height){
			for(var i=0;i<game.foodsArr.length;i++){
				if(game.foodsArr[i]===this){
					game.foodsArr.splice(i,1);
				}
			}
		}
	}
	
	//渲染食物
	foods.prototype.drawing=function(){
		game.ctx.fillStyle="#fff";
		game.ctx.font="20px 微软雅黑";
		game.ctx.fillText("分数：  "+game.socre+"  拖拽时间： "+game.people.dragtime,20,20);
		game.ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
	}
	
	
	/*食物碰撞效果
		effect
			==> normal  正常
			==> drag    开启拖拽功能
			==> fast    加快游戏速度
	*/
	foods.prototype.effect=function(Num){
		//碰撞效果检测
		switch(this.foodsNumArr[Num].effect){
			case "drag":
				game.people.dragtime+=5;//累积时间
				game.people.dragSwitchs=true;
				clearInterval(game.people.dragtimer);
				//定时拖拽
				game.people.dragtimer=setInterval(function(){
						game.people.dragtime--;
						if(game.people.dragtime<=0){
							game.people.dragSwitchs=false;//关闭拖拽
							game.people.sensorSwitchs=true;//重力感应开启
							clearInterval(game.people.dragtimer)
						}
					},1000)
				break;
			case "fast":
				game.speed+=1;//累积速度
				break;
		}
	}
	
})();

(function(){
	var Bird=window.Bird=function(){
		//随机数
		this.color=parseInt(Math.random()*3);
		//随机鸟
		this.imgArr=[
			game.R["bird"+this.color+"_0"],
			game.R["bird"+this.color+"_1"],
			game.R["bird"+this.color+"_2"],
		]
		//翅膀频率
		this.wingstep=0;
		this.w=48;
		//小鸟位置
		this.x=game.canvas.width*(1-0.618)-24;
		this.y=game.canvas.height*(1-0.618);
		//小鸟速度
		this.speed=0;
		//小鸟旋转度数
		this.rotate=0;
		//小鸟下落 点击上浮 状态开关
		this.switchs=true;
	}
	
	//更新小鸟
	Bird.prototype.updata=function(){
		
		if(this.switchs){
			//下落算法
			this.y+=0.15*this.speed;
		}else{
		  this.speed-=25;
		  this.switchs=true;
		}
		
		//速度自增
		this.speed++;
		//旋转度数
		this.rotate+=0.01;
		
		//是否落地
		if(this.y>game.canvas.height*0.72){
			clearInterval(game.timer)
			//场景3
			game.sm.enter(3)
		}
		if(this.y<=12){//12是小鸟图片上边空隙
			this.y=12;
		}
	}
	
	//渲染小鸟
	Bird.prototype.render=function(){
		game.ctx.save();
		game.ctx.translate(this.x,this.y)//24 是 小鸟宽度/2
		game.ctx.rotate(this.rotate)
		game.ctx.drawImage(this.imgArr[this.wingstep],-24,-24)
		game.ctx.restore();
	}
	
	//小鸟飞行
	Bird.prototype.fly=function(){
		this.switchs=false;
		this.rotate=-0.2;
		this.speed=0;
	}
	
	//小鸟翅膀挥动   翅膀频率 每20帧
	Bird.prototype.run=function(){
			game.fno % 20==0 && this.wingstep++;
			if(this.wingstep>2)
			{
				this.wingstep=0;
			}
	}
		
})()

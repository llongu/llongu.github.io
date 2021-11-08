(function(){
	var Pipe=window.PiPe=function(){
		
		//获取自己的管子
		this.imageup=game.R.pipe_up;
		this.imagesdown=game.R.pipe_down;
		
		//图片宽 高
		this.w=52;
		this.h=320;
		
		//自己的 X,Y 轴位置
		this.x=game.canvas.width;
		
		//总高度  上管子+空隙+下管子的高度 
		this.allheight=game.canvas.height*0.75;
		//固定空隙高度
		this.interspace=120;
		//随机  开口向上管子的高度  （比例来算的最低不能小于这个比例）
		this.height1=50+parseInt(Math.random()*(this.h-100))
		//开口向下管子高度自动定死（总高度-随机的上管子高度-固定空隙高度=下管子高度）
		this.height2=this.allheight-this.height1-this.interspace;
		
		//速度
		this.speed=2;
		
		//管子是否被通过（记分数）
		this.readypass=true;
		//管子推进数组
		game.PiPeArr.push(this);
//		console.log(game.PiPeArr)
	}
	
	//更新管子
	Pipe.prototype.updata=function(){
		var self=this;
		this.x-=this.speed;	//绘制管子向左边移动
		

			if(game.Bird.x+8>this.x && this.x+this.w>game.Bird.x-8)//判断管子相撞
			{	
						//上管子小鸟	头部碰撞							//下管子小鸟底部碰撞
				if(this.height1+12>game.Bird.y||game.Bird.y+48-(20+12)>this.height1+this.interspace){//判断不在空隙内
					clearInterval(game.timer)
					//场景3
					game.sm.enter(3)
				}
				
			}
		
			//判断通过管子 加分数 
			if(game.Bird.x>this.x+this.w && this.readypass){
				game.score++;
				this.readypass=false;// 标记 已被通过的管子
			}
		
			//判读管子是否出屏幕
			if(this.x<-this.w){
				for(var i=0;i<game.PiPeArr.length;i++){
					if(game.PiPeArr[i]===this){
						game.PiPeArr.splice(i,1);//遍历删除管子
					}
				}
			}

	}
	
	//渲染大地
	Pipe.prototype.render=function(){
		//绘制管子 克隆5张背景一起运动
		game.ctx.drawImage(this.imagesdown,0,this.h-this.height1,52,this.height1,this.x,0,52,this.height1);
		game.ctx.drawImage(this.imageup,0,0,52,this.height2,this.x,this.height1+this.interspace,52,this.height2)
	}
	
	

})()

(function(){
	var SceneManager=window.SceneManager=function(){
		// 1欢迎屏幕  2游戏内容 3游戏结束
		this.smNumber=1;
		
		//logo  按钮
		this.logoX=game.canvas.width/2-89;
		this.logoY=-48;
		
		this.button_playw=116;
		this.button_playh=70;
		this.button_playX=game.canvas.width/2-58;
		this.button_playY=game.canvas.height;
		
		//场景管理器渲染
		game.bg=new Background();
		game.Land=new Land();
		game.Bird=new Bird();
		
		//监听
		this.bindevent();
		
	}
	
	SceneManager.prototype.updata=function(){
		//根据需要渲染场景
		switch(this.smNumber){
			case 1:
				this.logoY+=10;//动画
				this.button_playY-=10;
				if(this.logoY>=160){this.logoY=160;}
				if(this.button_playY<=300){this.button_playY=300;}
				
				
				break;
			case 2:
				this.logoY=-48;//动画还原
				this.button_playY=game.canvas.height;
				
				game.bg.updata();
				game.Land.updata();
				game.Bird.updata();
				break;
			case 3:

					break;		
		}
		
	}

	SceneManager.prototype.render=function(){
		//根据需要渲染场景
		switch(this.smNumber){
			case 1:
				//1号更新 背景  大地  小鸟 logo 按钮
				game.bg.updata();
				game.bg.render();
				
				game.Land.updata();
				game.Land.render();
				
				game.Bird.run();
				game.Bird.render();
				
				game.ctx.drawImage(game.R["logo"],this.logoX,this.logoY)//渲染图片 按钮位置
				game.ctx.drawImage(game.R["button_play"],this.button_playX,this.button_playY)
				break;
			case 2:	
				//2号更新 背景  大地  小鸟  管子
				
				game.bg.render();
				
				game.Land.render();
				
				game.Bird.run();
				game.Bird.render();
				
				game.fno % 150 == 0 &&  (new PiPe());
				//循环渲染管子
				for(var i=0;i<game.PiPeArr.length;i++){
					game.PiPeArr[i] &&	game.PiPeArr[i].updata();
					game.PiPeArr[i] &&	game.PiPeArr[i].render();
				}
				//打印分数
				var scoreLength=game.score.toString().length;
				//循环设置图片 位置
				for(var i=0;i<scoreLength;i++){
					game.ctx.drawImage(game.R["shuzi"+game.score.toString().charAt(i)],game.canvas.width/2-scoreLength/2*34+34*i,100)
				}
				break;
			case 3:

					break;	
		}
	}
	
	
	//场景管理器 方法管理  由业务逻辑来调用管理（game.sm.enter(号码)）
	SceneManager.prototype.enter=function(smNumer){
		this.smNumber=smNumer;//更新场景号码
		switch(this.smNumber){
			case 1://1号场景
				this.logoY=-48;//复原动画
				this.button_playY=game.canvas.height;//复原动画
				break;
			case 2:
				//管子清空
				game.PiPeArr=[];
				break;
			case 3:
				game.ctx.drawImage(game.R["text_game_over"],game.canvas.width/2-102,160)
				break;
		}
	}
	
	//监听
	SceneManager.prototype.bindevent=function(){
		var self=this;
		game.canvas.onclick=function(e){
			var mousex,mousey;
			mousex=e.clientX;
			mousey=e.clientY;
			//点击通过位置判断点击了谁
			switch(self.smNumber){
				case 1://1号场景
					if(mousex>self.button_playX && mousex<self.button_playX+self.button_playw)//x轴
					{	
						if(mousey>self.button_playY && mousey<self.button_playY+self.button_playh){//y轴
							self.enter(2);//调用2号场景
						}
					}
					break;
				case 2:
					game.Bird.fly();
					break;
				case 3:

					break;
			}
			
			
		}
		
		
	}
})()
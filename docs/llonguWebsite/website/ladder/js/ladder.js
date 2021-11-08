;(function() {
	var ladder = window.ladder = function(a) {

		//获取链接
		this.image = game.R.ladder;
		//获取图片宽 高
//		this.w = this.image.width;
//		this.h = this.image.height;
		this.w=game.canvas.width*this.image.width/750;
		this.h= game.canvas.width*this.image.height/750;

		//位置
		this.x=Math.random()*(game.canvas.width-this.w);
//		this.x=game.canvas.width/2-this.w;
		this.y = 0;
		//跳跃标识
		this.sign = true;
		//分数判定(递增)
		this.scoreTest=50;
		//官衔下标
		this.rankNum=0;
		//官衔数组
		this.rank=ranking;
		
		//存储ladder数组
		game.ladderArr.push(this);
	}

	//更新
	ladder.prototype.Updata = function() {
	
	}

	//渲染
	ladder.prototype.Render = function(){
		
			game.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
		
			game.ctx.fillStyle="#fff";
	  		game.ctx.textAlign="center";
	  		game.ctx.font="small-caps bold 16px Arial";
			game.ctx.fillText(this.rank[this.rankNum][0],this.x+this.w/2, this.y+this.h+18);
			game.ctx.font="small-caps bold 14px Arial";
			game.ctx.fillText(this.rank[this.rankNum][1],this.x+this.w/2, this.y+this.h+35);
		
	}

	//碰撞检测
	ladder.prototype.Impact = function() {
		//左右 上下 
		if((game.peopleFn.speed > 0) && (game.peopleFn.x +(game.peopleFn.w/2-game.peopleFn.footerW/2)< this.x + this.w) && (game.peopleFn.x + (game.peopleFn.w/2+game.peopleFn.footerW/2)> this.x) && (game.peopleFn.y + game.peopleFn.h >=this.y + 3) && (game.peopleFn.y + game.peopleFn.h < this.y + this.h + 10)) {
			goM.play();
			game.peopleFn.oneSpeed=true;
			if(game.peopleFn.speed<=5){
//				console.log("碰撞距离小于5")
				game.peopleFn.speed2+=1;
			}else{
//				console.log(game.peopleFn.speed)
			}
			
			game.peopleFn.Jump()
			
			if(this.sign) {
				this.sign = false;
				game.score+=game.scoreTimes;
				game.scoreHtml.innerHTML=game.score;
			}
//			console.log("梯子 碰撞了")
		}
	}
	
	//分数检测
	ladder.prototype.Score=function(){
	
//	  		//分数判断官衔
//			if(game.score<3200){
//				   //判断分数递增阶段0(50) 350(150)  1400(300)
//				if(game.score>=this.scoreTest){
//					if(game.score>=1400){
//						this.scoreTest+=300;
//						if(game.score<1700){
//							this.rankNum=14;//学士 1400-1700
//						}else{
//							this.rankNum++;
//						}
//					}else if(game.score>=350){
//						this.scoreTest+=150;
//						if(game.score<500){
//							this.rankNum=7;//主事 350-500
//						}else{
//							this.rankNum++;
//						}
//					}else{
//						this.scoreTest+=50;
//						this.rankNum++;
//					}
//				}
//			}else{
//				this.rankNum=this.rank.length-1;//皇上 3200+
//			}
			
			//
			if(game.score<3201){
				if(game.score>=2901 && game.score<=3200){this.rankNum=19}
				else if(game.score>=2601 &&  game.score<=2900){this.rankNum=18}
				else if(game.score>=2301 &&  game.score<=2600){this.rankNum=17}
				else if(game.score>=2001 &&  game.score<=2300){this.rankNum=16}
				else if(game.score>=1701 &&  game.score<=2000){this.rankNum=15}
				else if(game.score>=1401 &&  game.score<=1700){this.rankNum=14}
				else if(game.score>=1251 &&  game.score<=1400){this.rankNum=13}
				else if(game.score>=1101 &&  game.score<=1250){this.rankNum=12}
				else if(game.score>=951 &&  game.score<=1100){this.rankNum=11}
				else if(game.score>=801 &&  game.score<=950){this.rankNum=10}
				else if(game.score>=651 &&  game.score<=800){this.rankNum=9}
				else if(game.score>=501 &&  game.score<=650){this.rankNum=8}
				else if(game.score>=351 &&  game.score<=500){this.rankNum=7}
				else if(game.score>=301 &&  game.score<=350){this.rankNum=6}
				else if(game.score>=251 &&  game.score<=300){this.rankNum=5}
				else if(game.score>=201 &&  game.score<=250){this.rankNum=4}
				else if(game.score>=151 &&  game.score<=200){this.rankNum=3}
				else if(game.score>=101 &&  game.score<=150){this.rankNum=2}
				else if(game.score>=51 &&  game.score<=100){this.rankNum=1}
				else{this.rankNum=0}
			}else{
				this.rankNum=this.rank.length-1;//皇上 3200+
			}
	}

})()
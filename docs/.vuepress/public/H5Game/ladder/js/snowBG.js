;
(function() {
	var snowBG = window.snowBG = function(a) {

		//获取链接
		this.SnowB = game.R.snow_bottom;
		this.snowbg1 = game.R.snowbg1;
		this.snowbg2 = game.R.snowbg2;
		
		//获取图片宽 高
		this.w=game.canvas.width;
		this.h=game.canvas.height;
		
		//底部雪块
		this.SnowBw = game.canvas.width * this.SnowB.width / 750 + 30;
		this.SnowBh = this.SnowB.height;
		
		this.SnowBx = -15;
		this.SnowBy = this.h - this.SnowBh + this.SnowBh / 1.7;
		
		//雪背景
		this.snowbg1w =this.w;
		this.snowbg1h =this.h;
		
		this.snowbg1x=0;
		this.snowbg1y=0;
		
		this.snowbg2w =this.w;
		this.snowbg2h =this.h;
		
		this.snowbg2x=0;
		this.snowbg2y=-this.h;
		
	}

	//更新
	snowBG.prototype.Updata = function() {
		//背景
		this.snowbg1y+=0.3;
		this.snowbg2y+=0.3;
		if(this.snowbg1y>this.h){
			this.snowbg1y=-this.h;
		}
		if(this.snowbg2y>this.h){
			this.snowbg2y=-this.h;
		}
		//雪地下滑
		if(game.peopleFn.oneSpeed){
			if(this.SnowBy-this.h<game.canvas.height){
				this.SnowBy++;
			}
		}
	}

	//渲染
	snowBG.prototype.Render = function() {
		game.ctx.drawImage(this.snowbg1,this.snowbg1x, this.snowbg1y, this.snowbg1w, this.snowbg1h)
		game.ctx.drawImage(this.snowbg2,this.snowbg2x, this.snowbg2y, this.snowbg2w, this.snowbg2h)
		game.ctx.drawImage(this.SnowB, this.SnowBx, this.SnowBy, this.SnowBw, this.SnowBh)
	}

	//碰撞检测
	snowBG.prototype.Impact = function() {

		if((game.peopleFn.speed > 0) && (game.peopleFn.y + game.peopleFn.h >= this.SnowBy + 20) && !game.peopleFn.oneSpeed) {
			game.peopleFn.Jump()
//			console.log("雪 碰撞了")
		}
		
	}

})()
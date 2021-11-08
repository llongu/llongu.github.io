;
(function() {
	var Smove = window.Smove = function(a) {

		//获取链接
		this.move= game.R.move;
		
		var random=[750,850,950]
		var randomNum=random[parseInt(Math.random()*3)];
		//获取图片宽 高
		this.w=game.canvas.width * this.move.width / randomNum;
		this.h=game.canvas.width * this.move.height / randomNum;
		
		this.x=Math.random()*game.canvas.width;
		this.y=-(Math.random()*game.canvas.height-this.h);
		this.speed=Math.random()*0.5+0.5;
		this.Rotate=0;
		
		game.snowArr.push(this);
	}

	//更新
	Smove.prototype.Updata = function() {

		//雪块
		this.y+=this.speed;
		this.Rotate+=0.3;
		if(this.y>game.canvas.height){
			this.x=Math.random()*game.canvas.width-this.w;
			this.y=-(Math.random()*game.canvas.height-this.h);
			this.speed=Math.random()*0.5+0.5;
		}
		if(this.Rotate==360){
			this.Rotate=0;
		}
	}

	//渲染
	Smove.prototype.Render = function() {
		
				game.ctx.save();
				game.ctx.translate(this.w/2+this.x,this.h/2+this.y);//将原点移到中点
				game.ctx.rotate(this.Rotate*Math.PI/180);
				game.ctx.translate(-this.w/2-this.x,-this.h/2-this.y);
				game.ctx.drawImage(this.move,this.x,this.y,this.w,this.h)
				game.ctx.restore();
		
	}

	//碰撞检测
	Smove.prototype.Impact = function() {

	}

})()
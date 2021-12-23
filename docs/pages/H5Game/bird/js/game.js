(function(){
	var game=window.game=function(params){
		//获得画布
		this.canvas=document.getElementById(params.id);
		//读取资源
		this.Data=params.Data;
		//上下文
		this.ctx=this.canvas.getContext("2d");
		
		//初始化 宽高度
		this.init();
		var self=this;
		//分数
		this.score=0;
		//帧数编号
		this.fno=0;
		//读取资源 异步操作 （资源加载完成后再执行下一步）
		this.loadAllResource(function(){
			
			//开始游戏
			self.start();
			//加载点击事件
//			self.bindclick();
			
		});
	}
	
	//初始化 宽高度
	game.prototype.init=function(){
		var WindowW=document.documentElement.clientWidth;
		var WindowH=document.documentElement.clientHeight;
		if(WindowW>1024){
			WindowW=1024;
		}else if(WindowW<320){
			WindowW=320;
		}
		if(WindowH>1366){
			WindowH=1366;
		}else if(WindowH<500){
			WindowH=500;
		}
		this.canvas.width=WindowW;
		this.canvas.height=WindowH;
		
	}

	//读取资源
	game.prototype.loadAllResource=function(callback){
		//创建文件对象
		this.R={};
		var self=this;
		var imgNum=0;//图片计数
		//请求json文件
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			
			if(xhr.readyState==4){
				var data=JSON.parse(xhr.responseText);
//				console.log(data)
				
				for(var i=0;i<data.images.length;i++){
					self.R[data.images[i].name]=new Image();//创建图片对象
					self.R[data.images[i].name].src=data.images[i].url;//赋值url
					self.R[data.images[i].name].onload=function(){
						imgNum++;
						
						//清屏
						self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
						//提示文字
						var texts="加载资源中"+imgNum+"/"+data.images.length+"请稍后...";
						//文字样式
						self.ctx.textAlign="center";
						self.ctx.font="20px 微软雅黑";
						self.ctx.fillText(texts,self.canvas.width/2,self.canvas.height*(1-0.618));
						//全部图片加载完毕
						if(imgNum==data.images.length){
							callback();
						}
					}
					
				}
			
//				console.log(data.images.length)
			}
			
		}
		
		xhr.open("get",this.Data,true);
		xhr.send(null);
	}
	
	
	//开始游戏
	game.prototype.start=function(){
		var self=this;
		//实列化自己的场景
		this.sm=new SceneManager();
		
		//定时器
		this.timer=setInterval(function(){
			//清屏
			self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
			//帧数编号
			self.fno++;
			//场景管理器渲染 更新
			self.sm.updata();
			self.sm.render();
			//打印帧编号
			self.ctx.font="16px consolas";
			self.ctx.textAlign="left";
			self.ctx.fillStyle="red";
//			self.ctx.fillText("FNO:"+self.fno,10,20)
//			self.ctx.fillText("场景管理器:"+self.sm.smNumber,10,40)
		},20)
		
		
	}
	

})()
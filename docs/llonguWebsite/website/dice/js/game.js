(function(){
	
		//人物行走功能	
	var game=window.game=function(){
		//32格地图坐标
		this.placeArr=[
			{"x":550,"y":165,"Scenic":"no","Gift":"no","ScenicName":"no"},
			{"x":345,"y":165,"Scenic":"no","Gift":"no","ScenicName":"no"},
			
			{"x":70,"y":160,"Scenic":"place_box1","Gift":"no","ScenicName":"name1"},
			{"x":70,"y":390,"Scenic":"place_box2","Gift":"no","ScenicName":"name2"},
			{"x":70,"y":650,"Scenic":"no","Gift":"no","ScenicName":"no"},/*==>5*/
			
			{"x":260,"y":650,"Scenic":"no","Gift":"no","ScenicName":"no"},
			{"x":510,"y":650,"Scenic":"place_box3","Gift":"no","ScenicName":"name3"},
			
			{"x":550,"y":880,"Scenic":"no","Gift":"no","ScenicName":"no"},
			{"x":362,"y":880,"Scenic":"place_box4","Gift":"no","ScenicName":"name4"},
			{"x":76,"y": 880,"Scenic":"no","Gift":"no","ScenicName":"no"},/*==>10*/
			
			{"x":66,"y": 1110,"Scenic":"no","Gift":"no","ScenicName":"no"},
			{"x":215,"y":1110,"Scenic":"place_box5","Gift":"no","ScenicName":"name5"},
			{"x":425,"y":1120,"Scenic":"place_box6","Gift":"no","ScenicName":"name6"},
			{"x":620,"y":1150,"Scenic":"place_box7","Gift":"no","ScenicName":"name7"},
			
			{"x":618,"y":1455,"Scenic":"no","Gift":"no","ScenicName":"no"},/*==>15*/
			{"x":425,"y":1455,"Scenic":"no","Gift":"no","ScenicName":"no"},
			
			{"x":142,"y":1455,"Scenic":"no","Gift":"no","ScenicName":"no"},
			
			{"x":130,"y":1680,"Scenic":"place_box8","Gift":"no","ScenicName":"name8"},
			
			{"x":160,"y":1850,"Scenic":"place_box9","Gift":"no","ScenicName":"name9"},
			{"x":425,"y":1850,"Scenic":"no","Gift":"no","ScenicName":"no"},
			{"x":620,"y":1880,"Scenic":"place_box10","Gift":"no","ScenicName":"name10"},
			{"x":620,"y":2180,"Scenic":"place_box11","Gift":"no","ScenicName":"name11"},
			
			{"x":423,"y":2180,"Scenic":"no","Gift":"no","ScenicName":"no"},
			
			{"x":225,"y":2250,"Scenic":"place_box12","Gift":"no","ScenicName":"name12"},
			{"x":70,"y":2250,"Scenic":"no","Gift":"no","ScenicName":"no"},/*==>25*/
			
			{"x":70,"y":2520,"Scenic":"place_box13","Gift":"no","ScenicName":"name13"},
			{"x":275,"y":2520,"Scenic":"no","Gift":"no","ScenicName":"no"},
			{"x":524,"y":2520,"Scenic":"place_box14","Gift":"no","ScenicName":"name14"},
			
			{"x":545,"y":2760,"Scenic":"place_box15","Gift":"no","ScenicName":"name15"},
			{"x":355,"y":2760,"Scenic":"no","Gift":"no","ScenicName":"no"},/*==>30*/
			{"x":71,"y":2760,"Scenic":"place_box16","Gift":"no","ScenicName":"name16"},
			
			{"x":60,"y":2990,"Scenic":"no","Gift":"no","ScenicName":"no"}
			
		]

		//坐标计数器
		this.placeNum=0;
		//定时器
		this.timer=null;
		//终点过度
		this.durations=800;
	}
	
	//定时器
	game.prototype.Settimer=function(diy){
		var self=this;
		
		self.timer=setInterval(function(){
					self.placeNum++;
					//到达终点
					if(self.placeNum>=self.placeArr.length){
						self.placeNum=0;
						self.durations=10;
						//重置点数判断
//						diy=diy-self.placeArr.length;
						//到达终点计数清0
						clearInterval(self.timer);
						self.Move(self.placeNum,"stop");
						$("body").animate({"scrollTop":0},300);
						return false;
					}else{
						self.durations=800;
					}
					
					//到达骰子步数
					if(self.placeNum>diy){
						self.placeNum--;//减去大于的一格
						
						//移动完成后调用后续逻辑 传送景点，景点名称
						GO_Back(self.placeArr[self.placeNum].Scenic,self.placeArr[self.placeNum].ScenicName);
						
						clearInterval(self.timer);
						//景点判断
						return false;
						}
					
					self.Move(self.placeNum)
					//定位内容在可视区域内 
					Center();
			},810);
	}
	
	/*人物移动 */
	game.prototype.Move=function(placeNum,stop){
		var self=this;
						
					
						//人物跳跃效果
						$("#people img").animate({
								"top":"-40px"
								},400,function(){
									musicPlay("move")
								}).animate({
									"top":"0px"
								},400,function(){
									musicPlay("move")
							})
						//人物移动效果
						$("#people").animate({
									"left": (self.placeArr[placeNum].x)/75+"rem",
									"top":(self.placeArr[placeNum].y+12)/75+"rem",
								},self.durations,function(){
//								console.log(self.placeArr[placeNum].Scenic)
								
								
						})
						
					
	}
	
	//前进一格
	game.prototype.Foward=function(){
		var self=this;
		self.placeNum++;
		if(self.placeNum>=self.placeArr.length){
			self.placeNum=0;
		}
		self.Move(self.placeNum);
		//定位内容在可视区域内 
		Center();
		setTimeout(function(){
			//移动完成后调用后续逻辑 传送景点，景点名称
		GO_Back(self.placeArr[self.placeNum].Scenic,self.placeArr[self.placeNum].ScenicName);
		},410)
		  
	}
	//后退一格
	game.prototype.Back=function(){
		var self=this;
		self.placeNum--;
		self.Move(self.placeNum);
		//定位内容在可视区域内 
		Center();			
		setTimeout(function(){
			//移动完成后调用后续逻辑 传送景点，景点名称
		GO_Back(self.placeArr[self.placeNum].Scenic,self.placeArr[self.placeNum].ScenicName);
		},410)
	}
	//遥控骰子(前进)
	game.prototype.Diynum=function(diynum){
		var self=this;
		
		//累积步数
		self.diynum=self.placeNum+diynum;
		//传入点数做移动完成判断
		self.Settimer(this.diynum);
		
	}
	//骰子摇动
	game.prototype.Rockdice=function(Num){
		var self=this;
		self.imgNum=0;
		self.doceTimer=setInterval(function(){
			$(".game_dice").removeClass("game_dice"+self.imgNum)
			self.imgNum++;
			if(self.imgNum>6){
				self.imgNum=1;
			}
			$(".game_dice").addClass("game_dice"+self.imgNum);
		},25)
		
		//3秒后关闭骰子旋转 开始移动
		setTimeout(function(){
			
				clearInterval(self.doceTimer)
				//获得点数
				$(".game_dice").removeClass("game_dice"+self.imgNum)
				$(".game_dice").addClass("game_dice"+Num);
				//移动
				self.Diynum(Num);
		},1800)
	}

	
	
})()

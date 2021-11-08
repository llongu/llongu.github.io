		window.requestAnimFrame = (function() {
					return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
						function(callback) {
							window.setTimeout(callback, 1000 / 60);
						};
		})();
	
		(function(w,d,$) {
			var Move = w.Move = function(opt) {
				this.x = opt.x;
				this.y = opt.y;
				this.speedX = 0;
				this.speedY = 0;
				this.hoverX = -1;
				this.hoverY = -1;
				this.opt = opt;
				this.dom = opt.id;
				this.num = [1, -1, 0.5, -0.5]; //4个方向
				this.rotate = 0;
				this.rotateDirection = null;
				this.switchs = true;
				this.timer = null;
			}
			//随机方向
			Move.prototype.random = function() {
				this.speedX = this.num[parseInt(Math.random() * this.num.length)];
				this.speedY = this.num[parseInt(Math.random() * this.num.length)];
				this.direction();
			}
			//旋转方向
			Move.prototype.direction = function() {
				var x = this.speedX;
				var y = this.speedY;

				//上右
				if(x > 0 && y < 0) {
					this.rotate = 45;
					this.rotateDirection = 'tr';
				}
				//下右
				if(x > 0 && y > 0) {
					this.rotate = 135;
					this.rotateDirection = 'br';
				}
				//上左
				if(x < 0 && y < 0) {
					this.rotate = -45;
					this.rotateDirection = 'tl';
				}
				//下左
				if(x < 0 && y > 0) {
					this.rotate = -135;
					this.rotateDirection = 'bl';
				}
			}
			//碰撞检测
			Move.prototype.impact = function() {

				if(this.x + this.dom.clientWidth >= this.opt.bodyW) {
					this.speedX = -this.speedX;
					this.direction();
				} else if(this.x <= 0) {
					this.speedX = Math.abs(this.speedX);
					this.direction();
				}

				if(this.y + this.dom.clientHeight >= this.opt.bodyH) {
					this.speedY = -this.speedY;
					this.direction();
				} else if(this.y <= 0) {
					this.speedY = Math.abs(this.speedY)
					this.direction();
				}

			}
			//hover加速
			Move.prototype.hover = function() {
				this.dom.onmouseover = function() {
					if(!move.switchs) return;
					fire.style.display = 'block';
					var left = -1,
						top = -1;
					//跟随旋转方向加速
					switch(move.rotateDirection) {
						case 'tr':
							left = Math.abs(left);
							break;
						case 'br':
							left = Math.abs(left);
							top = Math.abs(top);
							break;
						case 'tl':
							break;
						case 'bl':
							top = Math.abs(top);
							break;
					}
					move.speedX += left;
					move.speedY += top;
				}
				this.dom.onmouseleave = function() {
					if(!move.switchs) return;
					move.switchs = false;
					//降速
					var timers = setInterval(function() {
						if(move.num.indexOf(move.speedX) == -1) {
							move.speedX > 0 ? move.speedX-- : move.speedX++;
						}
						if(move.num.indexOf(move.speedY) == -1) {
							move.speedY > 0 ? move.speedY-- : move.speedY++;
						}
						if(move.num.indexOf(move.speedX) > -1 && move.num.indexOf(move.speedY) > -1) {
							clearTimeout(timers)
							move.switchs = true;
							fire.style.display = 'none';
							return;
						}
					}, 500)
				}
			}
			//绘制
			Move.prototype.render = function() {
				this.x += this.speedX;
				this.y += this.speedY;

				this.dom.style.transform = ' rotateZ(' + this.rotate + 'deg)';
				this.dom.style.left = this.x + 'px';
				//rotate取反
				this.dom.style.top = this.y + 'px';
			}
			//loop
			Move.prototype.loop = function() {
				move.timer = requestAnimFrame(move.loop);
				move.render();
				move.impact();
			};
			
			$.fn.extend({
					alertWhileClick:function(options){
						 var defaults = {//插件控制
								settime:"75",
							    sign: '_'
							  };
						 var opts = $.extend(defaults, options);//扩展合并
						
						var _this=$(this);
						var str =_this.html(), progress = 0,timer;
					   		_this.html("");
					   		_this.css('visibility','visible');
					   		
					   timer = setInterval(function() {
					  	
							    var current = str.substr(progress, 1);//截取
							    if (current == '<') {//判断
							    	//从当截取到<时去找到>并使progress+1跳过>；
							      progress = str.indexOf('>', progress)+1;
							    } else {
							      progress++;
							    }
							   //&位运算 二进制判断progress是不是1    
							    _this.html(str.substring(0, progress) + (progress & 1? opts.sign: '')) ;//赋值
							    if (progress >= str.length) {//清除
							      	clearInterval(timer);
							      	if(_this.next().length>0){_this.nextP()}
							    }
							    
						  }, opts.settime);     
					  
					},
					nextP:function(){
						$(this).next().alertWhileClick({
							sign:"|"
						})
					},
					isVisible:function(){
						 var _this = $(this),
					      Left = _this.offset().left,
					      visibleWidth = $(w) .width();
					      return Left+100 < visibleWidth;  
					}
			});      
			
	
		})(window, document,jQuery);
	
		function IronM(){
			var IronM = document.getElementById('IronM'),
				fire = document.getElementById('fire'),
				body = document.getElementsByTagName('body')[0],
				x=0,y=$(window).height();
				setTimeout(function(){
					$('#study').addClass('sopen');
					setTimeout(function(){
						$('#IronM').fadeIn();
						move = new Move({
							'id': IronM,
							'fire': fire,
							"bodyW": body.clientWidth,
							"bodyH": body.offsetHeight,
							'x':$('.banner').width()/2,
							"y":$('.banner').height()/2-40
						});
						move.random();
						move.hover();
						move.loop();
					},1000)
				},1000)
				setTimeout(function(){
					$('#study').removeClass('sopen');
				},3000)
				
		}
		//	window.cancelAnimationFrame(move.timer);
		


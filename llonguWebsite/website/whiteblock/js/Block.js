		var bh;
		var tops;
		var wh = $(window).height(); //点击开始 页面往下滑动的距离为 主体超出页面的top值
		var timer; //时间记录定时器
		var phone_true = false;
		var ipad_ture = false;

		function is_iPad() {
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/iPad/i) == "ipad") {
				//     alert("ipad")
				ipad_ture = true;
			} else {
				//      alert("no_ipad")
				phone_true = true;
			}
		}
		is_iPad();

		function Block(dom) {
			this.dom = dom; //dom
			this.parentW = this.dom.parentNode.clientWidth;
			this.parentH = this.dom.parentNode.clientHeight;
			this.scale = 1.58; //黑块 宽高比
			this.h = parseInt(this.parentW / 4 * this.scale); //分配盒子高度
//			console.log(this.h + "  每个盒子的高度")
			bh = document.getElementById('begin').parentNode.style.height = this.h + "px"; //begin高度
			tops = parseInt(bh) * 5 - wh;
//			console.log(tops + "超出的top值 也是开始滑动的距离")

			this.top = -tops;
			this.speed = 14; //速度
			this.maxSpeed = 50; //最大速度
			this.timer = null; //定时器
			this.state = true; //游戏判断
			this.sum = 4; //分数调节速度

		}

		Block.prototype.init = function() {

			var _t = this;

			_t.zsy();
			_t.mark(); //调用分数

			var clickEvent = "ontouchstart" in document.documentElement ? "touchstart" : "click";

			_t.dom.addEventListener(clickEvent, function(e) { //点击container 判断被点击的元素是否白块
				event.preventDefault();
				e.stopPropagation();

				if(!_t.state) {
					return false;
				}
				e = e || window.event;
				var target = e.target || e.srcElement;
				//		console.log(target.className)
				
				if(target.className.indexOf('block') != -1) {
					_t.sum++; //分数+1 
//					console.log(target.className)
					target.classList.remove('block')
					target.innerHTML = "<div class='shaow'></div>";
				} else if(target.className.indexOf('shaow') != -1) { //防止重复点击
					//			target.style.background="red"
				} else if(target.className.indexOf('begin') != -1) {
					//防止第一个开始的灰块有cell 变成红色并停止游戏
				} else if(target.className.indexOf('cell') != -1) { //踩到白块游戏结束
					console.log("你点到白块了3")
					target.style.background = "red"
					_t.state = false;
					clearInterval(_t.timer); //清除动画
					clearInterval(timer); //清除定时
					_t.end(); //调用结束
					return false;
				} else {
					console.log("你点到空白了")
				}

			}, false);
		}

		//创建一行
		Block.prototype.addRow = function() {

			var oRow = document.createElement('div');
			oRow.className = 'row';
			oRow.style.height = this.h + 'px';
			//随机cell
			var cells = ['cell', 'cell', 'cell', 'cell'];
			var s = Math.floor(Math.random() * 4);

			//随机颜色
			var colors = ["game1", "game2", "game3", "game4", "game5", "game6", "game7", "game8", "game9", "game10"];
			var cs = Math.floor(Math.random() * 10);

			//随机cell加block
			cells[s] = "cell block " + colors[cs];

			var oCell = null;

			for(var i = 0; i < 4; i++) {
				oCell = document.createElement('div');
				oCell.className = cells[i];
				oRow.appendChild(oCell);
			}

			var fChild = this.dom.firstChild;

			//	console.log(fChild)
			if(fChild == null) { //第一个盒子是否为空  
				this.dom.appendChild(oRow); //当前主体里面插入row
			} else {
				this.dom.insertBefore(oRow, fChild); //把row 插入到第一个row前面
			}

		}

		//删除一行，，，
		Block.prototype.delRow = function() {
			this.dom.removeChild(this.dom.childNodes[this.dom.childNodes.length - 1]);
		}

		//判断什么时候拉回top 什么时候提升速度，，，什么时候停止
		Block.prototype.judge = function() {

			var _t = this;

			if(_t.top >= 0) { //大于页面高度的时候
				_t.top = -this.h;
				_t.dom.style.top = _t.top + 'px';
//				console.log(_t.dom.style.top + "盒子top值大于等于0重置top 移到负的高度")
				_t.addRow();
			}
			//判断每个盒子上边距离是不是大于屏幕高度  然后删除
			var rows = _t.getEleByClassName('row', 'div', _t.dom);
			for(var i = 0; i < rows.length; i++) {
				if(rows[i].offsetTop >= _t.parentH + _t.h) {
					_t.delRow();
				}
			}
			
			_t.speed = (parseInt(_t.sum / 4) + 1) * 2; //根据点的白块总数提升速度
			//		console.log( _t.speed)
			//		console.log( _t.maxSpeed)
			
			if(_t.speed >= _t.maxSpeed) {
				_t.speed = _t.maxSpeed;
			} //最大速度 

			var blocks = _t.getEleByClassName('block', 'div', _t.dom);
			for(var j = 0; j < blocks.length; j++) {
				//		console.log(blocks.length+"盒子长度")
				if(blocks[j].offsetTop >= _t.parentH) { //如果黑块没点击且滑动过了
					blocks[j].style.background = "red";
					console.log(blocks[j].offsetTop + ">=" + _t.parentH + "盒子滑动的top是否大于盒子高度"); //盒子滑动的top是否大于盒子高度
					//			 console.log( _t.dom.style.top)
					_t.state = false;
					clearInterval(_t.timer); //清除动画
					clearInterval(timer); //清楚定时
					_t.end(); //调用结束
					_t.dom.style.transition = "top 1s linear"; //返回错误盒子
					var top_h = _t.h - (blocks[j].offsetTop - _t.parentH);
					console.log(top_h)
					_t.dom.style.top = -(_t.h * 2 - top_h) + "px";
				}
			}
		}
		//匹配每个div和block
		Block.prototype.getEleByClassName = function(className, tagName, context) {
			context = context || document;
			tagName = tagName || '*';
			if(document.getElementsByClassName) {
				return context.getElementsByClassName(className);
			} else {
				var el = new Array();
				var aEle = context.getElementsByTagName(tagName);
				var re = new RegExp('\\b' + className + '\\b', 'i');
				var i = 0;
				for(i = 0; i < aEle.length; i++) {
					if(re.test(aEle[i].className)) {
						aResult.push(aEle[i]);
					}
				}
				return aResult;
			}
		}

		//移动
		Block.prototype.move = function() {
			if(phone_true == true) {
				this.top += this.speed; //一开始this.top的高度是-的this.h  速度调节高度
			} else if(ipad_ture == true) {
				this.top += this.speed * 2; //一开始this.top的高度是-的this.h  速度调节高度
			}
			//	this.top += this.speed;//一开始this.top的高度是-的this.h  速度调节高度
			this.dom.style.top = this.top + 'px'; //
			//	console.log(this.dom.style.top)
		}

		//分数
		Block.prototype.mark = function() {
			var total = 0000;
			timer = setInterval(function() {
				total++;
				if(total > 1500) {

				}

				if(total > 1000) {
					var ss = Math.floor(total / 100);
					var ms = total - Math.floor(total / 100) * 100;
					$(".minutes").html(ss);
					$(".seconds").html(ms);
				} else {
					var ss = Math.floor(total / 100);
					var ms = total - Math.floor(total / 100) * 100;
					$(".minutes").html("0" + ss);
					$(".seconds").html(ms);
				}

			}, 10);

		}

		//元素自适应
		Block.prototype.zsy = function() {
			var _t = this;
			if("ontouchstart" in document.documentElement) {
				_t.dom.parentNode.className = "ph-main";
			}
		}

		//游戏开始
		Block.prototype.start = function() {

			var _t = this;
			//	for( var i=0; i<4; i++ ){
			//						block.addRow();
			//	}

			//动画调用
			_t.timer = setInterval(function() {
				_t.move();
				_t.judge();
			}, 30);

		}

		//游戏结束  
		Block.prototype.end = function() {
			var _t = this;
			//发送挑战时间
			var time_mins = $(".minutes").html();

			get_timers();

			//		_t.again(); 重来

		}

		//游戏重来
		Block.prototype.again = function() {
			this.parentW = this.dom.parentNode.clientWidth;
			this.parentH = this.dom.parentNode.clientHeight;
			this.scale = 1.58; //黑块 宽高比
			this.h = parseInt(this.parentW / 4 * this.scale);
			this.top = -this.h;
			this.speed = 2; //速度
			this.timer = null; //定时器
			this.state = true; //游戏判断
			this.sum = 0; //分数
			timenow();

			var _t = this;
			_t.dom.innerHTML = "";
			//	_t.getEleByClassName('mark','div')[0].innerHTML = _t.sum;
			_t.start();
		}
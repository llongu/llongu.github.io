window.onload = function () {
  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var Move = function (opt) {
    this.x = opt.x;
    this.y = opt.y;
    this.speedX = 0;
    this.speedY = 0;
    this.hoverX = -1;
    this.hoverY = -1;
    this.opt = opt;
    this.dom = opt.id;
    this.num = [1, -1, 0.5, -0.5,1.5,-1.5]; //随机方向与速度
    this.rotate = 0;
    this.rotateDirection = null;
    this.switchs = true;
    this.timer = null;
  };
  //随机方向
  Move.prototype.random = function () {
    this.speedX = this.num[parseInt(Math.random() * this.num.length)];
    this.speedY = this.num[parseInt(Math.random() * this.num.length)];
    this.direction();
  };
  //旋转方向
  Move.prototype.direction = function () {
    var x = this.speedX;
    var y = this.speedY;

    //上右
    if (x > 0 && y < 0) {
      this.rotate = 45;
      this.rotateDirection = "tr";
    }
    //下右
    if (x > 0 && y > 0) {
      this.rotate = 135;
      this.rotateDirection = "br";
    }
    //上左
    if (x < 0 && y < 0) {
      this.rotate = -45;
      this.rotateDirection = "tl";
    }
    //下左
    if (x < 0 && y > 0) {
      this.rotate = -135;
      this.rotateDirection = "bl";
    }
  };
  //碰撞检测
  Move.prototype.impact = function () {
    if (this.x + this.dom.clientWidth >= this.opt.bodyW) {
      this.speedX = -this.speedX;
      this.direction();
    } else if (this.x <= 0) {
      this.speedX = Math.abs(this.speedX);
      this.direction();
    }

    if (this.y + this.dom.clientHeight >= this.opt.bodyH) {
      this.speedY = -this.speedY;
      this.direction();
    } else if (this.y <= 0) {
      this.speedY = Math.abs(this.speedY);
      this.direction();
    }
  };
  //hover加速
  Move.prototype.hover = function () {
    this.dom.onmouseover =  ()=> {
      if (!this.switchs) return;
      fire.style.display = "block";
      var left = -1,
        top = -1;
      //跟随旋转方向加速
      switch (this.rotateDirection) {
        case "tr":
          left = Math.abs(left);
          break;
        case "br":
          left = Math.abs(left);
          top = Math.abs(top);
          break;
        case "tl":
          break;
        case "bl":
          top = Math.abs(top);
          break;
      }
      this.speedX += left;
      this.speedY += top;
    };
    this.dom.onmouseleave =  ()=> {
      if (!this.switchs) return;
      this.switchs = false;
      //降速
      var timers = setInterval( ()=> {
        if (this.num.indexOf(this.speedX) == -1) {
          this.speedX > 0 ? this.speedX-- : this.speedX++;
        }
        if (this.num.indexOf(this.speedY) == -1) {
          this.speedY > 0 ? this.speedY-- : this.speedY++;
        }
        if (
          this.num.indexOf(this.speedX) > -1 &&
          this.num.indexOf(this.speedY) > -1
        ) {
          clearTimeout(timers);
          this.switchs = true;
          fire.style.display = "none";
          return;
        }
      }, 500);
    };
  };
  //绘制
  Move.prototype.render = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    this.dom.style.transform = " rotateZ(" + this.rotate + "deg)";
    this.dom.style.left = this.x + "px";
    //rotate取反
    this.dom.style.top = this.y + "px";
  };
  //loop
  Move.prototype.loop = function () {
    this.timer = requestAnimFrame(this.loop.bind(this));
    this.render();
    this.impact();
  };

  function IronMrun() {
    var IronM = document.getElementById("IronM"),
      fire = document.getElementById("fire"),
      body = document.getElementsByTagName("body")[0];

      IronM.addEventListener('click',()=>{
        console.log(window._hmt)
        window._hmt.push(['_trackEvent', '点击', '钢铁侠', '已点击', new Date()]) 
      })

    IronM.style.opacity = 1;

    var move = new Move({
      id: IronM,
      fire: fire,
      bodyW: body.clientWidth,
      bodyH: body.offsetHeight,
      x: 200,
      y: 350,
    });
    move.random();
    move.hover();
    move.loop();
  }
  setTimeout(() => {
    IronMrun();
  }, 500);
};

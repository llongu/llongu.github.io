!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=2)}([function(t,e){var s;(s=window.goods=function(){this.image=game.R[this.createUrl()],this.state=this.image.state,this.w=this.image.width,this.h=this.image.height,this.x=this.createPlace().x,this.y=this.createPlace().y}).prototype.createUrl=function(){return"goods"+(game.score>=game.startNum&&game.score<=game.endNum?Math.ceil(7*Math.random()+10):Math.ceil(100*Math.random())>1&&Math.ceil(100*Math.random())<25?Math.ceil(3*Math.random()+17):Math.ceil(20*Math.random()))},s.prototype.createPlace=function(){var t,e;return game.score>=game.startNum&&game.score<=game.endNum?(t=window.screen.width/2-50,e=window.screen.height/2-50):(t=5+parseInt(Math.random()*(window.screen.width-this.w-20)),e=100+parseInt(Math.random()*(window.screen.height-this.h-110))),{x:t,y:e}}},function(t,e){var s;(s=window.game=function(t){this.Data=t.Data,this.imgNum=0,this.score=0,this.ss=60,this.ms=9,this.timeTimer=null,this.goodsTimer=null,this.timerSwitch=!0,this.timerNum=350,this.num=0,this.startNum=200,this.endNum=400,this.R={};this.loadAllResource(function(){InitData()})}).prototype.start=function(){var t=this;this.score=0,this.ss=60,this.ms=9,this.timerSwitch=!0,this.timerNum=350,this.num=0,this.startNum=200,this.endNum=400,t.goodsTimer=setInterval(function(){t.creatGoods()},t.timerNum),t.click(),t.time()},s.prototype.loadAllResource=function(t){var e=this;e.imgNum=0;var s=new XMLHttpRequest;s.onreadystatechange=function(){if(4==s.readyState)for(var i=JSON.parse(s.responseText),r=Math.ceil(100/i.images.length),o=0,a=0;a<i.images.length;a++)e.R[i.images[a].name]=new Image,e.R[i.images[a].name].src=i.images[a].url,e.R[i.images[a].name].state=i.images[a].state,e.R[i.images[a].name].onload=function(){e.imgNum++,(o=e.imgNum*r)>=100&&(o=100);var s="资源加载中"+o+"%请稍后...";$("#loadingText").html(s),e.imgNum==i.images.length&&t()}},s.open("get",this.Data,!0),s.send(null)},s.prototype.creatGoods=function(){this.num++;var t=new goods,e=document.createElement("div");e.className="goods goods"+this.num,e.setAttribute("data-state",t.state),e.setAttribute("data-click","yes"),e.style.width=t.w/75+"rem",e.style.height=t.h/75+"rem",e.style.left=t.x+"px",e.style.top=t.y+"px",this.score>=this.startNum&&this.score<=this.endNum&&(e.style.width=t.w/65+"rem",e.style.height=t.h/65+"rem"),e.innerHTML="<img src="+t.image.src+">",$("#game_main").append(e),this.score>=this.startNum&&this.score<=this.endNum||this.clear("goods",this.num)},s.prototype.creatScore=function(t,e,s){var i=this;i.num++;var r=document.createElement("div");r.className="scoreMove scoreMove"+i.num,r.style.left=e.left+s+"px",r.style.top=e.top-10+"px",parseInt(r.style.left)+118>window.screen.width&&(r.style.left=window.screen.width-118+"px"),r.innerHTML="<img src="+t+">",$("#game_main").append(r),$(".scoreMove"+i.num).animate({top:$(".scoreMove"+i.num).offset().top-50,opacity:"0"},800,function(){$(this).remove()}),i.score>i.endNum&&i.timerSwitch&&(i.startNum+=400,i.endNum+=400,i.timerSwitch=!1,clearInterval(i.goodsTimer),i.goodsTimer=setInterval(function(){i.creatGoods()},i.timerNum))},s.prototype.clear=function(t,e){setTimeout(function(){$("."+t+e).remove()},1300)},s.prototype.click=function(){var t=this;$(document).on("click",".goods",function(){"yes"==$(this).attr("data-click")&&($(this).attr("data-click","false"),t.state($(this),$(this).offset(),$(this).width()))})},s.prototype.state=function(t,e,s){var i=this,r=null;switch(t.attr("data-state")){case"+10":i.score+=10,musicPlay("click"),r=i.R.score10.src;break;case"+20":musicPlay("click"),r=i.R.score20.src,i.score+=20;break;case"-5":musicPlay("boom"),i.score-=5,r=i.R.score5.src}i.score<0&&(i.score=0),$("#score span").html(i.score),i.creatScore(r,e,s),i.score>=i.startNum&&i.score<=i.endNum?(t.remove(),clearInterval(i.goodsTimer),$(".goods").remove(),i.creatGoods()):(i.timerNum-=10,i.timerNum<=200&&(i.timerNum=200),clearInterval(i.goodsTimer),i.goodsTimer=setInterval(function(){i.ss<=0&&i.ms<=0&&i.over(),i.creatGoods()},i.timerNum),t.fadeOut(250))},s.prototype.time=function(){var t=this;t.timeTimer=setInterval(function(){t.ms--,t.ms<=0&&(t.ss<=0?t.over():(t.ms=9,t.ss--)),$("#ss").html(t.ss),$("#ms").html(t.ms)},100)},s.prototype.over=function(){clearInterval(this.timeTimer),clearInterval(this.goodsTimer),$(".goods").remove(),musicPlay("bgpause"),game_over()}},function(t,e,s){"use strict";s.r(e);s(1),s(0)}]);
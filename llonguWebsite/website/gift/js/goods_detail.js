//购买层缩略图
var i=0;
$(".shop_picture_bottom .prev").click(function(){
	i--;
	if(i<0){i=3}
	goes();
})

$(".shop_picture_bottom .next").click(function(){
	i++;
	if(i>3){i=0}
	goes();
})


$(".shop_picture_bottom li").mouseover(function(){
	i=$(this).index();console.log(i)
	goes();
})

function goes(){
	$(".shop_picture img").eq(i).show().siblings().hide();
    $(".shop_picture_bottom li").eq(i).find(".li_black").hide();
	$(".shop_picture_bottom li").eq(i).siblings().find(".li_black").show();
}



//购物车

var now=$(".perice li b").html(); 

var j=$(".number .maths").val();
console.log(j)


$(".number .jian").click(function(){//减法
	j=$(".number .maths").val();
	j--;
	if(j<=0){j=0;}
	$(".number .maths").val(j);

});

$(".number .jia").click(function(){//加法
	j=$(".number .maths").val();
	j++;
	$(".number .maths").val(j);
	
});



//商品详情
$(".goods_detail span").click(function(){
	var i=$(this).index();
	$(this).css("color","#FB565C").siblings().css("color","#2D313D")
	$(".picture_main .picture_mains").eq(i).show().siblings().hide();
})

$(".look_main .look_main_list img").hover(function(){
	$(this).css({"transform":"scale(1.2)","transition":"1s"})
	
},function(){
	$(this).css({"transform":"scale(1)","transition":"1s"})
	
})

//幻灯片
var hd=0;
$(".look_main .prev").click(function(){
	hd--;
	if(hd<0){hd=2}
	pictures();
})

$(".look_main .next").click(function(){
	hd++;
	if(hd>2){hd=0}
	pictures();
})


function pictures(){
	$(".look_main_move").css({"marginLeft":-(1165*hd)+"px","transition":"1s"})
}
console.log($(".look_main_list").width());


window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin","sqq","douban","bdhome","ty"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];


//放大镜
//$("#boxs .looks").click(function(){})
  var bbox = document.getElementById("boxs");//大盒子
  var bmove = document.getElementById("moveing");//大盒子里面的鼠标跟动盒子
  var bbimg = document.getElementById("bimg");//右侧放大盒子
  var b_bimg = document.getElementById("b_bimg");//放大盒子里的图片
  
  bbox.onmouseover = function(){//鼠标移动到box上显示跟动盒子和右侧放大盒子
    bbimg.style.display = "block";
	bmove.style.display="none";
	$(this).css({"cursor":"url(images/searchs.png),auto"})
  }
 bbox.onmouseout = function(){//鼠标移开box不显示大图片和选框
  bbimg.style.display = "none";
  bmove.style.display="none";
 }
 
  bbox.onmousemove = function(e){//获取鼠标位置
    var x = e.pageX; //鼠标相对于（（浏览器）视口）的位置    水平方向
    var y = e.pageY;
    var tops = bbox.offsetTop;//box（大盒子）相对于视口的位置
    var lefts = bbox.offsetLeft;
    
    
    var _left = x-lefts-bmove.offsetWidth/2;  //计算move的位置
    var _top = y-tops-bmove.offsetHeight/2;  //鼠标距离浏览器顶部的距离 减去 （跟动盒子的高度 除以2)
    
    if(_top<=0)//滑到box的最顶部
      _top = 0;
    else if(_top>=bbox.offsetHeight-bmove.offsetHeight)//滑到box的最底部
      _top = bbox.offsetHeight-bmove.offsetHeight ;
    if(_left<=0)//滑到box的最左边
      _left=0;
    else if(_left>=bbox.offsetWidth-bmove.offsetWidth)//滑到box的最右边
      _left=bbox.offsetWidth-bmove.offsetWidth ;
//   alert(e.pageX)
//   var ws=x-lefts;
//   console.log(ws)
    bmove.style.top = _top+"px";//设置move的位置
    bmove.style.left = _left+"px";
    var w = _left/(bbox.offsetWidth-bmove.offsetWidth); //计算移动的比例
    var h = _top/(bbox.offsetHeight-bmove.offsetHeight);
    var maptop = (b_bimg.offsetHeight-bbimg.offsetHeight)*h;//计算大图的位置
    var mapleft = (b_bimg.offsetWidth-bbimg.offsetWidth)*w;
    b_bimg.style.top = -maptop+"px";//设置大图的位置信息
    b_bimg.style.left = -mapleft+"px";
  }
     

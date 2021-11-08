//
////图片列表放上去和退出时候
//$(".main_pircture .picture_list li").mouseover(function(){
//	$(this).css({"background":"#fb565c","border":"#fff 1px solid"});
//	$(this).find(".list_bottom .right a:first-child img").attr('src','images/search52.png')
//	$(this).find(".list_bottom .right a:last-child img").attr('src','images/search42.png')
//	$(this).find(".list_bottom p a").css("color","#fff")
//	$(this).find(".list_bottom span").css("color","#fff")
//})
//
//$(".main_pircture .picture_list li").mouseout(function(){
//	$(this).css({"background":"","border":"#96989e 1px solid"});
//	$(this).find(".list_bottom .right a:first-child img").attr('src','images/search5.png')
//	$(this).find(".list_bottom .right a:last-child img").attr('src','images/search4.png')
//	$(this).find(".list_bottom p a").css("color","#2d313d")
//	$(this).find(".list_bottom span").css("color","#2d313d")
//})
//
////默认样式
//$(".main_pircture .main_list").eq(0).show();
//$(".page_go .number_page").eq(0).css({"borderColor":"#fb565c","color":"#fb565c"});
//
//var i=0;
//
//$(".page_go .next").click(function(){//下一张
//	
//	i++;
//	
//	$(".main_pircture .main_list").eq(i).show().siblings(".main_list").hide();
//	})
//$(".page_go .prev").click(function(){//上一张
//	
//	i--;
//	if(i<=0){i=0;}
//	$(".main_pircture .main_list").eq(i).show().siblings(".main_list").hide();
//	})
//$(".page_go .nexts").click(function(){//最后一张
//	
//	
//	i=5;
//	$(".main_pircture .main_list").eq(5).show().siblings(".main_list").hide();
//	})
//$(".page_go .prevs").click(function(){//第一张
//	
//	i=0;
//	$(".main_pircture .main_list").eq(0).show().siblings(".main_list").hide();
//	})
//
//$(".page_go .number_page").click(function(){//点击页数切换效果
//	$(this).css({"borderColor":"#fb565c","color":"#fb565c"}).siblings(".number_page").css({"borderColor":"#c0c1c4","color":"#cfd0d1"});
//	})
//
//$(".page_go").click(function(){
//	scroll(0,130)
//})


//$(".pierce_inner a").not(".pierce_none").click(function(){
//$(this).css("color","#fb565c").siblings().not(".pierce_none").css("color","#2d313d")
//
//})



//百度地图API功能
	var map = new BMap.Map("allmap");    // 创建Map实例
	
	map.centerAndZoom(new BMap.Point(106.45000, 29.56667), 12);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("重庆");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	

	
	//创建小狐狸
	var pt = new BMap.Point(106.45000, 29.56667);
	var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
	var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
	map.addOverlay(marker2);              // 将标注添加到地图中


 // 添加带有定位的导航控件
  var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
  });
  map.addControl(navigationControl);
  // 添加定位控件
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
  });
  map.addControl(geolocationControl);
  
 //三级联动菜单
$(function(){
	
var nums;
var numss;
var newselect1=["重庆市","北京市","天津市","上海市"]
var newselect2=[["渝中区","沙坪坝区","九龙坡区","江北区"],["朝阳区","海淀区","东城区","西城区"],["和平区","河东区","河西区","河北区"],["黄浦区","杨浦区","虹口区","浦东区"]]
var newselect3=[[["1街道","1街道","1街道","1街道"],["11镇","11镇","11镇","11镇"],["111镇","111镇","111镇","111镇"],["1111镇","1111镇","1111镇","1111镇"]],[["2镇","2镇","2镇","2镇"],["22镇","22镇","22镇","22镇"],["222镇","222镇","222镇","222镇"],["2222镇","2222镇","2222镇","2222镇"]],[["3镇","3镇","3镇","3镇"],["33镇","33镇","33镇","33镇"],["333镇","333镇","333镇","333镇"],["3333镇","3333镇","3333镇","3333镇"]],[["4镇","4镇","4镇","4镇"],["44镇","44镇","44镇","44镇"],["444镇","444镇","444镇","444镇"],["4444镇","4444镇","4444镇","4444镇"]]]




 

	for(i=0;i<newselect1.length;i++){
		$("#select1").append("<option>"+newselect1[i]+"</option>")//把第一个数组的直辖市加进第一个下拉菜单里面去
		}
	
	$("#select1").change(function(){//当第一个下拉菜单改变是第二个下拉菜单的下标是相对应的
		 $("#select3").children().not(":eq(0)").remove();//删除重复出现的索引组
		$("#select2").children().not(":eq(0)").remove();//删除重复出现的索引组
		nums=$(this).children("option:selected").index();//定义变量 保存当前子级里所被选中的下标
		var citys=newselect2[nums-1];//定义变量重新保存 因为当前nums里的下标含有 --请选择--这个下标所以要减一
		
		for(a=0;a<citys.length;a++){//把相对应的二维数组下标存入进去
			$("#select2").append("<option>"+citys[a]+"</option>");
			}		
		
	  })
	  
	 $("#select2").change(function(){//当第二个下拉菜单被改变时候
		 $("#select3").children().not(":eq(0)").remove();//删除重复出现的索引组
		 numss=$(this).children("option:selected").index();//定义变量 保存当前子级里所被选中的下
		 var contrys=newselect3[nums-1][numss-1];//定义变量重新保存 因为当前nums里的下标含有 --请选择--这个下标所以要减一（因为是三维数组 所以要再减一）
		 for(b=0;b<contrys.length;b++){//把相对应的二维数组下标存入进去
			 	$("#select3").append("<option>"+contrys[b]+"</option>");
			 }
		 
		 
		 
		 }) 
	 

	
	
}) 


//默认样式
$(".main .main_list").eq(2).show();
$(".look_main_list li").eq(2).css({"width":"13.25rem","height":"10.65rem"}).find(".li_black").hide();

//点击时
var i=2;
$(".look_main .prev").click(function(){
	i--;
	if(i<0){i=4}
	goes();
})

$(".look_main .next").click(function(){
	i++;
	if(i>4){i=0}
	goes();
})


$(".look_main_list li").mouseover(function(){
	i=$(this).index();
	goes();
})

function goes(){
	$(".main .main_list").eq(i).show().siblings().hide();
    $(".look_main_list li").eq(i).css({"width":"13.25rem","height":"10.65rem","transition":".5s"}).find(".li_black").hide();
	$(".look_main_list li").eq(i).siblings().css({"width":"7.05rem","height":"5.7rem"}).find(".li_black").show();;
}


//验证电话号码
function getgo(){
	var valus=$(".file_text .numbers").val();
	objs=/^1[34578]\d{9}$/;
	//  ^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
	if(objs.test(valus)==true){return true;}else{alert("This phone number is fake");return false;}
}










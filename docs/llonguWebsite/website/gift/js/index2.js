console.log($(".New_Products_picture").width());
var i=0;
$(".New_Products .prev").click(prevs);

function prevs(){
 i--;
if(i<0){i=2;}
moves();
}

$(".New_Products .next").click(nexts)
function nexts(){
 i++;
if(i>2){i=0;}
moves();
}

function moves(){
$(".New_Products_list").css({"marginLeft":-(1170*i)+"px","transition":"1s"})
}

//验证电话号码
function getgo(){
	var valus=$(".file_text .numbers").val();
	objs=/^1[34578]\d{9}$/;
	//  ^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
	if(objs.test(valus)==true){return true;}else{alert("This phone number is fake");return false;}
}



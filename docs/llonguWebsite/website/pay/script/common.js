var newnum = localStorage.getItem('newnum');
var lodeval=null;
if(newnum=='null' || newnum==null || newnum==''){
	newnum = 'zh';//默认中文
	localStorage.setItem('newnum',newnum);
}

var font=FONT[newnum];
 
//var BASE_URL = 'http://47.97.114.138/';

// var BASE_URL = 'http://202.162.111.32/';
//var BASE_URL = 'http://47.75.65.48/';

 var BASE_URL = 'http://192.168.1.161/';
   var BASE_URLs = 'http://192.168.1.127:8080/';
//    var BASE_URL = 'http://47.75.114.21/';

//  var BASE_URL = 'http://192.168.1.120/';
//var BASE_URL = 'http://app.jm520.cn/';
function ajax(url, data, callback) {
	var newnums = localStorage.getItem('newnum');
	var language=newnums;
	
	if(data) { 
		data.language = language;
		data.appVersion = 1;
	} else {
		data = {
			language:language,
            appVersion:1
		};
	}
	
	if(lodeval==null){
		lodeval=localStorage.getItem('lodeval');
	}
	// console.warn(JSON.stringify(data)+'发送的data');
	api.ajax({ 
		url: url,
		method: 'post',
		data: {
			values: data
		},
		headers:{Check:lodeval},
		timeout: 60
	}, function(ret, err) {
		// console.log(JSON.stringify(ret)+url);
		// console.log(JSON.stringify(err));
		if(ret) {
			if(ret.code == 8000) {
				localStorage.clear();
				api.closeToWin({
					name: 'root',
				})
			}else if(ret.code>=8001){
				api.rebootApp();
			}else {
				callback && callback(ret);
			}
		} else {
			if(err.statusCode == 403) {
				api.toast({
					msg: '请求错误，代码A182403',
					duration: 2000,
					location: 'bottom'
				});
			} else if(err.statusCode == 404) {
				api.toast({
					msg: '请求错误，代码A182404',
					duration: 2000,
					location: 'bottom'
				});
			} else if(err.statusCode == 500) {
				api.toast({
					msg: '请求错误，代码A182500',
					duration: 2000,
					location: 'bottom'
				});
			} else if(err.statusCode == 502) {
				api.toast({
					msg: '请求错误，代码A182502',
					duration: 2000,
					location: 'bottom'
				});
			} else if(err.statusCode == 503) {
				api.toast({
					msg: '请求错误，代码A182503',
					duration: 2000,
					location: 'bottom'
				});
			} else if(err.statusCode == 504) {
				api.toast({
					msg: '请求错误，代码A182504',
					duration: 2000,
					location: 'bottom'
				});
			}else{
				api.toast({
					msg: '网络错误',
					duration: 2000,
					location: 'bottom'
				});
			}
			api.ajax({
				url: BASE_URL + 'index.php/index/index/pushError',
				method: 'post',
				data: {
					values: {
						url: url,
						err: JSON.stringify(err),
						account: localStorage.getItem('account')
					}
				}
			}, function(ret, err) {
				// if (ret) {
				//     // alert( JSON.stringify( ret ) );
				// } else {
				//     alert( JSON.stringify( err ) );
				// }
			});

			
		}
	});
}
if('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

//图片功能
function getPicture(opt,callback){
	api.getPicture({
		sourceType: opt.sourceType || 'camera',
		encodingType: 'jpg',
		mediaValue: 'pic',
		destinationType:opt.destinationType ||  'url',
		allowEdit: true,
		quality: opt.quality || 50,
		targetWidth: 300,
		targetHeight: 300,
		saveToPhotoAlbum: false
	}, function (ret, err) {
		if (ret && ret.data) {
			callback && callback(ret);
		} else {
			api.toast({
				msg: '未选择图片',
				duration: 1000,
				location: 'bottom'
			});
		}
	});
}

//Promise
function MyPromise(func,done){
	var self = this;
	var count = 0;
	this.cbklist = [];
	this.pramalist=[];
	this.then = function(callback){
		//获取剩余参数 删除callback
		if(arguments.length>1){
			var arr=Array.prototype.slice.call(arguments);
				arr.splice(0,1);
				self.pramalist.push(arr);
		}

		this.cbklist.push(callback);
		return this;
	}
	this.success = function(prama){//仅支持最后一个回调参数
		if(count == self.cbklist.length){
			done && done(prama);
		}else{ 
			if(self.pramalist.length>=1){
				//传入参数 
				var count2=count;
				self.cbklist[count++](self.success,self.pramalist[count2]);
			}else{
				self.cbklist[count++](self.success);
			}
		}
	}
	setTimeout(function(){
		func(self.success);
	},0);
}

//Vue全局过滤器
window.filterOpt={
	time:function(value,discount){
		if(value!=''){
			return (value/60).toFixed(0)+'分钟';
		}
	},
	km:function(value,discount){
		if(value!=''){
			var num=value/1000;
				if(num.toString().length>4){
					num=num.toFixed(2);
				}
			return num+"Km";
		}
	},
	toFixedtwo:function(value){
		var num=Number(value).toFixed(2);
		if(isNaN(num)){
			return '0.00';
		}
		return num;
	},
	
};

for(var i in filterOpt){
	Vue.filter(i,filterOpt[i]);
}

//缓存
var localsave = {
	//account  pwd 账号密码
	//lodeval header头
	//bmlongitude bmlatitude 经纬度
	//moneysee 金额隐藏显示
	//myselftoken token
	myselfinfo:'myselfinfo',//自身信息缓存name
    newFirend: {//好友请求列表 
        name:'firendlist',
        save: function (data) {
			var arr = [];
			// data.target_id 接收方id 即自己id 为存储标识
            if (localStorage.getItem(localsave.newFirend.name+data.target_id)) {
                arr = JSON.parse(localStorage.getItem(localsave.newFirend.name+data.target_id));
                for (var i = 0;i<arr.length;i++){//判断是否已经存在
                    if(arr[i].sender==data.sender)return;//对方id sender
				}
                arr.push(data);
            } else { 
                arr.push(data);
            }
			localStorage.setItem(localsave.newFirend.name+data.target_id,JSON.stringify(arr));
        },
        get: function () {
			var selfid=null;
			if(localStorage.getItem(localsave.myselfinfo)){//myselfinfo是否存在
				selfid=JSON.parse(localStorage.getItem(localsave.myselfinfo)).id;

				if(localStorage.getItem(localsave.newFirend.name+selfid)){
					var arr = JSON.parse(localStorage.getItem(localsave.newFirend.name+selfid));
					return arr;
				}
			}
           
        },
		del: function (id) {//同意添加/忽略 删除缓存列表的好友
			var selfid=JSON.parse(localStorage.getItem(localsave.myselfinfo)).id;

            var arr = JSON.parse(localStorage.getItem(localsave.newFirend.name+selfid));
            for (var i = 0;i<arr.length;i++){
				if(arr[i].sender==id){//对方id sender
					arr.splice(i,1); 
					localStorage.setItem(localsave.newFirend.name+selfid, JSON.stringify(arr));
                    break;
                }
			}
        }
    }
} 


// localStorage.clear()
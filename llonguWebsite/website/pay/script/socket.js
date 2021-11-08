// sid:            //socket的唯一标识，字符串类型
// state:            //socket状态码，见常量里面的socket状态码，数字类型
// data:            //state为接收数据时的数据，字符串类型
// host：            //udp收到数据时发送方地址
// port：            //udp收到数据时发送方端口
// 101 //创建成功
// 102 //连接成功
// 103 //收到数据
// 201 //创建失败
// 202 //连接失败
// 203 //异常断开
// 204 //正常断开
// 205 //发生未知错误断开
window.socketManager = function () {

    this.socket = api.require('socketManager');
    this.myself = null;//自己ID/昵称/头像 { id nick head }
    this.SocketAuth = null;//socket token
    this.sid = null;
    this.state = null;
    this.data = null;

    this.objhost = null;
    this.objport = null;

    this.num=0;//连接次数
 
}

//创建socket
socketManager.prototype.create = function () {
    var self = this;

    this.socket.createSocket({
        host: '192.168.1.161',
        port: 8765
    }, function (ret, err) {
        if (ret) {
            // console.warn(JSON.stringify(ret) + '接收的消息');
            self.sid = ret.sid;//接收sid
            self.data = ret.data;//接收数据
            self.state = ret.state;//接收状态

            //状态处理
            self.getState();
        } else {
            // console.error(JSON.stringify(err) + '创建 err')
        }
    });

}

//状态处理
socketManager.prototype.getState = function () {
    var self = this;
    switch (this.state) {
        case 101:
            break;
        case 102:
            var sendmsg = {
                type: 'login',
                auth: self.SocketAuth
            };
            self.write(sendmsg)
            break;
        case 103:
            //消息解析
            var msgs = self.data.split("\r\n");
            // console.log(msgs+'消息解析')
            for (var i = 0; i < msgs.length; i++) {
                if (msgs[i]) {
                    self.onMsg(msgs[i]);
                }
            }
            break;
        case 201:
            break;
        case 202:
            break;
        case 203:
          
            break;
        case 204:
            break;
        case 205:
              self.close();
            if(self.num<=3){
                self.num++;
                self.create();
            }
            break;
        default:
            break;
    }
}

//消息处理
socketManager.prototype.onMsg = function (msg) {
    // console.log(msg + '消息处理')
    var self = this;
    // msg = msg.substr(1, msg.length - 2);
    // msg = msg.replace(/\\"/g, '"');
    // msg = msg.replace(/\\\\/g, '\\');
    try {
        msg = JSON.parse(msg);
    } catch (e) {
        // console.error('parse err  ' +  msg);
        return;
    }
  
    // console.log(JSON.stringify(msg) + '消息处理后');

    switch (msg.type) {
        case 'ping'://心跳
            var sendmsg = {
                type: 'pong'
            };
            self.write(sendmsg);
            break;
        case 'voice'://语音播报
            api.sendEvent({
                name:'voice',
                extra:{
                    msg:msg.msg
                }
            })
            break;
        case "toast"://需要提示的页面，目前只有vedio,表示直播页面
            api.sendEvent({
                name:'liveroom',
                extra:{
                    toast:msg
                }
            })
            break;
        case 'privateMsg'://单聊=>匹配消息类型 msgType
            self.privateMsg(msg)
            break;
        case 'groupMsg'://群聊
            self.groupMsg(msg)
            break;
        case 'roomMsg'://直播
            self.liveMsg(msg)
            break;
        case 'roomNotice'://直播间开播通知
            api.sendEvent({
                name:'show',
                extra:{
                    livenum:1
                }
            })
            
            break;
        default:
            // alert('msg.type 不存在');
            break;

    }
}

//单聊类型 匹配消息类型 msgType
socketManager.prototype.privateMsg = function (msg) {
    switch (msg.msgType) {
        case 'text'://文本类型
        case 'image'://图片类型
        case "voice"://语音类型
        case 'redBag'://红包类型
            api.sendEvent({
                name: 'getfirendchat',
                extra: {
                    msg: msg
                }
            })
            break;
        case 'friendRequest'://好友申请
            api.sendEvent({
                name: 'firendlist',
                extra:{
                    type:'friendRequest',
                    msg:msg
                }
            })
            break;
        case 'agreeFriend'://同意好友申请
            api.sendEvent({
                name: 'firendlist'
            })
            break;
        case 'delFriend'://被删除好友通知
            api.sendEvent({
                name: 'firendlist',
                extra:{
                    type:'delFriend',
                    sender:msg.sender
                }
            })
            break;
        case 'receivedBag'://红包被领取通知
            api.sendEvent({
                name:'bagover',
                extra:{
                    bagid:msg.content
                }
            })
            break;
        case 'joinGroup'://被拉入群 
            api.sendEvent({
                name: 'grouplist',
                extra:{
                    type:'jionGroup',
                }
            })
            break;
        case 'quitGroup'://被踢出群 
            api.sendEvent({
                name: 'grouplist',
                extra:{
                    type:'quitGroup',
                    groupid:msg.content
                }
            })
            break;
        default:
            // alert('privateMsg msg.msgType 不存在');
            break;

    }
}

//群聊类型 匹配消息类型 msgType
socketManager.prototype.groupMsg = function (msg) {

    switch (msg.msgType) {
        case 'text'://文本类型
        case 'image'://图片类型
        case "voice"://语音类型
        case 'redBag'://红包类型
            api.sendEvent({
                name: 'getgroupchat',
                extra: {
                    msg: msg
                }
            })
            break;
        default:
            // alert('groupMsg msg.msgType 不存在');
            break;
    }
}

//直播类型 匹配消息类型 msgType
socketManager.prototype.liveMsg = function (msg) {

    switch (msg.msgType) {
        case 'text'://文本类型
        case "voice"://语音类型
            api.sendEvent({
                name: 'getlivechat',
                extra: {
                    msg: msg
                }
            })
            break;
        case 'gift'://礼物类型
            api.sendEvent({
                name: 'getlivegift',
                extra: {
                    msg: msg
                }
            })
            break;    
        case 'refreshNum'://刷新直播间人数 类型
            api.sendEvent({
                name: 'refreshNum',
                extra: {
                    msg: msg
                }
            })
            break;
        case 'refreshMan'://管理员变更通知
            api.sendEvent({
                name: 'refreshMan',
                extra: {
                    msg: msg
                }
            })
            break;
         case 'refreshHost'://房间主持人变更通知
            api.sendEvent({
                name: 'refreshHost',
                extra: {
                    msg: msg
                }
            })
            break;    
        default:
            // alert('liveMsg msg.msgType 不存在');
            break;
    }
}

//发送数据
socketManager.prototype.write = function (data, callback) {
    // console.log(JSON.stringify(data) + '即将发送的数据')
    var self = this;
    if (!this.sid) {
        this.create();
        return;
    }
    //消息格式
    data = JSON.stringify(data) + "\r\n";
    this.socket.write({
        sid: self.sid,
        data: data
    }, function (ret, err) {
        if (ret.status) {
            callback && callback();
        } else {
            // console.log(JSON.stringify(err))
            api.toast({
                msg: '网络错误,消息发送失败',
                duration: 2000,
                location: 'bottom'
            });
        }
    });
}

//关闭socket
socketManager.prototype.close = function () {
    var self = this;
    this.socket.closeSocket({
        sid: self.sid
    }, function (ret, err) {
        if (ret.status) {
            self.sid = null;
            // console.warn(JSON.stringify(ret) + '关闭 成功');
        } else {
            console.error(JSON.stringify(err) + '关闭 err')
        }
    });
}



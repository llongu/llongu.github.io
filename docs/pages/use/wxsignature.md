# 微信分享 前后端签名

## node
```js
const {createHash}=require('crypto');

const appId='微信公众号查看'
const secret='微信公众号查看'

let  access_token=''
let  jsapi_ticket=''

const wxsignature = async (ctx) => {
    const { body } = ctx.request;
    const nonceStr='mathrandomstrings'
    const timestamp=Date.now();

     if(!access_token){
          const get_access_token = await  ctx.axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`)
         access_token=get_access_token.access_token
     }
    /* jsapi_ticket的有效期为7200秒，通过access_token来获取。由于获取jsapi_ticket的api调用次数非常有限，
     频繁刷新jsapi_ticket会导致api调用受限，影响自身业务，开发者必须在自己的服务全局缓存jsapi_ticket 。*/
     if(!jsapi_ticket){
        const get_ticket = await  ctx.axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`)
        jsapi_ticket=get_ticket.ticket
     }
     console.log('%c 🍪 access_token: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', access_token);
     console.log('%c 🍪 jsapi_ticket: ', 'font-size:20px;background-color: #ED9EC7;color:#fff;', jsapi_ticket);
    //对string1进行sha1签名，得到signature：
    const sha1_url=ctx.request.header.referer 
    console.log(sha1_url)
    
    const sha1=createHash('sha1')
    sha1.update(`jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${sha1_url}`)
    const signature= sha1.digest('hex')

    console.log('%c 🍍 signature: ', 'font-size:20px;background-color: #465975;color:#fff;', signature);

    ctx.success({
        data: {
            signature,
            appId,
            nonceStr,
            timestamp,
        },
    });
};

module.exports = wxsignature;
```


## js
```JS
;((d) => {
  function isWXApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return ua.indexOf("MicroMessenger") > -1;
  }

  if (!isWXApp()) return;
  const wxscript= d.createElement("script");
  wxscript.type = "text/javascript";
  wxscript.src ='http://res2.wx.qq.com/open/js/jweixin-1.6.0.js'
  wxscript.onload=() =>{

    const wxsharebtn = d.getElementById("wx-share-btn");
    wxsharebtn.style.display = "block";
    wxsharebtn.removeEventListener("click", wxsignature);
    wxsharebtn.addEventListener("click", wxsignature);

    async function wxsignature() {
            const res = await axios.post("/api/wxsignature");
            let wxinfo=res.data.data || {}
            alert(JSON.stringify(wxinfo))
        const { signature, appId, nonceStr, timestamp } = wxinfo
        console.log('%c 🍾 wxinfo: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', wxinfo);

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳 与服务端一致
          nonceStr, // 必填，生成签名的随机串 与服务端一致
          signature, // 必填，签名
          jsApiList: ["onMenuShareAppMessage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          openTagList: []
        });

        wx.ready(function () {
        console.log("wxready");
        //需在用户可能点击分享按钮前就先调用
        //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        wx.onMenuShareAppMessage({
            title: "这是分享朋友", // 分享标题
            desc: "给朋友”及“分享到QQ”按钮的分享内容",
            link: "http://37h31428t8.qicp.vip", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:
            "http://t14.baidu.com/it/u=2566172515,548410825&fm=224&app=112&f=JPEG?w=200&h=200", // 分享图标
            success: function () {
            console.log("分享给朋友”及“分享到QQ设置成功");
            },
        });
        });

        wx.error(function (res) {
        console.log("wxerror", res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    }

    }
    d.body.appendChild(wxscript);
})(document);

```
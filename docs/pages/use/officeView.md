##  1. 预览方式


1. **借助第三方微软接口帮助预览 (doc,excel,ppt都可以)**

 [在线预览](https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fvideo.ch9.ms%2Fbuild%2F2011%2Fslides%2FTOOL-532T_Sutter.pptx)

- 优势：方便快捷，兼容，各类型文档都可以预览

- 劣势：第三方服务安全性差，重要文件慎用。服务链接是否稳定是否会挂掉。预览页面按钮操作等功能不受控制。

- 大小限制：Word 和 PowerPoint 文档必须小于 10 兆字节;Excel 必须小于五个兆字节
        
[更多第三方预览方案：](https://blog.csdn.net/weixin_39849387/article/details/111854262)

2. **前后端处理**

 - pdf：浏览器iframe 自带预览功能或pdf.js等插件方案

 - excel: 前端使用 [sheetjs](https://github.com/SheetJS/sheetjs) 导入文件，读取行列数据，使用表格展示(导入格式需要固定，有规范。否则解析后是无规则的组合，较难匹配展示)

    word ：前端只支持 docx类型使用  [mammoth.js](https://jstool.gitlab.io/zh-cn/demo/mammoth-js-word-docx-preview-and-convert/)、[docx-preview](https://www.npmjs.com/package/docx-preview)、等转为html直接预览。

    不支持doc类型文件，需要后端支持：转为docx文件 或 直接转为img、html、xml格式返回，前端展示

-  ppt: 不支持，需要后端处理

3. **阿里云(推荐)** 

    [文档](https://help.aliyun.com/document_detail/63752.html)

    借助oss存储，并开通 `智能媒体管理` 服务，需要将 文档转换为 VECTOR 格式，并使用STS临时访问凭证访问OSS;

    前端通过接口实时获取STS密钥与oss预览路径后通过sdk 渲染预览，支持水印等更多功能


## 2. 阿里云预览代码示例

 **采用 [文档预览v1 JavaScript API](https://help.aliyun.com/document_detail/74947.html#title-zd8-q5b-wkx)**

1. 注册消息发送时间 `window.sendMessage`  使用 `postMessage` 与 iframe 通信
2. `window.addEventListener('message')` 接收消息事件  ,当 iframe 加载完成后会接收到 'preview.ready' 
3. **以上事件必须在 iframe load 触发前注册**
4. 为什么可以接收到`preview.ready` 事件：
            `https://preview.imm.aliyuncs.com/index.html` 阿里云预览页面，使用 `postMessage` 传递消息

```js
      window.onload=function(){
		console.log('阿里云预览页面 被加载了')
		const data={
			action:'preview.ready'
		}
		window.parent.postMessage(JSON.stringify(data),'*')
　 　}
```

```js
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title></title>
            <style>
            * {
                box-sizing: border-box;
            }
            html, body {
                padding: 0;
                margin: 0;
                height: 100%;
                /* 防止双击缩放 */
                touch-action: manipulation;
            }
            .main {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            #aliyunPreview {
                flex: 1;
            }
            </style>
            <script type="text/javascript" charset="utf-8">
        
            function json2str(obj) {
                return JSON.stringify(obj, function(key, val) {
                if (typeof val === 'function') {
                    val = val.toString();
                }
                return val;
                });
            };

            window.sendMessage = function(action, data) {
                var iframe = document.getElementById('aliyunPreview');
                iframe.contentWindow.postMessage(json2str({ action: action, data: data }), '*');
            };

            window.addEventListener('message', function(e) {
                try {
                var res = JSON.parse(e.data);
                console.log(res)
                } catch(err) {
                return;
                }

                switch (res.action) {
                case 'preview.ready':
                    window.sendMessage('preview.init', {
                    url:'https://xx-dev-sz.oss-cn-xx.aliyuncs.com/file/vector/xxx.docx',
                    copy:0,
                    wmType:1,
                    wmValue:'水印名称',

                    accessKeyId: "STS.xxx",
                    accessKeySecret: "xxx",
                    bucket: "xxx",
                    region: "oss-cn-beijing",
                    stsToken: "xxx"
                
                    });
                    break;
                }
            }, false);

            //禁止双指缩放手势。
            document.addEventListener('gesturestart', function (e) {
                e.preventDefault();
            });
            </script>
        </head>
        <body>
            // 通过url 预览  
            //   https://preview.imm.aliyuncs.com/index.html?
            //   url=https://xx-dev-sz.oss-cn-xx.aliyuncs.com/file/vector/xxx.docx
            //   &accessKeyId=xx
            //   &accessKeySecret=xx
            //   &stsToken=xx
            //   &region=xx
            //   &bucket=xx
            <iframe
            width="100%"
            height="100%"
            allowfullscreen
            id="aliyunPreview"
            frameborder="0"
            src="https://preview.imm.aliyuncs.com/index.html"
            ></iframe>
        </body>
        </html>

```


### 2.1 vue  使用iframe的 坑 与 nuxt.js使用

1. iframe 加载事件，会比vue 事件快，在beforeCreate之前，所以 onload  如果绑定在 iframe 标签上就无法与vue 绑定事件

2. 因为比vue 加载快,但是预览注册事件通常会在vue钩子里面，所以就会造 iframe 加载完成，阿里云页面回调信息，但当前页面监听事件还未生效就会造成无法预览，这时候必须，在careted 注册预览事件，之后在mounted 里面获取iframe 动态赋值src 才可以

3. nuxt.js created 里面获取不到window对象，注册事件必须使用 `if(process.browser){  // register }` 包裹
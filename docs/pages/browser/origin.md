> ### 什么是同源

- 协议相同
- 域名相同
- 端口相同

> ### 目的

为了保证用户信息安全，防止恶意网站窃取数据

> ### 受限制的

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 无法获得
- AJAX 请求不能发送

> ### 不受限制的

```javascript
<script src="..."></script>
<img>
<link>
<iframe>
```

JavaScript 不能读、写加载的内容

> ### 常见跨域方案

1. **jsonp**

```javascript
function resolveJosn(result) { //浏览器端代码
    console.log(result.name);
}
var jsonpScript= document.createElement("script");
jsonpScript.type = "text/javascript";
jsonpScript.src = "http://www.qiute.com?
callbackName=resolveJson";
document.getElementsByTagName("head")[0].appendChild(jsonpScript);

php //服务器端代码
<?php
    $callback = $_GET['callback'];  // 获取回调函数名
    $arr = array("name" => "alsy", "age" => "20"); // 要请求的数据
    echo $callback."(". json_encode($arr) .");"; // 输出
?>
```

2. **cors 设置 Access-Control-Allow-Origin:\***

>     如果要发送Cookie，Access-Control-Allow-Origin就不能设为 *，必须指定明确的、与请求网页一致的域名。

3. **iframe+window.name 跨域**
   > window name 属性在一个窗口的生命周期内,窗口载入的所有的页面都是共享一个 window.name 的，每个页面都有读写的权限，且不会因新页面的载入而进行重置
   > 在 a.html 页面中使用一个隐藏的 iframe b 来充当一个中间人角色，由 iframe b 去获取 main.html 的数据，然后 a.html 再去得到 iframe b 获取到的数据

```javascript
main.html
window.name = '我是被期望得到的数据';

a.html
<body>
<iframe src="http://www.baidu.com/data.html" style="display:none" onload="getData()" </iframe>
</body>
<script>
function getData() {
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = iframe.contentWindow.name; // 得到
    }
    iframe.src = 'b.html'; // 这里b和a同源
}
</script>
```

4. **iframe+跨文档消息传递**

```javascript
a.html
<iframe src="http://www.qiutc.me/b.html" onload="onLoad()" </iframe>
function onLoad() {
    var iframe = document.getElementById('iframe');
    var iframeWindow = iframe.contentWindow;
    iframeWindow.postMessage("I'm message from main page.");//类型只能为字符串
}

b.html
window.onmessage = function(e) {
        e = e || event;
        console.log(e.data);
    }
```

5. **document.domain**

> 设置为“google.com”，则所有以“google.com”结尾的域名(二级域名，三级域名，必须属于同一个基础域名!而且所用的协议，端口都要一致)都可以共享数据
> Tips:(google.com 为顶级域名，www.google.com 为 2 级，往前加前缀的依次类推)

```javascript
google.com
document.domain = "google.com";
`localStorage[``'k'``] =` `'{"a":"1"}'``;`

www.goole.com
document.domain = "google.com";
`alert(localStorage[``'k'``]);`
```

6. **服务器代理**
7. **webSocket**

## 1. 文件上传的几种方式

首先我们来看看文件上传的几种方式。

### 普通表单上传

使用 PHP 来展示常规的表单上传是一个不错的选择。首先构建文件上传的表单，并指定表单的提交内容类型为`enctype="multipart/form-data"`，表明表单需要上传二进制数据。

```javascript
<form action="/index.php" method="POST" enctype="multipart/form-data">
  <input type="file" name="myfile">
  <input type="submit">
</form>

```

然后编写`index.php`上传文件接收代码，使用`move_uploaded_file`方法即可(php 大法好...)

```javascript
$imgName = 'IMG'.time().'.'.str_replace('image/','',$_FILES["myfile"]['type']);
$fileName =  'upload/'.$imgName;
// 移动上传文件至指定upload文件夹下，并根据返回值判断操作是否成功
if (move_uploaded_file($_FILES['myfile']['tmp_name'], $fileName)){
    echo $fileName;
}else {
    echo "nonn";
}

```

form 表单上传大文件时，很容易遇见服务器超时的问题。通过 xhr，前端也可以进行异步上传文件的操作，一般由两个思路。

### 文件编码上传

第一个思路是将文件进行编码，然后在服务端进行解码，之前写过一篇[在前端实现图片压缩上传](<https://link.juejin.im?target=%255Bhttps%3A%2F%2Fwww.shymean.com%2Farticle%2F%25E5%259C%25A8%25E5%2589%258D%25E7%25AB%25AF%25E5%25AE%259E%25E7%258E%25B0%25E5%259B%25BE%25E7%2589%2587%25E5%258E%258B%25E7%25BC%25A9%25E4%25B8%258A%25E4%25BC%25A0%255D(https%3A%2F%2Fwww.shymean.com%2Farticle%2F%25E5%259C%25A8%25E5%2589%258D%25E7%25AB%25AF%25E5%25AE%259E%25E7%258E%25B0%25E5%259B%25BE%25E7%2589%2587%25E5%258E%258B%25E7%25BC%25A9%25E4%25B8%258A%25E4%25BC%25A0)>)的博客，其主要实现原理就是将图片转换成 base64 进行传递

```javascript
var imgURL = URL.createObjectURL(file);
ctx.drawImage(imgURL, 0, 0);
// 获取图片的编码，然后将图片当做是一个很长的字符串进行传递
var data = canvas.toDataURL("image/jpeg", 0.5);
```

在服务端需要做的事情也比较简单，首先解码 base64，然后保存图片即可

```javascript
$imgData = $_REQUEST["imgData"];
$base64 = explode(",", $imgData)[1];
$img = base64_decode($base64);
$url = "./test.jpg";
if (file_put_contents($url, $img)) {
  exit(json_encode(array((url) => $url)));
}
```

base64 编码的缺点在于其体积比原图片更大（因为 Base64 将三个字节转化成四个字节，因此编码后的文本，会比原文本大出三分之一左右），对于体积很大的文件来说，上传和解析的时间会明显增加。

更多关于 base64 的知识，可以参考[Base64 笔记](<https://link.juejin.im?target=%255Bhttp%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2008%2F06%2Fbase64.html%255D(http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2008%2F06%2Fbase64.html)>)。

除了进行 base64 编码，还可以在前端直接读取文件内容后以二进制格式上传

```javascript
// 读取二进制文件
function readBinary(text) {
  var data = new ArrayBuffer(text.length);
  var ui8a = new Uint8Array(data, 0);
  for (var i = 0; i < text.length; i++) {
    ui8a[i] = text.charCodeAt(i) & 0xff;
  }
  console.log(ui8a);
}

var reader = new FileReader();
reader.onload = function () {
  readBinary(this.result); // 读取result或直接上传
};
// 把从input里读取的文件内容，放到fileReader的result字段里
reader.readAsBinaryString(file);
```

### formData 异步上传

[FormData](<https://link.juejin.im?target=https%3A%2F%2Fwww.shymean.com%2Farticle%2F(https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FFormData%2FUsing_FormData_Objects)>)对象主要用来组装一组用 XMLHttpRequest 发送请求的键/值对，可以更加灵活地发送 Ajax 请求。可以使用 FormData 来模拟表单提交。

```javascript
let files = e.target.files; // 获取input的file对象
let formData = new FormData();
formData.append("file", file);
axios.post(url, formData);
```

服务端处理方式与直接 form 表单请求基本相同。

### iframe 无刷新页面

在低版本的浏览器（如 IE）上，xhr 是不支持直接上传 formdata 的，因此只能用 form 来上传文件，而 form 提交本身会进行页面跳转，这是因为 form 表单的[target](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTML%2FElement%2Fform)属性导致的，其取值有

- \_self，默认值，在相同的窗口中打开响应页面
- \_blank，在新窗口打开
- \_parent，在父窗口打开
- \_top，在最顶层的窗口打开
- `framename`，在指定名字的 iframe 中打开

如果需要让用户体验异步上传文件的感觉，可以通过`framename`指定 iframe 来实现。把 form 的 target 属性设置为一个看不见的 iframe，那么返回的数据就会被这个 iframe 接受，因此只有该 iframe 会被刷新，至于返回结果，也可以通过解析这个 iframe 内的文本来获取。

```javascript
function upload() {
  var now = +new Date();
  var id = "frame" + now;
  $("body").append(`<iframe style="display:none;" name="${id}" id="${id}" />`);

  var $form = $("#myForm");
  $form
    .attr({
      action: "/index.php",
      method: "post",
      enctype: "multipart/form-data",
      encoding: "multipart/form-data",
      target: id,
    })
    .submit();

  $("#" + id).on("load", function () {
    var content = $(this).contents().find("body").text();
    try {
      var data = JSON.parse(content);
    } catch (e) {
      console.log(e);
    }
  });
}
```

## 2. 大文件上传

现在来看看在上面提到的几种上传方式中实现大文件上传会遇见的超时问题，

- 表单上传和 iframe 无刷新页面上传，实际上都是通过 form 标签进行上传文件，这种方式将整个请求完全交给浏览器处理，当上传大文件时，可能会遇见请求超时的情形
- 通过 fromData，其实际也是在 xhr 中封装一组请求参数，用来模拟表单请求，无法避免大文件上传超时的问题
- 编码上传，我们可以比较灵活地控制上传的内容

大文件上传最主要的问题就在于：**在同一个请求中，要上传大量的数据，导致整个过程会比较漫长，且失败后需要重头开始上传**。试想，如果我们将这个请求拆分成多个请求，每个请求的时间就会缩短，且如果某个请求失败，只需要重新发送这一次请求即可，无需从头开始，这样是否可以解决大文件上传的问题呢？

综合上面的问题，看来大文件上传需要实现下面几个需求

- 支持拆分上传请求(即切片)
- 支持断点续传
- 支持显示上传进度和暂停上传

接下来让我们依次实现这些功能，看起来最主要的功能应该就是切片了。

### 文件切片

参考： [大文件切割上传](https://link.juejin.im?target=https%3A%2F%2Fblog.csdn.net%2Fbaochao95%2Farticle%2Fdetails%2F52812876)

编码方式上传中，在前端我们只要先获取文件的二进制内容，然后对其内容进行拆分，最后将每个切片上传到服务端即可。

在 JavaScript 中，文件 FIle 对象是 Blob 对象的子类，Blob 对象包含一个重要的方法`slice`，通过这个方法，我们就可以对二进制文件进行拆分。

下面是一个拆分文件的示例

```javascript
function slice(file, piece = 1024 * 1024 * 5) {
  let totalSize = file.size; // 文件总大小
  let start = 0; // 每次上传的开始字节
  let end = start + piece; // 每次上传的结尾字节
  let chunks = [];
  while (start < totalSize) {
    // 根据长度截取每次需要上传的数据
    // File对象继承自Blob对象，因此包含slice方法
    let blob = file.slice(start, end);
    chunks.push(blob);

    start = end;
    end = start + piece;
  }
  return chunks;
}
```

将文件拆分成`piece`大小的分块，然后每次请求只需要上传这一个部分的分块即可

```javascript
let file = document.querySelector("[name=file]").files[0];

const LENGTH = 1024 * 1024 * 0.1;
let chunks = slice(file, LENGTH); // 首先拆分切片

chunks.forEach((chunk) => {
  let fd = new FormData();
  fd.append("file", chunk);
  post("/mkblk.php", fd);
});
```

服务器接收到这些切片后，再将他们拼接起来就可以了，下面是 PHP 拼接切片的示例代码

```javascript
$filename = './upload/' . $_POST['filename'];//确定上传的文件名
//第一次上传时没有文件，就创建文件，此后上传只需要把数据追加到此文件中
if(!file_exists($filename)){
    move_uploaded_file($_FILES['file']['tmp_name'],$filename);
}else{
    file_put_contents($filename,file_get_contents($_FILES['file']['tmp_name']),FILE_APPEND);
    echo $filename;
}

```

测试时记得修改 nginx 的 server 配置，否则大文件可能会提示`413 Request Entity Too Large`的错误。

```
server {
	// ...
	client_max_body_size 50m;
}

```

上面这种方式来存在一些问题

- 无法识别一个切片是属于哪一个切片的，当同时发生多个请求时，追加的文件内容会出错
- 切片上传接口是异步的，无法保证服务器接收到的切片是按照请求顺序拼接的

因此接下来我们来看看应该如何在服务端还原切片。

### 还原切片

在后端需要将多个相同文件的切片还原成一个文件，上面这种处理切片的做法存在下面几个问题

- 如何识别多个切片是来自于同一个文件的，这个可以在每个切片请求上传递一个相同文件的`context`参数
- 如何将多个切片还原成一个文件
  - 确认所有切片都已上传，这个可以通过客户端在切片全部上传后调用`mkfile`接口来通知服务端进行拼接
  - 找到同一个 context 下的所有切片，确认每个切片的顺序，这个可以在每个切片上标记一个位置索引值
  - 按顺序拼接切片，还原成文件

上面有一个重要的参数，即`context`，我们需要获取为一个文件的唯一标识，可以通过下面两种方式获取

- 根据文件名、文件长度等基本信息进行拼接，为了避免多个用户上传相同的文件，可以再额外拼接用户信息如 uid 等保证唯一性
- 根据文件的二进制内容计算文件的 hash，这样只要文件内容不一样，则标识也会不一样，缺点在于计算量比较大.

修改上传代码，增加相关参数

```javascript
// 获取context，同一个文件会返回相同的值
function createContext(file) {
  return file.name + file.length;
}

let file = document.querySelector("[name=file]").files[0];
const LENGTH = 1024 * 1024 * 0.1;
let chunks = slice(file, LENGTH);

// 获取对于同一个文件，获取其的context
let context = createContext(file);

let tasks = [];
chunks.forEach((chunk, index) => {
  let fd = new FormData();
  fd.append("file", chunk);
  // 传递context
  fd.append("context", context);
  // 传递切片索引值
  fd.append("chunk", index + 1);

  tasks.push(post("/mkblk.php", fd));
});
// 所有切片上传完毕后，调用mkfile接口
Promise.all(tasks).then((res) => {
  let fd = new FormData();
  fd.append("context", context);
  fd.append("chunks", chunks.length);
  post("/mkfile.php", fd).then((res) => {
    console.log(res);
  });
});
```

在`mkblk.php`接口中，我们通过`context`来保存同一个文件相关的切片

```php
// mkblk.php
$context = $_POST['context'];
$path = './upload/' . $context;
if(!is_dir($path)){
    mkdir($path);
}
// 把同一个文件的切片放在相同的目录下
$filename = $path .'/'. $_POST['chunk'];
$res = move_uploaded_file($_FILES['file']['tmp_name'],$filename);

```

除了上面这种简单通过目录区分切片的方法之外，还可以将切片信息保存在数据库来进行索引。接下来是`mkfile.php`接口的实现，这个接口会在所有切片上传后调用

```php
// mkfile.php
$context = $_POST['context'];
$chunks = (int)$_POST['chunks'];

//合并后的文件名
$filename = './upload/' . $context . '/file.jpg';
for($i = 1; $i <= $chunks; ++$i){
    $file = './upload/'.$context. '/' .$i; // 读取单个切块
    $content = file_get_contents($file);
    if(!file_exists($filename)){
        $fd = fopen($filename, "w+");
    }else{
        $fd = fopen($filename, "a");
    }
    fwrite($fd, $content); // 将切块合并到一个文件上
}
echo $filename;

```

这样就解决了上面的两个问题：

- 识别切片来源
- 保证切片拼接顺序

### 断点续传

即使将大文件拆分成切片上传，我们仍需等待所有切片上传完毕，在等待过程中，可能发生一系列导致部分切片上传失败的情形，如网络故障、页面关闭等。由于切片未全部上传，因此无法通知服务端合成文件。这种情况下可以通过**断点续传**来进行处理。

断点续传指的是：可以从已经上传部分开始继续上传未完成的部分，而没有必要从头开始上传，节省上传时间。

由于整个上传过程是按切片维度进行的，且`mkfile`接口是在所有切片上传完成后由客户端主动调用的，因此断点续传的实现也十分简单：

- 在切片上传成功后，保存已上传的切片信息
- 当下次传输相同文件时，遍历切片列表，只选择未上传的切片进行上传
- 所有切片上传完毕后，再调用`mkfile`接口通知服务端进行文件合并

因此问题就落在了如何保存已上传切片的信息了，保存一般有两种策略

- 可以通过 locaStorage 等方式保存在前端浏览器中，这种方式不依赖于服务端，实现起来也比较方便，缺点在于如果用户清除了本地文件，会导致上传记录丢失
- 服务端本身知道哪些切片已经上传，因此可以由服务端额外提供一个根据文件 context 查询已上传切片的接口，在上传文件前调用该文件的历史上传记录

下面让我们通过在本地保存已上传切片记录，来实现断点上传的功能

```javascript
// 获取已上传切片记录
function getUploadSliceRecord(context) {
  let record = localStorage.getItem(context);
  if (!record) {
    return [];
  } else {
    try {
      return JSON.parse(record);
    } catch (e) {}
  }
}
// 保存已上传切片
function saveUploadSliceRecord(context, sliceIndex) {
  let list = getUploadSliceRecord(context);
  list.push(sliceIndex);
  localStorage.setItem(context, JSON.stringify(list));
}
```

然后对上传逻辑稍作修改，主要是增加上传前检测是已经上传、上传后保存记录的逻辑

```javascript
let context = createContext(file);
// 获取上传记录
let record = getUploadSliceRecord(context);
let tasks = [];
chunks.forEach((chunk, index) => {
  // 已上传的切片则不再重新上传
  if (record.includes(index)) {
    return;
  }

  let fd = new FormData();
  fd.append("file", chunk);
  fd.append("context", context);
  fd.append("chunk", index + 1);

  let task = post("/mkblk.php", fd).then((res) => {
    // 上传成功后保存已上传切片记录
    saveUploadSliceRecord(context, index);
    record.push(index);
  });
  tasks.push(task);
});
```

此时上传时刷新页面或者关闭浏览器，再次上传相同文件时，之前已经上传成功的切片就不会再重新上传了。

服务端实现断点续传的逻辑基本相似，只要在`getUploadSliceRecord`内部调用服务端的查询接口获取已上传切片的记录即可，因此这里不再展开。

此外断点续传还需要考虑**切片过期**的情况：如果调用了`mkfile`接口，则磁盘上的切片内容就可以清除掉了，如果客户端一直不调用`mkfile`的接口，放任这些切片一直保存在磁盘显然是不可靠的，一般情况下，切片上传都有一段时间的有效期，超过该有效期，就会被清除掉。基于上述原因，断点续传也必须同步切片过期的实现逻辑。

### 上传进度和暂停

通过[xhr.upload](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FXMLHttpRequest%2Fupload)中的`progress`方法可以实现监控每一个切片上传进度。

上传暂停的实现也比较简单，通过`xhr.abort`可以取消当前未完成上传切片的上传，实现上传暂停的效果，恢复上传就跟断点续传类似，先获取已上传的切片列表，然后重新发送未上传的切片。

由于篇幅关系，上传进度和暂停的功能这里就先不实现了。

作者：橙红年代  
链接：https://juejin.im/post/5cf765275188257c6b51775f  
来源：掘金

## 3. 第三方上传-阿里云上传实践

[文档](https://help.aliyun.com/document_detail/64047.htm?)

### 3.1 开通 oss 服务，[使用 STS 临时访问凭证访问 OSS](https://help.aliyun.com/document_detail/100624.htm?spm=a2c4g.11186623.0.0.683662e7icOmtd#concept-xzh-nzk-2gb)

### 3.2 普通上传(不支持使用进度函数,建议 100M 内使用，大文件会崩溃)：

```js
  async uploads(e) {
          const client = new OSS({
                region: 'oss-cn-shenzhen',
                accessKeyId: 'STS.xxx',
                accessKeySecret: 'xxx',
                stsToken: 'xxx',
                bucket: 'xxx',
              });

          const files = e.target.files[0]
          this.path='test/file/'+files.name;
          this.files=files
         try {
           const result = await client.put(this.path, data);
           console.log(result);//回调
         } catch (e) {
           console.log(e);
         }

    }
```

### 3.3 分片上传

```js
  let tempCheckpoint=null  // 该字段保存分片上传信息，用于重传
  try {
    const result = await client.multipartUpload(this.path, files, {
      progress:  (p, checkpoint) =>{
        console.log('进度',p);
        this.tempCheckpoint=checkpoint
      },
      parallel: 4,
      // 设置分片大小。默认值为1 MB，最小值为100 KB。
      partSize: 1024 * 1024,
      meta: { year: 2020, people: 'test',},//meta 元信息，如开启 md5校验可以 传递 Content-MD5 进行比对保证文件上传一致性
      mime: 'text/plain',
      })
  } catch(e){
    client.cancel();
    console.log('出错了，请点击按钮重传');
    console.log(e);
  }

  //分片 重传
  async  resumeUpload () {
      const resumeclient = new OSS(this.ossConfig);//需要重新new
        try {
          const result = await resumeclient.multipartUpload(this.path, files, {
            progress:  (p, checkpoint) =>{
              console.log('重传进度',p);
              this.tempCheckpoint = checkpoint;
            },
            checkpoint: this.tempCheckpoint,
            meta: { year: 2020, people: 'test' },
            mime: 'text/plain'
        })
        } catch (e) {
          console.log(e);
        }
  }

```

## 4. 第三方上传-又拍云上传实践

> 无 sdk,react 业务代码示例

[文档](http://docs.upyun.com/api/rest_api/)

- **开发前需要了解知识点**：

  1.  浏览器有请求并发数限制，所以并发上传最好控制在 6 个请求左右

  2.  页面关闭，切换，窗口关闭，切换，根据业务需求是否要断开上传，暂停上传或销毁上传对象，是否需要后台上传，如果有后台上传考虑使用 `web worker`

  3.  又拍云分片上传使用 put 上传并且返回信息在 response header 里面

- **又拍云准备**：

  1. 又拍云上传域名 智能选路（推荐） v0.api.upyun.com

  2. 密钥 :
     - upyunApi 又拍云上传域名
     - domain 域名
     - bucketName 空间名称
     - username 账号
     - password 密码

  ### 4.1 创建 又拍云签名,以及上传路径信息

  1. filePath 上传路径 ：
     - 又拍云上传域名 + 空间名称 + 文件类型 + 上传日期 + 文件名称
  2. Signature [签名生成](http://docs.upyun.com/api/authorization/) :

     - Signature = Base64 ( HMAC-SHA1 ( md5 ( Password ) + Method + URI + Date ) )

     - 使用 base6 包裹，HMAC-SHA1 包裹，密码使用 md5 加密，method 为 put ,URL 为 filePath 上传路径，Date 为当前时间 GMT 格式

     - 最后 请求头加上 `Authorization` : `UPYUN ${username}:${Signature}`

  3. 代码示例：

```js
import md5 from "md5";
import { b64hamcsha1 } from "@/utils/uploader";
import Env from "@/utils/env";
import moment from "moment";

const UpyunAuth = {
  domain: `${Env.domain}/`,
  username: Env.username,
  pwdMd5: md5(Env.password),
  api: Env.upyunApi,
  bucketName: `${Env.bucketname}/`,
  filePath: "", // 当前文件类型(调用组件传入uploadTypePath)+时间 video/2020-2-2/xxx.mp4 - file/2020-2-2/xxx.doc
  createUploadUrl(fileName: string, uploadTypePath: string) {
    this.filePath = `${uploadTypePath}/${moment(new Date()).format(
      "YYYY-MM-DD"
    )}/`;
    const { api, bucketName, filePath } = this;
    return `${api}${bucketName}${filePath}${fileName}`;
  },
  createAuthHeader(fileName: string, contentType: string) {
    const time = new Date().toUTCString();
    const { username, pwdMd5, bucketName, filePath } = this;
    const Signature = b64hamcsha1(
      pwdMd5,
      `PUT&/${bucketName}${filePath}${fileName}&${time}`
    );

    return {
      "Content-Type": contentType,
      "X-Date": time,
      Authorization: `UPYUN ${username}:${Signature}`,
    };
  },
};

export default UpyunAuth;
```

  ### 4.2 创建 原生 xhr 对象

  > 因业务代码通常使用 axios 等类库进行封装，再引入修改会冲突

  ```js
  function createXHR() {
    if (typeof XMLHttpRequest !== "undefined") {
      return new XMLHttpRequest();
    }
    if (typeof ActiveXObject !== "undefined") {
      const xhrArr = [
        "Microsoft.XMLHTTP",
        "MSXML2.XMLHTTP.6.0",
        "MSXML2.XMLHTTP.5.0",
        "MSXML2.XMLHTTP.4.0",
        "MSXML2.XMLHTTP.3.0",
        "MSXML2.XMLHTTP",
      ];
      const len = xhrArr.length;
      for (let i = 0; i < len; i++) {
        try {
          xhr = new ActiveXObject(xhrArr[i]);
          break;
        } catch (ex) {}
      }
    } else {
      throw new Error("No XHR object available.");
    }
  }

  function request(option) {
    if (String(option) !== "[object Object]") return undefined;
    const xhr = createXHR();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        /**
         *  res header
         *  status  204 成功
         *    complete  201 成功 204 覆盖成功
         *
         * 初始化，上传中 X-Upyun-Multi-Uuid 本次上传任务的标识(初始化上传后返回的信息，用于续传)
         * 结束 X-Upyun-Multi-Uuid X-Upyun-Multi-Type X-Upyun-Multi-Length
         */
        if (xhr.status === 200 || xhr.status === 204 || xhr.status === 201) {
          // xhr.getResponseHeader('status')
          const response = {};
          // if (option.uploadStatus === 'initiate' || option.uploadStatu === 'upload') {
          response["Uuid"] = xhr.getResponseHeader("X-Upyun-Multi-Uuid");
          // }
          // if (option.uploadStatus === 'complete') {
          // response['Uuid'] = xhr.getResponseHeader('X-Upyun-Multi-Uuid')
          // }
          if (option.success && typeof option.success === "function") {
            option.success(response);
          } else if (option.error && typeof option.error === "function") {
            option.error("success not is function");
          }
        } else if (
          xhr.status === 401 &&
          option.error &&
          typeof option.error === "function"
        ) {
          option.authError(401);
        } else if (option.error && typeof option.error === "function") {
          option.error();
        }
      }
    };
    xhr.open(option.method, option.url, true);

    if (String(option.header) !== "[object Object]") return undefined;
    for (const key in option.header) {
      xhr.setRequestHeader(key, option.header[key]);
    }
    xhr.send(option.data);
  }

  // request({
  //   url: 'api',
  //   method: 'PUT',
  //   uploadStatus:'',
  //   header: {},
  //   data: 'file',
  //   success(res) {

  //   },
  //   error(err) {

  //   },
  // })
  export default request;
  ```
  ### 4.3 文件分片，md5 加密

  ```js
    import SparkMD5 from 'spark-md5';
    // 获取分片 spark-md5  const { blobsList, getMd5 } = await getBlobMd5(this.file, this.chunkSize); // 获取分片数据
    const getBlobMd5 = (file, chunkSize) => {
      const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
      const chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      const blobsList = [];
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();

      return new Promise(resolve => {
        fileReader.onload = function(e) {
          spark.append(e.target.result);
          currentChunk++;
          if (currentChunk < chunks) {
            loadNext();
          } else {
            const getMd5 = spark.end();
            resolve({ blobsList, getMd5 });
          }
        };

        fileReader.onerror = function() {
          console.warn('getBlobMd5, something went wrong.');
        };

        function loadNext() {
          const start = currentChunk * chunkSize;
          const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
          const blobs = blobSlice.call(file, start, end);
          blobsList.push(blobs);
          fileReader.readAsArrayBuffer(blobs);
        }
        loadNext();
      });
    };
  ```
  ### 4.4 上传核心方法 uploader 类

  ```js
  import { RcFile } from 'antd/lib/upload';
  import REQUEST from './request';
  import UpyunAuth from './upyunAuth';
  import { getBlobMd5 } from '@/utils/uploader';

class Uploader {
  file: RcFile;

  fileName: string;

  fileType: string;

  fileSize: string;

  chunkSize: number;

  blobList: Blob[];

  uploadQueue: any[];

  onSuccess: any;

  onProgress: any;

  onError: any;

  uploadError: any[];

  uploadMax: number;

  uploadNum: number;

  uploadUrl: string;

  Uuid: string;

  isUnstall: boolean;

  uploadCurrent: number;

  uploadedSuccessNum: number;

  uploadedErrorNum: number;

  uploadProgess: number;

  uploadTypePath: string;

  uploadStep:string;

  constructor(options: any) {
    const { file, onProgress, onSuccess, onError, uploadTypePath } = options;
    const { name, size, type } = file;
    this.file = file;
    this.fileName = name;
    this.fileType = type;
    this.fileSize = size;
    this.uploadTypePath = uploadTypePath;

    this.chunkSize = 2 * 1024 * 1024; // bytes => kb =  mb
    this.blobList = []; // 分片数量
    this.uploadQueue = []; // 上传队列
    this.uploadError = []; // 上传错误队列
    this.uploadedSuccessNum = 0; // 已上传成功数量
    this.uploadedErrorNum = 0; // 已上传失败数量
    this.uploadMax = 2; // 上传最大数
    this.uploadNum = 2; // 上传队列控制数量
    this.uploadCurrent = 0; // 上传队列当前上传位置
    this.uploadProgess = 0;
    this.uploadUrl = '';
    this.Uuid = ''; // 断点续传文件id
    this.isUnstall = false; // 页面是否卸载

    this.onProgress = onProgress;
    this.onSuccess = onSuccess;
    this.onError = onError;

    this.uploadStep = 'uploadStart || uploading || uploadEnd' // 当前上传步骤状态

    this.init();
  }

  async init() {
    const { blobsList, getMd5 } = await getBlobMd5(this.file, this.chunkSize); // 获取分片数据
    this.blobList = [...blobsList];
    const m_pattern = this.fileName.substr(this.fileName.lastIndexOf('.'), this.fileName.length);
    this.fileName = `${getMd5}${m_pattern.toLocaleLowerCase()}`;
    // this.fileName = `${getMd5}__${encodeURIComponent(this.fileName)}`;
    this.uploadUrl = UpyunAuth.createUploadUrl(this.fileName, this.uploadTypePath); // 创建上传链接
    this.uploadProgess = 100 / this.blobList.length; // 每次增加的进度百分比
    if (this.isUnstall) return;
    this.uploadStart();
  }

  /**
   *  1. 创建分片数组
   *  2. 初始化上传
   *  3. 创建上传队列
   *  4. 开始上传 ： 上传成功，计数成功数量与需要上传队列数量相等，上传成功。
   *                上传错误，传入错误队列，报错,记录上传进度， 重传 => 赋值上传队列，清空错误队列，继续上传
   *  5. 上传结束
   *
   */

  uploadStart() {
    this.uploadStep = 'uploadStart'

    const { fileName, fileSize, fileType, chunkSize, uploadUrl } = this;

    REQUEST({
      url: uploadUrl,
      method: 'PUT',
      uploadStatus: 'initiate',
      header: {
        ...UpyunAuth.createAuthHeader(fileName, fileType),
        'X-Upyun-Multi-Disorder': true,
        'X-Upyun-Multi-Stage': 'initiate',
        'X-Upyun-Multi-Length': fileSize,
        'X-Upyun-Multi-Part-Size': chunkSize,
        'X-Upyun-Multi-Type': fileType,
      },
      data: null,
      success: ({ Uuid }: { Uuid: string }) => {
        this.Uuid = Uuid;
        // 创建上传队列
        this.createUploadQueue();
        this.controlUploadQueue();
      },
      error: err => {
        this.onError();
      },
      authError: status => {
        this.onError();
      },
    });
  }

  createUploadQueue() {
    this.uploadStep = 'uploading'

    const uploadLength = this.blobList.length; // 需要上传数量
    // blob 上传对象 index 上传顺序标识
    this.blobList.forEach((blob, index) => {
      // 创建上传队列，数组值为上传函数接收 鉴权header 、当前上传任务索引 (用于查找上传错误任务)uploadIndex
      this.uploadQueue.push((header, uploadIndex) => {
        REQUEST({
          url: this.uploadUrl,
          method: 'PUT',
          uploadStatus: 'upload',
          header: {
            ...header,
            'X-Upyun-Multi-Stage': 'upload',
            'X-Upyun-Multi-Uuid': this.Uuid,
            'X-Upyun-Part-Id': index,
          },
          data: blob,
          success: () => {
            // 上传完成 检测错误队列，清空上传队列，重新赋值上传队列，清空错误队列，报错，让用户手动上传
            this.uploadedSuccessNum++; // uploadedSuccessNum 已上传成功任务计数
            if (this.uploadedSuccessNum + this.uploadedErrorNum === uploadLength) {
              // 上传最后一个任务
              if (this.uploadedErrorNum) {
                // 有上传错误任务
                this.uploadedErrorNum = 0; // 重置错误计数
                this.uploadCurrent = 0; // 当前上传位置重置
                this.uploadNum = this.uploadMax; // 上传最大数位置重置
                this.uploadQueue = this.uploadQueue.filter(
                  (item, index) => this.uploadError.indexOf(index) > -1,
                ); // 重置上传队列
                this.uploadError = []; // 清空错误队列
                this.onError();

                return;
              }
              // 没有上传错误任务 全部成功
              this.onProgress({
                percent: 100,
              });
              this.uploadEnd(); // 保证所有请求完毕再执行最后一步 否则会出 some part miss
              return;
            }
            this.uploadNum++; // 上传最大数位置递增（for循环调用上传任务队列后 归零，上传成功失败后 递增，实现队列+1上传）
            this.onProgress({
              percent: this.uploadProgess * this.uploadedSuccessNum, // 记录上传进度
            });

            this.controlUploadQueue(); // 队列上传
          },
          error: err => {
            // 上传完成 检测错误队列，清空上传队列，重新赋值上传队列，清空错误队列，报错，让用户手动上传
            this.uploadedErrorNum++; // 已上传失败任务计数
            if (this.uploadedSuccessNum + this.uploadedErrorNum === uploadLength) {
              this.uploadedErrorNum = 0; // 重置错误计数
              this.uploadCurrent = 0; // 当前上传位置重置
              this.uploadNum = this.uploadMax; // 上传最大数位置重置
              this.uploadError.push(uploadIndex); // 放入错误队列（uploadIndex=>数组索引）
              this.uploadQueue = this.uploadQueue.filter(
                (item, index) => this.uploadError.indexOf(index) > -1,
              ); // 重置上传队列
              this.uploadError = []; // 清空错误队列
              this.onError();

              return;
            }
            this.uploadNum++;
            this.uploadError.push(uploadIndex);
            this.controlUploadQueue();
          },
        });
      });
    });
  }

  uploadEnd() {
    this.uploadStep = 'uploadEnd'

    const { fileName, fileType, uploadUrl, Uuid } = this;
    REQUEST({
      url: uploadUrl,
      method: 'PUT',
      uploadStatus: 'complete',
      header: {
        ...UpyunAuth.createAuthHeader(fileName, fileType),
        'X-Upyun-Multi-Stage': 'complete',
        'X-Upyun-Multi-Uuid': Uuid,
      },
      data: null,
      success: ({ Uuid }) => {
        // const sourceUrl = UpyunAuth.domain + UpyunAuth.filePath + fileName;
        // 相对路径
        const sourceUrl = UpyunAuth.filePath + fileName;
        this.onSuccess(sourceUrl, this);
      },
      error: err => {
        this.onError();
      },
      authError: status => {
        this.onError();
      },
    });
  }

  /**
   * 控制上传队列数量
   * controlUploadQueue for 循环 uploadNum ，uploadNum 归零，上传成功 uploadNum 递增  ,上传失败 uploadNum 递增
   * 上传成功失败都要调用  controlUploadQueue for 循环  uploadNum
   * uploadCurrent + uploadNum当前上传位置 => （需要上传的任务）<= 最大上传位置
   *
   */
  controlUploadQueue() {
    const { fileName, fileType, uploadNum, uploadQueue, uploadCurrent, isUnstall } = this;
    if (isUnstall) return;
    let count = 0;
    for (let i = uploadCurrent; i < uploadCurrent + uploadNum; i++) {
      if (uploadQueue[i]) {
        count++;
        uploadQueue[i](UpyunAuth.createAuthHeader(fileName, fileType), i); // header鉴权 i当前任务在上传队列中的索引
      } else {
        break;
      }
    }
    this.uploadCurrent += count;
    this.uploadNum = 0;
  }

  reUpload() {
    const { uploadStep } = this
    // 重传步骤
    if (uploadStep === 'uploadStart') {
      this.uploadStart()
    } else if (uploadStep === 'uploading') {
      this.controlUploadQueue();
    } else if (uploadStep === 'uploadEnd') {
      this.uploadEnd()
    }
  }
}

export default Uploader;

  ```
  ### 4.5 调用方法 

  ```js

    this.clearUploaderTask();
    // 自定义上传回调函数
    const options={
      ...event.target.files[0],
      onProgress({ percent }: { percent: number }){},
      onSuccess(sourceUrl: string){},
      onError(){},
      uploadTypePath:'file',
    }
     
    const uploader = new Uploader(options);
    this.uploader = uploader;
  
    clearUploaderTask() {
      if (this.uploader) {
        this.uploader.uploadQueue = [];
        this.uploader.isUnstall = true;
        this.uploader = null;
      }
    }

    reUpload = (): void => {
      this.uploader.reUpload();
    };



    
  ``` 



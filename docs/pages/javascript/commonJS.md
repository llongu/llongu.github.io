# CommonJS,AMD,CMD,UMD,ES6

**为什么有这么多规范，因为前端需要模块化，模块化就不会出现变量名，函数名的覆盖，模块互相引用，依赖关系明显，可读性维护性高**
## CommonJS 

- CommonJS 主要运行于服务器端，一个文件就是一个模块，拥有单独的作用域，普通方式定义的变量、函数、对象都属于该模块内；

- 同步加载模块，在node环境中require引入一个模块的时候，这个过程是同步的，必须等模块加载完才能继续后续操作

- 不做特殊处理（webpack打包）commonjs只能运行在node环境，浏览器环境不能直接使用，window上没有定义require这个方法

- 四个重要的环境变量为模块化的实现提供支持：`module`、`exports`、`require`、`global`

**特点：**
1. **CommonJS 模块重复引入的模块并不会重复执行，规范模块的对外接口输出的是一个值的拷贝，输出之后就不能改变了，会缓存起来，再次获取模块只会获得之前获取到的模块的缓存**
2. **在运行时执行**

```js
    // moduleA.js
    let count = 1;

    // 异步让count++
    setTimeout(()=>{
        count++;
    });

    exports.count = count;

    // main.js
    const {count} = require("./moduleA.js");

    // 同步打印count
    console.log(count); // 打印值为1

    // 异步打印count
    setTimeout(()=>{
        console.log(count); // 打印值为1
    });

```
执行是同步的，且输出后就不能改变


## 为什么有AMD 和 CMD 


<font style="color:red;font-size:24px">
    因为 CommonJS 采用同步加载模块，而加载的文件资源大多数在本地服务器，所以执行速度或时间没问题。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载，此时就需要 AMD 和 CMD 了，所以 AMD CMD 都是实现 commonJS 规范的一种
</font>


## AMD

> Asynchronous Module Definition 异步模块定义

- AMD 是 RequireJS 在推广过程中对模块定义的规范化产出，推崇 **依赖前置，提前执行**

- 采用异步方式加载模块，模块的加载不影响它后面语句的运行,浏览器不会假死。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行

- 模块功能主要的几个命令：define、require、return和define.amd,define是全局函数，用来定义模块,define(id?, dependencies?, factory)。require命令用于输入其他模块提供的功能，return命令用于规范模块的对外接口，define.amd属性是一个对象，此属性的存在来表明函数遵循AMD规范。

```js
// model1.js
define(function () {
    console.log('model1 entry');
    return {
        getHello: function () {
            return 'model1';
        }
    };
});
// model2.js
define(function () {
    console.log('model2 entry');
    return {
        getHello: function () {
            return 'model2';
        }
    };
});
// main.js
define(function (require) {
    var model1 = require('./model1');
    console.log(model1.getHello());
    var model2 = require('./model2');
    console.log(model2.getHello());
});
<script src="https://cdn.bootcss.com/require.js/2.3.6/require.min.js"></script>
<script>
    requirejs(['main']);
</script>
// 输出结果  
// model1 entry
// model2 entry
// model1
// model2
```


## CMD 

> Common Module Definition - 通用模块定义

- CMD 是 SeaJS 在推广过程中对模块定义的规范化产出，推崇 **依赖就近，延迟执行**
- CMD 更加接近于 CommonJS 的写法

```js
// model1.js
define(function (require, exports, module) {
    console.log('model1 entry');
    exports.getHello = function () {
        return 'model1';
    }
});
// model2.js
define(function (require, exports, module) {
    console.log('model2 entry');
    exports.getHello = function () {
        return 'model2';
    }
});
// main.js
define(function(require, exports, module) {
    var model1 = require('./model1'); //在需要时申明
    console.log(model1.getHello());
    var model2 = require('./model2'); //在需要时申明
    console.log(model2.getHello());
});
<script src="https://cdn.bootcss.com/seajs/3.0.3/sea.js"></script>
<script>
    seajs.use('./main.js')
</script>
// 输出 
// model1 entry
// model1
// model2 entry
// model2
```

##  UMD

> Universal Module Definition 也是通用模块定义

- 该模式主要用来解决CommonJS模式和AMD模式代码不能通用的问题，并同时还支持老式的全局变量规范

- 原理其实就是在模块中去判断全局是否存在exports和define，如果存在exports，那么以commonjs的方式暴露模块，如果存在define那么以amd的方式暴露模块,否则设定为原始的代码规范

```js
(function(window, factory){
    if(typeof exports === "objects"){
        // commonjs
        module.exports = factory();
    }else if(typeof define === "function" && define.amd){
        // amd
        define(factory);
    }else{
        window.moduleA = factory();
    }
})(window, function(){
    // 返回module
    let modlueA = {
        name : "张三",
        setName(newName){
            thie.name = newName;
        },
        getName(){
            return this.name;
        }
    }
    return modlueA;
})
```
## ES6 module

> ES modules（ESM）是 JavaScript 官方的标准化模块系统。

- 它同时兼容浏览器,node环境下运行
- 模块的导入导出，通过import和export来确定。 可以和Commonjs模块混合使用
- ES modules 输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝
- ES modules 模块编译时执行，而 CommonJS 模块总是在运行时加载

### 值引用-当动态修改 es modules内的值，其他导入的地方再使用值会改变

```js
// a.js
import { age } from './b.js';

console.log(age);
setTimeout(() => {
    console.log(age);
    import('./b.js').then(({ age }) => {
        console.log(age);
    })
}, 100);

// b.js
export let age = 1;

setTimeout(() => {
    age = 2;
}, 10);
// 打开 index.html
// 执行结果：
// 1
// 2
// 2
```
### 浏览器使用

```js
<script src="./index.js" type="module"></script>

// index.js
import { name, github } from './demo.js';

console.log(name(), github());

document.body.innerHTML = `<h1>${name()} ${github()}</h1>`

//demo.js
export function name() {
    return 'qiufeng';
}

export function github() {
    return 'https://github.com/hua1995116';
}
```

**特点：**

- import 优先于模块内的其他内容执行, 虽然 import 顺序比较靠后，但是 由于 import 提升效果会优先执行

```js
// a.js
console.log('a.js')
import { age } from './b.js';

// b.js
export let age = 1;
console.log('b.js 先执行');

// 运行 index.html 执行结果:
// b.js 先执行
// a.js
```

-  export 变量声明提升



## 项目中的应用：ES6 module 与 commonjs amd 混用问题

 1. **为什么我可以使用es6 import  导入 commonjs 规范的代码呢**

  webpack 本身维护了一套模块系统，这套模块系统兼容了所有前端历史进程下的模块规范，包括 amd commonjs es6 等，模块化的实现其实就在最后编译的文件内,其中需要借助 babel 的转换，
  会将代码 import export default  都转换为 require export.default ,所以混合使用 es6 的模块和 commonjs 的规范是没有问题的，因为最终都会转换成 commonjs
  

2. **为什么要用 require('xx').default**
  
  因为是使用 require 导入 es6 export defalut 导出的代码，export defalut 会转换为 export.defalut ,所以需要使用 `var a = require('xxx.js').default`
  
3. **为什么按需加载我们需要使用  `babel-plugin-component` 类似的插件**

按需加载

```js

 import { Button, Select } from 'element-ui' 
```
但转换后实际是

```js

var a = require('element-ui'); 
```

这个过程就会将所有组件都引入进来了,所以 babel-plugin-component就做了一件事，将 import { Button, Select } from 'element-ui' 转换成了

```js
import Button from 'element-ui/lib/button'
import Select from 'element-ui/lib/select'

 ```
 即使转换成了 commonjs 规范，也只是引入自己这个组件的js，将引入量减少到最低。
 ```js
var Button = require('element-ui/lib/button'); 
var select = require('element-ui/lib/select'); 
 ```
 所以我们会看到几乎所有的UI组件库的目录形式都是

```c
|-lib
||--component1
||--component2
||--component3
|-index.common.js

```
index.common.js 给 import element from 'element-ui' 这种形式调用全部组件,

lib 下的各组件用于按需引用。








  

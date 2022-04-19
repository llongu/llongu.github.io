#### 1. 函数名称不可更改

```javascript
function a() {}
var b = function e() {};
var c = function () {};
console.warn(a.name); // => a
a.name = 123;
console.warn(a.name); // => a
console.log(b.name); // => e
b.name = 123;
console.log(b.name); // => e
console.log(c.name); // => c
c.name = 123;
console.log(c.name); // => c
```

#### 2. 函数表达式匿名函数名只能在内部访问，且不可修改,外部访问`xx is not defined`，因为匿名函数名不会进入 vo(变量存储对象)，且该函数名不可使用（外部不可访问，内部不可修改）

```javascript
var aaa = function bbb() {
  console.log(bbb); //=>  ƒ bbb() { console.log(bbb);}
};
aaa();
console.log(bbb); //bbb is not defined
```

#### 3. bind(obj) 硬绑，bind(null)软绑，new fn() 如果 fn 函数内有函数使用 bind(this),会改变 this 指向到 fn，如果 fn 函数没有该属性就为 undefind，不会向上查找。如果使用 bind(null)则会向上查找

```javascript
var name = 123;

let obj = {
  name: 456,
  a: function () {
    console.log(this.name);
  },
};
function test1() {
  obj.a();
  obj.a.bind(this)();
}
test1(); //=> 456 123

new test1(); //=> 456 undefined

function test2() {
  obj.a();
  obj.a.bind(null)();
}
test2(); //=> 456 123

new test2(); //=> 456 123
```

#### 4. in 操作符查找对象属性，会超找至原型链，使用`hasownproperty`更精确

#### 5. 直接复制`var a='string'`和`new string('xx')` 区别一个是值类型，一个是对象引用类型

#### 6. hash 和 history 路由区别，hash 带#，URL 改变时，页面不会重新加载。history 无#号，可对 URL State 进行主动更改，但主动刷新 URL 会进行请求，如后台未响应配置对应路径会导致 404

#### 7.es6 Array.fill 不要填充 对象 {},因为生成的对象指向的地址都是同一个，也就是所有对象属性和值都会和最后一个对象一样

```js
var a = [1, 2, 3];
a.fill({});
a[1].test = "123";
//a [{test:123},{test:123},{test:123}]
```

#### 8.对象实列化简写

```js
var easys = function (option) {
  easys.prototype.init.prototype = easys.prototype; //原型赋给自身的方法
  return new easys.prototype.init(option); //实列化必须new
};

easys.prototype.init = function (option) {
  this.way = "简写";
};

easys.prototype.go = function () {
  console.log(this.way);
};

easys().go();
```

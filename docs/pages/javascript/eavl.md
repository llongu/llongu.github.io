**new function(‘‘code’’) () 与 settimeout('alert(1)‘,0)、eval('xxx')、相同会将 string 解析为变量并执行**

> ### new function

作用域为全局，可以改变和创建全局作用域变量（局部读取不到即无法更改）

```javascript
  var a = 1;

  function test() {
    var b = 3;
    return new Function('a=2,alert(a),c=4,alert(c),alert(b)');
  }
  test()();//2,4,b is not defined
  console.log(c);

```

> ### setTimeout

和 new function 结果一样 作用域为全局，可以改变和创建全局作用域变量（局部读取不到即无法更改）, setTimeout 方法是挂在 window 对象下的。《JavaScript 高级程序设计》第二版中，写到：“超时调用的代码都是在全局作用域中执行的

> ### eval

可以创建和改变作用域变量
严格模式执行 eval 函数，不会作用于它的外层作用域，修改不会生效,外部也访问不到 eval()中创建的任何变量或函数

```javascript
'use strict'
var gg =  '1';
eval('var gg=123');
console.log(gg);//123 , 'use strict'  1
```

直接调用，执行 eval 函数会创建执行上下文,将当前的 this 指向，词法环境以及变量环境当做新的执行上下文的 this 指向,词法环境以及变量环境,同时在闭包结构里，会导致变量不会被回收，造成内存泄露

```javascript
var a =  '1';

function  test() {
var a =  '2';

return  function (x) {
    return eval(x);//2
}
}
console.log(test()('a'))
```

非直接调用，新的执行上下文相当于全局执行上下文，以 global 对象，全局词法环境以及全局变量环境当做新的执行上下文的 this 指向,词法环境以及变量环境

```javascript
var a =  '1';

function  test() {

var a =  '2';

return  function  e(x) {
        //return eval(x)//直接调用 2
        var get = eval;//赋值调用
        return  get(x)//1
 }
}

console.log(test()('a'));
```

# 闭包

```js
var get = function (x) {
  var cache = null;
  console.log("只执行一次！");
  //如果没有下面的内部函数go就是调用形参函数
  //				return x;
  //内部函数优先级高于形参
  return function () {
    //x是形参函数
    //					var a=arguments[0];
    //					console.log(a)
    //					return	cache=x(a);
    //改变this并执行x 赋值argunments
    return (cache = x.apply(x, arguments));
  };
};

var go = get(function (x) {
  return x * x;
});
console.log(go(4));//16
console.log(go(5));//25
```

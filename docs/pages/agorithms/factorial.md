# 阶乘

```js
//3:1*2*3=6
function Fc(x) {
  if (x == 0 || x == 1) {
    return 1;
  }
  return x * Fc(x - 1);
}
Fc(3); //6

//缓存  让阶乘重复运算情况下更快
function Fadd(fn) {
  var cache = {};
  return function () {
    var key = arguments.length + Array.prototype.join.call(arguments);
    if (cache[key]) {
      return cache[key];
    } else {
      cache[key] = fn.apply(this, arguments);
      return cache[key];
    }
  };
}

Fadd(Fc)(3); //6  传入阶乘方法 + 阶乘参数
```

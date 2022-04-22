# 柯里化

> currying 又称部分求值。一个 currying 的函数首先会接受一些参数,接受了这些参数之后,该函数不会立即求值,而是继续返回另外一 个函数。刚才传入的参数在函数形成的闭包中被保存起来，待真正求值时，之前传入的参数会被一次性调用求值。

```js
//参数柯里化
var go = (function () {
  //创建闭包环境
  let num = 0;
  let arr = []; //num arr 因为闭包环境会保存下来
  let res = function () {
    //不传参数返回num 查看总是
    if (arguments.length === 0) {
      for (let i = 0; i < arr.length; i++) {
        num += arr[i];
      }
      return num;
    } else {
      arr.push(...arguments);
      return res; //再次返回自身可以进行()()()连写调用
    }
  };
  return res; //返回res函数
})();

go(1);
go(2)(3);
console.log(go()); //6
```

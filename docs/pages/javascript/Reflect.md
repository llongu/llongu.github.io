# Reflect

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    // var obj = {
    // 	get foo() {
    // 		return this.bar();
    // 	},
    // 	bar: function() {
    // 		...
    // 	}
    // };
    // //  下面语句会让 this.bar()
    // //  变成调用 wrapper.bar()
    // Reflect.get(obj, "foo", wrapper);
    // （2） Reflect.set(target, name, value, receiver)
    // 设置target对象的name属性等于value。 如果name属性设置了赋值函数， 则赋值函数的this绑定receiver。
    // （ 3） Reflect.has(obj, name)
    // 等同于name in obj。
    // （ 4） Reflect.deleteProperty(obj, name)
    // 等同于delete obj[name]。
    // （ 5） Reflect.construct(target, args)
    // 等同于new target(...args)， 这提供了一种不使用new， 来调用构造函数的方法。
    // （ 6） Reflect.getPrototypeOf(obj)
    // 读取对象的__proto__属性， 对应Object.getPrototypeOf(obj)。
    // （ 7） Reflect.setPrototypeOf(obj, newProto)
    // 设置对象的__proto__属性， 对应Object.setPrototypeOf(obj, newProto)。
    // （ 8） Reflect.apply(fun, thisArg, args)
    // 等同于Function.prototype.apply.call(fun, thisArg, args)。 一般来说， 如果要绑定一个函数的 this 对象， 可以这样写fn.apply(obj, args)， 但是如果函数定义了自己的apply方法， 就只能写成Function.prototype.apply.call(fn, obj, args)， 采用 Reflect 对象可以简化这种操作。
    // 另外， 需要注意的是， Reflect.set()、 Reflect.defineProperty()、 Reflect.freeze()、 Reflect.seal() 和Reflect.preventExtensions() 返回一个布尔值， 表示操作是否成功。 它们对应的 Object 方法， 失败时都会抛出错误。
    // //  失败时抛出错误
    // Object.defineProperty(obj, name, desc);
    // //  失败时返回 false
    // Reflect.defineProperty(obj, name, desc);
    // 上面代码中， Reflect.defineProperty方法的作用与Object.defineProperty是一样的， 都是为对象定义一个属性。 但是， Reflect.defineProperty方法失败时， 不会抛出错误， 只会返回false。

    //window 事件注册拦截
    var getAllWindowEvent = function (w) {
      w.listLenster = new Set();
      var _cache = w.addEventListener;
      var handler = {
        apply(target, thisBindding, args) {
          listLenster.add(args[0]);
          console.log(args);
          //反射函数作用域
          Reflect.apply(_cache, w, args);
          //_cache.apply(w,args)
        },
      };
      w.addEventListener = new Proxy((event, fn) => {}, handler);
    };
    getAllWindowEvent(window);

    // 这里的window.addEventListener已经是是代理对象了
    window.addEventListener("click", function () {
      console.log("click");
    });
    window.addEventListener("resize", function () {
      console.log("resize");
    });
    console.log(...listLenster);
  </script>
</html>
```

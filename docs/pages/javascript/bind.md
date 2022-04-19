# bind

```html
<button id="get">get</button>

<script type="text/javascript">
  //bind 实现原理，与call类似只是返回了一个新函数
  Function.prototype.binds = function (context) {
    var self = this; // 保存原函数
    return function () {
      // 返回一个新函数
      return self.apply(context, arguments); // 执行新函数时，将传入的上下文context作为新函数的this
    };
  };

  document.getElementById("get").onclick = function () {
    get.binds(this)(); //<button id="get">get</button>
    get(); //window
  };

  function get() {
    console.log(this);
  }
</script>

<!-- 实例2 -->
<script>
  Function.prototype.bind = function (fn) {
    var args = Array.prototype.slice.call(arguments, 1),
      ftobind = this,
      fbound = function () {
        // args.push(arguments[0]);
        // console.log(args);
        return ftobind.apply(
          // instanceof 判断 是为了产生新的实例对象后this不再绑定到原有fn上 即(new（重构 this =>） instanceof fbound)
          this instanceof fbound ? this : fn,
          args.concat(Array.prototype.slice.call(arguments, 0))
        );
      };

    //继承原型方法
    fbound.prototype = Object.create(this.prototype);
    return fbound;
  };

  var obj = {
    a: "test",
  };

  function go(data, data2) {
    console.log(this.a);
    console.log(data);
    console.log(data2);
  }
  go.prototype.my = function () {
    console.log("测试");
  };

  var result = go.bind(obj, "京城");
  result("一等");
  var newResult = new result("2等").my(); //new 导致this重构绑定至实例对象newResult上
</script>
```

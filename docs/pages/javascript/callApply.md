# call

```js
var color = "red";
var o = { color: "blue" };
function applys() {
  console.log(this.color); //red
}

applys(); //red
o.applys = applys; //直接赋值给o达到改变this指向的目的
o.applys(); //blue
applys.call(o); //或改变this指向 blue

// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("not funciton");
  }
  context = context || window;
  context.fn = this;
  let arg = [...arguments].slice(1);
  let result = context.fn(...arg);
  delete context.fn;
  return result;
};
```

# apply

```js
function obj1(a, b, c) {
  obj2.apply(this, arguments);
}

function obj2() {
  console.log(arguments);
}

obj1(1, 2, 4); //124


// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myapply = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("not funciton");
  }
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

```

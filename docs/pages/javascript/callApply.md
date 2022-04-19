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
```

# new

```js
function obj(num) {
  this.name = num;
  console.log(this);
  this.age = function () {
    return this.name;
  };
}

obj.prototype.sex = function () {};

//1.构造函数不去new this会指向window
//		var a=new obj(12);//new的过程 会创建新的构成函数(新的obj{} =>添加属性方法 继承prototype) 改变this(apply) 指向  然后return obj
//		window.age();


//2.new的过程 会进行构造函数的属性和方法添加 是私有的,prototype上的东西是共享的 他们都是继承自同一个对象 ↓
//因为每个实例化对象都有_proto_属性，它是一个指针(_proto_属性实际就是实例化对象和原型对象之间的连接)，左边指向实例化对象如：a 右边指向prototype
//原型链 a => _proto_ => obj.prototype=>  _proto_ => object.prototype
//		var a=new obj(12);
//		console.log(a.age())
//		var b=new obj(24);
//		console.log(b.age())
//		console.log(a.age==b.age)//false
//		console.log(a.prototype==b.prototype)//true
//		console.log(a.sex==b.sex)//true
//
```

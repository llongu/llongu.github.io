# Set、Map、WeakSet 和 WeakMap 有哪些区别？


## Set

    成员唯一、无序且不重复
    只有键值，没有键名
    可以遍历

```js
let data = new Set([2, 3, 5, 4, 5, 2, 2]);

for (const item of data) {
    console.log(item);
}

// 2 3 5 4

```

## WeakSet

    成员都是对象或数组
    成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
    不能遍历

```js
let data = new WeakSet([{ name: 'xiaoming' }, { age: 20 }, [10, 20]]);

// 不能遍历，否则报错
for (const item of data) {
    console.log(item);
}

// 场景

WeakSet 的应用场景/ 好处
用于存储DOM节点，而不用担心这些节点从文档移除时会引发内存泄露，即可以用来避免内存泄露的情况

WeakSet 有三个方法：add, delete, has
WeakSet.prototype.add(value) 向WeakSet 实例添加一个成员
WeakSet.prototype.delete(value) 清除 WeakSet 实例的指定成员
WeakSet.prototype.has(value) 判断某个值是否在WeakSet 实例中，返回布尔值

  const foos = new WeakSet()
  class Foo {
  constructor() {
    foos.add(this)
  }
  method() {
    if(!foos.has(this)) {
      throw new TypeError("Foo.prototype..method 只能在Foo的实例上调用")
    }
  }
}

// 这段代码的作用是保证了Foo 的实例方法只能在Foo的实例上调用。
// 这里用WeakSet的好处：数组foos对实例的引用不会被计入内存回收机制，所以删除实例时无需考虑foos， 也不会出现内存泄露
```


## Map

    成员都是数组，键值对形式[key, value]
    可以遍历

```js
let data = new Map([['name', 'xiaoming'], ['age', 20]]);

for (const item of data) {
    console.log(item);
}
// ["name", "xiaoming"]
// ["age", 20]
```


## WeakMap

    只接受对象作为键名（null除外），不接受其他类型的值作为键名
    键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
    不能遍历
    
```js
let data = new WeakMap([[{ name: 'xiaoming' }, 'xiaoming'], [{ name: 'anqila' }, 'anqila']]);

// 不能遍历，否则报错
for (const item of data) {
    console.log(item);
}
```
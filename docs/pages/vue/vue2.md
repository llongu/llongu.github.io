# vue2

## Vue 的双向数据绑定的原理

先初始化 data，双向数据绑定。然后模板解析，拿到 key，生成一个 watcher（watcher 负责值的获取 get 和更新 update），watcher 首次自动触发 get 取值，这时候会触发双向绑定 get,get 拿到当前 watche 添加到订阅函数 dep listener(dep 负责 push 到 listener，notify 负责 listener.foreach => watcher.update)。 最后通过双向数据绑定 set 触发通知， vdom 比较后更新 dom，
## Proxy ⽐ defineproperty 优劣 对⽐

porxy 可以检测到引用对象的数据变化并返回新对象，而 defineproperty 不可以，缺点是 proxy 会劫持整个对象，而 defineproperty 不会

## Vue 对 Dom diff 的优化⽅案是什么？


Vue 对 Dom diff 的优化：对 oldDom 和 newDom 进行遍历匹配，处理过的 dom 做上标记，使用 oldstart/oldend，newstart/newend 指针排序。 1.头部或尾部相同，跳过，对应指针移动。 2.首尾判断相同 oldStart 向前移动，newEnd 向后移动，尾首判断相同，oldEnd 向后移动，newStart 向前移动。
3.oldDOM 找不到新增节点，则新增，插入到 oldStart 指针前位置，newStart 往后移动。
4.oldDom 能找到节点，但不在该指针位置，则移动，插入到 oldStart 指针前位置，并做上特殊标记
如果 newDom 遍历标记完毕，而 oldDom 还有没标记的 Dom，则删除。

[深入Vue2 Diff算法](https://blog.csdn.net/Sideremens/article/details/97629849)


## vue 双向绑定原理实现

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
  <body>
    <div id="app">
      <div>{title}</div>
      <input type="text" l-model="meassage" placeholder="" />
      <div>{title2}</div>
      <input type="text" l-model="meassage" placeholder="" />
    </div>
  </body>
  <script type="text/javascript">
    class LL {
      constructor(opt) {
        this.obj = this.init({}, opt);
        this.dom = document.getElementById(this.obj.el);
        this.render();
      }

      init(obj, extend) {
        for (let i in extend) {
          obj[i] = extend[i];
        }
        return obj;
      }

      render(switchs) {
        let nodeArr = [];
        let content = null;
        //获取node节点 过滤
        for (let i of this.dom.childNodes) {
          if (i.nodeType == 3) continue;
          //简单判断
          if (i.localName == "input") {
            content = i.getAttribute("l-model");
          } else {
            content = i.innerText.substring(1, i.innerText.length - 1);
          }

          //匹配渲染
          for (let n in this.obj.data) {
            if (n == content) {
              if (i.localName == "input") {
                i.value = this.obj.data[n];
                switchs ? null : this.Addinput(i);
              } else {
                i.innerText = this.obj.data[n];
              }
            }
          }
        }

        //初始化data
        for (let b in this.obj.data) {
          this.listen(b);
        }
      }

      //注入data
      listen(dataName, value) {
        Object.defineProperty(this.obj.data, dataName, {
          set: (value) => {
            dataName = value;
            this.render(true);
            console.log(dataName + "=>注入成功!");
          },
          get: () => dataName,
        });
      }

      Addinput(input) {
        let self = this;
        input.addEventListener("input", function () {
          self.listen(this.getAttribute("l-model"), this.value);
          self.obj.data[this.getAttribute("l-model")] = this.value;
        });
      }
    }

    var app = new LL({
      el: "app",
      data: {
        title: "自定义数据1",
        title2: "自定义数据2",
        meassage: "双向绑定数据!",
      },
    });

    //控制台输入 app.obj.data.meassage="数据驱动视图！"
  </script>
</html>
```

## vue core

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <input type="text" id="a" v-model="text" />
      {{text}}
    </div>
  </body>
  <script src="Dep.js"></script>
  <script src="Observer.js"></script>
  <script src="Watcher.js"></script>
  <script src="Compile.js"></script>
  <script src="MVVM.js"></script>
  <script>
    var vm = new Vue({
      el: "app",
      data: {
        text: "hell world",
        abc: 123,
      },
    });
  </script>
</html>
```

### Dep

```js
//负责订阅者的增加和更新
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addsub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      //订阅者update更新函数
      sub.update(); //Watcher.update
    });
  },
};
```

### Observer

```js
//遍历数据绑定 Object.defineProperty
function observe(obj, vm) {
  Object.keys(obj).forEach(function (key) {
    // console.log(vm,key,obj[key]);
    defineReactive(vm, key, obj[key]);
  });
}

//数据侦听 set get
function defineReactive(obj, key, val) {
  console.log(obj, key, val); //vue({})/text/hell world
  var dep = new Dep();
  //obj对象上直接创建了 vm.data的副本
  Object.defineProperty(obj, key, {
    get: function () {
      //Dep.target=Watcher
      if (Dep.target) {
        dep.addsub(Dep.target);
      }
      console.log("get => " + val);
      return val;
    },
    set: function (newVal) {
      if (newVal === val) return;
      val = newVal;
      console.log("set => " + val);
      //通知更新
      dep.notify();
    },
  });
}
```

### Watcher

```js
function Watcher(vm, node, name, type) {
  Dep.target = this;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.type = type;
  this.update();
  Dep.target = null;
}

Watcher.prototype = {
  update: function () {
    this.get();
    //找到Node节点直接更改内容
    this.node[this.type] = this.value;
  },
  get: function () {
    this.value = this.vm[this.name];
  },
};
```

### Compile

```js
function Compile(node, vm) {
  if (node) {
    this.$frag = this.nodeToFragment(node, vm);
    return this.$frag;
  }
}

Compile.prototype = {
  nodeToFragment: function (node, vm) {
    var self = this;
    var frag = document.createDocumentFragment();
    var child;
    //循环第一个node的节点元素 直到没有
    while ((child = node.firstChild)) {
      self.compileElement(child, vm);
      frag.append(child);
    }
    return frag;
  },
  compileElement: function (node, vm) {
    var reg = /\{\{(.*)\}\}/;
    //节点类型判断
    if (node.nodeType === 1) {
      var attr = node.attributes;
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName == "v-model") {
          var name = attr[i].nodeValue;
          node.addEventListener("input", function (e) {
            vm[name] = e.target.value;
          });
          new Watcher(vm, node, name, "value");
        }
      }
    }
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        var name = RegExp.$1;
        name = name.trim(); //text
        new Watcher(vm, node, name, "nodeValue");
      }
    }
  },
};
```

### MVVM

```js
function Vue(opt) {
  this.data = opt.data;
  var data = this.data;
  //建立观察模式
  observe(data, this);
  var id = opt.el;
  //进行编译
  var dom = new Compile(document.getElementById(id), this);
  //插入渲染
  document.getElementById(id).appendChild(dom);
}

/*

    new Vue => 初始化data => 绑定defineproperty=> complie 解析dom 指令，生成watcher => watcher 触发getter 添加至dep
        setter 触发dep => 通知watcher => 更新dom


*/
```




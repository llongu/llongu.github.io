## 单例模式

> 在 JavaScript 里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        background: linen;
        position: relative;
        height: 100%;
        text-align: center;
      }
    </style>
  </head>
  <body></body>
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript">
    var mySingleton = (function () {
      // 实例存储单例的引用
      var instance;
      function init() {
        // 私有方法和变量
        function privateMethod() {
          console.log("I am private");
        }
        var privateVariable = "Im also private";
        var privateRandomNumber = Math.random();
        return {
          //mySingleton.getInstance().publicMethod()
          // 公共方法和变量
          publicMethod: function () {
            //=>getInstance()而不是init();
            console.log("The public can see me!");
          },
          publicProperty: "I am also public",
          getRandomNumber: function () {
            return privateRandomNumber;
          },
        };
      }

      return {
        //mySingleton.getInstance()
        //如果单例的实例存在就获得它，不存在就创建一个
        getInstance: function () {
          if (!instance) {
            instance = init();
          }
          return instance;
        },
      };
    })();

    // 用法:
    var singleA = mySingleton.getInstance();
    var singleB = mySingleton.getInstance();
    console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true
  </script>
</html>
```

## 工厂模式

```js
// 旗舰手机工厂
class FlagShipPhoneFactory {
  createScreen() {
    return new HDScreen();
  }

  createCamera() {
    return new HDCamera();
  }
}

// 高清摄像头类
class HDCamera {
  say() {
    console.log("I am HDCamera!");
  }
}

// 高清屏幕类
class HDScreen {
  say() {
    console.log("I am HDScreen!");
  }
}

// 创建旗舰手机工厂实例
var phone = new FlagShipPhoneFactory();

// 用统一接口分别创建旗舰手机的屏幕和摄像头
var screen = phone.createScreen();
var camera = phone.createCamera();

screen.say(); // => 'I am HDScreen!'
camera.say(); // => 'I am HDCamera!'

//工厂类
class PhoneFactory {
  //专门生产小米手机的方法
  //设置为 static
  static produceXiaoMiPhone() {
    return new XiaoMiPhone();
  }

  //专门生产苹果手机的方法
  //设置为 static
  static produceApplePhone() {
    return new ApplePhone();
  }
}

//直接调用工厂的静态方法来生产不同的手机 不用每次都先创建工厂对象了
let xiaomiPhone = PhoneFactory.produceXiaoMiPhone();
let applePhone = PhoneFactory.produceApplePhone();

//调用
xiaomiPhone.call();
applePhone.call();
```

## 享元模式

> 主要用于减少创建对象的数量，以减少内存占用和提高性能。享元模式基于相同属性内容来共用一个对象模板，,如果未找到匹配的对象，则创建新对象。是一种共享精神在里面。

```js
class Person {
  name = "";
  age = 0;
  address = "";
}

class PersonFactory {
  personObj = {};

  createPerson(name, age, address) {
    let person = null;
    // 已经存在的村庄实例
    if (this.personObj[address]) {
      person = this.personObj[address];
      person.name = name;
      person.age = age;
      console.log("在已经存在的村庄实例中直接给值:", person);
    } else {
      // 不存在村庄实例就创建一个，并且保存到personObj中进行持久保存
      person = new Person();
      person.address = address;
      this.personObj[address] = Object.assign({}, person);
      person.age = age;
      person.name = name;
      console.log("创建村庄实例，并且给值：", person);
    }
    return person;
  }
}

const personFactory = new PersonFactory();

let person1 = personFactory.createPerson("张三", 20, "田头村");
let person2 = personFactory.createPerson("李四", 21, "田头村");

let person3 = personFactory.createPerson("张三", 20, "英利村");
let person4 = personFactory.createPerson("王五", 21, "英利村");
```

，

## 建造者模式

> 建造者模式是一步一步的创建一个复杂的对象，它允许用户只通过指定复杂的对象的类型和内容就可以构建它们，用户不需要指定内部的具体构造细节。

> 日常生活中，比如组装电脑，生产汽车，都是有多个步骤来一步一步构建的，这时候就可以使用建造者模式来解决这个问题。下面以组装电脑为例子，比如组装游戏电脑，组装办公电脑。步骤都是一样的，最终都会出一个成品出来。

```js
function gameComputerBuilder() {
  this.buildMainboard = function () {
    console.log("游戏主板");
  };
  this.buildCPU = function () {
    console.log("游戏CPU");
  };
  this.buildHardDisk = function () {
    console.log("游戏硬盘");
  };
  this.getComputer = function () {
    return "游戏电脑";
  };
}

function officeComputerBuilder() {
  this.buildMainboard = function () {
    console.log("办公主板");
  };
  this.buildCPU = function () {
    console.log("办公CPU");
  };
  this.buildHardDisk = function () {
    console.log("办公硬盘");
  };
  this.getComputer = function () {
    return "办公电脑";
  };
}

function Operator() {
  this.startBuild = function (builder) {
    builder.buildMainboard();
    builder.buildCPU();
    builder.buildHardDisk();
    return builder.getComputer();
  };
}

const op = new Operator();
const gameComputer = new gameComputerBuilder();
const officeComputer = new officeComputerBuilder();
const gc = op.startBuild(gameComputer);
console.log(gc);
const oc = op.startBuild(officeComputer);
{
}
console.log(oc);
```

## 责任链模式

> 责任链主要责任在于责任分离，让各个节点各司其职，责任链上的每个节点都有机会去处理相关的事务，但是也可能不会受理请求,责任链一般处理流程之类的实际业务

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        background: #eeeeee;
        position: relative;
        height: 100%;
        text-align: center;
      }
    </style>
  </head>
  <body></body>
  <script type="text/javascript">
    // 可以省略if else if的做法
    function fn1(x) {
      if (x == 1) {
        console.log("done1!");
      } else {
        return "next";
      }
    }

    function fn2(x) {
      if (x == 2) {
        console.log("done2!");
      } else {
        return "next";
      }
    }

    function fn3(x) {
      if (x == 3) {
        console.log("done3!");
      } else {
        console.log("没有答案!");
      }
    }

    //往函数原型上添加方法
    Function.prototype.after = function (fn) {
      var self = this; //this第一次指向fn1
      console.log("after的执行参数=>", fn);

      //返回一个函数，相当于一个代理函数
      return function () {
        //先调用自身函数self
        //					var result=self(arguments[0])//可行
        var result = self.apply(this, arguments);
        if (result == "next") {
          //						return fn(arguments[0])//可行
          return fn.apply(this, arguments); //执行函数fn
        }
        return result;
      };
    };
    var fn = fn1.after(fn2).after(fn3);
    fn(2);
  </script>
</html>
```

## 代理模式

> 小明想送花给 A ，但不解 A，B 了解 A，所以把花交给 B，B 把花转交给 A

```js
let Flower = function () {};
let xiaoming = {
  sendFlower: function (target) {
    let flower = new Flower();
    target.receiveFlower(flower);
  },
};
let B = {
  receiveFlower: function (flower) {
    A.listenGoodMood(function () {
      A.receiveFlower(flower);
    });
  },
};
let A = {
  receiveFlower: function (flower) {
    console.log("收到花" + flower);
  },
  listenGoodMood: function (fn) {
    setTimeout(function () {
      fn();
    }, 1000);
  },
};
xiaoming.sendFlower(B);
```

## 观察者模式

> 观察者观察被观察者，当被观察者发生被观察的行为时，触发观察者里面的事件。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        background: linen;
        position: relative;
        height: 100%;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <button id="addNewObserver">Add New Observer checkbox</button>
    <input id="mainCheckbox" type="checkbox" />
    <div id="observersContainer"></div>
  </body>
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript">
    var controlCheckbox = document.getElementById("mainCheckbox"), //obsever操作者
      addBtn = document.getElementById("addNewObserver"), //添加观察者
      container = document.getElementById("observersContainer"); //容器

    // The Observer
    function Observer() {
      this.update = function () {
        // ...
      };
    }

    // 将控制 checkbox 扩展到 Subject class
    extend(controlCheckbox, new Subject());

    // 用extend()扩展一个对象 (拷贝对象及属性)
    function extend(obj, extension) {
      for (var key in extension) {
        obj[key] = extension[key];
      }
      //			  if(extension.hasOwnProperty(key)){//是否是实列对象
      //			　　　　console.log(key);
      //			　　}
    }

    // 单击checkbox 通知将发送到它的观察者
    controlCheckbox.onclick = function () {
      controlCheckbox.notify(controlCheckbox.checked);
    };

    //添加新的
    addBtn.onclick = addNewObserver;

    // 实际观察者(Concrete Observer)
    function addNewObserver() {
      // 新创建的checkbox被添加
      var check = document.createElement("input");
      check.type = "checkbox";

      // 扩展 checkbox 用 Observer class
      extend(check, new Observer());

      // 用自定义的 update 行为覆盖默认的
      check.update = function (value) {
        this.checked = value;
      };

      // 添加新的 observer 到 observers 列表中
      // 为我们的 main subject
      controlCheckbox.addObserver(check);

      //插入
      container.appendChild(check);
    }

    //obseverList 名单 -----------------------------------------------------
    function ObserverList() {
      this.observerList = [];
    }

    //添加名单
    ObserverList.prototype.add = function (obj) {
      return this.observerList.push(obj);
    };

    //计算名单数量
    ObserverList.prototype.count = function () {
      return this.observerList.length;
    };

    //得到指定下标的观察者
    ObserverList.prototype.get = function (index) {
      if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
      }
    };

    //返回 与传入对象相等的观察者的下标
    ObserverList.prototype.indexOf = function (obj, startIndex) {
      var i = startIndex;

      while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
          return i;
        }
        i++;
      }

      return -1;
    };

    //删除指定下标的观察者
    ObserverList.prototype.removeAt = function (index) {
      this.observerList.splice(index, 1);
    };

    //Subject 观察者名单操作者  对obsever 进行维护 添加 删除和其他操作 -----------------------------------------------------
    function Subject() {
      this.observers = new ObserverList();

      //添加
      this.addObserver = function (observer) {
        this.observers.add(observer);
      };
      //删除
      this.removeObserver = function (observer) {
        this.observers.removeAt(this.observers.indexOf(observer, 0));
      };
      //通知
      this.notify = function (context) {
        var observerCount = this.observers.count();
        for (var i = 0; i < observerCount; i++) {
          //循环通知每个Observer观察者下的update方法
          this.observers.get(i).update(context);
        }
      };
    }
  </script>
</html>
```

## 发布订阅

> 订阅者订阅想要观察的事件，当发布者发布事件时，会去查找对应事件的订阅事件并触发。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        background: #eeeeee;
        position: relative;
        height: 100%;
        text-align: center;
      }
    </style>
  </head>
  <body></body>

  <script type="text/javascript">
    //js 发布模式
    function teacher() {
      this.student = [];
      this.homework = function (text) {
        for (var i = 0; i < this.student.length; i++)
          this.student[i].listen(text);
      };
    }

    function student(name, myteacher) {
      this.name = name;
      this.teacher = myteacher;
      this.teacher.student.push(this);
    }

    student.prototype.listen = function (text) {
      console.log(this.name + "接收" + text);
    };

    var teacher = new teacher();
    var studentm = new student("小明", teacher);
    var studentz = new student("小张", teacher);

    var studentArr = ["1", "2", "3", "4", "5", "6"];

    for (var a in studentArr) {
      new student(studentArr[a], teacher);
    }

    teacher.homework("做数学");
  </script>

  <script>
    class Event {
      constructor() {
        this.list = {};
      }
      // 订阅者订阅想要观察的事件
      addEvent(fnName, fn) {
        this.list[fnName] = this.list[fnName] || [];
        this.list[fnName].push(fn);
      }
      // 发布者发布事件
      trigger(fnName) {
        if (this.list[fnName]) {
          this.list[fnName].forEach((item) => {
            item();
          });
        }
      }
    }
    let event = new Event();
    event.addEvent("click", () => {
      console.log("触发事件1");
    });
    event.addEvent("click", () => {
      console.log("触发事件2");
    });
    event.trigger("click");
  </script>
</html>
```

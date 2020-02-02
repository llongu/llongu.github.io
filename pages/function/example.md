```javascript
//Functor
{
  function Functor(value) {
    this.value = value
  }
  Functor.prototype.map = function(f) {
    //map生成函子操作
    return this.value ? Functor.of(f(this.value)) : Functor.of(null) //外部传入的处理函数有可能没做空值判断，这里处理
  }

  Functor.of = function(value) {
    //使用of来间接new 避免面向对象方式
    return new Functor(value)
  }
  //使用方式
  var result = Functor.of(1)
    .map(function(value) {
      return value + value
    })
    .map(function(value) {
      return value + value
    })
  l(result)

  //也可以把 Functor.of(1).map 结果传入另一个 Functor.of 进行嵌套
  var result = Functor.of(
    Functor.of(1).map(function(value) {
      return value + value
    }).value
  ).map(function(value) {
    return value + value
  })
  l(result)
}

//Ap 函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函子的链式操作
{
  class Ap extends Functor {
    ap(F) {
      return Ap.of(this.value(F.value))
    }
  }

  Ap.of = function(value) {
    return new Ap(value)
  }

  var add = function(value) {
    return function() {
      return value + value
    }
  }

  var result = Ap.of(add)
    .ap(
      Functor.of(2).map(function(value) {
        return value + value
      })
    )
    .ap(
      Functor.of(2).map(function(value) {
        return value + value
      })
    )

  l(result)
}

//Monad 通过一个纯的表达式，完成带有副作用的操作
class Monad extends Functor {
  join() {
    return this.value
  }

  flatMap(f) {
    return this.map(f).join()
  }

  map(f) {
    return Monad.of(f(this.value))
  }
}

Monad.of = function(value) {
  return new Monad(value)
}
//让外部处理函数成为纯的
var result = Monad.of(10)
  .flatMap(function(value) {
    return Monad.of(function(value) {
      return value + value
    })
  })
  .flatMap(function(value) {
    return Monad.of(function(value) {
      return value + value
    })
  })
l(result)

//简单柯里化
function computed(x) {
  return function(y) {
    return x + y
  }
}
//将代码简化，缓存参数，高性能
console.log(computed(1)(2))

//无法复用
var result = x => x.toUpperCase().split("")
console.log(result("bb"))

//拆分
var splits = x => x.split("")
var toUpperCases = x => x.toUpperCase()
var fn = (function zuhe(fnA, fnB) {
  return function(param) {
    return fnA(fnB(param))
  }
})(splits, toUpperCases)
console.log(fn("aaa"))

//无法计算数组
function get(x, y) {
  return x + y
}
//封装一层
function center(fn, array) {
  return fn(array[0], array[1])
}
console.log(center(get, [1, 2]))
```

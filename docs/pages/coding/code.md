```javascript
//对操作进行分割，执行相对应的功能
function test() {
  alert(2)
  return "is test"
}

Function.prototype.before = function(fn) {
  var _self = this
  return function() {
    //return function 进行链式调用
    if (!fn.apply(_self, arguments)) {
      //before先执行 及 判断错误终止操作
      return false
    }
    return _self.apply(this, arguments)
  }
}
Function.prototype.after = function(fn) {
  var _self = this
  return function() {
    var result = _self.apply(this, arguments)
    if (!result) {
      return false
    }
    if (!fn.apply(_self, arguments)) {
      return false
    }
    return result
  }
}

var data = test
  .after(function() {
    alert(3)
    return true
  })
  .before(function() {
    alert(1)
    return true
  })()
console.log(data)
```

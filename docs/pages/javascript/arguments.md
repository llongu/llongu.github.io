```javascript
function fn(a,b,c){
    this.length // 0 谁调用指向谁的length
    arguments.length //1 实际参数的长度
    fn.length //3 形参的长度
   arguments.callee.length //3 形参的长度 等于fn.length
}
fn(1)
```

> arguments.callee 指向函数本身，可进行递归调用

```javascript
<script>
  {} + [];    // 0
  [] + {};    // "[object Object]"
  {} + [] == [] + {};    // false
  ({} + [] == [] + {});    // true
  {
      a: 1  // a 被解析器理解为了 标签。标签 是用来配合 break 和 continue 语句作定向跳转
  }
  {
      a: 1function(){}  // 语法错误
  }


  // 这里的{}为块级作用域，且test会被函数声明提升，但函数整体不会被提示，块级作用域更改不会影响全局作用域，只能更改内部的对象，因为不同的作用域下修改不会影响其他作用域下同名的对象
  console.log(typeof test) // undefind
  {
      function test(x) {

      }

      test = ''

      console.log(typeof test) // string
  }

  test()
  console.log(typeof test) // function
</script>

```

**当语句以 { 开头 } 结尾，会被编译器当做代码块，创建新的作用域**

自执行函数表达式与函数声明

> ### 自执行表达式

```javascript
(function () { /* code */ } ());
(function () { /* code */ })();

var i = function () { return 10; } ();
true && function () { /* code */ } ();
0, function () { /* code */ } ();

// 如果你不在意返回值，或者不怕难以阅读
// 你甚至可以在function前面加一元操作符号

!function () { /* code */ } ();
~function () { /* code */ } ();
-function () { /* code */ } ();
+function () { /* code */ } ();

new function () { /* code */ }
new function () { /* code */ } () // 如果需要传递参数，只需要加上括弧()
```

> ### 函数声明

```javascript
function foo(){ /* code */ }(); // SyntaxError: Unexpected token 无法执行
```

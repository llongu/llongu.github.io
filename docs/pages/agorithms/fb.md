# 菲波那切数列

```js
// 菲波那切数列-求该次数的所有数字总和  2种方式 // 1 1 2 3 5 8 13 21 34 ... 数字为前2项之和
let a = 1,
  b = 1,
  c = 0;
for (let i = 2; i <= 5; i++) {
  //循环 赋值按顺序推进  数字为前2项之和
  c = a + b; //2 | 3 | 5 | 8
  a = b; //1 | 2 | 3
  b = c; //2 | 3 | 5
}
console.log(c);//8


function fb(n) {
  if (n <= 1) {
    return 1;
  }
  return fb(n - 1) + fb(n - 2); //数字为前2项之和
}
console.log(fb(5));//8
```

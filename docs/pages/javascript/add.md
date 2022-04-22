# ++运算符

```js
  var a = 20;
  console.log(a++ + ++a + a++)
  //20 (先运算再加1) 21(先加1再运算) 此时a已成21  (先运算再加1)=20+21+21+1+1=64
  console.log(a)//经过3次+的运算已成23
  console.log(a++ + ++a + a++) //23+24+24+1+1=73
  console.log(a)//26

   var aaa = 'abc';
    console.log('hello '+aaa==='abc'?'abc':'null');// null;先算的字符串拼接
  // console.log('----------------------------------------------------------------------')

  let b = 0;
  let tt = async () => {
    console.log('这先走');
    b = b + (await 10); //await 内部实现是generator会保存堆栈中的东西  此时的b还是0 (因为获取到b时为0保存在堆栈里面，后续的运算没法获取到)
    console.warn(b); //10
  };
  tt();
  console.log(b++); //0 先运算再加1
  console.log(b); //1
```
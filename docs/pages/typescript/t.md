# T 泛型
```ts
//能用 泛型就不用any，除非每次结果类型都不确定
{
  function hello<T>(arg: T): T {
    return arg;
  }

  let test = hello<string>('test'); //  hello('test')
  //   test = hello(123); //错误 test type is a string 因为test已经接收到返回值是string
  console.log(test);
}
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

//泛型 定义泛型类型
{
  function typeFn<k>(arg: k[]): k[] {
    console.log(arg.length);
    return arg;
  }

  let test = typeFn([1, 2, 3]);
  console.log(test);
}
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

//泛型引用
{
  function A<T>(arg: T): T {
    return arg;
  }

  let test: <k>(arg: k) => k = A;
  //或 let test:{<k>(arg:k):k}=A
  //理解为 let test:(arg:any)=>any=A
  console.log(A(123));
}
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

//泛型 接口
{
  //1
  interface hello {
    <T>(arg: T): T;
  }

  let test: hello = function<T>(arg: T): T {
    return arg;
  };

  let a = test<string>('string');
  console.log(a);
  //2
  interface myHello<T> {
    (arg: T): T;
  }

  let myTest: myHello<string> = function<T>(arg: T): T {
    return arg;
  };

  myTest('123');
  //    myTest(123)//错误tye is not a number
}
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

//泛型 泛型类
{
  class Hello<T> {
    name: T;
    add: (a: T, b: T) => {};
  }

  let test = new Hello<string>();
  test.name = '123';
  test.add = function(a, b) {
    return a + b;
  };
  console.log(test.name);
  console.log(test.add('1', '2'));
  //   console.log(test.add(1, 2));//错误 type is a string
}
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

//泛型接口实现
interface A{
  <T>(age:T):void //匿名函数接口
}

type Test=<T>(age:T)=>number

const d:A=<T>(age:T):void =>{
  console.log(age)
}
const dd:Test=<T>(age:T):number =>{
  console.log(age)
  return <unknown>age as number
  // return age as unknown as number
  // return <number>(age as unknown)
}

d<string>('haha')
dd('bb')


```
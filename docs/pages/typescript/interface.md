# interface

```ts
//对象类型
{
  interface ObjValue {
    name: string;
    age: number;
  }

  function test(param: ObjValue) {
    console.log(param);
  }
  test({
    name: 'test',
    age: 123
  });
}

//函数类型
{
  interface FnValue {
    (name: string, age: number): boolean;
  }

  let testFn: FnValue = function(name: string, age: number): boolean {
    console.log(name, age);
    return true;
  };
  testFn('test', 456);
}

//数组类型
{
  interface ArrValue {
    // 索引index是必须的
    [index: number]: string;
  }
  function testArr(arr: ArrValue) {
    console.log(arr);
  }
  testArr(['123', '456']);
}

//类类型
{
  interface classValue {
    name: string;
    age: number;
    print(): void;
  }

  class TestClass implements classValue {
    name: string;
    age: number;
    constructor(paramN: string, paramAge: number) {
      this.name = paramN;
      this.age = paramAge;
    }
    print() {
      console.log(this.name, this.age);
    }
  }
  console.log(new TestClass('test', 789));
}

//继承
{
  interface Shape {
    name: string;
  }

  interface Shape2 {
    age: number;
  }

  interface Square extends Shape, Shape2 {
    haveSon: boolean;
  }

  let s = <Square>{} || ({} as Square);
  s.name = 'test';
  s.age = 123;
  s.haveSon = false;
  console.log(s);
}

//混合类型
{
  interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
  }

  function getCounter(): Counter {
    let counter = <Counter>function(start: number) {};
    counter.reset = function() {};
    counter.interval = 123;
    return counter;
  }

  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 5.0;
  console.log(c);
  console.log('interval' in c);
}

//实现接口
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
digital.tick();

//接口混合类型
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

```
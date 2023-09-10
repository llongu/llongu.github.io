# class 

```ts
//public private
class Person {
  name: string; //public name: string;  默认
  private age: number; //private 是私有的
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  print() {
    return this.name + ':' + this.age;
  }
}

console.log(person.name);
// console.log(person.age); // 错误: 'age' 是私有的.
console.log(person.print());
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

//protected
class Person2 {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}

class Employee extends Person2 {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`;
  }
}

let howard = new Employee('Howard', 'Sales');
console.log(howard.getElevatorPitch());
// let john = new Person2('John'); // 错误: 'Person2' 的构造函数是被保护的.
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

//readonly
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8; //只读属性必须在声明时 或 构造函数里被初始化。
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus('Man with the 8 strong legs');
// dad.name = 'Man with the 3-piece suit'; // 错误! name 是只读的.
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

//get set
class Getset {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName == '123') {
      this._fullName = newName;
    } else {
      console.log('Error: Unauthorized update of employee!');
    }
  }
}

let getset = new Getset();
console.log(getset.fullName);
getset.fullName = '123';
console.log(getset.fullName);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

class Grid {
  public test = 'aaa';
  static origin = 'bbb';
  constructor(param: string) {
    // this.origin = param; //错误  不存在属性test
    Grid.origin = param;
  }
}
// console.log(Grid.test);//错误  不存在属性test
console.log(Grid.origin); //bbb
//Grid类的引用类型
let grid: Grid;
grid = new Grid('修改');
console.log(Grid.origin); //修改
// console.log(grid.origin); //错误 undefined 只能在Grid上访问
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');


```
## class new 实现

```ts
class Water {
  drink() {
    console.log(123)
  }
}
// { new (): T } === new ()=> T
function Car<T>(Water: { new (): T }): T {
  return new Water()
}

Car(Water).drink()

```
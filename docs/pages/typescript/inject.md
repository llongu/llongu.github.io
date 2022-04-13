# 依赖注入
```ts
//ts 原生类装饰器 依赖注入
{
  class Pencil {
    public printName() {
      console.log('this is a pencil')
    }
  }

  class Eraser {
    public printName() {
      console.log('this is an eraser')
    }
  }

  class Notebook {
    public printName() {
      console.log('this is a notebook')
    }
  }

  let dependenciesMap = {} //public bind obj
  let injector = {
    resolve: function(constructor) {
      //传入需要注入的类，获取全局对象上绑定的值，实例化类 合并参数
      //resolve  bind obj dependenciesMap
      let dependencies = dependenciesMap[constructor.name] //get student
      console.log(dependencies) //array =>  three fn

      dependencies = dependencies.map(function(dependency) {
        return new dependency() //auto new class => array
      })
      console.log(dependencies)

      // 如果可以使用ES6的语法，下面的代码可以合并为一行：
      // return new constructor(...dependencies);
      let mockConstructor: any = function() {
        //new  student
        constructor.apply(this, dependencies)
      }
      //修正 prototype
      mockConstructor.prototype = constructor.prototype
      return new mockConstructor()
    }
  }

  let Inject = (...dependencies) => {
    //利用类装饰器 把需要注入的方法绑定到全局对象
    return function(constructor) {
      dependenciesMap[constructor.name] = dependencies //bind  Student => dependenciesMap
      return constructor
    }
  }

  @Inject(Notebook, Pencil, Eraser)
  class Student {
    pencil: Pencil
    eraser: Eraser
    notebook: Notebook
    public constructor(notebook: Notebook, pencil: Pencil, eraser: Eraser) {
      this.notebook = notebook
      this.pencil = pencil
      this.eraser = eraser
    }
    public write() {
      if (!this.notebook || !this.pencil) {
        throw new Error('Dependencies not provided!')
      }
      console.log('writing...')
    }
    public draw() {
      if (!this.notebook || !this.pencil || !this.eraser) {
        throw new Error('Dependencies not provided!')
      }
      console.log('drawing...')
    }
  }
  let student = injector.resolve(Student)
  console.log(student instanceof Student) // true
  student.notebook.printName() // this is a notebook
  student.pencil.printName() // this is a pencil
  student.eraser.printName() // this is an eraser
  student.draw() // drawing
  student.write() // writing
}

```
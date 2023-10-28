## 编辑器
   
  - Xcode 


## Object-c

 > 在C语言上新增部分面向对象方法，完全兼容C语言,可以写任意C代码

## 命名

  OC 源文件后缀名为 .m 。C程序 源文件后缀名为 .c

  成员和方法声明的文件(.h)
  类方法实现的文件(.m)


   main 函数 ，入口和出口

  ```objc

  //Include 的增强。 Foundation 框架 里面包含了很多基础类

  import <Foundation/Foundation.h> 

  int main(int argc, const char * argv[]) {
      //autoreleasepool 自动释放池

      @autoreleasepool {
          // NSLog 是 Print 的增强
          NSLog(@"Hello, World!");
      }
      return 0;
  }

  ```

## 变量

```objc

  //NSString 类型指针变量，只能存储oc字符串地址。 oc 字符串常量必须加 @，否则就是 C 字符串
  NSString *str = @"Hello World";

```

## 数据类型

  1. 支持C语言所有数据类型
  2. BOOL 类型 ,存储 NO ->  0 和 YES ->  1
  ```objc
    BOOL flag = YES;
  ```
  3. id 类型，可以指向任意oc对象
  ```objc
    id obj = [Person new];
  ```
  4. Class 类型，可以指向任意oc类
  ```objc
    Class p = [Person class];
  ```
  5. SEL 类型，可以存储一个方法
  ```objc
    SEL sel = @selector(setName);
  ```
  6. block 类型，可以存储一段代码,可以作为参数传递
  ```objc
    __block int num = 10; // __block 修饰的变量，可以在block内部修改
    void (^block)() = ^{
      NSLog(@"block");
      int num=1;//局部变量，只能在block内部使用,block也只能修改内部变量，除非给外部变量加 __block
    };
    block();
  ```
  7. nil 类型，空指针
  ```objc
    NSString *str = nil;
  ```
 
 ## 类的声明和实现

  ```objc
    @interface Person : NSObject 
    {
      NSString *_name;

      @private //私有(只在本类使用) @public 公有 @protected 保护(在本类和子类使用，也类默认属性) @package 包内访问
      int _age;

      int _height;

      - (void)setName:(NSString *)name; //参数
      - (void)getAge;
      - (void)age:(int)age :(int)height //多个参数
      - (void)ageWith:(int)age and:(int)height // 带参数名的参数

      // - 是 对象方法， + 是类方法 ,类方法不用实例化，直接类名调用
      + (void)eat;
    }
    @end

    @implementation Person
    {
      int _age2; //@implementation 这里定义变量也是私有属性 

      - (void)setName:(NSString *)name
      {
        _name = name;
      }

      - (void)getAge
      {
        NSLog(@"%d",_age);
      }

     - (void)age:(int)age:(int)height
      {
        return  age + height;
      }
     - (void)ageWith:(int)age and:(int)height
      {
        return  age + height;
      }

      + (void)eat 
      {
        NSLog(@"类方法直接调用,但是不能访问成员属性，也没有self。作用节约空间提高效率");
      }

      - (void) myPrivateMethod
      {
        NSLog(@"只写实现不写声明，也是私有方法");
      }

    }
    @end

    
    int main(int argc, const char * argv[]) {

      @autoreleasepool {
          Person *p = [Person new];
          [p setName:@"张三"];
          p._age = 10; //点语法本质使用setter getter方法,如果没有setter getter方法或者方法名不规范，则会报错
          p->_height = 20;

          init age=[p getAge];

          int sum=[p ageWith:10:20]
          int sum=[p ageWith:10 and:20]

          [Person eat]
      }
    }
   
  ```
## 类的调用

```objc

    //第一种
    Person *p = [Person new];
    //第二种
    Class p = [Person class];
  
```

## self 

```objc

  // self 指向当前对象的指针
  // self 指向当前方法调用者

  - (void)setName:(NSString *)name
  {
    // self->_name = name;
    // self->_age = 10;
    // self->_height = 20;
    // [self getAge];
  }

```

## 类继承

> NSObject 是基类,所有oc类从它继承

```objc

  @interface Student : Person
  {
    NSString *_school;
  }
  @end

  @implementation Student
  {
    - (void)setName:(NSString *)name
    {
      // [super setName:name]; // 调用父类方法
      // self->_name = name;
      // self->_age = 10;
      // self->_height = 20;
      // [self getAge];
    }
  }
  @end

  //判断是否继承关系

  if ([p isKindOfClass:[Person class]]) {
    NSLog(@"是Person类或者子类");
  }

  if ([p isMemberOfClass:[Person class]]) {
    NSLog(@"是Person类");
  }

  //类的isa 指针，指向当前对象所属的类的地址

```

## 结构体

> 结构体只能封装属性，适合属性少场景

```objc
    struct Person {
      int age;
      int height;
    };
  
    //结构体变量
    struct Person p1 = {10,20};
  
    //结构体指针
    struct Person *p2 = &p1;
  
    //结构体指针访问结构体变量
    (*p2).age = 10;
    p2->age = 10;
  
```

## sel (selector) 选择器

```obj

  //调用方法 无参数
  SEL sel = @selector(setName);
  [p performSelector:sel];

  //传入方法 有参数
  SEL sel = @selector(setName:);
  //调用方法 并传参
  [p performSelector:sel withObject:@"张三"];

```

## @property @synthesize

> property 自动生成setter getter方法声明, synthesize 自动生成setter getter方法实现


```objc

  //声明 （property生成的是直接赋值取值，没有逻辑验证的）
  @interface Person : NSObject 
    {
      NSString *_name;
      int _age;
    }

    @property NSString *name; //自动生成setter getter方法
    @property int _age; //自动生成setter getter方法

  @end

  //实现 （synthesize生成的是直接赋值取值，没有逻辑验证的）

  @implementation Person

  @synthesize name = _name; //自动生成setter getter方法

  @end

  //现不需要写@synthesize ，编译器会自动添加，只写@property

```

## 万能指针 id , NSObject

```objc

    //id 可以指向任意oc对象
    id obj = [Person new];
    [obj setName:@"张三"];

    //NSObject 可以指向任意oc对象
    NSObject *obj = [Person new];
    [obj setName:@"张三"];

    //不同点 NSobject 编译器会做检查，id 不会做检查
  
```

## alloc

> new 方法内部，是先调用alloc,再调用init
```objc
  [Person new] //等价于 [[Person alloc] init]
```

## protocol

> 协议，用于声明方法，不能实现和声明属性，谁用了这个个协议，就能拥有协议里面的所有方法声明

```objc

  //声明
  @protocol PersonProtocol <NSObject> //NSObject 是基协议
    @required //必须实现的方法
    - (void)requiredMethod;

    @optional //可选实现的方法
    - (void)optionalMethod;
  @end

  //实现
  @interface Person : NSObject <PersonProtocol>
  @end

  @implementation Person
    - (void)requiredMethod
    {
      NSLog(@"必须实现的方法");
    }

    - (void)optionalMethod
    {
      NSLog(@"可选实现的方法");
    }
  @end

  //调用
  Person *p = [Person new];
  [p requiredMethod];
  [p optionalMethod];

  //指针对象遵守协议
  id<PersonProtocol> obj = [Person new];

```
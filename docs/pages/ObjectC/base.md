# 编辑器
   
  - Xcode 


# Object-c

 > 在C语言上新增部分面向对象方法，完全兼容C语言,可以写任意C代码

# 命名

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

# 变量

```objc

  //NSString 类型指针变量，只能存储oc字符串地址。 oc 字符串常量必须加 @，否则就是 C 字符串
  NSString *str = @"Hello World";

```

# 数据类型

  1. 支持C语言所有数据类型
  2. BOOL 类型 ,存储 NO ->  0 和 YES ->  1
  ```objc
    BOOL flag = YES;
  ```
 
 # 类的声明和实现

  ```objc
    @interface Person : NSObject
    {
      NSString *_name;
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

    }
    @end

    
    int main(int argc, const char * argv[]) {

      @autoreleasepool {
          Person *p = [Person new];
          [p setName:@"张三"];
          p._age = 10;
          p->_height = 20;

          init age=[p getAge];

          int sum=[p ageWith:10:20]
          int sum=[p ageWith:10 and:20]

          [Person eat]
      }
    }
   
  ```

# self 

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
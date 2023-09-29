## 一、内部类

 内部类是类中的五大成分之一（成员变量、方法、构造器、内部类、代码块），如果一个类定义在另一个类的内部，这个类就是内部类。

当一个类的内部，包含一个完整的事物，且这个事物没有必要单独设计时，就可以把这个事物设计成内部类。

比如：汽车、的内部有发动机，发动机是包含在汽车内部的一个完整事物，可以把发动机设计成内部类。

```java
public class Car{
	//内部类
    public class Engine{
        
    }
}
```

内部类有四种形式，分别是成员内部类、静态内部类、局部内部类、匿名内部类。

我们先来学习成员内部类

### 1.1 成员内部类

成员内部类就是类中的一个普通成员，类似于成员变量、成员方法。

```java
public class Outer {
    private int age = 99;
    public static String a="黑马";

    // 成员内部类
    public class Inner{
        private String name;
        private  int age = 88;

        //在内部类中既可以访问自己类的成员，也可以访问外部类的成员
        public void test(){
            System.out.println(age); //88
            System.out.println(a);   //黑马

            int age = 77;
            System.out.println(age); //77
            System.out.println(this.age); //88
            System.out.println(Outer.this.age); //99
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }
}
```

成员内部类如何创建对象，格式如下

```java
//外部类.内部类 变量名 = new 外部类().new 内部类();
Outer.Inner in = new Outer().new Inner();
//调用内部类的方法
in.test();
```

总结一下内部类访问成员的特点

- 既可以访问内部类成员、也可以访问外部类成员
- 如果内部类成员和外部类成员同名，可以使用**`类名.this.成员`**区分



### 1.2 静态内部类

静态内部类，其实就是在成员内部类的前面加了一个static关键字。静态内部类属于外部类自己持有。

```java
public class Outer {
    private int age = 99;
    public static String schoolName="黑马";

    // 静态内部类
    public static class Inner{
        //静态内部类访问外部类的静态变量，是可以的；
        //静态内部类访问外部类的实例变量，是不行的
        public void test(){
            System.out.println(schoolName); //99
            //System.out.println(age);   //报错
        }
    }
}
```

静态内部类创建对象时，需要使用外部类的类名调用。

```java
//格式：外部类.内部类 变量名 = new 外部类.内部类();
Outer.Inner in = new Outer.Inner();
in.test();
```



### 1.3 局部内部类

局部内部类是定义在方法中的类，和局部变量一样，只能在方法中有效。所以局部内部类的局限性很强，一般在开发中是不会使用的。

```java
public class Outer{
    public void test(){
        //局部内部类
        class Inner{
            public void show(){
                System.out.println("Inner...show");
            }
        }
        
        //局部内部类只能在方法中创建对象，并使用
        Inner in = new Inner();
        in.show();
    }
}
```



### 1.4 匿名内部类

> **1.4.1 认识匿名内部类，基本使用**

各位同学，接下来学习一种再实际开发中用得最多的一种内部类，叫匿名内部类。相比于前面几种内部类，匿名内部类就比较重要的。

我们还是先认识一下什么是匿名内部类？

匿名内部类是一种特殊的局部内部类；所谓匿名，指的是程序员不需要为这个类声明名字。

下面就是匿名内部类的格式：

```java
new 父类/接口(参数值){
    @Override
    重写父类/接口的方法;
}
```

匿名内部类本质上是一个没有名字的子类对象、或者接口的实现类对象。

比如，先定义一个Animal抽象类，里面定义一个cry()方法，表示所有的动物有叫的行为，但是因为动物还不具体，cry()这个行为并不能具体化，所以写成抽象方法。

```java
public abstract class Animal{
    public abstract void cry();
}
```

接下来，我想要在不定义子类的情况下创建Animal的子类对象，就可以使用匿名内部类

```java
public class Test{
    public static void main(String[] args){
        //这里后面new 的部分，其实就是一个Animal的子类对象
        //这里隐含的有多态的特性： Animal a = Animal子类对象;
        Animal a = new Animal(){
            @Override
            public void cry(){
                System.out.println("猫喵喵喵的叫~~~");
            }
        }
        a.eat(); //直线上面重写的cry()方法
    }
}
```

需要注意的是，匿名内部类在编写代码时没有名字，编译后系统会为自动为匿名内部类生产字节码，字节码的名称会以`外部类$1.class`的方法命名

![1665658585267](./assets/1665658585267.png)

**匿名内部类的作用：简化了创建子类对象、实现类对象的书写格式。**



> **1.4.2 匿名内部类的应用场景**

学习完匿名内部类的基本使用之后，我们再来看一下匿名内部类在实际中的应用场景。其实一般我们会主动的使用匿名内部类。

**只有在调用方法时，当方法的形参是一个接口或者抽象类，为了简化代码书写，而直接传递匿名内部类对象给方法。**这样就可以少写一个类。比如，看下面代码

```java
public interface Swimming{
    public void swim();
}
```

```java
public class Test{
    public static void main(String[] args){
        Swimming s1 = new Swimming(){
            public void swim(){
                System.out.println("狗刨飞快");
            }
        };
        go(s1);
        
        Swimming s1 = new Swimming(){
            public void swim(){
                System.out.println("猴子游泳也还行");
            }
        };
        go(s1);
    }
    //形参是Swimming接口，实参可以接收任意Swimming接口的实现类对象
    public static void go(Swimming s){
        System.out.println("开始~~~~~~~~");
        s.swim();
        System.out.println("结束~~~~~~~~");
    }
}
```

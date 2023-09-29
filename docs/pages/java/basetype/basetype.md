# 数据类型、运算符

小伙伴们，又是元气满满的一天，今天继续开干！！！

## 一、数据的表示详解

昨天我们学习了变量，我们知道变量可以用来记录数据的。那么数据在计算机底层是以什么形式表示的呢？下面我们就学习一下数据在计算机中的底层原理。

### 1.1 整数在计算机中的存储原理

其实任何数据在计算机中都是以**二进制**表示的。那这里肯定有人问，什么是二进制啊？所谓二进制其实就是一种数据的表示形式，它的特点是逢2进1。

数据的表示形式除了二进制（逢2进1），八进制（逢8进1）、还有十进制（逢10进1）、十六进制（逢10进1）等。

对于二进制绝大多数同学，应该是非常陌生的。 没关系！来，大家跟着我的思路，你就知道二进制是怎么表示数据的了。

```java
1.二进制中只有0和1两个数
	首先十进制的0和二进制的0是一样的，十进制的1和二进制的1也是 一样的。但是十进制中	  有2，但是二进制中就没有2了

2.那么二进制是如何表示十进制的2呢？
	1
+	1		
——————————	
   10	  这里两个1相加，结果为2，由于二进制满2进1，所以最终结果10
   
3.那么二进制是如何表示十进制的3呢？
	前面我们已经知道二进制10表示十进制的2，那么二进制10+1就表示十进制的3啊！
	10
+    1
—————————
    11	 十进制的3对应的二进制是11

4.那么二进制是如何表示十进制4的呢？
	前面我们已经知道二进制11表示十进制的4，那么11+1就表示十进制的5啊
	11
+    1
—————————
   100   十进制的5对应的二进制是100

你找到规律了吗？ 你能不能依次写出5的二进制、6的二进制？
```

前面每算一个二进制数据都是采用+1的方式，逢2进1，一个一个算出来的。有没有更快的算出十进制对应二进制的方法呢？ 这里学习一种方式：叫做除2取余法。

- **除2取余法**

```java
1.怎么做呢？
	答：让十进制数据连续除以2，直到商为0，余数反转

2.举例1：把十进制6转换为二进制	
			商	余数
	6/2     3    0
    3/2		1	 1
    1/2		0	 1
    然后把余数反转：6对应的二进制是110
    
3.举例2： 把十进制13转换为二进制
			商	余数
	13/2	6	 1
    6/2		3	 0
    3/2	 	1 	 1
    1/2		0	 1
    然后把余数反转：10对应的二进制是1101
    
4.练习1：你能把十进制7转换为二进制吗？
	自己试试吧！

```

关于变量记录的数据在计算机中如何表示我们就先学习到这里。



- **计算机的最小存储单位**

前面我们已经知道计算机表示数据是用二进制来的， 这里我又要抛出一个问题来了！ 我现在想要在计算机中存储一个整数6，转换为二进制是110，那么计算机中只是存110吗三位数字吗？ 其实不是的，**计算机中最小的存储单位是字节（Byte），一个字节占8位（bit）**，也就是说即使这个数据不足8位也需要用8位来存储。

![1660754639238](./assets/1660754639238.png)

我们随便找到一个文件，看文件的属性，可以看到文件的大小都是以字节为单位的。

![1660754762466](./assets/1660754762466.png)



### 1.2 字符在计算机中的存储原理

通过上一节的学习，我们知道了整数是如何在计算机中如何存储的？那么字符在计算机中是如何存储的呢？

其实字符并不是直接存储的，而是把每一个字符编为一个整数，存储的是字符对应整数的二进制形式。美国人搞了一套字符和整数的对应关系表，叫做ASCII编码表。

```java
ASCII编码表中字符编码的规律：
	1.字符0对应48，后面的1,2,3,4...9 对应的十进制整数依次往后顺延
	2.字符a对应97，后面的b,c,d,e...z 对应的十进制整数依次往后顺延
	3.字符A对应65，后面的B,C,D,E...Z 对应的十进制整数依次往后顺延
```

![1660755324089](./assets/1660755324089.png)

需要注意的是，在ASCII编码表中是不包含汉字的。汉字在其他编码表中，后面我们会单独介绍。关于字符在计算机中的存储学到这就可以了。



### 1.3 图片视频声音的存储原理

- **图片的存储**

通过上面的学习我们已经知道整数和字符是如何存储的，最终都是要转换为二进制数据的，对吧！ 那图片、声音、视频又是如何存储的呢？我们也来了解一下

我们从图片开始，如果你把一张图片不断的放大，你会看到有马赛克的效果。你会发现图片中的每一个细节是由一个一个的小方格组成的，每一个小方格中其实就是一种颜色。任何一种颜色可以使用三原色来表示，简称RGB，其中R（红色），G（绿色），B（蓝色），而RGB中每一种颜色又用一个字节的整数来表示，最小值是0最大值是255

![1660755882309](./assets/1660755882309.png)

```java
RGB（0,0,0）表示黑色
RGB（255,255,255）表示白色
RGB（255,0,0） 表示红色
RGB（255,255,0） 表示红色和绿色混合为黄色
RGB（255,0,255） 表示红色和蓝色混合为紫色
...
```

你在画图板的颜色编辑器中可以通过指定RGB的值，来调整得到任意的颜色。一张图片实际上就是有很多个小方块的颜色组成的，而每一种颜色又是由RGB三原色的整数表示的，整数最终会转换为二进制进行存储。

![1660756387308](./assets/1660756387308.png)

- **视频的存储**

实际上视频和图片是一样的，把多张图片连续播放，在一秒钟内连续播放24张以上，由于人眼存在视觉暂留现象，人眼感受不到画面切换的时间间隔，就认为是连续的视频了。



- **声音的存储**

了解过物理的同学肯定知道，声音是以波的形式传播的。我们可以把声波在表示在一个坐标系上，然后在坐标系上取一些点，把这些点的坐标值以二进制的形式存储到计算机中，这就是声音的存储原理。

![1660757825804](./assets/1660757825804.png)



### 1.4 数据的其他表示形式

- **二进制到十进制的转换**

前面我们学习了十进制可以转二进制，采用的是除2取余法，那么我们反过来能不能把二进制转换为十进制呢？

这里给大家介绍一种计算方式叫做：**8421码**

为了便于理解，我们先在看一下十进制怎么转十进制，主要是为了让大家看到演化过程。

```java
1.十进制转十进制
	比如我们把12345进行分解：
        12345 = 10000 + 2000 + 300 + 40 + 5
              = 1*10^4 + 2*10^3 + 3*10^2 + 5*10^0
	我们发现：
		在十进制中如果把十进制的每一位从右往左从0开始编一个号，假设这一位数字是a,			那么这一位数表示的值就是：a*10^n；
	
----------------------------------------------------------------------二2.二进制转十进制：
	类比十进制：
		如果把二进制的每一位从从右往左0开始编一个号用n表示，假设二进制的每一位是a，
		那么这一位表示的十进制值是：a*2^n
		
	1)假设二进制的每一位都是1：
		128	64	32	16	8	4	2	1	每一位表示的十进制：a*2^n
		7	6	5	4	3	2	1	0	编号：n
		1	1	1	1	1	1	1	1   二进制的每一位：a
	
        二进制		 十进制
        11111111 = 1*2^7  + 1*2^6 + 1*2^5 + ... + 1*2^0
                 = 128    + 64    + 32    + ... + 1
                 = 255
    
    2)假设二进制的为0010001
    	128	64	32	16	8	4	2	1	每一位表示的十进制：a*2^n
    	7	6	5	4	3	2	1	0	编号：n
    	0	0	1	0	0	0	0	1	二进制的每一位：a
    
    	二进制				十进制
    	00001101 = 0*2^7 + 0*2^6 + 1*2^5 + ... + 1*2^0
    			 = 0     + 0     + 32 	 + ... + 1
    			 = 33

    3)8421码：从右往左给二进制的每一位数依次按照1 2 4 8...标记
    	128	64	32	16	8	4	2	1
    	0	0	1	0	0	0	0	1
    	-----------------------------
    	只需要将1位上的数字加起来，就是二进制对应的十进制
    	
    	二进制			  十进制
    	00001101 = 		8+4+1
    			 = 		13
    	
    	0000111	 =      4+2+1
    			 = 		7
    	
    	0001111  =      8+4+2+1
    			 =      25
```



- **二进制转八进制**

前面我们说计算机中数据都是采用二进制来存储的，但是二进制阅读和编写起来都不太方便。为了便于阅读和书写，又推出了八进制、十六进制。

```java
1.运算规则：
	把二进制的每三位一组合，然后对每三位用8421码进行计算，最后拼接到一起
	原因：因为111，的值是7, 再大满7就需要往进位了。 
	
2.把二进制11001110转换为八进制数据
	01	100 001		二进制每三位一组合
    1	4	1		每一组进行8421码运算
    ----------
    八进制：141
```

- **二进制转十六进制**

```java
1.运算规则：
	把二进制的每四位一组合，然后对每四位用8421码进行计算，最后拼接到一起
	原因：因为1111，的值是15, 再大1满16了就需要往进位了。 
	
2.举例：把二进制11001110转换为十六进制数据
	0110 0001		二进制每四位一组合
    6	 1			每一组进行8421码运算
    ----------
    十六进制：61
    
3.练习：把111100转换为十六进制
	0011 1100
    3	 12		由于十六进制中有a,b,c,d,e,f分别表示10,11,12,13,14,15
    -----------
    十六进制：3c
```



### 1.5 不同进制在Java程序中的书写格式

```java
System.out.pirntln('a'+1); //98
System.out.pirntln(0b01100001); //97
System.out.pirntln(0141); //97
System.out.pirntln(0x61); //97
```





## 二、数据类型详解

在前面的课程中，我们学过了变量的定义，在定义变量时我们是要声明数据类型的，这里的**数据类型是用来规定变量存储什么类型的数据**。

比如`int a = 10;` 这里的`int`就是限制变量只能存储整数； 除了int这种数据类型Java还提供了很多其他的数据类型。Java的数据类型整体上来说分为两大类： **基本数据类型**、**引用数据类型**。 

我们今天主要学习基本数据类型，基本数据类型一共有4类8种，每一种数据类型占用的内存空间不一样，能够表示的数据范围也不一样。如下图所示

![1660832924103](./assets/1660832924103.png)

需要我们注意的是，随便写一个整数或者小数的字面量，它也是有默认数据类型的

```
- 比如23，它默认就为int类型；如果加上后缀L，则为long类型；
- 比如23.8，它默认为double类型；如果加上后缀F，则为float类型;
```

下面定义各种类型的变量，将这8种基本数据类型都用一下。

```java
public class TypeDemo1 {
    public static void main(String[] args) {
        // 目标：掌握8种基本数据类型，用来定义变量。
        // 1、整型
        byte number = 98;
        System.out.println(number);

        short number2 = 9000;

        int number3 = 12323232; // 默认

        // 注意：随便写一个整型字面量，默认是int类型的，73642422442424虽然没有超过long的范围，但是它超过了本身int的范围了。
        // 如果希望随便写一个整型字面量是long类型的，需要在其后面加上L/l
        long number4 = 73642422442424L;

        // 2、浮点型
        //注意:
        //随便写一个小数字面量，默认当成double类型对待的，
        //如果希望这个小数是float类型的，需要在后面加上：F/f
        float score1 = 99.5F;
        double score2 = 99.8; // 默认定义方案。

        // 3、字符型
        char ch1 = 'a';
        char ch2 = '中';
        char ch3 = '国';

        // 4、布尔型
        boolean b1 = true;
        boolean b2 = false;

        // 引用数据类型：String.
        // String代表的是字符串类型，定义的变量可以用来记住字符串。
        String name = "黑马";
        System.out.println(name);
    }
}
```



## 三、数据类型转换



### 3.1 自动类型转换

各位同学，接下来我们来学习类型转换的知识。为什么要学习类型转换呢？因为在我们实际开发中可能存在将某种类型变量的值，赋值给另一个类型的变量；也可能存在多种数据类型的数据一起运算的情况。

在以上情况中，其实都会涉及到类型转换。类型转换的形式总体分为2种，一种是**自动类型转换**，一种是**强制类型转换**。 这里先学习自动类型转换

- **什么是自动类型转换呢？**

```java
答：自动类型转换指的是，数据范围小的变量可以直接赋值给数据范围大的变量
	byte a = 12; 
	int b = a; //这里就发生了自动类型转换(把byte类型转换int类型)
```

- **自动类型转换的原理是怎样的？**

```java
答：自动类型转换其本质就是在较小数据类型数据前面，补了若干个字节
```

![1660837214161](./assets/1660837214161.png)

除了byte和int之间的转换之外，其他类型也可以转换，转换顺序如下图所示

![1660837456261](./assets/1660837456261.png)

下面我们通过代码演示一下，自动类型转换的各种形式。

```java
public class TypeConversionDemo1 {
    public static void main(String[] args) {
        // 目标：理解自动类型转换机制。
        byte a = 12;
        int b = a; // 发生了自动类型转换了
        System.out.println(a);
        System.out.println(b);

        int c = 100; // 4
        double d = c;// 8 发生了自动类型转换了
        System.out.println(d);

        char ch = 'a'; // 'a' 97 => 00000000 01100001
        int i = ch; // 发生了自动类型转换了 =>  00000000 00000000  00000000 01100001
        System.out.println(i);
    }
}
```



- **表达式的自动类型转换**

自动类型转换还有另外一种形式，就是表达式的自动类型转换。所谓表达式指的是几个变量或者几个数据一起参与运算的式子。

如果同一个表达式中，出现不同类型的变量或者数据一起运算，这种情况下运算结果是一个什么数据类型呢？需要遵守下面的两条运算规则：

```java
1.多种数据类型参与运算，其结果以大的数据类型为准
2.byte,short,char 三种类型数据在和其他类型数据运算时，都会转换为int类型再运算
```

接下来我们来看代码演示，自己试一试

```java
public class TypeConversionDemo2 {
    public static void main(String[] args) {
        // 目标：掌握表达式的自动类型转换机制。
        byte a = 10;
        int b = 20;
        long c = 30;
        long rs = a + b + c;
        System.out.println(rs);

        double rs2 = a + b + 1.0;
        System.out.println(rs2);
		
        byte i = 10;
        short j = 30;
        int rs3 = i + j;
        System.out.println(rs3);

        // 面试笔试题： 即使两个byte运算，结果也会提升为int
        byte b1 = 110;
        byte b2 = 80;
        int b3 = b1 + b2;
        System.out.println(b3);
    }
}
```



### 3.2 强制类型转换

前面我们学习了自动类型转换，我们知道可以将数据类型小的数据可以直接赋值给数据范围大的变量。 那反过来，能不能将数据范围大的数据直接赋值给数据范围小的变量呢？ **答案是会报错。**

因为数据范围大的数据，赋值给数据范围小的变量，它有可能装不下；就像把一个大桶的水倒入一个小桶中，有溢出的风险。

- **什么是强制类型转换**

但是你强行将范围大的数据，赋值给范围小的变量也是可以的，这里就需要用到强制类型转换。下面是强制类型转换的格式

```java
目标数据类型  变量名  =  (目标数据类型)被转换的数据;
```

下面是强制类型转换的代码演示

```java
public class TypeConversionDemo3 {
    public static void main(String[] args) {
        // 目标：掌握强制类型转换。
        int a = 20;
        byte b = (byte) a;  // ALT + ENTER 强制类型转换。
        System.out.println(a);
        System.out.println(b);

        int i = 1500;
        byte j = (byte) i;
        System.out.println(j);

        double d = 99.5;
        int m = (int) d; // 强制类型转换
        System.out.println(m); // 丢掉小数部分，保留整数部分
    }
}
```

- **强制类型转换的原理**

  强制类型转换的原理，其实就是**强行把前面几个字节砍掉，但是有数据丢失的风险**。

![1660840481803](./assets/1660840481803.png)

到这有关数据类型和数据类型转换的内容，我们就学习完了。大家能够知道什么时候会发生自动类型转换，以及如何进行强制类型转换就可以了。



## 四、运算符

接下来，给同学们讲解一个在开发中用得很多的一块内容，叫做运算符。

大家知道计算机是用来处理数据的，处理数据就少不了对数据的计算，想要对数据进行计算就必须用到运算符。

运算符就是参与运算的符号。Java提供的运算符有很多种，可以分为算术下面几种

- 基本算术运算符
- 自增自减运算符
- 赋值运算符
- 关系运算符
- 逻辑运算符
- 三元运算符

### 3.1 算术运算符

先从最基本的算术运算符开始学习，算术运算符有 `+ - * / % ` ，其中`*`表示乘法，`/`表示除法，`%`表示取余数

需要我们注意以下几点

```java
/: 两个整数相除，结果也是一个整数
%: 表示两个数相除，取余数
```

![1660841349983](./assets/1660841349983.png)

需要我们注意的是：`+`符号除了用于加法运算，还可以作为连接符。**`+`符号与字符串运算的时候是用作连接符的，其结果依然是一个字符串**。

下面通过代码演示一下各种算术运算符的运算效果

```java
public class OperatorDemo1 {
    public static void main(String[] args) {
        // 目标：掌握基本的算术运算符的使用。
        int a = 10;
        int b = 2;
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b); // 20
        System.out.println(a / b); // 5
        System.out.println(5 / 2); // 2.5 ==> 2
        System.out.println(5.0 / 2); // 2.5
        int i = 5;
        int j = 2;
        System.out.println(1.0 * i / j); // 2.5

        System.out.println(a % b); // 0
        System.out.println(3 % 2); // 1

        System.out.println("---------------------------------------");

        // 目标2：掌握使用+符号做连接符的情况。
        int a2 = 5;
        System.out.println("abc" + a2); // "abc5"
        System.out.println(a2 + 5); //  10
        System.out.println("itheima" + a2 + 'a'); // "itheima5a"
        System.out.println(a2 + 'a' + "itheima"); // 102itheima
    }
}
```



### 3. 2 自增自减运算符

接下来，学习一种比较常用的运算符：`++`和`--` 

`++`读作自增，`--`读作自减； 运算规则如下

![1660841701880](./assets/1660841701880.png)

需要我们注意的是，自增自减只能对变量进行操作，不能操作字面量。具体使用时也分为两种情况，如下:

```java
1.单独使用：++或者--放在变量前面没有区别
	   int a =10; 
	    a++;  //11
		--a;  //10
		System.out.println(a); //10

2.混合使用：++或者--放在变量或者前面运算规则稍有不通过
	//++在后：先做其他事情，再做自增和自减
	int a = 10;
	int b = a++; //等价于 int b = a; a++; 

	//++在前：先自增或者自减，再做其他运输
	int x = 10;
	int y = --x; //等价于x--; int y = x;  
```

下面通过代码演示一下`++`和`--`的用法

```java
public class OperatorDemo2 {
    public static void main(String[] args) {
        // 目标：掌握自增自减运算符的使用。
        int a = 10;
        // a++; // a = a + 1
        ++a;
        System.out.println(a);

        // a--; // a = a - 1
        --a;
        System.out.println(a);

        // 自增自减只能操作变量不能操作字面量的，会报错！
      	//System.out.println(2++);

        System.out.println("--------------------------------------");

        int i = 10;
        int rs = ++i; // 先加后用
        System.out.println(rs);
        System.out.println(i);

        int j = 10;
        int rs2 = j++; // 先用后加
        System.out.println(rs2);
        System.out.println(j);
    }
}
```



### 3.3 赋值运算符

接下来，我们学习赋值运算符。基本的赋值运算符其实就是`=`号，意思就是把右边的数据赋值给左边的变量。

```java
int a = 10; //将数据10赋值给左边的变量a
```

除了基本的赋值运算符，我们这里主要学习一下扩展的赋值运算符。有`+= -= *= /= %=`

![1660872631676](./assets/1660872631676.png)

我们以`+=`为例来看一下它的运算规则，其他的运算符运算同理分析即可

```java
int a = 10;
//+=解析：在a原来记录值10的基础上累加5，将结果重新赋值给a; 
a+=5; 
//最终打印a的值为15
System.out.println(a); 
```

下面通过一个首发红包的例子给大家演示一下

```java
public class OperatorDemo3 {
    public static void main(String[] args) {
        // 目标：掌握扩展赋值运算符的使用。
        // +=
        // 需求：收红包
        double a = 9.5;
        double b = 520;
        a += b;  // a = (double)(a + b);
        System.out.println(a);

        // -= 需求：发红包
        double i = 600;
        double j = 520;
        i -= j;  // i = (double)(i - j);
        System.out.println(i);

        int m = 10;
        int n = 5;
        // m *= n; // 等价形式： m = (int)(m * n)
        // m /= n; // 等价形式： m = (int)(m / n)
        m %= n;    // 等价形式： m = (int)(m % n)
        System.out.println(m);
    }
}
```

学完扩展赋值运算符的基本使用之后，接下来我们看一个面试题

```java
问题1：下面的代码否有问题？
    byte x = 10;
    byte y = 30;
	x = x + y;  //这句代码有问题，因为两个byte类型数据相加，会提升为int类型;
	
问题2：下面的代码是否有问题？
	byte x = 10;
	byte y = 30;
	x+=3; //这句代码没有问题，因为这里有隐含的强制类型转换
		  //x+=3; 等价于 byte x = (byte)(x+y);
```

到这里赋值运算符就学习完了，稍微总结一下

```java
1.基本赋值运算符：
	=符号含义： 把右边的值赋值给左边的变量
	
2.扩展赋值运算符：
	+= -= *= /= %=符号含义：将右边的数据和左边的变量相加、相减、相乘、相除、取余数后，将结果重新赋值给左边的变量。
```



### 3.4 关系运算符

接下来我们学习一个，在实际代码中用得很多，但是又非常简单的运算符，叫关系运算符。关系运算符（也叫比较运算符）。

下图是每一种关系运算符的符号及作用，每一个关系运算符的结果都是false

![1660872844712](./assets/1660872844712.png)

下面通过代码来家演示一下，各种关系运算符的效果

```java
public class OperatorDemo4 {
    public static void main(String[] args) {
        // 目标：掌握关系运算符的基本使用。
        int a = 10;
        int b = 5;
        boolean rs = a > b;
        System.out.println(rs);

        System.out.println(a >= b); // 要么a大于b,或者a等于b
        System.out.println(2 >= 2); // true
        System.out.println(a < b);
        System.out.println(a <= b); // false
        System.out.println(2 <= 2); // true
        System.out.println(a == b); // false
        System.out.println(5 == 5); // true
        
        // 注意了：判断是否相等一定是用 == ，=是用来赋值的。
        // System.out.println(a = b); 
        System.out.println(a != b); // true
        System.out.println(10 != 10); // false

        System.out.println(false ^ true ^ false);
    }
}

```

现在我们只需要知道每一种关系运算符的运算效果就行了，**关于关系运算符的实际运用需要在后面学习了流程控制语句才能实际用到。**

关系运算符在程序中常用于条件判断，根据条件判断的结果是true还是false，来决定后续该执行哪些操作。



### 3.5 逻辑运算符

学习完关系运算符之后，接下来我们学习一下逻辑运算符。我们来看一下逻辑运算符有哪些。

**逻辑运算符是用来将多个条件放在一起运算，最终结果是true或者false**

![1660873470958](./assets/1660873470958.png)

下面我们通过几个案例来演示一下逻辑运算符的使用

```java
//需求1：要求手机必须满足尺寸大于等于6.95，且内存必须大于等于8.
//需求2：要求手机要么满足尺寸大于等于6.95，要么内存必须大于等于8.
```

```java
public class OperatorDemo5 {
    public static void main(String[] args) {
        // 目标：掌握逻辑运算符的使用。
        // 需求：要求手机必须满足尺寸大于等于6.95，且内存必须大于等于8.
        double size = 6.8;
        int storage = 16;
        // 1、& 前后的条件的结果必须都是true ,结果才是true.
        boolean rs = size >= 6.95 & storage >= 8;
        System.out.println(rs);

        // 需求2：要求手机要么满足尺寸大于等于6.95，要么内存必须大于等于8.
        // 2、| 只要多个条件中有一个是true,结果就是true.
        boolean rs2 = size >= 6.95 | storage >= 8;
        System.out.println(rs2);

        // 3、!取反的意思
        System.out.println(!true); // false
        System.out.println(!false); // true
        System.out.println(!(2 > 1)); // false

        // 4、^ 前后条件的结果相同时返回false，不同时返回true.
        System.out.println(true ^ true); // false
        System.out.println(false ^ false); // false
        System.out.println(true ^ false); // true
        System.out.println(false ^ true); // true

        // 5、&& 左边为false，右边不执行。
        int i = 10;
        int j = 20;
        // System.out.println(i > 100 && ++j > 99);
        System.out.println(i > 100 & ++j > 99);
        System.out.println(j);

        // 6、|| 左边是true ，右边就不执行。
        int m = 10;
        int n = 30;
        // System.out.println(m > 3 || ++n > 40);
        System.out.println(m > 3 | ++n > 40);
        System.out.println(n);
    }
}
```

到这里关于逻辑运算符的规则记学习完了，给你一个运算表达式你能分析出结果就行。**至于逻辑运算符的实际运用，需要在学习了流程控制语句之后，才能实际用到。**

逻辑运算符在程序中常用于组合几个条件判断，根据条件判断的结果是true还是false，来决定后续该执行哪些操作。

### 3.6 三元运算符

接下来，我们学习今天最后一种运算符，叫做三元运算符。

先认识一下三元运算符的格式： 

```java
关系表达式? 值1 : 值2;
```

三元运算的执行流程：首先计算关系表达式的值，如果关系表达式的值为true，则返回值1；如果关系表达式的值为false, 则返回值2；

如下图所示：判断学生的成绩是否>=60，如果为true，就考试通过；如果为false，就成绩不合格。

![1660875022987](./assets/1660875022987.png)

接下来通过代码来演示一下，目的是让大家掌握三元运算符的格式和执行流程。

```java
public class OperatorDemo6 {
    public static void main(String[] args) {
        // 目标：掌握三元运算符的基本使用。
        double score = 58.5;
        String rs = score >= 60 ? "成绩及格" : "成绩不及格";
        System.out.println(rs);

        // 需求2：找出2个整数中的较大值，并输出。
        int a = 99;
        int b = 69;
        int max = a > b ? a : b;
        System.out.println(max);

        // 需求3：找3个整数中的较大值。
        int i = 10;
        int j = 45;
        int k = 34;

        // 找出2个整数中的较大值。
        int temp = i > j ? i : j;
        // 找出temp与k中的较大值。
        int max2 = temp > k ? temp : k;
        System.out.println(max2);
    }
}

```



### 3.7 运算优先级

最后我们在给大家介绍一下运算符的优先级，如果你想要知道各个运算符的优先级，哪些先算哪些后算，可以参考下面这张图

![1660875681298](./assets/1660875681298.png)

从图中我们发现，&&运算比||运算的优先级高，所以&&和||同时存在时，是先算&&再算||；

比如下面的代码

```java
//这里&&先算 相当于 true || false 结果为true
System.out.println(10 > 3 || 10 > 3 && 10 < 3); // true
```

**最后给大家说一下，在实际开发中，其实我们很少考虑运算优先级， 因为如果你想让某些数据先运算，其实加`()`就可以了，这样阅读性更高。**

```java
//有括号先算 相当于 true && false 结果为false
System.out.println((10 > 3 || 10 > 3) && 10 < 3); //false
```



## 五、案例技术：获取用户键盘输入的数据

最后给大家讲一个案例技术，这个技术现在其实有一些超前，因为需要用到后面学习的知识。但是在这里讲可以让我们的学习体验度更好一点，前面案例中参与运算的数据都是在程序中写死的，下面我们想让自己键盘录入数据，然后参与程序的运行。

**键盘录入这个事情，其实并不是我们自己做的，而是Java本身就提供了这样的功能，我们按照它的要求，去调用就行。**

我们在安装JDK的时候，其实JDK中就已经包含了一些Java写好的代码，我们把Java写好的代码直接拿过来用就行。

```
比如：Scanner就是Java提供给我们用于键盘录入数据的类，为了录入不同类型的数据，还提供了不同的功能，每一个功能会有不同的名称，我们只需要调用Scanner提供的功能就可以完成键盘录入数据。
```

大家只需要按照下面的步骤编写代码，就可以键盘录入数据了

```java
【第1步】：在class类上导包：一般不需要我们自己做，idea工具会自动帮助我们 导包的。
	import java.util.Scanner;
	
【第2步】：得到一个用于键盘扫描器对象（照抄代码就行，固定格式）
	//Scanner是键盘扫描器对象(你就把它理解成一个东西)，这个东西有录入的功能
	//sc是给这个东西取的名字
	Scanner sc = new Scanner(System.in);

【第3步】：开始调用sc的功能，来接收用户键盘输入的数据。
	//sc这个东西有键盘录入整数的功能，这个功能的名字叫nextInt()
	//.表示表示调用的意思
	int age = sc.nextInt();
	System.out.println("我的年龄是:"+age);

	//sc这个东西还有键盘录入字符串的功能，这个功能的名字叫next
	String name = sc.next();
	System.out.println("我的姓名是:"+name);
```

下面是完整代码演示

```java
public class ScannerDemo1 {
    public static void main(String[] args) {
        // 1、导包:一般不需要我们自己做，idea工具会自动帮助我们 导包的。
        // 2、抄写代码：得到一个键盘扫描器对象（东西）
        Scanner sc = new Scanner(System.in);

        // 3、开始 调用sc的功能，来接收用户键盘输入的数据。
        System.out.println("请您输入您的年龄：");
        int age = sc.nextInt(); // 执行到这儿，会开始等待用户输入一个整数，直到用户按了回车键，才会拿到数据。
        System.out.println("您的年龄是："  + age);

        System.out.println("请您输入您的名字：");
        String name = sc.next(); // 执行到这儿，会开始等待用户输入一个字符串，直到用户按了回车键，才会拿到数据。
        System.out.println(name + "欢迎您进入系统~~");
    }
}
```

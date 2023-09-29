
## 集合概述和分类

### 1 集合的分类

同学们，前面我们已经学习过了ArrayList集合，但是除了ArrayList集合，Java还提供了很多种其他的集合，如下图所示：

![1666154871520](./assets/1666154871520.png)

我想你的第一感觉是这些集合好多呀！但是，我们学习时会对这些集合进行分类学习，如下图所示：一类是单列集合元素是一个一个的，另一类是双列集合元素是一对一对的。

![1666154948620](./assets/1666154948620.png)

在今天的课程中，主要学习Collection单列集合。Collection是单列集合的根接口，Collection接口下面又有两个子接口List接口、Set接口，List和Set下面分别有不同的实现类，如下图所示：

![1666155169359](./assets/1666155169359.png)

上图中各种集合的特点如下图所示：

![1666155218956](./assets/1666155218956.png)

可以自己写代码验证一下，各种集合的特点

```java
//简单确认一下Collection集合的特点
ArrayList<String> list = new ArrayList<>(); //存取顺序一致，可以重复，有索引
list.add("java1");
list.add("java2");
list.add("java1");
list.add("java2");
System.out.println(list); //[java1, java2, java1, java2] 

HashSet<String> list = new HashSet<>(); //存取顺序不一致，不重复，无索引
list.add("java1");
list.add("java2");
list.add("java1");
list.add("java2");
list.add("java3");
System.out.println(list); //[java3, java2, java1] 
```



### 2 Collection集合的常用方法

接下来，我们学习一下Collection集合的一些常用方法，这些方法所有Collection实现类都可以使用。 这里我们以创建ArrayList为例，来演示

```java
Collection<String> c = new ArrayList<>();
//1.public boolean add(E e): 添加元素到集合
c.add("java1");
c.add("java1");
c.add("java2");
c.add("java2");
c.add("java3");
System.out.println(c); //打印: [java1, java1, java2, java2, java3]

//2.public int size(): 获取集合的大小
System.out.println(c.size()); //5

//3.public boolean contains(Object obj): 判断集合中是否包含某个元素
System.out.println(c.contains("java1")); //true
System.out.println(c.contains("Java1")); //false

//4.pubilc boolean remove(E e): 删除某个元素，如果有多个重复元素只能删除第一个
System.out.println(c.remove("java1")); //true
System.out.println(c); //打印: [java1,java2, java2, java3]

//5.public void clear(): 清空集合的元素
c.clear(); 
System.out.println(c); //打印：[]

//6.public boolean isEmpty(): 判断集合是否为空 是空返回true 反之返回false
System.out.println(c.isEmpty()); //true

//7.public Object[] toArray(): 把集合转换为数组
Object[] array = c.toArray();
System.out.println(Arrays.toString(array)); //[java1,java2, java2, java3]

//8.如果想把集合转换为指定类型的数组，可以使用下面的代码
String[] array1 = c.toArray(new String[c.size()]);
System.out.println(Arrays.toString(array1)); //[java1,java2, java2, java3]

//9.还可以把一个集合中的元素，添加到另一个集合中
Collection<String> c1 = new ArrayList<>();
c1.add("java1");
c1.add("java2");
Collection<String> c2 = new ArrayList<>();
c2.add("java3");
c2.add("java4");
c1.addAll(c2); //把c2集合中的全部元素，添加到c1集合中去
System.out.println(c1); //[java1, java2, java3, java4]
```

最后，我们总结一下Collection集合的常用功能有哪些，ArrayList、LinkedList、HashSet、LinkedHashSet、TreeSet集合都可以调用下面的方法。

![1666158266534](./assets/1666158266534.png)



## 三、Collection遍历方式

各位同学，接下来我们学习一下Collection集合的遍历方式。有同学说：“集合的遍历之前不是学过吗？就用普通的for循环啊? “  没错！之前是学过集合遍历，但是之前学习过的遍历方式，只能遍历List集合，不能遍历Set集合，因为以前的普通for循环遍历需要索引，只有List集合有索引，而Set集合没有索引。

所以我们需要有一种通用的遍历方式，能够遍历所有集合。

### 3.1 迭代器遍历集合

 接下来学习的迭代器就是一种集合的通用遍历方式。

代码写法如下：

```java
Collection<String> c = new ArrayList<>();
c.add("赵敏");
c.add("小昭");
c.add("素素");
c.add("灭绝");
System.out.println(c); //[赵敏, 小昭, 素素, 灭绝]

//第一步：先获取迭代器对象
//解释：Iterator就是迭代器对象，用于遍历集合的工具)
Iterator<String> it = c.iterator();

//第二步：用于判断当前位置是否有元素可以获取
//解释：hasNext()方法返回true，说明有元素可以获取；反之没有
while(it.hasNext()){
    //第三步：获取当前位置的元素，然后自动指向下一个元素.
    String e = it.next();
    System.out.println(s);
}
```

迭代器代码的原理如下：

- 当调用iterator()方法获取迭代器时，当前指向第一个元素
- hasNext()方法则判断这个位置是否有元素，如果有则返回true，进入循环
- 调用next()方法获取元素，并将当月元素指向下一个位置，
- 等下次循环时，则获取下一个元素，依此内推

![1666162606524](./assets/1666162606524.png)

最后，我们再总结一下，使用迭代器遍历集合用到哪些方法

![1666162899638](./assets/1666162899638.png)



### 3.2 增强for遍历集合

同学们刚才我们学习了迭代器遍历集合，但是这个代码其实还有一种更加简化的写法，叫做增强for循环。

格式如下：

![1666163065998](./assets/1666163065998.png)

需要注意的是，增强for不光可以遍历集合，还可以遍历数组。接下来我们用代码演示一em.o下：

```java
Collection<String> c = new ArrayList<>();
c.add("赵敏");
c.add("小昭");
c.add("素素");
c.add("灭绝");

//1.使用增强for遍历集合
for(String s: c){
    System.out.println(s); 
}

//2.再尝试使用增强for遍历数组
String[] arr = {"迪丽热巴", "古力娜扎", "稀奇哈哈"};
for(String name: arr){
    System.out.println(name);
}
```



### 3.3 forEach遍历集合

在JDK8版本以后还提供了一个forEach方法也可以遍历集合，如果下图所示：

![1666163351517](./assets/1666163351517.png)

我们发现forEach方法的参数是一个Consumer接口，而Consumer是一个函数式接口，所以可以传递Lambda表达式

```java
Collection<String> c = new ArrayList<>();
c.add("赵敏");
c.add("小昭");
c.add("素素");
c.add("灭绝");

//调用forEach方法
//由于参数是一个Consumer接口，所以可以传递匿名内部类
c.forEach(new Consumer<String>{
    @Override
    public void accept(String s){
        System.out.println(s);
    }
});


//也可以使用lambda表达式对匿名内部类进行简化
c.forEach(s->System.out.println(s)); //[赵敏, 小昭, 素素, 灭绝]
```

### 3.4 遍历集合案例

接下来，我们看一个案例，在集合中存储自定义的对象，并遍历。具体要求如下

![1666164331639](./assets/1666164331639.png)

首先，我们得写一个电影类，用来描述每一步电影应该有哪些信息。

```java
public class Movie{
    private String name; //电影名称
    private double score; //评分
    private String actor; //演员
    //无参数构造方法
    public Movie(){}
    //全参数构造方法
    public Movie(String name, double score, String actor){
        this.name=name;
        this.score=score;
        this.actor=actor;
    }
    //...get、set、toString()方法自己补上..
}
```

接着，再创建一个测试类，完成上面的需求

```java
public class Test{
    public static void main(String[] args){
        Collection<Movie> movies = new ArrayList<>();
        movies.add(new MOvie("《肖申克的救赎》", 9.7, "罗宾斯"));
        movies.add(new MOvie("《霸王别姬》", 9.6, "张国荣、张丰毅"));
        movies.add(new MOvie("《阿甘正传》", 9.5, "汤姆汉克斯"));
        
        for(Movie movie : movies){
            System.out.println("电影名：" + movie.getName());
            System.out.println("评分：" + movie.getScore());
            System.out.println("主演：" + movie.getActor());
        }
    }
}
```

以上代码的内存原理如下图所示：当往集合中存对象时，实际上存储的是对象的地址值

![1666165033103](./assets/1666165033103.png)



## 四、List系列集合

前面我们已经把Collection通用的功能学习完了，接下来我们学习Collection下面的一个子体系List集合。如下图所示：

![1666165150752](./assets/1666165150752.png)

### 4.1 List集合的常用方法

List集合是索引的，所以多了一些有索引操作的方法，如下图所示：

![1666165187815](./assets/1666165187815.png)

接下来，我们用代码演示一下这几个方法的效果

```java
//1.创建一个ArrayList集合对象（有序、有索引、可以重复）
List<String> list = new ArrayList<>();
list.add("蜘蛛精");
list.add("至尊宝");
list.add("至尊宝");
list.add("牛夫人"); 
System.out.println(list); //[蜘蛛精, 至尊宝, 至尊宝, 牛夫人]

//2.public void add(int index, E element): 在某个索引位置插入元素
list.add(2, "紫霞仙子");
System.out.println(list); //[蜘蛛精, 至尊宝, 紫霞仙子, 至尊宝, 牛夫人]

//3.public E remove(int index): 根据索引删除元素, 返回被删除的元素
System.out.println(list.remove(2)); //紫霞仙子
System.out.println(list);//[蜘蛛精, 至尊宝, 至尊宝, 牛夫人]

//4.public E get(int index): 返回集合中指定位置的元素
System.out.println(list.get(3));

//5.public E set(int index, E e): 修改索引位置处的元素，修改后，会返回原数据
System.out.println(list.set(3,"牛魔王")); //牛夫人
System.out.println(list); //[蜘蛛精, 至尊宝, 至尊宝, 牛魔王]
```



### 4.2 List集合的遍历方式

List集合相比于前面的Collection多了一种可以通过索引遍历的方式，所以List集合遍历方式一共有四种：

- 普通for循环（只因为List有索引）
- 迭代器
- 增强for
- Lambda表达式

```java
List<String> list = new ArrayList<>();
list.add("蜘蛛精");
list.add("至尊宝");
list.add("糖宝宝");

//1.普通for循环
for(int i = 0; i< list.size(); i++){
    //i = 0, 1, 2
    String e = list.get(i);
    System.out.println(e);
}

//2.增强for遍历
for(String s : list){
    System.out.println(s);
}

//3.迭代器遍历
Iterator<String> it = list.iterator();
while(it.hasNext()){
    String s = it.next();
    System.out.println(s);
}

//4.lambda表达式遍历
list.forEach(s->System.out.println(s));
```



### 4.3 ArrayList底层的原理

为了让同学们更加透彻的理解ArrayList集合，接下来，学习一下ArrayList集合的底层原理。

ArrayList集合底层是基于数组结构实现的，也就是说当你往集合容器中存储元素时，底层本质上是往数组中存储元素。 特点如下：

![1666166151267](./assets/1666166151267.png)

我们知道数组的长度是固定的，但是集合的长度是可变的，这是怎么做到的呢？原理如下：

![1666166661149](./assets/1666166661149.png)

数组扩容，并不是在原数组上扩容（原数组是不可以扩容的），底层是创建一个新数组，然后把原数组中的元素全部复制到新数组中去。

![1666166956907](./assets/1666166956907.png)

### 4.4 LinkedList底层原理

学习完ArrayList底层原理之后，接下来我们看一下LinkedList集合的底层原理。

LinkedList底层是链表结构，链表结构是由一个一个的节点组成，一个节点由数据值、下一个元素的地址组成。如下图所示

![1666167170415](./assets/1666167170415.png)

假如，现在要在B节点和D节点中间插入一个元素，只需要把B节点指向D节点的地址断掉，重新指向新的节点地址就可以了。如下图所示：

![1666167298885](./assets/1666167298885.png)

假如，现在想要把D节点删除，只需要让C节点指向E节点的地址，然后把D节点指向E节点的地址断掉。此时D节点就会变成垃圾，会把垃圾回收器清理掉。

![1666167419164](./assets/1666167419164.png)

上面的链表是单向链表，它的方向是从头节点指向尾节点的，只能从左往右查找元素，这样查询效率比较慢；还有一种链表叫做双向链表，不光可以从做往右找，还可以从右往左找。如下图所示：

![1666167523139](./assets/1666167523139.png)

LinkedList集合是基于双向链表实现了，所以相对于ArrayList新增了一些可以针对头尾进行操作的方法，如下图示所示：

![1666167572387](./assets/1666167572387.png)

### 4.5 LinkedList集合的应用场景

刚才我们学习了LinkedList集合，那么LInkedList集合有什么用呢？可以用它来设计栈结构、队列结构。

- 我们先来认识一下队列结构，队列结构你可以认为是一个上端开口，下端也开口的管子的形状。元素从上端入队列，从下端出队列。

![1666167793391](./assets/1666167793391.png)

入队列可以调用LinkedList集合的addLast方法，出队列可以调用removeFirst()方法.

```java
//1.创建一个队列：先进先出、后进后出
LinkedList<String> queue = new LinkedList<>();
//入对列
queue.addLast("第1号人");
queue.addLast("第2号人");
queue.addLast("第3号人");
queue.addLast("第4号人");
System.out.println(queue);

//出队列
System.out.println(queue.removeFirst());	//第4号人
System.out.println(queue.removeFirst());	//第3号人
System.out.println(queue.removeFirst());	//第2号人
System.out.println(queue.removeFirst());	//第1号人
```

- 接下来，我们再用LinkedList集合来模拟一下栈结构的效果。还是先来认识一下栈结构长什么样。栈结构可以看做是一个上端开头，下端闭口的水杯的形状。

  元素永远是上端进，也从上端出，先进入的元素会压在最底下，所以**栈结构的特点是先进后出，后进先出**

![1666168222486](./assets/1666168222486.png)

有没有感觉栈结构很像，手枪的子弹夹呀！！第一个压进入的子弹在最底下，最后一个才能打出来，最后一个压进入的子弹在最顶上，第一个打出来。

![1666168656191](./assets/1666168656191.png)

接着，我们就用LinkedList来模拟下栈结构，代码如下：

```java
//1.创建一个栈对象
LinkedList<String> stack = new ArrayList<>();
//压栈(push) 等价于 addFirst()
stack.push("第1颗子弹");
stack.push("第2颗子弹");
stack.push("第3颗子弹");
stack.push("第4颗子弹");
System.out.println(stack); //[第4颗子弹, 第3颗子弹, 第2颗子弹,第1颗子弹]

//弹栈(pop) 等价于 removeFirst()
System.out.println(statck.pop()); //第4颗子弹
System.out.println(statck.pop()); //第3颗子弹
System.out.println(statck.pop()); //第2颗子弹
System.out.println(statck.pop()); //第1颗子弹

//弹栈完了，集合中就没有元素了
System.out.println(list); //[]
```



## 五、Set系列集合

### 1.1 认识Set集合的特点

Set集合是属于Collection体系下的另一个分支，它的特点如下图所示

![1666169984705](./assets/1666169984705-1667311908041.png)

下面我们用代码简单演示一下，每一种Set集合的特点。

```java
//Set<Integer> set = new HashSet<>();	//无序、无索引、不重复
//Set<Integer> set = new LinkedHashSet<>(); //有序、无索引、不重复
Set<Integer> set = new TreeSet<>(); //可排序(升序)、无索引、不重复
set.add(666);
set.add(555);
set.add(555);
set.add(888);
set.add(888);
set.add(777);
set.add(777);
System.out.println(set); //[555, 666, 777, 888]
```



### 1.2 HashSet集合底层原理

接下来，为了让同学们更加透彻的理解HashSet为什么可以去重，我们来看一下它的底层原理。

HashSet集合底层是基于哈希表实现的，哈希表根据JDK版本的不同，也是有点区别的

- JDK8以前：哈希表 = 数组+链表
- JDK8以后：哈希表 = 数组+链表+红黑树

![1666170451762](./assets/1666170451762-1667311904484.png)

我们发现往HashSet集合中存储元素时，底层调用了元素的两个方法：一个是hashCode方法获取元素的hashCode值（哈希值）；另一个是调用了元素的equals方法，用来比较新添加的元素和集合中已有的元素是否相同。 

- 只有新添加元素的hashCode值和集合中以后元素的hashCode值相同、新添加的元素调用equals方法和集合中已有元素比较结果为true, 才认为元素重复。
- 如果hashCode值相同，equals比较不同，则以链表的形式连接在数组的同一个索引为位置（如上图所示）

在JDK8开始后，为了提高性能，当链表的长度超过8时，就会把链表转换为红黑树，如下图所示：

![1666171011761](./assets/1666171011761-1667311900100.png)



### 1.3 HashSet去重原理

前面我们学习了HashSet存储元素的原理，依赖于两个方法：一个是hashCode方法用来确定在底层数组中存储的位置，另一个是用equals方法判断新添加的元素是否和集合中已有的元素相同。

要想保证在HashSet集合中没有重复元素，我们需要重写元素类的hashCode和equals方法。比如以下面的Student类为例，假设把Student类的对象作为HashSet集合的元素，想要让学生的姓名和年龄相同，就认为元素重复。

```java
public class Student{
    private String name; //姓名
    private int age; //年龄
    private double height; //身高
 
    //无参数构造方法
    public Student(){}
    //全参数构造方法
    public Student(String name, int age, double height){
        this.name=name;
        this.age=age;
        this.height=height;
    }
    //...get、set、toString()方法自己补上..
    
    //按快捷键生成hashCode和equals方法
    //alt+insert 选择 hashCode and equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Student student = (Student) o;

        if (age != student.age) return false;
        if (Double.compare(student.height, height) != 0) return false;
        return name != null ? name.equals(student.name) : student.name == null;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = name != null ? name.hashCode() : 0;
        result = 31 * result + age;
        temp = Double.doubleToLongBits(height);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }
}
```

接着，写一个测试类，往HashSet集合中存储Student对象。

```java
public class Test{
    public static void main(String[] args){
        Set<Student> students = new HashSet<>();
        Student s1 = new Student("至尊宝",20, 169.6);
        Student s2 = new Student("蜘蛛精",23, 169.6);
        Student s3 = new Student("蜘蛛精",23, 169.6);
        Student s4 = new Student("牛魔王",48, 169.6);
        
        students.add(s1);
        students.add(s2);
        students.add(s3);
        students.add(s4);
        
        for(Student s : students){
            System.out.println(s);
        }
    }
}
```

打印结果如下，我们发现存了两个蜘蛛精，当时实际打印出来只有一个，而且是无序的。

```java
Student{name='牛魔王', age=48, height=169.6}
Student{name='至尊宝', age=20, height=169.6}
Student{name='蜘蛛精', age=23, height=169.6}
```



### 1.4 LinkedHashSet底层原理

接下来，我们再学习一个HashSet的子类LinkedHashSet类。LinkedHashSet它底层采用的是也是哈希表结构，只不过额外新增了一个双向链表来维护元素的存取顺序。如下下图所示：

![1666171776819](./assets/1666171776819-1667311894748.png)

每次添加元素，就和上一个元素用双向链表连接一下。第一个添加的元素是双向链表的头节点，最后一个添加的元素是双向链表的尾节点。

把上个案例中的集合改成LinkedList集合，我们观察效果怎样

```java
public class Test{
    public static void main(String[] args){
        Set<Student> students = new LinkedHashSet<>();
        Student s1 = new Student("至尊宝",20, 169.6);
        Student s2 = new Student("蜘蛛精",23, 169.6);
        Student s3 = new Student("蜘蛛精",23, 169.6);
        Student s4 = new Student("牛魔王",48, 169.6);
        
        students.add(s1);
        students.add(s2);
        students.add(s3);
        students.add(s4);
        
        for(Student s : students){
            System.out.println(s);
        }
    }
}
```

打印结果如下

```java
Student{name='至尊宝', age=20, height=169.6}
Student{name='蜘蛛精', age=23, height=169.6}
Student{name='牛魔王', age=48, height=169.6}
```



### 1.5 TreeSet集合

最后，我们学习一下TreeSet集合。TreeSet集合的特点是可以对元素进行排序，但是必须指定元素的排序规则。

如果往集合中存储String类型的元素，或者Integer类型的元素，它们本身就具备排序规则，所以直接就可以排序。

```java
Set<Integer> set1= new TreeSet<>();
set1.add(8);
set1.add(6);
set1.add(4);
set1.add(3);
set1.add(7);
set1.add(1);
set1.add(5);
set1.add(2);
System.out.println(set1); //[1,2,3,4,5,6,7,8]

Set<Integer> set2= new TreeSet<>();
set2.add("a");
set2.add("c");
set2.add("e");
set2.add("b");
set2.add("d");
set2.add("f");
set2.add("g");
System.out.println(set1); //[a,b,c,d,e,f,g]
```



如果往TreeSet集合中存储自定义类型的元素，比如说Student类型，则需要我们自己指定排序规则，否则会出现异常。

```java
//创建TreeSet集合，元素为Student类型
Set<Student> students = new TreeSet<>();

//创建4个Student对象
Student s1 = new Student("至尊宝",20, 169.6);
Student s2 = new Student("紫霞",23, 169.8);
Student s3 = new Student("蜘蛛精",23, 169.6);
Student s4 = new Student("牛魔王",48, 169.6);

//添加Studnet对象到集合
students.add(s1);
students.add(s2);
students.add(s3);
students.add(s4);
System.out.println(students); 
```

此时运行代码，会直接报错。原因是TreeSet不知道按照什么条件对Student对象来排序。

![1666172629095](./assets/1666172629095-1667311889347.png)

我们想要告诉TreeSet集合按照指定的规则排序，有两种办法：

> 第一种：让元素的类实现Comparable接口，重写compareTo方法

> 第二种：在创建TreeSet集合时，通过构造方法传递Compartor比较器对象

- **排序方式1：**我们先来演示第一种排序方式

```java
//第一步：先让Student类，实现Comparable接口
//注意：Student类的对象是作为TreeSet集合的元素的
public class Student implements Comparable<Student>{
    private String name;
    private int age;
    private double height;
	//无参数构造方法
    public Student(){}
    //全参数构造方法
    public Student(String name, int age, double height){
        this.name=name;
        this.age=age;
        this.height=height;
    }
    //...get、set、toString()方法自己补上..
    
    //第二步：重写compareTo方法
    //按照年龄进行比较，只需要在方法中让this.age和o.age相减就可以。
    /*
    原理：
    在往TreeSet集合中添加元素时，add方法底层会调用compareTo方法，根据该方法的
    结果是正数、负数、还是零，决定元素放在后面、前面还是不存。
    */
    @Override
    public int compareTo(Student o) {
        //this：表示将要添加进去的Student对象
        //o: 表示集合中已有的Student对象
        return this.age-o.age;
    }
}
```

此时，再运行测试类，结果如下

```java
Student{name='至尊宝', age=20, height=169.6}
Student{name='紫霞', age=20, height=169.8}
Student{name='蜘蛛精', age=23, height=169.6}
Student{name='牛魔王', age=48, height=169.6}
```



- **排序方式2：**接下来演示第二种排序方式

```java
//创建TreeSet集合时，传递比较器对象排序
/*
原理：当调用add方法时，底层会先用比较器，根据Comparator的compare方是正数、负数、还是零，决定谁在后，谁在前，谁不存。
*/
//下面代码中是按照学生的年龄升序排序
Set<Student> students = new TreeSet<>(new Comparator<Student>{
    @Override
    public int compare(Student o1, Student o2){
        //需求：按照学生的身高排序
        return Double.compare(o1,o2); 
    }
});

//创建4个Student对象
Student s1 = new Student("至尊宝",20, 169.6);
Student s2 = new Student("紫霞",23, 169.8);
Student s3 = new Student("蜘蛛精",23, 169.6);
Student s4 = new Student("牛魔王",48, 169.6);

//添加Studnet对象到集合
students.add(s1);
students.add(s2);
students.add(s3);
students.add(s4);
System.out.println(students); 
```

### 1.6 总结Collection集合

最后，将所有的Collection集合总结一下，要求大家掌握每一种集合的特点，以及他们的体系结构。

![1666174020172](./assets/1666174020172-1667311882030.png)

好了，关于Collection集合，到这里就学习完了。

### 1.7 并发修改异常

学完Collection集合后，还有一个小问题需要给同学们补充说明一下，那就是在使用迭代器遍历集合时，可能存在并发修改异常。

我们先把这个异常用代码演示出来，再解释一下为什么会有这个异常产生

```java
List<String> list = new ArrayList<>();
list.add("王麻子");
list.add("小李子");
list.add("李爱花");
list.add("张全蛋");
list.add("晓李");
list.add("李玉刚");
System.out.println(list); // [王麻子, 小李子, 李爱花, 张全蛋, 晓李, 李玉刚]

//需求：找出集合中带"李"字的姓名，并从集合中删除
Iterator<String> it = list.iterator();
while(it.hasNext()){
    String name = it.next();
    if(name.contains("李")){
        list.remove(name);
    }
}
System.out.println(list);
```

运行上面的代码，会出现下面的异常。这就是并发修改异常

![1666174432223](./assets/1666174432223-1667311876805.png)

为什么会出现这个异常呢？那是因为迭代器遍历机制，规定迭代器遍历集合的同时，不允许集合自己去增删元素，否则就会出现这个异常。

怎么解决这个问题呢？不使用集合的删除方法，而是使用迭代器的删除方法，代码如下：

```java
List<String> list = new ArrayList<>();
list.add("王麻子");
list.add("小李子");
list.add("李爱花");
list.add("张全蛋");
list.add("晓李");
list.add("李玉刚");
System.out.println(list); // [王麻子, 小李子, 李爱花, 张全蛋, 晓李, 李玉刚]

//需求：找出集合中带"李"字的姓名，并从集合中删除
Iterator<String> it = list.iterator();
while(it.hasNext()){
    String name = it.next();
    if(name.contains("李")){
        //list.remove(name);
        it.remove(); //当前迭代器指向谁，就删除谁
    }
}
System.out.println(list);
```



## 六、Collection的其他操作

各位同学，前面我们已经把Collection家族的集合都学习完了。为了更加方便的对Collection集合进行操作，今天我们还要学习一个操作Collection集合的工具类，叫做Collections。但是Collections工具类中需要用到一个没有学过的小知识点，叫做可变参数，所以必须先学习这个前置知识可变参数，再学习Collections工具类，最后再利用这个工具类做一个综合案例。



### 2.1 可变参数

首先，我们来学习一下可变参数。关于可变参数我们首先要知道它是什么，然后要知道它的本质。搞清楚这两个问题，可变参数就算你学明白了。

> - **可变参数是一种特殊的形式参数，定义在方法、构造器的形参列表处，它可以让方法接收多个同类型的实际参数。**
>
> - **可变参数在方法内部，本质上是一个数组**

接下来，我们编写代码来演示一下

```java
public class ParamTest{
    public static void main(String[] args){
        //不传递参数，下面的nums长度则为0, 打印元素是[]
        test();	
        
        //传递3个参数，下面的nums长度为3，打印元素是[10, 20, 30]
        test(10,20,30); 
        
        //传递一个数组，下面数组长度为4，打印元素是[10,20,30,40] 
        int[] arr = new int[]{10,20,30,40}
        test(arr); 
    }
    
    public static void test(int...nums){
        //可变参数在方法内部，本质上是一个数组
        System.out.println(nums.length);
        System.out.println(Arrays.toString(nums));
        System.out.println("----------------");
    }
}
```

最后还有一些错误写法，需要让大家写代码时注意一下，不要这么写哦！！！

> - **一个形参列表中，只能有一个可变参数；否则会报错**
>
> - **一个形参列表中如果多个参数，可变参数需要写在最后；否则会报错**

![1667194652653](./assets/1667194652653.png)

![1667194696892](./assets/1667194696892.png)



### 2.2 Collections工具类

有了可变参数的基础，我们再学习Collections这个工具类就好理解了，因为这个工具类的方法中会用到可变参数。

注意Collections并不是集合，它比Collection多了一个s，一般后缀为s的类很多都是工具类。这里的Collections是用来操作Collection的工具类。它提供了一些好用的静态方法，如下

![1667195108724](./assets/1667195108724.png)

我们把这些方法用代码来演示一下：

```java
public class CollectionsTest{
    public static void main(String[] args){
        //1.public static <T> boolean addAll(Collection<? super T> c, T...e)
        List<String> names = new ArrayList<>();
        Collections.addAll(names, "张三","王五","李四", "张麻子");
        System.out.println(names);
        
        //2.public static void shuffle(List<?> list)：对集合打乱顺序
        Collections.shuffle(names);
        System.out.println(names);
        
        //3.public static <T> void short(List<T list): 对List集合排序
        List<Integer> list = new ArrayList<>();
        list.add(3);
        list.add(5);
        list.add(2);
        Collections.sort(list);
        System.out.println(list);
    }
}
```

上面我们往集合中存储的元素要么是Stirng类型，要么是Integer类型，他们本来就有一种自然顺序所以可以直接排序。但是如果我们往List集合中存储Student对象，这个时候想要对List集合进行排序自定义比较规则的。指定排序规则有两种方式，如下：

> **排序方式1：让元素实现Comparable接口，重写compareTo方法**

比如现在想要往集合中存储Studdent对象，首先需要准备一个Student类，实现Comparable接口。

```java
public class Student implements Comparable<Student>{
    private String name;
    private int age;
    private double height;
    
     //排序时：底层会自动调用此方法，this和o表示需要比较的两个对象
    @Override
    public int compareTo(Student o){
        //需求：按照年龄升序排序
        //如果返回正数：说明左边对象的年龄>右边对象的年龄
        //如果返回负数：说明左边对象的年龄<右边对象的年龄，
        //如果返回0：说明左边对象的年龄和右边对象的年龄相同
        return this.age - o.age;
    }
    
    //...getter、setter、constructor..
}
```

然后再使用`Collections.sort(list集合)`对List集合排序，如下：

```java
//3.public static <T> void short(List<T list): 对List集合排序
List<Student> students = new ArrayList<>();
students.add(new Student("蜘蛛精",23,169.7));
students.add(new Student("紫霞",22,169.8));
students.add(new Student("紫霞",22,169.8));
students.add(new Student("至尊宝",26,169.5));

/*
原理：sort方法底层会遍历students集合中的每一个元素，采用排序算法，将任意两个元素两两比较；
	每次比较时，会用一个Student对象调用compareTo方法和另一个Student对象进行比较；
	根据compareTo方法返回的结果是正数、负数，零来决定谁大，谁小，谁相等，重新排序元素的位置
	
	注意：这些都是sort方法底层自动完成的，想要完全理解，必须要懂排序算法才行；
*/
Collections.sort(students);	
System.out.println(students);
```

> **排序方式2：使用调用sort方法是，传递比较器**

```java
/*
原理：sort方法底层会遍历students集合中的每一个元素，采用排序算法，将任意两个元素两两比较；
	每次比较，会将比较的两个元素传递给Comparator比较器对象的compare方法的两个参数o1和o2,
	根据compare方法的返回结果是正数，负数，或者0来决定谁大，谁小，谁相等，重新排序元素的位置
	
	注意：这些都是sort方法底层自动完成的，不需要我们完全理解，想要理解它必须要懂排序算法才行.
*/
Collections.sort(students, new Comparator<Student>(){
    @Override
    public int compare(Student o1, Student o2){
        return o1.getAge()-o2.getAge();
    }
});	
System.out.println(students);
```



### 2.3 斗地主案例

![1667306432458](./assets/1667306432458.png)

我们先分析一下业务需求：

- 总共有54张牌，每一张牌有花色和点数两个属性、为了排序还可以再加一个序号
- 点数可以是：`“3”,"4","5","6","7","8","9","10","J","Q","K","A","2"`
- 花色可以是：`“♣”,"♠","♥","♦"`
- 斗地主时：三个玩家没人手里17张牌，剩余3张牌作为底牌

```java
第一步：为了表示每一张牌有哪些属性，首先应该新建一个扑克牌的类
第二步：启动游戏时，就应该提前准备好54张牌
第三步：接着再完全洗牌、发牌、捋牌、看牌的业务逻辑
```

> **先来完成第一步，定义一个扑克类Card**

```java
public class Card {
    private String number;
    private String color;
    // 每张牌是存在大小的。
    private int size; // 0 1 2 ....

    public Card() {
    }

    public Card(String number, String color, int size) {
        this.number = number;
        this.color = color;
        this.size = size;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    @Override
    public String toString() {
        return color + number ;
    }
}
```

> **再完成第二步，定义一个房间类，初始化房间时准备好54张牌**

```java
public class Room {
    // 必须有一副牌。
    private List<Card> allCards = new ArrayList<>();

    public Room(){
        // 1、做出54张牌，存入到集合allCards
        // a、点数：个数确定了，类型确定。
        String[] numbers = {"3","4","5","6","7","8","9","10","J","Q","K","A","2"};
        // b、花色：个数确定了，类型确定。
        String[] colors = {"♠", "♥", "♣", "♦"};
        int size = 0; // 表示每张牌的大小
        // c、遍历点数，再遍历花色，组织牌
        for (String number : numbers) {
            // number = "3"
            size++; // 1 2 ....
            for (String color : colors) {
                // 得到一张牌
                Card c = new Card(number, color, size);
                allCards.add(c); // 存入了牌
            }
        }
        // 单独存入小大王的。
        Card c1 = new Card("",  "🃏" , ++size);
        Card c2 = new Card("", "👲" , ++size);
        Collections.addAll(allCards, c1, c2);
        System.out.println("新牌：" + allCards);
    }
}
```

> **最后完成第三步，定义一个启动游戏的方法，完成洗牌、发牌、捋牌、看牌的业务逻辑**

  ```java
/**
* 游戏启动
*/
public void start() {
    // 1、洗牌： allCards
    Collections.shuffle(allCards);
    System.out.println("洗牌后：" + allCards);

    // 2、发牌，首先肯定要定义 三个玩家。 List(ArrayList)  Set(TreeSet)
    List<Card> linHuChong = new ArrayList<>();
    List<Card> jiuMoZhi = new ArrayList<>();
    List<Card> renYingYing = new ArrayList<>();
    // 正式发牌给这三个玩家，依次发出51张牌，剩余3张做为底牌。
    // allCards = [♥3, ♣10, ♣4, ♥K, ♦Q, ♣2, 🃏, ♣8, ....
    //             0     1   2   3   4   5   6 ...   % 3
    for (int i = 0; i < allCards.size() - 3; i++) {
        Card c = allCards.get(i);
        // 判断牌发给谁
        if(i % 3 == 0){
            // 请啊冲接牌
            linHuChong.add(c);
        }else if(i % 3 == 1){
            // 请啊鸠来接牌
            jiuMoZhi.add(c);
        }else if(i % 3 == 2){
            // 请盈盈接牌
            renYingYing.add(c);
        }
    }

    // 3、对3个玩家的牌进行排序
    sortCards(linHuChong);
    sortCards(jiuMoZhi);
    sortCards(renYingYing);
    // 4、看牌
    System.out.println("啊冲：" + linHuChong);
    System.out.println("啊鸠：" + jiuMoZhi);
    System.out.println("盈盈：" + renYingYing);
    List<Card> lastThreeCards = allCards.subList(allCards.size() - 3, allCards.size()); // 51 52 53
    System.out.println("底牌：" + lastThreeCards);
    jiuMoZhi.addAll(lastThreeCards);
    sortCards(jiuMoZhi);
    System.out.println("啊鸠抢到地主后：" + jiuMoZhi);
}

/**
     * 集中进行排序
     * @param cards
     */
private void sortCards(List<Card> cards) {
    Collections.sort(cards, new Comparator<Card>() {
        @Override
        public int compare(Card o1, Card o2) {
            // return o1.getSize() - o2.getSize(); // 升序排序
            return o2.getSize() - o1.getSize(); // 降序排序
        }
    });
}
  ```

不要忘记了写测试类了，

```java
public class GameDemo {
    public static void main(String[] args) {
        //  1、牌类。
        //  2、房间
        Room m = new Room();
        //  3、启动游戏
        m.start();
    }
}
```



## 七、Map集合

### 3.1 Map概述体系

各位同学，前面我们已经把单列集合学习完了，接下来我们要学习的是双列集合。首先我们还是先认识一下什么是双列集合。

所谓双列集合，就是说集合中的元素是一对一对的。Map集合中的每一个元素是以`key=value`的形式存在的，一个`key=value`就称之为一个键值对，而且在Java中有一个类叫Entry类，Entry的对象用来表示键值对对象。

所有的Map集合有如下的特点：**键不能重复，值可以重复，每一个键只能找到自己对应的值。**

![1667308368751](./assets/1667308368751.png)

下面我们先写一个Map集合，保存几个键值对，体验一下Map集合的特点

```java
public class MapTest1 {
    public static void main(String[] args) {
        // Map<String, Integer> map = new HashMap<>(); // 一行经典代码。 按照键 无序，不重复，无索引。
        Map<String, Integer> map = new LinkedHashMap<>(); // 有序，不重复，无索引。
        map.put("手表", 100);
        map.put("手表", 220); // 后面重复的数据会覆盖前面的数据（键）
        map.put("手机", 2);
        map.put("Java", 2);
        map.put(null, null);
        System.out.println(map);

        Map<Integer, String> map1 = new TreeMap<>(); // 可排序，不重复，无索引
        map1.put(23, "Java");
        map1.put(23, "MySQL");
        map1.put(19, "李四");
        map1.put(20, "王五");
        System.out.println(map1);
    }
}
```

Map集合也有很多种，在Java中使用不同的类来表示的，每一种Map集合其键的特点是有些差异的，值是键的一个附属值，所以我们只关注键的特点就可以了。

![1667308506610](./assets/1667308506610.png)

关于Map集合是什么，以及Map集合的体系我们先了解到这里，接下来就具体学习一下Map集合的通用方法。



### 3.2 Map集合的常用方法

各位同学，上节课我们已经认识了Map集合，接下来我们学习一下Map集合提供了那些方法供我们使用。由于Map是所有双列集合的父接口，所以我们只需要学习Map接口中每一个方法是什么含义，那么所有的Map集合方法你就都会用了。

![1667308854001](./assets/1667308854001.png)

```java
public class MapTest2 {
    public static void main(String[] args) {
        // 1.添加元素: 无序，不重复，无索引。
        Map<String, Integer> map = new HashMap<>();
        map.put("手表", 100);
        map.put("手表", 220);
        map.put("手机", 2);
        map.put("Java", 2);
        map.put(null, null);
        System.out.println(map);
        // map = {null=null, 手表=220, Java=2, 手机=2}

        // 2.public int size():获取集合的大小
        System.out.println(map.size());

        // 3、public void clear():清空集合
        //map.clear();
        //System.out.println(map);

        // 4.public boolean isEmpty(): 判断集合是否为空，为空返回true ,反之！
        System.out.println(map.isEmpty());

        // 5.public V get(Object key)：根据键获取对应值
        int v1 = map.get("手表");
        System.out.println(v1);
        System.out.println(map.get("手机")); // 2
        System.out.println(map.get("张三")); // null

        // 6. public V remove(Object key)：根据键删除整个元素(删除键会返回键的值)
        System.out.println(map.remove("手表"));
        System.out.println(map);

        // 7.public  boolean containsKey(Object key): 判断是否包含某个键 ，包含返回true ,反之
        System.out.println(map.containsKey("手表")); // false
        System.out.println(map.containsKey("手机")); // true
        System.out.println(map.containsKey("java")); // false
        System.out.println(map.containsKey("Java")); // true

        // 8.public boolean containsValue(Object value): 判断是否包含某个值。
        System.out.println(map.containsValue(2)); // true
        System.out.println(map.containsValue("2")); // false

        // 9.public Set<K> keySet(): 获取Map集合的全部键。
        Set<String> keys = map.keySet();
        System.out.println(keys);

        // 10.public Collection<V> values(); 获取Map集合的全部值。
        Collection<Integer> values = map.values();
        System.out.println(values);

        // 11.把其他Map集合的数据倒入到自己集合中来。(拓展)
        Map<String, Integer> map1 = new HashMap<>();
        map1.put("java1",  10);
        map1.put("java2",  20);
        Map<String, Integer> map2 = new HashMap<>();
        map2.put("java3",  10);
        map2.put("java2",  222);
        map1.putAll(map2); // putAll：把map2集合中的元素全部倒入一份到map1集合中去。
        System.out.println(map1);
        System.out.println(map2);
    }
}
```

### 3.3 Map集合遍历方式1

Map集合一共有三种遍历方式，我们先来学习第一种，他需要用到下面的两个方法

![1667308962740](./assets/1667308962740.png)

```java
/**
 *  目标：掌握Map集合的遍历方式1：键找值
 */
public class MapTest1 {
    public static void main(String[] args) {
        // 准备一个Map集合。
        Map<String, Double> map = new HashMap<>();
        map.put("蜘蛛精", 162.5);
        map.put("蜘蛛精", 169.8);
        map.put("紫霞", 165.8);
        map.put("至尊宝", 169.5);
        map.put("牛魔王", 183.6);
        System.out.println(map);
        // map = {蜘蛛精=169.8, 牛魔王=183.6, 至尊宝=169.5, 紫霞=165.8}

        // 1、获取Map集合的全部键
        Set<String> keys = map.keySet();
        // System.out.println(keys);
        // [蜘蛛精, 牛魔王, 至尊宝, 紫霞]
        //         key
        // 2、遍历全部的键，根据键获取其对应的值
        for (String key : keys) {
            // 根据键获取对应的值
            double value = map.get(key);
            System.out.println(key + "=====>" + value);
        }
    }
}
```

### 3.4 Map集合遍历方式2

各位同学，接下来我们学习Map集合的第二种遍历方式，这种遍历方式更加符合面向对象的思维。

前面我们给大家介绍过，Map集合是用来存储键值对的，而每一个键值对实际上是一个Entry对象。

**这里Map集合的第二种方式，是直接获取每一个Entry对象，把Entry存储扫Set集合中去，再通过Entry对象获取键和值。**

![1667309587178](./assets/1667309587178.png)

```java
/**
 * 目标：掌握Map集合的第二种遍历方式：键值对。
 */
public class MapTest2 {
    public static void main(String[] args) {
        Map<String, Double> map = new HashMap<>();
        map.put("蜘蛛精", 169.8);
        map.put("紫霞", 165.8);
        map.put("至尊宝", 169.5);
        map.put("牛魔王", 183.6);
        System.out.println(map);
        // map = {蜘蛛精=169.8, 牛魔王=183.6, 至尊宝=169.5, 紫霞=165.8}
        // entries = [(蜘蛛精=169.8), (牛魔王=183.6), (至尊宝=169.5), (紫霞=165.8)]
        // entry = (蜘蛛精=169.8)
        // entry = (牛魔王=183.6)
        // ...
		
        // 1、调用Map集合提供entrySet方法，把Map集合转换成键值对类型的Set集合
        Set<Map.Entry<String, Double>> entries = map.entrySet();
        for (Map.Entry<String, Double> entry : entries) {
            String key = entry.getKey();
            double value = entry.getValue();
            System.out.println(key + "---->" + value);
        }
    }
}
```



### 3.5 Map集合遍历方式3

Map集合的第三种遍历方式，需要用到下面的一个方法forEach，而这个方法是JDK8版本以后才有的。调用起来非常简单，最好是结合的lambda表达式一起使用。

![1667309230571](./assets/1667309230571.png)

```java
/**
 * 目标：掌握Map集合的第二种遍历方式：键值对。
 */
public class MapTest3 {
    public static void main(String[] args) {
        Map<String, Double> map = new HashMap<>();
        map.put("蜘蛛精", 169.8);
        map.put("紫霞", 165.8);
        map.put("至尊宝", 169.5);
        map.put("牛魔王", 183.6);
        System.out.println(map);
        // map = {蜘蛛精=169.8, 牛魔王=183.6, 至尊宝=169.5, 紫霞=165.8}


		//遍历map集合，传递匿名内部类
        map.forEach(new BiConsumer<String, Double>() {
            @Override
            public void accept(String k, Double v) {
                System.out.println(k + "---->" + v);
            }
        });
		//遍历map集合，传递Lambda表达式
        map.forEach(( k,  v) -> {
            System.out.println(k + "---->" + v);
        });
    }
}
```



### 3.6 Map集合案例

学习完Map集合的基本用法之后，接下来我们做一个综合案例，将Map集合运用一下。

![1667311182716](./assets/1667311182716.png)

先分析需求，再考虑怎么用代码实现

```java
1.首先可以将80个学生选择的景点放到一个集合中去（也就是说，集合中的元素是80个任意的ABCD元素）
2.准备一个Map集合用来存储景点，以及景点被选择的次数
3.遍历80个学生选择景点的集合，得到每一个景点，判断Map集合中是否包含该景点
	如果不包含，则存储"景点=1"
    如果包含，则存获取该景点原先的值，再存储"景点=原来的值+1"; 此时新值会覆盖旧值
```

```java
/**
 * 目标：完成Map集合的案例：统计投票人数。
 */
public class MapDemo4 {
    public static void main(String[] args) {
        // 1、把80个学生选择的景点数据拿到程序中来。
        List<String> data = new ArrayList<>();
        String[] selects = {"A", "B", "C", "D"};
        Random r = new Random();
        for (int i = 1; i <= 80; i++) {
            // 每次模拟一个学生选择一个景点，存入到集合中去。
            int index = r.nextInt(4); // 0 1 2 3
            data.add(selects[index]);
        }
        System.out.println(data);

        // 2、开始统计每个景点的投票人数
        // 准备一个Map集合用于统计最终的结果
        Map<String, Integer> result = new HashMap<>();

        // 3、开始遍历80个景点数据
        for (String s : data) {
            // 问问Map集合中是否存在该景点
            if(result.containsKey(s)){
                // 说明这个景点之前统计过。其值+1. 存入到Map集合中去
                result.put(s, result.get(s) + 1);
            }else {
                // 说明这个景点是第一次统计，存入"景点=1"
                result.put(s, 1);
            }
        }
        System.out.println(result);
    }
}
```


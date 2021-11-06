### 首先明确几个概念：

**EC**：_函数执行环境（或执行上下文），Execution Context_  
**ECS**：_执行环境栈，Execution Context Stack_  
**VO**：_变量对象，Variable Object_  
**AO**：_活动对象，Active Object_  
**scope chain**：_作用域链_

### EC（执行上下文）

> 每次当控制器转到 ECMAScript 可执行代码的时候，就会进入到一个执行上下文。

那什么是可执行代码呢？

### 可执行代码的类型

**1、全局代码（Global code）**

> 这种类型的代码是在"程序"级处理的：例如加载外部的 js 文件或者本地""标签内的代码。全局代码不包括任何 function 体内的代码。 这个是默认的代码运行环境，一旦代码被载入，引擎最先进入的就是这个环境。

**2、函数代码（Function code）**

> 任何一个函数体内的代码，但是需要注意的是，具体的函数体内的代码是不包括内部函数的代码。

**3、Eval 代码（Eval code）**

> eval 内部的代码

### ECS（执行环境栈）

我们用 MDN 上的一个例子来引入函数执行栈的概念

```javascript
function foo(i) {
    if (i < 0) return;
    console.log('begin:' + i);
    foo(i - 1);
    console.log('end:' + i);
}
foo(2);

// 输出:

// begin:2
// begin:1
// begin:0
// end:0
// end:1
// end:2

```

这里先不关心执行结果。磨刀不误砍柴功，先了解一下函数执行上下文堆栈的概念。相信弄明白了下面的概念，一切也就水落石出了。

我们都知道，浏览器中的 JS 解释器被实现为单线程，这也就意味着同一时间只能发生一件事情，其他的行为或事件将会被放在叫做执行栈里面排队。下面的图是单线程栈的抽象视图：

![](https://user-gold-cdn.xitu.io/2018/3/20/162414069e36ed2b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

当浏览器首次载入你的脚本，它将默认进入全局执行上下文。如果，你在你的全局代码中调用一个函数，你程序的时序将进入被调用的函数，并创建一个新的执行上下文，并将新创建的上下文压入执行栈的顶部。

如果你调用当前函数内部的其他函数，相同的事情会在此上演。代码的执行流程进入内部函数，创建一个新的执行上下文并把它压入执行栈的顶部。浏览器总会执行位于栈顶的执行上下文，一旦当前上下文函数执行结束，它将被从栈顶弹出，并将上下文控制权交给当前的栈。这样，堆栈中的上下文就会被依次执行并且弹出堆栈，直到回到全局的上下文。请看下面一个例子：

```javascript
(function goo(i){
   if(i === 3){
     return
  }else{
    goo(i++)
  }
}(0));

```

> 上述 goo 被声明后，通过()运算符强制直接运行了。函数代码就是调用了其自身 3 次，每次是局部变量 i 增加 1。每次 goo 函数被自身调用时，就会有一个新的执行上下文被创建。每当一个上下文执行完毕，该上下文就被弹出堆栈，回到上一个上下文，直到再次回到全局上下文。整个过程抽象如下图:

![](https://user-gold-cdn.xitu.io/2018/3/20/162414069e64fc8f?imageslim)

**由此可见 ，对于执行上下文这个抽象的概念，可以归纳为以下几点：**

1、单线程 2、同步执行 3、唯一的一个全局上下文 4、函数的执行上下文的个数没有限制 5、每次某个函数被调用，就会有个新的执行上下文为其创建，即使是调用的自身函数，也是如此

**看到这里，想必大家都已经深谙上述例子输出结果的原因了，这里我大概绘了一个流程图来帮助理解 foo:**

![](https://user-gold-cdn.xitu.io/2018/3/20/162414069ee50a82?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### VO（变量对象）/AO（活动对象）

> 这里为什么要用一个/呢？按照字面理解，AO 其实就是被激活的 VO，两个其实是一个东西。下面引用知乎上的一段话，帮助理解一下。[原文链接](https://www.zhihu.com/question/36393048/answer/71869653)

**变量对象（Variable object）:** 是说 JS 的执行上下文中都有个对象用来存放执行上下文中可被访问但是不能被 delete 的函数标示符、形参、变量声明等。它们会被挂在这个对象上，对象的属性对应它们的名字对象属性的值对应它们的值但这个对象是规范上或者说是引擎实现上的不可在 JS 环境中访问到活动对象。

**激活对象（Activation object）:** 有了变量对象存每个上下文中的东西，但是它什么时候能被访问到呢？就是每进入一个执行上下文时，这个执行上下文儿中的变量对象就被激活，也就是该上下文中的函数标示符、形参、变量声明等就可以被访问到了。

### EC 建立的细节

**1、创建阶段【当函数被调用，但未执行任何其内部代码之前】**

> 1、 创建作用域链（Scope Chain） 2、 创建变量，函数和参数。 3、 求”this“的值

**2、执行阶段**

> 初始化变量的值和函数的引用，解释/执行代码。

---

我们可以将每个执行上下文抽象为一个对象，这个对象具有三个属性

```javascript
ECObj: {
    scopeChain: { /* 变量对象（variableObject）+ 所有父级执行上下文的变量对象*/ },
    variableObject: { /*函数 arguments/参数，内部变量和函数声明 */ },
    this: {}
}

```

### 解释器执行代码的伪逻辑

**1、查找调用函数的代码。**

**2、执行代码之前，先进入创建上下文阶段：**

```javascript
第一步：初始化作用域链
第二步：创建变量对象：
    a.创建arguments对象，检查上下文，初始化参数名称和值并创建引用的复制。
    b.扫描上下文的函数声明（而非函数表达式）：
        1、为发现的每一个函数，在变量对象上创建一个属性，确切的说是函数的名字，其有一个指向函数在内存中的引用。
        2、如果函数的名字已经存在，引用指针将被重写。
    c.扫描上下文的变量声明：
        1、为发现的每个变量声明，在变量对象上创建一个属性，就是变量的名字，并且将变量的值初始化为undefined
        2、如果变量的名字已经在变量对象里存在，将不会进行任何操作并继续扫描。
第三步：求出上下文内部this的值。

```

**3、激活/代码执行阶段：**

> 在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值。

### VO --- 对应上述第二个阶段

function foo(i){ var a = 'hello' var b = function(){} function c(){} } foo(22)

//当我们调用 foo(22)时，整个创建阶段是下面这样的: ECObj = { scopChain： {...}, variableObject: { arguments: { 0: 22, length: 1 }, i: 22, c: pointer to function c() a: undefined, b: undefined }, this: { ... } }

正如我们看到的，在上下文创建阶段，VO 的初始化过程如下（**该过程是有先后顺序的：函数的形参==>>函数声明==>>变量声明**）：

- **函数的形参**（当进入函数执行上下文时） —— 变量对象的一个属性，其属性名就是形参的名字，其值就是实参的值；对于没有传递的参数，其值为 undefined

- **函数声明**（FunctionDeclaration, FD） —— 变量对象的一个属性，其属性名和值都是函数对象创建出来的；如果变量对象已经包含了相同名字的属性，则替换它的值

- **变量声明**（var，VariableDeclaration） —— 变量对象的一个属性，其属性名即为变量名，其值为 undefined;如果变量名和已经声明的函数名或者函数的参数名相同，则不会影响已经存在的属性。

对于函数的形参没有什么可说的，主要看一下函数的声明以及变量的声明两个部分: **1、如何理解函数声明过程中如果变量对象已经包含了相同名字的属性，则替换它的值这句话？** 看如下这段代码：

```javascript
function foo1(a){
    console.log(a)
    function a(){}
}
foo1(20)//'function a(){}'

```

根据上面的介绍，我们知道 VO 创建过程中，函数形参的优先级是高于函数的声明的，结果是函数体内部声明的 function a(){}覆盖了函数形参 a 的声明，因此最后输出 a 是一个 function。 **2、如何理解变量声明过程中如果变量名和已经声明的函数名或者函数的参数名相同，则不会影响已经存在的属性这句话？**

```javascript
//情景一：与参数名相同
function foo2(a){
    console.log(a)
    var a = 10
}
foo2(20) //'20'

//情景二：与函数名相同
function foo2(){
    console.log(a)
    var a = 10
    function a(){}
}
foo2() //'function a(){}'

```

下面是几个比较有趣的例子，当做加餐小菜，大家细细品味。这里给出一句话当做参考：

> 函数声明比变量优先级要高，并且定义过程不会被变量覆盖，除非是赋值

```javascript
function foo3(a){
    var a = 10
    function a(){}
    console.log(a)
}
foo3(20) //'10'

function foo3(a){
    var a
    function a(){}
    console.log(a)
}
foo3(20) //'function a(){}'

```

### AO --- 对应第三个阶段

正如我们看到的，创建的过程仅负责处理定义属性的名字，而并不为他们指派具体的值，当然还有对形参/实参的处理。一旦创建阶段完成，执行流进入函数并且激活/代码执行阶段，看下函数执行完成后的样子：

```javascript
ECObj = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: 'hello',
        b: pointer to function privateB()
    },
    this: { ... }
}

```

### 提升（Hoisting）

对于下面的代码，相信很多人都能一眼看出输出结果，但是却很少有人能给出为什么会产生这种输出结果的解释。

```javascript
(function() {
    console.log(typeof foo); // 函数指针
    console.log(typeof bar); // undefined

    var foo = 'hello',
        bar = function() {
            return 'world';
        };

    function foo() {
        return 'hello';
    }
}());

```

**1、为什么我们能在 foo 声明之前访问它？** 回想在 VO 的创建阶段，我们知道函数在该阶段就已经被创建在变量对象中。所以在函数开始执行之前，foo 已经被定义了。 **2、foo 被声明了两次，为什么 foo 显示为函数而不是 undefined 或字符串？** 我们知道，在创建阶段，函数声明是优先于变量被创建的。而且在变量的创建过程中，如果发现 VO 中已经存在相同名称的属性，则不会影响已经存在的属性。因此，对 foo()函数的引用首先被创建在活动对象里，并且当我们解释到 var foo 时，我们看见 foo 属性名已经存在，所以代码什么都不做并继续执行。 **3、为什么 bar 的值是 undefined？** bar 采用的是函数表达式的方式来定义的，所以 bar 实际上是一个变量，但变量的值是函数，并且我们知道变量在创建阶段被创建但他们被初始化为 undefined，这也是为什么函数表达式不会被提升的原因。

### 总结：

1、EC 分为两个阶段，创建执行上下文和执行代码。 2、每个 EC 可以抽象为一个对象，这个对象具有三个属性，分别为：作用域链 Scope，VO|AO（AO，VO 只能有一个）以及 this。 3、函数 EC 中的 AO 在进入函数 EC 时，确定了 Arguments 对象的属性；在执行函数 EC 时，其它变量属性具体化。 4、EC 创建的过程是由先后顺序的：参数声明  >函数声明  >变量声明。

### 参考

[javascript 执行环境，变量对象，作用域链](https://segmentfault.com/a/1190000000533094)

[What is the Execution Context & Stack in JavaScript?](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)

[函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions#%E9%97%AD%E5%8C%85%28Closures%29)

本文内容转载自 https://segmentfault.com/a/1190000009041008#articleHeader3

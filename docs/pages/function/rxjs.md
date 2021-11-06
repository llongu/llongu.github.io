```javascript
var Rx = require('rxjs/Rx');

 var button = document.querySelector('button');
 Rx.Observable.fromEvent(button, 'click')
   .throttleTime(1000) 节流
   .scan(count => count + 1, 0) 扫描计算 0为参数
   .subscribe(count => console.log(`Clicked ${count} times`));订阅 执行

Observables 可观察对象 是多个值的惰性推送集合。
 var observable = Rx.Observable.create(function (observer) {
   observer.next(1);
   observer.next(2);
   observer.next(3);
   setTimeout(() => {
     observer.next(4);
     observer.complete();
   }, 1000);
 });
 console.log('just before subscribe');
 observable.subscribe({subscribe三个方法可调用
   next: x => console.log('got value ' + x),
   error: err => console.error('something wrong occurred: ' + err),
   complete: () => console.log('done'),
 });
 console.log('just after subscribe');依次执行justbefor 1 2 3 justafter 4 done



 var observable = Rx.Observable.create(function subscribe (observer) {
    追踪 interval 资源
   var intervalID = setInterval(() => {
     observer.next('hi');
   }, 1000);

    提供取消和清理 interval 资源的方法
    return function unsubscribe () { 也可以自定义 unsubscribe
      clearInterval(intervalID);
      alert(1)
    };
 });subscription 表示进行中的执行，它有最小化的 API 以允许你取消执行
 var subscription = observable.subscribe({ next: x => { console.log(x) } });
 setTimeout(() => {
   subscription.unsubscribe();
 }, 1000);


 var observable1 = Rx.Observable.interval(400);
 var observable2 = Rx.Observable.interval(300);

 var subscription = observable1.subscribe(x => console.log('first: ' + x));
 var childSubscription = observable2.subscribe(x => console.log('second: ' + x));

 subscription.add(childSubscription);

 setTimeout(() => {
    subscription 和 childSubscription 都会取消订阅
   subscription.unsubscribe();
 }, 1000);


/*
  Subject (主体)  像是 Observable，但是可以多播给多个观察者。Subject 还像是 EventEmitters，维护着多个监听器的注册表

  每个 Subject 都是观察者。 - Subject 是一个有如下方法的对象： next(v)、error(e) 和 complete() 。要给 Subject 提供新值，只要调用 next(theValue)，它会将值多播给已注册监听该 Subject 的观察者们。

  Subject 下的 subscribe 不会调用发送值的新执行。它只是将给定的观察者注册到观察者列表中，类似于其他库或语言中的 addListener 的工作方式。

  Subject 像是一个的集合，由集合来规定或要实现的 subscribe 事件，可能有多个订阅者 ，最后批量触发
*/
 var subject = new Rx.Subject();

 subject.subscribe({
   next: (v) => console.log('observerA: ' + v)
 });
 subject.subscribe({
   next: (v) => console.log('observerB: ' + v)
 });

 subject.next(1);
 subject.next(2);

 var subject = new Rx.Subject();
 subject.subscribe({
   next: (v) => console.log('observerA: ' + v)
 });
 subject.subscribe({
   next: (v) => console.log('observerB: ' + v)
 });
 var observable = Rx.Observable.from([1, 2, 3]);
 observable.subscribe(subject) Subject 将单播的 Observable 执行转换为多播

/*多播的 Observables 底层是通过使用 Subject 使得多个观察者

  相当于 multicast 整合 Subject ，返回 一个 Observable 对象,该对象扩展了subject 多播的能力。

  Observable 本身只支持单播，即支持一个 subscribe

  */
 var source = Rx.Observable.from([1, 2, 3]);
 var subject = new Rx.Subject();
 var multicasted = source.multicast(subject);

  在底层使用了 `subject.subscribe({...})`:
 multicasted.subscribe({
   next: (v) => console.log('observerA: ' + v)
 });
 multicasted.subscribe({
   next: (v) => console.log('observerB: ' + v)
 });

 connect 方法在底层执行了 source.subscribe(subject)，所以它返回的是 Subscription，你可以取消订阅以取消共享的 Observable 执行。
 multicasted.connect()


不想显式调用 connect()   。自动调用connect ，refCount() 方法(引用计数) 这个方法返回 Observable，这个 Observable 会追踪有多少个订阅者。当订阅者的数量从0变成1，它会调用 connect() 以开启共享的执行。当订阅者数量从1变成0时，它会完全取消订阅，停止进一步的执行。
 var source = Rx.Observable.interval(500);
 var subject = new Rx.Subject();
 var refCounted = source.multicast(subject).refCount();ref 调用connect， connect 方法在底层执行了 source.subscribe(subject)，所以它返回的是 Subscription，你可以取消
 var subscription1, subscription2, subscriptionConnect;

  这里其实调用了 `connect()`，
  因为 `refCounted` 有了第一个订阅者
 console.log('observerA subscribed');
 subscription1 = refCounted.subscribe({
   next: (v) => console.log('observerA: ' + v)
 });

 setTimeout(() => {
   console.log('observerB subscribed');
   subscription2 = refCounted.subscribe({
     next: (v) => console.log('observerB: ' + v)
   });
 }, 600);

 setTimeout(() => {
   console.log('observerA unsubscribed');
   subscription1.unsubscribe();subscription1 返回的是 Subscription
 }, 1200);

  这里共享的 Observable 执行会停止，
  因为此后 `refCounted` 将不再有订阅者
 setTimeout(() => {
   console.log('observerB unsubscribed');
   subscription2.unsubscribe();
 }, 2000);
/*
  observerA subscribed
  observerA: 0
  observerB subscribed 延迟600执行
  observerA: 1
  observerB: 1
  observerA unsubscribed 取消订阅
  observerB: 2 延迟1200执行
  observerB unsubscribed 取消订阅
*/


 BehaviorSubject  用来表示“随时间推移的值”。举例来说，生日的流是一个 Subject，但年龄的流应该是一个 BehaviorSubject
 var subject = new Rx.BehaviorSubject(0);  0是初始值

 subject.subscribe({当第一个观察者订阅时会得到 0
   next: (v) => console.log('observerA: ' + v)
 });

 subject.next(1);
 subject.next(2);

 subject.subscribe({第二个观察者订阅时会得到值2，尽管它是在值2发送之后订阅的
   next: (v) => console.log('observerB: ' + v)
 });

 subject.next(3);

ReplaySubject 类似于 BehaviorSubject，它可以发送旧值给新的订阅者 ,记录 Observable 执行的一部分,你可以指定回放多少个值：
 var subject = new Rx.ReplaySubject(3);  为新的订阅者缓冲3个值

 subject.subscribe({
   next: (v) => console.log('observerA: ' + v)
 });

 subject.next(1);
 subject.next(2);
 subject.next(3);
 subject.next(4);

 subject.subscribe({
   next: (v) => console.log('observerB: ' + v)
 });

 subject.next(5);
/*
observerA: 1
observerA: 2
observerA: 3
observerA: 4

回放3个值
observerB: 2
observerB: 3
observerB: 4

observerA: 5
observerB: 5
*/
缓冲数量，你还可以指定 window time (以毫秒为单位)来确定多久之前的值可以记录

AsyncSubject 只有当 Observable 执行完成时(执行 complete())，它才会将执行的最后一个值发送给观察者。
 var subject = new Rx.AsyncSubject();

 subject.subscribe({
   next: (v) => console.log('observerA: ' + v)
 });

 subject.next(1);
 subject.next(2);
 subject.next(3);
 subject.next(4);

 subject.subscribe({
   next: (v) => console.log('observerB: ' + v)
 });

 subject.next(5);

 subject.complete();必须执行 complete 将执行的最后一个值发送给观察者
/*
  observerA: 5
  observerB: 5

*/

/*
  Operators (操作符) 允许复杂的异步代码以声明式的方式进行轻松组合的基础代码单元

  操作符是 Observable 类型上的方法，比如 .map(...)、.filter(...)、.merge(...)，等等。当操作符被调用时，它们不会改变已经存在的 Observable 实例。

  相反，它们返回一个新的 Observable ，它的 subscription 逻辑基于第一个 Observable 。
*/
 function multiplyByTen (input) {
   var output = Rx.Observable.create(function subscribe (observer) {
     input.subscribe({
       next: (v) => observer.next(10 * v),
       error: (err) => observer.error(err),
       complete: () => observer.complete()
     });
   });
   return output;
 }

 var input = Rx.Observable.from([1, 2, 3, 4]);
 var output = multiplyByTen(input);
 1，2，3，4 操作符是函数，它基于当前的 Observable 创建一个新的 Observable。这是一个无副作用的操作：前面的 Observable 保持不变。
 input.subscribe(x => console.log(x));

/*
  10，20，30，40
  output Observable 接收传入的 input Observable，input Observable 再output内部执行订阅功能，再返回output Observable，外部再订阅

  订阅 output 会导致 input Observable 也被订阅。我们称之为“操作符订阅链”。
  */
 output.subscribe(x => console.log(x));

/* 实例操作符 vs. 静态操作符
   实例操作符 Observable 实例上的方法 ultiplyByTen 是官方提供的实例操作符
*/
 Rx.Observable.prototype.multiplyByTen = function multiplyByTen () {
   var input = this;
   return Rx.Observable.create(function subscribe (observer) {
     input.subscribe({
       next: (v) => observer.next(10 * v),
       error: (err) => observer.error(err),
       complete: () => observer.complete()
     });
   });
 }
 这里的 input Observable 不再是一个函数参数，它现在是 this 对象  x.Observable.from([1, 2, 3, 4])
 var observable = Rx.Observable.from([1, 2, 3, 4]).multiplyByTen();
 observable.subscribe(x => console.log(x));

/*
  什么是静态操作符？ - 除了实例操作符，还有静态操作符，它们是直接附加到 Observable 类上的。静态操作符在内部不使用 this 关键字，而是完全依赖于它的参数
  一个典型的静态操作符例子就是 interval 函数。它接收一个数字(非 Observable)作为参数，并生产一个 Observable 作为输出：

  var observable = Rx.Observable.interval(1000)
*/
```

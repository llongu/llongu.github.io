# promise

## 简版

```js
class myPromise {
  constructor(fn) {
    this.thenArr = [];
    this.catchArr = [];

    fn(this.reslove.bind(this), this.reject.bind(this));
  }

  reslove(data) {
    // console.log(this.thenArr);
    this.thenArr.forEach((item) => {
      item(data);
    });
  }

  reject(data) {
    // console.log(this.catchArr);
    this.catchArr.forEach((item) => {
      item(data);
    });
  }

  then(fn) {
    this.thenArr.push(fn);
    return this;
  }

  catch(fn) {
    this.catchArr.push(fn);
    return this;
  }
}

var myajax = new myPromise((reslove, reject) => {
  setTimeout(() => {
    reslove("result");
  }, 0);
});

myajax
  .then((data) => {
    console.log(data);
  })
  .then(() => {
    console.log("yes1");
  })
  .catch(() => {
    console.log("no");
  })
  .then(() => {
    console.log("yes2");
  });
```

## 完整版

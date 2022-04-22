# machine 队列

```js
/*
    效果
        function machine() {
            
        }
        machine('ygy').execute() 
        // start ygy
        machine('ygy').do('eat').execute(); 
        // start ygy
        // ygy eat
        machine('ygy').wait(5).do('eat').execute();
        // start ygy
        // wait 5s（这里等待了5s）
        // ygy eat
        machine('ygy').waitFirst(5).do('eat').execute();
        // wait 5s
        // start ygy
        // ygy eat
    */

function machine(param) {
  return new machines(param);
}

function Filter(param, callback) {
  if (typeof param == "number") {
    return function () {
      callback();
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, param * 1000);
      });
    };
  }
  return callback;
}

class machines {
  constructor(param) {
    this.a = param;
    this.queue = [];
    this.queue.push(
      Filter(param, () => {
        console.log("start " + param);
      })
    );
  }

  waitFirst(param) {
    this.queue.unshift(
      Filter(param, () => {
        console.log("wait " + param + "s");
      })
    );

    return this;
  }

  do(param) {
    this.queue.push(
      Filter(param, () => {
        console.log(this.a + " " + param);
      })
    );
    return this;
  }

  wait(param) {
    this.queue.push(
      Filter(param, () => {
        console.log("wait " + param + "s");
      })
    );
    return this;
  }

  async execute() {
    while (this.queue.length) {
      await this.queue.shift()();
    }
  }
}

machine("ygy").wait(5).do("eat").execute();
```

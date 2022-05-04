# 日常开发中常用的一些功能函数

> 比如深拷贝，不想去手写或引入 loadsh，又懒得百度，就来这儿 copy 吧

## javascript

### 1. 深拷贝

```javascript
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === "object" || typeof o === "function") && o !== null;
  }

  if (!isObject(obj)) {
    throw new Error("非对象");
  }

  let isArray = Array.isArray(obj);
  let newObj = isArray ? [...obj] : { ...obj };
  Reflect.ownKeys(newObj).forEach((key) => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
  });

  return newObj;
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3,
  },
};
let newObj = deepClone(obj);
newObj.b.c = 1;
console.log(obj.b.c); // 2
```

### 2. 重命名数组对象里面的 key ，value 不变 (比如 select 后端返回的 option 并不是常规的 label value 格式)

```js
/**
     *
     * @param  {object<Array>} data  要转换数组对象
     * @param {object} opt key 重命名
     * renameKey((data ) || [], {
                    key: 'id', // 重命名属性 Key 为id
                    value: 'id',// 重命名属性 value 为id
                    title: 'name',// 重命名属性 value 为name
                    children: '_child',// 设重命名属性 children 为_child
        }),
    */
export const renameKey = (data: object[], opt: object): any[] => {
  const item: object[] = [];
  data.forEach((list: any) => {
    const newData: any = {};
    for (const i in opt) {
      if (i === "children") {
        newData[i] = list[opt[i]] ? renameKey(list[opt[i]], opt) : [];
      } else {
        newData[i] = list[opt[i]];
      }
    }
    item.push(newData);
  });
  return item;
};
```

### 3. 扁平化数据

```js
/**
 * 展开数组对象
 *  arr:原数组
 *  key ：递归名
 */
export const flatObjArr = (arr: any[], key: string): any[] => {
  const newArr: any[] = [];
  function flatObjArrLoop(arr) {
    arr.map((i: any) => {
      newArr.push(i);
      if (Array.isArray(i[key])) {
        flatObjArrLoop(i[key]);
      }
    });
  }
  Array.isArray(arr) && flatObjArrLoop(arr);
  return newArr;
};
```

### 4. 查找Tree结构目标节点 （以及父级）并返回

```js
/**
 * tragetId : 1
 * treeData :[{ value : 2,children:[{value:1,name:'child'}]}]
 */
 function findTreeNodeParent (tragetId, treeData)  {
    let traget = {};
    let parent = false;
    const findLoop = (data, parentData) => {
      for (let i = 0; i < data.length; i++) {
        if (tragetId === data[i].value) {
          // 获取父级元素
          if (parentData) {
            parent = parentData;
          }
          return { traget: data[i] };
        }
        if (Array.isArray(data[i].children)) {
          const { traget: tragets } = findLoop(data[i].children, data[i]);
          traget = tragets;
        }
      }
      return { traget, parent };
    };
    return findLoop(treeData);
  };
```

### 5. 倒计时功能 moment

```js
let tips = "";
let timer = null;
let futureTime = moment().valueOf() + 6*60*1000; //接口返回时间
let timeStamp = moment(futureTime).valueOf() - moment().valueOf();
timer = setInterval(() => {
  if (timeStamp > 0) {
    timeStamp -= 1000;
    const days = moment(futureTime).diff(moment(), "days");
    const hours = moment(futureTime).diff(moment(), "hours") % 24;
    const minutes = moment(timeStamp).minutes();
    const seconds = moment(timeStamp).seconds();

    tips = `${days ? `${days < 10 ? `0${days}天` : `${days}天`}` : ""}${
      hours ? `${hours < 10 ? `0${hours}小时` : `${hours}小时`}` : ""
    }${minutes < 10 ? `0${minutes}` : minutes}分${
      seconds < 10 ? `0${seconds}` : seconds
    }秒后开始`;
  } else {
    tips = "倒计时结束";
  }
    console.log('%c 🥃 tips: ', 'font-size:20px;background-color: #42b983;color:#fff;', tips);
}, 1000);
```

### 6. 下载文件，重命名

```js
function getBlob(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };

    xhr.send();
  });
}

function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement("a");
    const body = document.querySelector("body");

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // fix Firefox
    link.style.display = "none";
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }
}

export function DownloadFile(url, filename) {
  getBlob(url)
    .then((blob) => {
      saveAs(blob, filename);
    })
    .catch((e) => {
      window.open(url);
    });
}
```


### 7. 拖拽
```js
window.onload = function() {
  // drag处于绝对定位状态
  let drag = document.getElementById("box");
  drag.onmousedown = function(e) {
    var e = e || window.event;
    // 鼠标与拖拽元素边界的距离 = 鼠标与可视区边界的距离 - 拖拽元素与边界的距离
    let diffX = e.clientX - drag.offsetLeft;
    let diffY = e.clientY - drag.offsetTop;
    drag.onmousemove = function(e) {
      // 拖拽元素移动的距离 = 鼠标与可视区边界的距离 - 鼠标与拖拽元素边界的距离
      let left = e.clientX - diffX;
      let top = e.clientY - diffY;
      // 避免拖拽出可视区
      if (left < 0) {
        left = 0;
      } else if (left > window.innerWidth - drag.offsetWidth) {
        left = window.innerWidth - drag.offsetWidth;
      }
      if (top < 0) {
        top = 0;
      } else if (top > window.innerHeight - drag.offsetHeight) {
        top = window.innerHeight - drag.offsetHeight;
      }
      drag.style.left = left + "px";
      drag.style.top = top + "px";
    };
    drag.onmouseup = function(e) {
      this.onmousemove = null;
      this.onmouseup = null;
    };
  };
};

```

### 8. 工具函数
```js
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

function clone(target, map = new WeakMap()) {

    // 克隆原始类型
    if (!isObject(target)) {
        return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    } else {
        return cloneOtherType(target, type);
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
}

module.exports = {
    clone
};

```
## css

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

### 4. 倒计时功能 moment

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

### 5. 下载文件，重命名

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

## css

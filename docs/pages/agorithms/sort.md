# 排序算法

```js
 //把数字进行比较大或小，依次排序
    var ARR = [];
    for (var n = 0; n <= 10; n++) {
        ARR.push(parseInt(Math.random() * 999));
    };
    console.log(ARR);
```
## 冒泡排序

```js
    //冒泡排序 一层一层往上比较，不重复比较
    function mp(arr) {
        var arr = arr.concat(),
            arrLength = arr.length,
            i, j, temp;
        for (i = 0; i < arrLength; i++) {
            for (j = i + 1; j < arrLength; j++) {
                //> or <
                if (arr[i] > arr[j]) {
                    temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                }
            }
        };
        return arr;
    };

    console.time();
    console.log(mp(ARR))
    console.timeEnd();
```

## 快速排序

```js
     //快速排序 进行两边归类，如：以第一个数字为中心，比中心大的放右边，递归比较
    function ks(arr) {
        if (arr.length <= 1) {
            return arr;
        };
        var arrLength = arr.length,
            small = [], big = [], pivot = arr[0],
            i;
        for (i = 1; i < arrLength; i++) {
            if (arr[i] > pivot) {
                big.push(arr[i]);
            } else {
                small.push(arr[i]);
            }
        };
        arr = ks(small).concat(pivot, ks(big));
        return arr;
    };

    console.time();
    console.log(ks(ARR))
    console.timeEnd();
```

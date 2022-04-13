# 双指针
```js
  //双指针法，排除连续3个或以上相同的数字，并返回下标
    var str = "ccdddggeeecc";
    var i = 0;
    var j = 1;
    var resultIndex = [];

    while (i < str.length) {
        if (str[i] != str[j]) {
            if (j - i >= 3) {
                for (var n = i; n < j; n++) {
                    resultIndex.push(n);
                }
            };
            i = j;
        }
        j++;
    }
    console.log(resultIndex);
```
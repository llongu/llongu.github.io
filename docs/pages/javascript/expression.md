# 正则

```js
    //正则匹配转驼峰
    var tf = "ha-ddd-is";
    tf = tf.replace(/-(\w)/g, function (match, $1, $2) {
        return $1.toUpperCase();
    });
    console.log(tf);

    //千分符
    var str2 = '1234567890';
    //\B字符边界，\d数字 \D非数字，{3}3个，+表示匹配一次或多次，$表示结尾，（）表示开始与结束的位置，(?=) 表示修饰，意味着必须 匹配多次数字为3的倍数结尾
    console.log(str2.replace(/\B(?=(\d{3})+$)/g, "❥"));
    //不加+ 表示匹配字符边界以3位结尾的 
    console.log(str2.replace(/\B(?=(\d{3})$)/g, "❥"));

    var str3 = "昨天他说，我爱天安门";
    //. 表示除\n之外任何字符 这里表示以3结尾的任何字符替换为❤
    console.log(str3.replace(/.(?=.{3}$)/g, "❤"))
    //加()和+ 表示多次匹配以3为一组结尾的任何字符替换为❤ （这里❤也是一个字符）
    console.log(str3.replace(/.(?=(.{3})+$)/g, "❤"))

```
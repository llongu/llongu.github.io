# proxy 使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    //代理对象 obj，返回新对象，新对象可以获取代理对象的值
    let obj = {
      name: "longlu",
    };

    let opt = {
      get(target, property, all) {
        console.log(target, property, all);
        if (property in target) {
          return target[property];
        } else throw new ReferenceError(`${property} 属性不存在！`);
      },
    };
    const newObj = new Proxy(obj, opt);

    console.log(newObj.name); //longlu
    console.log(newObj.age); //age 属性不存在！
  </script>
  <script>
    //代理 空对象并返回新对象，监听新对象使用的节点属性并创建节点
    const Dom = new Proxy(
      {},
      {
        get(target, property) {
          //target：空 无代理对象
          console.log(target, property);
          return function (attr = {}, ...arr) {
            console.log(`-----------------------------------------------`);
            console.log(attr, arr);

            const el = document.createElement(property);
            for (let i of Object.keys(attr)) {
              el.setAttribute(i, attr[i]);
            }

            for (let i of arr) {
              console.log(i);
              if (typeof i == "string") {
                el.innerHTML += i;
              } else {
                el.appendChild(i);
                // console.log(i+`这不是一个string类型，是一个已经返回的el 节点`+typeof i+'类型')
              }
            }
            return el;
          };
        },
      }
    );

    let text = Dom.div(
      { id: "nav", class: "nav1" },
      "这是内容",
      Dom.span({ id: "span" }, "span标签"),
      Dom.a({ id: "a" }, "a标签"),
      Dom.h3({ id: "h3" }, "h3标签")
    );

    document.body.appendChild(text);

    console.log(text);
  </script>
</html>
```

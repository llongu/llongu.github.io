# createElement

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body></body>
  <script type="text/javascript">
    function createElement(nodeType, props, childrens) {
      let el = document.createElement(nodeType);
      Object.keys(props).forEach(element => {
        if (props[element]) {
          el[element] = props[element];
        }
      });
      //从里面li触发最后触发外面ul 此时ul已有所有node节点li
      console.log(childrens);
      for (let item in childrens) {
        if (typeof childrens[item] === 'string') {
          el.innerHTML += childrens[item];
        } else {
          el.appendChild(childrens[item]);
        }
      }
      return el;
    }

    var html = createElement('ul', { className: 'list', id: 'first' }, [
      createElement('li', { className: '' }, ['1', '1']),
      createElement('li', { className: '' }, ['2']),
      createElement('li', { className: '' }, ['3']),
      createElement('li', { className: '' }, ['4']),
      createElement('li', { className: '' }, ['5']),
      createElement('li', { className: '' }, [
        createElement('a', { className: '' }, ['6的子级a标签'])
      ])
    ]);
    console.log(html);
    document.body.appendChild(html);
  </script>
</html>

```
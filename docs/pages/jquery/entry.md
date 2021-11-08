jQuery 内部把 fn 这个函数暴露出去，等于 prototype。便于可以直接访问到 prototype 上的方法
\$.fn.extend 等于 jQuery.prototype.extend，extend 向 prototype 上挂载方法

```javascript
    var jQuery = function(dom) {
      jQuery.fn.init.prototype = jQuery.fn;
      return new jQuery.fn.init(dom);
    };

    jQuery.fn = jQuery.prototype = {
      init: function(dom) {
        this.dom = dom;
        console.log('init ' + dom);
      },
      fn1: function() {
        console.log('fn1');
        console.log(this.dom);
      }
    };

    jQuery('div').fn1();
    console.log(jQuery.fn);
    console.log(jQuery.prototype === jQuery.fn);
```

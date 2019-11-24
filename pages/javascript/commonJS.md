    一个文件就是一个模块，拥有单独的作用域；
    普通方式定义的变量、函数、对象都属于该模块内；
    通过require来加载模块；
    通过exports和modul.exports来暴露模块中的内容；

> ### AMD CMD 都是实现 commonJS 规范的一种

- AMD 是 RequireJS 在推广过程中对模块定义的规范化产出，推崇 **依赖前置**
- CMD 是 SeaJS 在推广过程中对模块定义的规范化产出，推崇 **依赖就近**

  > ### es6 规范

      import/export

(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{802:function(t,s,n){"use strict";n.r(s);var a=n(10),e=Object(a.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"依赖注入"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#依赖注入"}},[t._v("#")]),t._v(" 依赖注入")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//ts 原生类装饰器 依赖注入")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Pencil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("printName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'this is a pencil'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Eraser")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("printName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'this is an eraser'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Notebook")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("printName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'this is a notebook'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" dependenciesMap "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//public bind obj")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" injector "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("constructor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//传入需要注入的类，获取全局对象上绑定的值，实例化类 合并参数")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//resolve  bind obj dependenciesMap")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" dependencies "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" dependenciesMap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("constructor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//get student")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("dependencies"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//array =>  three fn")]),t._v("\n\n      dependencies "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" dependencies"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("dependency"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("dependency")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//auto new class => array")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("dependencies"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果可以使用ES6的语法，下面的代码可以合并为一行：")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// return new constructor(...dependencies);")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" mockConstructor"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("any")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//new  student")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" dependencies"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//修正 prototype")]),t._v("\n      mockConstructor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" constructor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("mockConstructor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("Inject")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("dependencies"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//利用类装饰器 把需要注入的方法绑定到全局对象")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("constructor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      dependenciesMap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("constructor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" dependencies "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//bind  Student => dependenciesMap")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" constructor\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token decorator"}},[s("span",{pre:!0,attrs:{class:"token at operator"}},[t._v("@")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Inject")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Notebook"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Pencil"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Eraser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Student")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    pencil"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Pencil\n    eraser"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Eraser\n    notebook"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Notebook\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("notebook"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Notebook"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pencil"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Pencil"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" eraser"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Eraser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("notebook "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" notebook\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pencil "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" pencil\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("eraser "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" eraser\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("notebook "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pencil"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Dependencies not provided!'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'writing...'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("draw")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("notebook "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pencil "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("eraser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Dependencies not provided!'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'drawing...'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" student "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" injector"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("student "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Student")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n  student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("notebook"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("printName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// this is a notebook")]),t._v("\n  student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pencil"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("printName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// this is a pencil")]),t._v("\n  student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("eraser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("printName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// this is an eraser")]),t._v("\n  student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("draw")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// drawing")]),t._v("\n  student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// writing")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);
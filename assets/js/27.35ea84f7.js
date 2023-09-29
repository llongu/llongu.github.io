(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{671:function(t,s,a){t.exports=a.p+"assets/img/vuepress1.d249575e.png"},672:function(t,s,a){t.exports=a.p+"assets/img/vuepress2.b01dfefc.png"},673:function(t,s,a){t.exports=a.p+"assets/img/vuepress3.18e3c9d8.png"},674:function(t,s,a){t.exports=a.p+"assets/img/vuepress4.792734a8.png"},675:function(t,s,a){t.exports=a.p+"assets/img/vuepress5.80629f89.png"},676:function(t,s,a){t.exports=a.p+"assets/img/vuepress6.90ce9069.png"},793:function(t,s,a){"use strict";a.r(s);var n=a(10),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"一、vuepress1-x-搭建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、vuepress1-x-搭建"}},[t._v("#")]),t._v(" 一、vuepress1.x 搭建")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://www.vuepress.cn/guide/getting-started.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"_1-安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装"}},[t._v("#")]),t._v(" 1. 安装")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("mkdir vuepress-starter && cd vuepress-starter")])]),t._v(" "),s("li",[s("code",[t._v("yarn init # npm init")])]),t._v(" "),s("li",[s("code",[t._v("yarn add -D vuepress # npm install -D vuepress")])]),t._v(" "),s("li",[s("code",[t._v("yarn docs:dev # npm run docs:dev")])])]),t._v(" "),s("h3",{attrs:{id:"_2-必要目录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-必要目录"}},[t._v("#")]),t._v(" 2. 必要目录")]),t._v(" "),s("ul",[s("li",[t._v("`docs/.vuepress/styles: 用于存放样式相关的文件。")]),t._v(" "),s("li",[t._v("` docs/.vuepress/styles/index.styl: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。")]),t._v(" "),s("li",[t._v("` docs/.vuepress/styles/palette.styl: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。")]),t._v(" "),s("li",[t._v("` docs/.vuepress/public: 静态资源目录。")]),t._v(" "),s("li",[t._v("` docs/.vuepress/config.js: 配置文件的入口文件，也可以是 YML 或 toml。")])]),t._v(" "),s("h3",{attrs:{id:"_3-sidebar-配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-sidebar-配置"}},[t._v("#")]),t._v(" 3. sidebar 配置")]),t._v(" "),s("p",[t._v("sidebar 作用：用于配置不同页面下展示不同的左侧导航栏")]),t._v(" "),s("blockquote",[s("p",[t._v("由于在"),s("code",[t._v("config.js")]),t._v(" 需要填写所有sidebar配置比较麻烦，所以创建一个自动引入对应pages相对目录下的sidebar 的功能文件"),s("code",[t._v("getSidebar.js")]),t._v("，这样只用把配置写在相对目录的 "),s("code",[t._v("sidebar.js")]),t._v(" 即可")])]),t._v(" "),s("ul",[s("li",[s("p",[t._v("页面相对目录下的文件  "),s("code",[t._v("pages/dir/sidebar.js")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'/pages/dir/'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("title")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'左侧导航1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/pages/dir/xxx.md'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("title")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'左侧导航2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/pages/dir/xxx.md'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),s("li",[s("p",[t._v("功能文件 "),s("code",[t._v("docs/.vuepress/getSidebar.js")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" path "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"path"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" fs "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fs"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" allSidebar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" pathName"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'../'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'pages/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" files"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("fs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("readdirSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pathName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("files"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("   \n     "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" currentPath"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pathName"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v("files"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/sidebar.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("existsSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("currentPath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" sidebar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("currentPath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n         allSidebar"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n             "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("sidebar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n             "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("allSidebar\n         "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// console.log(allSidebar)")]),t._v("\n\n module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" allSidebar\n")])])])]),t._v(" "),s("li",[s("p",[s("code",[t._v("config.js")]),t._v(" 导入")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("\n "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" sidebar"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./getSidebar'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("themeConfig")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("sidebarDepth")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n         sidebar\n     "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"二、-name-github-io-部署流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、-name-github-io-部署流程"}},[t._v("#")]),t._v(" 二、 name.github.io 部署流程")]),t._v(" "),s("h3",{attrs:{id:"_1-新建仓库-name-github-io"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-新建仓库-name-github-io"}},[t._v("#")]),t._v(" 1. 新建仓库 name.github.io")]),t._v(" "),s("p",[s("strong",[t._v("注意仓库名称 "),s("code",[t._v("name")]),t._v(" 最好是自己用户名 "),s("code",[t._v("username")]),t._v("使用 "),s("code",[t._v("username.github.io")]),t._v(" 就可访问，否则访问地址将会是 "),s("code",[t._v("https://username.github.io/name.github.io")])])]),t._v(" "),s("p",[s("img",{attrs:{src:a(671),alt:"新建仓库 name.github.io"}})]),t._v(" "),s("h3",{attrs:{id:"_2-仓库配置-access-token-secrets"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-仓库配置-access-token-secrets"}},[t._v("#")]),t._v(" 2. 仓库配置 access token /  secrets")]),t._v(" "),s("ul",[s("li",[t._v("进入个人设置 developer setting")])]),t._v(" "),s("p",[s("img",{attrs:{src:a(672),alt:"新建仓库 name.github.io"}})]),t._v(" "),s("ul",[s("li",[t._v("生成token 选择权限，复制token")])]),t._v(" "),s("p",[s("img",{attrs:{src:a(673),alt:"新建仓库 name.github.io"}})]),t._v(" "),s("p",[s("img",{attrs:{src:a(674),alt:"新建仓库 name.github.io"}})]),t._v(" "),s("ul",[s("li",[t._v("name.github.io 仓库 setting 设置 ，添加secrets，输入secrets名称 粘贴 token")])]),t._v(" "),s("p",[s("img",{attrs:{src:a(675),alt:"新建仓库 name.github.io"}})]),t._v(" "),s("h3",{attrs:{id:"_2-创建自动化工作流-push-后自动部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-创建自动化工作流-push-后自动部署"}},[t._v("#")]),t._v(" 2. 创建自动化工作流，push 后自动部署")]),t._v(" "),s("ul",[s("li",[t._v("项目根目录创建文件  "),s("code",[t._v(".github/workflows/main.yml")]),t._v("   配置："),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[t._v("    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'projectName'")]),t._v("  \n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("on")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("push")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("branches")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" master \n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("jobs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("build-and-deploy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("runs-on")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ubuntu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("latest  \n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("steps")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Checkout\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" actions/checkout@v2.3.1   \n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" \n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("persist-credentials")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n            \n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" install and build\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("run")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token scalar string"}},[t._v("        \n            npm install\n            npm run build")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Deploy\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" JamesIves/github"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("deploy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("action@4.1.5\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" \n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ACCESS_TOKEN")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" secrets.BLOG "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" //secrets令牌名称\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("BRANCH")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" gh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages   //部署分支\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("FOLDER")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" docs/.vuepress/dist  //访问目录\n")])])])])]),t._v(" "),s("h3",{attrs:{id:"_3-项目提交至master"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-项目提交至master"}},[t._v("#")]),t._v(" 3. 项目提交至master")]),t._v(" "),s("h3",{attrs:{id:"_4-仓库配置-github-pages"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-仓库配置-github-pages"}},[t._v("#")]),t._v(" 4. 仓库配置 GitHub Pages")]),t._v(" "),s("p",[s("img",{attrs:{src:a(676),alt:"新建仓库 name.github.io"}})]),t._v(" "),s("h3",{attrs:{id:"_5-等待一下-刷新-name-github-io-即可访问"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-等待一下-刷新-name-github-io-即可访问"}},[t._v("#")]),t._v(" 5. 等待一下，刷新 name.github.io 即可访问")])])}),[],!1,null,null,null);s.default=e.exports}}]);
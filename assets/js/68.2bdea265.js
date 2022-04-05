(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{515:function(a,t,v){"use strict";v.r(t);var _=v(34),s=Object(_.a)({},(function(){var a=this,t=a.$createElement,v=a._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[v("h2",{attrs:{id:"后台管理系统权限管理控制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#后台管理系统权限管理控制"}},[a._v("#")]),a._v(" 后台管理系统权限管理控制")]),a._v(" "),v("blockquote",[v("p",[a._v("后台的管理系统一般都需要权限管理控制，以此对应不同用户角色登录展示不同的功能")])]),a._v(" "),v("h3",{attrs:{id:"权限管理需要哪些功能来组合"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#权限管理需要哪些功能来组合"}},[a._v("#")]),a._v(" 权限管理需要哪些功能来组合")]),a._v(" "),v("h4",{attrs:{id:"_1-用户列表-有不同的用户才有管理需求"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-用户列表-有不同的用户才有管理需求"}},[a._v("#")]),a._v(" 1. 用户列表 (有不同的用户才有管理需求)")]),a._v(" "),v("blockquote",[v("p",[a._v("列表交互")])]),a._v(" "),v("ul",[v("li",[v("p",[a._v("添加/编辑/删除用户(账号，密码，昵称等等)")]),a._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",[v("code",[a._v(" 默认一个超级用户自动生成，不能删除，不然无法登录了\n")])])])]),a._v(" "),v("li",[v("p",[a._v("分配角色 (超管，管理员，测试人员等等，可以多选角色)")])]),a._v(" "),v("li",[v("p",[a._v("禁用启用用户")])])]),a._v(" "),v("h4",{attrs:{id:"_2-角色列表-添加用户后我们需要给每个用户对应的角色"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-角色列表-添加用户后我们需要给每个用户对应的角色"}},[a._v("#")]),a._v(" 2. 角色列表  (添加用户后我们需要给每个用户对应的角色)")]),a._v(" "),v("blockquote",[v("p",[a._v("列表交互")])]),a._v(" "),v("ul",[v("li",[v("p",[a._v("添加/删除角色")])]),a._v(" "),v("li",[v("p",[a._v("禁用启用角色")])]),a._v(" "),v("li",[v("p",[a._v("分配菜单 (展示一个树形菜单列表，勾选当前角色需要的权限菜单)")])])]),a._v(" "),v("h4",{attrs:{id:"_3-菜单列表-将我们的菜单交给后端管理-由角色列表去配置-根据用户角色登录返回不同的菜单"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-菜单列表-将我们的菜单交给后端管理-由角色列表去配置-根据用户角色登录返回不同的菜单"}},[a._v("#")]),a._v(" 3. 菜单列表  (将我们的菜单交给后端管理，由角色列表去配置，根据用户角色登录返回不同的菜单)")]),a._v(" "),v("blockquote",[v("p",[a._v("列表交互")])]),a._v(" "),v("ul",[v("li",[v("p",[a._v("添加/编辑/删除菜单")]),a._v(" "),v("p",[a._v("添加编辑内容：")]),a._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",[v("code",[a._v(" 1. 菜单名称\n\n 2. 菜单路由名称(重要:route.name 用于和接口匹配后展示)\n\n  3. 菜单图标 \n")])])])]),a._v(" "),v("li",[v("p",[a._v("拖拽菜单排序 (影响前端菜单展示顺序)")])]),a._v(" "),v("li",[v("p",[a._v("菜单显示 => 是/否")])]),a._v(" "),v("li",[v("p",[a._v("查看下级菜单 (点击跳转到下级菜单数据列表，但可复用当前列表组件进行展示，下级菜单一般拥有和顶级菜单同样的功能，注意需要限制菜单层级)")])])]),a._v(" "),v("h4",{attrs:{id:"vue-项目示例"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#vue-项目示例"}},[a._v("#")]),a._v(" vue 项目示例")]),a._v(" "),v("h3",{attrs:{id:"按钮权限"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#按钮权限"}},[a._v("#")]),a._v(" 按钮权限")]),a._v(" "),v("blockquote",[v("p",[a._v("加强对应用户的权限控制，到按钮级别，用户有菜单权限，但没有该菜单下的该按钮权限，则隐藏，否则展示")])]),a._v(" "),v("ul",[v("li",[v("p",[a._v("在菜单列表每行增加功能： 分配按钮")])]),a._v(" "),v("li",[v("p",[a._v("点击打开弹窗列表，展示交互功能 ： 添加/编辑/删除")])]),a._v(" "),v("li",[v("p",[a._v("添加编辑功能内容：")]),a._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",[v("code",[a._v("  1. 按钮匹配名称（重要：根据菜单名称前缀加按钮名称，不可重复，用于和接口匹配后展示）\n\n  2. 按钮内容名称 （可选，需要注意前端样式宽度不能写死）\n")])])])]),a._v(" "),v("li",[v("p",[a._v("按钮保存后，后端采用单独接口扁平化后返回，前端保存至本地(根据需求更新)，页面显示时获取数据匹配后展示")])])]),a._v(" "),v("h4",{attrs:{id:"vue-项目示例-2"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#vue-项目示例-2"}},[a._v("#")]),a._v(" vue 项目示例")])])}),[],!1,null,null,null);t.default=s.exports}}]);
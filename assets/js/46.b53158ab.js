(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{662:function(n,t,e){n.exports=e.p+"assets/img/q.64075bf5.png"},663:function(n,t,e){n.exports=e.p+"assets/img/b.24e71bfd.png"},783:function(n,t,e){"use strict";e.r(t);var s=e(10),a=Object(s.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[this._v("nginx常用做静态内容服务和代理服务器，直接外来请求转发给后面的应用服务器（tomcat，Django等），tomcat更多用来做一个应用容器，让javaweb app泡在里面的东西。\n\n严格意义上来讲，Apache和nginx应该叫做HTTP Server，而tomcat是一个Application Server是一个Servlet/JSO应用的容器。\n\n客户端通过HTTP Server访问服务器上存储的资源（HTML文件，图片文件等），HTTP Server是中只是把服务器上的文件如实通过HTTP协议传输给客户端。\n\n应用服务器往往是运行在HTTP Server的背后，执行应用，将动态的内容转化为静态的内容之后，通过HTTP Server分发到客户端\n\n注意：nginx只是把请求做了分发，不做处理！！！\n")])])]),n("blockquote",[n("p",[this._v("Nginx 和 Apache 的区别")])]),this._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[this._v("Apache是同步多进程模型，一个连接对应一个进程，而nginx是一步的，多个连接（万级别）可以对应一个进程。\n\nnginx轻量级，抗并发，处理静态文件好\n\nApache超稳定，对PHP支持比较检单，nginx需要配合其他后端用，处理动态请求有优势\n\n建议使用前端nginx抗并发，后端apache集群，配合起来会更好\n")])])]),n("blockquote",[n("p",[this._v("Nignx 的正向代理何反向代理")])]),this._v(" "),n("p",[n("img",{attrs:{src:e(662),alt:""}})]),this._v(" "),n("p",[n("img",{attrs:{src:e(663),alt:""}})])])}),[],!1,null,null,null);t.default=a.exports}}]);
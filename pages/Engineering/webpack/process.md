启动构建，读取参数，实例化 compiler，挂上钩子，从 entry 出发，针对每个 module 调用 loader 进行编译，之后进行 acorn 解析，生成 AST 静态语法树，再将 module 组合成 chunk 文件，经 template 编译后生成 bundle 代码

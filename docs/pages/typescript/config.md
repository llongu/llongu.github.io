```ts
{
  "compilerOptions": {
    "target": "esnext", /* 指定编译之后的版本目标: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "esnext", /* 指定要使用的模块标准: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "noImplicitAny": false, /* 是否默认禁用 any */
    "removeComments": true, /* 是否移除注释 */
    "declaration": true, /* 是否自动创建类型声明文件 */
    "strict": true, /* 启动所有类型检查 */
    "jsx": "preserve", /* 指定jsx代码用于的开发环境 */
    "importHelpers": true, /* 引入tslib里的辅助工具函数*/
    "moduleResolution": "node", /* 选择模块解析策略，有'node'和'classic'两种类型 */
    "experimentalDecorators": true, /* 启用实验性的装饰器特性 */
    "esModuleInterop": true,  /* 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性 */
    "allowSyntheticDefaultImports": true, /* 允许从没有默认导出的模块中默认导入 */
    "sourceMap": true, /* 是否生成map文件 */
    "baseUrl": ".", /* 工作根目录 */
    "types": [ /* 指定引入的类型声明文件，默认是自动引入所有声明文件，一旦指定该选项，则会禁用自动引入，改为只引入指定的类型声明文件，如果指定空数组[]则不引用任何文件 */
      "webpack-env",
      "jest"
    ],
    "paths": { /* 指定模块的路径，和 baseUrl有关联，和 webpack 中 resolve.alias 配置一样 */
      "@/*": [
        "src/*"
      ]
    },
    "lib": [ /* 译过程中需要引入的库文件的列表 */
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}
```
var sidebar=require('./getSidebar');

module.exports = {
    title: '写字の地方',
    description: 'notes',
    head:[
      ['link',{rel:'icon','href':'logo.png',with:'0.1rem',search:true}],
      ['script',{src:'/js/main.js'}],
    ],
    plugins: [['vuepress-plugin-code-copy', true]],
    theme: 'yuu',
    themeConfig: {
        yuu: {
          defaultColorTheme: 'red',
        },
        logo: 'logo.png',
        repo: 'https://github.com/llongu/llongu.github.io',

        nav: [
          {
            text: '前端学习',
            items: [
              { text: 'javaScript', link: '/pages/javascript/this' },
              { text: 'typeScript', link: '/pages/typescript/basic' },
              { text: '浏览器', link: '/pages/browser/httpCode' },
              { text: 'Html&Css', link: '/pages/Html&Css/formattingContexts' },
              { text: 'webpack', link: '/pages/webpack/process' },
              { text: 'vite', link: '/pages/vite/home' },
              { text: '微信小程序', link: '/pages/wxMini/core' },
              { text: 'jquery剖析', link: '/pages/jquery/entry' },
              { text: '函数式编程', link: '/pages/function/begin' },
              { text: '编程思想', link: '/pages/coding/aop&oop' },
              { text: 'leetcode&books', link: '/pages/leetcode&books/home' },
              { text: '单元测试', link: '/pages/unit/home' },
              { text: '常见算法', link: '/pages/agorithms/tire' },
            ]
          },
          {
            text: '常用功能解决方案',
            items: [
              { text: '大文件上传', link: '/pages/use/uploadFile.md' },
              { text: '导入导出excel', link: '/pages/use/excel.md' },
              { text: '页面水印添加', link: '/pages/use/waterMark.md' },
              { text:'uni-app 常见问题',link:'https://docs.qq.com/doc/DVU1TWU1UYXdpWnln'},
              { text:'网页office预览方案',link:'/pages/use/officeView.md'},
              { text:'网页视频播放方案',link:'/pages/use/video.md'},
              { text:'后台管理系统权限设计',link:'/pages/use/adminAuth.md'},
              { text: '项目mock', link: 'https://docs.qq.com/doc/DVUFwbFhXdWhmb1dv' },
              { text: '前端开发常用方法复制', link: '/pages/use/fn' },
            ]
          },
          {
            text: '笔记',
            items: [
              { text:'前端开发电脑环境配置',link:'/pages/notes/developConfig.md'},
              { text:'前端项目搭建sop流程' ,link:'/pages/notes/projectSop.md'},

              { text:'使用nvm 管理node版本' ,link:'/pages/notes/nvm.md'},
              { text:'verdaccio 搭建npm 环境' ,link:'/pages/notes/verdaccio.md'},
              { text:'vuepress1.x 博客搭建流程',link:'/pages/notes/vuepress1.md'},
              { text:'github 自动同步 gitee',link:'/pages/notes/githubSyncGitee.md'},
              { text:'jenkins 搭建流程',link:'https://github.com/llongu/ci-jenkins-demo'},
              { text:'使用node下载git项目到本地',link:'/pages/notes/gitDown.md'},
              { text:'Hash/对称与非对称算法',link:'/pages/notes/hash.md'},
              { text:'手写一个eslint',link:'/pages/notes/eslint.md'},

            ]
          },
          {
            text: 'npm&github',
            items: [
              {text:'cli',items:[
                { text: 'create-app-web', link: 'https://www.npmjs.com/package/create-app-web' },
                { text: 'create-app-web-lib', link: 'https://github.com/llongu/create-app-web-lib' },
              ]},
             {text:'plugin',items:[
              { text: 'floater-dom', link: 'https://www.npmjs.com/package/floater-dom' },
              { text: 'drag-text-mergeBg', link: 'https://github.com/llongu/drag-text-mergeBg' },
             ]},
             {text:'project',items:[
              { text: 'H5Game', link: '/pages/H5Game/index.md'},
             ]}
            ]
          },
          {
            text: '服务端',
            items: [
              { text: 'nginx', link: '/pages/nginx/des.md' },
              { text: 'linux', link: '/pages/linux/order.md' },
              { text: 'docker', link: '/pages/docker/' },
              { text: 'jenkins', link: '/pages/jenkins/' },
          
              { text: 'php', link: '/pages/php/base.md' },
              { text: 'java', link: '/pages/java/' }
            ]
          },
          {
            text: '工具&软件',
            items: [
              { text:'dev-sidecar 环境加速工具',link:'https://github.com/docmirror/dev-sidecar'},
              { text:'snipaste 截图工具',link:'https://www.snipaste.com/'},
              { text: '科学上网', link: 'http://kingfast.info/index.php/index/register/?yqi=63283' },
              { text: '网页占位图', link: 'https://fakeimg.pl/' },
            ]
          },
          {
            text: '工作之外',
            items: [
              { text: '产品经理', link: '/pages/pm/process.md' },
              { text: 'UI设计', link: '/pages/ui/color.md' },
              { text: '聚合类网站收集', link: '/pages/' },
              { text: '外包网站收集', link: '/pages/' },
              { text: '浏览器插件聚合', link: '/pages/' },
              { text: '薅羊毛', link: '/pages/' },
              { text: '互联网常见项目 erp crm ', link: '/pages/' },
              { text: '致富道路', link: '/pages/' },
              { text: '致富道路-炒股软件', link: '/pages/' },
            ]
          },
          
        ],
        sidebarDepth:2,
        sidebar
    },
}
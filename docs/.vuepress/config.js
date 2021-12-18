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
              { text: '浏览器', link: '/pages/browser/httpCode' },
              { text: 'javascript', link: '/pages/javascript/this' },
              { text: '函数式编程', link: '/pages/function/begin' },
              { text: 'Html&Css', link: '/pages/Html&Css/formattingContexts' },
              { text: 'webpack', link: '/pages/webpack/process' },
              { text: '单元测试', link: '/pages/test/home' },
              { text: 'jquery剖析', link: '/pages/jquery/entry' },
              { text: '编程思想', link: '/pages/coding/aop&oop' },
              { text: 'leetcode&books', link: '/pages/leetcode&books/home' },
            ]
          },
          {
            text: '常用功能解决方案',
            items: [
              { text: '大文件上传', link: '/pages/use/uploadFile.md' },
              { text: '导入导出excel', link: '/pages/use/excel.md' },
              { text:'uni-app 常见问题',link:'/pages/use/uniapp.md'},
              { text:'网页office预览方案',link:'/pages/use/officeView.md'},
              { text:'网页视频播放方案',link:'/pages/use/video.md'},
              { text:'后台管理系统权限管理',link:'/pages/use/adminAuth.md'},
            ]
          },
          {
            text: '笔记',
            items: [
              { text:'前端开发电脑环境配置',link:'/pages/notes/vuepress1.md'},
              { text:'前端项目搭建sop流程' ,link:'/pages/notes/vuepress1.md'},
              { text:'使用nvm 管理node版本' ,link:'/pages/notes/nvm.md'},
              { text:'verdaccio 搭建npm 环境' ,link:'/pages/notes/verdaccio.md'},
              { text:'vuepress1.x 博客搭建流程',link:'/pages/notes/vuepress1.md'},
              { text:'github 自动同步 gitee',link:'/pages/notes/githubSyncGitee.md'},
              { text:'jenkins 搭建流程',link:'https://github.com/llongu/ci-jenkins-demo'},
            ]
          },
          {
            text: 'npm',
            items: [
              {text:'cli',items:[
                { text: 'create-app-web', link: 'https://www.npmjs.com/package/create-app-web' },
                { text: 'create-app-web-lib', link: 'https://github.com/llongu/create-app-web-lib' },
              ]},
             {text:'plugin',items:[
              { text: 'floater-dom', link: 'https://www.npmjs.com/package/floater-dom' },
             ]},
             {text:'project',items:[
              { text: 'egg-serviec', link: 'https://github.com/llongu/llongu.github.io' },
              { text: 'bugwatch', link: 'https://github.com/llongu/llongu.github.io' },
              { text: 'H5game', link: '/pages/h5game.md'},
             ]}
            ]
          },
          {
            text: '后端&服务端',
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
            text: '生活&工具',
            items: [
              { text:'dev-sidecar 环境加速工具',link:'https://github.com/docmirror/dev-sidecar'},
              { text:'snipaste 截图工具',link:'https://www.snipaste.com/'},
           
              { text: '科学上网', link: 'http://kingfast.info/index.php/index/register/?yqi=63283' },
              
              { text: '产品经理', link: '/pages/pm/process.md' },
              { text: 'UI设计', link: '/pages/ui/color.md' },
              { text: '聚合类网站收集', link: '/pages/' },
              { text: '外包网站收集', link: '/pages/' },
              { text: '浏览器插件聚合', link: '/pages/' },
              { text: '薅羊毛', link: '/pages/' },
              { text: '互联网常见项目 erp crm 对应痛点', link: '/pages/' },
              { text: '致富道路', link: '/pages/' },
              { text: '致富道路-炒股软件', link: '/pages/' },
            ]
          },
          
        ],
        sidebarDepth:4,
        sidebar
    },
}
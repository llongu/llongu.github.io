var sidebar=require('./getSidebar');

module.exports = {
    title: '写字の地方',
    description: 'notes',
    head:[
      ['link',{rel:'icon','href':'logo.png',with:'0.1rem',search:true}]
    ],
    plugins: [['vuepress-plugin-code-copy', true]],
    theme: 'yuu',
    themeConfig: {
        logo: 'logo.png',
        repo: 'https://github.com/llongu/llongu.github.io',
        
        nav: [
          {
            text: '前端',
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
            text: '前端功能解决方案',
            items: [
              { text: '大文件上传', link: '/pages/use/uploadFile.md' },
              { text: '导入导出excel', link: '/pages/use/excel.md' },
              { text:'uni-app 常见问题',link:'/pages/use/uniapp.md'},
              { text:'网页office预览方案',link:'/pages/use/officeView.md'},
              { text:'网页视频播放方案',link:'/pages/use/video.md'},
            ]
          },
          {
            text: '笔记',
            items: [
              { text:'前端开发所需的环境配置',link:'/pages/notes/vuepress1.md'},
              { text:'前端标准项目搭建配置流程' ,link:'/pages/notes/vuepress1.md'},
              { text:'vuepress1.x 博客搭建流程',link:'/pages/notes/vuepress1.md'},
              { text:'jenkins 搭建流程',link:'/pages/notes/vuepress1.md'},
            ]
          },
          {
            text: 'npm包',
            items: [
              { text: 'create-app-web', link: 'https://github.com/llongu/llongu.github.io' },
              { text: 'create-app-web-lib', link: 'https://github.com/llongu/llongu.github.io' },
              { text: 'domMove', link: 'https://github.com/llongu/llongu.github.io' },
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
              { text: '产品经理', link: '/pages/pm/process.md' },
              { text: 'UI设计', link: '/pages/ui/color.md' },
              { text:'devsidecar 加速工具',link:'/pages/use/video.md'},
              { text: '飞机场收集', link: '/pages/' },
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
        sidebarDepth: 2,
        sidebar
    },
}
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
            text: '常见问题解决方案',
            items: [
              { text: '文件上传', link: '/pages/use/uploadFile.md' },
              { text: '导入导出excel', link: '/pages/use/excel.md' }
            ]
          },
          {
            text: '自动化工具开发',
            items: [
              { text: 'create-app-web', link: 'https://github.com/llongu/llongu.github.io' },
            ]
          },
          {
            text: '服务端',
            items: [
              { text: 'nginx', link: '/pages/nginx/des.md' },
              { text: 'linux', link: '/pages/linux/order.md' },

              { text: 'docker', link: '/pages/docker/' },
              { text: 'jenkins', link: '/pages/jenkins/' },
            ]
          },
          {
            text: '一锅端',
            items: [
              { text: '产品经理', link: '/pages/pm/process.md' },
              { text: 'UI设计', link: '/pages/ui/color.md' },
              { text: 'php', link: '/pages/php/base.md' },
              { text: 'java', link: '/pages/java/' }
            ]
          },
          {
            text: '生活类',
            items: [
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
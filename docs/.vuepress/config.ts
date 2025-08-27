import { resolve } from "path";
import { defineConfig4CustomTheme, UserPlugins } from "vuepress/config";
import { VdoingThemeConfig } from "vuepress-theme-vdoing/types";
import dayjs from "dayjs";
import { dynamicSideBar } from "./config/sidebar.js";
// const { jsSideBar } = require("./config/sidebar.js");
// import baiduCode from "./config/baiduCode"; // 百度统计hm码
import htmlModules from "./config/htmlModules"; // 自定义插入的html块

const DOMAIN_NAME = "shenshuai89.github.io/"; // 域名 (不带https)
const WEB_SITE = `http://${DOMAIN_NAME}`; // 网址

export default {
  theme: "vdoing", // 使用npm主题包

  title: "北鸟南游的博客", // 网站标题
  description: "前端开发工程师", //网站描述
  locales: {
    "/": {
      lang: "zh-CN",
      title: "北鸟南游的博客",
      description: "前端开发工程师,web前端技术博客,专注web前端学习与总结。",
    },
  },
  base: "/", //  部署时的路径 默认 /  可以使用二级地址 /base/

  // 主题配置
  themeConfig: {
    // 导航配置
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端技术",
        link: "/front/",
        items: [
          {
            text: "前端文章",
            items: [
              {
                text: "JavaScript",
                link: "/front/javascript/js/",
                items: [
                  {
                    text: "",
                    link: "/front/javascript/js/Es6新增属性Promise对象",
                  },
                  {
                    text: "",
                    link: "/front/javascript/js/Es6新增属性generator对象",
                  },
                ],
              },
              {
                text: "Nextjs",
                link: "/front/javascript/nextjs/",
              },
            ],
          },
          {
            text: "界面",
            items: [
              { text: "html", link: "/front/interface/html/" },
              { text: "css", link: "/front/interface/css/" },
            ],
          },
        ],
      },
      {
        text: "其它技术",
        link: "/other/",
        items: [
          { text: "计算机基础", link: "/other/computer/" },
          { text: "后端语言", link: "/other/backend/" },
          { text: "linux", link: "/other/linux/" },
          { text: "mysql", link: "/other/mysql/" },
          { text: "工具类", link: "/other/tool/" },
        ],
      },
      //   结尾有 / 链接到目录，没有 / 链接到页面，地址会出现一个.html
      {
        text: "专题小册",
        link: "/theme/",
        items: [
          { text: "面试相关", link: "/theme/interview/" },
          { text: "图形学入门", link: "/theme/graphics/" },
          { text: "入门算法", link: "/theme/algorithm/" },
          { text: "极客专栏", link: "/theme/geektime/" },
          { text: "慕课专栏", link: "/theme/mooc/" },
        ],
      },
      {
        text: "资源分享",
        link: "/share/",
        items: [
          { text: "电影资源", link: "/share/movie/" },
          { text: "儿童动漫", link: "/share/children/" },
          { text: "英文", link: "/share/english/" },
          { text: "棋牌益智", link: "/share/chess/" },
          { text: "两性知识", link: "/share/gender/" },
          { text: "健康知识分享", link: "/share/healthy/" },
        ],
      },
      {
        text: "关于我",
        link: "/about/",
      },
      {
        text: "归档",
        link: "/archives/",
        // items: [
        //   { text: "分类", link: "/categories/" },
        //   { text: "标签", link: "/tags/" },
        //   { text: "归档", link: "/archives/" },
        // ],
      },
    ],
    sidebarDepth: 3, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: "/assets/images/avatar.jpg", // 导航栏logo
    repo: "https://github.com/shenshuai89/newblog", // 导航栏右侧生成Github链接
    // searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: "上次更新", // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
    docsDir: "docs", // 编辑的文件夹
    // docsBranch: 'master', // 编辑的文件所在分支，默认master。 注意：如果你的分支是main则修改为main
    editLinks: true, // 启用编辑
    editLinkText: "编辑",

    //*** 以下是Vdoing主题相关配置，文档：https://doc.xugaoyi.com/pages/a20ce8/ ***//

    category: false, // 是否打开分类功能，默认true
    tag: false, // 是否打开标签功能，默认true
    // archive: false, // 是否打开归档功能，默认true
    // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

    // pageStyle: "line", // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

    // bodyBgImg: [
    // ], // body背景大图，默认无。 单张图片 String | 多张图片 Array, 多张图片时隔bodyBgImgInterval切换一张。
    // bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0.1~1.0, 默认0.5
    // bodyBgImgInterval: 15, // body多张背景图时的切换间隔, 默认15，单位s
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],
    // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状

    // updateBar: {
    //   // 最近更新栏
    //   showToArticle: false, // 显示到文章页底部，默认true
    //   moreArticle: "/archives", // “更多文章”跳转的页面，默认'/archives'
    // },
    // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
    // sidebarOpen: false, // 初始状态是否打开左侧边栏，默认true
    // pageButton: false, // 是否显示快捷翻页按钮，默认true

    // 默认外观模式（用户未在页面手动修改过模式时才生效，否则以用户设置的模式为准），可选：'auto' | 'light' | 'dark' | 'read'，默认'auto'。
    // defaultMode: 'auto',

    // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    sidebar: {
      "/front/": [
        {
          title: "JavaScript",
          children: [
            {
              title: "原生js",
              path: "/front/javascript/js/",
              children: dynamicSideBar("/front/javascript/js/"),
              // [
              //   {
              //     title: "js原型继承",
              //     path: "/front/javascript/js/js原型继承",
              //   },
              //   {
              //     title: "Es6新增属性Promise对象",
              //     path: "/front/javascript/js/Es6新增属性Promise对象",
              //   },
              //   {
              //     title: "Es6新增属性generator对象",
              //     path: "/front/javascript/js/Es6新增属性generator对象",
              //   },
              // ],
            },
            {
              title: "vue",
              path: "/front/javascript/vue/",
              children: dynamicSideBar("/front/javascript/vue/"),
            },
            {
              title: "react",
              path: "/front/javascript/react/",
              children: dynamicSideBar("/front/javascript/react/"),
            },
            {
              title: "node",
              path: "/front/javascript/node/",
              children: dynamicSideBar("/front/javascript/node/"),
            },
            {
              title: "nextjs",
              path: "/front/javascript/nextjs/",
              children: dynamicSideBar("/front/javascript/nextjs/"),
            },
            {
              title: "其它框架",
              path: "/front/other/",
              children: dynamicSideBar("/front/other/"),
            },
          ],
        },
        {
          title: "界面",
          children: [
            {
              title: "HTML",
              path: "/front/interface/html/",
              children: dynamicSideBar("/front/interface/html/"),
            },
            {
              title: "CSS",
              path: "/front/interface/css/",
              children: dynamicSideBar("/front/interface/css/"),
            },
          ],
        },
      ],
      "/other/": [
        {
          title: "后端",
          path: "/other/backend/",
          children: dynamicSideBar("/other/backend/"),
        },
        {
          title: "计算机基础",
          path: "/other/backend/",
          children: dynamicSideBar("/other/computer/"),
        },
        {
          title: "Linux",
          path: "/other/linux/",
          children: dynamicSideBar("/other/linux/"),
        },
        {
          title: "Mysql",
          path: "/other/mysql/",
          children: dynamicSideBar("/other/mysql/"),
        },
        {
          title: "开发工具",
          path: "/other/tool/",
          children: dynamicSideBar("/other/tool/"),
        },
      ],
      "/theme/": [
        {
          title: "面试",
          path: "/theme/interview/",
          children: dynamicSideBar("/theme/interview/"),
        },
        {
          title: "算法入门",
          path: "/theme/algorithm/",
          children: dynamicSideBar("/theme/algorithm/"),
        },
        {
          title: "图形学入门",
          path: "/theme/graphics/",
          children: dynamicSideBar("/theme/graphics/"),
        },
        {
          title: "极客专栏",
          path: "/theme/geektime/",
          children: dynamicSideBar("/theme/geektime/"),
        },
        {
          title: "慕课专栏",
          path: "/theme/mooc/",
          children: dynamicSideBar("/theme/mooc/"),
        },
        ...dynamicSideBar("/theme/")
        // {
        //   title: "基于云开发模式开发微信小程序",
        //   path: "/theme/基于云开发模式开发微信小程序",
        // },
      ],
      "/share/": [
        {
          title: "电影资源",
          path: "/share/movie/",
          children: dynamicSideBar("/share/movie/"),
        },
        {
          title: "儿童动漫",
          path: "/share/children/",
          children: dynamicSideBar("/share/children/"),
        },
        {
          title: "英文",
          path: "/share/english/",
          children: dynamicSideBar("/share/english/"),
        },
        ...dynamicSideBar("/share/")
      ],
      "/me/": [
        { title: "自我介绍", path: "/me/我的资料"},
        // { title: "自我介绍", children: dynamicSideBar("/me/")},
      ],
    },

    // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
    author: {
      name: "北鸟南游", // 必需
      link: "https://shenshuai89.github.io/", // 可选的
    },

    // 博主信息 (显示在首页侧边栏)
    // blogger: {
    //   avatar: "/assets/images/avatar.jpg",
    //   name: "北鸟南游",
    //   slogan: "大前端coder",
    // },

    // 社交图标 (显示于博主信息栏和页脚栏。内置图标：https://doc.xugaoyi.com/pages/a20ce8/#social)
    social: {
      // iconfontCssFile: '//at.alicdn.com/t/xxx.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库：https://www.iconfont.cn/
      icons: [
        {
          iconClass: "icon-juejin",
          title: "发邮件",
          link: "https://juejin.cn/user/1662117314561255/posts",
        },
        {
          iconClass: "icon-github",
          title: "GitHub",
          link: "https://github.com/shenshuai89",
        },
        {
          iconClass: "icon-yuque",
          title: "语雀",
          link: "https://www.yuque.com/shenshuai89/front",
        },
      ],
    },

    // 页脚信息
    footer: {
      createYear: 2018, // 博客创建年份
      copyrightInfo: "北鸟南游", // 博客版权信息、备案信息等，支持a标签或换行标签</br>
    },

    // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
    extendFrontmatter: {
      author: {
        name: "北鸟南游",
        link: "https://shenshuai89.github.io/",
      },
    },

    // 自定义hmtl(广告)模块
    htmlModules,
  },

  // 注入到页面<head>中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  head: [
    ["link", { rel: "icon", href: "/assets/images/avatar.jpg" }], //favicons，资源放在public文件夹
    [
      "meta",
      {
        name: "keywords",
        content: "前端开发工程师,web前端技术博客,专注web前端学习与总结。",
      },
    ],
    // 添加百度统计 https://tongji.baidu.com/
    [
      'script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?009ff1e3b6759ec88dff629149967382";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ],
    // ["meta", { name: "theme-color", content: "#11a8cd" }], // 移动浏览器主题颜色
    [
      "script",
      {
        // "data-ad-client": "ca-pub-7102294115613821",
        async: "async",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      },
    ], // 网站关联Google AdSense 与 html格式广告支持（你可以去掉）
  ],

  // 插件配置
  plugins: <UserPlugins>[
    [
      "sitemap", // 网站地图
      {
        hostname: WEB_SITE,
      },
    ],

    // 全文搜索。 ⚠️注意：此插件会在打开网站时多加载部分js文件用于搜索，导致初次访问网站变慢。如在意初次访问速度的话可以不使用此插件！（推荐：vuepress-plugin-thirdparty-search）
    // 'fulltext-search',

    // 可以添加第三方搜索链接的搜索框（继承原官方搜索框的配置参数）
    [
      "thirdparty-search",
      {
        thirdparty: [
          {
            title: "在MDN中搜索",
            frontUrl: "https://developer.mozilla.org/zh-CN/search?q=", // 搜索链接的前面部分
            behindUrl: "", // 搜索链接的后面部分，可选，默认 ''
          },
          {
            title: "在Runoob中搜索",
            frontUrl: "https://www.runoob.com/?s=",
          },
          {
            title: "在Vue API中搜索",
            frontUrl: "https://cn.vuejs.org/v2/api/#",
          },
          {
            title: "在Bing中搜索",
            frontUrl: "https://cn.bing.com/search?q=",
          },
          {
            title: "通过百度搜索本站的",
            frontUrl: `https://www.baidu.com/s?wd=site%3A${DOMAIN_NAME}%20`,
          },
        ],
      },
    ],

    [
      "one-click-copy", // 代码块复制按钮
      {
        copySelector: [
          'div[class*="language-"] pre',
          'div[class*="aside-code"] aside',
        ], // String or Array
        copyMessage: "复制成功", // default is 'Copy successfully and then paste it for use.'
        duration: 1000, // prompt message display time.
        showInMobile: false, // whether to display on the mobile side, default: false.
      },
    ],

    [
      "demo-block", // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
      {
        settings: {
          // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
          // cssLib: ['http://xxx'], // 在线示例中的css依赖
          // vue: 'https://fastly.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
          jsfiddle: false, // 是否显示 jsfiddle 链接
          codepen: true, // 是否显示 codepen 链接
          horizontal: false, // 是否展示为横向样式
        },
      },
    ],
    [
      "vuepress-plugin-zooming", // 放大图片
      {
        selector: ".theme-vdoing-content img:not(.no-zoom)", // 排除class是no-zoom的图片
        options: {
          bgColor: "rgba(0,0,0,0.6)",
        },
      },
    ],
    // [
    //   "vuepress-plugin-comment", // 评论
    //   {
    //     choosen: "gitalk",
    //     options: {
    //       clientID: "a6e1355287947096b88b",
    //       clientSecret: "f0e77d070fabfcd5af95bebb82b2d574d7248d71",
    //       repo: "blog-gitalk-comment", // GitHub 仓库
    //       owner: "shenshuai89", // GitHub仓库所有者
    //       admin: ["shenshuai89"], // 对仓库有写权限的人
    //       // distractionFreeMode: true,
    //       pagerDirection: "last", // 'first'正序 | 'last'倒序
    //       id: "<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>", //  页面的唯一标识,长度不能超过50
    //       title: "「评论」<%- frontmatter.title %>", // GitHub issue 的标题
    //       labels: ["Gitalk", "Comment"], // GitHub issue 的标签
    //       body: "页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>", // GitHub issue 的内容
    //     },
    //   },
    // ],
    [
      "@vuepress/last-updated", // "上次更新"时间格式
      {
        transformer: (timestamp, lang) => {
          return dayjs(timestamp).format("YYYY/MM/DD, HH:mm:ss");
        },
      },
    ],
  ],

  markdown: {
    lineNumbers: true,
    // extractHeaders: ["h2", "h3", "h4", "h5", "h6"], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },

  // 监听文件变化并重新构建
  extraWatchFiles: [".vuepress/config.ts", ".vuepress/config/htmlModules.ts"],
};

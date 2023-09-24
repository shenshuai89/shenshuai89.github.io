---
title: vite开发原生js插件
date: 2023-09-24 11:51:29
permalink: /pages/146c2f/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
> 需求：开发一个原生的js插件，可以支持vue和react以及原生的js等。这种情况下就不能依赖框架进行开发，更多需要使用原生js。目前已经是前端工程化得时代，可以利用各种开发打包工具，打包出来库插件。
> 本文就是用开发速度目前最快的vite工具。

## 创建原始项目
使用vite命令：`npm create vite@latest`
```shell
# 进行创建
npm create vite@latest
# 输入项目名称
Project name: smart-chat
# 选择基础模板
? Select a framework: » - Use arrow-keys. Return to submit.
>   Vanilla
    Vue
    React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others
# 选择JavaScript
? Select a variant: » - Use arrow-keys. Return to submit.
    TypeScript
>   JavaScript
Done. Now run:

  cd smart-chat
  npm install
  npm run dev
```
先安装依赖，运行项目：`npm run dev`，出现如下界面。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/737887/1695478454010-5589463e-e90c-457e-8a8e-d6f0258cd5c6.png#averageHue=%23fcfbf3&clientId=u468ad130-1103-4&from=paste&height=516&id=u4e850fa6&originHeight=516&originWidth=474&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23306&status=done&style=none&taskId=u8a2c1f7f-cd40-4124-8f40-adb98cdd0b5&title=&width=474)
项目初始化完成。
接下来开始进行vite的启动配置，已经build配置。
## 设置vite.config.js配置
在上一步启动时，默认端口是5173，并且没有自动打开页面。
通过vite.config.js可以进行配置，来提升开发速度。
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  // 本地运行配置，及反向代理配置
  server: {
    host: 'localhost', // 指定服务器主机名
    port: 3666, // 指定服务器端口
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
    https: false, // 是否开启 https
    cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
    proxy: { // 为开发服务器配置自定义代理规则
      '/api': {
        target: "https://xxxx.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api /, '')
      }
    }
  }
})
```
再次执行 `npm run dev`
这次可以自动打开3666端口的页面。
## 调整目录结构，支持jsx，支持模块引入
### 编辑config
在vite官网中，[https://cn.vitejs.dev/guide/features.html#jsx](https://cn.vitejs.dev/guide/features.html#jsx)，进行了对jsx支持的描述。
修改vite.config.js文件，添加对jsx的支持
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  // 支持jsx语法
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  // 本地运行配置，及反向代理配置
  server: {
    host: 'localhost', // 指定服务器主机名
    port: 3666, // 指定服务器端口
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
    https: false, // 是否开启 https
    cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
    proxy: { // 为开发服务器配置自定义代理规则
      '/api': {
        target: "https://xxxx.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api /, '')
      }
    }
  }
})
```
### 调整目录结构

- 将main.js修改为 src/main.jsx
- 修改index.html中main.jsx路径的引入
- 将style.css修改为 src/styles/index.css
- 将counter.js修改为 src/hooks/counter.js

目录结构如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/737887/1695479721235-f4d09f40-7117-41c8-8095-0b9b3e07dea6.png#averageHue=%23f0efef&clientId=uff22ac13-8eb3-4&from=paste&height=307&id=u8a22923e&originHeight=307&originWidth=248&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10638&status=done&style=none&taskId=u208409eb-a71a-40f4-9bfe-8fd3ac40da7&title=&width=248)
main.jsx的内容
```jsx
import './styles/index.css'
import javascriptLogo from './images/javascript.svg'
import { setupCounter } from './hooks/counter.js'

const createHtml = () => (<div>
  <a href="/" target="_blank">
    <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
  </a>
  <h1>Hello Chat!</h1>
  <div class="card">
    <button id="counter" type="button"></button>
  </div>
  <p class="read-the-docs">
    Click on the Chat logo to learn more
  </p>
</div>);
document.querySelector("body").append(createHtml());

setupCounter(document.querySelector('#counter'))
```
### 出现h函数找不到的报错
调整好main.jsx，重新启动项目，出现` h is not defined`
```jsx
Uncaught ReferenceError: h is not defined
    at createHtml (main.jsx:20:27)
    at main.jsx:32:39
```
然后创建自定义的h渲染函数，该函数功能是解析生成dom元素。
```jsx
// 自定义创建h渲染函数，将jsx文件都导入h函数
export const h = (tag, props, ...children) => {
  // If tag is a component, call it
  if (typeof tag === 'function') {
    return tag({ ...props }, children);
  }
  // Create HTML-element with given attributes
  const el = document.createElement(tag);
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      if (key === 'className') {
        el.classList.add(...(val || '').trim().split(' '));
        return;
      }
      el.setAttribute(key, val);
    });
  }

  // Append child elements into the parent
  children.forEach((child) => {
    el.append(child);
  });

  return el;
};
```
将h函数导入到main.jsx中。项目正常运行，错误消失。
```jsx
import { h } from './parse';
import './styles/index.css'
import javascriptLogo from './images/javascript.svg'
import { setupCounter } from './hooks/counter.js'

const createHtml = () => (<div className='root'>
  <a href="/" target="_blank">
    <img src={javascriptLogo} className="logo vanilla" alt="JavaScript logo" />
  </a>
  <h1>Hello Chat!</h1>
  <div className="card">
    <button id="counter" type="button"></button>
  </div>
  <p className="read-the-docs">
    Click on the Chat logo to learn more
  </p>
</div>);
document.querySelector("body").append(createHtml());

setupCounter(document.querySelector('#counter'))
```
调整下index.css，将#app的样式做下修改
```jsx
.root {
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  position: absolute;
}
```
项目正常运行：如下图
![image.png](https://cdn.nlark.com/yuque/0/2023/png/737887/1695480978936-f1763c1c-f1c2-4e28-9e78-3c1793556e0b.png#averageHue=%23fcfaf1&clientId=uff22ac13-8eb3-4&from=paste&height=452&id=u45223140&originHeight=452&originWidth=390&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13247&status=done&style=none&taskId=uf4ba29a8-9e1f-49fa-a848-b471e2623db&title=&width=390)
## 存在文件过多问题
此时还存在2个问题，执行`npm run build`打包出来多个文件，作为一个库lib文件，不希望多次进行文件加载。需要把css和svg都打包到lib中。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/737887/1695480967143-82ee55e7-50e8-4424-9689-fd80b779d017.png#averageHue=%23debf9a&clientId=uff22ac13-8eb3-4&from=paste&height=156&id=u8a8a2f16&originHeight=156&originWidth=239&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6856&status=done&style=none&taskId=ub61bf43b-e1f8-4813-b6e0-91cc29a73fd&title=&width=239)
### 将css打包到js中
安装插件 vite-plugin-css-injected-by-js 
`npm install -D vite-plugin-css-injected-by-js`
添加到config中
```jsx
import { defineConfig } from 'vite'
import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  // 支持jsx语法
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    // 开启打包库lib
    lib: {
      entry: resolve(__dirname, './src/main.jsx'),
      name: 'SmartChat',
      // the proper extensions will be added
      fileName: 'smart-chat'
    },
    rollupOptions: {
      output: {
        format: "esm"
      }
    }
  },
  plugins: [cssInjectedByJsPlugin({ topExecutionPriority: false })],
  // 本地运行配置，及反向代理配置
  server: {
    host: 'localhost', // 指定服务器主机名
    port: 3666, // 指定服务器端口
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
    https: false, // 是否开启 https
    cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
    proxy: { // 为开发服务器配置自定义代理规则
      '/api': {
        target: "https://xxxx.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api /, '')
      }
    }
  }
})
```
执行build命令
```jsx
npm run build        

> smart-chat@0.0.0 build
> vite build

vite v4.4.9 building for production...
✓ 5 modules transformed.
dist/smart-chat.js  3.91 kB │ gzip: 2.24 kB
dist/smart-chat.umd.cjs  3.71 kB │ gzip: 2.19 kB
✓ built in 236ms
```
打包后只有单独的js文件。
### 将svg图标打包到lib中
svg图标在上一步已经打包到了lib库中。成功打包svg到库中，这一步就可以省略。
如果没有打包进入，可以使用 `mini-svg-data-uri` 第三方工具进行转换。
`npm install -D mini-svg-data-uri`
```jsx
import svgToMiniDataURI from "mini-svg-data-uri"
import javascriptLogo from './images/javascript.svg?raw'
const javascriptLogoBase64 = svgToMiniDataURI(javascriptLogo);

// 在jsx中使用base64数据
<a href="/" target="_blank">
  <img src={chatLogo} className="logo vanilla" alt="JavaScript logo" />
</a>
```
### 分组件进行开发
项目复杂之后，需要对功能模块进行划分开发。
将`main.jsx`中的`read-docs`独立出来;
#### 自定义组件需要注意：

1. 引入 h 函数；
2. 命名是大写字母开头
```jsx
import { h } from '../parse';
export function ReadDocs() {
  return <p class="read-the-docs">
    Click on the ChatBot logo to learn more
  </p>
}
```
#### 将定义好的组件引入到main.jsx中
```jsx
import { h } from './parse';
import svgToMiniDataURI from "mini-svg-data-uri"
import javascriptLogo from './images/javascript.svg?raw'
const javascriptLogoBase64 = svgToMiniDataURI(javascriptLogo);
import chatLogo from './images/chatbot.svg'
import './styles/index.css'
import { setupCounter } from './hooks/counter.js'
// 引入自定义的jsx组件
import { ReadDocs } from "./components/ReadDocs"

const createHtml = () => (<div className='root'>
  <a href="/" target="_blank">
    <img src={chatLogo} className="logo vanilla" alt="JavaScript logo" />
  </a>
  <h1>Hello Chat!</h1>
  <div className="card">
    <button id="counter" type="button"></button>
  </div>
  {/* <p className="read-the-docs">
    Click on the Chat logo to learn more
  </p> */}
  {/* 通过组件进行渲染 */}
  <ReadDocs />
</div>);
document.querySelector("body").append(createHtml());

setupCounter(document.querySelector('#counter'))
```
最后页面效果：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/737887/1695483519480-c534f325-e7e2-42f3-93f5-fc486b591b64.png#averageHue=%23fbfbfb&clientId=ud3fd942a-4bf8-4&from=paste&height=461&id=u5842d570&originHeight=461&originWidth=444&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16738&status=done&style=none&taskId=u9ee2567f-7933-4304-9fd7-11ac1c41737&title=&width=444)
## 编译打包后，进行测试
### 在vue项目中测试
使用vite创建基于vue的模板。
`npm create vite@latest vite-vue-app -- --template vue`
将打包出来的 smart-chat.js 和 smart-chat.umd.cjs复制到项目中。
引入到index.html中，需要把script标签放到body中，因为创建的元素是添加append到body中。
```jsx
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite + Vue</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
  <script src="./smart-chat.js"></script>
</body>

</html>
```
将main.js修改为空标签，方便内容查看
```jsx
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp('<div></div>').mount('#app')
```
最后展示效果，该内容是通过插件进行引入进来的。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/737887/1695483600754-d5bd6e10-d054-4fc9-83f0-82e8a7586e75.png#averageHue=%23fbfbfb&clientId=ud3fd942a-4bf8-4&from=paste&height=502&id=ub034a6d0&originHeight=502&originWidth=479&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18222&status=done&style=none&taskId=u8ba38d4a-99f9-4602-8161-e9125485724&title=&width=479)
### 在react项目中测试
通过vite创建react项目
 `npm create vite@latest`
```shell
npm create vite@latest
# 项目名称vite-react-app
Project name: vite-react-app

# 选择react
? Select a framework: » - Use arrow-keys. Return to submit.
    Vanilla
    Vue
>   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others
√ Select a framework: » React
# 使用基本JavaScript进行开发
? Select a variant: » - Use arrow-keys. Return to submit.
    TypeScript
    TypeScript + SWC
>   JavaScript
    JavaScript + SWC
√ Select a variant: » JavaScript

# 运行项目
Done. Now run:

  cd vite-react-appreact
  npm install
  npm run dev

```
启动react项目;
#### 修改main.jsx为空标签
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  '<div></div>'
)
```
#### 在index.html中引入smart-chat.js
```jsx
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
  <script src="./smart-chat.js"></script>
</body>
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/737887/1695484215717-5dadb4de-ba73-4552-9afe-2967053f320f.png#averageHue=%23fbfbfb&clientId=u6aafcb09-badd-4&from=paste&height=510&id=u157dc160&originHeight=510&originWidth=498&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15663&status=done&style=none&taskId=u0d8248e3-c795-401b-876d-b2bab76931f&title=&width=498)
## 设置开发规范eslint和pretter
### 安装eslint
`npm i eslint -D`
生成配置文件 .eslintrc.js
```jsx
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  plugins: ['prettier'],
};

```
### 安装prettier
`npm i -D prettier`
添加配置文件，.prettierrc 或者 .prettierrc.js；下面使用js文件，方便添加注释
```jsx
module.exports = {
  extends: ['prettier'],
  printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, //一个tab代表几个空格数
  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  semi: true, //行位是否使用分号，默认为true
  singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
  trailingComma: 'all', //是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
};
```
#### 在vscode中添加prettier插件
![image.png](https://cdn.nlark.com/yuque/0/2023/png/737887/1695525789318-a3e68365-cef3-4a00-b003-1c33c93ae20b.png#averageHue=%23faf7f5&clientId=u29f71ee7-1586-4&from=paste&height=214&id=udd65cf6b&originHeight=214&originWidth=707&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33855&status=done&style=none&taskId=u0e6ae563-b67c-4e8d-b4e3-31f9451099b&title=&width=707)
确定使用的是官方的。
注意：配置后要重启编辑器才能生效。
#### 规则生效优先级

- 项目中有prettierrc的配置文件，会先根据项目中的配置进行设置。
- 项目中没有配置文件，会使用.vscode/settings.json路径下的配置
## 使用 husky + commitlint 检查提交规范

1. [commitlint](https://github.com/conventional-changelog/commitlint)：用于检查提交信息
2. [husky](https://github.com/typicode/husky)：是git hooks工具

注意：**npm 需要在 7.x 以上版本！！！！！**
### commitlint
安装依赖：`npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4`
#### 创建 commitlint.config.js 文件.
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```
增加配置项[https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js](https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js)
```javascript
module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
```
**注意：确保保存为 UTF-8 的编码格式，否则容易出错。**
### 安装 husky
```shell
// 安装依赖
npm install husky@7.0.1 --save-dev

//启动 hooks ， 生成 .husky 文件夹
npx husky install

// 在 package.json 中生成 prepare 指令，（ 需要 npm > 7.0 版本 ）
npm set-script prepare "husky install"

//执行 prepare 指令
npm run prepare
```
#### 1.检查commit msg是否符合规范
添加 commitlint 的 hook 到 husky中，并指令在 commit-msg 的 hooks 下执行 npx --no-install commitlint --edit "$1" 指令
```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
#### 2.检查提交的代码是否符合eslint规范
通过 **husky 监测 pre-commit 钩子，在该钩子下执行 npx eslint --ext .js,.vue src** 指令来去进行相关检测
```shell
npx husky add .husky/pre-commit "npx eslint --ext .js,.vue src"
```
这样就可以通过 pre-commit 阶段检测到了代码的提交规范问题。
#### 3.提交时自动修改代码格式规范lint-staged
在上一步通过pre-commit钩子检查代码符合eslint规范问题，但是不会修复。
[lint-staged](https://github.com/okonet/lint-staged) 可以当前的代码检查 **只检查本次修改更新的代码，并在出现错误的时候，自动修复并且推送**
**修改 package.json 配置**
```json
"lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
```
修改 .husky/pre-commit 文件
```json
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

参考文章：[https://dev.to/vanishmax/vanilla-jsx-4aa4](https://dev.to/vanishmax/vanilla-jsx-4aa4)

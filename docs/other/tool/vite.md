---
title: vite
date: 2022-10-23 17:45:18
permalink: /pages/46c890/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
# vite的使用

## 全局安装vitejs
`<font style="color:rgb(51, 51, 51);background-color:rgb(248, 248, 248);">npm install vite -g</font>`

#### <font style="color:rgb(51, 51, 51);background-color:rgb(248, 248, 248);">查看安装vite版本</font>
`<font style="color:rgb(51, 51, 51);background-color:rgb(248, 248, 248);">vite -v</font>`<font style="color:rgb(51, 51, 51);background-color:rgb(248, 248, 248);">;   // </font>vite/3.2.5 darwin-x64 node-v14.20.0

## vite创建项目
`npm init @vitejs/app`

### - 项目支持jsx
安装插件`@vitejs/plugin-vue-jsx`

yarn add -D @vitejs/plugin-vue-jsx;

#### 在vite.config.js文件中，添加该插件的使用
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"

export default defineConfig({
  plugins: [vue(), vueJsx()]
})
```

#### 创建App.jsx文件，替换现在首页
```javascript
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return <div>vite jsx!</div>;
    };
  },
});
```

修改main.js的引入路径

```javascript
import { createApp } from 'vue'
// import App from './App.vue'
import App from "./App"

createApp(App).mount('#app')
```

### - 项目支持vue2
可以参考官方 插件[https://cn.vitejs.dev/guide/features.html#vue](https://cn.vitejs.dev/guide/features.html#vue)

+ <font style="color:rgb(33, 53, 71);">Vue 3 单文件组件支持：</font>[@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)
+ <font style="color:rgb(33, 53, 71);">Vue 3 JSX 支持：</font>[@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx)
+ <font style="color:rgb(33, 53, 71);">Vue 2.7 支持：</font>[vitejs/vite-plugin-vue2](https://github.com/vitejs/vite-plugin-vue2)
+ <font style="color:rgb(33, 53, 71);">Vue <2.7 的支持：</font>[underfin/vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2)

### - 项目支持react
需要使用插件 `@vitejs/plugin-react`解析react项目

在创建项目时，选择react，就可以创建一个支持react的项目。

`npm init vite@latest`

![](https://cdn.nlark.com/yuque/0/2023/png/737887/1675438072546-c8f9780c-9340-444e-a683-8627b7fcc32a.png)

![](https://cdn.nlark.com/yuque/0/2023/png/737887/1675438084073-45cee75c-331a-42c2-b89b-378ede41f32c.png)

### - 项目支持ts
创建项目时，选择支持typescript。

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "types": ["vite/client"],
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### -项目中引入静态文件
+ url
+ raw
+ webworker

```javascript
import logo from "./assets/logo.png";
```

#### url直接引用静态资源文件
```javascript
import logo from "./assets/logo.png?url";
console.log(logo); //  返回的是url路径/src/assets/logo.png
```

#### raw将文件源码引入
会将引入的文件源码进行打印

```javascript
let a = 1;
console.log(a);
```

```javascript
import txt from "./txt.js?raw"
console.log(txt); // let a = 1; console.log(a);
```

#### webworker开启worker多线程
```javascript
let i = 0;
const timeCounter = ()=>{
    i = i+1;
    postMessage(i);
    setTimeout(timeCounter, 2000);
}

timeCounter();
```

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Worker from './worker?worker'
const worker = new Worker();

worker.onmessage = function(e){
    console.log(e);
}

createApp(App).mount('#app')
```

### - 项目集成eslint和prettier
添加依赖：`eslint`、`eslint-plugin-vue`、`@vue/eslint-config-prettier`、`@rushstack/eslint-patch`

#### 新建.eslintrc.cjs文件
```javascript
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
```

在`package.json`中定义

```json
"scripts":{
  "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
}
```

#### 添加`prettier`
安装依赖： `prettier`

创建`.prettierrc`规范配置文件

```javascript
module.exports = {
  // 字符串使用单引号
  singleQuote: true,
  // 每行末尾自动添加分号
  semi: true,
  // tab缩进大小,默认为2
  tabWidth: 2,
  // 使用tab缩进，默认false
  useTabs: false,
  // 对象中打印空格 默认true
  // true: { foo: bar }
  // false: {foo: bar}
  bracketSpacing: true,
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'avoid',
  // 换行长度，默认80
  printWidth: 80,

  // 设置为true时,将多行JSX元素的 > 放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: true
  /* 
    <button
       className="prettier-class"
       id="prettier-id"
       onClick={this.handleClick}>
       Click Here
    </button> 
     */
  // 设置为false时
  /*
    <button
        className="prettier-class"
        id="prettier-id"
        onClick={this.handleClick}
    >
        Click Here
    </button>
     */
};
```

#### 添加husky，提交代码前进行规范校验
```shell
// 安装husky依赖
$ yarn add -D husky

// 执行husky，在当前项目下创建出.husky目录，【注意前提是先创建git仓库】
$ npx husky install

// 添加提交代码前要执行的命令
$ npx husky add .husky/pre-commit "npm run lint"
```

### -项目的env环境变量
#### 可以定义.env文件，在该文件中定义全局环境变量
```plain
VITE_TITLE="development"
VITE_NAME="test"
```

注意：变量必须以`VITE_`开头。

#### 定义多环境中变量不同值
+ .env.development 开发环境
+ .env.production 生产环境，需要执行npm run build
+ .env.test 通过vite的 --mode 指定启动的模式，在`package.json`的

```json
"scripts": {
  "dev": "vite --mode test"
}
```

### - glob-import批量导入文件功能
项目开发中，有时想将文件夹下的所有文件都进行导入，可以使用 `import.meta.glob`功能。

在目录下创建`mock`目录，并创建`user.json`、`table.json`、`department.json`、`utils.js`

```javascript
// 一次全部导入mock下的所有文件
const mockData = import.meta.glob("./mock/*");
console.log(mockData);
// 如果只导入json
const mockData = import.meta.glob("./mock/*.json");
```



## vite.config.js配置
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 支持jsx
import vueJsx from "@vitejs/plugin-vue-jsx" 

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    //配置alias别名，可以缩短引入文件时的路径
    alias: {
      "@": "/src",
      "@style": "/src/style",
    },
  },
})
```

## vite插件的使用
开发一个插入js文件到index.html中head标签中的插件

```javascript
export const insertScriptPlugin =  (options) => {
  return {
    name: 'insert-script',
    config({ mode }) {
        process.env.VITE_MODE = mode;
    },
    transformIndexHtml(html) {
      const env = process.env.VITE_MODE
      const scriptUrl = options[env || 'production'];
      if (!scriptUrl) {
        return html;
      }

      const scriptTag = `<script async src="${scriptUrl}"></script>`;
      const headEndIndex = html.indexOf('</head>');
      if (headEndIndex !== -1) {
        // 在 </head> 标签之前插入 script 标签
        return html.slice(0, headEndIndex) + scriptTag + html.slice(headEndIndex);
      } else {
        return html;
      }
    },
  };
}
```

然后在vite.config.js中使用

```javascript
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  console.log(command, mode);
  let base = '/api';
  return {
    base,
    plugins: [vue(), 
              vueJsx(), 
              insertScriptPlugin({test: 'test.js', prod: 'prod.js'})],
  }
}
```




















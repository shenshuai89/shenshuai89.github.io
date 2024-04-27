---
title: 从0实现vite+react的ssr服务端渲染
date: 2024-04-27 10:57:39
permalink: /pages/ca8b66/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

> 在vite创建项目时，有支持创建ssr的命令。为了能够深入学习ssr实现原理，决定从零搭建服务端渲染的项目，了解了内部原理后，就可以切换使用不同的语言应用来启动服务。
## 0 首先创建项目
`npm init vite@latest`
选择react、javascript基本版本。
初始化完成，项目结构如下
```
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```
### 在src下创建pages目录
创建aaa.jsx和bbb.jsx文件
```javascript
export default function AAA() {
  return <div>this is aaa;</div>;
}
```
```javascript
export default function BBB() {
  return <div>this is bbb;</div>;
}
```
### 安装一些依赖

- 路由react-router-dom
- 创建服务器 express
- 设置启动时的环境变量 cross-env
```shell
$ yarn add -D cross-env
$ yarn add react-router-dom express
```
最后，移除不需要的css文件，精简代码。
## 1.本地开发阶段
### 在App.jsx中添加路由
```jsx
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
// 获取pages目录下的2个页面，用来做路由跳转
const pages = import.meta.globEager("./pages/*.jsx");
//生成 routes 对象
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
  return {
    name,
    path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
    component: pages[path].default,
  };
});
console.log(routes, "Routes");
function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Vite + React + ssr</h1>
      {/* ul列表，点击发生路由跳转 */}
      <ul>
        {routes.map(({ name, path }) => {
          return (
            <li key={path}>
              <Link to={path}>{name}</Link>
            </li>
          );
        })}
      </ul>
      {/* 显示路由对应的页面 */}
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />}></Route>;
        })}
      </Routes>
    </div>
  );
}

export default App;
```
### 在main.jsx中配置BrowserRouter
BrowserRouter是前端显示的路由标签
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
```
执行`npm run dev`命令启动项目后，可以看到
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b54a830e683460fad19e5574d5d6ed7~tplv-k3u1fbpfcp-zoom-1.image)
### 创建server服务文件
在项目下创建`server.js`文件
#### 1:引入express，创建express实例
```jsx
import express from "express";
const app = express();
app.listen(4000);
```
#### 2:引入vite，使用createServer创建viteServer
```jsx
// 通过vite创建server服务
const { createServer: createViteServer } = await import("vite");
//创建vite服务实例e
let vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
  base: "/",
});
//使用vite的中间件
app.use(vite.middlewares);
```
#### 3:监听所有路由
```jsx
app.get("*", async (req, res) => {
  let template;
  let render;
  //   console.log("isProduction", isProduction);
  template = fs.readFileSync("index.html", "utf8");
  template = await vite.transformIndexHtml(req.url, template);
  render = (await vite.ssrLoadModule("/src/server-entry.jsx")).render;
  //   console.log(req.url, template,"render");
  const html = await render(req.url, ssrManifest);
  if (ssrManifest.url) {
    res.redirect(301, ssrManifest.url);
    return;
  }
  const responseHtml = template.replace("<!--APP_HTML-->", html);
  res.status(200).set({ "Content-Type": "text/html" }).end(responseHtml);
});
```
#### 4: 完整的server.js代码
```jsx
import fs from "fs";
import express from "express";
const app = express();

// 通过vite创建server服务
const { createServer: createViteServer } = await import("vite");
//创建vite服务实例e
let vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
  base: "/",
});
//使用vite的中间件
app.use(vite.middlewares);

app.get("*", async (req, res) => {
  let template;
  let render;
  //   console.log("isProduction", isProduction);
  template = fs.readFileSync("index.html", "utf8");
  template = await vite.transformIndexHtml(req.url, template);
  // 在src下创建 server-entry.jsx 文件，做为ssr的入口文件，前端启动的入口文件为main.js，已经添加到了index.html中
  render = (await vite.ssrLoadModule("/src/server-entry.jsx")).render;
  //   console.log(req.url, template,"render");
  const html = await render(req.url);
  // 给index.html的id为root标签中添加 <!--APP_HTML-->，做为后边要替换的标志
  const responseHtml = template.replace("<!--APP_HTML-->", html);
  res.status(200).set({ "Content-Type": "text/html" }).end(responseHtml);
});
app.listen(4000);
```
### 新建`server-entry.jsx`文件

- server-entry.jsx 作为服务端渲染的入口文件
- main.jsx是前端渲染时的入口文件
> StaticRouter从`react-router-dom/server`中导入，用于服务端渲染的路由

```jsx
//服务端渲染的入口
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StaticRouter>
  );
}
```
### 最后，给index.html标签添加标记并测试
```html
<div id="root"><!--APP_HTML--></div>
```
执行`node server.js`启动服务，可以在4000端口看到页面。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9ffd336ddaa413094707aec85286855~tplv-k3u1fbpfcp-zoom-1.image)
显示网页源代码，可以看到已经添加了所有html代码
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7d0b6a4dac54695838bef393ccad932~tplv-k3u1fbpfcp-zoom-1.image)
## 2.编译之后正式发布
在上面只完成了本地开发时的ssr服务端渲染。要想正式上线，需要先build出来静态文件，然后经过server解析静态文件。
### 修改启动命令
```json
"scripts": {
  "dev": "vite",
  "build": "npm run build:client && npm run build:server",
  "build:client": "vite build --ssrManifest --outDir dist/client",
  "build:server": "vite build --ssr src/server-entry.jsx --outDir dist/server",
  "server": "cross-env NODE_ENV=production node server.js",
  "preview": "vite preview"
},
```

- build:client 打包前端
- build:server 通过server-entry编译server服务
- server 通过设置env `NODE_ENV=production` 测试生产环境下的ssr
### 在server.js文件中添加production时的渲染
#### 1: 判断是否为production环境
```javascript
// 判断是否为生产环境
const isProduction = process.env.NODE_ENV === "production";
```
#### 2: 如果是production，则使用编译出来的文件
```javascript
const templateHtml = isProduction
  ? fs.readFileSync("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? fs.readFileSync("./dist/client/ssr-manifest.json", "utf-8")
  : undefined;
```
#### 3:如果是production，render方法直接使用dist下的server下的server-entry.js
```javascript
render = (await import("./dist/server/server-entry.js")).render;
```
#### 4: 修改后完整的server.js
```javascript
import fs from "fs";
import express from "express";
const app = express();
// 通过vite创建server服务
const { createServer: createViteServer } = await import("vite");
// 判断是否为生产环境
const isProduction = process.env.NODE_ENV === "production";
const templateHtml = isProduction
  ? fs.readFileSync("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? fs.readFileSync("./dist/client/ssr-manifest.json", "utf-8")
  : undefined;

//创建vite服务实例
let vite;
if (!isProduction) {
  // 开发环境下
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
    base: "/",
  });
  // 使用 vite 中间件
  app.use(vite.middlewares);
} else {
  // 生产环境下，设置静态目录
  app.use(express.static("./dist/client"));
}

app.get("*", async (req, res) => {
  let template;
  let render;
  //   console.log("isProduction", isProduction);
  if (!isProduction) {
    template = fs.readFileSync("index.html", "utf8");
    // 路由变化，更新html，更新template
    template = await vite.transformIndexHtml(req.url, template);
    // 在src下创建 server-entry.jsx 文件，做为ssr的入口文件，前端启动的入口文件为main.js，已经添加到了index.html中
    render = (await vite.ssrLoadModule("/src/server-entry.jsx")).render;
  } else {
    template = templateHtml;
    render = (await import("./dist/server/server-entry.js")).render;
  }
  //   console.log(req.url, template,"render");
  const html = await render(req.url, ssrManifest);
  if (ssrManifest.url) {
    res.redirect(301, ssrManifest.url);
    return;
  }
  // 给index.html的id为root标签中添加 <!--APP_HTML-->，做为后边要替换的标志
  const responseHtml = template.replace("<!--APP_HTML-->", html);
  res.status(200).set({ "Content-Type": "text/html" }).end(responseHtml);
});
app.listen(4000);
```
### 测试项目

- 先执行` npm run build`，编译生成需要的文件
- 然后运行 `npm run server`，可以在4000端口查看页面

[项目完整代码](https://gitee.com/shenshuai89/vite-react-ssr)

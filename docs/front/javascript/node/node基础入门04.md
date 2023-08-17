---
title: node的koa2框架
date: 2019-07-30 19:26:14
categories: 前端开发
tags: 
  - node koa2 服务器 后端
permalink: /pages/40d054/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---
*  [第一篇：node基础特性介绍，并且启动一个服务](http://www.shenshuai.me/2019/07/16/node基础入门一/)
*  [第二篇：node的npm包管理和上传文件操作](http://www.shenshuai.me/2019/07/20/node基础入门二/)
*  [第三篇：node的express框架](http://www.shenshuai.me/2019/07/26/node基础入门三/)
*  [第四篇：node的koa2框架](http://www.shenshuai.me/2019/07/30/node基础入门四/)
*  [第五篇：node开发使用的数据库](http://www.shenshuai.me/2019/08/03/node基础入门五/)
*  [第六篇：node的cookie和session以及websocket使用](http://www.shenshuai.me/2019/08/10/node基础入门六/)

## koa2框架介绍基本操作
> Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

### 安装koa2
初始化项目: **npm init -y**
安装：**npm i -S koa**

### 使用koa2
``` js
const Koa = require("koa");
const app = new Koa();
app.use(async ctx=>{
    ctx.body="hello koa!";
})
app.listen(3000,()=>{
    console.log("koa server run on port:3000");
})
```
## get传参
``` js
app.use(async ctx=>{
    let url = ctx.url
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {url, req_query, req_querystring, ctx_query, ctx_querystring}
})
```
访问地址：http://localhost:3000/?user=ti&age=10，可以查看参数

## post传参
### 原生获取post请求数据的步骤
- 解析上下文ctx中的原生nodex.js对象req。
- 将POST表单数据解析成query string-字符串.(例如:user=jspang&age=18)
- 将字符串转换成JSON格式。

函数parsePostData，接收post数据的方法
``` js
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata="";
            ctx.req.on('data',(data)=>{
                postdata += data
            })
            ctx.req.addListener("end",function(){
                // resolve(postdata);  //数据为字符串
               let parseData = parseQueryStr( postdata )
                resolve(parseData);   //数据为json
				}) 
		}catch(error){ 
			reject(error); 
		}
	})
}
```
函数parseQueryStr：格式化请求到的数据字符串
``` js
function parseQueryStr(queryStr){
    let queryData={};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    for( let [index,queryStr] of queryStrList.entries() ){
        let itemList = queryStr.split('=');
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData
}
```
最后直接将结果打印到前端页面
     let pastData=await parsePostData(ctx);
     ctx.body=pastData;

### 使用中间件koa-bodyparse
安装：**npm install --save koa-bodyparser@latest**
使用：const bodyParser = require("koa-bodyparser")
app.use(bodyParser())
          
## koa2路由
* 原生路由：
  通过匹配let url = ctx.request.url;
  url匹配到哪个页面就显示对应的页面
* koa-router(基础，层级（全局、局部）)
  使用koa-router中间件
  const Router = require('koa-router');
### koa-router中间件路由使用
#### 基础路由使用
``` js
router.get('/', function (ctx, next) {
    ctx.body="Hello index";
}).get('/news',(ctx,next)=>{
    ctx.body="news page"
}).get('*',(ctx,next)=>{
    ctx.body="404 page"
});
```

#### 添加全局层级
``` js
const router = new Router({
      prefix:'/admin'
})
```

#### 添加局部层级
**通过定义不同的路由对象，最后统一添加到总的router对象中。**
``` js
// 定义home层级
let home = new Router()
home.get("/", async (ctx)=>{
	ctx.body = "home index"
})
.get("/todo", async(ctx)=>{
	ctx.body = "home todo"
})
// 定义news层级
let news = new Router()
news.get("/", async (ctx)=>{
	ctx.body = "news index"
})
.get("/todo", async (ctx)=>{
	ctx.body = "news todo"
})
// 装载所有子路由
let router = new Router()
router.use("/home",home.routes(),home.allowedMethods )
router.use("/news",news.routes(),news.allowedMethods )
```

## 设置cookie
### 写入cookie值
``` js
ctx.cookie.set("username","koa",{
     domain:'127.0.0.1', // 写cookie所在的域名
     path:'/index',       // 写cookie所在的路径
     maxAge:1000*60*60*24,   // cookie有效时长
     expires:new Date('2099-12-31'), // cookie失效时间
     httpOnly:false,  // 是否只用于http请求中获取
     overwrite:false  // 是否允许重写
})
```
### 读取cookie
``` js
if( ctx.cookies.get('username')){
	ctx.body = ctx.cookies.get('username');
}
```

## koa-static静态化资源文件
安装koa-static中间件
npm install --save koa-static
``` js
//将static文件设置为静态文件夹
const static = require('koa-static')
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))

```
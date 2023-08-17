---
title: 使用node的express框架搭建的webSocket请求
date: 2019-05-24 17:42:33
categories: 前端开发
tags: 
  - express websocket
permalink: /pages/bd798e/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
# 使用ws创建WebSocket服务
## 新建package.json，用于安装ws
执行npm init -y生成package.json
``` json
	{
		"name": "echo",
		"version": "0.0.1",
		"dependencies": {
			"express": "4.17.0",
			"ws": "^7.0.0"
		}
	}
```
执行$npm install 命令安装依赖包

创建一个server.js。作为项目启动的服务器，新建一个public文件夹，用来放置静态文件。
以下是server.js的内容
``` js
var express = require('express');
var http = require("http");
var WebSocket = require("ws")

//这一部分不能使用express创建服务的简写方法。
var app = express();
var server = http.createServer(app);
var wss = new WebSocket.Server({server})

app.use(express.static(__dirname + "/public"))

wss.on("connection", function (ws) {
  console.log("连接成功");
  ws.on("message", function(data){
    console.log("接收到客户端的数据："+data);
    // 后台接收到前端的数据后，向前端发送数据
    ws.send("server返回的："+data)
  })
})
server.listen(1688,function(){
  console.log("服务器启动成功，通过1688端口访问");
})

```
在public文件夹下，创建index.html文件
``` html
	<h1>websocket echo</h1>
    <h2>latency: <span id="latency"></span>ms</h2>
```
``` js
	var lastMessage;
	window.onload = function(){
		ws = new WebSocket('ws://127.0.0.1:1688');
		ws.onopen = function (e) {
			ping();   
		};
		ws.onclose = function (e) {//当链接关闭的时候触发

		};
		ws.onmessage = function (e) {//后台返回消息的时候触发
			console.log(e.data);
			if(new Date - lastMessage>20){
				document.getElementById("latency").innerHTML = "响应时间过长，停止请求";
				ws.close();
				return;
			}
			document.getElementById("latency").innerHTML = new Date - lastMessage;
			setTimeout(()=>{
				console.log("计算出耗时之后，2s再发一次请求");
				ping();
			},2000)
		};
		ws.onerror = function (e) {//错误情况触发

		}
		function ping(){
				lastMessage = new Date().getTime();
				ws.send("ping");   //向后台发送数据
		}
	}
```

然后可以使用node server.js启动服务，打开index.html文件就可以看到websocket发送和接收的数据。

## 只使用ws创建服务
单独使用ws创建服务，然后直接在浏览器打开index.html即可访问。
``` js
const WebSocket = require('ws');

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    port: 1688
});

wss.on('connection', function (ws) {
    console.log("连接成功");
    ws.on("message", function (data) {
        console.log("接收到客户端的数据：" + data);
        // 后台接收到前端的数据后，向前端发送数据
        ws.send("server返回的：" + data)
    })
});

console.log('ws server started at port 1688...');
```

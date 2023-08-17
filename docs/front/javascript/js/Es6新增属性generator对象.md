---
title: Es6新增属性generator对象
date: 2018-01-16 17:24:14
categories: 前端开发
tags: 
  - JavaScript
permalink: /pages/7bc190/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

## generator对象的创建
generator函数创建,在一般的函数函数名前添加*,就可以将一般函数转换为generator函数；
``` bash
	function *show(){
		console.log("first");
		yield;
		console.log("second")
	}
	var gen = show();
	gen.next();  // first
	gen.next();  // second
```

## yield的传参使用
yield传参和返回值
``` bash
	function *gen(x){
		alert(1);
		console.log("x", x) // x 11
		let a = yield;
		alert(2);
		alert(a); //66
	}
	let genObj = gen(11);
	console.log(genObj)
	genObj.next(99); //第一个next传参不起作用，参数要在函数中设置
	genObj.next(66); //这个参数可以传递给yield
```

## yield的返回值使用

``` bash
	function *gen(){
		alert(1);
		yield 66; //yield后面跟的值，相当于第一个函数的返回值
		alert(2);
	}
	let genObj = gen();
	console.log(genObj)
	let res1 = genObj.next(); 
	let res2 = genObj.next();
	console.log(res1)  //  {value: 66, done: false}
	console.log(res2)  //  {value: undefined, done: true}
```

## 使用runner进行多步数据获取

先下载安装一个generator-runner-blue的插件
``` js
	runner(function *(){
		let data1 =yield axios.get("./data/1.txt").then(response => response.data ).catch(err => console.log(err));
		let data2 =yield axios.get("./data/2.txt").then(response => response.data ).catch(err => console.log(err));
		let data3 =yield axios.get("./data/3.txt").then(response => response.data ).catch(err => console.log(err));

		console.log(data1, data2, data3)
	})

```
generator更适合处理带有异步的请求数据，promise使用请求多个接口的数据
带有逻辑判断的回调
``` js
	runner(function *(){
	     let userData = yield axios.get("./data/1.txt").then(response => response.data ).catch(err => console.log(err));

	     if(userData.type == "vip"){
	           let items= yield axios.get("./data/vip.txt").then(response => response.data ).catch(err => console.log(err));

	     }else{
	           let items= yield axios.get("./data/user.txt").then(response => response.data ).catch(err => console.log(err));

	     }
	})
```

## async await属性
使用Es7的async await属性可以不用下载runner.js脚本，该方法其实是generator的一个语法糖
``` js
	async function getData(){
		let data1 = await axios.get("./data/1.txt").then(response => response.data).catch(err => console.log(err));
		let data2 = await axios.get("./data/2.txt").then(response => response.data).catch(err => console.log(err));
		let data3 = await axios.get("./data/3.txt").then(response => response.data).catch(err => console.log(err));

		console.log(data1, data2, data3)
	}

```











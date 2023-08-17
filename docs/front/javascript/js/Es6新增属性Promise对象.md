---
title: Es6新增属性Promise对象
date: 2018-01-16 10:20:54
categories: 前端开发
tags: 
  - JavaScript es6 promise
permalink: /pages/0e3957/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
## Promise对象的创建
> promise解决前端异步请求过程的回调问题，在回调函数过程中，往往无法知道哪个回调函数先执行结束，而且这个结束状态的时间点也无法控制，和网络状态，服务器性能等因素有关。
>
> promise的出现还优雅的解决了异步回调嵌套函数的书写方式。

promise有三个状态，

**三种状态**：

`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败） 

状态只能是pending==》fulfilled或者pending==》rejected

 **两个特点：**

1. 对象的状态不受外界影响
2. 一旦状态改变，就不会再变

基本用法：直接通过new新建promise对象

```javascript
const promise = new Promise((resolve,reject)=>{
    if(/** 值为真 **/){
       resolve(val)
    }else{
       reject(error)
    }
})
```

Promise构造函数接受一个含有（resolve、reject）两个参数的函数**Fn1*作为参数，Fn函数内部的代码为同步执行代码为立即得到执行处理。




## Promise对象的使用
在当前文件夹中创建arr.txt文件[1,2,3,6,9];
使用jquery的ajax异步请求数据的方法
``` bash
	var p = new Promise(function resolver(resolve, reject){
		$.ajax({
			url:"./arr.txt",
			dataType:"json",
			success:function(data){
				console.log(data);
				resolve("这里是成功执行");
			},
			error:function(err){
				console.log("这里是失败")
			}
		})
	})
	
	p.then(function(resolve){
		// 调用成功时
		console.log(resolve); // (7) [1,2,3,6,9]
	}, function(reject){
		// 调用失败
		console.log(reject);
	})
```

## then和catch

promise对象生成后，可用then处理resolve数据，用catch处理reject的数据

```javascript
new Promise((resolve,reject)=>{
    console.log("01首先会得到执行")
    // resolve参数可以传递给then
    resolve(1)
    // resolve和reject只能执行一个函数
    // reject(0)
}).then( (val)=>{ console.log("03then接收到resolve的参数",val) })
  .catch((err)=>{ console.error("03catch接收到reject的参数",err) });
//同步任务
console.log("02执行同步任务");
```

**执行结果**
*01首先会得到执行*
*02执行同步任务*
*03then接收到resolve的参数 1



```
new Promise((resolve,reject)=>{
    console.log("01首先会得到执行")
    // resolve参数可以传递给then
    // resolve(1)
    // resolve和reject只能执行一个函数
    reject(0)
}).then( (val)=>{ console.log("03then接收到resolve的参数",val) })
  .catch((err)=>{ console.error("03catch接收到reject的参数",err) });
//同步任务
console.log("02执行同步任务");
```

**执行结果**
*01首先会得到执行*
*02执行同步任务*
03catch接收到reject的参数 0



>  一般来说，不要在`then`方法里面定义 Reject 状态的回调函数（即`then`的第二个参数），推荐用`catch`方法。 

```javascript
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });

```

 第二种写法要好于第一种写法，理由是第二种写法可以捕获前面`then`方法执行中的错误，也更接近同步的写法（`try/catch`）。因此，建议使用`catch`方法，而不使用`then`方法的第二个参数。 

## resolve和reject

promise构造函数接受的参数函数Fn包含两个参数(resolve和reject)，这两个参数是JavaScript的内置函数。

 resolve函数的作用是将Promise实例的状态从 未完成 变为 成功，（pending –》fullfilled），在异步操作成功时调用，并将异步操作的结果作为参数传递then。 

 reject函数的作用是将Promise实例的状态从 未完成 变为 失败，（pending –》rejected），在异步操作失败时调用，并将异步操作报出的错误作为参数传递给catch。 



## 同步任务、微任务、宏任务

同步任务是按照代码出现的顺序立即执行。然后执行异步任务，异步任务有微任务和宏任务，先执行微任务，再执行宏任务。

 **微任务microtask**

* process.nextTick
* promise
* Object.observe
* MutationObserver
**tasks宏任务**
*  setTimeout
*  setInterval
*  setImmediate
*  I/O
*  UI渲染


then和catch里注册的函数是微任务

宏任务是定时器里面的任务，setTimeout和setInterval

这三者的执行顺序是   ①同步----②微任务-----③宏任务

> **微任务和异步任务的区别**
>
> 微任务是在本轮事件循环的末尾执行
>
> 异步任务是在下一轮事件循环中被执行

```
setTimeout(()=>{
	console.log("04异步任务最后执行")
},0)
new Promise((resolve,reject)=>{
    console.log("01首先会得到执行")
    // resolve参数可以传递给then
    resolve(1)
    // resolve和reject只能执行一个函数
    // reject(0)
}).then( (val)=>{ console.log("03then接收到resolve的参数",val) })
  .catch((err)=>{ console.error("03catch接收到reject的参数",err) });
//同步任务
console.log("02执行同步任务");
```

**执行结果**

*01首先会得到执行*
*02执行同步任务*
*03then接收到resolve的参数 1*
*04异步任务最后执行*


## all、race和any

 `Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。 

```javascript
const p = Promise.all([p1, p2, p3]);
```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

```javascript
const scorePromise = databasePromise
  .then(findAllscores);

const userPromise = databasePromise
  .then(getCurrentUser);

Promise.all([
  scorePromise,
  userPromise
])
.then(([scores, user]) => scoresToUser(scores, user));
```

只有scorePromise和userPromise两个异步操作，只有等到它们结果都返回才触发scoresToUser函数

**注意** <u>如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。</u> 



 `Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

 只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。  





 `Promise.any()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

 `Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是不会因为某个 Promise 变成`rejected`状态而结束。 

在当前文件夹中创建json.txt文件 `{"name":"promise","user":"es6","year":2016}`

``` bash
	var p1 = new Promise(function(resolve, reject){
		$.ajax({
			url:'./arr.txt',
			dataType:'json',
			success(data){
				resolve("这里是执行成功")
			},
			error(e){
				reject("这里是失败")
			}
		})
	})

	var p2 = new Promise(function(resolve, reject){
		$.ajax({
			url:'./json.txt',
			dataType:'json',
			success(data){
				resolve("这里是执行成功")
			},
			error(e){
				reject("这里是失败")
			}
		})
	})

	Promise.all([
		p1, p2
	]).then(function(data){
		console.log("全都成功", data);
	}, function(err){
		console.log("至少有一个失败",err);
	})

```

race可以设置多个接口地址的请求，只获取最先取到的数据值

``` bash
Promise.race([
	$.ajax({
		url:'http://a1.img.store.com/data/adoafejkd',
		dataType:'json',
		success:function(){
			...
		},
		error:function(){

		}
	}),
	$.ajax({
		url:'http://a2.img.store.com/data/adoafejkd',
		dataType:'json',
		success:function(){
			...
		},
		error:function(){

		}
	}),
	$.ajax({
		url:'http://a5.img.store.com/data/adoafejkd',
		dataType:'json',
		success:function(){
			...
		},
		error:function(){

		}
	})
])
```

延伸阅读：

[深度分析promise注册微任务和执行过程](https://mp.weixin.qq.com/s/iiAhbNsZK2_V3bVfGHt6Rw)
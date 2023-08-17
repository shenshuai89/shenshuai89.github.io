---
title: ajax的跨域和jsonp的使用
date: 2018-12-13 11:05:18
categories: 前端开发
tags: 
  - ajax 跨域 jsonp
permalink: /pages/6a94a3/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---
文章中源码地址：[github](https://github.com/shenshuai89/ajax-jsonp)
## JavaScript原生ajax对象
web页面和数据的交互读取是网页的基本功能，使用ajax是常用的技术方案之一。
通过创建var xhr = new XMLHttpRequest()对象来进行工作。
代码参考文件ajax.html
``` javascript
	var xhr = new XMLHttpRequest();
	xhr.open('get','back.php?a=1&b=2', true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status<300) || xhr.status == 304){
				console.log(xhr.responseText);
			}else{
				alert("出错了");
			}
		}
	}
```

## 使用ajax技术的跨域实现
当请求数据的地址和前端接口不在一个服务器上，或者端口号不同，都会造成跨域，解决跨域的方案cors
通过给服务器端的Access-Control-Allow-Origin设置*通配符
代码参考文件ajax-cros.html，后端是server文件夹下的node_server.js
``` javascript
	var xhr = new XMLHttpRequest();
	xhr.open("post","http://localhost:8088",true)
	xhr.send();
	xhr.onreadystatechange = function(){
		if(readyState==4){
			if( (xhr.status>=200&&xhr.status<300 ) || xhr.status == 304){
				console.log(xhr.responseText);
			}else{
				alert("出错了")
			}
		}
	}
```
``` javascript
	const http = require("http");
	
	let server = http.createServer(function(req,res){
		// 添加配置，可以跨域
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.write('aaa');
		res.end();
	}).listen(8088)
```

## jsonp实现跨域
在同源策略下，在某个服务器下的页面是无法获取到该服务器以外的数据的，但img、iframe、script等标签是个例外，这些标签可以通过src属性请求到其他服务器上的数据。利用script标签的开放策略，我们可以实现跨域请求数据，当然，也需要服务端的配合。当我们正常地请求一个JSON数据的时候，服务端返回的是一串JSON类型的数据，而我们使用JSONP模式来请求数据的时候，服务端返回的是一段可执行的JavaScript代码。
### 原生js实现jsonp
使用jsonp调用百度请求数据的接口
代码参考文件jsonp.html
``` javascript
	<script type="text/javascript">
		function show(json){
			var oUl = document.querySelector("#ullist")

			oUl.innerHTML = ''
			json.s.forEach(str => {
				let oLi = document.createElement('li');
				oLi.innerHTML = str;

				oUl.append(oLi);
			})
		}
	</script>
	
	<script>
	window.onload = function(){
		var oInput = document.querySelector("#inp1")
		var oUl = document.querySelector("#ullist")

		oInput.oninput = function(){
			// 创建一个script标签
			let oS = document.createElement("script");
			// 百度请求数据的jsonp接口，回调方法为cb，数据为wd
			oS.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${oInput.value}&cb=show`

			document.head.append(oS)
		}


	}
	</script>
```
``` html
	<input type="text" id="inp1">
	<ul id="ullist">
	</ul>
```
### jquery实现jsonp
源代码参考文件jsonp-js.html
``` javascript
	// 首先引入jquery.js
	<script src="./js/jquery.js"></script>
	<script>
		$(function(){
			$("#inp1").on('input',function(){
				$.ajax({
					url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
					data:{
						wd:$('#inp1').val()
					},
					// 下面的两个对象为必填
					dataType:'jsonp',
					jsonp:'cb',
					success(json){
						console.log(json.s)
						$("#ullist").html('');
						json.s.forEach(str =>{
							$('<li>'+str+'</li>').appendTo("#ullist");
						})
					},
					error(){
						alert('error')
					}
				})
			})
			
		})
	</script>
```

## 使用node服务器写一个jsonp后端接口
代码参考文件jsonp_server.js
``` javascript
var http = require("http");
var url = require("url");
let server = http.createServer(function(req,res){
	let {pathname, query} = url.parse(req.url, true);
	let {a, b, callback} = query;
	res.write(`${callback}(${parseInt(a)+parseInt(b)})`);
	res.end();
}).listen(8088)
```
前端页面文件nodeserver_jsonp.html
``` bash
	<script type="text/javascript">
		function show(json){
			alert(json)
		}
	</script>
	<script>
		window.onload = function(){
			var oInput = document.querySelector("#inp1")
			var oUl = document.querySelector("#ullist")

			oInput.onclick = function(){
				// 创建script标签
				let oS = document.createElement("script");
				// 把回调方法定义为callback
				oS.src = `http://localhost:8088?a=50&b=60&callback=show`

				document.head.append(oS)
			}
		}
	</script>
```

``` html
	<input type="button" id="inp1" value="计算">
```





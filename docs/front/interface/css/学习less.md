---
title: 学习less
date: 2019-03-24 09:20:03
categories: 前端开发
tags: 
  - less 前端预处理语言 样式
permalink: /pages/633343/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
## css的预处理语言，可以理解成是对css的一层封装，但最终less代码还是要编译成css，浏览器不认识less。
使用less的方法
* 直接引用less文件，并且引入less.min.js文件做编译
* 借助一下工具将less转为css
* 使用node进行编译 首先安装node install -g less@latest，然后使用lessc命令对less文件编译

## less嵌套写法 嵌套
``` css
nav{
	height:500px;
	.content{
		width:1200px;
		height:600px;
		margin:0 auto;
		a{
			color:#fee;
			&:hover{
				color:#e33;
			}
		}
		.left{
			float:left;
		}
		.right{
			float:right;
		}
	}
}
```

## less的变量 
变量允许定义一套通用的样式，在需要的时候直接调用变量，以便后期做调整修改
@width:12px;
.border{
	width:@width;
}

## 混合，可以把定义好的classA应用到classB上
``` css
.classA{
	border:1px solid #eee;
}
.classB{
	.classA
}
```
清除浮动样式的混合使用
``` css
.clearFix{
	*zoom:1;
	&:after{
		content:'';
		display:block;
		clear:both;
	}
}
.classA{
	.clearFix
}

```
带参数的混合
``` css
.border(@color){
	border:1px solid @color;
}
.box1{
	.border(#f33);
}
.box2{
	.border(#33f);
}
```
带默认值的参数混合
``` css
.border(@width:1px,@style:solid){
	border:@width @style #033;
}
.box1{
	.border(2px);
}
.box2{
	.border();
}
.box3{
	.border(1px,dotted)
}
```
根据不同模式的匹配混合
``` css
.border(top,@width:1px){
	border-top:@width solid #333;
}
.border(left,@width:1px){
	border-left:@width solid #333;
}
.box1{
	.border(top);
}
.box2{
	.border(left,2px)
}
```
## less文件的互相调用
``` css
@import "global.less"
```
## less避免编译
``` css
@rem:32rem;
.box{
	width:@rem;
	font:(12/@rem)~'/'(24/@rem) '宋体'
}
```
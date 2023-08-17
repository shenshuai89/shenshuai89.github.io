---
title: exports和module.exports以及export的区别
date: 2018-01-21 21:20:54
categories: 前端开发
tags: 
  - JavaScript
permalink: /pages/750c26/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

>> exports和module.exports属于CommonJs规范，export属于Es6定义

## CommonJS(exports和module.exports)模块规范
NodeJs使用的是CommonJs规范，根据这个规范每个js文件就是一个模块，有自己的作用域。
在一个文件内部定义的变量，函数，类都是私有的，其他文件看不到。

exports对象是module.exports的引用。
关于引用可以使用下面的例子来解释清楚：
ECMAScript的变量值类型共有两种;
基本类型(primitive values):包括undefined,null,boolean,number,string五种基本类型。
引用类型(reference values):保存在内存中的对象，不能直接操作，只能通过保存在变量的地址引用对其进行操作。
exports和module.exports属于object类型，属于引用类型。
``` js
var module = {
	exports:{
		name:"I am module exports"
	}
};
var exports = module.exports;// exports是对module.exports的引用，就是说exports指向的内存地址和module.exports指向的内存地址一样。
console.log(module.exports); //{name:'I am module exports'}
console.log(exports); //{name:'I am module exports'}

exports.name = "change name";
console.log(module.exports); //{name:'change name'}
console.log(exports); //{name:'change name'}
**由此可见，exports和module.exports是引用的同一块内存地址**
//如果重新定义一个对象，将exports的引用指向重新定义的对象
var newObj = {
	name:"this is new Object",
	func:function(x){
		return x*x;
	}
};
exports = newObj;//这时newObj这个Object在内存中指向了新的地址，所以exports也指向了这个新地址，和原来的module.exports对象内存地址没有任何关系。
console.log(module.exports);//{name:'change name'}
console.log(exports);//{name:'this is new Object',function:[Function]}
``

回到nodeJs中，module.exports初始的时候置为{},exports也指向这个空对象。
下面的写法，作用是一样的
``` js
exports.name = function(x){
	console.log(x)
};
module.exports.name = function(x){
	console.log(x)
};
```
但是如果按照下面的写法，效果就不同
``` js
exports = function(x){
	console.log(x)
};
//上面的function是一块新的内存地址，导致了exports和module.exports不存在任何关系，而require下看到的只有module.exports这个对象，看不到exports对象，所以这样写是有问题是无法导出的。

//下面的这个写法是可以导出，module.exports除了导出对象、函数，还可以导出所有的类型，如字符串，数值，布尔...
module.exports = function(x){
	console.log(x)
}
```

## Es6(export)模块规范
不同于commonJs，Es6使用export和import来导入导出模块
``` js
//info.js
var firstName = "Michael";
var lastName = "jackson";
var year = 1958;
export {firstName, lastName, year};
```

需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
``` js
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

### export default
使用export default命令，为模块指定默认输出,一个文件只能有一个默认输出
``` js
export default function () {
  console.log('foo');
}
```







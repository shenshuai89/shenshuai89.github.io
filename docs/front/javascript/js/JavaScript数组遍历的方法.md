---
title: JavaScript数组遍历方法
date: 2017-04-19 20:14:20
categories: 前端开发
tags: 
  - JavaScript
description: 关于数组Array遍历的方法
permalink: /pages/87fdf8/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

## 数组Array遍历方法概述

* forEach() 方法对数组的每一个元素执行一次提供的函数。

* map() 方法创建一个新数组，其结果是该数组都执行一次函数，原函数保持不变。

* filter() 方法使指定函数测试数组中的每一个元素，并返回一个由通过判断的元素组成的新数组。

* some() 方法测试该数组有元素通过了指定函数的测试，如果有返回true，否则，返回false。

* every() 方法测试该数组是否全部通过指定函数测试，全部通过返回true，否则，返回false。

* reduce() 方法将数组中的元素进行累加

## 不产生新数组的迭代方法

### forEach()
对数组的每一个元素执行一次提供的函数
``` javascript
	var arr = [1,2,3,99];
	var newArr = arr.forEach(function(item){
		console.log(item+9);
	})
	console.log("arr",arr)
```

### some()
返回真(true)假(false)
``` javascript
	var arr = [1,13,66,99,120];
	arr.some(function(item){
		return item > 100;
	})
	// 执行结果返回true
```

### every()
返回真(true)假(false)
``` javascript
	var arr = [1,13,66,99,120];
	arr.every(function(item){
		return item >100;
	})
	// 执行结果返回false
```


## 产生新数组的迭代方法
### map()
创建一个新的数组，其结果是该数组的每个元素都执行一次函数，原数组保持不变。和forEach类似。

``` javascript
	var arr = [1,2,3,99];
	var newArr = arr.map(function(item,index){
		console.log("item",item);
		console.log("index",index);
		return item+9
	})
	console.log(newArr)

```

### filter()
返回一个由满足指定函数限制条件的元素组成的数组
``` javascript
	var arr = [1,13,66,99,120];
	var newArr = arr.filter(function(item,index){
		return item >50;
		})
	console.log("arr",arr)
	console.log("newArr",newArr)
```

## 计算出最后一个结果
### reduce()
让数组中的元素前一项和后一项做某种计算，返回一个结果
``` javascript
	var arr = [1,13,66,99,120];
	var result = arr.reduce(function(prev, next){
		return prev + next;
		})
	console.log("result",result)
	// result 299
```

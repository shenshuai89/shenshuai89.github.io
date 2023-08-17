---
title: vue基础介绍，数据绑定(一)
date: 2019-6-18
categories: 前端开发
tags: 
  - vue 前端 框架
permalink: /pages/b887e2/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---
*  [第一篇：vue基础介绍，数据绑定(computed+watch)](http://www.shenshuai.me/2019/06/18/vue基础入门一方法和数据/)
*  [第二篇：vue样式class和style](http://www.shenshuai.me/2019/06/20/vue样式class和style)
*  [第三篇：vue组件及生命周期](http://www.shenshuai.me/2019/06/22/vue组件及生命周期)
*  [第四篇：vue父子组件之间的数据传递](http://www.shenshuai.me/2019/06/24/vue父子组件之间的数据传递/)
*  [第五篇：vue动画与过渡](http://www.shenshuai.me/2019/06/26/vue动画与过渡/)
*  [第六篇：vue-router路由的使用](http://www.shenshuai.me/2019/06/28/vue-router路由的使用/)
*  [第七篇：vuex数据管理](http://www.shenshuai.me/2019/06/30/vuex数据管理/)

## Vue介绍
#### Vue和传统的DOM开发的区别
> ​		在传统的开发模式中，jQuery框架等，前端开发的主要思想是对dom的操作，就jq而言，有着非常优秀的dom选择技巧，例如：$("#id"),$(".class"),$("p:first-child"),$("div>p"),$("div p"),$("div+p")。可以非常精准的选择到每一个dom标签，并且做到各个浏览器的兼容，这也是前些年jq流行的根基。
> ​		到了后期就会碰到一些性能问题，由于前端数据量非常大，有一个数据更新时，就会刷新整个页面的dom树结构。对dom操作的前端开发模式受到限制，此时，基于数据驱动的前端开发应运而生。整个web页面是一个dom树，基于数据开发的思想是dom只在第一次进行布局设定，后边有新数据更新只用调整数据，不刷新整体页面的dom结构。

Vue.js 的核心优势是一个允许采用简洁的模板Mustache语法来声明式地将数据渲染进 DOM 的系统，vue支持组件化开发。
``` js
<div id="app">
  {{ message }}
</div>
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

#### Vue与(react和angular)的区别
[vue和react的详细对比可以查看另一篇文章](http://www.shenshuai.me/2018/08/22/React%20%E4%B8%8E%20Vue%20%E5%88%9B%E5%BB%BA%E5%90%8C%E4%B8%80%E6%AC%BE%20App%E7%9A%84%E5%AF%B9%E6%AF%94/)

vue和angular的对比

**不同点**

* vue是一个ui框架，只负责构建用户界面。如果做一个大型的应用需要配合vue-router和vuex使用。比angular更加小巧。

* vue有组件化概念，angular中没有

* vue使用虚拟DOM Virtual DOM

**相同点**
* 都有指令的定义，vue用v-xxx，angular用ng-xxx
* 都可以数据绑定，支持双向数据绑定

vue更像是建筑过程的一块砖，要构建大型的工程还需配合钢筋还有水泥等。而angular更像是一个已经建筑好的宫殿，一切结构都支持，我们只需要在里面完成需要的‘表演’。vue相对来说使用上更加方便简洁，上手更快。

## Vue数据处理
#### Vue的模板语法
数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：
``` js
<span>Message: {{ msg }}</span>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
<div>{{ ok ? 'YES' : 'NO' }}</div>
<p>{{ message.split('').reverse().join('') }}</p>

```
#### Vue的指令
指令 (Directives) 是带有 v- 前缀的特殊特性。
Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v- 指令：

``` js
<div v-bind:id="dynamicId"></div>
<p v-if="seen">现在你看到我了</p>
<p v-if-else="seen">现在你看到我了</p>
<ul><li v-for="(item,index) in items" :key="index">{{item}}</li></ul>
<p v-show="seen">现在你看到我了</p>
<input v-model="username" type="text" />
<a v-on:click="doSomething">...</a>
```
**v-if和v-show的区别**
他们都可以控制元素的显示和隐藏，v-if是直接删除掉dom结构，显示的时候在添加dom出来。v-show只是控制dom元素的css属性display的none和block。v-show 的性能要高于v-if。


#### Vue观察属性watch

watch可以监听到数据的实时变化,watch是一个属性，按照json的语法，要用watch:{}

``` js
<template>
    <div>
        <input type="text" v-model="myValue" >
     </div>
</template>
<script>
data (){
    return {
          myValue: ''
     }
}
watch: {
    myValue(newValue, oldValue){
          console.log(newValue);
          console.log(oldValue);
     }
}
</script>
```

watch观察者属性里面监听的数据是在data中定义的数据，必须在data中先定义。

可以实时监测到数据的更新和变化。

**如果是监听一个对象下的所有属性值的变化，则使用**
- handler方法

- deep属性,深度监听对象内部的所有属性

- immediate属性,立即执行结果

```js
data (){
    return {
          myValue: {
              name:"",
              age:16 ,
              firstName: 'Dawei',
    		  lastName: 'Lou',
    		  fullName: ''
          }
     }
}
watch: {
    myValue:{
          handler( newValue, oldValue ){
          	console.log(newValue);
          	console.log(oldValue); 
          },
          deep:true
     },
    firstName: {
        handler(newName, oldName) {
          this.fullName = newName + ' ' + this.lastName;
        },
    	// 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法，如果设置了false，那么效果和上边例子一样
    	immediate: true
  }
}
```

#### Vue计算属性computed
模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。
~~在模板中放入太多的逻辑会让模板过重且难以维护。~~
任何复杂逻辑，你都应当使用计算属性。

``` html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

```
``` js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```
当 message 发生改变时，所有依赖 reversedMessage 的绑定也会更新。
计算属性是有缓存的，当页面中**多次**使用reversedMessage的时候，都是从缓存中读取，只需计算一次即可。只要所依赖的数据message没有变化，reversedMessage的缓存就不会改变。

<u>watch观察者属性通常结合input表单做实时数据的检查。
computed计算属性，通常是对data中现存的数据做其它的格式处理的操作。</u>


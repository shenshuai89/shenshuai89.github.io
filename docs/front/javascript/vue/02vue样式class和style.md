---
title: vue样式class和style(二)
date: 2019-6-20
categories: 前端开发
tags: 
  - vue 前端 框架
permalink: /pages/824099/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
*  [第一篇：vue基础介绍，数据绑定(computed+watch)](https://shenshuai89.github.io//2019/06/18/vue基础入门一方法和数据)
*  [第二篇：vue样式class和style](https://shenshuai89.github.io//2019/06/20/vue样式class和style)
*  [第三篇：vue组件及生命周期](https://shenshuai89.github.io//2019/06/22/vue组件及生命周期)
*  [第四篇：vue父子组件之间的数据传递](https://shenshuai89.github.io//2019/06/24/vue父子组件之间的数据传递/)
*  [第五篇：vue动画与过渡](https://shenshuai89.github.io//2019/06/26/vue动画与过渡/)
*  [第六篇：vue-router路由的使用](https://shenshuai89.github.io//2019/06/28/vue-router路由的使用/)
*  [第七篇：vuex数据管理](https://shenshuai89.github.io//2019/06/30/vuex数据管理/)

#### Vue绑定html class
在绑定对象是class的时候，表达式结果的类型出了字符串外还可以是对象或数组。
##### 对象语法
``` html
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
```
```js
data: {
  isActive: true,
  hasError: true
}
```
渲染结果：<div class="active text-danger"></div>
绑定的对象可以在data中详细定义，也可以在计算属性中定义。
``` js
<div v-bind:class="classObject"></div>

data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```
计算属性中返回的对象
``` js
<div v-bind:class="classObject"></div>

data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

##### 数组语法
可以给绑定的class后添加一个数组
``` js
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
数组内放的是data数据对象。

数组可以根据条件切换列表中的 class，可以用三元表达式：
``` html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：
``` html
<div v-bind:class="[{ activeClass: isActive }, errorClass]"></div>
```

> 对象语法中，类名class在前，后边是判断。数组语法中，变量在前，后边跟的是类名。数组中可以再次放对象。**对象名(类名)在前，数组数(数据)在前**

#### Vue添加style样式

##### 对象语法
v-bind:style的对象语法和css语法类似。因为这里的style是js对象，所以属性要写成驼峰式。
``` js
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data:{
    activeColor:'red',
    fontSize:30
}
```
使用直接绑定一个样式对象，把样式信息数据写在data中，这样可以让模板更加清晰
``` js
<div v-bind:style="styleObject"></div>
data:{
    styleObject:{
          color:"red",
          fontSize:"12px"
     }
}
```
##### 数组语法
数组语法可以将**多个样式对象**应用到一个元素上.
``` js
<div v-bind:style="[styleObject,baseStyles]"></div>
data:{
    styleObject:{
          color:"red",
          fontSize:"12px"
     },
    baseStyles:{
          fontSize:"18px";
          margin:"0px",
          padding:"0px"
     }
}
```

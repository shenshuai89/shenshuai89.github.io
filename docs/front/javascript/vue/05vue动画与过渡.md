---
title: vue动画与过渡(五)
date: 2019-6-26
categories: 前端开发
tags: 
  - vue 前端 框架
permalink: /pages/93e029/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
*  [第一篇：vue基础介绍，数据绑定(computed+watch)](https://shenshuai89.github.io//2019/06/18/vue基础入门一方法和数据/)
*  [第二篇：vue样式class和style](https://shenshuai89.github.io//2019/06/20/vue样式class和style)
*  [第三篇：vue组件及生命周期](https://shenshuai89.github.io//2019/06/22/vue组件及生命周期)
*  [第四篇：vue父子组件之间的数据传递](https://shenshuai89.github.io//2019/06/24/vue父子组件之间的数据传递/)
*  [第五篇：vue动画与过渡](https://shenshuai89.github.io//2019/06/26/vue动画与过渡/)
*  [第六篇：vue-router路由的使用](https://shenshuai89.github.io//2019/06/28/vue-router路由的使用/)
*  [第七篇：vuex数据管理](https://shenshuai89.github.io//2019/06/30/vuex数据管理/)

## 单元素/组件的过渡
> Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

* 条件渲染 (使用 v-if)
* 条件展示 (使用 v-show)
* 动态组件
* 组件根节点

``` 
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave {
  opacity: 1;
}
```
### 过渡的类名
* v-enter：**进入的开始状态**。在元素被插入之前生效，在元素被插入之后的下一帧移除。

* v-enter-active：**进入过渡状态**在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

* v-enter-to: **进入的结束状态。**在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

* v-leave: **离开的开始状态**。在离开过渡被触发时立刻生效，下一帧被移除。

* v-leave-active：**离开过渡状态。**在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

* v-leave-to: **离开的结束状态。**在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

< transition name="my-transition">
**my-transition-enter**
以上所有过渡类名，都是name设置的属性，把v替换成name的值

## vue动画

### animate.css 动画
可以引入第三方css动画类库Animate.css
在head标签中添加引用：
``` 
<link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.5.2/animate.min.css">
```

结合transition定义进入的类名：enter-active-class，离开的类名：leave-active-class

``` 
<transition enter-active-class="animated slideInDown"
            leave-active-class="animated fadeOutDownBig">
   <div v-show="show">animation</div>
</transition>
```
[Demo示例：](https://jsfiddle.net/shenshuai/69ejng05/)

### css关键帧keyframe 动画
vue也可以配合css3的keyframe设置动画。
同样使用transition并且添加name
``` 
<transition name="animate">
    <button @click="toggle">show toggle</button>
    <div v-show="show">animation</div>
</transition>
```
添加css3动画设置
``` 
.animate-enter-active {        
  animation: scale-in .5s;
}
.animate-leave-active {        
  animation: scale-in .5s reverse;  
}
@keyframes scale-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
```
[Demo示例：](https://jsfiddle.net/shenshuai/v0y3grpq/)

### Velocity.js 的动画
Vue中的 Js 动画与 Velocity.js 的结合
首先设置transition属性
```
<transition @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @before-leave="handleBeforeLeave"
    @leave="handleLeave"
    @after-leave="handleAfterLeave">
    <div v-show="show">animation</div>
</transition>
```
设置动画事件
```
new Vue({
  el: "#app",
  data () {
    return {
      show: true
    }
  },
  methods: {
    toggle () {
      this.show = !this.show;
    },
    handleBeforeEnter: function(el) {
      el.style.opacity = 0;
    },
    handleEnter: function(el, done) {
      Velocity(el, {opacity: 1,fontSize:20}, {duration: 2000, complete: done});
    },
    handleAfterEnter: function(el) {
      console.log('动画enter结束');
    },
    handleBeforeLeave: function(el) {
      el.style.opacity = 1;
    },
    handleLeave: function(el, done) {
      Velocity(el, {opacity: 0,fontSize:12}, {duration: 2000, complete: done});
    },
    handleAfterLeave: function(el) {
      console.log('动画leave结束');
    }
  }
```
[Demo示例：](https://jsfiddle.net/shenshuai/4cvfqabp/)
### 封装vue中的动画组件
由于动画的设置过于繁琐复杂，定义太多过程。基于vue可以组件化开发，可以把需要的动画封装成组件。
封装动画组件，和一般定义组件一样，只用暴露出控制显示或隐藏的属性。
```
<div id="app">
  <button @click="handleClick">toggle</button>
  <fade :show="show">
    <div>hello transition</div>
  </fade>
</div>
```
然后在js中定义fade组件
```
Vue.component('fade', {
  props: ['show'],
  template: `
    <transition @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @before-leave="handleBeforeLeave"
      @leave="handleLeave">
      <slot v-if="show"></slot>
    </transition>
    `,
  methods: {
    handleBeforeEnter: function(el) {
      el.style.opacity = 0;
    },
    handleEnter: function(el) {
        el.style.opacity = 1;
        el.style.transition = "all 1s";
    },
    handleBeforeLeave: function(el) {
      el.style.opacity = 1;
    },
    handleLeave: function(el) {
      el.style.opacity = 0;
      el.style.transition = "all 2s";
    }
  }
})
new Vue({
  el: "#app",
  data: function () {
    return {
      show: true
    }
  },
  methods: {
    handleClick: function () {
      this.show = !this.show;
    }
  }
});
```
[Demo示例：](https://jsfiddle.net/shenshuai/0qgx1f8e/)

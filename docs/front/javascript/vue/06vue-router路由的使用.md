---
title: vue-router路由的使用(六)
date: 2019-6-28
categories: 前端开发
tags: 
  - vue 前端 框架
permalink: /pages/20e149/
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

## Vue-router路由基础

问：路由是个什么东西？
答：路由是一个根据不同指令，进入到不同(道路)的控制中心。就像是家庭中安装的路由器，可以将每一台连接路由器的电脑分配一个不同的局域网IP。路由就像水管管道，进行筛选。
vue中的路由作用：在构建单页面应用中，用于切换不同的页面组件。通过匹配不同的url地址展示不同的内容和页面。实质上还是一个单页应用，页面切换不会发送服务端请求(主要指页面DOM请求)。包含的主要功能有：
* 嵌套的路由/视图表
* 模块化的、基于组件的路由配置
* 路由参数、查询、通配符
* 基于 Vue.js 过渡系统的视图过渡效果
* 细粒度的导航控制
* 带有自动激活的 CSS class 的链接
* HTML5 历史模式或 hash 模式，在 IE9 中自动降级
* 自定义的滚动条行为


### 单页面路由的优缺点
**优点：**体验好，不需要每次从服务器获取全部，快速展现给用户；

**缺点：**不利于SEO；使用浏览器的前进，后退键的时候会重新发送请求，没有合理的利用缓存；单页面无法记住之前滚动的位置，无法在前进和后退的时候记住滚动的位置。

### Vue-router跳转核心
主要是定义两个标签router-link和router-view，
* router-link用来做导航，相当于html的a标签，点击后可以跳转。
* router-view用来显示路由匹配到的组件
* 使用编程式的导航路由this.$router.push("/about")
``` 
<div>
  <router-link to="/foo">Go to Foo</router-link>
  <router-link to="/bar">Go to Bar</router-link>
  <div @click="$router.push('/about')">Go to About</div>
  <router-view></router-view>
</div>
```

### 脚手架中vue-router的安装
```
	npm install --save vue-router
```
在项目中创建一个router.js
```
import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue"
Vue.use(Router);

export default new Router({
	routes:[
	{
		path:"/",
		name:"home",
		component:Home
	}
	]
})
```

然后可以在main.js中引用
```
import router from "./router.js";

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

### 动态路由匹配
在项目开发中，经常会碰到一些固定格式的路径url地址，只有最后的地址不同。如
https://www.xxx.com/user/xiaoming
https://www.xxx.com/user/lilei
https://www.xxx.com/user/xiaohua
https://www.xxx.com/user/xiaoming/list/id2361
https://www.xxx.com/user/xiaoming/list/id6512
我们可以在 vue-router 的路由路径中使用“动态路径参数”来达到这个效果：
对路径参数使用:标记。

```
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:username', component: User }
  ]
})
```
当匹配到一个路由时，参数值会被设置到 this.$route.params，(<a href="#route">关于route和router的区别可以查看</a>)可以在每个组件内使用。于是，我们可以更新 User 的模板，输出当前用户的 ID：{{this.$route.username}}
路由中也可设置多段“路径参数”，对应的值都会设置到 $route.params 中。
| 模式	| 匹配路径	| $route.params |
| :-----: |  :-----: | :-----: |
| /user/:username	| /user/evan	| { username: 'evan' } |
| /user/:username/post/:post_id	| /user/evan/post/123	| { username: 'evan', post_id: '123' } |

除了 $route.params 外，$route 对象还提供了其它有用的信息，
* $route.query: 对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象。
* $route.hash :当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串。
* $route.name : 当前路由的名称，如果有的话,需要结合命名路由，给router的routes设置name。

#### 页面响应路由参数的变化
路由参数的变化，原组件实质上是被复用，因为两个路由渲染同个组件，复用比销毁重建更加高效。这样会造成原流程的生命周期created，mounted，destoryed等阶段不会被触发。
复用组件时，想对路由参数的变化作出监听的话，有两种方式：

``` 
// 方法一 导航守卫
beforeRouteUpdate(to, from, next){
	console.log("页面路由参数发生了变化");
	next();
}
// 方法二  watch监听route值的变化
watch:{
	$route(to, from){
	// 对路由变化作出响应...
		console.log("页面路由参数发生了变化");
	}
}
```

#### 捕获所有路由或 404 Not found 路由
常规参数只会匹配被 / 分隔的 URL 片段中的字符。如果想匹配任意路径，我们要使用通配符 (\*)：
```
    {
      // 会匹配所有路径
      path: '*'
    }
    {
      // 会匹配以 `/user-` 开头的任意路径
      path: '/user-*'
    }
```
当使用通配符路由时，通常需要放置在最后。路由 { path: '\*' } 通常用于设置客户端 404 错误。

使用通配符时，$route.params内会自动添加一个pathMatch的参数，该参数可以显示被通配符匹配到的部分。

```
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```
###  嵌套路由
嵌套路由的使用场景是:一个主菜单下，经常会有一些小栏目的子菜单，这时候就需要设置子路由。
如新闻，下面设有热门新闻和最近新闻。
在页面设置子路由导航的代码
```
<div id="app">
    <ul>
        <li><router-link to="/">home</router-link></li>
        <li><router-link to="/news">news</router-link></li>
        <ol>
            <li><router-link to="/news/hot">hotNews</li>
            <li><router-link to="/news/latest">latestNews</li>
        </ol>
        <li><router-link to="/info">info</router-link></li>
    </ul>
    <router-view><router-view>
</div>
```
配置router.js
```
export default new VueRouter({
    mode: 'history',
    base : __dirname,
    routes:[
          {path:'/', component:Home},
          {path:'/news', component:News,
          //在子路由的children中path不能设置/，否则会被当做跟路由渲染
            children: [
                {path: ' ', component:News},
                {path: 'hot', component:Hot},
                {path: 'latest', component:Latest}
             ]},
          {path:'/info', component:Info}
     ]
})
```
### 命名路由和命名视图
#### 命名路由
在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。
```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```
要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：
```
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

#### 命名视图
有时想同级展示多个视图，如侧边栏，和内容区。就可以设置多个router-view，给每个router-view设置name，没有设置name的，默认值为default
```
<router-view></router-view>
<router-view name="a"></router-view>
<router-view name="b"></router-view>
```
一个视图使用一个组件渲染,多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：
```
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```
### 路由组件传参
在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
使用 props 将组件和路由解耦：
```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const Book = {
  props: ['id'],
  template: '<div>Book {{ id }}</div>'
}
const Comp1 = {
  props: ['id'],
  template: '<div>B {{ id }}</div>'
}
const Comp2 = {
  props: ['id'],
  template: '<div>C {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
  //  布尔模式，如果props设置为true，route.params被设置为组件的属性
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，即有多个router-view，并且设置了name值，你必须分别为每个命名视图添加 `props` 选项：
    // <router-view name="comp1"></router-view>
    // <router-view name="comp2"></router-view>
    {
      path: '/book/:id',
      components: { default: Book, comp1: Comp1,  comp2: Comp2 },
      // Comp1组件可以获取到参数，Comp2组件获取不到参数
      props: { default: true, comp1: true, comp2:false}
    }
  ]
})
```
[示例代码](https://jsfiddle.net/shenshuai/kw4L3on7/)
#### 布尔模式
如果props设置为true，route.params被设置为组件的属性
```
{ path: '/user/:id', component: User, props: true }
```
在User组件中设置props:["id"],页面中可以取到id的值
#### 对象模式
props 是一个对象，它会被按原样设置为组件属性。
```
{ path: '/news/:id', component: News, props: {newValue:false }},
```
这样可以在页面中获取newValue的值
```
export default {
    name:"news",
    props:["id"],
    created(){
      console.log("object",this.$attrs.newValue);
    }
}
```
### 编程式的导航
一般的常规操作是在html的标签中添加router-link标签创建定义导航链接，其实还可以把跳转的指令放到js中。放到js中控制路由跳转，属于编程式导航。
* router.replace(location, onComplete?, onAbort?)

| 声明式 |	编程式 |
|:-----:|:-----:|
| < router-link :to="...">	|router.push(...)|
```
$router.push(location)  //字符串

$router.push({path:'home'})；  // 对象

$router.push({name:'user',params:{userId:123}})；  // 命名的路由

// 带查询参数，变成 /register?plan=private，获取this.$route.query.plan
$router.push({path:'register',query:{plan:'private'}})
```

> 注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：
```
const userId = 123

router.push({ name: 'user', params: { userId }})；    // -> /user/123

router.push({ path: `/user/${userId}` }) ；     // -> /user/123

// 这里的 params 不生效（注意这个例子）
router.push({ path: '/user', params: { userId }}) ；   // -> /user
```
name ---> params
path ----> query

> **注意： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用 beforeRouteUpdate 来响应这个变化 (比如抓取用户信息)。**

* router.replace(location, onComplete?, onAbort?)
| 声明式 |	编程式 |
|:-----:|:-----:|
| < router-link :to="..." replace>	|router.replace(...)|
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟push的方法名一样 —— 替换掉当前的 history 记录。

* router.go(n)
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)

```
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```


### 重定向 和 别名
#### 重定向
重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b：
```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```
重定向的目标也可以是一个命名的路由：
```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```
#### 别名
/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。**相当于a组件有一个另外的名字b，url是/b的时候也访问a组件**
```
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

### 路由的histroy模式

> vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。路由的 history 模式，这种模式充分利用 window.history.pushState API 来完成 URL 跳转而无须重新加载页面。

```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```
不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404
**如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。**

## Vue-router进阶
### 过渡动效
< router-view> 是基本的动态组件，所以我们可以用 < transition> 组件给它添加一些过渡效果：
```
<transition name="defineName">
  <router-view></router-view>
</transition>
```
#### 基于路由的动态过渡
还可以基于当前路由与目标路由的变化关系，动态设置过渡效果：
```
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```
```
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```
### 路由懒加载
1. 结合 Vue 的异步组件和 Webpack 的代码分割功能，实现路由组件的懒加载
第一步：将异步组件定义为返回一个 Promise 的工厂函数
```
const Foo = () => import('./Foo.vue')
```
第二步：在 Webpack 中，我们可以使用动态 import语法来定义代码分块点 (split point)：
```
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
    //或者直接{ path: '/foo', component: () => import('./Foo.vue')}
  ]
})
```

2. 把组件按组分块
把某个路由下的所有组件都打包在同个异步块 (chunk) 中
```
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```
### 导航守卫
vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。
**参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。**
#### 全局的守卫
##### 全局的前置守卫
守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
使用 router.beforeEach 注册一个全局前置守卫
```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
每个守卫方法接收三个参数：

* to: Route: 即将要进入的目标 路由对象
* from: Route: 当前导航正要离开的路由
* next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
确保要调用 next 方法，否则钩子就不会被 resolved
##### 全局的后置钩子
使用 router.afterEach 注册一个全局后置钩子。这个钩子和守卫不同，钩子**不会接受 next 函数**也不会改变导航本身
```
router.afterEach((to, from) => {
  // ...
})
```
#### 路由独享的守卫
可以在路由配置上直接定义 beforeEnter 
```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
#### 组件内的守卫
路由组件内直接定义组件内导航守卫：
beforeRouteEnter
beforeRouteUpdate (2.2 新增)
beforeRouteLeave
```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
### 数据获取
进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：

* 导航完成之后获取：先进页面，后加载数据。在数据获取期间显示“加载中”之类的指示。
* 导航完成之前获取：先加载数据，然后做路由页面跳转

#### 导航完成后获取数据
当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。
假设我们有一个 Post 组件，需要基于 $route.params.id 获取文章数据：
```
<template>
  <div class="post">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
```

``` js
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 解析了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```
#### 先获取数据，后进行路由导航
导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后必须调用 next 方法。
```
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}
```
在获取到数据之前，路由不发生跳转，会一直停留在当前导航界面中。
因此建议在获取数据期间，显示一些进度条或者提示。如果数据获取失败或者用户等级权限不够，同样有必要展示一些全局的错误提醒。

从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。
### 滚动行为
使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置。
vue-router 能做到，它让你可以自定义路由切换时页面如何滚动。
> 注意: 这个功能只在支持 history.pushState 的浏览器中可用
vue-router实例提供了一个scrollBehavior的方法
```
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```
> scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

这个方法返回滚动位置的对象信息：
{ x: number, y: number }
{ selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)
如果返回是一个空对象，那么不会发生滚动。
```
//所有路由导航，简单地让页面滚动到顶部。
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
//返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
//模拟“滚动到锚点”的行为
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```

### <a id="route">vue-router总结 $router和$route区别</a>

>this.$router(整个工程项目对象)是VueRouter的实例方法，当导航到不同url，可以使用this.$router.push方法，这个方法则会向history里面添加一条记录，当点击浏览器回退按钮或者this.$router.back()就会回退之前的url。

>this.$route(当前页面对象)相当于当前激活的路由对象，包含当前url解析得到的数据，可以从对象里获取一些数据，如name,path等。
1、$route对象

$route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。
**1.$route.path**
      字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。
**2.$route.params**
      一个 key/value 对象，包含了 动态片段 和 全匹配片段，
      如果没有路由参数，就是一个空对象。
**3.$route.query**
      一个 key/value 对象，表示 URL 查询参数。
      例如，对于路径 /foo?user=1，则有 $route.query.user == 1，
      如果没有查询参数，则是个空对象。
**4.$route.hash**
      当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。锚点
**5.$route.fullPath**
      完成解析后的 URL，包含查询参数和 hash 的完整路径。
**6.$route.matched**
      数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
**7.$route.name    当前路径名字**
**8.$route.meta  路由元信息

2、$router对象

vue router总结 $router和$route及router与 router与route区别

$router对象是全局路由的实例，是router构造方法的实例。

路由实例方法：$router.push()、$router.go()、$router.replace()等


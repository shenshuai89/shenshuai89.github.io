---
title: vue父子组件之间的数据传递(四)
date: 2019-6-24
categories: 前端开发
tags: 
  - vue 前端 框架
permalink: /pages/68b1c1/
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

## 组件传递数据
###  父传子数据，Prop属性
定义一个组件后，很多时候在调用时希望会有不同的展示效果，如大小、颜色、文字等。这时候我们定义的组件就需要可配置化，由调用者传递给自定义组件的一些属性。这个传递的方法是通过props传递。
定义一个包含props的title-name组件

``` js
Vue.component('title-name', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
title-name组件就可以被多次使用，并且可以设置不同的文字内容。
``` html
<title-name title="My journey with Vue"></title-name>
<title-name title="Blogging   with Vue"></title-name>
<title-name title="Why Vue  is  so fun"></title-name>
```
在实际项目开发中，title很可能是data里面的一个数组
``` js
new Vue({
  el: '#com-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```
此时调用组件需要配合v-for指令
``` html
<title-name
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
></title-name>
```
同样会将title-name组件渲染三次到页面上。

#### Prop 的大小写
由于html中的属性名大小写不敏感，浏览器会把大写转换为小写。当用驼峰命名法定义的prop，在使用时会写成短横线分割命名。
props:["propName"]
<title-name prop-name="将大写转为横线"></title-name>

#### Prop 的类型
每个 prop 都有指定的值类型。可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型：
``` js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```
给属性设置好对象类型后，如果传递的数据不符合类型，会在浏览器的 JavaScript 控制台提示错误信息给用户。
#### Prop 的类型验证
上面可以给prop属性设置对象类型，设置好类型后，还可以设置一个带验证需求的对象。
``` js
props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    }
  }
```
当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。
#### Prop 传递静态或动态数据
prop可以传递一个静态数据也可以传递一个动态的值，动态的值需要用v-bind绑定。
``` html
<!--静态-->
<title-name title="My journey with Vue"></title-name>
<!-- 动态赋予一个变量的值 -->
<title-name v-bind:title="post.title"></title-name>
```
- 传递的是一个数字，也需要用v-bind进行绑定
``` html
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>
```
- 传递的是一个布尔值
``` html
<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>
```
- 传递一个数组
``` html
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>
```
- 传递一个对象
``` html
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>
```

#### 单向数据流
prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。
*<u>如果必须要用props进行数据变形</u>*    可以使用一下两种方法
1.定义一个本地的 data 属性并将这个 prop 用作其初始值：

``` js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```
2.prop 以一种原始的值传入且需要进行转换。使用这个 prop 的值来定义一个计算属性：
``` js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
~~在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。~~

### 监听子组件事件，子给父组件传递数据，emit事件
**子组件comA中触发**
``` html
<div class="comA">
	<button @click="emitMyEvent"></button>
</div>
```
``` js
data(){
    return:{
          hello:"hello every"
     }
},
methods:{
  emitMyEvent(){
    this.$emit('son-event', this.hello) //这里的my-event是父级@调用时的名称
  }
}
```
**在父级view页面中引用**
``` html
<div class="home">
	<comA @son-event="onComAEvent"></comA>
</div>
```
``` js
methods:{
    onComAEvent(parmFromA){
       console.log('on coma event' + parmFromA)   //参数是通过子组件的第二个参数this.hello传递过来
     }
}
```

#### 非父子组件间的通信
EventBus 实现非父子组件通信的原理：
**通过实例化一个Vue对象( 比如bus = new Vue() )作为母线，在组件中通过事件将参数传递出去( bus.$emit(event, [...args]) )，然后在其他组件中再通过bus来监听此事件并接受参数( bus.$on(event, callback) )。**  
> bus.js
``` js
import Vue from 'vue'
const bus = new Vue()
export default bus
```
> Hello.vue
``` vue
<template>
  <div class="hello">
    <h1>参数：{{ number }}</h1>
    <button @click="sendParam()">发送</button>
  </div>
</template>
<script>
import bus from './bus'
export default {
  data () {
    return {
      number: 123
    }
  },
  methods: {
    sendParam () {
      bus.$emit('getParam', this.number)
    }
  }
}
</script>
```

> World.vue
``` vue
<template>
  <div class="hello">
    <h1>接受参数{{ number }}</h1>
  </div>
</template>
<script>
import bus from './bus'
export default {
  data () {
    return {
      number: 0
    }
  },
  created () {
    bus.$on('getParam', param => {
      this.number = param
    })
  },
  beforeDestroy () {
    bus.$off('getParam')
  }
}
</script>
```

> 组件Home.vue
``` vue
<template>
  <div class="home">
    <hello></hello>
    <world></world>
  </div>
</template>

<script>
import Hello from '@/components/Hello'
import World from '@/components/World'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    Hello,
    World
  }
}
</script>
```
共用同一个Vue的实例( new Vue() )，通过此实例进行事件传递参数，在其他组件中监听此事件并且接收参数实现通信。发送数据bus.$emit("brother","兄弟组件传递数据")，接收数据bus.$on("brother",callback)
### 处理边界情况
在开发中，有时候需要对组件进行一些非常规操作，如访问组件内部或修改内部dom等。
> 在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作 DOM 元素。不过也确实在一些情况下做这些事情是合适的。

#### 访问根实例
在每个 new Vue 实例的子组件中，其根实例可以通过 $root 属性进行访问。
``` js
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})
```
**获取根组件的数据**
this.$root.foo

**写入根组件的数据**
this.$root.foo = 2

**访问根组件的计算属性**
this.$root.bar

**调用根组件的方法**
this.$root.baz()

#### 访问父级组件实例
**子组件访问父组件实例**
和 $root 类似，$parent 属性可以用来从一个子组件访问父组件的实例。
但是这样的访问方法只能访问一层父子关系， 当访问多层父子关系的时候，就需要做兼容处理。
``` js
var map = this.$parent.map || this.$parent.$parent.map
```

#### 访问子组件实例或子元素
**父组件访问子组件实例或元素**
> 尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。为了达到这个目的，你可以通过 ref 特性为这个子组件赋予一个 ID 引用

``` vue
<son ref="sonname"> </son>
```
现在在你已经定义了这个 ref 的组件里，你可以使用：
``` js
console.log(this.$refs.sonname);
```
> $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。你应该避免在模板或计算属性中访问 $refs。

#### 依赖注入
**子孙组件访问父组件实例**
由于访问父级组件的数据会出现层级限制问题，$parent属性无法很好的扩展到深层次嵌套组件上。
vue提供了依赖注入，用到了2个新的实例选项: provide和inject

> root组件中

``` html
<div class="root">
    这是root根组件
    <p>这是root组件中的rootA{{rootA}}</p>
    <button @click="changeRootA">点击</button>
    <slot></slot>
  </div>
```
``` js
<!--------------------------------->
  data () {
    return {
        rootA:"rootA",
        rootNum:{
            a:10
        }
    };
  },
  provide(){
      return{
        rootA:this.rootA,
        rootNum: this.rootNum,
        rootFun:this.rootFun
    }
  }
```
> father组件中
``` js
<div class="father">
    这里是father父组件
    <p>这是从root组件的provide中获取的数据rootA:{{rootA}}</p>
    <p>这是从root组件的provide中获取的数据rootNum:{{rootNum}}</p>
    <b>{{$parent.rootA}}</b>
    <slot></slot>
  </div>
<!--------------------------------->
inject:["rootA","rootNum","rootFun"],
```
> son组件中
``` js
 <div class="son">
    这里是son儿组件
    <p>这是从root组件的provide中获取的数据rootA:{{rootA}}</p>
    <p>这是从root组件的provide中获取的数据rootNum:{{rootNum}}</p>
    <slot></slot>
  </div>
<!--------------------------------->
inject:["rootA","rootNum","rootFun"],
```
> App组件中
``` jsx
<Root>
    <Father>
        <Son>
        	<Grandson></Grandson>
        </Son>
    </Father>
</Root>
```
> 依赖注入有负面影响的。提供的是非响应式的数据。

可参考[代码示例](https://github.com/shenshuai89/vue-yilaizhuru)
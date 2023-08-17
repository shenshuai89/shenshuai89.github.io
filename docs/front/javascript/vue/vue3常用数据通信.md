---
title: vue3常用8种数据通信
date: 2022-10-13 23:21:45
permalink: /pages/898320/
tags: 
  - vue3 
  - 数据通信
  - provide/inject
  - $attrs
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---
## vue3 数据通信的方式
文章是全部采用的 script setup 这种组合式API写法。
相对于选项式来说，组合式API这种写法更加自由。具体可以参考Vue文档对两种方式的描述
将介绍如下8种组件通信方式：
- props
- emit
- v-model
- refs
- provide/inject
- $attrs
- eventBus
- vuex/pinia(状态管理工具)
## Props属性传值
Props方式是Vue中最常见的一种父传子的一种方式。将数据以及对数据的操作定义在父组件，子组件仅做列表的一个渲染；

``` vue
<template>
<!-- 子组件 -->
<child-components :list="list"></child-components>
<!-- 父组件 -->
<div class="child-wrap input-group">
  <input
         v-model="value"
         type="text"
         class="form-control"
         placeholder="请输入"
         />
  <div class="input-group-append">
    <button @click="handleAdd" class="btn btn-primary" type="button">
      添加
  </button>
  </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import ChildComponents from './child.vue'
  const list = ref(['JavaScript', 'HTML', 'CSS'])
  const value = ref('')
  // add 触发后的事件处理函数
  const handleAdd = () => {
    list.value.push(value.value)
    value.value = ''
  }
</script>
```
子组件只需要对父组件传递的值进行渲染

``` vue
<template>
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in props.list" :key="i">{{ i }}</li>
  </ul>
</template>
<script setup>
// import { defineProps } from 'vue'
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>
```

## emit发送事件
emit方式也是Vue中最常见的组件通信方式，该方式用于**子传父**
将列表定义在父组件，子组件只需要传递添加的值

子组件
``` vue
<template>
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleSubmit" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
const value = ref('')
const emits = defineEmits(['add'])
const handleSubmit = () => {
  emits('add', value.value)
  value.value = ''
}
</script>
```
在子组件中点击【添加】按钮后，emit一个自定义事件，并将添加的值作为参数传递。
父组件
``` vue
<template>
  <!-- 父组件 -->
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in list" :key="i">{{ i }}</li>
  </ul>
  <!-- 子组件 -->
  <child-components @add="handleAdd"></child-components>
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
// add 触发后的事件处理函数
const handleAdd = value => {
  list.value.push(value)
}
</script>
```
在父组件中只需要监听子组件自定义的事件，然后执行对应的添加操作。

## v-model
v-model是Vue中一个比较出色的语法糖，就比如下面这段代码
``` vue
<ChildComponent v-model:title="pageTitle" />
```

是下面这段代码的简写形势
``` vue
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```
v-model确实简便了不少
``` vue
<template>
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleAdd" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps } from 'vue'
const value = ref('')
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
const emits = defineEmits(['update:list'])
// 添加操作
const handleAdd = () => {
  const arr = props.list
  arr.push(value.value)
  emits('update:list', arr)
  value.value = ''
}
</script>
```
在子组件中我们首先定义props和emits，然后添加完成之后emit指定事件。
> 注：update:*是Vue中的固定写法，*表示props中的某个属性名。
父组件中使用就比较简单

``` vue
<template>
  <!-- 父组件 -->
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in list" :key="i">{{ i }}</li>
  </ul>
  <!-- 子组件 -->
  <child-components v-model:list="list"></child-components>
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
</script>
```
## refs
在使用选项式API时，我们可以通过this.$refs.name的方式获取指定元素或者组件，但是组合式API中就无法使用哪种方式获取。如果我们想要通过ref的方式获取组件或者元素，需要定义一个同名的Ref对象，在组件挂载后就可以访问了。
父组件
``` vue
<template>
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in childRefs?.list" :key="i">
      {{ i }}
    </li>
  </ul>
  <!-- 子组件 ref的值与<script>中的保持一致 -->
  <child-components ref="childRefs"></child-components>
  <!-- 父组件 -->
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const childRefs = ref(null)
</script>
```

子组件
``` vue
<template>
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleAdd" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineExpose } from 'vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
const value = ref('')
// add 触发后的事件处理函数
const handleAdd = () => {
  list.value.push(value.value)
  value.value = ''
}
defineExpose({ list })
</script>
```
setup组件默认是关闭的，也即通过模板ref获取到的组件的公开实例，不会暴露任何在[script setup]中声明的绑定。如果需要公开需要通过defineExpose API暴露。

## provide/inject
provide和inject是Vue中提供的一对API，该API可以实现父组件向子组件传递数据，无论层级有多深，都可以通过这对API实现。

``` vue
<template>
  <!-- 子组件 -->
  <child-components></child-components>
  <!-- 父组件 -->
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleAdd" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, provide } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
const value = ref('')
// 向子组件提供数据
provide('list', list.value)
// add 触发后的事件处理函数
const handleAdd = () => {
  list.value.push(value.value)
  value.value = ''
}
</script>
```
子组件
``` vue
<template>
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in list" :key="i">{{ i }}</li>
  </ul>
</template>
<script setup>
import { inject } from 'vue'
// 接受父组件提供的数据
const list = inject('list')
</script>
```
> 值得注意的是使用provide进行数据传递时，尽量readonly进行数据的包装，避免子组件修改父级传递过去的数据

## $attrs
- 当前组件里没有将某个属性指定为 props，那么父组件绑定下来的属性值，都会进入到 attrs 里，通过这个新 API 来拿到。
- 该API也可以将父组件的多个属性传递个子孙组件中。相比provide不用一一注册设置。

- 在父组件中，给ChildComponents传递list和name属性。
``` vue
<template>
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      class="form-control"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleAdd" class="btn btn-primary" type="button">
        添加
      </button>
    </div>
  </div>
  <ChildComponents :list="list" name="appVue"></ChildComponents>
</template>
<script setup>
import { ref } from "vue";
import ChildComponents from "./components/Child.vue";
const value = ref("");
const list = ref(['JavaScript', 'HTML', 'CSS'])

const handleAdd = ()=>{
  list.value.push(value.value)
  value.value = ''
}
</script>
```

- 子组件可以通过useAttrs接收到list和name，也可以使用defineProps接收。
``` vue
<template>
  <div>
    <ul class="parent list-group">
      <li class="list-group-item" v-for="i in list" :key="i">{{ i }}</li>
    </ul>
    <grandChild v-bind="$attrs"></grandChild>
  </div>
</template>
<script>
export default {
  // 控制属性不被显示在组件的跟节点div上
  inheritAttrs: false,
};
</script>
<script setup>
import grandChild from "./grandChild.vue";
import { useAttrs } from "vue";
const { list } = useAttrs();
</script>
```

- 孙子组件中使用useAttrs可以接收到name属性，该属性并没在子组件显示，也可以直接获取到。
``` vue
<template>
    <div>
        {{name}}
    </div>
</template>
<script setup>
import {useAttrs} from "vue";
const {name} = useAttrs();
</script>
``` 

## eventBus
Vue3中移除了事件总线，但是可以借助于第三方工具来完成，Vue官方推荐[mitt](https://www.npmjs.com/package/mitt)或[tiny-emitter](https://www.npmjs.com/package/tiny-emitter)；
在大多数情况下不推荐使用全局事件总线的方式来实现组件通信。
后期维护会有很大问题，搞不清楚事件来源。

## vuex/pinia
[Vuex](https://vuex.vuejs.org/zh/)和[Pinia](https://pinia.vuejs.org/)是Vue3中的状态管理工具，使用这两个工具可以轻松实现组件通信
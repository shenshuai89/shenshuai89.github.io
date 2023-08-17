---
title: vue3+vite封装element组件库
date: 2022-10-23 17:56:05
permalink: /pages/d1f96a/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---
> 学习目标：开发一套完整的前端UI库。

## 使用app.use将组件注册为全局组件
> 每个组件都设置install方法，通过全局vue可以进行挂载。

### 注册单组件
```javascript
import { App } from 'vue'
import list from './src/index.vue'

export default {
  install(app: App) {
    app.component('m-list', list)
  }
}
```
### 注册全局组件
```javascript
import { App } from "vue";
import list from "./list";

const components = [list];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
```
在components层创建index.ts入口，注册全部组件到全局app上，通过forEach遍历操作。
## vue3新特性
### 计算属性的get｜set属性方法
```javascript
let emits = defineEmits(["update:visible"]);
// 计算属性的get和set用法
let dialogVisible = computed({
  get() {
    returnprops.visible;
  },
  set(val) {
    emits("update:visible", val);
  },
});
```
### slots判断插槽值是否存在
```vue
<template>
  <el-button v-if="slots.default"><slot></slot></el-button>
  <el-icon v-else>
    <component :is="`icon-${toLower(icon)}`"></component>
  </el-icon>
</template>
<script setup lang="ts">
  import { useSlots } from "vue";
  const slots = useSlots();
</script>
```
可以通过slots.default判断用户是否设置插槽的值，如果设置则使用button。没有设置则使用图标。
```vue
<el-popover placement="bottom" :width="400" trigger="click">
  <template #default>
    <slot name="content"></slot>
  </template>
  <template #reference>
    <el-button>点击弹出</el-button>
  </template>
</el-popover>
```

- <template #defalut> 和<template #reference>是给popover设置插槽内容。
- <slot name="content"></slot>是设**置插槽位置**，调用者设置插槽内容。
#### 作用域插槽
给<slot name="content"></slot>设置除了name外，另外设置数据。
```vue
<slot name="content" :user="user"></slot>
```
会将子组件内的user数据，通过插槽反馈给调用者。
```vue
  <template #content="scope">
    调用者，这里设置插槽的内容
  </template>
```
### attrs-接收未明确注册的props
```vue
<el-menu 
    :defaultActive="defaultActive" 
    :router="router"
    v-bind="$attrs">
<!-- 未用props接收的，都会放到$attrs --->
</el-menu>
```
封装menu时可以给el-menu设置多个props属性，外层传递给el-menu的属性不一定全部用props接收，可以使用v-bind="$attrs", 直接将属性进行跨层级传递。
### defineProps\defineEmits\defineExpose
>  vue3.2之后新增了在script标签添加setup属性的功能，这样的定义的数据不能单独导出。 但是带来了无法通过setup获取到props及emits。
> defineProps、defineEmits、defineExpose这是为了解决该问题出现的API

- defineProps用于定义props，接收父组件传递过来的属性。
- defineEmits用于定义emits事件，子组件反馈给父组件使用的自定义事件。
- defineExpose是子组件反馈给父组件的【数据，包括事件和基本数据】，在父组件通过ref绑定到标签上使用。
```html
// 子组件中定义
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(123456)
defineExpose({
  count
})
</script>

// 父组件中使用expose暴露出的数据或方法
<template>
  <helloword ref="hello"></helloword>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import helloword from './components/HelloWorld.vue'
const hello = ref(null)
onMounted(() => {
  console.log(hello.value.count) // 123456
})
</script>

```
## 城市组件，跳转
通过给分类元素设置id，实现跳转。
```javascript
// 点击字母区域
let clickChat = (item: string) => {
  // 给不同区块设置ID，让页面滚动到对应的ID位置
  let el = document.getElementById(item);
  if (el) el.scrollIntoView();
};
```
## 对form组件的封装

- 封装options属性配置
- 作用域插槽，将form的提交和重置操作方法反馈给用户。
```html
<!-- 在封装的组件内部，form 底部的提交和重置按钮 -->
<el-form-item>
  <!-- 通过作用域插槽将数据传递给上层【使用者】 -->
  <slot name="action" :form="form" :model="model"></slot>
</el-form-item>


<!--  ***外部用户调用者*****  -->
<m-form>
  <template #action="scope">
    <el-button type="primary" @click="handleSubmut(scope)">提交</el-button>
    <el-button type="primary" @click="handleReset(scope)">重置</el-button>
  </template>
</m-from>
```

- 单独处理上传组件
```html
<!-- 在封装的组件内部，form 处理上传功能 -->
<el-upload
 v-if="item.type === 'upload'"
 v-bind="item.uploadAttrs"
 :on-preview="onPreview"
 :on-remove="onRemove"
 :on-success="onSuccess"
 :on-error="onError"
 :on-progress="onProgress"
 :on-change="onChange"
 :before-upload="beforeUpload"
 :before-remove="beforeRemove"
 :http-request="httpRequest"
 :on-exceed="onExceed">
  <slot name="uploadArea"></slot>
  <slot name="uploadTip"></slot>
</el-upload>

<!--  ***外部用户调用者*****  -->
<m-form>
  <template #uploadArea>
    <el-button size="small" type="primary">Click to upload</el-button>
  </template>
  <template #uploadTip>
    <div style="color: #ccc; font-size: 12px">
      jpg/png files with a size less than 500kb
    </div>
  </template>
</m-from>
```

- 单独处理富文本编辑


## element中select组件的label和value
```html
<el-form-item label="最高学历" prop="maxDegree">
  <el-select style="width:300px;" v-model="form.maxDegree">
    <el-option v-for="(item,index) in option"
               :key="item+index"
               :label="item.text"
               :value="item.id">
    </el-option>
  </el-select>
 </el-form-item>
```
v-model绑定的值【form.maxDegree】与option选项value值对应，
label值为显示的标签，页面上显示的内容。
## vitepress的使用，发布说明文档

> 学习目标：开发一套完整的前端UI库。

## 使用app.use将组件注册为全局组件
> 每个组件都设置install方法，通过全局vue可以进行挂载。

### 注册单组件
```javascript
import { App } from 'vue'
import list from './src/index.vue'

export default {
  install(app: App) {
    app.component('m-list', list)
  }
}
```
### 注册全局组件
```javascript
import { App } from "vue";
import list from "./list";

const components = [list];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
```
在components层创建index.ts入口，注册全部组件到全局app上，通过forEach遍历操作。
## vue3新特性
### 计算属性的get｜set属性方法
```javascript
let emits = defineEmits(["update:visible"]);
// 计算属性的get和set用法
let dialogVisible = computed({
  get() {
    returnprops.visible;
  },
  set(val) {
    emits("update:visible", val);
  },
});
```
### slots判断插槽值是否存在
```vue
<template>
  <el-button v-if="slots.default"><slot></slot></el-button>
  <el-icon v-else>
    <component :is="`icon-${toLower(icon)}`"></component>
  </el-icon>
</template>
<script setup lang="ts">
  import { useSlots } from "vue";
  const slots = useSlots();
</script>
```
可以通过slots.default判断用户是否设置插槽的值，如果设置则使用button。没有设置则使用图标。
```vue
<el-popover placement="bottom" :width="400" trigger="click">
  <template #default>
    <slot name="content"></slot>
  </template>
  <template #reference>
    <el-button>点击弹出</el-button>
  </template>
</el-popover>
```

- <template #defalut> 和<template #reference>是给popover设置插槽内容。
- <slot name="content"></slot>是设**置插槽位置**，调用者设置插槽内容。
#### 作用域插槽
给<slot name="content"></slot>设置除了name外，另外设置数据。
```vue
<slot name="content" :user="user"></slot>
```
会将子组件内的user数据，通过插槽反馈给调用者。
```vue
  <template #content="scope">
    调用者，这里设置插槽的内容
  </template>
```
### attrs-接收未明确注册的props
```vue
<el-menu 
    :defaultActive="defaultActive" 
    :router="router"
    v-bind="$attrs">
<!-- 未用props接收的，都会放到$attrs --->
</el-menu>
```
封装menu时可以给el-menu设置多个props属性，外层传递给el-menu的属性不一定全部用props接收，可以使用v-bind="$attrs", 直接将属性进行跨层级传递。
### defineProps\defineEmits\defineExpose
>  vue3.2之后新增了在script标签添加setup属性的功能，这样的定义的数据不能单独导出。 但是带来了无法通过setup获取到props及emits。
> defineProps、defineEmits、defineExpose这是为了解决该问题出现的API

- defineProps用于定义props，接收父组件传递过来的属性。
- defineEmits用于定义emits事件，子组件反馈给父组件使用的自定义事件。
- defineExpose是子组件反馈给父组件的【数据，包括事件和基本数据】，在父组件通过ref绑定到标签上使用。
```html
// 子组件中定义
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(123456)
defineExpose({
  count
})
</script>

// 父组件中使用expose暴露出的数据或方法
<template>
  <helloword ref="hello"></helloword>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import helloword from './components/HelloWorld.vue'
const hello = ref(null)
onMounted(() => {
  console.log(hello.value.count) // 123456
})
</script>

```
## 城市组件，跳转
通过给分类元素设置id，实现跳转。
```javascript
// 点击字母区域
let clickChat = (item: string) => {
  // 给不同区块设置ID，让页面滚动到对应的ID位置
  let el = document.getElementById(item);
  if (el) el.scrollIntoView();
};
```
## 对form组件的封装

- 封装options属性配置
- 作用域插槽，将form的提交和重置操作方法反馈给用户。
```html
<!-- 在封装的组件内部，form 底部的提交和重置按钮 -->
<el-form-item>
  <!-- 通过作用域插槽将数据传递给上层【使用者】 -->
  <slot name="action" :form="form" :model="model"></slot>
</el-form-item>


<!--  ***外部用户调用者*****  -->
<m-form>
  <template #action="scope">
    <el-button type="primary" @click="handleSubmut(scope)">提交</el-button>
    <el-button type="primary" @click="handleReset(scope)">重置</el-button>
  </template>
</m-from>
```

- 单独处理上传组件
```html
<!-- 在封装的组件内部，form 处理上传功能 -->
<el-upload
 v-if="item.type === 'upload'"
 v-bind="item.uploadAttrs"
 :on-preview="onPreview"
 :on-remove="onRemove"
 :on-success="onSuccess"
 :on-error="onError"
 :on-progress="onProgress"
 :on-change="onChange"
 :before-upload="beforeUpload"
 :before-remove="beforeRemove"
 :http-request="httpRequest"
 :on-exceed="onExceed">
  <slot name="uploadArea"></slot>
  <slot name="uploadTip"></slot>
</el-upload>

<!--  ***外部用户调用者*****  -->
<m-form>
  <template #uploadArea>
    <el-button size="small" type="primary">Click to upload</el-button>
  </template>
  <template #uploadTip>
    <div style="color: #ccc; font-size: 12px">
      jpg/png files with a size less than 500kb
    </div>
  </template>
</m-from>
```

- 单独处理富文本编辑


## element中select组件的label和value
```html
<el-form-item label="最高学历" prop="maxDegree">
  <el-select style="width:300px;" v-model="form.maxDegree">
    <el-option v-for="(item,index) in option"
               :key="item+index"
               :label="item.text"
               :value="item.id">
    </el-option>
  </el-select>
 </el-form-item>
```
v-model绑定的值【form.maxDegree】与option选项value值对应，
label值为显示的标签，页面上显示的内容。
## vitepress的使用，发布说明文档



[Imooc链接](https://coding.imooc.com/class/chapter/551.html)

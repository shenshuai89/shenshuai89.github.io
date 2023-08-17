---
title: vue3常用开发技巧应用
date: 2022-5-23 23:10:34
permalink: /pages/063c31/
tags: 
  - vue3 
  - vite 
  - ts
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
使用vite工具搭建项目
使用技术：vite+vue3+typescript
项目地址：[https://github.com/shenshuai89/vite-vue3-ts](https://github.com/shenshuai89/vite-vue3-ts)
## 项目搭建
官方推荐两种方式安装

- vite

npm init vite-app vite-vue3-ts # OR yarn create vite-app vite-vue3-ts

- cli

       npm install -g @vue/cli # OR yarn global add @vue/cli
vue create vite-vue3-ts
`vite` 是一个由原生`ESM`驱动的Web开发构建工具，打开 `vite` 依赖的 `package.json` 可以发现在 `devDependencies` 开发依赖里面已经引入了`TypeScript` ，甚至还有 `vuex` , `vue-router` ,`less` , `sass` 这些本地开发经常需要用到的工具。`vite` 轻量，开箱即用的特点，满足了大部分开发场景的需求，作为快速启动本地 `Vue` 项目来说，这是一个非常完美的工具。
### 安装依赖
yarn 
### 使用yarn启动项目
yarn dev
### **引入typescript**
**安装**
```
yarn add typescript -D
```
初始化`tsconfig.json`
```
npx tsc --init
```
将`main.js`修改为`main.ts`,同时将`index.html`里面的引用也修改为`main.ts`,
然后在script 里添加 lang="ts"
#### 由于ts无法识别vue文件，还需要配置一个文件
在项目根目录添加`shim.d.ts`文件
```javascript
declare module "*.vue" {
  import { Component } from "vue";
  const component: Component;
  export default component;
}
```
## Composition API风格
compositionAPI目的是把功能相同的代码放在一起维护。维护一个功能点时，只用修改当前的功能逻辑。compositionAPI通过setup选项组织代码。
```javascript
export default {
  setup(props, context) {}
};
```
新语法的范式：
```javascript
export default {
  setup() {
    const { networkState } = useNetworkState();
    const { user } = userDeatil();
    const { list } = tableData();
    return {
      networkState,
      user,
      list,
    };
  },
};
function useNetworkState() {}
function userDeatil() {}
function tableData() {}
```

在 `vue3` 的 `Composition API` 代码风格中，比较有代表性的api就是 `ref` 和 `reactive` 
### ref和computed

- ref将基本类型转为响应式数据，取数据时获取value
- computed计算属性数据，缓存的数据
```javascript
import { computed, ref } from "vue";
export default {
  setup() {
    
    const msg = ref("北鸟南游");
    const age = ref(5);
    // computed 计算属性的使用
    const double = computed(() => {
      return age.value * 2;
    });
    const add = () => {
      age.value += 1;
    };
    return { msg, age, add, double };
  },
};
```
### reactive和toRefs

- reactive将对象转为响应式数据
- toRefs将响应式对象变成普通对象
```javascript
import { computed, reactive, ref, toRefs } from "vue";
interface Person {
  name: string;
  age: number;
}
export default {
  setup() {
    // 使用reactive将对象转为响应式数据
    const state: Person = reactive({
      name: "北鸟南游",
      age: 5,
      double: computed(() => {
        return state.age * 2;
      }),
    });
    const add = () => {
      state.age += 1;
    };
    //toRefs将响应式对象变成普通对象
    return { ...toRefs(state), add };
  },
};
```
### props和context父子组件 属性传递
props是父组件传入的数据，context是一个上下文对象，是从2.x暴露出来的一些属性：attrs、slots、emit。
**注：props的数据也需要通过toRefs解构，否则响应式数据会失效。**
代码文件

- views/person3.vue
- views/person4.vue
- components/PersonInfo.vue
```javascript
<!-- 父组件 -->
<template>
  <div id="person">
    <PersonInfo :info="msg"></PersonInfo>
    <div>{{ name }}年龄为{{ age }}</div>
    <button @click="add">+</button>
    <div>年龄的2倍{{ double }}</div>
  </div>
</template>
<script lang="ts">
import { computed, reactive, ref, toRefs } from "vue";
import PersonInfo from "../components/PersonInfo.vue";
interface Person {
  name: string;
  age: number;
}
export default {
  components: {
    PersonInfo,
  },
  setup() {
    // 使用reactive将对象转为响应式数据
    const state: Person = reactive({
      name: "北鸟南游",
      age: 5,
      msg: "vue3前端开发",
      double: computed(() => {
        return state.age * 2;
      }),
    });
    const add = () => {
      state.age += 1;
    };
    //toRefs将响应式对象变成普通对象
    return { ...toRefs(state), add };
  },
};
</script>
```
```javascript
<!-- 子组件 -->
  <template>
  <div>描述：{{ data }}</div>
  <button @click="emitName">开心学习!</button>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    info: String,
  },
  setup(props, context) {
    //利用 setup 的第一个参数获取 props 使用
    // console.log(props);
    const data = ref(props.info);
    // 子组件向父组件发送事件
    const emitName = () => {
      context.emit("learn", "学习vue3");
    };
    return { data, emitName };
  },
};
</script>
```
### watch和watchEffect监听
#### watch数据变化,和vue2中的watch类似
**watch默认情况是懒执行的，也就是说仅在侦听的源变更时才执行回调，不能立即执行。**
watch监听state的age数据变化。
```javascript
// 第一个参数：监听的数据源
// 第二个是回调函数，当监听的数据发生变化，执行回调函数，并且可以获取到新值和旧值。
watch(
  () => state.age,
  (newVal, oldVal, clean) => {
    console.log(
      state.name + "去年:" + oldVal + "岁，今年:" + newVal + "岁。"
    );
    // clean处理重复性的watch监听事件
    clean(() => {
      console.log("clean");
    });
  }
);
```
watch监听ref

1. 不指定数据源
```javascript
// watchEffect不指定数据源，会监听回调函数中所有的值的改变就会执行。
const age = ref(18)
watchEffect(()=>{
    console.log(age.value)
})
```

2. 指定数据源
```javascript
const age = ref(18)
// watch监听的数据源，如果是ref定义的数据，可以直接设置为第一个参数。如果是reactive定义的数据，需要传回调函数
watch(age,()=> {
  // ref对象监听的是对象的value
	console.log(age.value)
})
//使用reactive定义age
const data = reactive({
  age: 5
})
watch(()=>data.age, (newVal, oldVal)=> {
  // ref对象监听的是对象的value
	console.log(newVal, oldVal)
})
```

watch监听reactive
```javascript
const state: Person = reactive({
  name: "北鸟南游",
  age: 5,
  msg: "vue3前端开发",
  double: computed(() => {
  return state.age * 2;
  }),
});
```

1. 不指定数据源
```javascript
watchEffect(()=>{
    console.log(state.age)
})
```

2. 指定数据源
```javascript
watch(()=>state.age,()=>{
    console.log(state.age)
})
```
 3.监听多个数据源，数组中参数任意一个变化，都会监听到值变化。
```typescript
watch(
 [() => state.age, () => state.name],
 ([newName, newAge], [oldName, oldAge]) => {
    console.log(newName);
    console.log(newAge);
 
    console.log(oldName);
    console.log(oldAge);
  }
)
```
#### watchEffect的使用
**watchEffect立即执行回调函数，不用指定数据源，响应式追踪其依赖，并在其依赖变更时重新运行该函数。**
watchEffect自动收集回调函数中包含的参数值的变化，并进行监听。
```typescript
<template>
  <button @click="change">count is: {{ state.count }}</button>
</template>

<script>
import { reactive, watchEffect } from 'vue'
export default {
  setup () {
    let state = reactive({count: 0})
    let change = () => state.count++;
    watchEffect(() => {
      console.log(state.count, '改变')
    })
    return { state, change }
  }
}
</script>
```
#### watchEffect与watch的区别：
1、watch 是需要传入侦听的数据源，而 watchEffect 是**自动收集数据源作为依赖**。
2、watch 可以访问侦听状态变化前后的值，而 watchEffect 只能获取到变化后的值，无法获取oldValue。
3、watch 是属性改变的时候执行，而 watchEffect 是默认会立即执行一次，然后属性改变也会执行。
### provide、inject依赖注入数据
代码参考文件

- components/Son.vue
- components/Grandson.vue
- App.vue

App.vue
```javascript
import Son from "./components/Son.vue"
export default {
  setup() { 
    provide('themecolor', 'orange') 
  } 
};
```
Son.vue
```javascript
<template>
  <div>
    <h3 :style="{ color: color }">son 组件</h3>
    <Grandson></Grandson>
  </div>
</template> 
 
<script lang="ts">
import { inject } from "vue";
import Grandson from "./Grandson.vue";
export default {
  components: {
    Grandson: Grandson,
  },
  setup() {
    const color = inject("themecolor");
    return {
      color,
    };
  },
};
</script> 
```
Grandson.vue
```javascript
<template>
  <div>
    <h5 :style="{ color: color }">grandson 组件</h5>
  </div>
</template> 
 
<script lang="ts">
import { inject } from "vue";
export default {
  name: "grandson",
  setup() {
    const color = inject("themecolor");
    return {
      color,
    };
  },
};
</script> 
```
provide和inject的使用对有层级关系的组件，可以跨组件进行数据传递
## 生命周期**LifeCycle Hooks**
新版的生命周期函数，可以按需导入到组件中，且只能在 setup() 函数中使用, 但是也可以在setup 外定义, 在 setup 中使用
```typescript
<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onErrorCaptured, onMounted, onUnmounted, onUpdated } from 'vue';
export default defineComponent({
  setup(props, context) {
    onBeforeMount(()=> {
      console.log('beformounted!')
    })
    onMounted(() => {
      console.log('mounted!')
    })
 
    onBeforeUpdate(()=> {
      console.log('beforupdated!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
 
    onBeforeUnmount(()=> {
      console.log('beforunmounted!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
 
    onErrorCaptured(()=> {
      console.log('errorCaptured!')
    })
 
    return {}
  }
});
</script>
```
## fragment组件
在vue2中，组件模版必须有根节点
```html
<template>
  <div>
    <span></span>
    <span></span>
  </div>
</template>
```
在Vue3中我们可以直接不需要根节点：
```html
<template>
    <span>hello</span>
    <span>world</span>
</template>
```
## teleport组件
可以将插槽中的元素或者组件传送到页面指定的其他位置。Teleport一个常见的使用场景，在一些嵌套比较深的组件来转移模态框的位置。虽然在逻辑上模态框是属于该组件的，但是在样式和DOM结构上，嵌套层级后较深后不利于进行维护（z-index等问题）
```javascript
<template>
  <button @click="showDialog = true">打开模态框</button>

  <teleport to="body">
    <div class="modal" v-if="showDialog" style="position: fixed">
      我是一个模态框
      <button @click="showDialog = false">关闭</button>
      <child-component :msg="msg"></child-component>
    </div>
  </teleport>
</template>
<script>
export default {
  data() {
    return {
      showDialog: false,
      msg: "hello"
    };
  },
};
</script>
```
以上代码的teleport中的modal被传送到body标签底部。
虽然在不同的地方进行渲染，但是Teleport中的元素和组件还是属于父组件的逻辑子组件，还是可以和父组件进行数据通信。
teleport接收两个参数：to【string类型】和disabled【boolean类型】

- to：必须是有效的查询选择器或 HTMLElement，可以id或者class选择器等
- disabled：如果是true表示禁用teleport的功能，其插槽内容将不会移动到任何位置，默认false不禁用



## Suspense组件
Vue3 新增 React.lazy 类似功能的 defineAsyncComponent 函数，处理动态引入（的组件）。defineAsyncComponent可以接受返回承诺的工厂函数。当您从服务器检索到组件定义时，应该调用Promise的解析回调。您还可以调用reject(reason)来指示加载已经失败
动态加载组件
```typescript
import { defineAsyncComponent } from 'vue'
 
const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)
 
app.component('async-component', AsyncComp)
```
suspense的应用
```typescript
<template>
  <Suspense>
    <template #default>
      <my-component />
    </template>
    <template #fallback>
      Loading ...
    </template>
  </Suspense>
</template>
 
<script lang='ts'>
 import { defineComponent, defineAsyncComponent } from "vue";
 const MyComponent = defineAsyncComponent(() => import('./Component'));
 
export default defineComponent({
   components: {
     MyComponent
   },
   setup() {
     return {}
   }
})
 
 
</script>
```
## 非兼容的功能v2和v3区别
### data、mixin、filter(v3已经删除)
在vue2中data可以定义object或function，如果定义成object，则数据会相互影响，因为object是引用类型。
在vue3中data只接受function，通过function返回对象；
mixin使用发生了改变，当mixin和data合并时，会执行浅拷贝合并。
```javascript
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1,
        address: {
          prov: 2,
          city: 3,
        },
      }
    }
  }
}
const Component = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2,
        address: {
          prov: 4,
        },
      }
    }
  }
}

// vue2结果：
{
  id: 2,
  name: 'Jack',
  address: {
    prov: 4,
    city: 3
  }
}

// vue3结果：
user: {
  id: 2,
  address: {
    prov: 4,
  },
}
```
vue2.x会进行深拷贝，对data中的数据向下深入合并拷贝；而vue3只进行浅层拷贝，对data中数据发现已存在就不合并拷贝。
### v-model
在vue2中v-model相当于绑定value属性和input事件，本质是一个语法糖；
```javascript
<child-component v-model="msg"></child-component>
<!-- 相当于 -->
<child-component :value="msg" @input="msg=$event"></child-component>
```
但是在特殊情况下，需要对多值进行双向绑定，其他值的显示就需要使用回调函数来改变。
```javascript
<child-component 
    v-model="msg" 
    :msg1="msg1" 
    @change1="msg1=$event"
    :msg2="msg2" 
    @change2="msg2=$event">
</child-component>
```
在vue2.3+以后新增.sync修饰符，本质也是语法糖，是在组件上绑定@update:propName回调，语法更简洁。
```javascript
<child-component 
    :msg1.sync="msg1" 
    :msg2.sync="msg2">
</child-component>

<!-- 相当于 -->

<child-component 
    :msg1="msg1" 
    @update:msg1="msg1=$event"
    :msg2="msg2"
    @update:msg2="msg2=$event">
</child-component>
```
vue3将v-model和.sync修饰符进行整合，弃用sync属性，使用多个value绑定值直接用多个v-model。单个v-model将v-model默认传的prop名称由value改成modelValue：
#### 单个v-model
```javascript
<child-component 
    v-model="msg">
</child-component>

<!-- 相当于 -->
<child-component 
  :modelValue="msg"
  @update:modelValue="msg = $event">
</child-component>
```
#### 多个v-model
v-model传递多个值，可以将一个argument传递给v-model
```javascript
<child-component 
    v-model.msg1="msg1"
    v-model.msg2="msg2">
</child-component>

<!-- 相当于 -->
<child-component 
    :msg1="msg1" 
    @update:msg1="msg1=$event"
    :msg2="msg2"
    @update:msg2="msg2=$event">
</child-component>
```
### v-for和key
在vue2中，v-for不能绑定在template上，v-for每次循环都需要给每个子节点一个唯一的key
```javascript
<template v-for="item in list">
  <div :key="item.id">...</div>
  <span :key="item.id">...</span>
</template>
```
vue3中key值可以被放到template标签，就不能为每个子节点设置key
```javascript
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```
### v-bind
在vue2中，v-bind绑定一个对象时，对象中的值会被属性值覆盖
```javascript
<div id="red" v-bind="{ id: 'blue' }"></div>
<div v-bind="{ id: 'blue' }" id="red"></div>

<!-- 最后结果都相同 -->
<div id="red"></div>
```
vue3中，如果v-bind绑定的对象里包含属性值，同时又定义属性值，那么会使用后定义的值为准。
```html
<!-- template -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- result -->
<div id="blue"></div>

<!-- template -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- result -->
<div id="red"></div>
```
### v-for中的ref属性
vue2中在v-for中使用ref属性，通过this.$refs会得到一个数组
```javascript
<template
  <div v-for="item in list" :ref="setItemRef"></div>
</template>
<script>
export default {
  data(){
    list: [1, 2]
  },
  mounted () {
    // [div, div]
    console.log(this.$refs.setItemRef) 
  }
}
</script>
```
这样的数组可能不是想要的结果，因此vue3不再自动创建数组，而是将ref变为函数，该函数默认传入该节点
```javascript
<template
  <div v-for="item in 3" :ref="setItemRef"></div>
</template>
<script>
import { reactive, onUpdated } from 'vue'
export default {
  setup() {
    let itemRefs = reactive([])

    const setItemRef = el => {
      itemRefs.push(el)
    }

    onUpdated(() => {
      console.log(itemRefs)
    })

    return {
      itemRefs,
      setItemRef
    }
  }
}
</script>
```

### v-if和v-for的优先级
vue2中，v-for和v-if同时使用v-for有更高的优先级，因此vue2做性能优化的一点就是不能把v-for和v-if放在同一个元素上。
vue3中，v-if比v-for有更高优先级。下面代码在vue2中可以允许，但是在vue3中，没有item变量时会报错
```javascript
<template>
  <div v-for="item in list" v-if="item % 2 === 0" :key="item">{{ item }}</div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5],
    };
  },
};
</script>
```
## 自定义hooks
解决vue2中mixin数据来源不清晰的问题，hook可以完成逻辑的复用
创建hooks文件夹，用来存放可复用的组件
创建useCount.ts文件
```javascript
import { ref, Ref, watch } from "vue";

interface Range {
  min?: number;
  max?: number;
}

interface Result {
  current: Ref<number>;
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  set: (value: number) => void;
  reset: () => void;
}

export default function useCount(initialVal: number, range?: Range): Result {
  const current = ref(initialVal);
  const inc = (delta?: number): void => {
    if (typeof delta === "number") {
      current.value += delta;
    } else {
      current.value += 1;
    }
  };
  const dec = (delta?: number): void => {
    if (typeof delta === "number") {
      current.value -= delta;
    } else {
      current.value -= 1;
    }
  };
  const set = (value: number): void => {
    current.value = value;
  };
  const reset = () => {
    current.value = initialVal;
  };

  watch(current, (newVal: number, oldVal: number) => {
    console.log(newVal);
    if (newVal === oldVal) return;
    if (range && range.min && newVal < range.min) {
      current.value = range.min;
    } else if (range && range.max && newVal > range.max) {
      current.value = range.max;
    }
  });

  return {
    current,
    inc,
    dec,
    set,
    reset,
  };
}
```
在Count.vue中引用
```javascript
import useCount from "../hooks/useCount";
export default {
  setup() {
    const { current: count, inc, dec, set, reset } = useCount(2, {
      min: 1,
      max: 15,
    });
    const msg = ref("Demo useCount");

    return {
      count,
      inc,
      dec,
      set,
      reset,
      msg,
    };
  },
};
```
## 添加router
### 安装vue-router
```javascript
yarn add vue-router@latest
```
### 配置vue-router
在项目`src`目录下面新建`router`目录，然后添加`index.ts`文件
```javascript
import {createRouter, createWebHashHistory} from 'vue-router'
// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: []
})
```
## vue3完整组件结构
完整的vue 3.x 完整组件模版结构包含了:组件名称、 props、components、setup(hooks、computed、watch、methods 等)
```typescript
<template>
  <div class="mine" ref="elmRefs">
    <span>{{name}}</span>
    <br>
    <span>{{count}}</span>
    <div>
      <button @click="handleClick">测试按钮</button>
    </div>
 
    <ul>
      <li v-for="item in list" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>
 
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, PropType, reactive, ref, toRefs } from 'vue';
 
interface IState {
  count: 0,
  name: string,
  list: Array<object>
}
 
export default defineComponent({
  name: 'demo',
  // 父组件传子组件参数
  props: {
    name: {
      type: String as PropType<null | ''>,
      default: 'vue3.x'
    },
    list: {
      type: Array as PropType<object[]>,
      default: () => []
    }
  },
  components: {
    /// TODO 组件注册
  },
  emits: ["emits-name"], // 为了提示作用
  setup (props, context) {
    console.log(props.name)
    console.log(props.list)
   
    const state = reactive<IState>({
      name: 'vue 3.0 组件',
      count: 0,
      list: [
        {
          name: 'vue',
          id: 1
        },
        {
          name: 'vuex',
          id: 2
        }
      ]
    })
 
    const a = computed(() => state.name)
 
    onMounted(() => {
 
    })
 
    function handleClick () {
      state.count ++
      // 调用父组件的方法
      context.emit('emits-name', state.count)
    }
  
    return {
      ...toRefs(state),
      handleClick
    }
  }
});
</script>
```

## 添加vuex
### 安装vuex
yarn add vuex@latest
在项目`src`目录下面新建`store`目录，并添加`index.ts`文件
```javascript
import { createStore } from "vuex";
interface State {
  userName: string;
  taskList: any[];
}
export default createStore({
  state: {
    userName: "北鸟南游",
    taskList: [],
  },
  getters: {
    totalList(state: State) {
      return state.taskList.length;
    },
    completeList(state: State) {
      return state.taskList.filter((list) => {
        return list.isfinished == true;
      }).length;
    },
  },
  mutations: {
    createTask(state: State, newTask: string) {
      state.taskList.push(newTask);
    },
    deleteTask(state: State, index: number) {
      state.taskList.splice(index, 1);
    },
    updateStatus(state: State, payload: any) {
      const { index, status } = payload;
      state.taskList[index].isfinished = status;
    },
  },
});

```
在main.ts中引入router和vuex
```javascript
import router from "./router/index";
import vuex from "./store/index";

createApp(App).use(router).use(vuex).mount("#app");
```
## 项目todolist
集成路由和vuex数据管理
使用了scss预处理器，安装sass，yarn add sass -D
app.vue
```html
<div id="nav">
  <router-link to="/">count</router-link> |
	<router-link to="/todolist">todolist</router-link>
</div>
<router-view />
```
router/index.ts
```javascript
import { createRouter, createWebHashHistory } from "vue-router";
// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: [
    {
      path: "/",
      // 必须添加.vue后缀
      component: () => import("../views/Count.vue"),
    },
    {
      path: "/todolist",
      name: "todolist",
      component: () => import("../views/TodoList.vue"),
    },
  ],
});
```
store/index.ts
```javascript
import { createStore } from "vuex";
interface State {
  userName: string;
  taskList: any[];
}
export default createStore({
  state: {
    userName: "北鸟南游",
    taskList: [],
  },
  getters: {
    totalList(state: State) {
      return state.taskList.length;
    },
    completeList(state: State) {
      return state.taskList.filter((list) => {
        return list.isfinished == true;
      }).length;
    },
  },
  mutations: {
    createTask(state: State, newTask: string) {
      state.taskList.push(newTask);
    },
    deleteTask(state: State, index: number) {
      state.taskList.splice(index, 1);
    },
    updateStatus(state: State, payload: any) {
      const { index, status } = payload;
      state.taskList[index].isfinished = status;
    },
  },
});

```

项目地址：[https://github.com/shenshuai89/vite-vue3-ts](https://github.com/shenshuai89/vite-vue3-ts)



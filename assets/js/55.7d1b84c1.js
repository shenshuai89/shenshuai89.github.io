(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{369:function(n,s,e){"use strict";e.r(s);var a=e(7),t=Object(a.a)({},(function(){var n=this,s=n._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[s("ul",[s("li",[s("a",{attrs:{href:"https://shenshuai89.github.io//2019/06/18/vue%E5%9F%BA%E7%A1%80%E5%85%A5%E9%97%A8%E4%B8%80%E6%96%B9%E6%B3%95%E5%92%8C%E6%95%B0%E6%8D%AE/",target:"_blank",rel:"noopener noreferrer"}},[n._v("第一篇：vue基础介绍，数据绑定(computed+watch)"),s("OutboundLink")],1)]),n._v(" "),s("li",[s("a",{attrs:{href:"https://shenshuai89.github.io//2019/06/20/vue%E6%A0%B7%E5%BC%8Fclass%E5%92%8Cstyle",target:"_blank",rel:"noopener noreferrer"}},[n._v("第二篇：vue样式class和style"),s("OutboundLink")],1)]),n._v(" "),s("li",[s("a",{attrs:{href:"https://shenshuai89.github.io//2019/06/22/vue%E7%BB%84%E4%BB%B6%E5%8F%8A%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F",target:"_blank",rel:"noopener noreferrer"}},[n._v("第三篇：vue组件及生命周期"),s("OutboundLink")],1)]),n._v(" "),s("li",[s("a",{attrs:{href:"https://shenshuai89.github.io//2019/06/24/vue%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E6%95%B0%E6%8D%AE%E4%BC%A0%E9%80%92/",target:"_blank",rel:"noopener noreferrer"}},[n._v("第四篇：vue父子组件之间的数据传递"),s("OutboundLink")],1)]),n._v(" "),s("li",[s("a",{attrs:{href:"https://shenshuai89.github.io//2019/06/26/vue%E5%8A%A8%E7%94%BB%E4%B8%8E%E8%BF%87%E6%B8%A1/",target:"_blank",rel:"noopener noreferrer"}},[n._v("第五篇：vue动画与过渡"),s("OutboundLink")],1)]),n._v(" "),s("li",[s("a",{attrs:{href:"https://shenshuai89.github.io//2019/06/28/vue-router%E8%B7%AF%E7%94%B1%E7%9A%84%E4%BD%BF%E7%94%A8/",target:"_blank",rel:"noopener noreferrer"}},[n._v("第六篇：vue-router路由的使用"),s("OutboundLink")],1)]),n._v(" "),s("li",[s("a",{attrs:{href:"https://shenshuai89.github.io//2019/06/30/vuex%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86/",target:"_blank",rel:"noopener noreferrer"}},[n._v("第七篇：vuex数据管理"),s("OutboundLink")],1)])]),n._v(" "),s("h2",{attrs:{id:"单元素-组件的过渡"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#单元素-组件的过渡"}},[n._v("#")]),n._v(" 单元素/组件的过渡")]),n._v(" "),s("blockquote",[s("p",[n._v("Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡")])]),n._v(" "),s("ul",[s("li",[n._v("条件渲染 (使用 v-if)")]),n._v(" "),s("li",[n._v("条件展示 (使用 v-show)")]),n._v(" "),s("li",[n._v("动态组件")]),n._v(" "),s("li",[n._v("组件根节点")])]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('<div id="demo">\n  <button v-on:click="show = !show">\n    Toggle\n  </button>\n  <transition name="fade">\n    <p v-if="show">hello</p>\n  </transition>\n</div>\nnew Vue({\n  el: \'#demo\',\n  data: {\n    show: true\n  }\n})\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s;\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n.fade-enter-to, .fade-leave {\n  opacity: 1;\n}\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br"),s("span",{staticClass:"line-number"},[n._v("15")]),s("br"),s("span",{staticClass:"line-number"},[n._v("16")]),s("br"),s("span",{staticClass:"line-number"},[n._v("17")]),s("br"),s("span",{staticClass:"line-number"},[n._v("18")]),s("br"),s("span",{staticClass:"line-number"},[n._v("19")]),s("br"),s("span",{staticClass:"line-number"},[n._v("20")]),s("br"),s("span",{staticClass:"line-number"},[n._v("21")]),s("br"),s("span",{staticClass:"line-number"},[n._v("22")]),s("br"),s("span",{staticClass:"line-number"},[n._v("23")]),s("br")])]),s("h3",{attrs:{id:"过渡的类名"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#过渡的类名"}},[n._v("#")]),n._v(" 过渡的类名")]),n._v(" "),s("ul",[s("li",[s("p",[n._v("v-enter："),s("strong",[n._v("进入的开始状态")]),n._v("。在元素被插入之前生效，在元素被插入之后的下一帧移除。")])]),n._v(" "),s("li",[s("p",[n._v("v-enter-active："),s("strong",[n._v("进入过渡状态")]),n._v("在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。")])]),n._v(" "),s("li",[s("p",[n._v("v-enter-to: **进入的结束状态。**在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。")])]),n._v(" "),s("li",[s("p",[n._v("v-leave: "),s("strong",[n._v("离开的开始状态")]),n._v("。在离开过渡被触发时立刻生效，下一帧被移除。")])]),n._v(" "),s("li",[s("p",[n._v("v-leave-active：**离开过渡状态。**在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。")])]),n._v(" "),s("li",[s("p",[n._v("v-leave-to: **离开的结束状态。**在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。")])])]),n._v(" "),s("p",[n._v('< transition name="my-transition">\n'),s("strong",[n._v("my-transition-enter")]),n._v("\n以上所有过渡类名，都是name设置的属性，把v替换成name的值")]),n._v(" "),s("h2",{attrs:{id:"vue动画"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue动画"}},[n._v("#")]),n._v(" vue动画")]),n._v(" "),s("h3",{attrs:{id:"animate-css-动画"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#animate-css-动画"}},[n._v("#")]),n._v(" animate.css 动画")]),n._v(" "),s("p",[n._v("可以引入第三方css动画类库Animate.css\n在head标签中添加引用：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('<link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.5.2/animate.min.css">\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br")])]),s("p",[n._v("结合transition定义进入的类名：enter-active-class，离开的类名：leave-active-class")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('<transition enter-active-class="animated slideInDown"\n            leave-active-class="animated fadeOutDownBig">\n   <div v-show="show">animation</div>\n</transition>\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br")])]),s("p",[s("a",{attrs:{href:"https://jsfiddle.net/shenshuai/69ejng05/",target:"_blank",rel:"noopener noreferrer"}},[n._v("Demo示例："),s("OutboundLink")],1)]),n._v(" "),s("h3",{attrs:{id:"css关键帧keyframe-动画"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#css关键帧keyframe-动画"}},[n._v("#")]),n._v(" css关键帧keyframe 动画")]),n._v(" "),s("p",[n._v("vue也可以配合css3的keyframe设置动画。\n同样使用transition并且添加name")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('<transition name="animate">\n    <button @click="toggle">show toggle</button>\n    <div v-show="show">animation</div>\n</transition>\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br")])]),s("p",[n._v("添加css3动画设置")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v(".animate-enter-active {        \n  animation: scale-in .5s;\n}\n.animate-leave-active {        \n  animation: scale-in .5s reverse;  \n}\n@keyframes scale-in {\n  0% {\n    transform: scale(0);\n  }\n  50% {\n    transform: scale(2);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br"),s("span",{staticClass:"line-number"},[n._v("15")]),s("br"),s("span",{staticClass:"line-number"},[n._v("16")]),s("br"),s("span",{staticClass:"line-number"},[n._v("17")]),s("br")])]),s("p",[s("a",{attrs:{href:"https://jsfiddle.net/shenshuai/v0y3grpq/",target:"_blank",rel:"noopener noreferrer"}},[n._v("Demo示例："),s("OutboundLink")],1)]),n._v(" "),s("h3",{attrs:{id:"velocity-js-的动画"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#velocity-js-的动画"}},[n._v("#")]),n._v(" Velocity.js 的动画")]),n._v(" "),s("p",[n._v("Vue中的 Js 动画与 Velocity.js 的结合\n首先设置transition属性")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('<transition @before-enter="handleBeforeEnter"\n    @enter="handleEnter"\n    @after-enter="handleAfterEnter"\n    @before-leave="handleBeforeLeave"\n    @leave="handleLeave"\n    @after-leave="handleAfterLeave">\n    <div v-show="show">animation</div>\n</transition>\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br")])]),s("p",[n._v("设置动画事件")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("new Vue({\n  el: \"#app\",\n  data () {\n    return {\n      show: true\n    }\n  },\n  methods: {\n    toggle () {\n      this.show = !this.show;\n    },\n    handleBeforeEnter: function(el) {\n      el.style.opacity = 0;\n    },\n    handleEnter: function(el, done) {\n      Velocity(el, {opacity: 1,fontSize:20}, {duration: 2000, complete: done});\n    },\n    handleAfterEnter: function(el) {\n      console.log('动画enter结束');\n    },\n    handleBeforeLeave: function(el) {\n      el.style.opacity = 1;\n    },\n    handleLeave: function(el, done) {\n      Velocity(el, {opacity: 0,fontSize:12}, {duration: 2000, complete: done});\n    },\n    handleAfterLeave: function(el) {\n      console.log('动画leave结束');\n    }\n  }\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br"),s("span",{staticClass:"line-number"},[n._v("15")]),s("br"),s("span",{staticClass:"line-number"},[n._v("16")]),s("br"),s("span",{staticClass:"line-number"},[n._v("17")]),s("br"),s("span",{staticClass:"line-number"},[n._v("18")]),s("br"),s("span",{staticClass:"line-number"},[n._v("19")]),s("br"),s("span",{staticClass:"line-number"},[n._v("20")]),s("br"),s("span",{staticClass:"line-number"},[n._v("21")]),s("br"),s("span",{staticClass:"line-number"},[n._v("22")]),s("br"),s("span",{staticClass:"line-number"},[n._v("23")]),s("br"),s("span",{staticClass:"line-number"},[n._v("24")]),s("br"),s("span",{staticClass:"line-number"},[n._v("25")]),s("br"),s("span",{staticClass:"line-number"},[n._v("26")]),s("br"),s("span",{staticClass:"line-number"},[n._v("27")]),s("br"),s("span",{staticClass:"line-number"},[n._v("28")]),s("br"),s("span",{staticClass:"line-number"},[n._v("29")]),s("br"),s("span",{staticClass:"line-number"},[n._v("30")]),s("br")])]),s("p",[s("a",{attrs:{href:"https://jsfiddle.net/shenshuai/4cvfqabp/",target:"_blank",rel:"noopener noreferrer"}},[n._v("Demo示例："),s("OutboundLink")],1)]),n._v(" "),s("h3",{attrs:{id:"封装vue中的动画组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#封装vue中的动画组件"}},[n._v("#")]),n._v(" 封装vue中的动画组件")]),n._v(" "),s("p",[n._v("由于动画的设置过于繁琐复杂，定义太多过程。基于vue可以组件化开发，可以把需要的动画封装成组件。\n封装动画组件，和一般定义组件一样，只用暴露出控制显示或隐藏的属性。")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('<div id="app">\n  <button @click="handleClick">toggle</button>\n  <fade :show="show">\n    <div>hello transition</div>\n  </fade>\n</div>\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br")])]),s("p",[n._v("然后在js中定义fade组件")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('Vue.component(\'fade\', {\n  props: [\'show\'],\n  template: `\n    <transition @before-enter="handleBeforeEnter"\n      @enter="handleEnter"\n      @before-leave="handleBeforeLeave"\n      @leave="handleLeave">\n      <slot v-if="show"></slot>\n    </transition>\n    `,\n  methods: {\n    handleBeforeEnter: function(el) {\n      el.style.opacity = 0;\n    },\n    handleEnter: function(el) {\n        el.style.opacity = 1;\n        el.style.transition = "all 1s";\n    },\n    handleBeforeLeave: function(el) {\n      el.style.opacity = 1;\n    },\n    handleLeave: function(el) {\n      el.style.opacity = 0;\n      el.style.transition = "all 2s";\n    }\n  }\n})\nnew Vue({\n  el: "#app",\n  data: function () {\n    return {\n      show: true\n    }\n  },\n  methods: {\n    handleClick: function () {\n      this.show = !this.show;\n    }\n  }\n});\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br"),s("span",{staticClass:"line-number"},[n._v("15")]),s("br"),s("span",{staticClass:"line-number"},[n._v("16")]),s("br"),s("span",{staticClass:"line-number"},[n._v("17")]),s("br"),s("span",{staticClass:"line-number"},[n._v("18")]),s("br"),s("span",{staticClass:"line-number"},[n._v("19")]),s("br"),s("span",{staticClass:"line-number"},[n._v("20")]),s("br"),s("span",{staticClass:"line-number"},[n._v("21")]),s("br"),s("span",{staticClass:"line-number"},[n._v("22")]),s("br"),s("span",{staticClass:"line-number"},[n._v("23")]),s("br"),s("span",{staticClass:"line-number"},[n._v("24")]),s("br"),s("span",{staticClass:"line-number"},[n._v("25")]),s("br"),s("span",{staticClass:"line-number"},[n._v("26")]),s("br"),s("span",{staticClass:"line-number"},[n._v("27")]),s("br"),s("span",{staticClass:"line-number"},[n._v("28")]),s("br"),s("span",{staticClass:"line-number"},[n._v("29")]),s("br"),s("span",{staticClass:"line-number"},[n._v("30")]),s("br"),s("span",{staticClass:"line-number"},[n._v("31")]),s("br"),s("span",{staticClass:"line-number"},[n._v("32")]),s("br"),s("span",{staticClass:"line-number"},[n._v("33")]),s("br"),s("span",{staticClass:"line-number"},[n._v("34")]),s("br"),s("span",{staticClass:"line-number"},[n._v("35")]),s("br"),s("span",{staticClass:"line-number"},[n._v("36")]),s("br"),s("span",{staticClass:"line-number"},[n._v("37")]),s("br"),s("span",{staticClass:"line-number"},[n._v("38")]),s("br"),s("span",{staticClass:"line-number"},[n._v("39")]),s("br"),s("span",{staticClass:"line-number"},[n._v("40")]),s("br")])]),s("p",[s("a",{attrs:{href:"https://jsfiddle.net/shenshuai/0qgx1f8e/",target:"_blank",rel:"noopener noreferrer"}},[n._v("Demo示例："),s("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=t.exports}}]);
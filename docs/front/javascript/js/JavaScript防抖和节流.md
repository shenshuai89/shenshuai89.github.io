---
title: js函数的防抖和节流
date: 2020-01-14 15:14:20
categories: javascript
tags: 
  - javascript
permalink: /pages/bf75b0/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---

# js函数的防抖和节流的是什么

- 函数的防抖 （debounce） : 多次触发事件，在某段固定的时长只执行最后一次函数,如果这个事件一直触发，那么相应的函数要一直等待。比如生活中坐地铁或者做电梯，假如一直有上客的情况，那么车门就一直要等待，直到最后一名乘客上车后等待10s（一个设定的时间）车门关闭。
- 函数的节流 （throttle） : 多次触发事件，执行期间每隔一段时间执行相应的函数。比如生活中在公交始发站，公交车有一定的发车时间间隔，要过一段时间(比如20分钟)才发一辆车。来了一个乘客对司机说，发车吧(触发一次事件)，那么假如又来一个乘客，又对司机说发车吧(再次触发事件)，但是这些事件的触发都不能够影响司机发车的时间点。到了间隔的20分钟，就开始发车(执行一次函数)。这样就达到了节约公交车运营费用的目的，也是节流的一种体现。



# 函数的防抖和节流应用实例与实现

1.  防抖的应用 

   在搜索过滤功能中应用较多，如果只是监听搜索框的变化来搜索那搜索的频率会过高，还有对页面的缩放过程中会对页面大小尺寸连续重新计算，这些对事件的调用频率过高，导致页面抖动。

   

    防抖函数分为非立即执行版和立即执行版。 

    非立即执行版： 

   ```javascript
   function debounce(func, wait) {
       let timeout;
       return function () {
           let context = this;
           let args = arguments;
   
           if (timeout) clearTimeout(timeout);
           
           timeout = setTimeout(() => {
               func.apply(context, args)
           }, wait);
       }
   }
   ```

    非立即执行版的意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。 

   

    立即执行版： 

   ```javascript
   function debounce(func,wait) {
       let timeout;
       return function () {
           let context = this;
           let args = arguments;
   
           if (timeout) clearTimeout(timeout);
   
           let callNow = !timeout;
           timeout = setTimeout(() => {
               timeout = null;
           }, wait)
   
           if (callNow) func.apply(context, args)
       }
   }
   ```

    立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。 

   类似于js的while和do/while用法。

   

2. 节流的应用
   页面是长列表时，下拉动态加载列表数据，当下拉到底部时，才执行函数，以达到节流效果。

   节流函数代码

   ```javascript
   function throttle(func, wait) {
       let timeout;
       return function() {
           let context = this;
           let args = arguments;
           if (!timeout) {
               timeout = setTimeout(() => {
                   timeout = null;
                   func.apply(context, args)
               }, wait)
           }
   
       }
   }
   ```

   

##     代码展示

页面html结构

```html
<div id="content" style="width:800px;height:150px;margin:0 auto;line-height:150px;text-align:center; color: #fff;background:#eee;font-size:80px;">
		<span>移动鼠标看数字变化</span>
	</div>
```

javascript代码

```JavaScript
let num = 1;
let content = document.getElementById('content');

function count() {
    content.innerHTML = num++;
    console.log("执行模糊查询");
};
/*未优化的代码，性能低*/
content.onmousemove = count;

/* 防抖函数：一直移动鼠标，只有最后一次数字变化 */
// content.onmousemove = debounce(count,1000);
function debounce(func, wait){
    let timeout=null;
    return function(){
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(()=>{
            func.apply(this,arguments)
        }, wait)
    }
}

/*节流函数：一直移动鼠标，间隔1s数字变化一次*/
// content.onmousemove = throttle(count,1000);
function throttle(func, wait){
    let timeout = null;
    return function(){
        if(!timeout){
            timeout = setTimeout(()=>{
                func.apply(this, arguments);
                timeout = null;
            }, wait)
        }
    }
}
```



**防抖和节流函数主要区别**

防抖：如果事件存在，则清除事件clearTimeout，如果不存在一直等待，直到最后一次才执行函数。

节流：事件不存在，给事件赋值延时函数，等待wait时间后执行一次，并设置timeout事件为null。




---
title: react的fiber架构
date: 2022-10-22 00:17:43
permalink: /pages/17ff16/
categories:
  - front
  - javascript
  - react
tags:
  - 
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
# react的fiber架构
- JavaScript执行时，js引擎和页面渲染引擎在同一个渲染线程，GUI渲染和JavaScript执行两者互斥。
- 如果js执行任务事件过程，则会影响浏览器的渲染引擎，造成页面卡顿。
## 起因

- 目前主流设备的屏幕刷新率为60次/秒
- 每秒绘制的帧数（FPS）达到 60 页面显示才流畅；小于这个值时，用户会感觉到卡顿；
- 每帧的预算时间是16.667ms
- 每帧的开始包括样式计算、布局、绘制
- JavaScript执行和页面渲染[在同一个渲染进程](https://www.yuque.com/shenshuai89/front/fvqw3f#ApFEh)中，GUI渲染和JavaScript执行两者互斥
- 如果js任务执行时间过 长，浏览器渲染会被推迟。

浏览器一秒渲染60帧画面，每帧显示时间在16.66ms。浏览器在绘制每帧时经历的过程，如下图：
![Frame生命周期.png](https://cdn.nlark.com/yuque/0/2022/png/737887/1648123934803-8fa25533-cb02-4bad-bb35-268cdf27e8fa.png#clientId=uc972bf65-5987-4&from=ui&id=u3fd149d1&originHeight=1068&originWidth=2000&originalType=binary&ratio=1&rotation=0&showTitle=false&size=237580&status=done&style=none&taskId=uf624f117-e8a1-4f9a-ae17-31adb47e40d&title=)
### rAF【requestAnimationFrame】回调函数

- requestAnimationFrame回调函数在绘制之前执行。
- 每帧绘制时都会执行
- requestAnimationFrame(callback) 的 callback回调函数中的参数timestamp是回调被调用的时间，也就是当前帧的起始时间
- rafTime 等于 performance.timing.navigationStart + performance.now ； 约等于Date.now();
```html
<body>
<div id="box"
 style="background-color: red;width: 1px; height: 20px;color: antiquewhite;"
></div>
<button>start</button>
<script>
  let div = document.querySelector("#box");
  let button = document.querySelector("button");
  let startTime;
  function progress() {
    div.style.width = div.offsetWidth + 1 + "px";
    div.innerHTML = div.offsetWidth + "%";
    if (div.offsetWidth < 100) {
      startTime = Date.now();
      requestAnimationFrame(progress);
    }
  }
  button.onclick = function () {
    div.style.width = 0;
    startTime = Date.now();
    // 点击按钮时，调用一次
    requestAnimationFrame(progress);
  };
</script>
</body>
```
### requestIdleCallback

- requestIdleCallback 在每帧绘制完成后如果有剩余时间才执行，而不影响用户交互的关键事件，如动画、窗口缩放和输入响应
- 正常一帧任务完成后，时间小于16.6ms还有剩余时间，就会执行 requestIdleCallback 里面的任务。
- requestAnimationFrame 的回调在每帧时必定执行，属于高优先级任务；requestIdleCallback 回调则不能保证每帧都执行，属于低优先级任务。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/737887/1649052359865-3237dc5d-e604-44bc-9d05-0605c90e9edd.png#clientId=u05bb1a0d-5ed2-4&from=paste&height=728&id=u83c235ea&originHeight=728&originWidth=1126&originalType=binary&ratio=1&rotation=0&showTitle=false&size=202087&status=done&style=none&taskId=u585b4bc5-c8cd-4730-b420-7ee325deb87&title=&width=1126)
```javascript
function sleep(delay) {
  for (let now = Date.now(); Date.now() - now < delay; ) {}
}
let allStart = 0;
const works = [
  () => {
    allStart = Date.now();
    console.log("this first work start");
      sleep(20);
    console.log("this first work end");
  },
  () => {
    console.log("this second work start");
      sleep(15);
    console.log("this second work end");
  },
  () => {
    console.log("this third work start");
      sleep(10);
    console.log("this third work end");
    console.log(Date.now() - allStart);
  },
];

requestIdleCallback(workLoop, { timeout: 1000 });
// deadline参数是一个对象，有2个属性
//  timeRemaining(), 返回此帧还剩下多少时间让用户使用
//  didTimeout 判断回调任务callback是否超时
function workLoop(deadline) {
  console.log(`this frame remainTime is ${deadline.timeRemaining()}`);
  // deadline.timeRemaining() > 0 说明还有剩余时间
  // deadline.didTimeout说明任务已经过期，则必须执行
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    works.length > 0
  ) {
    performUnitOfWork();
  }
  if (works.length > 0) {
    console.log(`this frame remainTime is ${deadline.timeRemaining()}，时间片已经到期，等待下次调度`);
    window.requestIdleCallback(workLoop, { timeout: 1000 });
  }
}
function performUnitOfWork() {
  works.shift()();
}
```

![浏览器事件执行.png](https://cdn.nlark.com/yuque/0/2022/png/737887/1648907427308-5ee79c50-6052-4f88-8cac-3dc2032c259d.png#clientId=u3f21d4ff-0ea2-4&from=ui&id=ufc75dbb9&originHeight=844&originWidth=929&originalType=binary&ratio=1&rotation=0&showTitle=false&size=385212&status=done&style=none&taskId=u3d054a36-b2f0-4645-8d0d-a02850e0f6b&title=)
### MessageChannel

- 上面的 requestIdleCallback 方法只有Chrome支持
- react利用 MessageChannel 模拟 requestIdleCallback ，将回调延迟到绘制操作之后
- MessageChannel 允许创建一个新的消息通道，并通过它的2个 MessagePort 属性发送数据
- MessageChannel 创建一个通信管道，这个管道有2个端口，每个端口都可以通过 postMessage 发送数据，另一个端口只要绑定了onmessage回调方法，就可以通过另一个端口传递数据
- MessageChannel 是宏任务
```html
<script>
  let channel = new MessageChannel();
  let port1 = channel.port1;
  let port2 = channel.port2;
  port1.onmessage = function (event) {
    console.log("port1接收的数据：", event.data);
  };
  port2.onmessage = function (event) {
    console.log("port2接收的数据：", event.data);
  };
  port1.postMessage('port1发送数据');
  port2.postMessage('port2发送数据');
</script>
```
### 模拟实现 原生的requestIdleCallback
```javascript
let channel = new MessageChannel();
let activeFrameTime = 1000 / 60;
let frameDeadline; // 每帧的截止时间
let pendingCallback;
let timeRemaining = () => frameDeadline - performance.now();
channel.port2.onmessage = function () {
  let currentTime = performance.now();
  // 如果帧的截止时间，小于当前时间，说明已经过期
  let didTimeout = frameDeadline <= currentTime;
  if (didTimeout || timeRemaining() > 0) {
    if (pendingCallback) {
      // 原生requestIdleCallback回调函数中的2个参数
      pendingCallback({ didTimeout, timeRemaining });
    }
  }
};
window.requestIdleCallback = (callback, options) => {
  requestAnimationFrame((rafTime) => {
    // rafTime帧的开始时间
    console.log("rafTime", rafTime);
    frameDeadline = rafTime + performance.now();
    pendingCallback = callback;
    channel.port1.postMessage("send");
  });
};
```
## Fiber是什么

- 通过某些调度策略合理分配CPU资源，提高用户的响应速度。
- 通过 Fiber 架构，react把协调组件数据变化的过程变成可被中断，在适当的时候让出GPU执行权，就可以让浏览器及时处理用户的交互。

### Fiber是一个执行单元

- Fiber是一个执行单元，react在检查现在还剩下多少时间，如果没有时间交出控制权。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/737887/1649049510873-0439b9db-e025-465f-8f8a-48fd5b81f5ff.png#clientId=ua33c43cf-f9b5-4&from=paste&height=750&id=dKfdN&originHeight=750&originWidth=603&originalType=binary&ratio=1&rotation=0&showTitle=false&size=158826&status=done&style=none&taskId=ub72d1c8c-6622-4849-bf6e-f699b50885e&title=&width=603)
### Fiber是一种数据结构

- react目前的做法使用链表，每个虚拟节点内部表示为Fiber.

![image.png](https://cdn.nlark.com/yuque/0/2022/png/737887/1649051115546-2e27fe86-9585-4a56-9040-91e5f13751d2.png#clientId=u046380ca-815d-4&from=paste&height=705&id=u91449f3e&originHeight=705&originWidth=937&originalType=binary&ratio=1&rotation=0&showTitle=false&size=143949&status=done&style=none&taskId=u55432aac-31e3-4d11-99ad-098c6022b15&title=&width=937)
## Fiber执行阶段
每个渲染节点有2个阶段：Reconciliation(协调render阶段)和Commit(提交阶段)

- Reconciliation阶段：可以认为是diff过程，这个阶段可以被中断。在该阶段找出所有节点变更，例如节点新增、删除、属性变更等，这些称为react的 副作用（effect）
- Commit阶段：将上个阶段计算出来的需要处理的副作用一次执行。这个阶段的执行必须同步执行，不能被打断。
### render阶段

- 从顶点开始遍历
- 如果有儿子，先遍历第一个儿子
- 如果没有儿子，标志着此节点遍历完成
- 如果有兄弟节点，继续遍历兄弟节点
- 如果没有下一个兄弟，返回父节点并标识 父节点遍历完成；如果有叔叔节点，则遍历叔叔节点；没有叔叔节点，则父节点上一个节点遍历结束。整个流程遍历完成

![image.png](https://cdn.nlark.com/yuque/0/2022/png/737887/1649061929964-1df2868a-80d1-446e-b7da-ff6d8eba94c4.png#clientId=u299489fa-94ef-4&from=paste&height=733&id=u226efc8c&originHeight=733&originWidth=1212&originalType=binary&ratio=1&rotation=0&showTitle=false&size=251972&status=done&style=none&taskId=u4cd34c00-00e1-469d-824e-6bd618aa6e7&title=&width=1212)
```javascript
/* 
Fiber是一个执行单元
    1. Fiber是一个执行单元，类似对象。每次执行完一个执行单元，react会检查可使用的时间还有多少，如果没时间就把控制权让出去
    2. 通过Fiber架构，让Reconcilation过程变成可被中断，适时会让出CPU执行权，让浏览器优先处理用户的交互
Fiber执行阶段
    每次渲染包含2个阶段：Reconcilation(协调或render渲染)和Commit(提交阶段)
    协调阶段：Reconcilation可以认为是diff阶段，该阶段可被中断，会造成节点变更，如新增、删除等，这些变更react称为副作用effect
    提交阶段：将上一个阶段计算出来的所有需要处理的副作用一次性执行。这个阶段必须同步执行，不能被打断
 */
let A1 = { type: "div", key: "A1" };
let B1 = { type: "div", key: "B1", return: A1 };
let B2 = { type: "div", key: "B2", return: A1 };
let C1 = { type: "div", key: "C1", return: B1 };
let C2 = { type: "div", key: "C2", return: B1 };
A1.child = B1;
B1.sibling = B2;
B1.child = C1;
C1.sibling = C2;

let nextUnitOfWork; // 下一个执行单元
function workLoop() {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork) {
    console.log("render阶段结束");
  }
}
function performUnitOfWork(fiber) {
  beginWork(fiber);
  if (fiber.child) {
    //如果有子，返回第一个子节点 A1之后B1
    return fiber.child;
  }
  while (fiber) { // 如果没有子，说明该节点完成。
    completeUnitOfWork(fiber);
    // 节点自身完成，开始查看是否有兄弟节点，如果有返回兄弟节点
    if (fiber.sibling) {
      return fiber.sibling;
    }
    // 兄弟节点也遍历完毕，则返回父节点，让父节点再次查找兄弟节点，即该节点的叔叔节点。
    fiber = fiber.return;
  }
}
function completeUnitOfWork(fiber) {
  console.log(fiber.key, "end");
}
function beginWork(fiber) {
  console.log(fiber.key, "start");
}
nextUnitOfWork = A1;
workLoop();
```




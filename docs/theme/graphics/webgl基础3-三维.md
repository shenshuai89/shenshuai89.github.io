---
title: webgl基础3-三维
date: 2024-04-27 10:53:14
permalink: /pages/c5c5a5/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

## 创建视图矩阵

### 决定视图的参数

三维场景的名词定义：视点、目标点、上方向

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb21d70b9e074ccab001d0f26b24ab72~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2118&h=982&s=110115&e=png&b=ffffff)
为确定观察者状态，需要获取**视点**【观察者的位置】、**目标点**【被观察目标所在的点】两项信息。最后要把观察到的景象绘制到屏幕上，还需要知道**上方向；** 有这三个信息可以确定观察者看到的内容。

-   视点：观察者所在的三维空间中位置，视点坐标用(eyeX, eyeY, eyeZ)表示
-   目标点：被观察目标所在的位置，目标点坐标用(atX, atY, atZ)表示。目标点和视点之间的连线，是视线方向。
-   上方向：要想最终确定在屏幕上显示的内容，还需要确定一个上方向；如果仅仅确定视点和观察点，观察者还可以以视线为轴进行旋转，这样导致看到的目标点形状就会发生变化；上方向用3个分量的矢量来表示(upX, upY, upZ).


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9b5ed3d9c69437a9e3fb2487b4fe273~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1066&h=360&s=68380&e=png&b=fefefe)

### 可视范围

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70e18f3026d349f38f45aa8aafda1a96~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1126&h=564&s=66303&e=png&b=ffffff)
三维空间中的三维物体只有在可视范围内，WEBGL才会绘制它；

人类只能看到眼前的东西，水平视角大约200度左右。绘制可视范围外的对象没有意义。
### 辅助函数

-   归一化函数 normalized：将数据调整到`-1到1`或者`0到1`之间
-   叉集 cross ： 获取两个平面的法向量
-   点集 dot : 获取某点在x、y、z轴的投影长度
-   向量差：获取目标点和视点的向量

```js
// 归一化函数
function normalized(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i] * arr[i]
  }

  const middle = Math.sqrt(sum);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] / middle;
  }
}

// 叉积函数 获取法向量
function cross(a,b) {
  return new Float32Array([
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ])
}

// 点积函数 获取投影长度
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

// 向量差
function minus(a, b) {
  return new Float32Array([
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2],
  ])
}
```
**通过使用以上函数，推导出视图矩阵**


```js
// 视图矩阵获取
function getViewMatrix(eyex, eyey, eyez, lookAtx, lookAty, lookAtz, upx, upy, upz) {

  // 视点
  const eye = new Float32Array([eyex, eyey, eyez])
  // 目标点
  const lookAt = new Float32Array([lookAtx, lookAty, lookAtz])
  // 上方向
  const up = new Float32Array([upx, upy, upz])

  // 确定z轴
  const z = minus(eye, lookAt);

  normalized(z);
  normalized(up);

  // 确定x轴
  const x = cross(z, up);

  normalized(x);
  // 确定y轴
  const y = cross(x, z);

  return new Float32Array([
    x[0],       y[0],       z[0],       0,
    x[1],       y[1],       z[1],       0,
    x[2],       y[2],       z[2],       0,
    -dot(x,eye),-dot(y,eye),-dot(z,eye),1
  ])
}
```
### 视图矩阵实例代码

代码通过改变视点位置坐标，形成视图动画效果。
[jcode](https://code.juejin.cn/pen/7298148349671112740)

## 正射投影（平行投影）
### 概念定义

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a66db258a3b434c9cc47d3b5be87c69~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1344&h=629&s=332500&e=png&b=fdfdfd)

左侧为透视投影，右侧为正射投影；

在透视投影下，产生的三维场景有近大远小的透视感，更符合真是场景。

正射投影的好处是用户可以方便比较场景中物体的大小，这是因为物体看上去大小与其所在的位置没有关系，在建筑平面图等测绘图中使用。


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85b8c08cc72d445ca8d8e3ae2f05f62d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1248&h=741&s=223869&e=png&b=faf9f9)

**下图是正射投影，投射到xy平面的示例。**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94f82c48ee2448b69b848ee7d04f351a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=495&h=451&s=98559&e=png&b=eae9e9)

A点做正射投影映射，转化到A'；
### 首先推导左右区间

用L表示left的值，用R表示right的值

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24a45c4c08e34e7f8167d2f22a6eff3b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1480&h=820&s=103779&e=png&b=ffffff)
### 以此类推上下区间和远近区间公式

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0720764ecaac47348a475c60d8b1c4ae~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=676&h=694&s=28196&e=png&b=ffffff)
根据矢量点和一个矩阵相乘，推导出x'、y'、z'、w'的值

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4af86907b6b5453d83b5f5b66e85d18b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1980&h=846&s=142057&e=png&b=ebebeb)

```js
x' = ax + by+ cz + d;
y' = ex + fy + gz + h;
z' = ix + jy + kz + l;
w' = mx + ny + oz + p;
```
将左右区间、上下区间、远近区间公式和上面图中的x'、y'、z'、w'进行等式替换；

```js
// 只有 a= 2/(r-l) 且 d=-(r+l)/(r-l)、b=c=0 时等式成立
// 只有 f= 2/(t-b) 且 h=-(t+b)/(t-b)、e=g=0 时等式成立
// 只有 k= 2/(f-n) 且 l=-(f+n)/(f-n)、i=j=0 时等式成立
// m=n=o=0且p=1
```
将以上等式矩阵，转为列矩阵，就是下面的正射投影矩阵

### 正射投影矩阵

```js
// 获取正射投影矩阵
function getOrtho(l, r, t, b, n, f) {
  return new Float32Array([
    2 / (r - l), 0,           0,           0,
    0,           2/(t-b),     0,           0,
    0,           0,           -2/(f-n),    0,
    -(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1
  ])
}
```
### 完整示例代码  
案例通过移动视点坐标，实现视图改变的动画效果。
[jcode](https://code.juejin.cn/pen/7298149955389587493)

## 透视投影

### 概念定义

下图左侧为透视投影；

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aae1cad332e443c8980ee1b6b398269a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1344&h=629&s=332500&e=png&b=fdfdfd)

下图右侧在WEBGL场景中放置3个大小同样的三角形，区别是在Z轴的位置不同；视点在(0, 0, 5)位置,可以产生出如下图左侧的效果。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f6abc632cc84d67b8adc882f36e95bc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1500&h=679&s=273118&e=png&b=ffffff)

透视投影符合近大远小的规律；

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fc6e4178567418cab26857b46141099~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1500&h=762&s=234768&e=png&b=fdfdfd)

先将透视投影缩放到正射投影，然后通过缩放矩阵和正射投影矩阵相乘，得到透视投影矩阵


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5933638d95d47beb86d2a82465f5b12~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1250&h=950&s=228734&e=png&b=fefefe)

### 推导透视矩阵公式

#### 获取透视比例关系

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97bbccb1d12b46a1b377994b328d882b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=734&h=350&s=92915&e=png&b=ebebeb)

根据相似三角形定律，可以得出左边的比例关系，从而推导出 `y' = yn/f` 和 `x'=xn/f`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f301997b4c3465996a46f10a4d60cae~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=386&h=193&s=21987&e=png&b=eaeaea)

在做映射时，z坐标的长度f是固定不变，f为定长1，所以 `y' = yn`和`x'=xn`
#### 第一步：推算出a和b的值

从而可以推导出**缩放矩阵的第一步**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d43b85b50bd4571a9aff500f4f69137~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1300&h=528&s=34524&e=png&b=ffffff)
#### 第二步：获取参数c和d值

然后进行透视矩阵的第二步推导，c和d的值；

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b4798b6feef47ecba3bd9839d25dffe~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=647&h=463&s=85859&e=png&b=f4f3f3)
根据相似三角形关系，得到如下等式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8efbeefef4a146369642bbc30a8c3fee~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=640&h=251&s=57136&e=png&b=fefefe)
利用齐次坐标的一个性质，所谓齐次坐标就是使用n+1维来表示n维坐标。这里需要用到齐次坐标的一个性质，如果(x,y,z,1)表示投影到w=1平面的点坐标，那么(nx,ny,nz,n)坐标投影到w=1平面的是同一个点(nx/n,nz/n,nz/n,n/n)=(x,y,z,1)，这就是**齐次坐标的尺度不变性**。

利用齐次坐标特性，将上面的公式得到的结果同时乘以Ze

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41ed9c7de1b740debe33e7e184d7db66~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=640&h=323&s=68621&e=png&b=fefefe)

Mpersp为4x4矩阵，根据上面的公式我们能得出矩阵的第一、二、四行的值


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfaaafc515fb444fbfd17bbf9bc6e806~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=640&h=231&s=91001&e=png&b=fefcfc)

-----------------

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55e79664a3ff44879e5f20afd28a8f07~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=640&h=283&s=130263&e=png&b=fefcfc)

--------

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc329dafffe749f2a2ca46390fcf4871~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=834&h=1102&s=70592&e=png&b=ffffff)

#### 第三步根据收缩矩阵和正射投影矩阵的乘积，得到透视投影矩阵

```js
[
  n*2/(r-l) + 0*0 + 0*0 + 0*-(r+l)/(r-l), n*0 + 0*2/(t-b) + 0*0 + 0* -(t+b)/(t-b), n*0 + 0*0 + 0* -2/(f-n) + 0*-(f+n)/(f-n), n*0 + 0*0 + 0*0 +0*1, 
  0*2/(r-l) + n*0 + 0*0 + 0*-(r+l)/(r-l), 0*0 + n*2/(t-b) + 0*0 + 0* -(t+b)/(t-b), 0*0 + n*0 + 0* -2/(f-n) + 0*-(f+n)/(f-n), 0*0 + n*0 + 0*0 +0*1,
  0*2/(r-l) + 0*0 + (f+n)*0+ -1*-(r+l)/(r-l), 0*0+0*2/(t-b)+(f+n)*0+ -1*-(t+b)/(t-b), 0*0+0*0+(f+n)*-2/(f-n)+ -1 *-(f+n)/(f-n),0*0+0*0+(f+n)*0+-1*1,
  0*2/(r-l)+0*0+fn*0+0*-(r+l)/(r-l), 0*0+0*2/(t-b)+fn*0+0*-(t+b)/(t-b), 0*0 + 0*0 + fn* -2/(f-n) + 0*-(f+n)/(f-n), 0*0+0*0+fn*0 + 0*1, 
]
// 由于r+l=0 以及 t+b = 0
// 可以将矩阵简化为
[
  2n/(r-l),  0,          0,            0,
  0,         2n/(t-b),   0,            0,
  0,         0,          -(f+n)/(f-n), -1,
  0,         0,          (-2nf)/(f-n), 0
]
// js中矩阵是列主序的矩阵，所以等到如下图公式
```
第一列*第一行 = 第一行的第一列

第1列*第2行 = 第1行的第2列

第1列*第3行 = 第1行的第3列

第1列*第4行 = 第1行的第4列

第2列*第1行 = 第2行的第1列

.......

收缩矩阵和正交投影矩阵相乘结果如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4ac2e45582241cd9516c0d764a65c95~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=950&h=478&s=25869&e=png&b=ffffff)

#### 第四步通过角度将透视矩阵进行转换

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/381c10a460bb43a6b8575bbef0bcd84e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=734&h=350&s=75025&e=png&b=ebebeb)

根据视角α 和 宽高比 aspect 求出 top、bottom、left、right四个边界方向

`t = n * tan(α /2)`

`b = -t`

`r = n * aspect * tan(α/2)`

`l = -r`

计算之后结果

r-l = 2* n * aspect * tan(α/2)

t-b = 2n* tan(α/2)

r+l = 0;

t+b=0

将结果带入到透视投影矩阵中

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/893a01730f11443ea8de7fbb6a5d399f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1218&h=528&s=35091&e=png&b=ffffff)

### 透视投影实例代码
[jcode](https://code.juejin.cn/pen/7298153044020854835)
通过点击上下左右键盘，可以对视图的物体进行转动
## 三维场景中2个重要概念

### 隐藏面消除

正确处理物体的前后关系，是三维场景中重要的概念。前面的物体会阻挡后边物体的显示。在webgl中叫做隐藏面消除。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/064995538305494aab494d56b4c06d18~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1370&h=782&s=703577&e=png&b=dae3ea)

#### 正常显示前后关系

```js
 var verticesColors = new Float32Array([
   // 顶点坐标和颜色
   0.0, 1.0, -4.0 , 0.4, 1.0, 0.4, // 绿色三角形在后边
   -0.5, -1.0, -4.0 , 0.4, 1.0, 0.4,
   0.5, -1.0, -4.0 , 1.0, 0.4, 0.4,
   
   0.0, 1.0, -2.0 , 1.0, 1.0, 0.4, // 黄色的在中间
   -0.5, -1.0, -2.0 , 1.0, 1.0, 0.4,
   0.5, -1.0, -2.0 , 1.0, 0.4, 0.4,
   
   0.0, 1.0, -1.5 , 0.4, 0.4, 1.0, // 蓝色的前面
   -0.5, -1.0, -1.5 , 0.4, 0.4, 1.0,
   0.5, -1.0, -1.5 , 1.0, 0.4, 0.4,
 ]);
```
WEBGL中按照定义顶点坐标的顺序来绘制，蓝色的最后定义，所以可以绘制到最外层，同时Z轴坐标也是最靠前，能够正确显示物体的前后关系。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e583d437256e490f832704f1cf68ead7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=524&h=694&s=36437&e=png&b=ffff00)

#### 完整示例代码
[jcode](https://code.juejin.cn/pen/7298153974586081314)

#### 非正常显示前后关系

接下来调整下顶点坐标的绘制顺序，将蓝色的放到第一个绘制。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00bb8ff32f4c4e5d921c1ddca73a310d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1106&h=654&s=94136&e=png&b=1f1f1f)

[jcode](https://code.juejin.cn/pen/7298154505203449895)
蓝色显示在最后，绿色显示在最前面。这个和定义的Z轴坐标是不符合的。按照定义Z轴坐标的关系，绿色的三角形依然在最后。
#### 使用隐藏消除面，解决前后关系

为了解决不符合Z轴前后关系的问题，webgl提供**隐藏消除面**的功能。

开启隐藏面消除功能，需要以下2步。

-   开启隐藏面消除，`gl.enable(gl.DEPTH_TEST)`
-   在绘制之前，清除深度缓冲区 `gl.clear(gl.DEPTH_BUFFER_BIT);`

**gl.enable(cap)函数的使用，cap表示开启的功能**

-   **cap：** gl.DEPTH_TEST 或 gl.BLEND 或 gl.POLYGON_OFFSET_FILL

**gl.clear()方法清除深度缓冲区**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/790ca62f16b548f48f71f694c028f8cf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1512&h=508&s=83370&e=png&b=ffffff)

[jcode](https://code.juejin.cn/pen/7298155241001648162)

### 深度冲突  
隐藏面消除可以解决坐标位置前后关系，但是如果Z轴坐标相同的图形，还是会出现问题，使得图像出现斑斑驳驳。这种现象称为深度冲突。  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc4e47a97b4d4a0d8cdde7ed4918b4d6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=696&h=714&s=79645&e=png&b=000000)

webgl提供一个**多边形偏移**的功能，可以解决这个问题。机制是在Z轴上添加一个偏移量，偏移量的值由物体表面相对于观察者视线的角度来确定。

1.  启用多边形偏移，`gl.enable(gl.POLYGON_OFFSET_FILL);`
1.  在绘制之前指定偏移量的参数，`gl.polygonOffset(1.0, 1.0);`


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1125d424cc4d4e81b083d240379e6629~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=750&h=736&s=57121&e=png&b=000000)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa4680ea5b13420b89a46c66dab25bcb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1278&h=612&s=143201&e=png&b=1f1f1f)

```js
const vm = getViewMatrix(eyex, eyey, eyez, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
const perspective = getPerspective(35, ctx.width / ctx.height, 100, 1);
// 创建隐藏面消除
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);

// 清除视图缓存区
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

gl.uniformMatrix4fv(mat, false, mixMatrix(vm, perspective));
gl.enable(gl.POLYGON_OFFSET_FILL);
gl.drawArrays(gl.TRIANGLES, 0, 3 * 1);
gl.polygonOffset(1.0, 1.0);
gl.drawArrays(gl.TRIANGLES, 0, 3 * 1);
```
## 绘制立方体图形
### 顶点法

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c70c582138442d08185a4b365a63f57~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1154&h=780&s=39051&e=png&b=ffffff)

绘制立方体需要定义8个顶点；

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/381cc53b345249c1ac8ba691a96bf265~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1680&h=968&s=145120&e=png&b=ffffff)
#### 创建基础模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    canvas{
      margin: 50px auto 0;
      display: block;
      background: yellow;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="400" height="400">
    此浏览器不支持canvas
  </canvas>
</body>
</html>
<script>
	function initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) {
	  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	  gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE) // 指定顶点着色器的源码
	  gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE) // 指定片元着色器的源码

	  // 编译着色器
	  gl.compileShader(vertexShader)
	  gl.compileShader(fragmentShader)

	  // 创建一个程序对象
	  const program = gl.createProgram();

	  gl.attachShader(program, vertexShader)
	  gl.attachShader(program, fragmentShader)

	  gl.linkProgram(program)

	  gl.useProgram(program)

	  return program;
	}
	
	// 视图矩阵获取
	function getViewMatrix(eyex, eyey, eyez, lookAtx, lookAty, lookAtz, upx, upy, upz) {

	  // 视点
	  const eye = new Float32Array([eyex, eyey, eyez])
	  // 目标点
	  const lookAt = new Float32Array([lookAtx, lookAty, lookAtz])
	  // 上方向
	  const up = new Float32Array([upx, upy, upz])

	  // 确定z轴
	  const z = minus(eye, lookAt);

	  normalized(z);
	  normalized(up);

	  // 确定x轴
	  const x = cross(z, up);

	  normalized(x);
	  // 确定y轴
	  const y = cross(x, z);

	  return new Float32Array([
		x[0],       y[0],       z[0],       0,
		x[1],       y[1],       z[1],       0,
		x[2],       y[2],       z[2],       0,
		-dot(x,eye),-dot(y,eye),-dot(z,eye),1
	  ])
	}
	
	// 矩阵复合函数
	function mixMatrix(A, B) {
	  const result = new Float32Array(16);

	  for (let i = 0; i < 4; i++) {
		result[i] = A[i] * B[0] + A[i + 4] * B[1] + A[i + 8] * B[2] + A[i + 12] * B[3]
		result[i + 4] = A[i] * B[4] + A[i + 4] * B[5] + A[i + 8] * B[6] + A[i + 12] * B[7]
		result[i + 8] = A[i] * B[8] + A[i + 4] * B[9] + A[i + 8] * B[10] + A[i + 12] * B[11]
		result[i + 12] = A[i] * B[12] + A[i + 4] * B[13] + A[i + 8] * B[14] + A[i + 12] * B[15]
	  }

	  return result;
	}
	
	// 归一化函数
	function normalized(arr) {
	  let sum = 0;

	  for (let i = 0; i < arr.length; i++) {
		sum += arr[i] * arr[i]
	  }

	  const middle = Math.sqrt(sum);

	  for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i] / middle;
	  }
	}
	
	// 叉积函数 获取法向量
	function cross(a,b) {
	  return new Float32Array([
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0],
	  ])
	}
	
	// 点积函数 获取投影长度
	function dot(a, b) {
	  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
	}


	// 向量差
	function minus(a, b) {
	  return new Float32Array([
		a[0] - b[0],
		a[1] - b[1],
		a[2] - b[2],
	  ])
	}
	
	// 获取透视投影矩阵
	function getPerspective(fov, aspect, far, near) {
	  fov = fov * Math.PI / 180;
	  return new Float32Array([
		1/(aspect*Math.tan(fov / 2)), 0, 0, 0,
		0, 1/(Math.tan(fov/2)),0,0,
		0,0,-(far+near)/(far-near),-(2*far*near)/(far-near),
		0,0,-1,0,
	  ])
	}

  const ctx = document.getElementById('canvas')

  const gl = ctx.getContext('webgl')

  // 创建着色器源码
  const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute vec4 aColor;
    varying vec4 vColor;

    uniform mat4 mat;
    void main() {
      gl_Position = mat * aPosition;
      vColor = (1.0, 0.0, 0.0, 1.0);
    }
  `; // 顶点着色器

  const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;
    varying vec4 vColor;

    void main() {
      gl_FragColor = vColor;
    }
  `; // 片元着色器

  const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)

  const aPosition = gl.getAttribLocation(program, 'aPosition');
  const aColor = gl.getAttribLocation(program, 'aColor');
  const mat = gl.getUniformLocation(program, 'mat');


  let eyex = 0.0;
  let eyey = -0.1;
  let eyez = 0.2;

  function draw() {
    const vm = getViewMatrix(eyex,eyey,eyez,0.0,0.0,0.0,0.0,0.6,0.0);
    const perspective = getPerspective(150, ctx.width / ctx.height, 100, 1);
   
    gl.uniformMatrix4fv(mat, false, mixMatrix(perspective, vm));
    gl.drawArrays(gl.TRIANGLES, 0, 3 * 6);
	
		requestAnimationFrame(draw);
  }

  draw()
</script>

```
#### 创建出需要的8个顶点数据

```js
 // 顶点
  const v0 = [1,1,1];
  const v1 = [-1,1,1];
  const v2 = [-1,-1,1];
  const v3 = [1,-1,1];
  const v4 = [1,-1,-1];
  const v5 = [1,1,-1];
  const v6 = [-1,1,-1];
  const v7 = [-1,-1,-1];
// 通过结构顶点数据，组成的面
  const points = new Float32Array([
    ...v0,...v1,...v2, ...v0,...v2, ...v3, // 前
    ...v0,...v3,...v4, ...v0,...v4, ...v5, // 右
    ...v0,...v5,...v6, ...v0,...v6, ...v1, // 上面
    ...v1,...v6,...v7, ...v1,...v7, ...v2, // 左
    ...v7,...v4,...v3, ...v7,...v3, ...v2, // 底
    ...v4,...v7,...v6, ...v4,...v6, ...v5, // 后
  ])
```
完整绘制代码
[jcode](https://code.juejin.cn/pen/7298157093209505801)
绘制出来一个红色正方形，现在还看不出来立方体的形状，可以通过改变视角，进行查看

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25c664bff54c4defad26538ae655d7a0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=594&h=216&s=27480&e=png&b=272c35)
通过调整 eyeX、eyeY、eyeZ的值，可以看到透视的正方形

[jcode](https://code.juejin.cn/pen/7298157627807924278)
#### 添加旋转动画

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/131682a793a1467ab39edfef199740b0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=647&h=383&s=38632&e=png&b=272c35)

[jcode](https://code.juejin.cn/pen/7298158206923538466)

#### 给每个面添加自定义颜色

主要是重新定义个颜色的缓冲对象buffer；

将bufferData数据进行绑定，然后进行colorData赋值；

之后通过gl.vertexAttribPointer给aColor设置值；

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/798b62328d984ed6a6fa83ec5931a77a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=495&h=296&s=23048&e=png&b=272c35)
[jcode](https://code.juejin.cn/pen/7298158816066502671)

### 索引法

#### 创建顶点数据信息

```js
// 创建顶点数据信息vertices
const vertices = new Float32Array([
   1, 1, 1,
  -1, 1, 1,
  -1,-1, 1,
   1,-1, 1,
   1,-1,-1,
   1, 1,-1,
  -1, 1,-1,
  -1,-1,-1,
])

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition)
```
#### 通过索引进行设置面

```js
const indeces = new Uint8Array([
  // 3点组成一个3角形，2个三角形组成一个面
  0,1,2,0,2,3, 
  0,3,4,0,4,5,
  0,5,6,0,6,1,
  1,6,7,1,7,2,
  7,4,3,7,3,2,
  4,6,7,4,6,5,
])
const indexBuffer = gl.createBuffer();
// 绑定索引的buffer数据，需要使用 ELEMENT_ARRAY_BUFFER 方法
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indeces, gl.STATIC_DRAW);
```
通过索引绘制面，需要使用`drawElements`函数；
#### drawElements方法函数的使用

用了绘制面信息，包含4个参数

-   mode：同drawArrays时的参数值
-   count： 要绘制的顶点数量
-   type： 顶点数据类型，值为gl.UNSIGNED_BYTE 或者 gl.UNSIGNED_SHORT
-   offset： 索引数组开始绘制的位置


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74282c555c914202a27d4c6f9c34ebf6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=249&s=41219&e=png&b=282923)

#### 完整的索引创建立方体代码

[jcode](https://code.juejin.cn/pen/7298160036533469236)
#### 给每个面添加不同颜色

##### 创建顶点缓存数据

```js
// 顶点数据，组成面
const vertices = new Float32Array([
    // 0123，组成前面
    1, 1, 1,
    -1, 1, 1,
    -1,-1, 1,
    1,-1, 1,
    // 0345，组成右面
    1, 1, 1,
    1,-1, 1,
    1,-1,-1,
    1, 1,-1,
    // 0156，组成上面
    1, 1, 1,
    1, 1, -1,
    -1, 1,-1,
    -1, 1,1,
    // 1267，组成左面
    -1, 1, 1,
    -1,1, -1,
    -1, -1,-1,
    -1,-1,1,
    // 2347组成下面
    -1,-1, 1,
    1,-1, 1,
    1,-1,-1,
    -1,-1,-1,
    // 4567组成后面
    1,-1,-1,
    1, 1,-1,
    -1, 1,-1,
    -1,-1,-1,
])
// 顶点位置缓存区
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition)
```
创建颜色缓存数据

```js
// 创建颜色数据
const colors = new Float32Array([
  0.4,0.4,1.0, 0.4,0.4,1.0, 0.4,0.4,1.0, 0.4,0.4,1.0,
  0.4,1.0,0.6, 0.4,1.0,0.6, 0.4,1.0,0.6, 0.4,1.0,0.6,
  1.0,0.4,0.4, 1.0,0.4,0.4, 1.0,0.4,0.4, 1.0,0.4,0.4,
  1.0,0.8,0.4, 1.0,0.8,0.4, 1.0,0.8,0.4, 1.0,0.8,0.4,
  1.0,0.0,1.0, 1.0,0.0,1.0, 1.0,0.0,1.0, 1.0,0.0,1.0,
  0.0,1.0,1.0, 0.0,1.0,1.0, 0.0,1.0,1.0, 0.0,1.0,1.0,
])
//  创建颜色缓存区
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aColor)
```
[jcode](https://code.juejin.cn/pen/7298160666592935988)

内容参考 《webgl编程指南》 

更多资源文档和代码[下载地址](https://shenshuai89.github.io/pages/10c961/)
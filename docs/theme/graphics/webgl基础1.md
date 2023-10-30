---
title: webgl基础1
date: 2023-10-30 22:43:28
permalink: /pages/212cb3/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

视频资料链接：https://pan.baidu.com/s/1Y69yCy1ZLc6Y_W62btEmMQ 提取码：ohai
文档资料链接：https://pan.baidu.com/s/1tanZd7AZ-CMaf6KvYZSsVw 提取码：jwtm

## 基础概念
### 着色器
着色器：使用webgl绘图，必须使用着色器。着色器程序以字符串的形式“嵌入”javascript文件中。类似c的编程语言，来实现视觉效果, 【**着色器源码中的结尾分号“;” 是必须不能少**】。webgl中共有2种着色器

-   顶点着色器：用来描述顶点特性（位置、颜色）信息，
-   片元着色器：进行逐片元处理过程如：光照的程序；

**webgl程序中，图形的绘制主要就是依赖着色器代码实现。着色器可以灵活实现光照、灯光、阴影、贴图等渲染效果。**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a1f796a27db471580ed864c576435cf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=750&h=396&s=74589&e=png&b=fefefe)
### 左右手坐标系
**openGL中使用的是**[右手坐标系](https://www.zhihu.com/search?q=%E5%8F%B3%E6%89%8B%E5%9D%90%E6%A0%87%E7%B3%BB&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2452684040%7D)；

-   右手坐标系，z轴正方向是从屏幕里向外
-   左手坐标系，z轴正方向是从外向屏幕里

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/336ea17b6baa414cadef8cc2e7814cab~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=748&h=564&s=168623&e=png&b=f5f4f4)

### 变量：

attribute、uniform、varying可以定义js和webgl【着色器】中传递数据的变量。

-   attribute：定义的是与顶点相关的数据，例如位置；只能用在顶点着色器中。
-   uniform：定义对应所有顶点都相同的数据(与顶点无关)，例如：颜色，大小
-   varying: 定义必须是全局变量，目的是从顶点到片元着色器传输数据。必须同时在两种着色器中声明同名、同类型的varying变量。

定义变量的格式：<存储限定符> <类型> <变量名>;

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac419ff936854581a28d08bd44be0091~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=560&h=180&s=52274&e=png&b=fcfcfc)

⚠️：行结尾的分号不可以漏掉；

```
attribute vec4 a_Position;
```

vec4: 表示有4个浮点数定义的矢量

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4f4e58314dd4726923551a737dd5fc4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1076&h=190&s=18159&e=png&b=ffffff)

  


#### 齐次坐标

在坐标定义中，vec4变量中的第4个值表示齐次坐标值。

齐次坐标(x,y,z,w)等价于三维坐标(x/w,y/w,z/w)。所以如果第4个分量值是1，就可以把vec4定义的矢量当作三维坐标使用。

w的值必须大于等于0，如果是趋近0，就表示点趋近无穷远。

**矩阵坐标乘法会经常用到齐次坐标。**
绘制操作函数  
drawArrays：用来绘制各种图形；共3个参数，mode、first、count  
●mode：指定绘制方式，有gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN  
●first： 指定从哪个顶点开始绘制，【整型数】  
●count：指定绘制需要用多少个顶点【整型数】  
错误：  
INVALID_ENUM: 传入的mode参数不合法  
INVALID_VALUE: 参数first或count为负数  
类型化数组  
javascript中Array定义的变量不能限定变量的类型，这对于需要处理大量数据的三维绘图程序来说性能低。  
在webgl中通常会处理大量同类型的数据，为了优化性能，webgl为每种基本数据类型引入了特殊的类型化数组。  
例如：Float32Array是32位浮点类型数组，通常用来存储顶点的坐标或颜色数据。  


| 数组类型         | 占的字节 | 描述（c语言中的数据类型）             |
| ------------ | ---- | ------------------------- |
| Int8Array    | 1    | 8位整型数（signed char）        |
| UInt8Array   | 1    | 8位无符号整型数（unsigned char）   |
| Int16Array   | 2    | 16位整型数（signed short）      |
| UInt16Array  | 2    | 16位无符号整型数（unsigned short） |
| Int32Array   | 4    | 32位整型数（signed int）        |
| UInt32Array  | 4    | 32位无符号整型数（unsigned int）   |
| Float32Array | 4    | 单精度32位浮点数（float）          |
| Float64Array | 8    | 双精度64位浮点数（double）         |

注意：与普通的javascript数组不同的是，类型化数组不支持push和pop方法  
类型化数组的方法  


| 方法、属性、常量           | 描述                                |
| ------------------ | --------------------------------- |
| get(index)         | 获取第 index 个元素                     |
| set(index, value)  | 设置第 index 个元素的值为value             |
| set(array, offset) | 从第 offset 个元素开始，将数组 array 中的值填充进去 |
| length             | 数组的长度                             |
| BYTES_PER_ELEMENT  | 数组中每个元素所占的字节数                     |

创建类型化数组  


```js
// 使用 new 关键字是创建类型化数组的唯一方式，
new Float32Array([1.0, 2.0, -1.0, 2.0]);

// 也可以指定数组元素个数创建一个空的类型化数组
new Float32Array(4);
```

## 创建第一个webgl程序
#### 1.在html中添加canvas标签

```html
<div>
    <canvas id="canvas" width="400" height="400"></canvas>
</div>
```
#### 2.设置绘图上下文

```js
// 获取canvas元素
const ctx = document.getElementById('canvas')

// 获取webgl绘图上下文
const gl = ctx.getContext('webgl')
```
#### 3.设置顶点着色器和片元着色器 代码

```js
// 顶点着色器代码
const VERTEX_SHADER = `
    void main(){
        gl_Position = vec4(0.0,0.0,0.0,1.0);
        gl_PointSize = 15.0;
    }
`;

// 片元着色器代码
const FRAGMENT_SHADER = `
    void main(){
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;
```
#### 4.创建着色器对象

```js
// 创建顶点着色器
const vertexShader = gl.createShader(gl.VERTEX_SHADER);

// 创建片元着色器
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
```
#### 5.将着色器代码添加到着色器对象中

```js
// 将顶点着色器代码添加到顶点着色器中
gl.shaderSource(vertexShader, VERTEX_SHADER);

// 将片元着色器代码添加到片元着色器中
gl.shaderSource(fragmentShader, FRAGMENT_SHADER);
```
#### 6.编译着色器对象

```js
// 添加完成后，需要编译着色器对象
gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);
```
#### 7.创建程序对象，将着色器对象添加到程序对象中

```js
const program = gl.createProgram();
// 将着色器添加到程序中
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
```
#### 8.关联程序对象

```js
// 关联program
gl.linkProgram(program);
```
#### 9.使用程序对象

```js
// 使用program
gl.useProgram(program);
```
#### 10.设置背景色

```js
// 设置背景色
gl.clearColor(0.2, 0.8, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER);
```
#### 11.绘制点

```js
// 绘制点
gl.drawArrays(gl.POINTS, 0, 1);
```
### 完整的绘制代码：

[jcode](https://code.juejin.cn/pen/7295741150588534795)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da9cdc1b28f241bf93808149b370daa7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=733&h=413&s=32458&e=png&b=ffffff)

### 以上绘制流程抽象为一个initShader方法

```js
/**
 * @description: 生成webgl着色器对象的程序
 * @param {*} gl gl的上下文对象；ctx.getContext('webgl')
 * @param {*} VERTEX_SHADER_SOURCE；顶点着色器源码
 * @param {*} FRAGMENT_SHADER_SOURCE；片元着色器源码
 * @return {*} 程序对象
 */
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
```
## 移动点位置、定义点位置
### 使用vertexAttrib[n]f方法改变点位置

动态设置`attribute`属性，改变点的位置；

`attribute`变量是 GLSL ES 变量，被用来从外部【javascript】向着色器内传输数据，只有顶点着色器能使用`attribute`变量。

在顶点着色器中使用attribute，先进行定义；如下第3行表示定义 `attribute`变量
```js
// // 顶点着色器代码
const VERTEX_SHADER = `
    attribute vec4 aPosition;
    void main(){
        gl_Position = aPosition;
        gl_PointSize = 15.0;
    }
`;
```
#### 1: 使用`getAttribLocation`获取位置变量

`let aPos = gl.getAttribLocation(program, name);`获取有 name 参数指定的 attribute 变量的存储地址。

参数： program ：指定包含顶点着色器和片元着色器的着色器程序对象

name： 指定想要获取其存储地址的 `attribute` 变量的名称

返回值： 大于等于0 attribute 变量的存储地址

-1 指定的attribute变量不存在

错误： INVALID_OPERATION 程序对象未能成功连接

INVALID_VALUE name参数的长度大于 `attribute` 变量名的最大长度（默认256）

#### 2: 使用`vertexAttrib1f`进行设置变量

gl.vertexAttrib1f是一系列同族函数中的一个，该系列函数的任务是从javascript向顶点着色器中attribute属性传递值。

`gl.vertexAttrib1f(aPos, x);`

-   vertexAttrib1f：设置参数的1个变量，后边跟一个变量和一个参数
-   vertexAttrib2f: 设置参数的2个变量，`vertexAttrib2f(aPos, x, y)`
-   vertexAttrib3f: 设置参数的3个变量， `vertexAttrib3f(aPos, x, y, z)`
-   vertexAttrib4f: 设置参数的4个变量， `vertexAttrib4f(aPos, x, y, z, w)`

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ced96c83158d48bb87b3ca22c9f08351~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1188&h=328&s=71201&e=png&b=e6e7e8)

可以是3f也可是3i；f表示浮点数，i表示整数

#### 完整代码

```js
// 获取canvas元素
const ctx = document.getElementById('canvas')

// 获取webgl绘图上下文
const gl = ctx.getContext('webgl')

// // 顶点着色器代码
const VERTEX_SHADER = `
    attribute vec4 aPosition;
    attribute float aPosSize;
    void main(){
        gl_Position = aPosition;
        gl_PointSize = 15.0;
    }
`;

// 片元着色器代码
const FRAGMENT_SHADER = `
    void main(){
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;

let program = initShader(gl, VERTEX_SHADER, FRAGMENT_SHADER);
// getAttribLocation，获取gl的program对象的locatiion参数
let aPos = gl.getAttribLocation(program, 'aPosition');
let aSize = gl.getAttribLocation(program, 'aPosSize');

gl.vertexAttrib1f(aSize, 18);
let x = 0.0;
setInterval(() => {
    x = x + 0.05;
    if (x < 1.0) {
      // 设置顶点的attribute数据
        gl.vertexAttrib1f(aPos, x);
    } else {
        x = 0.0;
    }
    // 设置背景色
    gl.clearColor(0.2, 0.8, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER);

    // 绘制点
    gl.drawArrays(gl.POINTS, 0, 1);
}, 200)
```
通过定时器移动点的位置，可以创建出动画效果。后边的矩阵变换也是通过点位置坐标的改变实现。

### 使用buffer数据设置点的位置

1.使用createBuffer创建buffer对象`const buffer = gl.createBuffer();`

2.绑定buffer数据`gl.bindBuffer(gl.ARRAY_BUFFER, buffer);`

3.赋值buffer数据`gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);`

4.使用vertexAttribPointer方法，对aPosition变量进行赋值`gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);`

5.开启着色器中顶点的属性`gl.enableVertexAttribArray(aPosition)`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a30c66f520e46a9abddc1bb033a242f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=791&h=328&s=42072&e=png&b=282923)
#### buffer数据

缓冲区对象是webgl系统中一块存储区，可以在缓冲区对象保存想要绘制的所有顶点的数据。

要使用缓冲区数据，首先创建一个缓冲区，然后向其中写入顶点数据，这样就能**一次性的向顶点着色器中传入多个顶点的attribute变量的数据**。

-   createBuffer：创建缓冲区对象
-   bindBuffer：绑定缓冲区，2个参数

<!---->

-   -   target：可以是`ARRAY_BUFFER`或者`ELEMENT_ARRAY_BUFFER`
    -   buffer：由createBuffer创建出来的buffer数据

<!---->

-   bufferData：向缓冲区对象写入数据，3个参数

<!---->

-   -   target：可以是`ARRAY_BUFFER`或者`ELEMENT_ARRAY_BUFFER`
    -   data：写入缓冲区对象的数据，一般指定义的类型化数组
    -   usage：三种变量类型gl.STATIC_DRAW、gl.STREAM_DRAW、gl.DYNAMIC_DRAW

#### vertexAttribPointer函数

将缓冲区对象分配给attribute变量，包含6个参数

-   location：指定待分配 attribute 变量的存储位置
-   size: 指定缓冲区每个顶点的分量个数
-   type:用来指定数据格式

<!---->

-   -   gl.UNSIGNED_BYTE: 无符号字节，Unit8Array
    -   gl.SHORT： 短整型，Int16Array
    -   gl.UNSIGNED_SHORT：无符号短整型，Uint16Array
    -   gl.INT：整型，Int32Array
    -   gl.UNSIGNED_INT：无符号整型，Uint32Array
    -   gl.FLOAT：浮点型，Float32Array

<!---->

-   normalized: 布尔类型，表明是否将非浮点型的数据归一化
-   stride: 指定相邻两个顶点间的字节数，默认为0
-   offset: 指定缓冲区对象中的偏移量，即 attribute变量从缓冲区中何处开始存储。

最后通过`gl.enableVertexAttribArray(position)`函数开启 attribute 变量;执行该函数后，才算将缓冲区对象和attribute变量之间建立了真正连接。


#### 完整示例代码

```js
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

const ctx = document.getElementById('canvas')

const gl = ctx.getContext('webgl')

// 创建着色器源码
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;

    void main() {
      gl_Position = aPosition;
    }
  `; // 顶点着色器

const FRAGMENT_SHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `; // 片元着色器

const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)

const aPosition = gl.getAttribLocation(program, 'aPosition');
const points = new Float32Array([
  -0.8, -0.8,
  0.8, -0.8,
  0.0,  0.8,
])

// 使用vertexAttribPointer给aPosition赋值
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(aPosition);

gl.drawArrays(gl.TRIANGLES, 0, 3);
```
创建出红色三角形
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/655ddecbb073420e996f873e7c3ca939~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=394&h=393&s=6544&e=png&b=ffff00)
## drawArrays绘制多点图形

drawArrays方法包含3个参数：mode、first、count

-   设定不同的绘制方式，包括 POINTS、LINES、LINE_STRIP、LINE_LOOP、TRIANGLES、TRIANGLE_STRIP、TRIANGLE_FAN
-   设置从哪个点开始绘制
-   指定绘制需要几个顶点

设置不同的mode绘制方式，会显示不同的绘制效果。如下图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c07496397806488784e875af12d494b5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1844&h=1074&s=154946&e=png&b=ffffff)

### 示例代码：展示4边形

[jcode](https://code.juejin.cn/pen/7295753733024677938)

### 绘制2个三角形
#### TRIANGLES三角形

```js
// 修改坐标点数据
const points = new Float32Array([
  -0.5, -0.5,
  0.5, -0.5,
  -0.5,  0.5,
  0.5,  0.5,
  0.8,  0.9,
  0.9,  0.3,
])

// 修改绘制方式
gl.drawArrays(gl.TRIANGLES, 0, 6);
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afd300f7f14a4ccd81b52c43e9e0c27c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=418&h=416&s=11751&e=png&b=ffd500)
#### TRIANGLE_STRIP

```js
// 修改坐标点数据
const points = new Float32Array([
  -0.5, -0.5,
  0.5, -0.5,
  -0.5,  0.5,
  0.5,  0.5,
  0.8,  0.9,
  0.9,  0.3,
])

// 修改绘制方式
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e743776259645d6a794ddaebbdbab78~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=398&h=392&s=7272&e=png&b=ffff00)
#### TRIANGLE_FAN

```js
// 修改坐标点数据
const points = new Float32Array([
  -0.5, -0.5,
  0.5, -0.5,
  -0.5,  0.5,
  0.5,  0.5,
  0.8,  0.9,
  0.9,  0.3,
])

// 修改绘制方式
gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff4e16ff73eb48b0a824d4e71df63fea~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=418&h=413&s=6724&e=png&b=ffff00)

## 使用数学公式进行操作

### 平移
通过修改着色器顶点数据，将原始数据和变量数据**相加**

[jcode](https://code.juejin.cn/pen/7295754907376680986)

### 旋转
绕着Z轴旋转，对x和y的坐标分别进行赋值。

gl_Position.x = aPosition.x * cos(deg) - aPosition.y * sin(deg);

gl_Position.y = aPosition.x * sin(deg) + aPosition.y * cos(deg);

[jcode](https://code.juejin.cn/pen/7295755471497986058)

### 缩放
将原始坐标值和变量进行**相乘**。
[jcode](https://code.juejin.cn/pen/7295755902542413834)
## 使用矩阵进行操作
#### 矩阵的定义

-   矩阵是横竖排列的数据表格
-   作用是把一个点转移到另外一个位置
-   只有在矩阵的列数和矢量【有多个分量组成的对象，如点坐标、颜色值等】的行数相等时，才可以将两者相乘

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f198e3047b084623bd73b0a8855d6eca~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=456&h=224&s=33605&e=png&b=fdfdfd)

矩阵的乘法不符合交换率，A*B和B*A的结果并不相等；

上面的矩阵有3行3列，因为相乘的矢量具有3个分量，也被称为三维矢量；

```js
x' = ax + by + cz;
y' = dx + ey + fz;
z' = gx + hy + iz;
```
#### 矩阵分为行主序和列主序

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bfeeab00d6c47e6b1313d088bc2a952~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=700&h=340&s=28788&e=png&b=fefefe)

```js
// 行主序
new Float32Array([
    1.0, 2.0, 3.0, 4.0,
    5.0, 6.0, 7.0, 8.0,
    9.0, 10.0, 11.0, 12.0,
    13.0,14.0, 15.0, 16.0,
])

// 列主序
new Float32Array([
    1.0, 5.0, 9.0,  13.0,
    2.0, 6.0, 10.0, 14.0,
    3.0, 7.0, 11.0, 15.0,
    4.0, 8.0, 12.0, 16.0,
])
```
### 平移

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9228c401063d4ddb8b52a63159c4762f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=584&h=485&s=98267&e=png&b=ebebeb)

如上图，把A点坐标移动到 A' 点的位置，需要进行以下坐标移动

```js
x' = x + x1;
y' = y + y1;
z' = z + z1;
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae3b7d18bd0f4a3da805051b8d028646~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=605&h=282&s=48494&e=png&b=ebebeb)

w的值为1

```js
x' = ax + by + cz + d;
y' = ex + fy + gz + h;
z' = ix + jy + kz + l;
w' = mx + ny + oz + p;
```
将公式1和公式2进行 等式 替换
```js
ax + by + cz + d = x + x1; // 只有当a=1且 b=c=0，d=x1的时候，等式才成立
ex + fy + gz + h = y + y1; // 只有当f=1且 e=g=0，h=y1的时候，等式才成立
ix + jy + kz + l = z + z1; // 只有当k=1且 i=j=0，l=z1的时候，等式才成立
mx + ny + oz + p = 1;      // 只有当p=1且 m=n=o=0 的时候，等式才成立
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a3a19bcd89b4526a607882cf0ab7744~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=688&h=258&s=67221&e=png&b=eaeaea)

```js
// 平移矩阵
function getTranslateMatrix(x = 0,y = 0,z = 0) {
  return new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    x  , y  , z  , 1,
  ])
}
```
#### 完整的平移矩阵示例代码
[jcode](https://code.juejin.cn/pen/7295758103549575195)

#### 使用方法**uniformMatrix4fv**，给矩阵赋值

**gl.uniformMatrix4fv**(location, transpose, array)

该方法包含3个参数：

-   location：uniform变量存储的位置
-   transpose：在webgl中必须设置为false
-   array：待传输的类型化数组，4x4矩阵按照列主序存储在其中

函数名最后一个字母为v，表示可以向着色器传递多个数据值；

### 旋转

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/789e38e74f01440db573ba0a93dc38e2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=408&h=331&s=53329&e=png&b=ebeaea)
上图中将实线三角形转动到虚线的位置，也就是把A点坐标移动到A'点的位置；

点A坐标的位置公式

```js
x = cos(α) * R;
y = sin(α) * R;
z = 0;
```
A'点的坐标公式

```js
x'
  = R * cos(α + β) 
  = R * (cos(α)*cos(β) - sin(α)*sin(β) )
  = R * cos(α) *cos(β) - R * sin(α) * sin(β)
  = x * cos(β) - y * sin(β);
y' 
  = R * sin(α + β) 
  = R * (sin(α)*cos(β) + cos(α)*sin(β))
  = R * sin(α) * cos(β) + R * cos(α)*sin(β)
  = y*cos(β) + x*sin(β);
z'
  = z
```
将以上坐标公式带入到矩阵中

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8318505afaa94f14951da55f24fd0a6f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=589&h=238&s=43173&e=png&b=ebebeb)
```js
x' = ax + by+ cz + d;
y' = ex + fy + gz + h;
z' = ix + jy + kz + l;
w' = mx + ny + oz + p;
```
对比旋转坐标公式和矩阵坐标公式，进行等式替换

```js
ax + by+ cz + d = x * cos(β) - y * sin(β); // 只有a=cos(β)且b=-sin(β)、c=d=0时，等式成立
ex + fy + gz + h = y*cos(β) + x*sin(β);  // 只有e=sin(β)且f=cos(β)、g=h=0时，等式成立
ix + jy + kz + l = z;  // 只有k=1且i=j=l=0时，等式成立
mx + ny + oz + p = 1;  // 只有p=1且m=n=o=0时，等式成立
```
从而可以推导出如下的**旋转矩阵**公式；

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c48f75d217e4408ba37714df99b4cc5d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=529&h=292&s=74874&e=png&b=e9e9e9)

```js
// 绕z轴旋转的旋转矩阵
function getRotateMatrix(deg) {
  return new Float32Array([
    Math.cos(deg)  ,Math.sin(deg) ,0.0,0.0,
    -Math.sin(deg)  ,Math.cos(deg) ,0.0,0.0,
    0.0,            0.0,            1.0,0.0,
    0.0,            0.0,            0.0, 1,
  ])
}
```
#### 使用矩阵完成旋转的完整代码
[jcode](https://code.juejin.cn/pen/7295759427323232266)
### 缩放

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76347a915f79479aab71eff05b276326~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=481&h=417&s=67008&e=png&b=eae9e9)
将坐标A缩放到坐标A'

```js
x' = Tx * x;
y' = Ty * y;
z' = Tz * z;
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/798cad62090a4623ac5459f856ebd38d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=605&h=282&s=48494&e=png&b=ebebeb)
```js
x' = ax + by + cz + d;
y' = ex + fy + gz + h;
z' = ix + jy + kz + l;
w' = mx + ny + oz + p;
```
推导出缩放矩阵坐标如下

```js
  x, 0.0, 0.0, 0.0,
0.0, y  , 0.0, 0.0,
0.0, 0.0, z  , 0.0,
0.0, 0.0, 0.0, 1  ,
```

```js
// 缩放矩阵
function getScaleMatrix(x = 1,y = 1,z = 1) {
  return new Float32Array([
    x  , 0.0, 0.0, 0.0,
    0.0, y  , 0.0, 0.0,
    0.0, 0.0, z  , 0.0,
    0.0, 0.0, 0.0, 1  ,
  ])
}
```
#### 完整的缩放矩阵示例代码
[jcode](https://code.juejin.cn/pen/7295760253341089829)

### 通用矩阵变换公式

4x4矩阵不仅可以表示平移，也可以用来表示旋转和缩放；

不管是平移、缩放、旋转都可以使用 `矩阵和矢量的运算`完成变换；

变换公式：`<新坐标> = <变换矩阵> * <旧坐标>`

比如顶点着色器中定义的 `gl_Position = mat * aPosition;`

```js
const VERTEX_SHADER_SOURCE = `
  attribute vec4 aPosition;
  uniform mat4 mat;
  void main() {
    gl_Position = mat * aPosition;
    gl_PointSize = 10.0;
  }
`; 
```
## 矩阵的混合变换
图形变换包含平移、缩放、旋转中的至少2个；
### 通过定义多个uniform变量，设置矩阵参数，进行运算
在顶点着色器中，定义 `translateMatrix`、`scaleMatrix`、`rotationMatrix`三个矩阵变量
[jcode](https://code.juejin.cn/pen/7295760846914289664)
### 将2个矩阵进行复合运算
将第一个矩阵A和第二个矩阵B相乘；

1：第一步用A第1列 乘以 矩阵B第一行，计算出第一行第一列的结果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f958c45f892646a8b06298ec0e4a3fa6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=799&h=479&s=118396&e=png&b=eaeaea)

2：用A第一列 乘以 矩阵B的第2行，计算出第一行的第2列结果

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cadcffbbe4e438badb2ed920eea709d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=487&h=297&s=57689&e=png&b=eaeaea)
3：矩阵A 第一列乘以 矩阵B的第3列，计算出第一行的第3列结果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adea93293d1044229d063c4f4ff84fbf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=506&h=317&s=77573&e=png&b=eaeaea)
以此类推，可以求出新的矩阵

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb5d7cf803e041e291c1ebdee33048d1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=517&h=324&s=93648&e=png&b=eae9e9)
#### 根据以上结果，推导出矩阵的复合公式

```js
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
```
#### 使用混合矩阵公式，进行移动、缩放、旋转变换的完整代码
[jcode](https://code.juejin.cn/pen/7295761792435912758)




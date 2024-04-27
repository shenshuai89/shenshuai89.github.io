---
title: webgl基础2-颜色、纹理
date: 2024-04-27 10:51:59
permalink: /pages/27f424/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

## 颜色

### 使用varying变量完成颜色的内插值

使用过程是在顶点着色器中定义 `varying vec4 vColor;`

varying表示可以变换的，把**同样的变量名称**定义到片元着色器中，`varying vec4 vColor;`

varying变量的作用是**从顶点着色器向片元着色器中传递数据**；

从顶点到片元进行传递数据。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b70a49168ae442f9d99b991ed4d0f67~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=956&h=329&s=62818&e=png&b=ffffff)


```js
// 创建着色器源码
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute vec4 aColor;
    varying vec4 vColor;
    void main() {
        vColor = aColor;
        gl_Position = aPosition;
    }
`; // 顶点着色器

const FRAGMENT_SHADER_SOURCE = `
    // 定义float类型的精度
    precision lowp float;
    varying vec4 vColor;
    void main() {
        gl_FragColor = vColor;
    }
`; // 片元着色器

const points = new Float32Array([
    0.0, 0.5, 1.0, 0.0, 0.0, 
    -0.5, -0.5, 0.0, 1.0, 0.0, 
    0.5, -0.5, 0.0, 0.0, 1.0,
])
```
用varying变量为三个顶点指定三个不同颜色，三角形表面上的这些颜色值都是webgl系统通过内插计算出来。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b20314dfd1624dadb5b49d791524fd5a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=953&h=253&s=45881&e=png&b=ffffff)

### 使用getAttribLocation获取color

上边代码已经定义好了顶点和片元着色器，之后可以获取到定义的变量值；

`getAttribLocation`方法获取到定义在着色器的值


```js
const aPosition = gl.getAttribLocation(program, 'aPosition');
const aColor = gl.getAttribLocation(program, 'aColor');
```
### vertexAttribPointer和enableVertexAttribArray给着色器变量赋值

获取到着色器变量值后，就可以给获取到的变量进行赋值


```js
const points = new Float32Array([
    -0.8, -0.8, 1.0, 0.0, 0.0, 
    0.8, -0.8, 0.0, 1.0, 0.0, 
    0.0, 0.8, 0.0, 0.0, 1.0,
])
const FSIZE = points.BYTES_PER_ELEMENT;
const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// 设置bufferData； 创建的 points 赋值给缓冲数据对象
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, FSIZE * 5, 0);
gl.enableVertexAttribArray(aPosition)

gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
gl.enableVertexAttribArray(aColor)
```
### 自定义颜色示例

首先在着色器代码中定义变量

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e71c9c6648c04d5b94dd68705ba052e5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=594&h=434&s=47693&e=png&b=282923)

获取着色器中的变量，并设置颜色值
[jcode](https://code.juejin.cn/pen/7297859424276709403)

### webgl颜色渲染的整体流程

-   顶点坐标：首先通过缓存数据，定义顶点数据
-   图元装配：将独立的顶点坐标装配成几何图形，图形的类别由 gl.drawArrays函数 第一个参数决定
-   光栅化：将装配好的图形，转为片元；会进行一些优化，比如背面剔除、位于可视区外图形的裁剪等
-   图形绘制：绘制到浏览器上![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/632ea7ac02b34ac1b04572b293f657e5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1376&h=366&s=21000&e=png&b=ffffff)

## 纹理
为了更逼真的模拟现实场景，需要给图形添加图片纹理。三维场景中的纹理映射，添加到图形的指定位置。

完成纹理映射需要以下4步：

1.  准备好纹理图像
1.  为几何图形配置纹理映射方式
1.  加载纹理图像，进行配置，让其在webgl中使用
1.  在片元着色器中将相应的纹素从纹理中抽取出来，并将纹素的颜色赋给片元。
### 准备几何图形

首先创建基础的矩形

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

    canvas {
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
  const ctx = document.getElementById('canvas')

  const gl = ctx.getContext('webgl')

  // 创建着色器源码
  const VERTEX_SHADER_SOURCE = `
    // 只传递顶点数据
    attribute vec4 aPosition;

    void main() {
      gl_Position = aPosition; // vec4(0.0,0.0,0.0,1.0)
    }
  `; // 顶点着色器

  const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `; // 片元着色器

  const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)

  const aPosition = gl.getAttribLocation(program, 'aPosition');
  const points = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
    0.5, -0.5,
  ])

  const buffer = gl.createBuffer();
  const BYTES = points.BYTES_PER_ELEMENT;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 2, 0);
  gl.enableVertexAttribArray(aPosition)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
</script>
```
展示效果
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0c8d26d3d1b45ffb2ac7c4b7fff4752~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=380&h=382&s=6412&e=png&b=ffff00)
### 纹理坐标映射
纹理坐标是纹理图像上的坐标，通过纹理坐标可以在纹理图像上获取纹素颜色。webgl系统中的纹理坐标系统是二维的，为了将纹理坐标和图像屏幕坐标系统x和y坐标区分开，webgl使用s和t命名纹理坐标。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/902baf7432214ed2be5ac90ba0984ff9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=588&h=393&s=176882&e=png&b=ffffff)

纹理图像四个角的坐标为左下(0.0, 0.0) ,右下(1.0,0.0)，右上(1.0,1.0) ，左上(0.0,1.0)。纹理坐标和通用，坐标值和图像自身的尺寸无关，不管是128还是256，右上角坐标都是(1.0,1.0)

**接下来需要转换图像的纹理坐标与几何形体坐标之间映射关系。**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48ed8d2d0d65434484e36f757521d18a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=667&h=307&s=77169&e=png&b=ffffff)
将纹理坐标的(0.0, 1.0)映射到顶点坐标(-0.5, -0.5, 0.0)上，将纹理坐标(1.0,1.0)映射到顶点坐标(0.5, 0.5, 0.0)上。依此了推，建立对应坐标映射关系。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ebb4fdb56bd4a62a4deb086d4d035fd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=431&h=179&s=8849&e=png&b=ffffff)

将顶点坐标和纹理坐标写入同一个缓冲区中，定义数组points，成对记录每个顶点的顶点坐标和纹理坐标。

然后将顶点坐标和纹理坐标写入缓冲区对象，将其中的顶点坐标分配给aPosition变量并启用。

接着获取aTex变量的存储位置，将缓冲区的纹理坐标分配给该变量，并启用。

`const uSampler = gl.getUniformLocation(program, 'uSampler');`

调用gl.getUniformLocation(program, 'uSampler');从片元着色器中获取uniform变量uSampler的存储位置，用该变量来接收纹理对象。
### 创建纹理对象
纹理对象用于存储纹理图像的数据

`const texture = gl.createTexture();`

调用gl.createTexure()函数，将在webgl系统中创建一个纹理对象。`gl.TEXTURE0`到`gl.TEXTURE7`是管理纹理图像的8个纹理单元。每个都与gl.TEXTURE_2D相关联，而后者是绑定纹理时的纹理目标。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7420f69d1417499f8da311ec9c18c7b0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=777&h=435&s=55928&e=png&b=ffffff)

### 图像Y轴翻转
使用图像前，必须对它进行Y轴翻转，因为图像的y轴正方向是屏幕左上角向下，和webgl坐标系统Y轴相反

`gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)`


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a425a129f3ff4adf9d4446b8d46a4c2a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=842&h=375&s=122974&e=png&b=ffffff)
pixelStorei函数的使用：

ggl.pixelStorei(pname, param)

-   pname可以是`gl.UNPACK_FLIP_Y_WEBGL`(对图像进行Y轴翻转，默认为false)或者`gl.UNPACK_PERMULTIPLY__ALPHA_WEBGL`（将图像RGB颜色值得每一个分量乘以A，默认为false）
-   param: 指定非0或0，必须为整数。
### 激活并绑定纹理对象

webgl通过纹理单元机制来同时使用多个纹理。每个纹理单元用一个单元编号老管理一张纹理图像。即使程序只有一张纹理图像，也要指定一个纹理单元。

webgl系统至少支持8个纹理单元。

在使用纹理单元之前，需要调用gl.activeTexture()来激活它。

`gl.activeTexture(gl.TEXTURE0);`

接下来进行绑定纹理对象，webgl支持2中类型的纹理类型

-   gl.TEXTURE_2D: 二维纹理
-   gl.TEXTURE_CUBE_MAP: 立方体纹理

`gl.bindTexture(gl.TEXTURE_2D, texture);`

### 配置纹理对象

#### 处理缩放和平铺的逻辑

配置纹理对象参数，用来设置纹理坐标获取纹素颜色、按照哪种方式重复填充纹理。使用函数gl.texParameteri()

`gl.texParameteri(target, pname, param)`

-   target: 参数为gl.TEXTURE_2D或者gl.TEXTURE_CUBE_MAP；以下示例全部使用gl.TEXTURE_2D
-   pname： 可以指定4个纹理参数

    *  放大方法`gl.TEXTURE_MAG_FILTER`: 定义当纹理的绘制范围比纹理本身更大，如何获取纹素颜色。
    -   缩小方法`gl.TEXTURE_MIN_FILTER`：定义当纹理的绘制范围比纹理本身更小，如何获取纹素颜色。
    -   水平填充方法：`gl.TEXTURE_WRAP_S`：表示如何对纹理图像的左右两侧区域进行填充
    -   垂直填充方法： `gl.TEXTURE_WRAP_T`：表示如何对纹理图像的上下两侧区域进行填充

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1935f541aa2c4854a0c9c1abacacbae6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=554&h=438&s=113955&e=png&b=fefaf9)

**放大或缩小可以赋值的参数**

-   gl.NEAREST: 使用原纹理上距离映射新像素中心最近的那个像素颜色值，作为新像素值
-   gl.LINEAR: 使用距离新像素中心最近的四个像素的颜色值得加权平均，作为新像素值。

**水平或上下平铺可以赋值的参数**

-   gl.REPEAT: 平铺式重复纹理
-   gl.MIRRORED_REPEAT: 镜像对称式的重复纹理
-   gl.CLAMP_TO_EDGE: 使用纹理图像边缘值


```js
// 处理放大缩小的逻辑
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

// 横向 纵向 平铺的方式
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
```
#### 将纹理图像分配给纹理对象

使用gl.texImage2D()方法将纹理图像分配给纹理对象，同时该函数还允许配置WEBGL系统关于图像的一些特性。

`gl.texImage2D(target, level, internalformat, format, type, image)`

-   target: gl.TEXTURE_2D或者gl.TEXTURE_CUBE_MAP
-   level: 传入0
-   internalformat： 图像的内部格式
-   format：纹理数据格式，必须使用和internalformat相同值
-   type： 纹理数据的类型
-   image： 包含纹理图像的Image对象


```js
// 配置纹理图像
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
```

#### 将纹理单元传递给片元着色器

将纹理图像传入Webgl系统，就必须将其传入片元着色器，并映射到图形的表面上。

必须将片元着色器中表示纹理对象的uniform变量声明为一种特殊的、专用的纹理对象的数据类型。程序中使用二维纹理gl.TEXTURE_2D, 所以该uniform变量的类型设为sampler2D；

-   sampler2D：绑定到gl.TEXTURE_2D上的纹理数据类型
-   samplerCube： 绑定到gl.TEXTURE_CUBE_MAP上的纹理数据类型

```js
  const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;
    uniform sampler2D uSampler;
    varying vec2 vTex;

    void main() {
      gl_FragColor = texture2D(uSampler, vTex);
    }
  `;

gl.uniform1i(uSampler, 0);
```
### 完整示例代码
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

    canvas {
      margin: 50px auto 0;
      display: block;
      background: rgb(182, 182, 181);
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

  const ctx = document.getElementById('canvas')

  const gl = ctx.getContext('webgl')

  // 创建着色器源码
  const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute vec4 aTex;
    varying vec2 vTex;

    void main() {
      gl_Position = aPosition; // vec4(0.0,0.0,0.0,1.0)
      vTex = vec2(aTex.x, aTex.y);
    }
  `; // 顶点着色器

  const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;
    uniform sampler2D uSampler;
    varying vec2 vTex;

    void main() {
      gl_FragColor = texture2D(uSampler, vTex);
    }
  `; // 片元着色器

  const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)

  const aPosition = gl.getAttribLocation(program, 'aPosition');
  const aTex = gl.getAttribLocation(program, 'aTex');
  const uSampler = gl.getUniformLocation(program, 'uSampler');

  // 顶点坐标和 纹理坐标
  const points = new Float32Array([
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, -0.5, 1.0, 0.0,
  ])

  // 使用vertexAttribPointer给aPosition赋值
  const buffer = gl.createBuffer();
  const BYTES = points.BYTES_PER_ELEMENT;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 4, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, BYTES * 4, BYTES * 2);
  gl.enableVertexAttribArray(aTex)
  const img = new Image();
  img.onload = function () {
    // 创建纹理对象
    const texture = gl.createTexture();

    // 翻转 图片 Y轴
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)

    // 开启一个纹理单元
    gl.activeTexture(gl.TEXTURE0);

    // 绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 处理放大缩小的逻辑
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

    // 横向 纵向 平铺的方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    // 配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

    gl.uniform1i(uSampler, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  img.src = '../assets/sky.png'
</script>
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0c556c86ad544078d38c8304af222e6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=377&h=357&s=67987&e=png&b=b6b6b5)

## 纹理的叠加

将多个图像添加到图形上，多重纹理的融合。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/039ab02b5b734294a7ed9ef1a5f4ddde~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=256&h=256&s=20178&e=gif&b=05059b)   
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73b0a8b4acc94a31a78cbbaae707715e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=256&h=256&s=10019&e=jpg&b=465786)

将天空图片和半透明的gif图片相叠加融合。

相对于一张纹理图像，使用两张纹理图像需要定义2个纹理对象，然后将2个纹理对象的值进行相乘，获取最终的颜色效果。


```js
  const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;
    uniform sampler2D uSampler;
    uniform sampler2D uSampler1;
    varying vec2 vTex;

    void main() {
      vec4 c1 = texture2D(uSampler, vTex);
      vec4 c2 = texture2D(uSampler1, vTex);

      gl_FragColor = c1 * c2;
    }
  `;
```
在片元着色器中定义第4行、第9行和11行代码。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/378bb0adb8aa4bd6a079a403e0b99515~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=637&h=208&s=20743&e=png&b=ffffff)

### 完整示例代码

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

    canvas {
      margin: 50px auto 0;
      display: block;
      background: rgb(61, 61, 61);
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
  const ctx = document.getElementById('canvas')

  const gl = ctx.getContext('webgl')

  // 创建着色器源码
  const VERTEX_SHADER_SOURCE = `
    // 只传递顶点数据
    attribute vec4 aPosition;
    attribute vec4 aTex;
    varying vec2 vTex;

    void main() {
      gl_Position = aPosition; // vec4(0.0,0.0,0.0,1.0)
      vTex = vec2(aTex.x, aTex.y);
    }
  `; // 顶点着色器

  const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;
    uniform sampler2D uSampler;
    uniform sampler2D uSampler1;
    varying vec2 vTex;

    void main() {
      vec4 c1 = texture2D(uSampler, vTex);
      vec4 c2 = texture2D(uSampler1, vTex);

      gl_FragColor = c1 * c2;
    }
  `; // 片元着色器

  const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)

  const aPosition = gl.getAttribLocation(program, 'aPosition');
  const aTex = gl.getAttribLocation(program, 'aTex');
  const uSampler = gl.getUniformLocation(program, 'uSampler');
  const uSampler1 = gl.getUniformLocation(program, 'uSampler1');

  const points = new Float32Array([
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, -0.5, 1.0, 0.0,
  ])

  const buffer = gl.createBuffer();
  const BYTES = points.BYTES_PER_ELEMENT;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 4, 0);
  gl.enableVertexAttribArray(aPosition)
  gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, BYTES * 4, BYTES * 2);
  gl.enableVertexAttribArray(aTex)

  function getImage(url, location, index) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = function () {
        // 创建纹理对象
        const texture = gl.createTexture();

        // 翻转 图片 Y轴
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)

        // 开启一个纹理单元
        gl.activeTexture(gl[`TEXTURE${index}`]);

        // 绑定纹理对象
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // 处理放大缩小的逻辑
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

        // 横向 纵向 平铺的方式
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

        // 配置纹理图像
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

        gl.uniform1i(location, index);

        resolve();
      }

      img.src = url;
    })
  }

  Promise.all([getImage('../assets/sky.jpg', uSampler, 0), getImage('../assets/circle.gif', uSampler1, 1)]).then(() => {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  })
</script>
```
最后展示效果

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0176e3ef6774159be9115b783d1bc53~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=347&h=313&s=84188&e=png&b=3c3c3c)

内容参考 《webgl编程指南》
更多资源文档和代码[下载地址](https://shenshuai89.github.io/pages/10c961/)：

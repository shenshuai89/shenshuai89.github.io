---
title: 将svg图标转化成字体格式使用
date: 2018-07-20 09:05:04
categories: 前端开发
tags: 
  - css
  - html5
permalink: /pages/c23a59/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---

## 将svg图标转化成字体格式使用
在一般的站点中都会多次使用一些icon小图标，传统做法会制作成一张图片，来减少网络加载请求。除了这个方案还可以将图标转为一套字体来使用。
### 准备好需要的icon图标
下载好所需要的所有icon图标，颜色和大小不必在意和设置，都可以在字体文件中进行修改。
提前准备的add.svg del.svg arrow-down.svg arrow-up.svg cart.svg loading.svg
### 将图标制作成字体
打开[icomoon.io](https://www.icomoon.io)网站，
点击右上角的icoMoonApp，进入页面后点击import导入所有的svg图标。
选中所有添加的图标，边框为黄色的为选中状态，然后点击右侧的修改，可以修改重命名字体，如图片所示
![](/assets/images/mall-font.png)
最后在页面底部点击generate font，将字体下载导出
### 将字体文件加载至站点资源中
下载的文件包含了demo-files，可以参考使用
点击demo.html可以查看效果
最重要的两个文件1，fonts  2，fonts.css,将这两个文件引入到项目中
就可以在页面中需要的位置引用字体图标
``` css
<span class="icon-add"></span>
<span class="icon-del"></span>
<span class="icon-arrow-down"></span>
<span class="icon-arrow-up"></span>
<span class="icon-cart"></span>
<span class="icon-loading"></span>
```
## 总结
这种方法，可以减少对图片的加载请求，还可以在页面中自行设置大小和颜色。
---
title: css3 新特性
date: 2022-10-22 00:01:48
permalink: /pages/f9f7e3/
categories:
  - front
  - interface
  - css
tags:
  - 
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
CSS3 引入了许多新特性和功能，使得网页设计和开发更加高效和丰富。在本文中，我们将详细探讨 CSS3 的一些关键特性及其用法示例。文章将从六个部分来介绍：CSS3 样式属性、过渡、转换、动画、布局如Flex 和 Grid，以及选择器。
## 1. CSS3 样式属性
`box-shadow` 和 `border-image` 属性
`box-shadow` 用于添加阴影效果，`border-image` 用于给边框添加图像。
```css
.box {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    border-image: url(border.png) 30 round;
}
```

`text-shadow` 属性
`text-shadow` 用于给文字添加阴影效果。
``` css
.text {
    text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
}
```

### 透明度 rgba() 函数和 opacity 属性
`rgba()` 函数用于定义具有透明度的颜色，`opacity` 属性用于设置元素的透明度。
``` css
.transparent-box {
    background-color: rgba(255, 0, 0, 0.5);
    opacity: 0.8;
}
```

### 渐变效果 linear-gradient() 和 radial-gradient()
`linear-gradient()` 和 `radial-gradient()` 这两个函数用于创建线性和径向渐变背景
``` css
.linear-gradient {
    background: linear-gradient(to right, red, yellow);
}

.radial-gradient {
    background: radial-gradient(circle, red, yellow);
}
```


### 文字属性

- `word-wrap` 用于强制长单词换行。
- `text-overflow` 用于处理溢出文本。
- `text-shadow` 用于添加文字阴影。
- `text-decoration` 用于设置文字装饰。

```css
.text {
    word-wrap: break-word;
    text-overflow: ellipsis;
    text-shadow: 1px 1px 2px gray;
    text-decoration: underline;
}
```

#### 使用 @font-face 实现定制字体
```css
@font-face {
    font-family: 'CustomFont';
    src: url('customfont.woff2') format('woff2');
}

.custom-font {
    font-family: 'CustomFont', sans-serif;
}
```

### background-image 属性
`background-image `用于设置背景图像。
``` css
.background {
    background-image: url('background.jpg');
}
```

### 多栏布局
使用 `column-count`、`column-width` 和 `column-gap` 属性可以实现多栏布局。
``` css
.columns {
    column-count: 3;
    column-width: 200px;
    column-gap: 20px;
}
```

### CSS3 的媒体查询
媒体查询用于为不同的设备和屏幕尺寸应用不同的样式。
``` css
@media (max-width: 600px) {
    .responsive {
        font-size: 14px;
    }
}
```

## 2. 过渡 (Transition)
transition 属性用于在元素的不同状态之间定义平滑的过渡效果。
``` css
.box {
    transition: all 0.3s ease;
}

.box:hover {
    background-color: blue;
    transform: scale(1.1);
}
```

### 3. 转换 (Transform)
`transform` 属性用于旋转、缩放、倾斜或平移元素。
``` css
.box {
    transform: rotate(45deg) translateX(50px);
}
```

### 4. 动画 (Animation)
`animation` 属性用于定义关键帧动画。
``` css
@keyframes example {
    from {background-color: red;}
    to {background-color: yellow;}
}

.animated-box {
    animation: example 2s infinite alternate;
}
```

## 5.布局
`Flex` 布局
Flex 布局用于实现响应式的弹性布局。
``` css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

`Grid` 布局
Grid 布局用于创建复杂的二维布局。
``` css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}
```

为了更精准的选择目标元素，给目标元素应用以上 CSS3 新增特性，怎么能少了选择器呢？ CSS3 也新增了许多选择器，为开发带来了更佳的开发体验。[可以查看](./css选择器.md)
---
title: flex页面布局详解
date: 2018-01-17 20:54:18
categories: 前端开发
tags: 
  - css
permalink: /pages/9c5905/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

# Flex介绍
Flex主要是为了解决**容器**内部**子项**的对齐和自由分配，即使它们大小是未知的或者动态的。
Flex背后设计思想给容器控制子项的宽度和高度的能力，使得flex子项可以自动填满容器的可用空间（主要是适用所有显示设备和屏幕大小）。

# Flex的属性
### 作用于容器的属性：
* flex-direction：规定了主轴的方向X或者Y
* flex-wrap：设置子项是否换行
* flex-flow：是flex-direction和flex-wrap的综合缩写，默认值为：row nowrap
* justify-content：子项在主轴上分布的方式
* align-items：子项在侧轴上对齐的方式
* align-content：子项有多行时，该属性生效。当容器的侧轴上有多余空间，align-content用了调整多个子项行在容器侧轴上的对齐方式，和justify-content属性控制子项在主轴上分布属性类似。

### 作用于子项的属性：
* order：设置一个数字，用来控制子项排序的先后，数字越小越靠前，负值也可以。
* flex-grow：设置一个数字（扩大比例），用了控制子项在容器中所占的比例（如果都设置1，所有子项大小相等，如果有一个为2，则该子项是其它子项的2倍），负值属性失效。
* flex-shrink：设置一个数字（缩小比例），默认值为1，负值失效。
* flex-basis：子项在分配容器剩余空间之前的一个依据基础，如果设置为0，内容不考虑子项内容周围额外空间，如果设置为auto，子项的额外空间基于flex-grow分布。
* flex：是flex-grow，flex-shrink和flex-basis属性的综合缩写，默认值为0 1 auto
* align-self：用来控制子项单独的覆写默认的对齐方式。

# Flex的容器属性详细介绍

## flex-direction
属性,四个值
``` css
	.container { flex-direction: row | row-reverse | column | column-reverse; }
```
* row(默认值):如果书写方式是ltr，那么flex子项是从左向右排列；
* row-reverse：如果书写方式ltr，方面flex子项是从右向左排列；
* column：和row类型，改变了主轴的方向为Y
* column：和row-reverse类似，方向上是从下往上

flex-direction属性展示效果图：
![](/assets/images/flex-direction.png)

## flex-wrap
属性,三个值
``` css
.container{ 
	flex-wrap: nowrap | wrap | wrap-reverse; 
}
```
* nowrap(默认值):单行显示
* wrap:多行显示
* wrap-reverse：多行显示，反转

flex-wrap属性展示效果图：
![](/assets/images/flex-wrap.png)

## flex-flow
属性是flex-direction和flex-wrap的综合
``` css
flex-flow: <'flex-direction'> || <'flex-wrap'>
```
默认属性值row nowrap

## justify-content
属性，五个属性值
``` css
.container{
	justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
* flex-start(默认值)：子项靠近起始位置
* flex-end：子项靠近结束位置
* center：子项在一行的中间位置
* space-between：子项在主轴上平均分布，顶齐起始和结束的位置
* space-around：子项在主轴上平均分布，起始和结束位置的两端保留一半的空间

justify-content属性展示效果图：
![](/assets/images/justify-content.png)

## align-items
属性的五个属性值
``` css
.container{
	align-items: flex-start | flex-end | center | baseline | stretch
}
```
* flex-start:子项在侧轴上靠近起始位置对齐
* flex-end：子项在侧轴上靠近结束位置对齐
* center：子项在侧轴上，居中对齐
* baseline：子项的内容靠基线对齐
* stretch

align-items属性展示效果图：
![](/assets/images/align-items.png)

## align-content
属性的六个属性值
``` css
.container{
	align-content:flex-start | flex-end | center | space-between | space-around | stretch
}
```
**只有在子项是多行时，该属性生效**
* flex-start:各行向容器侧轴的起始位置靠齐
* flex-end：各行向容器侧轴的结束位置靠齐
* center：各行在容器侧轴上居中对齐
* space-between：各行在容器侧轴上平均分布，两端不留空间
* space-around：各行在容器侧轴上平均分布，两端保留一半空间
* stretch：各行会伸缩以填满侧轴上的空间



# Flex的子项属性详细介绍
## order
属性是一个数字序号值
子项根据order数字的大小进行排序展示


## flex-grow属性
设置一个数字，表示扩大子项大小
## flex-shrink属性
设置一个数字，表示缩写子项大小，在容器空间不足的情况下生效

## flex-basis
子项分配容器剩余空间的一个依据基础
两个值，如果为0，内容不考虑子项的周围额外空间，如果是auto，以子项周围的额外空间进行分布

flex-basis属性展示效果图：
![](/assets/images/flex-basis.png)

## flex：
是flex-grow，flex-shrink和flex-basis属性的综合缩写，默认值为0 1 auto
flex一般使用第一个数字

## align-self
属性的六个属性值,子项的对齐方式覆盖原有的对齐方式
``` css
.container{
	align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
* auto:计算值为父元素的align-items属性值，如果该元素没有父元素，则计算值为stretch
* flex-start：子项在侧轴起始一侧，靠近起始的边
* flex-end：子项在侧轴结束的一侧，靠近结束的边
* center：子项在侧轴上居中
* baseline：子项基于元素的基线对齐
* stretch

align-self属性展示效果图：
![](/assets/images/align-self.png)



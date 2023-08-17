---
title: markdown常用语法
date: 2017-03-16 14:20:54
categories: 工具的使用
tags: 
  - markdown语法
permalink: /pages/4c7f5f/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---

## markdown的标题
markdown文件支持6级标题分类

``` bash
# 这是第一级标题
## 这是第二级标题
### 这是第三级标题
#### 这是第四级标题
##### 这是第五级标题
###### 这是第六级标题
```
以上代码呈现的页面效果：
# 这是第一级标题
## 这是第二级标题
### 这是第三级标题
#### 这是第四级标题
##### 这是第五级标题
###### 这是第六级标题

## markdown的特殊字体样式

``` bash
	<s>删除线样式</s>
	*斜体*
	**粗体**
	** *粗斜体* **
	上标：X<sub>2</sub>
	下标：O<sup>2</sup>
	行内代码 `npm install marked`
	-----------
	横线分割效果
```
以上代码呈现的页面效果：
<s>删除线样式</s>
*斜体*
**粗体**
** *粗斜体* **
上标：X<sub>2</sub>
下标：O<sup>2</sup>
行内代码 `npm install marked`
-----------
横线分割效果

## markdown的列表
``` bash
无序列表
* 列表一
* 列表二
* 列表三

列表嵌套
* 列表一
* 列表二
	* 列表一
	* 列表二
	* 列表三
* 列表三

1. 第一行
2. 第二行
3. 第三行
```
以上代码呈现的页面效果：
无序列表
* 列表一
* 列表二
* 列表三

列表嵌套
* 列表一
* 列表二
	* 列表一
	* 列表二
	* 列表三
* 列表三

1. 第一行
2. 第二行
3. 第三行


## markdown的引用文本段落
``` bash
> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启
>> The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.
> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，  
这里进行了换行。
```
以上代码呈现的页面效果：
> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启
>> The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.
> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，  
这里进行了换行。

## markdown的锚点和链接
``` bash
[普通链接](http://shenshuai.me/)
直接链接：<https://github.com/shenshuai89>
[锚点链接][anchor-id] 
[anchor-id]: http://www.this-anchor-link.com/

```

## markdown的代码语言类型

### JS代码
``` javascript
	function test(){
		console.log("Hello world!");
	}
```
### html代码
``` html
<!DOCTYPE html>
<html>
    <head>
        <meta charest="utf-8" />
        <title>Hello world!</title>
    </head>
    <body>
        <h1>Hello world!</h1>
    </body>
</html>

```
## markdown中插入图片

![](/assets/images/heart.gif)

> Follow your heart.

![](/assets/images/life.gif)

> It's a bad day,Not a bad life;

图片加链接 (Image + Link)：

[![](/assets/images/moving.gif)](https://www.shenshuai.me)

> keep moving


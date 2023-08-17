---
title: 移动端head头部meta标签
date: 2017-04-19 20:14:20
categories: 前端开发
tags: 
  - html5
description: 移动端head头部meta标签
permalink: /pages/988573/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---

## 移动端head头部meta标签

``` html

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<!-- width 可视区的宽度，值可以为数字或关键词 device-width -->
		<!-- height 可视区的高度 -->
		<!-- initial-scale 初始的缩放比例 -->
		<!-- minimum-scale 允许用户缩放的最小比例 -->
		<!-- maximum-scale 允许用户缩放的最大比例 -->
		<!-- user-scalable 是否允许用户手动缩放 -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
		<!-- content="telephone=yes" 在iPhone手机上默认会显示拨号连接 -->
		<!-- content="telephone=no" 取消在iPhone手机上显示的拨号连接 -->
		<!--使设备浏览网页时对数字不启用电话功能（不同设备解释不同，itouch点击数字为存入联系人，iphone为拨打电话），忽略将页面中的数字识别为电话号码。-->
		<meta name="format-detection" content="telephone=no" />
		<!-- 忽略默认的邮箱链接标识 -->
		<meta name="format-detection" content="email=no">
		<!--网站开启对 web app 程序的支持-->
    	<meta name="apple-mobile-web-app-capable" content="yes">
    	<!--在 web app 应用下状态条（屏幕顶部条）的颜色；(改变顶部状态条的颜色)-->
    	<!--默认值为 default（白色），可以定为 black（黑色）和 black-translucent（灰色半透明）；-->
    	<meta name="apple-mobile-web-app-status-bar-style" content="black">
    	<!--http-equiv="Content-Type" 表示描述文档类型-->
    	<!--HTTP-EQUIV类似于HTTP的头部协议，它回应给浏览器一些有用的信息，以帮助正确和精确地显示网页内容-->
    	<meta http-equiv="Content-Type" content="text/html">
    	<!-- UC默认竖屏 ，UC强制全屏 -->
    	<meta name="full-screen" content="yes">
		<!--使用了application这种应用模式后，页面讲默认全屏，禁止长按菜单，标准排版，以及强制图片显示。-->
	    <!--应用模式-->
	    <meta name="browsermode" content="application">
	    <!-- QQ强制竖屏 QQ强制全屏 -->
	    <!--设置屏幕方向-->
	    <meta name="x5-orientation" content="portrait">
	    <!--设置全屏-->
	    <meta name="x5-fullscreen" content="true">
	    <!--设置屏幕模式-->
	    <meta name="x5-page-mode" content="app">
	    <!-- windows phone 点击无高光 -->
	    <meta name="msapplication-tap-highlight" content="no">
	</head>
</html>

```

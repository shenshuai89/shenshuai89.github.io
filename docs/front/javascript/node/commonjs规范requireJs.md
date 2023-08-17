---
title: requireJs模块化
date: 2017-12-11 10:14:26
categories: 前端开发
tags: 
  - JavaScript
permalink: /pages/197c6c/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---

## requireJs定义
随着web应用越来越复杂，嵌入的javascript代码越来越多，模块化编程就变成了必须。
RequireJS 是一个JavaScript模块加载器。 它非常适合在浏览器中使用，但它也可以用在其他脚本环境, 就像 Rhino and Node. 使用RequireJS加载模块化脚本将提高代码的加载速度和质量。

## 为什么使用requireJs
* 异步“加载”。我们知道，通常网站都会把script脚本的放在html的最后，这样就可以避免浏览器执行js带来的页面阻塞。使用RequireJS，会在相关的js加载后执行回调函数，这个过程是异步的，所以它不会阻塞页面。

* 按需加载。通过RequireJS，你可以在需要加载js逻辑的时候再加载对应js模块，这样避免了在初始化网页的时候发生大量的请求和数据传输。

* 更加方便的模块依赖管理。曾经遇到过因为script标签顺序问题而导致依赖关系发生错误，这个函数未定义，那个变量undefine之类的。通过RequireJS的机制，你能确保在所有的依赖模块都加载以后再执行相关的文件，所以可以起到依赖管理的作用。

* 更加高效的版本管理。想一想，如果你还是用的script脚本引入的方式来引入一个jQuery2.x的文件，然后你有100个页面都是这么引用的，那当你想换成jQuery3.x，那你就不得不去改这100个页面。但是如果你的requireJS有在config中做jQuery的path映射，那你只需要改一处地方即可。

* 当然还有一些诸如cdn加载不到js文件，可以请求本地文件等其它的优点，这里就不一一列举了。

学习requireJs有三个暴露变量requirejs,require,define。其中requirejs只是require的一个别名，目的是如果页面中有require其它实现，还是能通过使用requirejs来使用requireJS API的(本文中没有相关冲突，所以还是使用require)。
作为入门，只需要掌握require,require.config,define这三样就可以了。

requirejs下。其主要API主要是下面三个函数:

* define—— 该函数用户创建模块。每个模块拥有一个唯一的模块ID，它被用于RequireJS的运行时函数，define函数是一个全局函数，不需要使用requirejs命名空间.
* require—— 该函数用于读取依赖。同样它是一个全局函数，不需要使用requirejs命名空间.
* config—— 该函数用于配置RequireJS.
* require.config配置参数选项
* baseUrl——用于加载模块的根路径。
* paths——用于映射不存在根路径下面的模块路径。
* shims——配置在脚本/模块外面并没有使用RequireJS的函数依赖并且初始化函数。假设underscore并没有使用  
* RequireJS定义，但是你还是想通过RequireJS来使用它，那么你就需要在配置中把它定义为一个shim。
* deps——加载依赖关系数组

## RequireJS需要在页面中引入
``` bash
<script type="text/javascript" src='./js/lib/require.js' data-main='./js/src/main'></script>>
```
创建如图所示的目录结构
![requireJs项目结构](/assets/images/requiredemo.png)

// ./index.html
``` bash
<!DOCTYPE html>
<html>
<head>
    <title>Require Demo 1</title>
</head>
<body>
    <div>
        <h1>Require Demo 1 -- usage of Require()</h1>
        <button id="contentBtn">Click me</button>
    <p id="messagebox"></p>
    </div>
    <script data-main="js/src/main" src="js/lib/require.js" type="text/javascript"></script> 
</body>
</html>
```

// ./js/src/main.js
``` javascript
// 设置配置
require.config(
    {
        paths: {
            'jquery': '../lib/jquery'
        }
    }
);
// 引入依赖，执行程序
require(['jquery'],function ($) {
         $(document).on('click','#contentBtn',function(){
            $('#messagebox').html('You have access Jquery by using require()');
         });
});
```
 >> require.js会在加载完成以后通过回调方法去加载这个data-main里面的js文件,js文件被加载的时候，RequireJS已经加载执行完毕。

* main.js文件,里面被一个匿名立即执行函数所包括。
* require.config(...)中放一个对象，可以配置许多配置项，在上面文件中设置了paths，该属性设置之后，就可以按照设置的路径加载相应的模块。
* require()函数
require函数接受的第一个参数是，所依赖模块的一个数组。 第二个参数回调函数，引入的依赖加载完毕后回调函数会被触发。
如果你传入的依赖有注入变量（函数）,然后在回调函数中需要用到，你就需要按照顺序在回调函数的参数中添加别名，在本例子中可以通过别名$来使用jQuery的相关API。所以**有注入的模块**需要放在**无注入或者不需要调用模块**的模块前面，方便回调函数传入别名。

>> requireJS在不同情况下的相对路径的层级关系。

以下是相对路径的规则:

* 如果script标签引入require.js时没有指定data-main属性，则以引入该js的html文件所在的路径为根路径。

* 如果有指定data-main属性，也就是有指定入口文件，则以入口文件所在的路径为根路径。在本例子中也就是main.js所在的script文件夹就是根路径，这也是为什么配置jQuery的时候需要返回上层目录再进入lib目录才能找到jQuery文件。

* 如果再require.config()中有配置baseUrl，则以baseUrl的路径为根路径。
以上三条优先级逐级提升，如果有重叠，后面的根路径覆盖前面的根路径。

## define函数的使用，如何定义一个模块
通过 define = function (name, deps, callback)完成的,第一个参数是定义模块名，第二个参数是传入定义模块所需要的依赖，第三个函数则是定义模块的主函数，主函数和require的回调函数一样，同样是在依赖加载完以后再调用执行。

* 当你没有任何依赖的时候,你可以这么写:

// ./js/src/desc.js
``` bash
define(function(){
    return{
        decs : 'this js will be request only if it is needed',
    };
})
```
修改main.js文件
``` bash
require(['jquery'], function($){
	$(document).on('click', '#contentBtn',function(){
		$('#msgBox').html('You have access Jquery by using require()');
		require(['./desc'],function(desc){
			alert(JSON.stringify(desc))
		})	
	})
})
```
打开网页，查看network视图，点击按钮，通过require获得的desc模块就会alert出来，同时你会发现，desc.js是按需请求的，并不是在页面一开始的时候就请求的。

* 当你有相关依赖的时候,你可以这么写:

// ./js/src/alertDesc.js
``` bash
define(['./desc'],function(desc){
    return function (){
        alert(JSON.stringify(desc));
    };
})
```
修改main.js
``` bash
require(['jquery'], function($){
	$(document).on('click', '#contentBtn',function(){
		$('#msgBox').html('You have access Jquery by using require()');
		require(['./alertDesc'],function(alertDesc){
			alertdesc();
		})	
	})
})
```
## requireJs.config参数的配置
在使用require()函数的时候，我们已经接触到了require.config()。require.config()做的一些修改会影响到全局require的一些特性。
如果设置了baseUrl，require的根路径就以这个路径为准。
设置map可以在不同路径下用相同的模块ID调用不同版本的模块。
也可以把require.config单独分离出来一个模块，单独放置在一个js文件中。
// ./js/src/config.js
``` bash
define(function(){
    require.config({
        baseUrl: './js/',
        paths: {
            'jquery': 'lib/jquery-1.7.2'
        }
    });
});
```
修改main.js文件
``` bash
require(['config'],function(){
    require(['jquery'],function ($) {
         $(document).on('click','#contentBtn',function(){
            $('#messagebox').html('You have access Jquery by using require()');
            require(['./src/alertdesc'],function(alertdesc){
                alertdesc();
            });
         });
    });
});
```

## data-main模块
当require.js加载的时候会检查data-main属性，所以在data-main指向的脚本
(也就是本例子中的js/src/main.js)中设置模块加载的选项,然后在这个脚本加载第一个应用模块。
注意，你在main.js中所设置的脚本是异步加载并通过回调来执行的，这意味着如果你在页面中有通过script引入其它的脚本，不能保证在main.js里面做的配置会在其它脚本中生效。






---
title: verdaccio搭建npm服务器
date: 2025-09-02 16:58:28
permalink: /pages/beb935/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
主要有 3 种工具来搭建 npm 私服：nexus、verdaccio 以及 cnpm；下面主要介绍 verdaccio 的使用。

## <font style="color:rgb(85, 85, 85);">一、安装、启动</font>
<font style="color:rgb(85, 85, 85);">Verdaccio 的安装启动过程较为简单。首先是全局安装 Verdaccio：</font>

```javascript
npm i -g verdaccio
```

<font style="color:rgb(85, 85, 85);">在终端中输入 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">verdaccio</font><font style="color:rgb(85, 85, 85);"> 命令启动 Verdaccio：</font>

![demo](https://cdn.nlark.com/yuque/0/2022/png/737887/1652875701174-da052990-e89e-4653-a145-5e3c5b493f67.png)

<font style="color:rgb(85, 85, 85);">终端中输出提示，输出它的配置文件位置、启动的服务地址等信息：</font>

<font style="color:rgb(85, 85, 85);">默认 Verdaccio 启动的服务都会在 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">4873</font><font style="color:rgb(85, 85, 85);"> 这个端口，在浏览器中打开这个地址我们就会看到 Verdaccio 搭建的私有库 npm 的界面</font>

![](https://cdn.nlark.com/yuque/0/2022/png/737887/1652875772434-aebd1d3d-a305-4c49-93bb-1058ce8469ab.png)

## <font style="color:rgb(85, 85, 85);">二、配置修改</font>
<font style="color:rgb(85, 85, 85);">在生产环境下，私有 npm 库需要具备以下 3 个功能：</font>

+ <font style="color:rgb(85, 85, 85);">支持对 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">npm</font><font style="color:rgb(85, 85, 85);"> 包的搜索</font>
+ <font style="color:rgb(85, 85, 85);">严格的权限把控，</font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">npm</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">包的访问只能是已注册的用户。并且在一些场景下，需要删除用户</font>
+ <font style="color:rgb(85, 85, 85);">发布 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">npm</font><font style="color:rgb(85, 85, 85);"> 包后，推送到钉钉群，告知哪个 npm 包进行了发布</font>

<font style="color:rgb(85, 85, 85);">Verdaccio 的配置文件是在 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">~/.config/Verdaccio</font><font style="color:rgb(85, 85, 85);"> 文件夹的 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">config.yaml</font><font style="color:rgb(85, 85, 85);"> 文件，默认的配置会是这样：</font>

```javascript
storage: ./storage
plugins: ./plugins
web:
  title: Verdaccio
auth:
  htpasswd:
    file: ./htpasswd
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs
  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs
server:
  keepAliveTimeout: 60
middlewares:
  audit:
    enabled: true
logs:
  - { type: stdout, format: pretty, level: http }
```

<font style="color:rgb(85, 85, 85);">逐个认识一下默认配置中的几个值的含义：</font>

+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">storage</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">已发布的包的存储位置，默认存储在</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">~/.config/Verdaccio/</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">文件夹下</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">plugins</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">插件所在的目录</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">web</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">界面相关的配置</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">auth</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">用户相关，例如注册、鉴权插件（默认使用的是</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">htpasswd</font><font style="color:rgb(85, 85, 85);">）</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">uplinks</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">用于提供对外部包的访问，例如访问 npm、cnpm 对应的源</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">packages</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">用于配置发布包、删除包、查看包的权限</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">server</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">私有库服务端相关的配置</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">middlewares</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">中间件相关配置，默认会引入</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">auit</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">中间件，来支持</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">npm audit</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">命令</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">logs</font><font style="color:rgb(85, 85, 85);"> 终端输出的信息的配置</font>

### <font style="color:rgb(85, 85, 85);">2.1 开启搜索</font>
<font style="color:rgb(85, 85, 85);">当我们私有 npm 库存在很多包的时候，我们想要查找某个包就会有些麻烦。而 Verdaccio 是支持搜索功能的，它是由</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">search</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">控制的，默认为</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">false</font><font style="color:rgb(85, 85, 85);">，所以这里我们需要开启它：</font>

```javascript
search: true 
```

<font style="color:rgb(85, 85, 85);">开启之后，我们就可以在私有 npm 库的页面上的搜索栏进行正常的搜索操作。</font>

### <font style="color:rgb(85, 85, 85);">2.2 权限把控</font>
<font style="color:rgb(85, 85, 85);">权限把控指的是我们需要私有 npm 库上发布的包</font>**<font style="color:rgb(85, 85, 85);">只能团队成员查看</font>**<font style="color:rgb(85, 85, 85);">，除此之外人员不能看到一切信息。那么，回到 Verdaccio，我们需要做这 2 件事：</font>

+ <font style="color:rgb(85, 85, 85);">限制 npm 包的查看，只能为已注册的用户</font>
+ <font style="color:rgb(85, 85, 85);">禁止用户注册（在团队成员已注册完成后）</font>

<font style="color:rgb(85, 85, 85);">相应地，这里我们需要修改配置文件的</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">pacakges</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">和</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">auth</font><font style="color:rgb(85, 85, 85);">。前面我们也提及了</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">packages</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">是用于配置发布包、查看包、删除包相关的权限。我们先再来看看默认的配置：</font>

```javascript
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs
  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs
```

<font style="color:rgb(85, 85, 85);">这里的 key 代表对应权限需要匹配的包名，例如对于第一个，如果我们发布的包名是这样的</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">@wjc/test</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">就会命中。每个规则中对应 4 个参数。其中</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">proxy</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">代表如果在私有 npm 库找不到，则会代理到 npmjs（对应</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">unlinks</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">中的</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">npmjs</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">的</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">https://registry.npmjs.org/</font><font style="color:rgb(85, 85, 85);">）。而剩下的 3 个参数，都是用来设置包相关的权限，它有三个可选值</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">$all</font><font style="color:rgb(85, 85, 85);">（所有人）、</font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">$anonymous</font><font style="color:rgb(85, 85, 85);">（未注册用户）、</font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">$authenticated</font><font style="color:rgb(85, 85, 85);">（注册用户）。那么，下面我们分别看一下这 3 个参数的含义：</font>

+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">access</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">控制包的访问权限</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">publish</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">控制包的发布权限</font>
+ <font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">unpublish</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">控制包的删除权限</font>

<font style="color:rgb(85, 85, 85);">显然，这里我们需要的是只有用户才能具备上述 3 个权限，即都设置为 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">$authenticated</font><font style="color:rgb(85, 85, 85);">：</font>  


```javascript
packages:
  '@*/*':
    access: $authenticated
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs
  '**':
    access: $authenticated
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs
```

<font style="color:rgb(85, 85, 85);">设置好</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">packages</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">后，我们还得更改</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">auth</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">的值，因为此时注册用户是没有限制的，也就是说如果你的私有 npm 库部署在外网环境的话，任何人都可以通过</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">npm adduser</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">命令注册用户。</font>

<font style="color:rgb(85, 85, 85);">显然，这是不允许出现的情况，所以这里我们需要设置</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">auth</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">的</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">max_users</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">为</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">-1</font><font style="color:rgb(85, 85, 85);">，它代表的是禁用注册用户：</font>

```javascript
auth:
    max_users: -1
```

> 开启注册，设置大于0就可以；
>

### <font style="color:rgb(85, 85, 85);">2.3 发布包推送钉钉群或企微</font>
<font style="color:rgb(85, 85, 85);">发布包推送钉钉群，指的是我们每次发布包可以通过钉钉群的机器人来通知我们发布的包的信息。</font>

<font style="color:rgb(85, 85, 85);">首先，这里我们需要先有一个钉钉群的机器人对应的 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">Webhook</font><font style="color:rgb(85, 85, 85);">（获取方式可以查看钉钉的文档）。然后，在 Verdaccio 的配置文件中添加 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">notify</font><font style="color:rgb(85, 85, 85);">：</font>

```javascript
notify:
  'dingtalk':
    method: POST
    headers: [{'Content-Type': 'application/json;charset=utf-8'}]
    endpoint: https://oapi.dingtalk.com/robot/send?access_token=****, # 钉钉机器人的 webhook
    content: '{"color":"green","message":"新的包发布了: * {{ name }}*","notify":true,"message_format":"text"}'
```

<font style="color:rgb(85, 85, 85);">其中，</font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">method</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">和</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">headers</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">分别表示请求的方法和实体的类型。</font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">endpoint</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">表示请求的</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">Webhook</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">地址。</font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">content</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">则表示获取发布信息的基础模版，模版中</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">message</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">的值会是钉钉群的机器人发送的消息内容（</font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">name</font><font style="color:rgb(85, 85, 85);"> </font><font style="color:rgb(85, 85, 85);">表示发布的包名）。</font>

<font style="color:rgb(85, 85, 85);">假设，此时我们发布了一个包名为 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">ming-pro</font><font style="color:rgb(85, 85, 85);"> 的私有包，相应地我们会在钉钉群里收到通知：</font>

## <font style="color:rgb(85, 85, 85);">基本使用</font>
### <font style="color:rgb(85, 85, 85);">3.1 注册用户</font>
<font style="color:rgb(85, 85, 85);">首先，我们需要注册一个用户：</font>

```javascript
npm adduser --registry http://localhost:4873/
```

![](https://cdn.nlark.com/yuque/0/2022/png/737887/1652876370820-2a5eedd9-9b5e-43ad-b77c-15a203e962c0.png)  
注册成功后，就可以到端口4873登陆。

### <font style="color:rgb(85, 85, 85);">3.2 删除用户</font>
<font style="color:rgb(85, 85, 85);">既然有注册用户，不可避免的需求是在一些场景下，我们需要删除某个用户来禁止其登陆私有 npm 库。</font>

<font style="color:rgb(85, 85, 85);">前面也提及了 Verdaccio 默认使用的是 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">htpasswd</font><font style="color:rgb(85, 85, 85);"> 来实现鉴权。相应地，注册的用户信息会存储在 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">~/.config/verdaccio/htpasswd</font><font style="color:rgb(85, 85, 85);"> 文件中：  
</font>

```javascript
MacBook-Pro verdaccio % cat htpasswd 
shenshuai:f9TW.3Gxq42Dc:autocreated 2022-05-18T10:04:00.471Z
```

<font style="color:rgb(85, 85, 85);">这里一条记录对应一个用户，也就是如果这条记录被删除了，那么该用户就不能登陆了，即删除了该用户。</font>

### <font style="color:rgb(85, 85, 85);">3.3 添加、切换源</font>
<font style="color:rgb(85, 85, 85);">通过 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">nrm</font><font style="color:rgb(85, 85, 85);"> 来切换源</font>

```javascript
nrm add shuai http://localhostm:4873/
```

<font style="color:rgb(85, 85, 85);">这里的 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">shuai</font><font style="color:rgb(85, 85, 85);"> 代表你这个源的简称，你可以因自己的喜好来命名。</font>

<font style="color:rgb(85, 85, 85);">接着，我们可以运行 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">nrm ls</font><font style="color:rgb(85, 85, 85);"> 命令来查看目前存在的源：</font>  
![](https://cdn.nlark.com/yuque/0/2022/png/737887/1652876550762-699a848e-9868-4fc0-882e-2ccc05ac02aa.png)  
<font style="color:rgb(85, 85, 85);">默认情况下 npm 使用的源是 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">https://registry.npmjs.org/</font><font style="color:rgb(85, 85, 85);">，那么这里我们需要将它切换成私有 npm 库对应的源：</font>

```javascript
nrm use shuai
```

<font style="color:rgb(85, 85, 85);">切换好源后，我们之后的 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">npm i</font><font style="color:rgb(85, 85, 85);"> 就会</font>**<font style="color:rgb(85, 85, 85);">先去私有库查找包</font>**<font style="color:rgb(85, 85, 85);">，如果不存在则会去 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">https://registry.npmjs.org/</font><font style="color:rgb(85, 85, 85);">（因为上面配置了 </font><font style="color:rgb(248, 35, 117);background-color:rgb(248, 248, 248);">proxy</font><font style="color:rgb(85, 85, 85);">）查找包。</font>

### <font style="color:rgb(85, 85, 85);">3.4 发布</font>
<font style="color:rgb(85, 85, 85);">发布的话就直接在某个需要发布包的项目</font>

```javascript
npm publish
```

<font style="color:rgb(85, 85, 85);">在私有 npm 库的界面上就可以看到我们发布的包：</font>  
![](https://cdn.nlark.com/yuque/0/2022/png/737887/1652876675144-18c12c74-ea47-4b74-b68e-468c6b75e38a.png)




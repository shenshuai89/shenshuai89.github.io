---
title: 使用现有bootstrap的模板，改写nuxt3项目
date: 2025-08-25 16:55:45
permalink: /pages/3926f2/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---


为了响应快速开发企业网站，并且能够适配移动端，完整的使用tailwind css写一套还挺复杂。

虽然有很多的UI框架，这些框架开发管理系统还可以，有着统一的UI风格，企业网站主要面向C端用户，有着不同设计风格需求，那么之前的bootstrap布局的页面还是很不错的选择。

比如就可以在[模板王](https://www.mobanwang.com/)中下载一套项目代码，通过将内容和文字做一些修改，即可给客户使用。

接下来是改造的过程：

改造最初通过询问AI，给出了2个方案；

+ 第一，使用bootstrap-vue-next，然后配合tailwind css进行改造【使用的此方法，改动量很大，放弃】；
+ 第二，将js和css文件迁移的public目录下，然后在项目中加载，这样只需要将html文件修改为.vue的文件类型，然后修改很少的链接跳转方式即可。

本文中采用第二种方案。

**<font style="background-color:#D9EAFC;">迁移过程最痛苦的2件事，在vue中js的加载时机 和 迁移静态资源public/assets。</font>**

## 下载代码
本次改造的项目代码，原模板下载[https://www.mobanwang.com/mb/demo/22705/](https://www.mobanwang.com/mb/demo/22705/)；

也可以下载其他网络上的优秀的企业站代码。

![](https://cdn.nlark.com/yuque/0/2025/png/737887/1755165831477-689187e7-27ab-4633-b4e8-6b8342188cf1.png)

```plain
├── about.html
├── assets
│   ├── css
│   │   ├── bootstrap.min.css
│   │   ├── em-breadcrumb.css
│   │   ├── plugin_theme_css.css
│   │   └── responsive.css
│   ├── fonts
│   │   ├── Flaticon.woff
│   │   ├── Flaticon.woff2
│   │   ├── Sofia Pro Bold.ttf
│   │   ├── aprova0698.eot
│   │   ├── aprova0698.svg
│   │   ├── aprova0698.ttf
│   │   ├── aprova0698.woff
│   │   ├── fontawesome-webfont3295.ttf
│   │   ├── fontawesome-webfont3295.woff
│   │   ├── fontawesome-webfont3295.woff2
│   │   ├── icofont.eot
│   │   ├── icofont.svg
│   │   ├── icofont.ttf
│   │   ├── icofont.woff
│   │   ├── icofont.woff2
│   │   ├── themify.ttf
│   │   └── themify.woff
│   ├── images
│   │   ├── about-img-1.jpg
│   │   ├── b1.jpg
│   │   ├── b2.jpg
│   │   ├── b3.jpg
│   │   ├── b4.jpg
│   │   ├── b5.jpg
│   │   ├── b6.jpg
│   │   ├── b7.jpg
│   │   ├── b8.jpg
│   │   ├── blog-sidebar1.jpg
│   │   ├── blog-sidebar2.jpg
│   │   ├── blog-sidebar3.jpg
│   │   ├── br1.jpg
│   │   ├── br2.jpg
│   │   ├── br3.jpg
│   │   ├── br4.jpg
│   │   ├── br5.jpg
│   │   ├── contact-bg.jpg
│   │   ├── faq-img.png
│   │   ├── favicon.png
│   │   ├── fottor-bg.jpg
│   │   ├── logo1.png
│   │   ├── logo2.png
│   │   ├── service-bg-img.jpg
│   │   ├── service-img.png
│   │   ├── single-blog.jpg
│   │   ├── single-service.jpg
│   │   ├── skill-img.jpg
│   │   ├── slide-03.jpg
│   │   ├── slider1.jpg
│   │   ├── slider2.jpg
│   │   ├── tab-img.jpg
│   │   ├── tab-img2.jpg
│   │   ├── tab-img3.jpg
│   │   ├── team-bg.jpg
│   │   ├── team1.jpg
│   │   ├── team1.png
│   │   ├── team2.jpg
│   │   ├── team2.png
│   │   ├── team3.jpg
│   │   ├── team3.png
│   │   ├── team4.png
│   │   ├── test1.png
│   │   ├── test2.png
│   │   ├── test3.png
│   │   └── test4.png
│   ├── js
│   │   ├── BeerSlider.js
│   │   ├── ajax-mail.js
│   │   ├── bootstrap.min.js
│   │   ├── bootstrap.min.js.map
│   │   ├── customizer.js
│   │   ├── imagesloaded.pkgd.min.js
│   │   ├── isotope.pkgd.min.js
│   │   ├── jquery.appear.js
│   │   ├── jquery.knob.js
│   │   ├── jquery.meanmenu.js
│   │   ├── jquery.nivo.slider.pack.js
│   │   ├── jquery.waitforimages.js
│   │   ├── map.js
│   │   ├── modernizr.custom.79639.js
│   │   ├── owl.carousel.min.js
│   │   ├── slick.min.js
│   │   ├── swiper-bundle.min.js.map
│   │   ├── theme-pluginjs.js
│   │   ├── theme.js
│   │   └── vendor
│   │       ├── jquery-3.5.1.min.js
│   │       └── modernizr-2.8.3.min.js
│   └── webfonts
│       ├── fa-brands-400.eot
│       ├── fa-brands-400.svg
│       ├── fa-brands-400.ttf
│       ├── fa-brands-400.woff
│       ├── fa-brands-400.woff2
│       ├── fa-regular-400.eot
│       ├── fa-regular-400.svg
│       ├── fa-regular-400.ttf
│       ├── fa-regular-400.woff
│       ├── fa-regular-400.woff2
│       ├── fa-solid-900.eot
│       ├── fa-solid-900.svg
│       ├── fa-solid-900.ttf
│       ├── fa-solid-900.woff
│       └── fa-solid-900.woff2
├── blog-left-sidebar.html
├── blog-right-sidebar.html
├── blog.html
├── contact.html
├── faq.html
├── home-video.html
├── index.html
├── landing-page.html
├── portfolio-3column.html
├── portfolio-4column.html
├── portfolio.html
├── pricing-table.html
├── service.html
├── single-blog.html
├── single-service.html
├── style.css
├── team.html
├── testimonial.html
└── venobox
    ├── close.gif
    ├── next.gif
    ├── preload-circle.png
    ├── preload-dots.png
    ├── preload-ios.png
    ├── preload-quads.png
    ├── preload.png
    ├── prev.gif
    ├── venobox.css
    ├── venobox.js
    └── venobox.min.js

9 directories, 133 files
```

## 迁移静态资源
分为3中情况

+ assets下的图片资源，统一存放到`public/assets`下，**后边调整代码**来获取该路径的资源
+ 将assets下的js和css和font资源，放到`public/assets`下的js和css和font

将venobox和style.css文件也迁移到`public/assets`下，style.css可以放到`public/assets/css`的目录下，<font style="color:#DF2A3F;">注意这里需要将</font>`<font style="color:#DF2A3F;">style.css</font>`<font style="color:#DF2A3F;">的图片引用，修改为相对引用地址。</font>

+ 将html结尾的文件，复制body部分的代码到vue文件的template中。



## 关于js脚本加载的问题
在bootstrap中，每个页面为独立html页面，打开都会加载js脚本，并且加载脚本的时间在dom结构渲染完成后进行加载。

那么在改写的vue中，就需要onMounted的生命周期中加载。

在改造过程中尝试了几种方案：

+ 写到plugin中，通过`nuxtApp.hook('app:mounted', async () => {})`的生命周期时机进行加载，这种方法对`index.vue`页面生效，但是只加载了一次，对其他页面会失效。
+ 第二种还是想放到插件中，让每个页面的路由之后，加载js

```javascript
if (process.client) {
  const router = useRouter();

  // 监听路由变化，模拟每个页面的 mounted
  router.afterEach(async (to, from) => {
    console.log('页面 mounted 模拟:', to.path);
    // 在这里执行你的逻辑
    // 加载脚本、埋点、初始化第三方库等
    // const scripts = [
    //   '/js/vendor/modernizr-2.8.3.min.js',
    //   '/js/vendor/jquery-3.5.1.min.js',
    //   '/js/bootstrap.min.js',
    //   '/js/isotope.pkgd.min.js',
    //   '/js/owl.carousel.min.js',
    //   '/js/jquery.nivo.slider.pack.js',
    //   '/js/slick.min.js',
    //   '/venobox/venobox.min.js',
    //   '/js/imagesloaded.pkgd.min.js',
    //   '/js/jquery.appear.js',
    //   '/js/jquery.knob.js',
    //   '/js/BeerSlider.js',
    //   '/js/theme-pluginjs.js',
    //   '/js/jquery.meanmenu.js',
    //   '/js/ajax-mail.js',
    //   '/js/theme.js',
    // ];

    // for (const src of scripts) {
    //   try {
    //     await loadScript(src);
    //     console.log('脚本加载成功:', src);

    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  });
}
```

这种方案不能使用`<nuxt-link>`标签，使用此标签跳转的页面，还是无法正常加载和显示页面。使用`<a>`时可以生效，但是会刷新页面。

也放弃了这个方案

+ 使用`composables`下写一个公用的加载js的函数方法，在每个页面的`onMounted`周期中调用一下，这算是最好的解决办法。

```javascript
// 缓存已加载的脚本
const loadedScripts = new Set<string>();

const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    if (loadedScripts.has(src)) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.defer = true;

    script.onload = () => {
      loadedScripts.add(src);
      resolve(true);
    };

    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.body.appendChild(script);
  });
};
export const loadScriptClient = async () => {
  const script1 = document.createElement('script');
  script1.src = '/js/vendor/modernizr-2.8.3.min.js';
  document.body.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = '/js/vendor/jquery-3.5.1.min.js';
  document.body.appendChild(script2);

  const script3 = document.createElement('script');
  script3.src = '/js/bootstrap.min.js';
  document.body.appendChild(script3);

  const script4 = document.createElement('script');
  script4.src = '/js/isotope.pkgd.min.js';
  document.body.appendChild(script4);

  const script5 = document.createElement('script');
  script5.src = '/js/owl.carousel.min.js';
  document.body.appendChild(script5);

  const script6 = document.createElement('script');
  script6.src = '/js/jquery.nivo.slider.pack.js';
  document.body.appendChild(script6);

  const script7 = document.createElement('script');
  script7.src = '/js/slick.min.js';
  document.body.appendChild(script7);

  const script18 = document.createElement('script');
  script18.src = '/venobox/venobox.min.js';
  document.body.appendChild(script18);

  const script8 = document.createElement('script');
  script8.src = '/js/imagesloaded.pkgd.min.js';
  document.body.appendChild(script8);

  const script9 = document.createElement('script');
  script9.src = '/js/jquery.appear.js';
  document.body.appendChild(script9);

  const script10 = document.createElement('script');
  script10.src = '/js/jquery.knob.js';
  document.body.appendChild(script10);

  const script11 = document.createElement('script');
  script11.src = '/js/BeerSlider.js';
  document.body.appendChild(script11);

  const script12 = document.createElement('script');
  script12.src = '/js/theme-pluginjs.js';
  document.body.appendChild(script12);

  const script13 = document.createElement('script');
  script13.src = '/js/jquery.meanmenu.js';
  document.body.appendChild(script13);

  const script14 = document.createElement('script');
  script14.src = '/js/ajax-mail.js';
  document.body.appendChild(script14);

  const script15 = document.createElement('script');
  script15.src = '/js/theme.js';
  document.body.appendChild(script15);
  
};

```

在vue的页面中进行调用

```javascript
// 初始化脚本
onMounted(() => {
  loadScriptClient();
})
```



## 关于图片资源引用的问题
### public/css内部应用的图片路径地址
public/assets/css内部应用的图片路径地址，是public/assets/images中的资源； 

```css
.consit_service_area2 {
    background-image: url("../images/port-bg-img.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    padding: 120px 0px 110px;
}
```

### vue文件的template的图片
template模版内的图片引入：

+ 使用`"/assets/images/logo1.png"`的也是`public/assets/images`目录的资源。
+ 如果代码`"assets/images/logo1.png"`则是使用了`assets/images`目录资源

```vue
<template>
  <div class="mobile_menu_logo text-center">
    <a href="index.html" title="consit">
      <img src="/assets/images/logo1.png" alt="consit" />
    </a>
  </div>
</template>
```

### vue文件的template的style中使用图片
在template中的style添加背景图片，这里如果正常使用`/assets/images/logo1.png`，就会引用到/assets/images的资源，而不是public/assets/image的资源。

#### 下面代码引用了 `assets/image`的资源
这里不管有没有 `/` 路径，都是使用的 `assets/image`

```vue
<template>
  <div
      class="swiper-slide d1 t1 m1 witr_swiper_height"
      style="background-image:	url(/assets/images/slider1.jpg)"
    >
    1111
  </div>
</template>
```

#### 可以结合script，使用public的资源；
主要思路是通过动态导入图片资源，然后在绑定到style中

```vue
<template>
  <div
      class="swiper-slide d1 t1 m1 witr_swiper_height"
      :style="{ backgroundImage: `url(${slider1})` }"
    >
    1111
  </div>
</template>
<script setup>
  // vue script内引入assets图片的方法
  import slider1 from '/assets/images/slider1.jpg';
</script>
```

## 迁移完成后代码结构
```javascript
./
├── README.md
├── app.vue
├── components
│   ├── navFooter.vue
│   └── navHeader.vue
├── composables
│   └── index.ts
│── nuxt.config.ts
├── package.json
├── pages
│   ├── about.vue
│   ├── blog.vue
│   ├── blogLeft.vue
│   ├── blogRight.vue
│   ├── contact.vue
│   ├── faq.vue
│   ├── homeVideo.vue
│   ├── index.vue
│   ├── landingPage.vue
│   ├── portfolio.vue
│   ├── portfolio3column.vue
│   ├── portfolio4column.vue
│   ├── pricingTable.vue
│   ├── service.vue
│   ├── serviceSingle.vue
│   ├── singleBlog.vue
│   ├── team.vue
│   └── testimonial.vue
├── plugins
│   └── load-script.client.ts
├── pnpm-lock.yaml
├── public
│   ├── assets
│   │   └── images
│   │       ├── about-img-1.jpg
│   │       ├── b1.jpg
│   │       ├── b2.jpg
│   │       ├── b3.jpg
│   │       ├── b4.jpg
│   │       ├── ...
│   │       ├── css
│   │       │   ├── bootstrap.min.css
│   │       │   ├── em-breadcrumb.css
│   │       │   ├── plugin_theme_css.css
│   │       │   ├── responsive.css
│   │       │   └── style.css
│   │       ├── fonts
│   │       │   ├── Flaticon.woff
│   │       │   ├── ...
│   │       ├── js
│   │       │   ├── BeerSlider.js
│   │       │   ├── ajax-mail.js
│   │       │   ├── ...
│   │       ├── venobox
│   │       │   ├── close.gif
│   │       │   ├── next.gif
│   │       │   ├── preload-circle.png
│   │       │   ├── preload-dots.png
│   │       │   ├── preload-ios.png
│   │       │   ├── preload-quads.png
│   │       │   ├── preload.png
│   │       │   ├── prev.gif
│   │       │   ├── venobox.css
│   │       │   ├── venobox.js
│   │       │   └── venobox.min.js
│   │       └── webfonts
│   │           ├── fa-brands-400.eot
│   │           ├── fa-brands-400.svg
│   │           ├── ... 
│   ├── favicon.ico
│   ├── favicon.png
│   ├── robots.txt
└── tsconfig.json

29 directories, 146 files
```

以上是将bootstrap项目转为nuxt项目的代码结构。



## 添加接口请求，替换数据
有2种接口定义方式，一种可以直接使用nuxt的`server/api`，该接口可以直接调用数据库接口，处理数据，直接定义接口；第二种是使用独立的后端服务定义接口，前端只是做调用。

### 使用nuxt提供的后端接口
#### 按照规范定义接口文件
必须定义在目录`server/api`目录下；并且遵循一定的文件命名规范

+ get请求：user.get.ts
+ post: user.post.ts
+ delete: user.delete.ts

```plain
server/
├── api/               # 所有对外暴露的 API
│   ├── user.get.ts    # GET 请求：获取用户
│   ├── user.post.ts   # POST 请求：创建用户
│   ├── post/[id].get.ts  # 动态路由：获取文章详情
│   └── post/[id].delete.ts
├── routes/            # 自定义路由（可选）
├── utils/             # 可复用的工具函数（仅服务端使用）
│   └── db.ts
└── middleware/        # 中间件（可选）
```



#### 数据库创建
创建数据库

```sql
CREATE DATABASE nuxt3_app;
    DEFAULT CHARACTER SET = 'utf8mb4';
```

创建user表

```sql
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `create_time` datetime DEFAULT NULL COMMENT 'Create Time',
    `name` varchar(255) NOT NULL COMMENT 'User Name',
    `email` varchar(255) NOT NULL COMMENT 'User Email',
    `age` int NOT NULL COMMENT 'User Age',
    `password` varchar(255) NOT NULL COMMENT 'User Password',
    `avatar` varchar(255) DEFAULT NULL COMMENT 'User Avatar',
    `gender` varchar(2) NOT NULL COMMENT 'User Gender',
    `phone` varchar(255) DEFAULT NULL COMMENT 'User Phone',
    `address` varchar(255) DEFAULT NULL COMMENT 'User Address',
    `role` varchar(255) DEFAULT NULL COMMENT 'User Role',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'User Table';
```

#### 连接数据库
首先安装依赖 drizzle-orm 和 mysql2

`pnpm add drizzle-orm mysql2`



在`db.ts`文件中，可以定义读取数据库的方法。

```typescript
// server/utils/db.ts
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { useRuntimeConfig } from '#imports';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export async function useDb() {
  if (dbInstance) return dbInstance;

  const config = useRuntimeConfig();

  const connection = await mysql.createConnection({
    host: config.dbHost || 'localhost',
    port: config.dbPort || 3306,
    user: config.dbUser || 'root',
    password: config.dbPassword || '123456',
    database: config.dbName || 'nuxt3_app',
  });

  dbInstance = drizzle(connection) as any;
  return dbInstance;
}

```

定义Scheme结构

```typescript
// server/schema/user.ts
import { mysqlTable, varchar, int } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  age: int('age').notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  gender: varchar('gender', { length: 255 }).notNull(),
  //   非必需项 avatar
  avatar: varchar('avatar', { length: 255 }),
  //   非必需项 address
  address: varchar('address', { length: 255 }),
  //   非必需项 phone
  phone: varchar('phone', { length: 255 }),
  //   非必需项 role
  role: varchar('role', { length: 255 }),
});

```

定义获取user数据的接口

```typescript
// server/api/users.get.ts
import { defineEventHandler } from 'h3';
import { useDb } from '../utils/db';
import { users } from '../schema/user';

export default defineEventHandler(async (event) => {
  const db = await useDb();
  const userList = await db.select().from(users);
  return { success: true, data: userList };
});

```



#### 添加关于数据库的配置
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    // 私有密钥（仅服务端可见）
    public: {}
  }
})
```

创建`.env`文件

```plain
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=nuxt3_app
```

#### 前端进行调用
```vue
<script setup>
  const { data, pending } = await useFetch('/api/user')
</script>

<template>
  <div v-if="pending">加载中...</div>
  <ul v-else>
    <li v-for="user in data.data" :key="user.id">
      {{ user.name }} - {{ user.email }}
    </li>
  </ul>
</template>
```



#### ssr和csr对接口请求的影响
刷新页面，先执行ssr，然后执行csr，只有ssr获取到数据；此时csr获取不到数据

点击页面跳转，只有csr模式时；此时再请求接口，可以获取到数据

```javascript
// 判断执行环境
  if (process.server) {
    console.log('当前在服务端渲染 (SSR)');
    // 可以在这里做：数据库查询、API 调用、权限校验等
    const { data, pending, error } = await useFetch('/api/users');
    console.log('data', data.value, pending, error);
  }

  if (process.client) {
    console.log('当前在客户端渲染 (CSR)');
    // 可以在这里做：监听窗口大小、操作 DOM、使用 localStorage
    const { data, pending, error } = await useFetch('/api/user');
    // 此处获取不到数据
    console.log('data', data.value, pending, error);
    // 初始化脚本
    onMounted(async () => {
      loadScriptClient();
      // 在这里添加获取数据接口代码
    });
  }
```

![](https://cdn.nlark.com/yuque/0/2025/png/737887/1755861693702-40f6564f-4577-4dc1-aa65-2e86f4f0f3aa.png)

### 使用其他后端服务【node，java，python3】，提供接口
> 此方式对于ssr或csr都可以获取到数据
>

#### 封住一个请求接口的通用方法`useApi`
```javascript
// composables/useApi.ts

import type { FetchOptions, ResponseType } from 'ofetch';

// ======================
// 定义通用响应结构
// ======================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: number;
}

// ======================
// 请求配置扩展（可选）
// ======================
interface UseApiOptions<T> extends Omit<FetchOptions, 'body'> {
  body?: T;
  options?: any;
  responseType?: ResponseType;
  baseURL?: string;
}

// ======================
// 统一错误处理
// ======================
const handleResponseError = (error: any) => {
  const message = error?.data?.message || error?.statusText || '请求失败';
  console.error('[API Error]:', error);
  throw new Error(message);
};

// ======================
// 核心 API 函数
// ======================
export function useApi<T = any, R = any>(url: string, options: UseApiOptions<T> = {}) {
  const config = useRuntimeConfig();
  const token = useCookie('token'); // 假设使用 cookie 存储 token

  // 默认配置
  const defaultOptions: UseApiOptions<T> = {
    baseURL: (config.public.apiBase as string) || '/api',
    headers: {
      'Content-Type': 'application/json',
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    },
    onResponse: (_ctx) => {
      // 可在这里拦截响应，比如刷新 token
    },
    onResponseError: handleResponseError,
  };

  // 合并配置
  const fetchOptions: any = { ...defaultOptions, ...options };

  // 如果是 body 请求（POST/PUT），转换 headers
  if (options.body && ['POST', 'PUT', 'PATCH'].includes(options.method || '')) {
    fetchOptions.body = options.body;
  }

  // 使用 useFetch 发起请求
  return new Promise((resolve, reject) => {
    useFetch(url, fetchOptions)
      .then((response) => {
        if (response.data && response.data.value) {
          resolve(response.data.value as R);
        } else {
          console.log('request error' + url, response);
          if (import.meta.client) {
            console.error('client error' + url, response);
          } else {
            console.log('myError', response.data);
          }
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function apiGet(url: string, params: any, options?: any) {
  return useApi(url, {
    method: 'GET',
    params: params,
    options: options,
  });
}
export function apiPost(url: string, data: any, options?: any) {
  return useApi(url, {
    method: 'POST',
    body: data,
    options: options,
  });
}
export function apiPut(url: string, data: any, options?: any) {
  return useApi(url, {
    method: 'PUT',
    body: data,
    options: options,
  });
}
export function apiDelete(url: string, params: any, options?: any) {
  return useApi(url, {
    method: 'DELETE',
    params: params,
    options: options,
  });
}

```

#### 定义请求的route
> 不可以放到api目录下，api目录是nuxt框架自己的接口定义位置
>

我们创建一个httpApi目录，用来存放不同的接口路径

```javascript
// /server/httpApi/mock.js
import { apiGet } from '~/composables/useApi';

// 获取文章列表
export const queryArticleList = async (params) => {
  return await apiGet('/api/v1/topics', params);
};

```

```javascript
// nuxt.config.ts
runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://cnodejs.org',
    },
}
```

#### 前端页面进行调用
放置到blog页面进行调用查看

```javascript
<script setup lang="ts">
  import { queryArticleList } from '~/server/httpApi/mock.js';
  defineOptions({
    name: 'Blog',
  });

  // 判断执行环境
  if (process.server) {
    console.log('当前在服务端渲染 (SSR)');
    // 可以在这里做：数据库查询、API 调用、权限校验等
    const res = await queryArticleList({ page: 1, limit: 6 });
    console.log(res);
  }

  if (process.client) {
    console.log('当前在客户端渲染 (CSR)');
    // 可以在这里做：监听窗口大小、操作 DOM、使用 localStorage
    const res = await queryArticleList({ page: 1, limit: 6 });
    console.log(res);
    // 初始化脚本
    onMounted(async () => {
      loadScriptClient();
      // 在这里添加获取数据接口代码
    });
  }
</script>
```

#### ssr和csr模式获取数据
刷新页面，先执行ssr，然后执行csr，都可以获取到数据

![](https://cdn.nlark.com/yuque/0/2025/png/737887/1755861125153-7fc45181-b37a-45a7-a5bd-3f86263ec167.png)



## 打包发布上线
项目的开发环境为node的v22及以上。所有在启动项目时，最好也使用node 22版本。由于一些服务器的限制，比如centos6，安装比较高版本的node，需要安装很多插件。基于以上原因，采用了docker启动服务，docker中就可以随意配置node的版本。

### 将所有的静态资源放到public/assets下
发布到线上环境，配置nginx时，需要通过匹配 `/nuxtapp202504114/assets/`来指定静态资源的路径；

转移后需要修改引入js和css的路径

   1: 修改在`composables/index.ts`中引入的js

```javascript
// 导入 .env 配置文件的 baseURL
const config = {
  app: {
    baseURL: import.meta.env.BASE_URL,
  },
};

export const loadScriptClient = async () => {
  const baseUrl = config.app.baseURL.replace(/\_nuxt\//, '');

  const script1 = document.createElement('script');
  script1.src = baseUrl + 'assets/js/vendor/modernizr-2.8.3.min.js';
  script1.async = false;
  document.body.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = baseUrl + 'assets/js/vendor/jquery-3.5.1.min.js';
  script2.async = false;
  document.body.appendChild(script2);

  // ... 其他文件也同样修改
}
```

   2: 修改 nuxt.config.ts 配置中的资源路径

```javascript
export default defineNuxtConfig({
  app: {
    baseURL: process.env.BASE_URL || '/nuxtapp202504114/',
    head: {
      link: [
        { rel: 'stylesheet', href: process.env.BASE_URL + 'assets/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: process.env.BASE_URL + 'assets/venobox/venobox.css' },
        { rel: 'stylesheet', href: process.env.BASE_URL + 'assets/css/plugin_theme_css.css' },
        { rel: 'stylesheet', href: process.env.BASE_URL + 'assets/css/style.css' },
        { rel: 'stylesheet', href: process.env.BASE_URL + 'assets/css/responsive.css' },
      ],
      script: [
        { src: process.env.BASE_URL + 'assets/js/vendor/modernizr-2.8.3.min.js' },
        { src: process.env.BASE_URL + 'assets/js/vendor/jquery-3.5.1.min.js' },
        { src: process.env.BASE_URL + 'assets/js/swiper-bundle.min.js' },
      ],
    },
  },
}
```

  3: 修改 `public/assets/styles.css`中对于图片资源引入地址；

把原来 `/assets/images/`的修改为`../images`的相对路径

```css
.em_single_service:hover, .witr_service_front_3d {
    background-image: url("../images/service-img.png");
    background-repeat: no-repeat;
    background-size: cover;
  	border-color:#293C94;
  	border-radius:10px;
}
```



### 设置`.env`和`.env.production`
.env配置文件

```css
NUXT_PUBLIC_API_BASE = "https://cnodejs.org"

# 项目打包的根路径
BASE_URL = /nuxtapp202504114/

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=nuxt3_app
```

同时设置下线上环境的配置

```css
NUXT_PUBLIC_API_BASE = "https://cnodejs.org"

# 项目打包的根路径
BASE_URL = /nuxtapp202504114/

# 数据库配置
DB_HOST=ip
DB_PORT=3306
DB_USER=root
DB_PASSWORD='password'
DB_NAME=nuxt3_app
```

### 执行打包命令
执行命令`npm run build:prod`

然后将打包生产的`.output`目录压缩并上传到服务器；

> 如果在服务器可以使用node22版本，可以使用pm2启动项目，就不用下面的操作步骤；
>

同时还需上传`Dockerfile`、`docker-compose.yml`、`package.json`文件

```dockerfile
FROM node:22.12.0 AS runtime-stage

# 创建工作目录
RUN mkdir -p /app
WORKDIR /app

# 复制构建阶段生成的输出到运行时阶段
COPY ./.output /app/.output
COPY ./package.json /app/

# 设置环境变量
ENV NITRO_PORT=8097

# 暴露端口
EXPOSE 8097

# 设置入口点为启动脚本
ENTRYPOINT ["npm", "run", "start"]
```

创建 `docker-compose.yml` 的文件

```dockerfile
version: "3"
services:
  nuxtapp8097:
    image: nuxtapp8097:lastest
    restart: unless-stopped
    build:
      context: ./
    ports:
      - 8097:8097
    container_name: nuxtapp8097
```

将项目通过8097端口暴露进行访问，现在通过IP:80897就可以看到页面；



创建一个启动脚本 `restart.sh`

```shell
#!/bin/bash
rm -rf ./.output
unzip ./.output.zip

docker-compose kill nuxtapp8097
docker-compose rm -f nuxtapp8097

docker rmi nuxtapp8097:lastest
docker build -t nuxtapp8097:lastest .

docker-compose up -d 
```

这样就可以通过docker启动nuxt的项目



### 设置nginx，通过`IP/nuxtapp202504114`路径进行访问
修改`nginx.conf`配置文件

```nginx
server {
    # === 反向代理 /nuxtapp202504114 → http://localhost:8097/bootstrap202504114 ===
    location /nuxtapp202504114/ {
      # 1. 去掉 /nuxtapp202504114 前缀，转发到后端的 /bootstrap202504114/
      rewrite ^/nuxtapp202504114(/.*)$ /nuxtapp202504114$1 break;

      # 2. 代理到 Docker 服务
      proxy_pass http://localhost:8097/nuxtapp202504114;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      # 3. 处理 WebSocket（如果用到）
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_cache_bypass $http_upgrade;
  }

	# 静态资源：
    location /nuxtapp202504114/_nuxt/ {
        # ✅ 指向 .output/public/_nuxt/
        alias /data/web/nuxt-template/202504114/.output/public/_nuxt/;
        
        # 缓存设置（强烈推荐）
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin "*";
        
        # 开启 gzip 静态文件（如果构建时生成了 .gz）
        gzip_static on;
    }

    location /nuxtapp202504114/assets/ {
        alias /data/web/nuxt-template/202504114/.output/public/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        gzip_static on;
    }
}
```

在server中添加以上的配置。

+ 设置反向代理
+ 处理静态资源映射



## 查看项目
项目在线展示地址：[https://www.shenshuai.site/nuxtapp202504114/](https://www.shenshuai.site/nuxtapp202504114/)

项目代码仓库：[https://github.com/shenshuai89/bootstrap-to-nuxt.git](https://github.com/shenshuai89/bootstrap-to-nuxt.git)








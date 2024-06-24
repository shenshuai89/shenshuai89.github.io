---
title: 04-创建layouts布局和pages页面
date: 2024-06-24 17:27:15
permalink: /pages/11c314/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
原文链接：[https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages](https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages)
到目前为止，您的应用程序只有一个主页。让我们学习如何使用**布局**和**页面**创建更多路由。
## 本章目标

- 使用文件系统路由创建 `dashboard`路由。
- 了解创建新路由时文件夹和文件的作用。
- 创建可在多个`dashboard`页面之间共享的嵌套布局。
- 了解主机代管、部分渲染和根布局是什么。
## 嵌套路由
Next.js使用文件系统路由，其中文件夹用于创建嵌套路由。每个文件夹代表一个映射到URL段的路由段。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/737887/1719130511039-5ef43670-31c6-4d13-97b0-30a75d072397.png#averageHue=%23f7f7f7&clientId=ua8647eea-bfe6-4&from=paste&height=594&id=u8ebdb282&originHeight=1188&originWidth=3200&originalType=binary&ratio=2&rotation=0&showTitle=false&size=513143&status=done&style=shadow&taskId=uedfc1645-43d3-4815-ac62-7c93a20ea96&title=&width=1600)
您可以使用layout.tsx和page.tsx文件为每条路线创建单独的UI。
page.tsx是一个特殊的Next.js文件，用于导出React组件，它是访问路由所必需的。
在您的应用程序中，您已经有一个页面文件：`/app/page.tsx `这是与根路由`/`关联的主页。
要创建嵌套路由，可以将文件夹嵌套在一起，并在其中添加page.tsx文件。例如
![image.png](https://cdn.nlark.com/yuque/0/2024/png/737887/1719130603242-17fb7679-fa2e-4f17-be78-b3f101338007.png#averageHue=%23f6f6f6&clientId=ua8647eea-bfe6-4&from=paste&height=444&id=udb4cdf54&originHeight=888&originWidth=3200&originalType=binary&ratio=2&rotation=0&showTitle=false&size=354236&status=done&style=shadow&taskId=u09be9920-83a4-404f-8e0d-bfce3390ebc&title=&width=1600)
`/app/dashboard/page.tsx`与/dashboard路径相关联。让我们创建页面，看看它是如何工作的！
## 创建dashboard页面
在/app内创建一个名为`dashboard`的新文件夹。然后，在`dashboard`文件夹中创建一个新的page.tsx文件，其中包含以下内容：
```tsx
export default function Page() {
  return <p>Dashboard Page</p>;
}
```
现在，确保开发服务器正在运行并访问[http://localhost:3000/dashboard](http://localhost:3000/dashboard).您应该看到“Dashboard Page”文本。
这就是在Next.js中创建不同页面的方法：使用文件夹创建一个新的路由，并在其中添加一个页面文件。
通过为页面文件指定一个特殊名称，Next.js允许您对UI组件进行并置，test文件和其他与路由相关的代码。
只有页面文件中的内容才能公开访问。例如，/ui和/lib文件夹与路由一起位于/app文件夹中。
### 练习：创建仪表板页面
让我们练习创建更多路由。在您的面板中，再创建两个页面：

- Customers Page：该页面应可在上访问http://localhost:3000/dashboard/customers.目前，它应该返回一个`<p>Customers Page</p>`元素。
- Invoices Page：发票页面应可访问http://localhost:3000/dashboard/invoices.现在，还返回`<p>Invoices Page</p>`元素。

花点时间处理此练习，准备好后，展开下面的切换以获取解决方案：
您应该具有以下文件夹结构：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/737887/1719131797985-95edfa10-1a54-4c41-ba49-8f6b06d31d5b.png#averageHue=%23f6f6f6&clientId=ua8647eea-bfe6-4&from=paste&height=849&id=u8b18f066&originHeight=1698&originWidth=3200&originalType=binary&ratio=2&rotation=0&showTitle=false&size=652103&status=done&style=shadow&taskId=u94be7947-1182-4246-ac33-f53757afd82&title=&width=1600)
Customers Page:
```tsx
export default function Page() {
  return <p>Customers Page</p>;
}
```
Invoices Page:
```tsx
export default function Page() {
  return <p>Invoices Page</p>;
}
```
## 创建dashboard layout页面
`dashboard`具有某种可在多个页面之间共享的导航功能。在Next.js中，您可以使用一个特殊的layout.tsx文件来创建在多个页面之间共享的UI。让我们为`dashboard`页面创建一个`layout`布局！
在`/dashboard`文件夹中，添加一个名为layout.tsx的新文件，并粘贴以下代码：
```tsx
import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```
这段代码中发生了一些事情，所以让我们对其进行分解：
首先，将`＜SideNav/＞`组件导入到布局中。导入到此文件中，任何组件都将成为布局的一部分。
＜Layout/＞组件接收一个`children` props。此子项可以是页面，也可以是其他布局。在您的情况下，`/dashboard`内的页面将自动嵌套在`＜Layout/＞`中，如下所示：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/737887/1719132879690-8a831bb3-3aeb-4f2a-93d2-12eb71904c35.png#averageHue=%23f7f7f7&clientId=u3fe17a66-993f-4&from=paste&height=687&id=u60a3bfa3&originHeight=1374&originWidth=3200&originalType=binary&ratio=2&rotation=0&showTitle=false&size=512262&status=done&style=shadow&taskId=u2a9f5e1b-1ad4-4993-8479-e446f48feac&title=&width=1600)
通过保存您的更改并检查您的`localhost`来检查一切是否正常工作。您应该看到以下内容：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/737887/1719132921366-32db6600-49f0-4d2b-8e1f-9ba67f952938.png#averageHue=%23eaeaea&clientId=u3fe17a66-993f-4&from=paste&height=584&id=u2635f4b7&originHeight=1168&originWidth=1920&originalType=binary&ratio=2&rotation=0&showTitle=false&size=265771&status=done&style=shadow&taskId=u3c348670-0943-4a35-8bdf-57cdc39c524&title=&width=960)
在Next.js中使用布局的一个好处是，在导航方面，只有页面组件会更新，而布局不会重新渲染。这称为[部分渲染](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#3-partial-rendering)：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/737887/1719132997774-56bbda5b-f80b-4ebe-a1ef-c21107f95f43.png#averageHue=%23f3f3f3&clientId=u3fe17a66-993f-4&from=paste&height=1000&id=ua0f52377&originHeight=2000&originWidth=3200&originalType=binary&ratio=2&rotation=0&showTitle=false&size=833514&status=done&style=shadow&taskId=ua5865fb7-f98a-415e-bf06-90e936ccd8a&title=&width=1600)
## 根layout
在第3章中，您将Inter字体导入到另一个布局中：`/app/layout.tsx`。作为提醒：
```tsx
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```
这被称为根布局，是必需的。
任何UI组件添加到根布局后，都将在应用程序的所有页面中共享。
您可以使用根布局来修改<html>和<body>标记，并添加元数据（您将在[后面的章节](https://nextjs.org/learn/dashboard-app/adding-metadata)中了解有关 meta 元数据的更多信息）。
由于您刚刚创建的新布局（/app/dashboard/layout.tsx）对于仪表板页面是唯一的，因此您不需要向上面的根布局添加任何UI。


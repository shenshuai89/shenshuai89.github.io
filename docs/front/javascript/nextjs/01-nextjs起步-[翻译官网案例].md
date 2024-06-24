---
title: 01-nextjs起步-[翻译官网案例]
date: 2024-06-24 17:26:31
permalink: /pages/d9c63b/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

案例原文：[https://nextjs.org/learn/dashboard-app/getting-started](https://nextjs.org/learn/dashboard-app/getting-started)

## 创建新项目
要创建Next.js应用程序，请打开您的终端；切换到要保存项目的文件夹中，然后运行以下命令
```bash
npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```
下载该模板代码，为课程提供了很多必备的操作。
此命令使用create-next应用程序，这是一个命令行界面（CLI）工具，用于为您设置next.js应用程序。
在上面的命令中，您还将--example标志与本课程的起始示例一起使用。
## 探索项目
与从头开始编写代码的教程不同，本课程的大部分代码都是为您编写的；这更好地反映了真实世界的开发，您可能会在其中使用现有的代码库。
我们的目标是帮助您集中精力学习Next.js的主要功能，而不必编写所有的应用程序代码。
安装后，在代码编辑器中打开项目，并导航到 nextjs-dashboard。
```bash
cd nextjs-dashboard
```
让我们花点时间探讨一下这个项目。
## 目录文件夹结构
您会注意到该项目具有以下文件夹结构：
![image.png](/assets/images/nextjs/01-1image.png)

- `/app`：包含应用程序的所有路由、组件和逻辑，这是您主要工作的地方。
- `/app/lib`：包含应用程序中使用的函数，例如可重复使用的实用程序函数和数据提取函数。
- `/app/ui`：包含应用程序的所有UI组件，如卡片、表格和表单。为了节省时间，我们为您预先设计了这些组件的样式。
- `/public`：含应用程序的所有静态资源，如图像。
- `/scripts`：包含一个初始化数据库脚本，您将在后面的章节中使用该脚本填充数据库。
- Config 目录：您还会注意到配置文件，如 `next.config.js` 位于应用程序的根目录。这些文件中的大多数都是在您使用`create-next-app`启动新项目时创建和预配置的。您不需要在本课程中修改它们。
## 预置的数据
当您构建用户界面时，拥有一些默认数据会有所帮助。如果数据库或API还不可用时，您可以模拟数据：

- 使用JSON格式的预置数据或作为JavaScript对象
- 使用第三方服务，如 [mockAPI](https://mockapi.io/).

对于这个项目，我们在中提供了一些预置数据 `app/lib/placeholder-data.js`。文件中的每个JavaScript对象表示数据库中的一个表。例如，对于发票表：
```javascript
const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  // ...
];
```
在关于设置数据库的一章中，您将使用这些数据为数据库初始化数据（用一些初始数据填充它）。
## TypeScript
您可能还注意到，大多数文件都有.ts或.tsx后缀。这是因为该项目是用TypeScript编写的。
如果您不了解TypeScript，也可以-我们将在需要时提供TypeScript代码片段。
现在，看看这个文件`/app/lib/definitions.ts `，在这里，我们手动定义将从数据库返回的类型。例如，发票表具有以下类型：
```javascript
export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};
```
通过使用TypeScript，您可以确保不会意外地将错误的数据格式传递到组件或数据库，比如将 `string`而不是 `number`传递到发票 `amount`。
> 如果您是TypeScript开发人员：
> - 我们手动声明数据类型，但为了更好的类型安全性，我们建议使用Prisma，它会根据您的数据库架构自动生成类型。
> - Next.js检测您的项目是否使用TypeScript，并自动安装必要的包和配置。Next.js还为您的代码编辑器提供了TypeScript插件，以帮助实现自动完成和类型安全。

## 运行开发服务器
运行`pnpm i`以安装项目的包。
```javascript
pnpm i
```
接下来是`pnpm dev`来启动开发服务器。
```javascript
pnpm dev
```
`pnpm dev`在端口3000上启动Next.js开发服务器。您可以选择使用npm或首选的包管理器，而不是pnpm。
让我们检查一下它是否有效。打开`http://localhost:3000`在您的浏览器上。您的主页应该如下所示：
![image.png](/assets/images/nextjs/01-2image.png)

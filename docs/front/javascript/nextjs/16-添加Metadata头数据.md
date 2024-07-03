---
title: 16-添加Metadata头数据
date: 2024-06-24 17:47:45
permalink: /pages/c16184/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

原文链接：[https://nextjs.org/learn/dashboard-app/adding-metadata](https://nextjs.org/learn/dashboard-app/adding-metadata
添加 Metadata 数据，有利于SEO。
在本章中，我们将讨论如何将元数据添加到Next.js应用程序中。
## 本章目标

- 什么是metadata
- metadata的类型
- 如何使用 metadata 添加Open Graph图像。
- 怎么使用metadata添加网站访问图标

## 什么是metadata
在web开发中，元数据提供了有关网页的其他详细信息。元数据对访问该页面的用户不可见。相反，它在幕后工作，嵌入页面的HTML中，通常在`＜head＞`元素中。这些隐藏信息对于搜索引擎和其他需要更好地了解网页内容的系统至关重要。

## 为什么Metadata非常重要
metadata 在增强网页SEO方面发挥着重要作用。使得搜索引擎和社交媒体平台更容易访问和理解它。适当的元数据有助于搜索引擎有效地索引网页，提高其在搜索结果中的排名。此外，像Open Graph这样的元数据改善了共享链接在社交媒体上的外观，使内容对用户更具吸引力和信息量。

## metadata的类型
有各种类型的元数据，每种元数据都有其独特的用途。一些常见类型包括：

- **Title Metadata:** 负责浏览器选项卡上显示的网页标题。这对SEO至关重要，因为它可以帮助搜索引擎了解网页的内容。
```tsx
<title>Page Title</title>
```

- **Description Metadata:** 该元数据提供了网页内容的简要概述，并且经常显示在搜索引擎结果中。
```tsx
<meta name="description" content="A brief description of the page content." />
```

- **Keyword Metadata:** 此元数据包括与网页内容相关的关键字，有助于搜索引擎对页面进行索引。
```tsx
<meta name="keywords" content="keyword1, keyword2, keyword3" />
```

- **Open Graph Metadata:** 这种元数据增强了在社交媒体平台上共享网页时的表现方式，提供了标题、描述和预览图像等信息。
```tsx
<meta property="og:title" content="Title Here" />
<meta property="og:description" content="Description Here" />
<meta property="og:image" content="image_url_here" />
```

- **Favicon Metadata:** 该元数据将收藏夹图标（小图标）链接到浏览器地址栏或选项卡中显示的网页。
```tsx
<link rel="icon" href="path/to/favicon.ico" />
```
## 添加Metadata元数据
Next.js有一个元数据API，可用于定义应用程序元数据。有两种方法可以将元数据添加到应用程序中：

- **Config-based:** 在layout.js或page.js文件中导出静态元数据对象或动态`generateMetadata`函数。
- **File-based:** Next.js有一系列专门用于元数据目的的特殊文件：
   - favicon.ico, apple-icon.jpg, and icon.jpg: 用于收藏夹和图标
   - opengraph-image.jpg和twitter-image.jpg：应用于社交媒体图片
   - robots.txt: 提供搜索引擎爬网的说明
   - sitemap.xml：提供有关网站结构的信息

您可以灵活地将这些文件用于静态元数据，也可以在项目中以编程方式生成它们。
有了这两个选项，Next.js将自动为您的页面生成相关的`＜head＞`元素。

## Favicon和Open Graph图像
在你的/public文件夹中，你会注意到你有两张图片：favicon.ico和opengraph-image.jpg。
将这些图像移动到你的/app文件夹的根目录中。
完成此操作后，Next.js将自动识别并使用这些文件作为您的收藏夹和OG图像。您可以通过在开发工具中检查应用程序的`＜head＞`元素来验证这一点。
> 您也可以使用`[ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response)`构造函数创建动态OG图像。

## 页面标题和说明
您还可以包括任何layout.js或page.js文件中的元数据对象，以添加其他页面信息，如标题和描述。layout.js中的任何元数据都将被所有使用它的页面继承。
在根布局中，创建一个具有以下字段的新元数据对象：

```tsx
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
 
export default function RootLayout() {
  // ...
}
```
Next.js会自动将标题和元数据添加到您的应用程序中。
但是，如果您想为特定页面添加自定义标题，该怎么办？您可以通过向页面本身添加元数据对象来实现这一点。嵌套页中的元数据将覆盖父级中的元数据。
例如，在`/dashboard/invoices`页面中，您可以更新页面标题：
```tsx
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};
```
这是有效的，但我们在每一页中都重复应用程序的标题。如果有什么变化，比如公司名称，你必须在每一页上更新它。
相反，您可以使用元数据对象中的`title.template`字段来定义页面标题的模板。此模板可以包括页面标题以及您想要包括的任何其他信息。
在根布局中，更新元数据对象以包含一个模板：
```tsx
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
```
模板中的`%s`将替换为特定的页面标题。
现在，在您的`/dashboard/invoices`页面中，您可以添加页面标题：
```tsx
export const metadata: Metadata = {
  title: 'Invoices',
};
```
导航到`/dashboard/invoices`页面，并选中`<head>`元素。您应该看到页面标题现在是
Invoices | Acme Dashboard。
## 练习添加metadata
既然您已经了解了元数据，请通过向其他页面添加标题进行练习：

1. `/login` page.
2. `/dashboard/` page.
3. `/dashboard/customers` page.
4. `/dashboard/invoices/create` page.
5. `/dashboard/invoices/[id]/edit` page.

Next.js元数据API功能强大且灵活，使您能够完全控制应用程序的元数据。在这里，我们已经向您展示了如何添加一些基本元数据，但您可以添加多个字段，包括关键字、机器人、规范等。请随意[浏览文档](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)，并将您想要的任何其他元数据添加到应用程序中。


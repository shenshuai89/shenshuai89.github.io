---
title: 09-Streaming数据模式
date: 2024-06-24 17:46:31
permalink: /pages/3d75e0/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
原文链接：[https://nextjs.org/learn/dashboard-app/streaming](https://nextjs.org/learn/dashboard-app/streaming)

在上一章中，您了解了Next.js的不同渲染方法。我们还讨论了缓慢的数据提取会如何影响应用程序的性能。让我们看看在数据请求缓慢的情况下如何改善用户体验。

## 本章目标

- 什么是streaming以及何时可以使用它。
- 如何使用loading.tsx和Suspense实现streaming传输。
- 加载骨架是什么。
- 路由组是什么，以及何时可以使用它们。
- 在应用程序中放置 Suspense 边界的位置。

## 什么是streaming
streaming 是将页面的 HTML 拆分成多个 chunks，然后逐步将这些块从服务端发送到客户端。
![image.png](/assets/images/nextjs/09-1image.png)
Streaming 可以有效的阻止耗时长的数据请求阻塞整个页面加载的情况。这允许用户查看页面的各个部分并与之交互，而无需等待加载所有数据后才能向用户显示任何UI。还可以减少加载[第一个字节所需时间（TTFB）](https://link.juejin.cn/?target=https%3A%2F%2Fweb.dev%2Farticles%2Fttfb%3Fhl%3Dzh-cn)和[首次内容绘制（FCP）](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Flighthouse%2Fperformance%2Ffirst-contentful-paint%2F)，有助于缩短[可交互时间（TTI）](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fen%2Fdocs%2Flighthouse%2Fperformance%2Finteractive%2F)，尤其在速度慢的设备上。
![image.png](/assets/images/nextjs/09-2image.png)
Streaming 与React的组件模型配合良好。因为每个组件都可以被视为块。
在Next.js中有两种实现 Streaming 的方法：
## Streaming加载页面时，使用loading组件
在/app/dashboard文件夹中，创建一个名为loading.tsx的新文件：
```tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```
刷新[http://localhost:3000/dashboard](http://localhost:3000/dashboard)，现在您应该看到：
![image.png](/assets/images/nextjs/09-3image.png)
正在发生一些事情：

- loading.tsx是一个特殊的Next.js文件，构建在Suspense之上。它允许您创建预备的UI，以便在加载页面内容时作为替换显示。
- 由于`＜SideNav＞`是静态的，因此会立即显示。在加载动态内容时，用户可以与`＜SideNav＞`交互。
- 用户不必等待页面加载完成后再导航离开（这也被称为中断式导航）

恭喜你，已经实现了streaming功能。但我们可以做更多的工作来改善用户体验。让我们显示一个加载骨架，而不是仅仅显示“loading…”文本。
## 添加加载骨架屏
加载骨架是UI的简化版本，许多网站将其用作占位符，当正在加载内容以向用户展示。您在loading.tsx中添加的任何UI都将作为静态文件的一部分嵌入，并先发送。然后，其余的动态内容将从服务器流式传输到客户端。给用户以缓冲的用户体验。
在loading.tsx文件中，导入一个名为`<DashboardSkeleton>`的新组件

```tsx
import DashboardSkeleton from '@/app/ui/skeletons';
 
export default function Loading() {
  return <DashboardSkeleton />;
}
```
然后，刷新[http://localhost:3000/dashboard](http://localhost:3000/dashboard)，现在您应该看到：
![image.png](/assets/images/nextjs/09-4image.png)

### 使用路由组修复加载骨架屏的错误
现在，您的加载框架也将应用于invoices和 customers 页面。
由于loading.tsx的级别高于文件系统中的`/invoices/page.tsx`和`/customers/page.tsx`，因此它也适用于这些页面。
我们可以通过[路由组](https://nextjs.org/docs/app/building-your-application/routing/route-groups)【就是通过(overview)文件夹进行包裹】来更改此设置。在仪表板文件夹中创建一个名为`/(overview)`的新文件夹。然后，将loading.tsx和page.tsx文件移动到文件夹中：
![image.png](/assets/images/nextjs/09-5image.png)
现在，loading.tsx文件将仅应用于您的仪表板概述页面。
路由组允许您在不影响URL路径结构的情况下将文件组织到逻辑组中。使用圆括号创建新文件夹时，该名称不会包含在URL路径中。因此，`/dashboard/(overview)/page.tsx`变成了`/dashboard`。
在这里，您使用一个路由组来确保`loading.tsx`仅适用于您的仪表板概述页面。但是，您也可以使用路线组将您的应用程序划分为多个部分（例如（marketing routes和（shop routes），或者按团队划分更大的应用程序。
## Streaming 组件
到目前为止，您正在流式传输整个页面。同时您也可以使用React Suspense来制作更细粒度和 streaming 特定的组件。
Suspense允许您推迟呈现应用程序的部分，直到满足某些条件为止（比如：数据已加载）。您可以将动态组件包装在Suspense中。然后，向它传递一个`fallback`组件，以便在加载动态组件时显示。
如果您还记得慢速数据请求，`fetchRevenue()`，这是使整个页面变慢的请求。您可以使用Suspense仅流式传输此组件，并立即显示页面的其余UI，而不是阻塞整个页面。
要做到这一点，您需要将数据提取移动到组件，让我们更新代码，看看它会是什么样子：
从`/dashboard/（overview）/page.tsx`中删除`fetchRevenue（）`的所有实例及其数据：
```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data'; // remove fetchRevenue
 
export default async function Page() {
  const revenue = await fetchRevenue() // delete this line
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    // ...
  );
}
```
然后，从React导入`<Suspense>`，并将其包裹在`<RevenueChart/>`周围，您可以向其传递一个名为`<RevenueChartSkeleton>`的回退组件。
调整第6-7行和第34-36行
```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
 
export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
```
最后，更新`<RevenueChart>`组件以获取其自己的数据，并移除传递给它的props：
修改第4、8、9行
```tsx
import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';
 
// ...
 
export default async function RevenueChart() { // Make component async, remove the props
  const revenue = await fetchRevenue(); // Fetch data inside the component
 
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);
 
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
 
  return (
    // ...
  );
}
 
```
现在刷新页面，您应该几乎立即看到面板信息，同时显示`<RevenueChart>`的回退骨架：
![image.png](/assets/images/nextjs/09-6image.png)
### 练习使用Suspense调整LatestInvoices组件
现在轮到你了！通过流式传输`<LatestInvoices>`组件来练习您刚刚学到的内容。
将`fetchLatestInvoices（）`从页面向下移动到`<LatestInvoicies>`组件。使用名为`<LatestInvoicesSkeleton>`的回退将组件包裹在`<Suspense>`边界中。
准备好后，查看解决方案代码：
**Dashboard Page:**
```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data'; // Remove fetchLatestInvoices
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from '@/app/ui/skeletons';
 
export default async function Page() {
  // Remove `const latestInvoices = await fetchLatestInvoices()`
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
```
`<LatestInvoices>` 组件. 记住要移除props!:
```tsx
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
 
export default async function LatestInvoices() { // Remove props
  const latestInvoices = await fetchLatestInvoices();
 
  return (
    // ...
  );
}
```
## 对组件进行分组
太棒了您差不多完成了，现在您需要将`＜Card＞`组件包装在Suspense中。你可以为每一张卡获取数据，但这可能会导致卡加载时的弹出效果，这可能会在视觉上给用户带来不友好。
那么，你将如何解决这个问题呢？
要创建更多的交错效果，可以使用包装器组件对卡片进行分组。这意味着静态`＜SideNav/＞`将首先显示，然后显示卡片等。
在您的page.tsx文件中：

1. 删除 `<Card>` 组件.
2. 删除`fetchCardData()`函数
3. 导入一个新的 wrapper component 名字叫`<CardWrapper />`.
4. 导入一个新的 **skeleton** component 名字叫 `<CardsSkeleton />`.
5. 使用Suspense包裹`<CardWrapper />`
```tsx
import CardWrapper from '@/app/ui/dashboard/cards';
// ...
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
 
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      // ...
    </main>
  );
}
```
然后进入文件/app/ui/dashboard/cards.tsx，导入fetchCardData()函数。并在`＜CardWrapper/＞`组件中调用它。请确保取消注释此组件中任何必要的代码。
```tsx
// ...
import { fetchCardData } from '@/app/lib/data';
 
// ...
 
export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}
```
> 刷新页面，您应该会看到所有的卡同时加载。当您希望同时加载多个组件时，可以使用此模式。

## 如何划分Suspense的使用
你将Suspense的界限放在哪里取决于以下几点：

- 您希望用户在页面流式传输时体验页面的方式。
- 您要优先考虑哪些内容。
- 如果组件依赖于数据提取。

看看你的仪表板页面，有什么不同的做法吗？
别担心。并没有一个完全精确的答案。

- 你可以像我们一样流式传输整个页面使用loading.tsx；但是如果其中一个组件具有缓慢的数据获取，则这可能导致更长的加载时间。
- 您可以单独流式传输每个组件，但这可能导致UI在准备就绪时弹出屏幕。
- 您还可以通过流式传输页面部分来创建交错效果。但是您需要创建包装器组件。
- 在你的应用中如何放置Suspense，一般来说，最好将数据提取向下移动到需要它的组件，然后将这些组件封装在Suspendse中。但是，如果您的应用程序需要流式传输部分或整个页面，那么这并没有错。

不要害怕试用Suspense，看看什么效果最好，它是一个强大的API，可以帮助您创建更愉快的用户体验。


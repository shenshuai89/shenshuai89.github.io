(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{341:function(s,t,a){"use strict";a.r(t);var n=a(7),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[s._v("原文链接："),t("a",{attrs:{href:"https://nextjs.org/learn/dashboard-app/css-styling",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://nextjs.org/learn/dashboard-app/css-styling"),t("OutboundLink")],1)]),s._v(" "),t("p",[s._v("目前，您的主页没有任何样式。让我们来看看您可以用哪些不同的方式来设计Next.js应用程序的样式。")]),s._v(" "),t("h2",{attrs:{id:"本课目标"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#本课目标"}},[s._v("#")]),s._v(" 本课目标")]),s._v(" "),t("ul",[t("li",[s._v("如何将全局CSS文件添加到您的应用程序中。")]),s._v(" "),t("li",[s._v("两种不同的设置style方式："),t("code",[s._v("Tailwind")]),s._v("和 "),t("code",[s._v("CSS module")]),s._v("。")]),s._v(" "),t("li",[s._v("如何使用"),t("code",[s._v("clsx")]),s._v("工具程序包有条件地添加类名。")])]),s._v(" "),t("h2",{attrs:{id:"全局样式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#全局样式"}},[s._v("#")]),s._v(" 全局样式")]),s._v(" "),t("p",[s._v("如果您查看"),t("code",[s._v("/app/ui")]),s._v("文件夹内部，您将看到一个名为"),t("code",[s._v("global.css")]),s._v("的文件。您可以使用此文件将CSS规则添加到应用程序中的所有路由中，例如CSS重置规则、链接等HTML元素的站点范围样式等等。\n您可以在应用程序的任何组件中导入"),t("code",[s._v("global.css")]),s._v("，但通常将其添加到顶级组件中是一种很好的做法。\n在"),t("code",[s._v("Next.js")]),s._v("项目中，这个顶级组件是 "),t("a",{attrs:{href:"https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required",target:"_blank",rel:"noopener noreferrer"}},[s._v("root layout"),t("OutboundLink")],1),s._v(" （稍后会详细介绍）\n通过导航到"),t("code",[s._v("/app/layout.tsx")]),s._v("并导入"),t("code",[s._v("global.css")]),s._v("文件，将全局样式添加到应用程序中：")]),s._v(" "),t("div",{staticClass:"language-tsx line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-tsx"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@/app/ui/global.css'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("RootLayout")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  children"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  children"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" React"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ReactNode"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("html")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("lang")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("en"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),t("span",{pre:!0,attrs:{class:"token plain-text"}},[s._v("\n      ")]),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("body")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("children"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("body")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),t("span",{pre:!0,attrs:{class:"token plain-text"}},[s._v("\n    ")]),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("html")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br")])]),t("p",[s._v("在开发服务器仍在运行的情况下，保存您的更改并在浏览器中预览它们。您的主页现在应该是这样的：\n"),t("img",{attrs:{src:"/assets/images/nextjs/02-1image.png",alt:"image.png"}}),s._v("\n但是等一下，你没有添加任何CSS规则，这些样式是从哪里来的？\n如果你看看"),t("code",[s._v("global.css")]),s._v("内部，你会注意到一些"),t("code",[s._v("@tailwind")]),s._v("指令：")]),s._v(" "),t("div",{staticClass:"language-css line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@tailwind")]),s._v(" base"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@tailwind")]),s._v(" components"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token atrule"}},[t("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@tailwind")]),s._v(" utilities"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h2",{attrs:{id:"tailwind"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tailwind"}},[s._v("#")]),s._v(" Tailwind")]),s._v(" "),t("p",[s._v("Tailwind是一个CSS框架，它允许您直接在TSX标记中快速编写实用程序类，从而加快了开发过程。\n在Tailwind中，可以通过添加类名来设置元素的样式。例如，添加类“"),t("code",[s._v("text-blue-500")]),s._v("”将使"),t("code",[s._v("<h1>")]),s._v("文本变为蓝色：\n"),t("code",[s._v('<h1 className="text-blue-500"> I\'m blue! </h1>')])]),s._v(" "),t("p",[s._v("尽管CSS样式是全局共享的，但每个类都单独应用于每个元素。这意味着，如果添加或删除一个元素，就不必担心维护单独的样式表，样式冲突，或者CSS 包的大小随着应用程序的扩展而增长。\n当您使用"),t("code",[s._v("create-next-app")]),s._v("应用程序启动新项目时，Next.js会询问您是否要使用Tailwind。如果您选择"),t("code",[s._v("yes")]),s._v("，Next.js将自动安装必要的软件包，并在您的应用程序中配置Tailwind。\n如果您查看"),t("code",[s._v("/app/page.tsx")]),s._v("，您会发现我们在示例中使用的是Tailwind类。")]),s._v(" "),t("div",{staticClass:"language-tsx line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-tsx"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" AcmeLogo "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@/app/ui/acme-logo'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" ArrowRightIcon "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@heroicons/react/24/outline'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" Link "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'next/link'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Page")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// These are Tailwind classes:")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("main")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("className")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("flex min-h-screen flex-col p-6"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),t("span",{pre:!0,attrs:{class:"token plain-text"}},[s._v("\n      ")]),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("className")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),t("span",{pre:!0,attrs:{class:"token plain-text"}},[s._v("\n        // ...\n )\n}\n")])])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("p",[s._v("如果这是您第一次使用Tailwind，请不要担心。为了节省时间，我们已经为您将要使用的所有组件设置了样式。\n让我们玩"),t("code",[s._v("Tailwind")]),s._v("吧！复制下面的代码并将其粘贴到/app/page.tsx中的＜p＞元素上方：")]),s._v(" "),t("div",{staticClass:"language-tsx line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-tsx"}},[t("code",[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("className")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("使用上面的代码片段时，您看到的是什么形状？"),t("code",[s._v("一个黑色三角形")]),s._v("\n如果您更喜欢编写传统的CSS规则，或者将样式与JSX分开，那么CSS模块是一个很好的选择。")]),s._v(" "),t("h2",{attrs:{id:"css模块"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#css模块"}},[s._v("#")]),s._v(" CSS模块")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://nextjs.org/docs/pages/building-your-application/styling",target:"_blank",rel:"noopener noreferrer"}},[s._v("CSS模块"),t("OutboundLink")],1),s._v("允许您通过自动创建唯一的类名来将CSS扩展到一个组件，因此您也不必担心样式冲突。\n我们将在本课程中继续使用 Tailwind，但让我们花点时间看看如何使用 CSS 模块从上面的测验中获得相同的结果。\n在里面/app/ui，创建一个名为的新文件home.module.css并添加以下 CSS 规则：")]),s._v(" "),t("div",{staticClass:"language-css line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".shape")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("height")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("width")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("border-bottom")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 30px solid black"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("border-left")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 20px solid transparent"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("border-right")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 20px solid transparent"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("p",[s._v("然后，在您的/app/page.tsx文件中导入样式并"),t("code",[s._v("<div>")]),s._v("用以下代码替换您添加的Tailwind 类名styles.shape：")]),s._v(" "),t("div",{staticClass:"language-tsx line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-tsx"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" AcmeLogo "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@/app/ui/acme-logo'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" ArrowRightIcon "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@heroicons/react/24/outline'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" Link "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'next/link'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" styles "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@/app/ui/home.module.css'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//+++++")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Page")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("main")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("className")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("flex min-h-screen flex-col p-6"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),t("span",{pre:!0,attrs:{class:"token plain-text"}},[s._v("\n      ")]),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("className")]),t("span",{pre:!0,attrs:{class:"token script language-javascript"}},[t("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("styles"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("shape"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),t("span",{pre:!0,attrs:{class:"token plain-text"}},[s._v("\n    // ...\n  )\n}\n")])])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("p",[s._v("保存更改并在浏览器中预览。您应该看到与之前相同的形状。\nTailwind 和 CSS 模块是设计 Next.js 应用程序样式的两种最常用方法。使用其中一种取决于个人喜好 - 您甚至可以在同一个应用程序中同时使用这两种方法！")]),s._v(" "),t("h2",{attrs:{id:"使用clsx库切换类名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用clsx库切换类名"}},[s._v("#")]),s._v(" 使用clsx库切换类名")]),s._v(" "),t("p",[s._v("在某些情况下，您可能需要根据状态或其他条件有条件地设置元素的样式。\n"),t("a",{attrs:{href:"https://www.npmjs.com/package/clsx",target:"_blank",rel:"noopener noreferrer"}},[s._v("clsx"),t("OutboundLink")],1),s._v("是一个可以让你轻松切换类名的库。我们建议查看"),t("a",{attrs:{href:"https://github.com/lukeed/clsx",target:"_blank",rel:"noopener noreferrer"}},[s._v("文档"),t("OutboundLink")],1),s._v("了解更多详细信息，但以下是基本用法：")]),s._v(" "),t("ul",[t("li",[s._v("假设您要创建一个InvoiceStatus接受 的组件status。状态可以是'pending'或'paid'。")]),s._v(" "),t("li",[s._v("如果是'paid'，则您希望颜色为绿色。如果是'pending'，则您希望颜色为灰色。")])]),s._v(" "),t("p",[s._v("您可以clsx有条件地应用这些类，如下所示：第9和第10行")]),s._v(" "),t("div",{staticClass:"language-tsx line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-tsx"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" clsx "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'clsx'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n \n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("InvoiceStatus")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" status "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" status"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("span")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("className")]),t("span",{pre:!0,attrs:{class:"token script language-javascript"}},[t("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("clsx")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'inline-flex items-center rounded-full px-2 py-1 text-sm'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v("'bg-gray-100 text-gray-500'")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" status "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'pending'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v("'bg-green-500 text-white'")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" status "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'paid'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")])]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),t("span",{pre:!0,attrs:{class:"token plain-text"}},[s._v("\n    // ...\n)}\n")])])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br")])]),t("h2",{attrs:{id:"其他style解决方案"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#其他style解决方案"}},[s._v("#")]),s._v(" 其他style解决方案")]),s._v(" "),t("p",[s._v("除了我们讨论过的方法之外，您还可以使用以下方法设置 Next.js 应用程序的样式：")]),s._v(" "),t("ul",[t("li",[s._v("Sass 允许您导入.css和.scss文件。")]),s._v(" "),t("li",[s._v("CSS-in-JS 库，例如"),t("a",{attrs:{href:"https://github.com/vercel/styled-jsx",target:"_blank",rel:"noopener noreferrer"}},[s._v("styled-jsx"),t("OutboundLink")],1),s._v("、"),t("a",{attrs:{href:"https://github.com/vercel/next.js/tree/canary/examples/with-styled-components",target:"_blank",rel:"noopener noreferrer"}},[s._v("样式组件"),t("OutboundLink")],1),s._v("和"),t("a",{attrs:{href:"https://github.com/vercel/next.js/tree/canary/examples/with-emotion",target:"_blank",rel:"noopener noreferrer"}},[s._v("情感"),t("OutboundLink")],1),s._v("。")])]),s._v(" "),t("p",[s._v("查看"),t("a",{attrs:{href:"https://nextjs.org/docs/app/building-your-application/styling",target:"_blank",rel:"noopener noreferrer"}},[s._v("CSS 文档"),t("OutboundLink")],1),s._v("以获取更多信息。")])])}),[],!1,null,null,null);t.default=e.exports}}]);
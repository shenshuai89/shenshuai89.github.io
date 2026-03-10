---
title: 044-Vue3+NestJS全栈开发企业级管理后台
date: 2026-03-10 17:05:03
permalink: /pages/26b092/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
## 044-Vue3+NestJS全栈开发企业级管理后台

## 资料下载
[下载地址](https://pan.baidu.com/s/1uY9x1GgeUSa5ln83Zob5hA) 

提取码：http://dt1.8tupian.net/2/29369a363b200.pg1

## 一、课程概览

《Vue3 + NestJS 全栈开发企业级管理后台》是由慕课网明星讲师 Sam 老师主讲的一门中级实战课程，旨在帮助前端开发者掌握全栈开发能力，突破职业边界。课程以构建一个名为“小慕读书管理后台”的真实项目为主线，全面覆盖从需求分析、技术选型、前后端架构搭建，到权限系统、微前端改造等企业级功能的完整开发流程。

- **课程时长**：共 23 小时  
- **适合人群**：具备 HTML/CSS/JS 基础，了解 Vue3 和 TypeScript 的前端开发者  
- **技术栈**：
  - 前端：Vue3 + Vite4 + TypeScript + WindiCSS + vue-vben-admin + wujie（无界微前端）
  - 后端：NestJS + TypeORM + MySQL8 + JWT + Nginx
- **核心亮点**：
  - 实战驱动，全流程闭环开发
  - 深入 RBAC 权限模型（用户-角色-菜单-权限四维联动）
  - 集成高 Star 提效框架（如 vue-vben-admin、WindiCSS）
  - 引入微前端架构（qiankun 与 wujie 对比实践）

---

## 二、课程内容结构

课程共分为 **23 章**，逻辑清晰，层层递进：

### 第1–2章：项目启动与架构设计
- 明确管理后台的核心需求（电子书管理、用户权限控制等）
- 设计前后端分离架构，确定技术选型

### 第3–5章：前后端基础框架搭建
- 前端基于 `vue-vben-admin` 快速初始化项目（集成 Vue3 + Vite + Ant Design Vue）
- 后端使用 NestJS 构建 RESTful API，连接 MySQL8 数据库，实现 CRUD 操作

### 第6–7章：登录认证系统
- 前端路由守卫 + 登录表单校验
- 后端基于 JWT 实现 Token 生成与验证
- 自定义请求守卫（Guard）实现白名单与鉴权拦截

### 第8–10章：动态菜单与权限控制
- 前端通过 `addRoute` 动态注册路由
- 后端根据用户角色返回可访问菜单
- 实现菜单的增删改查，并支持父子级联关系

### 第11–15章：电子书业务模块
- 支持 epub 格式电子书上传、解析（封面、目录、元数据）
- 实现图书列表、搜索、分页、详情、编辑、删除等完整功能
- 利用 Nginx 托管静态资源（如电子书文件）

### 第16–20章：高级权限体系（RBAC 模型落地）
- 用户管理、角色管理、权限管理三大模块
- 实现“用户 ↔ 角色 ↔ 菜单 ↔ 权限”四者关联
- 登录时动态获取用户权限，前端按权限渲染按钮/菜单

### 第21–23章：微前端架构升级
- 对比 iframe、single-spa、qiankun 等方案
- 深入 qiankun 源码原理（JS 沙箱、样式隔离、生命周期）
- 使用国产微前端框架 **wujie（无界）** 完成项目改造，实现主应用与子应用解耦

---

## 三、学习笔记要点

### 1. **前端工程化提效**
- `vue-vben-admin` 是一个开箱即用的企业级中后台模板，内置权限控制、多环境配置、Mock 数据等。
- 使用 `WindiCSS` 替代 Tailwind，实现按需生成原子化 CSS，提升构建速度。
- 通过 `AbortController` 取消重复或过期的 HTTP 请求，优化用户体验。

### 2. **NestJS 核心概念**
- **Module**：组织代码结构，每个业务模块独立封装。
- **Controller**：处理 HTTP 请求，定义路由。
- **Provider（Service）**：业务逻辑层，可注入 Repository 操作数据库。
- **Guard**：用于权限校验，如 `JwtAuthGuard`。
- **Interceptor / Pipe / Filter**：分别用于日志、参数转换、异常处理。

### 3. **JWT 认证流程**
```ts
// 登录成功 → 生成 token
const payload = { username: user.username, sub: user.id };
return {
  accessToken: this.jwtService.sign(payload),
};

// 后续请求 → 从 Header 获取 token → 验证 → 注入用户信息到 request

```

### 4. 动态路由实现关键
- 前端维护一份 路由映射表（path → component）
- 登录后调用 /getMenus 接口获取菜单数据
- 递归转换为 RouteRecordRaw[]，通过 router.addRoute() 动态添加
- 刷新页面时需重新拉取菜单并重建路由，避免 404


## 四、课程价值总结
该课程不仅教会你“如何做”，更强调“为什么这么做”。例如：
为何选择 NestJS 而非 Express？→ 因其强类型、模块化、依赖注入更适合大型项目。
为何要拆分用户/角色/权限？→ 为了灵活应对企业复杂的组织架构变更。
为何引入微前端？→ 解决团队协作、技术栈异构、部署耦合等问题。
通过本课程，你将获得：
✅ 一个可写进简历的全栈项目
✅ 对企业级权限系统的深度理解
✅ 微前端实战经验，提升架构视野
✅ 从“功能实现”到“工程思维”的跃迁

## 五、适合谁学？
- 想从 前端迈向全栈 的开发者
- 准备 面试中高级岗位，需要项目亮点的同学
- 在校生希望做出 高质量毕设
- 对 微前端、权限设计、NestJS 感兴趣的技术爱好者


## 资料下载
[下载地址](https://pan.baidu.com/s/1uY9x1GgeUSa5ln83Zob5hA) 

提取码：http://dt1.8tupian.net/2/29369a363b200.pg1
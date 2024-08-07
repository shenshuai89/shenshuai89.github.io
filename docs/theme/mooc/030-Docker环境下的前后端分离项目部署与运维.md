---
title: 030-Docker环境下的前后端分离项目部署与运维
date: 2024-07-23 09:46:31
permalink: /pages/eaafb4/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
[资源下载](https://pan.baidu.com/s/1feCPbedLkNm3JN_0hJwLeg) 提取码：  http://dt4.8tupian.net/2/29369a316b200.pg1	
## 课程介绍：
本课程把一个真实企业级前后端分离项目部署在Linux环境中，利用Docker虚拟机的容器技术，采用分布式集群部署，将项目转换成为高性能、高负载、高可用的部署方案。包括Docker集群、MySQL集群、Redis集群、负载均衡、双机热备等等。

## 课程亮点
- 面试者，有助于初学前后端分离的同学找工作
- 运维者，有助于运维人员创建和管理前后端分离项目
- 开发者，有助于开发人员系统全面的理解架构设计

## 课程目录

### 第1章 课程介绍
展示前后端分离项目部署的成果，介绍学习本门课程需要的硬件环境和软件环境，并利用VMware虚拟机安装CentOS，搭建Docker部署环境。

### 第2章 人人开源前后端分离项目下载与配置
本章以renren-fast开源项目为部署案例，详细讲解了这个项目的前端部分和后端部分的安装和配置，在Windows平台上运行调试该项目。

### 第3章 Linux基础知识强化
本章内容是巩固和复习Linux系统基础知识，重点讲解Linux系统中的目录结构和常用指令，以及防火墙等。为在Linux环境中部署前后端分离项目扫清基础知识障碍。而且还会讲解Docker虚拟机的安装。

### 第4章 搭建MySQL集群
大型项目的持久层都会选择数据库集群，本门课程选择的是MySQL领域中最成熟可靠的PXC（Percona XtraDB Cluster）集群方案。在本章节，我们会学习在Docker容器中划分网段，创建PXC容器和组建5节点的PXC集群。

### 第5章 搭建Redis集群
Redis高速缓存可以减少数据库IO的压力，在秒杀商品、抢红包等业务中频繁用到。这一章我们要学习的是为renren-fast项目搭建6节点的RedisCluster集群。

### 第6章 部署前后端分离项目
除了MySQL和Redis要使用集群外，业务的节点的部署也要使用集群方案，才能保证高性能、高负载和高可用。这一章我们将学习打包前端VUE项目和后端SpringBoot项目，以集群的方式部署在Docker容器内。

### 第7章 课后作业
介绍课程的俗话说“鸡蛋不要放在同一个篮子里”，所以要对本地部署方案改造成跨主机的运营平台。我们将创建四个Linux主机，利用Swarm技术组建Docker集群。通过Swarm的共享网络，组建起多主机多容器分布式部署的运营平台。

### 第8章 云平台部署前后端分离
本课程的案例既可以部署在本地，也可以部署在云平台，本章我们将比较阿里云、腾讯云、百度云的特点，以阿里云为例，介绍云主机的购买和使用，以及在阿里云ECS主机上部署本课程的相关程序。

### 第9章 课程总结
回顾renren-fast案例的部署架构
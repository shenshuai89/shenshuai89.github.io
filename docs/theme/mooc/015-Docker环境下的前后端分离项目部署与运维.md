---
title: 015-Docker环境下的前后端分离项目部署与运维
date: 2024-07-06 10:58:24
permalink: /pages/c62548/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
# 前端性能优化--6大角度综合型优化方案
本课程把一个真实企业级前后端分离项目部署在Linux环境中，利用Docker虚拟机的容器技术，采用分布式集群部署，将项目转换成为高性能、高负载、高可用的部署方案。包括Docker集群、MySQL集群、Redis集群、负载均衡、双机热备等等。
## 课程目标
- 技术主流 Docker容器，前后端集群，MySQL集群，Redis集群，Haproxy负载均衡，Nginx负载均衡，Keepalived实现双机热备
- 实操性强 企业级案例教学,真实的部署环境,实现7*24小时运行
- 云平台 整个部署方案迁移到阿里云平台
## 课程介绍
- 第1章 课程介绍
  *  展示前后端分离项目部署的成果，介绍学习本门课程需要的硬件环境和软件环境，并利用VMware虚拟机安装CentOS，搭建Docker部署环境。
- 第2章 人人开源前后端分离项目下载与配置
  *  本章以renren-fast开源项目为部署案例，详细讲解了这个项目的前端部分和后端部分的安装和配置，在Windows平台上运行调试该项目。
- 第3章 Linux基础知识强化
  * 本章内容是巩固和复习Linux系统基础知识，重点讲解Linux系统中的目录结构和常用指令，以及防火墙等。为在Linux环境中部署前后端分离项目扫清基础知识障碍。而且还会讲解Docker虚拟机的安装。
- 第4章 搭建MySQL集群
  *  大型项目的持久层都会选择数据库集群，本门课程选择的是MySQL领域中最成熟可靠的PXC（Percona XtraDB Cluster）集群方案。在本章节，我们会学习在Docker容器中划分网段，创建PXC容器和组建5节点的PXC集群。
- 第5章 搭建Redis集群
  *  Redis高速缓存可以减少数据库IO的压力，在秒杀商品、抢红包等业务中频繁用到。这一章我们要学习的是为renren-fast项目搭建6节点的RedisCluster集群。
- 第6章 部署前后端分离项目
  *  除了MySQL和Redis要使用集群外，业务的节点的部署也要使用集群方案，才能保证高性能、高负载和高可用。这一章我们将学习打包前端VUE项目和后端SpringBoot项目，以集群的方式部署在Docker容器内。
- 第7章 课后作业
  *  俗话说“鸡蛋不要放在同一个篮子里”，所以要对本地部署方案改造成跨主机的运营平台。我们将创建四个Linux主机，利用Swarm技术组建Docker集群。通过Swarm的共享网络，组建起多主机多容器分布式部署的运营平台。


[课程原地址](https://coding.imooc.com/class/219.html)

[资源下载](https://pan.baidu.com/s/1-AK0C9FO5NsGK5p9dxy_vA)提取码： http://dt1.8tupian.net/2/29369a301b200.pg1
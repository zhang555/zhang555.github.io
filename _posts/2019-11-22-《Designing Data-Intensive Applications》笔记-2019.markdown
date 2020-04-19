---
layout:     post
title:      "《Designing Data-Intensive Applications》读书笔记"
date:       2019-11-22 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 技术书籍
    - 技术书籍
    - 数据库
    - 后端开发
---


## 简介

这本书讲了数据库和大数据量的应用，讲的很系统全面


## I. Foundations of Data Systems

## 1 Reliable, Scalable, and Maintainable Applications

数据密集型应用 特征：
* database
* cache
* search index
* streaming process
* batch process



## 2 Data Models and Query Languages

## 3 Storage and Retrieval

## 4 Encoding and Evolution





## II Distributed Data

## 5 Replication

## 6 Partitioning

## 7 Transactions



## 8 The Trouble with Distributed Systems

分布式系统可能遇到的问题

#### 不可靠的网络：


分布式系统网络可能出问题，比如：
* 网络请求丢了
* 网络请求延迟了
* 目标节点挂了
* 目标节点因为gc等，短时间内不响应请求
* 目标节点的回包丢了	
* 目标节点回包延迟了


#### 不可靠的时钟：

机器上有自己的时钟，一般是用石英晶体振荡器，它不是完美精确的，会有偏移，更精确的时钟，有GPS接收器

现代机器有两种时钟，一种是monotonic clock，一种是 time-of-day clock，两种都很有用，取决于场景

time-of-day clock：
* 可以得到当前时刻
* 可以使用NTP同步
* 如果机器上的时间点，领先NTP很多，有可能跳回到某一个时间


monotonic clock：
* 用于测量时间间隔
* 这种时钟，保证是向前的，不会跳回去


石英晶体振荡器不是非常精确，会漂移， 每30秒会飘6ms

NTP同步的精度和网络阻塞有关系，如果网络阻塞，校准的精度也会降低，

在虚拟机里面，时钟是虚拟出来的，设计程序的时候要考虑到这个问题，如果多个虚拟机共享CPU，那么虚拟机里面的时钟就会跳变。

如果程序运行在无法控制的机器上，那么不要相信时钟，比如手机，嵌入式设备。

GPS接收器，校准时钟，可以达到更高的精度

谷歌在每个数据中心部署 GPS接收器或铯原子钟，可以将时钟误差控制在7ms内。



#### Process Pauses

#### Knowledge, Truth, and Lies


## 9 Consistency and Consensus
一致性和共识


## III. Derived Data



## 10 Batch Processing

## 11 Stream Processing

## 12 The Future of Data Systems


 















---
layout:     post
title:      "《Designing Data-Intensive Applications》第十一章 流处理"
date:       2019-11-30 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 技术书籍
    - 数据库
    - 后端开发
    - OLAP
---
 


## 11. Stream Processing

在第10章中仍然有一个很大的假设：即输入是有界的，即已知和有限的大小，所以批处理知道它何时完成输入的读取。例如，MapReduce核心的排序操作必须读取其全部输入，然后才能开始生成输出：可能发生这种情况：最后一条输入记录具有最小的键，因此需要第一个被输出，所以提早开始输出是不可行的

完全抛开固定的时间切片，当事件发生时就立即进行处理，这就是流处理（stream processing）背后的想法


## Transmitting Event Streams


在流处理的上下文中，记录通常被叫做 事件（event） 


在批处理中，文件被写入一次，然后可能被多个作业读取。类似地，在流处理术语中，一个事件由 生产者（producer） （也称为 发布者（publisher） 或 发送者（sender） ）生成一次，然后可能由多个 消费者（consumer） （ 订阅者（subscribers） 或 接收者（recipients） ）进行处理【3】。在文件系统中，文件名标识一组相关记录；在流式系统中，相关的事件通常被聚合为一个 主题（topic） 或 流（stream）



## Databases and Streams


​正如我们在本书中所看到的，没有一个系统能够满足所有的数据存储，查询和处理需求。在实践中，大多数重要应用都需要组合使用几种不同的技术来满足所有的需求：例如，使用OLTP数据库来为用户请求提供服务，使用缓存来加速常见请求，使用全文索引搜索处理搜索查询，使用数据仓库用于分析。每一个组件都有自己的数据副本，以自己的表示存储，并根据自己的目的进行优化





## Processing Streams

流处理可以用来做什么

1. 你可以将事件中的数据写入数据库，缓存，搜索索引或类似的存储系统，然后能被其他客户端查询。如图11-5所示，这是数据库与系统其他部分发生变更保持同步的好方法 —— 特别是当流消费者是写入数据库的唯一客户端时。如“批处理工作流的输出”中所讨论的，它是写入存储系统的流等价物。
2. 你能以某种方式将事件推送给用户，例如发送报警邮件或推送通知，或将事件流式传输到可实时显示的仪表板上。在这种情况下，人是流的最终消费者。
3. 你可以处理一个或多个输入流，并产生一个或多个输出流。流可能会经过由几个这样的处理阶段组成的流水线，最后再输出（选项1或2）。



## Summary



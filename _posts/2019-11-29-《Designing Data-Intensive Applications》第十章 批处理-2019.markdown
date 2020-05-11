---
layout:     post
title:      "《Designing Data-Intensive Applications》第十章 批处理"
date:       2019-11-29 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 技术书籍
    - 数据库
    - 后端开发
    - OLAP
---
 


## 10. Batch Processing


三种不同类型的系统：
* 服务（在线系统）
* 批处理系统（离线系统）
* 流处理系统（准实时系统）



## Batch Processing with Unix Tools

使用unix工具就可以实现批处理，且相当高效




## MapReduce and Distributed Filesystems

MapReduce有点像Unix工具，但分布在数千台机器上。像Unix工具一样，它相当简单粗暴，但令人惊异地管用。一个MapReduce作业可以和一个Unix进程相类比：它接受一个或多个输入，并产生一个或多个输出



​MapReduce是一个编程框架，你可以使用它编写代码来处理HDFS等分布式文件系统中的大型数据集



## Beyond MapReduce

​针对直接使用MapReduce的困难，在MapReduce上有很多高级编程模型（Pig，Hive，Cascading，Crunch）被创造出来，作为建立在MapReduce之上的抽象

但是，MapReduce执行模型本身也存在一些问题，这些问题并没有通过增加另一个抽象层次而解决，而对于某些类型的处理，它表现得非常差劲。一方面，MapReduce非常稳健：你可以使用它在任务会频繁终止的多租户系统上处理几乎任意大量级的数据，并且仍然可以完成工作（虽然速度很慢）。另一方面，对于某些类型的处理而言，其他工具有时会快上几个数量级


如前所述，Hive，Pig，Cascading和Crunch等高级语言和API变得越来越流行，因为手写MapReduce作业实在是个苦力活。随着Tez的出现，这些高级语言还有一个额外好处，可以迁移到新的数据流执行引擎，而无需重写作业代码。 Spark和Flink也有它们自己的高级数据流API，通常是从FlumeJava中获取的灵感【34】。


## Summary





 
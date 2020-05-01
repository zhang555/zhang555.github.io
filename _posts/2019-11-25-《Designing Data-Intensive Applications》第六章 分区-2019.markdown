---
layout:     post
title:      "《Designing Data-Intensive Applications》第六章 分区"
date:       2019-11-25 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 技术书籍
    - 数据库
    - 后端开发
---

## 6. Partitioning
仅仅有复制是不够的，还需要分区 partitions ， 又称为分片sharding 


​分区(partition)：
* 在MongoDB,Elasticsearch和Solr Cloud中被称为分片(shard)
* 在HBase中称之为区域(Region)
* Bigtable中则是 表块（tablet）
* Cassandra和Riak中是虚节点（vnode)
* Couchbase中叫做虚桶(vBucket)

但是分区(partition) 是约定俗成的叫法。


## Partitioning and Replication
分区和复制通常结合使用

## Partitioning of Key-Value Data

如果数据在各个节点上的分布不均匀，称为偏斜skew 

高负载的分区称为热点 hot spot

#### Partitioning by Key Range

​一种分区的方法是为每个分区指定一块连续的键范围（从最小值到最大值）

可能导致热点，可能分布不均匀

#### Partitioning by Hash of Key

为了防止偏斜和热点，可以使用散列函数给定键的分区。

一个好的散列函数，可以将数据均匀分布到各个节点上。

这种方案有时被称为一致性哈希。

​一致性哈希由Karger等人定义。用于跨互联网级别的缓存系统，例如CDN中，是一种能均匀分配负载的方法。它使用随机选择的分区边界（partition boundaries）来避免中央控制或分布式一致性的需要。 

请注意，这里的一致性与复制一致性（请参阅第5章）或ACID一致性（参阅第7章）无关，而是描述了重新平衡的特定方法。

如果使用key的hash分区，失去高效范围查找的能力


#### Skewed Workloads and Relieving Hot Spots

哈希分区可以减少热点，但是不能完全避免。比如所有请求都在同一个key上。

大多数数据系统无法自动补偿这种高度偏斜的热点。



## Partitioning and Secondary Indexes

​次级索引的问题是它们不能整齐地映射到分区。

有两种用二级索引对数据库进行分区的方法：基于文档的分区（document-based）和基于关键词（term-based）的分区。



## Partitioning Secondary Indexes by Document


​在这种索引方法中，每个分区是完全独立的。

每个分区维护自己的二级索引，仅覆盖该分区中的文档。

文档分区索引也被称为本地索引（local index）

## Partitioning Secondary Indexes by Term

根据关键词的二级索引分区。又称为全局索引 global index


不需要分散/收集所有分区，客户端只需要向包含关键词的分区发出请求。

全局索引的缺点在于写入速度较慢且较为复杂，因为写入单个文档现在可能会影响索引的多个分区（文档中的每个关键词可能位于不同的分区或者不同的节点上） 。


​理想情况下，索引总是最新的，写入数据库的每个文档都会立即反映在索引中。但是，在关键词分区索引中，这需要跨分区的分布式事务，并不是所有数据库都支持（请参阅第7章和第9章）。



## Rebalancing Partitions

什么时候需要 重新平衡分区？
* 查询吞吐量增加，想要添加更多的CPU来处理负载
* 数据集大小增加，想添加更多的磁盘和RAM来存储它
* 机器出现故障，其他机器需要接管故障机器的责任


所有这些更改都需要数据和请求从一个节点移动到另一个节点。 将负载从集群中的一个节点向另一个节点移动的过程称为再平衡（reblancing）。



无论使用哪种分区方案，再平衡通常都要满足一些最低要求：
* 再平衡之后，负载（数据存储，读取和写入请求）应该在集群中的节点之间公平地共享。
* 再平衡发生时，数据库应该继续接受读取和写入。
* 节点之间只移动必须的数据，以便快速再平衡，并减少网络和磁盘I/O负载。



## Strategies for Rebalancing


#### 反面教材：hash mod n

n是节点数， 当n发生变化时，有很多的key需要移动


#### 固定数量分区

创建比节点数更多的分区，假设有10个节点，1000个分区，每个节点100个分区，新加节点时，将一些分区放到新的节点上。

这种方案，分区的数量是在一开始指定的。分区的数量，过大过小都不好。

#### 动态分区
对于使用键范围分区的方案，固定分区将非常不方便，如果分区边界设置错误，会导致分区中的数据访问不到。手动设置分区边界也很繁琐

按键的范围进行分区的数据库（如HBase和RethinkDB）会动态创建分区。

当分区增长到超过配置的大小时（在HBase上，默认值是10GB），会被分成两个分区，每个分区约占一半的数据。

与之相反，如果大量数据被删除并且分区缩小到某个阈值以下，则可以将其与相邻分区合并。


#### 按节点比例分区：

* 动态分区，分区的个数和数据量成正比
* 固定数量分区：分区的大小和数据量成正比

两种方案，分区的数量和节点数量无关。

按节点比例分区：分区的数量和节点数量成正比。

​Cassandra和Ketama 使用这种方案



## Operations: Automatic or Manual Rebalancing
​
全自动重新平衡可以很方便，但是有可能导致节点负载过重，降低请求性能。


## Request Routing
如果数据分布在多个节点，客户端想要访问数据的时候，如何去定位？使用服务发现来解决这个问题

几种方案：
* 允许用户访问所有节点，来确定想要访问的数据分布在哪里
* 客户端的请求发给路由层
* 要求客户端维护数据的分布的信息，客户端直接连接到适当的节点。


## Parallel Query Execution
前面讲的都是单个key的查询。第十章会讲并行查询


## Summary










 






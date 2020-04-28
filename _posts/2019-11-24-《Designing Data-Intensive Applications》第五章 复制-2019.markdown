---
layout:     post
title:      "《Designing Data-Intensive Applications》第五章 复制"
date:       2019-11-24 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 技术书籍
    - 数据库
    - 后端开发
---



## 5. Replication

什么时候需要复制：
* 使得数据与用户在地理上接近（从而减少延迟）
* 即使系统的一部分出现故障，系统也能继续工作（从而提高可用性）
* 扩展可以接受读请求的机器数量（从而提高读取吞吐量）


复制的方式：
* 单leader
* 多leader
* 无leader

## Leaders and Followers

副本： replica

副本之一指定为leader ，其他副本指定为 follower 。
leader 可读可写， follower只能读

#### Synchronous Versus Asynchronous Replication


复制的两种方式：
* 同步
* 异步


#### Setting Up New Followers

设置新从库：
* 在某个时刻 拿到主库的一致性快照
* 将快照复制到新的节点
* 快照复制完后，将新从库连接到主库 将快照后面的数据 复制给新从库


#### Handling Node Outages

* 从库宕机：追赶恢复
* 主库宕机：故障转移 failover

主库宕机故障转移流程：
* 确定主库宕机
* 选择从库 切换成主库
* 启动老主库


主库宕机故障转移可能遇到的问题
* 主库宕机 ，从库数据没有完全复制，切换为主库
* 多个从库切换为主库，脑裂 split brain 
* 主库超时时间选择，如果太长，切换需要很长时间。如果太短，切换频繁。


#### Implementation of Replication Logs

复制日志的实现方式：
* 基于语句
* 传输预写日志
* 逻辑日志复制
* 基于触发器的日志


## Problems with Replication Lag

最终一致性eventually consistency ： 短时间内从库同步不及时 但是最终会与主库保持同步


#### Reading Your Own Writes

用户添加数据后，从读库读取数据，读不到

#### Monotonic Reads
用户a添加数据，用户b从第一个从库读，读到了，从第二个从库读没读到

#### Consistent Prefix Reads
如果某些分区的复制速度慢于其他分区，那么观察者在看到问题之前可能会看到答案。

#### Solutions for Replication Lag


## Multi-Leader Replication


#### Use Cases for Multi-Leader Replication
为什么需要多leader复制：有多个数据中心的情况下，想要更高的性能，想要容忍数据中心出问题，想要容忍数据中间之间的网络出问题


#### Handling Write Conflicts

方式：
* 避免冲突
* 收敛至一致状态：LWW last write win ，会丢数据
* 自定义冲突处理：leader1 leader2的更新 都写入字段中

#### Multi-Leader Replication Topologies
多leader复制 拓扑：
* 环形拓扑
* 星形拓扑
* all to all 拓扑


## Leaderless Replication

放弃主库的概念，允许任何副本直接接受来自客户端的写入

亚马逊的Dynamo使用这种架构，
Riak，Cassandra和Voldemort 也使用这种架构


#### Writing to the Database When a Node Is Down

无leader复制方案，不存在故障切换

* 写入时，并发写入各个节点
* 读取时，并发读取各个节点

* 如果写入时，有一个节点失败，接受这个事实
* 读取时，读到的有新老数据，选用新的数据。

#### Read repair and anti-entropy

保证最终一致性 两种方式：
* 读修复：用户读的时候，用新值覆盖旧值
* 反熵过程：启动一个进程，检测旧值，用新值覆盖旧值


如果有n个副本，每个写入必须由w节点确认才能被认为是成功的，并且我们必须至少为每个读取查询r个节点。 

* 如果w<n，有节点故障仍然可以写入
* 如果r<n，有节点故障仍然可以读取
* 对于n = 3，w = 2，r = 2，可以容忍一个不可用的节点
* 对于n = 5，w = 3，r = 3，可以容忍两个不可用的节点


#### Limitations of Quorum Consistency

仲裁一致性的局限性：
* 在松散的法定人数方式下，w个写入和r的读取不重叠
* 并发写入时，如果不确定哪一个先发生，如果使用 last write win ，有可能导致数据丢失
* 如果写操作与读操作同时发生，写操作可能仅反映在某些副本上。在这种情况下，不确定读取是返回旧值还是新值。
* 如果写操作在某些副本上成功，而在其他节点上失败，在小于w个副本上写入成功。所以整体判定写入失败，但整体写入失败并没有在写入成功的副本上回滚。这意味着如果一个写入虽然报告失败，后续的读取仍然可能会读取这次失败写入的值
* 如果携带新值的节点失败，需要读取其他带有旧值的副本。并且其数据从带有旧值的副本中恢复，则存储新值的副本数可能会低于w，从而打破法定人数条件。
* 即使一切工作正常，有时也会不幸地出现关于时序（timing）的边缘情况



#### Sloppy Quorums and Hinted Handoff

当发生了网络中断，客户端只能连接到一部分副本，这时有两种方式：
* 因为没有到达法定人数，直接返回失败
* 接受写入操作，将值写到可达的节点上

后者称为松散的法定人数（sloppy quorum）



#### Detecting Concurrent Writes

在并发写入时会产生冲突

 




 






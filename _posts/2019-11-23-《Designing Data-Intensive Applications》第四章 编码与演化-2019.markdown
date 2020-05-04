---
layout:     post
title:      "《Designing Data-Intensive Applications》第四章 编码与演化"
date:       2019-11-23 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 技术书籍
    - 数据库
    - 后端开发
---


## 4 Encoding and Evolution


* 向后兼容 (backward compatibility)：新代码可以读旧数据。
* 向前兼容 (forward compatibility)：旧代码可以读新数据。


本章中将介绍几种编码数据的格式，包括 JSON，XML，Protocol Buffers，Thrift和Avro。尤其将关注这些格式如何应对模式变化，以及它们如何对新旧代码数据需要共存的系统提供支持。然后将讨论如何使用这些格式进行数据存储和通信：在Web服务中，具象状态传输（REST）和远程过程调用（RPC），以及消息传递系统（如Actor和消息队列）


## Formats for Encoding Data


程序通常（至少）使用两种形式的数据：
1. 在内存中，数据保存在对象，结构体，列表，数组，哈希表，树等中。 这些数据结构针对CPU的高效访问和操作进行了优化（通常使用指针）。
2. 如果要将数据写入文件，或通过网络发送，则必须将其 编码（encode） 为某种自包含的字节序列（例如，JSON文档）。 由于每个进程都有自己独立的地址空间，一个进程中的指针对任何其他进程都没有意义，所以这个字节序列表示会与通常在内存中使用的数据结构完全不同i。


从内存中表示到字节序列的转换称为 编码（Encoding） （也称为序列化（serialization）或编组（marshalling）），

反过来称为解码（Decoding）ii（解析（Parsing），反序列化（deserialization），反编组( unmarshalling）



#### Language-Specific Formats



#### JSON, XML, and Binary Variants


尽管存在这些缺陷，但JSON，XML和CSV已经足够用于很多目的。特别是作为数据交换格式（即将数据从一个组织发送到另一个组织），它们很可能仍然很受欢迎




#### Thrift and Protocol Buffers


Apache Thrift 【15】和Protocol Buffers（protobuf）【16】是基于相同原理的二进制编码库。 Protocol Buffers最初是在Google开发的，Thrift最初是在Facebook开发的，并且在2007~2008年都是开源的【17】。 Thrift和Protocol Buffers都需要一个模式来编码任何数据



#### Avro

#### The Merits of Schemas




## Modes of Dataflow

我们将探讨数据如何在流程之间流动的一些最常见的方式：

* 通过数据库（参阅“通过数据库的数据流”）
* 通过服务调用（参阅“通过服务传输数据流：REST和RPC”）
* 通过异步消息传递（参阅“消息传递数据流”）




#### Dataflow Through Databases

#### Dataflow Through Services: REST and RPC

#### Message-Passing Dataflow


## Summary

我们讨论了几种数据编码格式及其兼容性属性：
* 编程语言特定的编码仅限于单一编程语言，并且往往无法提供前向和后向兼容性。
* JSON，XML和CSV等文本格式非常普遍，其兼容性取决于您如何使用它们。他们有可选的模式语言，这有时是有用的，有时是一个障碍。这些格式对于数据类型有些模糊，所以你必须小心数字和二进制字符串。
* 像Thrift，Protocol Buffers和Avro这样的二进制模式驱动格式允许使用清晰定义的前向和后向兼容性语义进行紧凑，高效的编码。这些模式可以用于静态类型语言的文档和代码生成。但是，他们有一个缺点，就是在数据可读之前需要对数据进行解码


我们还讨论了数据流的几种模式，说明了数据编码是重要的不同场景：
* 数据库，写入数据库的进程对数据进行编码，并从数据库读取进程对其进行解码
* RPC和REST API，客户端对请求进行编码，服务器对请求进行解码并对响应进行编码，客户端最终对响应进行解码
* 异步消息传递（使用消息代理或参与者），其中节点之间通过发送消息进行通信，消息由发送者编码并由接收者解码

我们可以小心地得出这样的结论：前向兼容性和滚动升级在某种程度上是可以实现的






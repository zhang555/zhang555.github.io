---
layout:     post
title:      "Protocol Buffers入门"
date:       2019-3-1 20:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 后端开发
    - Protocol Buffers
---

## Protocol Buffers
Protocol Buffers 是把结构体序列化的一种方式

可以用于多语言之间的通信编码，可以用于存储数据

## 基本使用

protoc命令安装：

https://github.com/protocolbuffers/protobuf




下载golang pb相关库：
```
go get github.com/golang/protobuf/proto
go get github.com/golang/protobuf/protoc-gen-go
```


protoc命令使用：

```
protoc --go_out=. *.proto
```



## 参考资料
- [https://en.wikipedia.org/wiki/Protocol_Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers)
- [https://developers.google.com/protocol-buffers/docs/gotutorial](https://developers.google.com/protocol-buffers/docs/gotutorial)






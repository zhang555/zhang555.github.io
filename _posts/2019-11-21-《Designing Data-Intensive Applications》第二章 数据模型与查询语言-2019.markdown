---
layout:     post
title:      "《Designing Data-Intensive Applications》第二章 数据模型与查询语言"
date:       2019-11-21 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 技术书籍
    - 数据库
    - 后端开发
---
 
 

## 2. Data Models and Query Languages


数据模型可能是软件开发中最重要的部分了，因为它们的影响如此深远：不仅仅影响着软件的编写方式，而且影响着我们的解题思路


## Relational Model Versus Document Model






## Query Languages for Data




## Graph-Like Data Models

如我们之前所见，多对多关系是不同数据模型之间具有区别性的重要特征。如果你的应用程序大多数的关系是一对多关系（树状结构化数据），或者大多数记录之间不存在关系，那么使用文档模型是合适的。

但是，要是多对多关系在你的数据中很常见呢？关系模型可以处理多对多关系的简单情况，但是随着数据之间的连接变得更加复杂，将数据建模为图形显得更加自然

Cypher是属性图的声明式查询语言，为Neo4j图形数据库而发明



## Summary

* 如果有大量的一对多，没有很多的多对多，使用文档型数据库比较合适
* 如果有大量的多对多，使用图数据库比较合适

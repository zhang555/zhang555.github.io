---
layout:     post
title:      "Elasticsearch入门"
date:       2018-7-1 20:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 数据库
    - Elasticsearch
---

## Elasticsearch

Elasticsearch是基于java的全文搜索引擎。


## 基本概念

index：它是document的集合

document：它是可以被建立索引的最小单位


## 基本操作

增：
```
POST /user/_doc?pretty
{
  "name": "Jane Doe"
}
```

删：

```
DELETE /user?pretty
DELETE /user/_doc/2?pretty
DELETE /user/_doc/z772VmgBq9aP4Q9bs3BN?pretty
```


改：
```
PUT /user/_doc/z772VmgBq9aP4Q9bs3BN?pretty
{
  "name": "Jane Doe"
}
```


查：



```
GET /user/_search
{
  "query": { "match_all": {} }
}
```



设置查询个数：
```
GET /bank/_search
{
  "query": { "match_all": {} },
  "size": 1
}
```



分页查询：
```
GET /bank/_search
{
  "query": { "match_all": {} },
  "from": 10,
  "size": 10
}
```



排序：
```
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": { "balance": { "order": "desc" } }
}
```



排序：
```
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": { "account_number": { "order": "desc" } }
}
```



查询指定字段：
```
GET /bank/_search
{
  "query": { "match_all": {} },
  "_source": ["account_number", "balance"]
}
```




按条件查询：
```
GET /bank/_search
{
  "query": { "match": { "account_number": 20 } }
}
```




按条件查询：
```
GET /bank/_search
{
  "query": { "match": { "address": "mill" } }
}
```




按条件查询：
```
GET /bank/_search
{
  "query": { "match": { "address": "mill lane" } }
}
```




按条件查询，必须匹配整个单词：
```
GET /bank/_search
{
  "query": { "match_phrase": { "address": "mill lane" } }
}
```




两个条件都要满足：
```
GET /bank/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "address": "mill" } },
        { "match": { "address": "lane" } }
      ]
    }
  }
}
```




两个条件只要满足一个：
```
GET /bank/_search
{
  "query": {
    "bool": {
      "should": [
        { "match": { "address": "mill" } },
        { "match": { "address": "lane" } }
      ]
    }
  }
}
```





```
GET /bank/_search
{
  "query": {
    "bool": {
      "must_not": [
        { "match": { "address": "mill" } },
        { "match": { "address": "lane" } }
      ]
    }
  }
}
```





```
GET /bank/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "age": "40" } }
      ],
      "must_not": [
        { "match": { "state": "ID" } }
      ]
    }
  }
}
```




范围过滤：
```
GET /bank/_search
{
  "query": {
    "bool": {
      "must": { "match_all": {} },
      "filter": {
        "range": {
          "balance": {
            "gte": 20000,
            "lte": 30000
          }
        }
      }
    }
  }
}
```




聚合：
```
GET /bank/_search
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword"
      }
    }
  }
}
```
 
---
layout:     post
title:      "构建python的docker镜像小优化"
date:       2021-3-7 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - python
    - docker
---


## 构建python的docker镜像小优化

想要在docker中使用python，可以这样写dockerfile：
```
FROM  ubuntu:18.04

RUN apt-get update && apt-get install -y python3-tk
```
这样构建的话，镜像会比较大，而且每次构建镜像得到的结果都不同，每次推镜像都无法复用。


可以直接依赖构建好的镜像：
```
FROM python:3.7.10-slim-buster
```



## 给python依赖单独构建镜像

构建一个python程序的镜像：
```
FROM python:3.7.10-slim-buster

RUN pip install -r requirements.txt

CMD ["python3", "main.py"]
```

构建的时候，一般需要安装依赖，安装依赖得到的docker层，一般都是不一样的，每次都需要重新推，不利于复用，docker push的时候需要推 新构建出来的层。

可以改成下面这种方式： 先给python和python的依赖单独构建一个镜像：
```
FROM python:3.7.10-slim-buster

RUN pip install -r requirements.txt
```


构建：
```
docker build -t python-with-requirements:v1 .
```

基于 python-with-requirements 镜像进行构建：
```
FROM python-with-requirements:v1

CMD ["python3", "main.py"]
```

这样 python和python的依赖 就可以复用，docker push的时候就会比较快。










---
layout:     post
title:      "k8s入门 deployment"
date:       2021-3-2 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - k8s 1.18
    - deployment
---


## deployment

#### 创建deployment


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment1 # Deployment 的名称
  labels:
    app: nginx
spec:
  replicas: 1 # 指定pod的个数
  selector: # The .spec.selector field defines how the Deployment finds which Pods to manage.
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx # 对pod打标签
    spec:
      containers: #指定运行什么容器
        - name: nginx # 指定 container 的 名称
          image: nginx:latest
          ports:
            - containerPort: 80 # 容器所在的端口
          imagePullPolicy: IfNotPresent # IfNotPresent Never ， 拉取镜像的策略

```



#### 更新deployment


将指定deployment的镜像设置为新的版本：
```
kubectl set image deployment/nginx-deployment nginx=nginx:1.16.1 --record
```

查看滚动更新的状态：
```
kubectl rollout status deployment.v1.apps/nginx-deployment

```


Deployment ensures that only a certain number of Pods are down while they are being updated. 

By default, it ensures that at least 75% of the desired number of Pods are up (25% max unavailable).


Deployment also ensures that only a certain number of Pods are created above the desired number of Pods. 

By default, it ensures that at most 125% of the desired number of Pods are up (25% max surge).


#### 回滚deployment




更新deployment，假设更新的时候设置了错误的镜像版本
```
kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.161 --record=true

```


查看更新状态： 会发现更新卡住了
```
kubectl rollout status deployment.v1.apps/nginx-deployment
```


查看更新历史记录
```
kubectl rollout history deployment.v1.apps/nginx-deployment
```


回滚：
```
kubectl rollout undo deployment.v1.apps/nginx-deployment

回滚到指定版本：
kubectl rollout undo deployment.v1.apps/nginx-deployment --to-revision=2

```


## 扩容缩容


```
kubectl scale deployment.v1.apps/nginx-deployment --replicas=10
```


## 参考资料

https://v1-18.docs.kubernetes.io/docs/concepts/workloads/controllers/deployment/










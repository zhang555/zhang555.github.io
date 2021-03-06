---
layout:     post
title:      "k8s入门 ClusterIP NodePort LoadBalance Ingress"
date:       2021-3-3 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - k8s 1.18
    - ingress
---


## ClusterIP

创建 Deployment 和 Service ：
其中 Service是 ClusterIP 模式
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-clusterip-deployment
  labels:
    app: test-clusterip
spec:
  replicas: 1
  selector:
    matchLabels:
      app: test-clusterip
  template:
    metadata:
      labels:
        app: test-clusterip
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
          imagePullPolicy: IfNotPresent # IfNotPresent Never
---
apiVersion: v1
kind: Service
metadata:
  name: test-clusterip-service
spec:
  selector:
    app: test-clusterip
  type: ClusterIP
  ports:
    - name: http
      port: 80
      targetPort: 80
      protocol: TCP
```

执行：
```
kubectl proxy --port=8080
```

访问：
```
curl http://127.0.0.1:8080/api/v1/namespaces/default/services/test-clusterip-service:80/proxy/
```

具体如何拼接这个url 可以查看文档：

https://v1-18.docs.kubernetes.io/zh/docs/tasks/access-application-cluster/access-cluster/


## NodePort

创建 Deployment 和 Service ：
其中 Service是 NodePort 模式

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-nodeport-deployment
  labels:
    app: test-nodeport
spec:
  replicas: 1
  selector:
    matchLabels:
      app: test-nodeport
  template:
    metadata:
      labels:
        app: test-nodeport
    spec:
      containers:
        - name: nginx
          image: nginx:1.16.1
          ports:
            - containerPort: 80
          imagePullPolicy: IfNotPresent # IfNotPresent Never
---
apiVersion: v1
kind: Service
metadata:
  name: test-nodeport-service
spec:
  selector:
    app: test-nodeport
  type: NodePort # NodePort ClusterIP
  ports:
    - name: http
      port: 80
      targetPort: 80
      protocol: TCP
```



查看集群ip地址：
```
kubectl cluster-info

https://192.168.64.3:8443
```


查看service的nodePort
```
kubectl describe service test-nodeport-service
```


通过nodePort访问service：
```
curl -XPOST 192.168.64.3:32083
```


## LoadBalance


If you want to directly expose a service, this is the default method. 

All traffic on the port you specify will be forwarded to the service. 

There is no filtering, no routing, etc. 

This means you can send almost any kind of traffic to it, like HTTP, TCP, UDP, Websockets, gRPC, or whatever.

The big downside is that each service you expose with a LoadBalancer will get its own IP address, 
and you have to pay for a LoadBalancer per exposed service, which can get expensive!


## Ingress

Ingress可能是暴露服务最强大的方式，但也可能是最复杂的。

创建Ingress的例子：
```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: my-ingress
spec:
  backend:
    serviceName: other
    servicePort: 8080
  rules:
  - host: foo.mydomain.com
    http:
      paths:
      - backend:
          serviceName: foo
          servicePort: 8080
  - host: mydomain.com
    http:
      paths:
      - path: /bar/*
        backend:
          serviceName: bar
          servicePort: 8080
```


## 参考资料

https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0


https://v1-18.docs.kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/









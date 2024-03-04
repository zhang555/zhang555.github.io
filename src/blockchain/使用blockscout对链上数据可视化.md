---
title: 使用blockscout对链上数据可视化
index: true
order: 6
dir:
  collapsible: false
category:
  - 区块链
---

## blockscout

拉代码：
```
git clone git@github.com:blockscout/blockscout.git
```

启动docker：
```
cd ./docker
make start
```

进入blockscout网址：
```
http://localhost
```

注意：blockscout默认会去 `http://127.0.0.1:8545/` 查询以太坊信息，需要先用 `npx hardhat node` 启动本地以太坊

## github 
```
https://github.com/blockscout/blockscout
```


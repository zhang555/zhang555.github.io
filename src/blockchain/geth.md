---
title: 用geth和以太坊交互
index: true
order: 3
dir:
  collapsible: false
---



## 一：安装geth

```
brew install ethereum
```

geth github网址：
`https://github.com/ethereum/go-ethereum`

geth是基于golang的以太坊客户端，可以和以太坊进行交互

## 二： 用geth连接以太坊

以太坊有主网络（Ethereum Mainnet），有测试网络（Sepolia、Goerli 等等）

官方文档：`https://ethereum.org/zh/developers/docs/networks/`

想要连接以太坊网络，可以通过该网站查询到各个区块链的节点
`https://chainlist.org/`

也可以通过sepolia官网，查看该区块链信息。
`https://sepolia.dev/`

通过geth连接到sepolia：

```
geth attach https://rpc.sepolia.org/
```

查看某个地址的余额：

```
eth.getBalance('0xb43ae8c139caae156805be03aaf8dbe315e4823c')
```

也可以通过该网站查看链上信息：
`https://sepolia.etherscan.io/`

## 三：进行mine操作

可以使用这个网站，在测试链上进行mine操作
`https://sepolia-faucet.pk910.de/`

## 四：使用okx浏览器插件在sepolia上发起交易

#### 4-1：进入okx 下载安装浏览器插件钱包

#### 4-2：在钱包中，切换到sepolia网络，获取账户地址

#### 4-3：进行mine操作，给自己的账户地址增加一些eth

将自己的账户地址填写到 `https://sepolia-faucet.pk910.de/` 中，进行mine操作，增加一些eth

#### 4-4：使用okx钱包，从自己的地址向另外一个地址发起交易

从自己的地址向另外一个地址发起交易

#### 4-5：使用geth查看相关信息

交易后，可以查看自己地址的余额、对方地址的余额、交易信息等。

```
eth.getBalance('0xb43ae8c139caae156805be03aaf8dbe315e4823c')
eth.getBalance('0xb43ae8c139caae156805be03aaf8dbe315e4823d')
eth.getBalance('0xb43ae8c139caae156805be03aaf8dbe315e4823e')

eth.getTransactionCount('0xb43ae8c139caae156805be03aaf8dbe315e4823c')

eth.getTransaction('0xfecc9081b6a95d99cc14c560682f782f3bb23d1175cd0f4597a13ec40316eae5')
```





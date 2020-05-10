---
layout:     post
title:      "go map sync.Map concurrent-map"
date:       2019-10-1 22:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 后端开发
    - golang
---

## go map 


```
// A header for a Go map.
type hmap struct {
	// Note: the format of the hmap is also encoded in cmd/compile/internal/gc/reflect.go.
	// Make sure this stays in sync with the compiler's definition.
	count     int // # live cells == size of map.  Must be first (used by len() builtin)
	flags     uint8
	B         uint8  // log_2 of # of buckets (can hold up to loadFactor * 2^B items)
	noverflow uint16 // approximate number of overflow buckets; see incrnoverflow for details
	hash0     uint32 // hash seed

	buckets    unsafe.Pointer // array of 2^B Buckets. may be nil if count==0.
	oldbuckets unsafe.Pointer // previous bucket array of half the size, non-nil only when growing
	nevacuate  uintptr        // progress counter for evacuation (buckets less than this have been evacuated)

	extra *mapextra // optional fields
}
```

表示 map 的结构体是 hmap

buckets是所有的桶，个数为 2^B，里面的元素是bmap

bmap中有8个tophash，有8对key value。有下一个bmap的指针

```
type bmap struct {
    topbits  [8]uint8
    keys     [8]keytype
    values   [8]valuetype
    pad      uintptr
    overflow uintptr
}
```

get流程：通过后面B位，找到桶，通过前面8位，与bmap中的tophash进行匹配，如果不同就跳过，如果相同，就尝试匹配整个key，如果相同就返回。

put流程：用同样的方法找到桶，在bmap中，找到空位，放置key value

扩容：
* 相同容量"扩容"：当元素没那么多，但是 overflow bucket 数特别多时，进行这种扩容
* 二倍容量扩容：当元素太多，而 bucket 数量太少，进行这种扩容


#### 参考资料

https://www.linkinstar.wiki/2019/06/03/golang/source-code/graphic-golang-map/

http://blog.newbmiao.com/2020/02/04/dig101-golang-map.html

https://github.com/qcrao/Go-Questions/blob/master/map/map%20%E7%9A%84%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88.md

https://github.com/qcrao/Go-Questions/blob/master/map/map%20%E7%9A%84%E6%89%A9%E5%AE%B9%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84.md


- [https://www.linkinstar.wiki/2019/06/03/golang/source-code/graphic-golang-map/](https://www.linkinstar.wiki/2019/06/03/golang/source-code/graphic-golang-map/)
- [http://blog.newbmiao.com/2020/02/04/dig101-golang-map.html](http://blog.newbmiao.com/2020/02/04/dig101-golang-map.html)
- [https://github.com/qcrao/Go-Questions/blob/master/map/map%20%E7%9A%84%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88.md](https://github.com/qcrao/Go-Questions/blob/master/map/map%20%E7%9A%84%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88.md)
- [https://github.com/qcrao/Go-Questions/blob/master/map/map%20%E7%9A%84%E6%89%A9%E5%AE%B9%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84.md](https://github.com/qcrao/Go-Questions/blob/master/map/map%20%E7%9A%84%E6%89%A9%E5%AE%B9%E8%BF%87%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84.md)



## go sync.Map


```
type Map struct {
	mu Mutex
	read atomic.Value // readOnly
	dirty map[interface{}]*entry
	misses int
}

type readOnly struct {
    m  map[interface{}]*entry
    amended bool 
}
```

sync.Map的思路是维护两个map，一个用于读写（dirty字段），一个用于读（read字段）。如果read中amended为true，就代表read和dirty数据不同。

读流程：从read中读，如果有，就返回，否则从dirty读，如果从dirty读的次数到了一定的上限，就把数据写入read。

删流程：如果read中没有，且read中amended为true，则从dirty中删除。否则从read中标记删除

增改流程：如果read中有，或者dirty中有，就在dirty中修改，否则在dirty中添加


sync.Map适合读多写少的场景。


#### 参考资料

https://juejin.im/post/5d36a7cbf265da1bb47da444




## go concurrent-Map

Go语言原生的map类型并不支持并发读写。concurrent-map提供了一种高性能的解决方案:通过对内部map进行分片，降低锁粒度，从而降低锁冲突

sync.Map在读多写少性能比较好，否则并发性能很差


```
var SHARD_COUNT = 32

type ConcurrentMap []*ConcurrentMapShared

type ConcurrentMapShared struct {
	items        map[string]interface{}
	sync.RWMutex // Read Write mutex, guards access to internal map.
}

func New() ConcurrentMap {
	m := make(ConcurrentMap, SHARD_COUNT)
	for i := 0; i < SHARD_COUNT; i++ {
		m[i] = &ConcurrentMapShared{items: make(map[string]interface{})}
	}
	return m
}
```

可以看出，每个ConcurrentMap有32个map，每个map有一个读写锁


```
func (m ConcurrentMap) GetShard(key string) *ConcurrentMapShared {
	return m[uint(fnv32(key))%uint(SHARD_COUNT)]
}

func (m ConcurrentMap) Set(key string, value interface{}) {
	// Get map shard.
	shard := m.GetShard(key)
	shard.Lock()
	shard.items[key] = value
	shard.Unlock()
}
```
在set一个元素时，找到对应的分片，加锁，写入分片，释放锁

#### 参考资料

https://github.com/orcaman/concurrent-map/blob/master/README-zh.md


 
##  sync.Map 和 concurrent-Map 性能对比

```

func BenchmarkSyncMapWrite1(b *testing.B) {
	m := sync.Map{}
	for i := 0; i < b.N; i++ {
		m.Store(1, 1)
	}
}

func BenchmarkSyncMapRead(b *testing.B) {
	m := sync.Map{}
	for i := 0; i < b.N; i++ {
		m.Load(1)
	}
}

func BenchmarkSyncMapReadWrite(b *testing.B) {
	m := sync.Map{}
	for i := 0; i < b.N; i++ {
		m.Store(1, 1)
		m.Load(1)
	}
}


```
 
```

func BenchmarkConcurrentMapWrite(b *testing.B) {
	m := cmap.New()
	for i := 0; i < b.N; i++ {
		m.Set("foo", "bar")
	}
}

func BenchmarkConcurrentMapRead(b *testing.B) {
	m := cmap.New()
	for i := 0; i < b.N; i++ {
		m.Get(`1`)
	}
}

func BenchmarkConcurrentMapReadWrite(b *testing.B) {
	m := cmap.New()
	for i := 0; i < b.N; i++ {
		m.Set("foo", "bar")
		m.Get(`1`)
	}
}

```

```
BenchmarkSyncMapWrite1-12               20000000                73.5 ns/op
BenchmarkSyncMapRead-12                 100000000               10.6 ns/op
BenchmarkSyncMapReadWrite-12            20000000                74.1 ns/op

BenchmarkConcurrentMapWrite-12          30000000                40.6 ns/op
BenchmarkConcurrentMapRead-12           100000000               19.4 ns/op
BenchmarkConcurrentMapReadWrite-12      30000000                59.6 ns/op

```
可以看出在写 读写场景下 concurrent-Map 速度快

在读场景下 SyncMap 速度快







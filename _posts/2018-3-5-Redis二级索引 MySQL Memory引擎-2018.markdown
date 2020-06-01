---
layout:     post
title:      "Redis二级索引 MySQL的Memory引擎"
date:       2018-3-5 20:00:00
author:     "zhang"
header-img: "img/post-bg-2019.jpg"
catalog: true
tags:
    - 后端开发
    - Redis
    - MySQL
---


## Redis二级索引

使用一个set保存id，根据二级索引查询时，从set中取出id。

```

const (
	keyId   = "user:id:%d"
	keyName = "user:name:%s"
)

type RedisIndexUser struct {
	Id   int
	Name string
}

func TestRedisIndex1(t *testing.T) {
	client.FlushDB()
	var (
		users []RedisIndexUser = make([]RedisIndexUser, 10)
	)

	for i := range users {
		users[i].Id = i
		users[i].Name = strconv.Itoa(i % 3)

		byteSlice, _ := json.Marshal(&users[i])

		key1 := fmt.Sprintf(keyId, users[i].Id)
		key2 := fmt.Sprintf(keyName, users[i].Name)
		client.Set(key1, string(byteSlice), time.Hour)
		client.SAdd(key2, users[i].Id)
	}

	users = GetByName(`1`)
	log.Println(users)

	user := GetById(1)
	log.Println(user)
}

func GetById(id int) RedisIndexUser {
	var user = RedisIndexUser{}
	key1 := fmt.Sprintf(keyId, id)
	userString := client.Get(key1).Val()
	//log.Println(userString)
	err := json.Unmarshal([]byte(userString), &user)
	if err != nil {
		return RedisIndexUser{}
	}
	return user
}

func GetByName(name string) []RedisIndexUser {
	key2 := fmt.Sprintf(keyName, name)
	results := client.SMembers(key2).Val()
	ret := make([]RedisIndexUser, len(results))
	for i, result := range results {
		resultInt, err := strconv.Atoi(result)
		if err != nil {
			continue
		}
		key1 := fmt.Sprintf(keyId, resultInt)
		userString := client.Get(key1).Val()
		//log.Println(userString)

		err = json.Unmarshal([]byte(userString), &ret[i])
		if err != nil {
			continue
		}
	}
	return ret
}

```

## MySQL的Memory引擎

用MySQL的Memory引擎可以很方便的实现缓存+二级索引

```

func TestMysqlEngineMemory(t *testing.T) {
	var sql string

	sql = `drop table if exists table_engine_memory;`

	DB.Exec(sql)

	sql = `
create table table_engine_memory
(
    id       int auto_increment
        primary key,
    num1     int           default 0  not null,
    num2     int           default 0  not null,
    num3     int           default 0  not null,
    content1 varchar(1000) default '' not null,
    content2 varchar(1000) default '' not null,
    content3 varchar(1000) default '' not null,
    key num1_idx (num1)
) engine = memory;
`

	DB.Exec(sql)

	for i := 1; i <= 10; i++ {
		DB.Create(&db.TableEngineMemory{ID: i, Num1: i % 3})
	}

	var beans []db.TableEngineMemory

	DB.Where(` num1 = 1 `).Find(&beans)
	log.Println(beans)

	var bean db.TableEngineMemory
	DB.Where(` id = 1 `).First(&bean)
	log.Println(bean)

}
```

## 性能对比




```

/*
goos: darwin
goarch: amd64
pkg: godemo/golibdemo/gormdemo
BenchmarkMysqlMemoryEngine-12    	      30	  37798211 ns/op
PASS
*/
func BenchmarkMysqlMemoryEngine(b *testing.B) {

	var sql string

	sql = `drop table if exists table_engine_memory;`
	DB.Exec(sql)


	sql = `
create table table_engine_memory
(
    id       int auto_increment
        primary key,
    num1     int           default 0  not null,
    num2     int           default 0  not null,
    num3     int           default 0  not null,
    content1 varchar(1000) default '' not null,
    content2 varchar(1000) default '' not null,
    content3 varchar(1000) default '' not null,
    key num1_idx (num1)
) engine = memory;
`

	DB.Exec(sql)

	for i := 0; i < b.N; i++ {
		for j := 1; j <= 100; j++ {
			DB.Create(&db.TableEngineMemory{ID: i*1000 + j, Num1: (i*1000 + j) % 3})

		}

		sql = `truncate table table_engine_memory;`
		DB.Exec(sql)
	}
}

```


```

/*
goos: darwin
goarch: amd64
pkg: goredisdemo/test
BenchmarkName2-12    	      50	  21736244 ns/op
PASS
*/
func BenchmarkName2(b *testing.B) {

	client.FlushDB()

	type RedisIndexUser struct {
		Id       int
		Num1     int
		Num2     int
		Num3     int
		Content1 string
		Content2 string
		Content3 string
	}

	const (
		keyId       = "user:id:%d"
		keyNum1     = "user:num1:%d"
		keyNum2     = "user:num2:%d"
		keyNum3     = "user:num3:%d"
		keyContent1 = "user:content1:%s"
		keyContent2 = "user:content2:%s"
		keyContent3 = "user:content3:%s"
	)

	var user RedisIndexUser

	for i := 0; i < b.N; i++ {

		for j := 0; j < 100; j++ {

			user.Id = i
			user.Num1 = i % 3
			user.Num2 = i % 3
			user.Num3 = i % 3
			user.Content1 = strconv.Itoa(i % 3)
			user.Content2 = strconv.Itoa(i % 3)
			user.Content3 = strconv.Itoa(i % 3)

			byteSlice, _ := json.Marshal(&user)

			key1 := fmt.Sprintf(keyId, user.Id)
			num1Key := fmt.Sprintf(keyNum1, user.Num1)
			num2Key := fmt.Sprintf(keyNum2, user.Num2)
			num3Key := fmt.Sprintf(keyNum3, user.Num3)
			content1Key := fmt.Sprintf(keyContent1, user.Content1)
			content2Key := fmt.Sprintf(keyContent2, user.Content2)
			content3Key := fmt.Sprintf(keyContent3, user.Content3)
			client.Set(key1, string(byteSlice), time.Hour)
			client.SAdd(num1Key, user.Id)
			client.SAdd(num2Key, user.Id)
			client.SAdd(num3Key, user.Id)
			client.SAdd(content1Key, user.Id)
			client.SAdd(content2Key, user.Id)
			client.SAdd(content3Key, user.Id)

		}

	}

	client.FlushDB()

}
```

在这个简单的测试的例子中，可以看到redis要比memory引擎快1.5倍




## 对比

| |    代码 |  吞吐 |  使用频率   |    |
|  ----  | ----  |----|----|----|
| Redis二级索引  |  代码略微复杂，每个二级索引要单独加代码 |  高 | 常见  |   |
| MySQL的Memory引擎  | 代码简单，每个二级索引不需要额外加代码 | 低 | 不太常见 |   |





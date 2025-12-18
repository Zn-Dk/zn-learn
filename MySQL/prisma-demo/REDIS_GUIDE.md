# Redis 快速上手指南

## 目录
- [Redis 简介](#redis-简介)
- [安装 Redis](#安装-redis)
- [基本概念](#基本概念)
- [数据类型](#数据类型)
- [常用命令](#常用命令)
- [在 Node.js 中使用 Redis](#在-nodejs-中使用-redis)
- [实战示例](#实战示例)
- [最佳实践](#最佳实践)

---

## Redis 简介

Redis（Remote Dictionary Server）是一个开源的内存数据结构存储系统，可以用作：
- **数据库**：持久化存储数据
- **缓存**：高速缓存层
- **消息队列**：发布/订阅模式

### 核心特性
- ⚡ **高性能**：所有数据存储在内存中，读写速度极快
- 🔄 **持久化**：支持 RDB 和 AOF 两种持久化方式
- 📊 **丰富的数据类型**：String、Hash、List、Set、Sorted Set 等
- 🔒 **原子性操作**：所有操作都是原子性的
- 🌐 **主从复制**：支持数据复制和高可用

---

## 安装 Redis

### Linux (Ubuntu/Debian)
```bash
# 更新包管理器
sudo apt update

# 安装 Redis
sudo apt install redis-server

# 启动 Redis 服务
sudo systemctl start redis-server

# 设置开机自启
sudo systemctl enable redis-server

# 检查状态
sudo systemctl status redis-server
```

### macOS
```bash
# 使用 Homebrew 安装
brew install redis

# 启动 Redis 服务
brew services start redis

# 或者前台运行
redis-server
```

### Windows
```bash
# 使用 WSL2 或下载 Windows 版本
# 推荐使用 WSL2 + Ubuntu 方式安装

# 或使用 Docker
docker run -d -p 6379:6379 --name redis redis:latest
```

### Docker 安装（推荐）
```bash
# 拉取 Redis 镜像
docker pull redis:latest

# 运行 Redis 容器
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:latest redis-server --appendonly yes

# 进入 Redis CLI
docker exec -it redis redis-cli
```

### 验证安装
```bash
# 连接到 Redis
redis-cli

# 测试连接
127.0.0.1:6379> PING
# 返回: PONG

# 查看版本
127.0.0.1:6379> INFO server
```

---

## 基本概念

### 键值对存储
Redis 使用键值对（Key-Value）方式存储数据：
- **Key**：字符串类型，唯一标识
- **Value**：支持多种数据类型

### 数据库
- Redis 默认有 16 个数据库（0-15）
- 默认使用 0 号数据库
- 使用 `SELECT` 命令切换数据库

```bash
# 切换到 1 号数据库
SELECT 1

# 查看当前数据库的键数量
DBSIZE

# 清空当前数据库
FLUSHDB

# 清空所有数据库
FLUSHALL
```

---

## 数据类型

### 1. String（字符串）
最基本的数据类型，可以存储字符串、整数或浮点数(数值都是转为字符串的)。

```bash
# 设置值
SET name "John Doe"
SET age 30
SET price 99.99

# SET 命令完整语法
SET key value [NX|XX] [EX seconds|PX milliseconds]

# 参数说明：
# - 默认行为：无论键是否存在，都会设置成功（覆盖已存在的键）
# - NX (Not eXists)：仅当键不存在时设置成功
# - XX (eXists)：仅当键已存在时设置成功（用于更新）
# - EX seconds：设置键的过期时间（秒）
# - PX milliseconds：设置键的过期时间（毫秒）

# 示例
SET key1 "value1"           # 默认行为，总是成功
SET key2 "value2" NX        # 仅当 key2 不存在时设置
SET key3 "value3" XX        # 仅当 key3 已存在时设置（更新）
SET key4 "value4" EX 60     # 设置并在60秒后过期

# 获取值
GET name          # "John Doe"
GET age           # "30"

# 设置多个值
MSET key1 "value1" key2 "value2" key3 "value3"

# 获取多个值
MGET key1 key2 key3

# 设置值并设置过期时间（秒）
SETEX session:user1 3600 "user_data"

# 仅当键不存在时设置
SETNX lock:resource1 "locked"

# 追加字符串
APPEND name " Smith"    # "John Doe Smith"

# 获取字符串长度
STRLEN name

# 数值操作
INCR counter           # 自增 1
INCRBY counter 5       # 增加 5
DECR counter           # 自减 1
DECRBY counter 3       # 减少 3
```

### 2. Hash（哈希表）
键值对集合，适合存储对象。

```bash
# 设置单个字段
HSET user:1001 name "Alice"
HSET user:1001 age 25
HSET user:1001 email "alice@example.com"

# 设置多个字段
HMSET user:1002 name "Bob" age 30 email "bob@example.com"

# 获取单个字段
HGET user:1001 name        # "Alice"

# 获取多个字段
HMGET user:1001 name age   # ["Alice", "25"]

# 获取所有字段和值
HGETALL user:1001

# 获取所有字段名
HKEYS user:1001

# 获取所有值
HVALS user:1001

# 检查字段是否存在
HEXISTS user:1001 name     # 1 (存在)

# 删除字段
HDEL user:1001 email

# 字段数量
HLEN user:1001

# 数值操作
HINCRBY user:1001 age 1    # 年龄加 1
```

### 3. List（列表）
有序的字符串列表，可以从两端添加或删除元素。

```bash
# 从左侧插入
LPUSH tasks "task1"
LPUSH tasks "task2" "task3"

> 注意, 是逐个push进数组的
> 如果原数组是空的, 插入效果为 `["task3", "task2", "task1"]`


# 从右侧插入
RPUSH tasks "task4"

# 获取列表长度
LLEN tasks

# 获取指定范围的元素
LRANGE tasks 0 -1          # 获取所有元素
LRANGE tasks 0 2           # 获取前 3 个元素
> 负数代表从右侧开始数, -1 表示最后一个
> LRANGE tasks i i (等同于获取 i 号元素, 而非空)

# 获取指定索引的元素
LINDEX tasks 0

# 从左侧弹出
LPOP tasks

# 从右侧弹出
RPOP tasks

# 阻塞式弹出（等待元素）
BLPOP tasks 10             # 等待 10 秒

# 修改指定索引的值
LSET tasks 0 "new_task"

# 删除指定值
LREM tasks 1 "task1"       # 删除 1 个 "task1"

# 保留指定范围的元素
LTRIM tasks 0 99           # 只保留前 100 个
```

### 4. Set（集合）
无序的字符串集合，元素唯一。

```bash
# 添加元素
SADD tags "redis" "database" "cache"

# 获取所有元素
SMEMBERS tags

# 检查元素是否存在
SISMEMBER tags "redis"     # 1 (存在)

# 获取集合大小
SCARD tags

# 删除元素
SREM tags "cache"

# 随机获取元素
SRANDMEMBER tags 2

# 弹出随机元素
SPOP tags

# 集合运算
SADD set1 "a" "b" "c"
SADD set2 "b" "c" "d"

# 交集
SINTER set1 set2           # ["b", "c"]

# 并集
SUNION set1 set2           # ["a", "b", "c", "d"]

# 差集
> 差集是指在 set1 中存在，但在 set2 中不存在的元素
SDIFF set1 set2            # ["a"]
SDIFF set2 set1            # ["d"]

# 将交集结果存储到新集合, 支持上面的命令
SINTERSTORE result set1 set2
SUNIONSTORE
SDIFFSTORE
...
```

### 5. Sorted Set（有序集合）
有序的字符串集合，每个元素关联一个分数（score）。

```bash
# 添加元素（带分数）
ZADD leaderboard 100 "player1"
ZADD leaderboard 200 "player2" 150 "player3"

# 获取指定范围的元素（按分数升序）
ZRANGE leaderboard 0 -1

# 获取指定范围的元素（带分数）
ZRANGE leaderboard 0 -1 WITHSCORES

# 获取指定范围的元素（按分数降序）
ZREVRANGE leaderboard 0 -1 WITHSCORES

# 获取元素的分数
ZSCORE leaderboard "player1"

# 获取元素的排名（从 0 开始）
ZRANK leaderboard "player1"        # 升序排名
ZREVRANK leaderboard "player1"     # 降序排名

# 获取集合大小
ZCARD leaderboard

# 增加元素的分数
ZINCRBY leaderboard 50 "player1"

# 删除元素
ZREM leaderboard "player3"

# 按分数范围获取元素
ZRANGEBYSCORE leaderboard 100 200

# 按分数范围删除元素
ZREMRANGEBYSCORE leaderboard 0 100

# 按排名范围删除元素
ZREMRANGEBYRANK leaderboard 0 2
```

---

## 常用命令

### 键操作
```bash
# 查看所有键
KEYS *

# 查看匹配模式的键
KEYS user:*

# 检查键是否存在
EXISTS name

# 删除键
DEL name

# 删除多个键
DEL key1 key2 key3

# 设置过期时间（秒）
EXPIRE name 60

# 设置过期时间（毫秒）
PEXPIRE name 60000

# 设置过期时间点（Unix 时间戳）
EXPIREAT name 1735689600

# 查看剩余生存时间（秒）
TTL name

# 查看剩余生存时间（毫秒）
PTTL name

# 移除过期时间
PERSIST name

# 重命名键
RENAME oldkey newkey

# 仅当新键不存在时重命名
RENAMENX oldkey newkey

# 查看键的数据类型
TYPE name

# 随机返回一个键
RANDOMKEY
```

### 数据库操作
```bash
# 切换数据库
SELECT 1

# 查看当前数据库键数量
DBSIZE

# 清空当前数据库
FLUSHDB

# 清空所有数据库
FLUSHALL

# 将键移动到其他数据库
MOVE name 1
```

### 服务器操作
```bash
# 查看服务器信息
INFO

# 查看特定部分信息
INFO server
INFO memory
INFO stats

# 查看配置
CONFIG GET *
CONFIG GET maxmemory

# 设置配置
CONFIG SET maxmemory 1gb

# 保存数据到磁盘（同步）
SAVE

# 保存数据到磁盘（异步）
BGSAVE

# 获取最后一次保存时间
LASTSAVE

# 关闭服务器
SHUTDOWN

# 测试连接
PING

# 打印字符串
ECHO "Hello Redis"

# 查看慢查询日志
SLOWLOG GET 10
```

### 发布订阅（Pub/Sub）
Redis 的发布订阅模式允许消息的发送者（发布者）和接收者（订阅者）之间进行解耦通信。

```bash
# ========== 订阅操作 ==========

# 订阅一个或多个频道
SUBSCRIBE channel1 channel2 channel3

# 订阅匹配模式的频道（支持通配符）
PSUBSCRIBE news:*        # 订阅所有以 news: 开头的频道
PSUBSCRIBE user:*:msg    # 订阅匹配模式的频道

# 取消订阅频道
UNSUBSCRIBE channel1 channel2

# 取消订阅匹配模式的频道
PUNSUBSCRIBE news:*

# ========== 发布操作 ==========

# 向频道发布消息
PUBLISH channel1 "Hello, Redis!"
PUBLISH news:tech "New technology released"
PUBLISH user:1001:msg "You have a new message"

# 返回值：接收到消息的订阅者数量

# ========== 查询操作 ==========

# 查看活跃的频道（至少有一个订阅者）
PUBSUB CHANNELS

# 查看匹配模式的活跃频道
PUBSUB CHANNELS news:*

# 查看频道的订阅者数量
PUBSUB NUMSUB channel1 channel2

# 查看模式订阅的数量
PUBSUB NUMPAT
```

**发布订阅示例场景**：
```bash
# 终端 1：订阅者
SUBSCRIBE notifications user:1001:msg

# 终端 2：发布者
PUBLISH notifications "System maintenance at 2AM"
# 返回: (integer) 1  # 1个订阅者收到消息

PUBLISH user:1001:msg "You have a new friend request"
# 返回: (integer) 1

# 终端 1 会实时收到：
# 1) "message"
# 2) "notifications"
# 3) "System maintenance at 2AM"
#
# 1) "message"
# 2) "user:1001:msg"
# 3) "You have a new friend request"
```

**模式订阅示例**：
```bash
# 订阅所有新闻频道
PSUBSCRIBE news:*

# 发布到不同的新闻频道
PUBLISH news:tech "AI breakthrough"      # 订阅者会收到
PUBLISH news:sports "Team wins championship"  # 订阅者会收到
PUBLISH weather:today "Sunny"            # 订阅者不会收到
```

**注意事项**：
- 发布订阅是**即时通信**，消息不会被持久化
- 如果发布时没有订阅者，消息会丢失
- 订阅者在订阅期间会进入阻塞状态，无法执行其他命令
- 适用于实时通知、聊天系统、事件广播等场景

### 事务（Transactions）
Redis 事务允许一组命令在单个步骤中执行，保证原子性操作。

```bash
# ========== 基本事务操作 ==========

# 开启事务
MULTI

# 在事务中添加命令（命令会被放入队列）
SET account:1001 1000
SET account:1002 500
DECRBY account:1001 100
INCRBY account:1002 100

# 执行事务（原子性执行所有命令）
EXEC

# 取消事务（放弃队列中的所有命令）
DISCARD

# ========== 完整事务示例 ==========

# 转账操作示例
MULTI
GET account:1001          # 检查余额
DECRBY account:1001 100   # 扣款
INCRBY account:1002 100   # 加款
EXEC

# 返回结果（数组形式）：
# 1) "1000"
# 2) (integer) 900
# 3) (integer) 600

# ========== 监视键（乐观锁）==========

# WATCH 用于实现乐观锁，监视键的变化
WATCH account:1001

# 检查余额
GET account:1001

# 如果余额足够，开启事务
MULTI
DECRBY account:1001 100
INCRBY account:1002 100
EXEC

# 如果在 WATCH 之后、EXEC 之前，account:1001 被其他客户端修改
# EXEC 会返回 nil，事务不会执行

# 取消监视
UNWATCH

# ========== 事务中的错误处理 ==========

# 语法错误（命令入队前检测）
MULTI
SET key1 "value1"
INVALID_COMMAND          # 语法错误
SET key2 "value2"
EXEC
# 返回错误，整个事务不会执行

# 运行时错误（命令执行时检测）
MULTI
SET key1 "value1"
INCR key1                # key1 是字符串，无法自增
SET key2 "value2"
EXEC
# 返回结果：
# 1) OK
# 2) (error) ERR value is not an integer
# 3) OK
# 注意：其他命令仍会执行，Redis 不支持回滚
```

**事务使用示例**：
```bash
# 示例 1：批量设置用户信息
MULTI
HSET user:1001 name "Alice"
HSET user:1001 age 25
HSET user:1001 email "alice@example.com"
SADD users:active 1001
EXEC

# 示例 2：计数器操作
MULTI
INCR page:views
INCR page:unique_visitors
LPUSH page:recent_visitors "user123"
EXEC

# 示例 3：使用 WATCH 实现乐观锁
WATCH inventory:item:123

# 检查库存
GET inventory:item:123
# 假设返回 "10"

# 如果库存充足，执行购买
MULTI
DECR inventory:item:123
LPUSH orders "order_data"
EXEC

# 如果其他客户端在此期间修改了库存，EXEC 返回 nil
```

**事务特性**：
- ✅ **原子性**：事务中的所有命令要么全部执行，要么全部不执行（入队阶段错误）
- ✅ **隔离性**：事务执行期间，不会被其他客户端的命令打断
- ✅ **顺序性**：命令按照入队顺序执行
- ❌ **不支持回滚**：运行时错误不会导致已执行命令回滚
- ❌ **不支持嵌套**：事务内不能再开启事务

**WATCH 机制（乐观锁）**：
```bash
# 场景：多个客户端同时修改同一个键

# 客户端 1
WATCH balance:1001
GET balance:1001          # 返回 "1000"

# 客户端 2（在客户端 1 执行 EXEC 之前）
SET balance:1001 900      # 修改了被监视的键

# 客户端 1 继续
MULTI
SET balance:1001 800
EXEC
# 返回 nil（事务失败，因为 balance:1001 被修改了）

# 客户端 1 需要重试
UNWATCH
# 重新执行 WATCH -> GET -> MULTI -> EXEC 流程
```

**事务 vs Lua 脚本**：
- **事务**：适合简单的原子操作，不支持条件判断
- **Lua 脚本**：支持复杂逻辑、条件判断，性能更好（推荐）

```bash
# Lua 脚本示例（更强大的替代方案）
EVAL "
  local balance = redis.call('GET', KEYS[1])
  if tonumber(balance) >= tonumber(ARGV[1]) then
    redis.call('DECRBY', KEYS[1], ARGV[1])
    redis.call('INCRBY', KEYS[2], ARGV[1])
    return 1
  else
    return 0
  end
" 2 account:1001 account:1002 100

# 返回 1 表示成功，0 表示余额不足
```

---

## 在 Node.js 中使用 Redis

### 安装依赖
```bash
# 使用 ioredis（推荐）
npm install ioredis

# 或使用 redis
npm install redis
```

### 基本连接（ioredis）
```javascript
import Redis from 'ioredis';

// 创建 Redis 客户端
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  password: 'your_password', // 如果有密码
  db: 0,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// 监听连接事件
redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

// 基本操作
const main = async () => {
  try {
    // String 操作
    await redis.set('name', 'John Doe');
    const name = await redis.get('name');
    console.log('Name:', name);

    // 设置过期时间
    await redis.setex('session:123', 3600, 'user_data');

    // Hash 操作
    await redis.hset('user:1001', 'name', 'Alice');
    await redis.hset('user:1001', 'age', 25);
    const user = await redis.hgetall('user:1001');
    console.log('User:', user);

    // List 操作
    await redis.lpush('tasks', 'task1', 'task2', 'task3');
    const tasks = await redis.lrange('tasks', 0, -1);
    console.log('Tasks:', tasks);

    // Set 操作
    await redis.sadd('tags', 'redis', 'database', 'cache');
    const tags = await redis.smembers('tags');
    console.log('Tags:', tags);

    // Sorted Set 操作
    await redis.zadd('leaderboard', 100, 'player1', 200, 'player2');
    const leaderboard = await redis.zrevrange('leaderboard', 0, -1, 'WITHSCORES');
    console.log('Leaderboard:', leaderboard);

    // 管道操作（批量执行）
    const pipeline = redis.pipeline();
    pipeline.set('key1', 'value1');
    pipeline.set('key2', 'value2');
    pipeline.get('key1');
    const results = await pipeline.exec();
    console.log('Pipeline results:', results);

    // 事务操作
    const multi = redis.multi();
    multi.set('counter', 0);
    multi.incr('counter');
    multi.incr('counter');
    const transResults = await multi.exec();
    console.log('Transaction results:', transResults);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await redis.quit();
  }
};

main();
```

### TypeScript 示例
```typescript
import Redis from 'ioredis';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: 0,
    });
  }

  // 缓存用户数据
  async cacheUser(user: User, ttl: number = 3600): Promise<void> {
    const key = `user:${user.id}`;
    await this.client.setex(key, ttl, JSON.stringify(user));
  }

  // 获取缓存的用户数据
  async getUser(userId: string): Promise<User | null> {
    const key = `user:${userId}`;
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  // 删除用户缓存
  async deleteUser(userId: string): Promise<void> {
    const key = `user:${userId}`;
    await this.client.del(key);
  }

  // 设置会话
  async setSession(sessionId: string, data: any, ttl: number = 1800): Promise<void> {
    const key = `session:${sessionId}`;
    await this.client.setex(key, ttl, JSON.stringify(data));
  }

  // 获取会话
  async getSession(sessionId: string): Promise<any | null> {
    const key = `session:${sessionId}`;
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  // 增加计数器
  async incrementCounter(key: string): Promise<number> {
    return await this.client.incr(key);
  }

  // 添加到排行榜
  async addToLeaderboard(userId: string, score: number): Promise<void> {
    await this.client.zadd('leaderboard', score, userId);
  }

  // 获取排行榜
  async getLeaderboard(limit: number = 10): Promise<Array<{ userId: string; score: number }>> {
    const results = await this.client.zrevrange('leaderboard', 0, limit - 1, 'WITHSCORES');
    const leaderboard: Array<{ userId: string; score: number }> = [];

    for (let i = 0; i < results.length; i += 2) {
      leaderboard.push({
        userId: results[i],
        score: parseInt(results[i + 1]),
      });
    }

    return leaderboard;
  }

  // 关闭连接
  async close(): Promise<void> {
    await this.client.quit();
  }
}

export default RedisService;
```

---

## 实战示例
### 1. 缓存数据库查询结果
```typescript
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

const prisma = new PrismaClient();
const redis = new Redis();

const getUserById = async (userId: string) => {
  const cacheKey = `user:${userId}`;

  // 先从缓存获取
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log('✅ Cache hit');
    return JSON.parse(cached);
  }

  // 缓存未命中，从数据库查询
  console.log('❌ Cache miss, querying database');
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    // 存入缓存，过期时间 1 小时
    await redis.setex(cacheKey, 3600, JSON.stringify(user));
  }

  return user;
};
```

### 2. 分布式锁
```typescript
const acquireLock = async (
  redis: Redis,
  lockKey: string,
  ttl: number = 10
): Promise<boolean> => {
  const result = await redis.set(lockKey, '1', 'EX', ttl, 'NX');
  return result === 'OK';
};

const releaseLock = async (redis: Redis, lockKey: string): Promise<void> => {
  await redis.del(lockKey);
};

// 使用示例
const processTask = async (taskId: string) => {
  const lockKey = `lock:task:${taskId}`;

  // 尝试获取锁
  const locked = await acquireLock(redis, lockKey, 30);

  if (!locked) {
    console.log('Task is being processed by another worker');
    return;
  }

  try {
    // 执行任务
    console.log('Processing task:', taskId);
    await performTask(taskId);
  } finally {
    // 释放锁
    await releaseLock(redis, lockKey);
  }
};
```

### 3. 限流器（Rate Limiter）
```typescript
const checkRateLimit = async (
  redis: Redis,
  userId: string,
  limit: number = 10,
  window: number = 60
): Promise<boolean> => {
  const key = `rate_limit:${userId}`;
  const current = await redis.incr(key);

  if (current === 1) {
    // 第一次请求，设置过期时间
    await redis.expire(key, window);
  }

  return current <= limit;
};

// 使用示例
const handleApiRequest = async (userId: string) => {
  const allowed = await checkRateLimit(redis, userId, 100, 60);

  if (!allowed) {
    throw new Error('Rate limit exceeded');
  }

  // 处理请求
  return { success: true };
};
```

### 4. 发布/订阅
```typescript
// 发布者
const publisher = new Redis();

const publishMessage = async (channel: string, message: any) => {
  await publisher.publish(channel, JSON.stringify(message));
};

// 订阅者
const subscriber = new Redis();

subscriber.subscribe('notifications', (err, count) => {
  if (err) {
    console.error('Subscribe error:', err);
    return;
  }
  console.log(`Subscribed to ${count} channel(s)`);
});

subscriber.on('message', (channel, message) => {
  console.log(`Received message from ${channel}:`, JSON.parse(message));
});

// 发送通知
await publishMessage('notifications', {
  type: 'user_registered',
  userId: '123',
  timestamp: Date.now(),
});
```

### 5. 会话管理
```typescript
import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const app = express();
const redis = new Redis();

app.use(
  session({
    store: new RedisStore({ client: redis }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // 验证用户
  const user = await authenticateUser(username, password);

  if (user) {
    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  res.json({
    userId: req.session.userId,
    username: req.session.username,
  });
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});
```

---

## 最佳实践

### 1. 键命名规范
```bash
# 使用冒号分隔命名空间
user:1001:profile
user:1001:settings
order:2023:12345

# 使用有意义的前缀
cache:user:1001
session:abc123
lock:resource:xyz

# 避免过长的键名
# ❌ 不好
this_is_a_very_long_key_name_that_wastes_memory

# ✅ 好
user:1001:prof
```

### 2. 设置合理的过期时间
```typescript
// 短期缓存（热点数据）
await redis.setex('hot:product:123', 300, data); // 5 分钟

// 中期缓存（常用数据）
await redis.setex('cache:user:456', 3600, data); // 1 小时

// 长期缓存（稳定数据）
await redis.setex('config:app', 86400, data); // 24 小时

// 会话数据
await redis.setex('session:xyz', 1800, data); // 30 分钟
```

### 3. 使用管道提高性能
```typescript
// ❌ 不好：多次网络往返
for (let i = 0; i < 1000; i++) {
  await redis.set(`key:${i}`, `value:${i}`);
}

// ✅ 好：使用管道
const pipeline = redis.pipeline();
for (let i = 0; i < 1000; i++) {
  pipeline.set(`key:${i}`, `value:${i}`);
}
await pipeline.exec();
```

### 4. 错误处理
```typescript
const safeRedisOperation = async <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error('Redis operation failed:', error);
    return fallback;
  }
};

// 使用示例
const user = await safeRedisOperation(
  () => getUserFromCache(userId),
  null
);

if (!user) {
  // 从数据库获取
  user = await getUserFromDatabase(userId);
}
```

### 5. 内存管理
```bash
# 设置最大内存
CONFIG SET maxmemory 1gb

# 设置淘汰策略
CONFIG SET maxmemory-policy allkeys-lru

# 常用淘汰策略：
# - noeviction: 不淘汰，内存满时返回错误
# - allkeys-lru: 淘汰最近最少使用的键
# - allkeys-lfu: 淘汰最不经常使用的键
# - volatile-lru: 淘汰设置了过期时间的最近最少使用的键
# - volatile-ttl: 淘汰即将过期的键
```

### 6. 监控和调试
```typescript
// 监控慢查询
const slowlog = await redis.slowlog('get', 10);
console.log('Slow queries:', slowlog);

// 监控内存使用
const info = await redis.info('memory');
console.log('Memory info:', info);

// 监控连接数
const clients = await redis.client('list');
console.log('Connected clients:', clients);

// 监控命令统计
const stats = await redis.info('stats');
console.log('Stats:', stats);
```

### 7. 持久化配置
```bash
# RDB 持久化（快照）
# 900 秒内至少 1 个键被修改
save 900 1
# 300 秒内至少 10 个键被修改
save 300 10
# 60 秒内至少 10000 个键被修改
save 60 10000

# AOF 持久化（追加文件）
appendonly yes
appendfsync everysec  # 每秒同步一次

# 混合持久化（推荐）
aof-use-rdb-preamble yes
```

### 8. 安全配置
```bash
# 设置密码
requirepass your_strong_password

# 禁用危险命令
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command CONFIG ""

# 绑定特定 IP
bind 127.0.0.1

# 启用保护模式
protected-mode yes
```

---

## 总结

Redis 是一个功能强大的内存数据库，适用于：
- ✅ 缓存热点数据
- ✅ 会话管理
- ✅ 排行榜和计数器
- ✅ 分布式锁
- ✅ 消息队列
- ✅ 实时分析

### 学习路径
1. 掌握基本数据类型和命令
2. 理解持久化和内存管理
3. 学习在应用中集成 Redis
4. 实践常见使用场景
5. 优化性能和监控

### 参考资源
- [Redis 官方文档](https://redis.io/documentation)
- [Redis 命令参考](https://redis.io/commands)
- [ioredis GitHub](https://github.com/luin/ioredis)
- [Redis 最佳实践](https://redis.io/topics/best-practices)

---

**祝你使用 Redis 愉快！** 🚀
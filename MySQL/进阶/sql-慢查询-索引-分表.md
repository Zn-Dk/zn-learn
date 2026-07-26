sql-慢查询-索引-分表可以把这三个概念理解成一个逐步升级的问题：

1. **索引**：怎样更快找到数据？
2. **慢查询**：怎样发现并解释“为什么这条 SQL 很慢”？
3. **分表**：当单表数据量太大，索引也难以解决时，怎样拆分数据？

下面以 **MySQL** 为例，由浅入深说明。

---

# 一、先理解数据库是怎样找数据的

假设有一张订单表：

```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(20),
    amount DECIMAL(10, 2),
    created_at DATETIME
);
```

有 1000 万条订单，现在查询用户 `1001` 的订单：

```sql
SELECT *
FROM orders
WHERE user_id = 1001;
```

如果 `user_id` 没有索引，数据库可能要从第一行一直检查到最后一行，这叫：

> **全表扫描**

类似于在一本没有目录的书里，逐页寻找某个关键词。

---

# 二、索引：数据库的“目录”

## 1. 创建一个普通索引

```sql
CREATE INDEX idx_orders_user_id
ON orders(user_id);
```

创建后，再执行：

```sql
SELECT *
FROM orders
WHERE user_id = 1001;
```

数据库可以先通过索引找到符合条件的数据位置，再读取对应记录。

索引本质上是一种额外的数据结构。MySQL InnoDB 中最常见的是 **B+ 树索引**。

你暂时不必理解 B+ 树的全部细节，只要知道它有两个核心特点：

- 数据是有序的
- 可以快速缩小查找范围

因此，索引特别适合：

```sql
WHERE user_id = 1001
```

以及范围查询：

```sql
WHERE created_at >= '2026-01-01'
  AND created_at <  '2026-02-01'
```

---

## 2. 索引并不是越多越好

索引可以加快查询，但需要付出代价。

### 占用磁盘空间

索引本身也要保存数据。

### 降低写入速度

执行：

```sql
INSERT
UPDATE
DELETE
```

时，数据库除了修改表数据，还要维护相关索引。

因此：

> 经常用于查询条件、关联、排序的列适合建立索引；不能看到一列就建立索引。

---

## 3. 哪些列通常适合建立索引？

### 经常出现在 WHERE 中

```sql
SELECT *
FROM orders
WHERE user_id = 1001;
```

可以考虑：

```sql
CREATE INDEX idx_orders_user_id
ON orders(user_id);
```

### 经常用于 JOIN

```sql
SELECT *
FROM orders o
JOIN users u ON o.user_id = u.id;
```

通常应确保：

- `users.id` 有索引，一般是主键
- `orders.user_id` 有索引

### 经常用于排序

```sql
SELECT *
FROM orders
WHERE user_id = 1001
ORDER BY created_at DESC;
```

可能适合建立联合索引：

```sql
CREATE INDEX idx_orders_user_created
ON orders(user_id, created_at);
```

---

# 三、联合索引：多个列组成一个目录

假设常见查询是：

```sql
SELECT *
FROM orders
WHERE user_id = 1001
  AND status = 'PAID'
ORDER BY created_at DESC;
```

可以考虑：

```sql
CREATE INDEX idx_orders_user_status_created
ON orders(user_id, status, created_at);
```

这个索引按照下面的顺序组织：

```text
user_id → status → created_at
```

## 最左前缀原则

对于索引：

```sql
(user_id, status, created_at)
```

以下查询通常比较容易使用索引：

```sql
WHERE user_id = 1001
```

```sql
WHERE user_id = 1001
  AND status = 'PAID'
```

```sql
WHERE user_id = 1001
  AND status = 'PAID'
  AND created_at >= '2026-01-01'
```

但是下面的查询通常无法完整利用这个联合索引：

```sql
WHERE status = 'PAID'
```

因为它跳过了索引最左边的 `user_id`。

可以把联合索引想象成电话簿按照：

```text
省份 → 城市 → 姓名
```

排序。

你可以按省份查，也可以按省份和城市查；但只给一个城市，不给省份，查起来就困难了。

---

# 四、索引为什么有时“不生效”？

“创建了索引”不代表数据库一定会使用它。是否使用索引由优化器根据成本判断。

以下情况需要特别注意。

## 1. 对索引列做函数运算

假设 `created_at` 有索引：

```sql
WHERE DATE(created_at) = '2026-07-26'
```

对列执行了 `DATE()`，可能无法高效使用原索引。

更推荐写成范围：

```sql
WHERE created_at >= '2026-07-26 00:00:00'
  AND created_at <  '2026-07-27 00:00:00'
```

---

## 2. 隐式类型转换

假设 `phone` 是字符串：

```sql
phone VARCHAR(20)
```

不推荐：

```sql
WHERE phone = 13800138000;
```

推荐保持类型一致：

```sql
WHERE phone = '13800138000';
```

类型不一致可能产生隐式转换，影响索引使用。

---

## 3. 前导模糊匹配

```sql
WHERE name LIKE '%张%'
```

普通 B+ 树索引通常很难有效支持这种查询。

下面这种前缀匹配更容易使用索引：

```sql
WHERE name LIKE '张%'
```

如果需要全文搜索，可能要考虑：

- MySQL FULLTEXT
- Elasticsearch
- OpenSearch

---

## 4. 某个值占比太高

假设 `gender` 只有两个值：

```text
男、女
```

或者 `status` 的 95% 都是 `NORMAL`。

单独给这种低区分度字段建立索引，效果可能不好。因为即使使用索引，也要读取大量数据，数据库可能认为直接全表扫描更便宜。

---

## 5. 查询返回的数据太多

```sql
SELECT *
FROM orders
WHERE status = 'PAID';
```

如果绝大部分订单都是 `PAID`，即使 `status` 有索引，查询依然可能很慢。

索引不是魔法：

> 如果查询最终需要返回几百万行，数据库无论如何都要读取和传输这些数据。

应该考虑：

- 增加更精确的条件
- 分页
- 只选择需要的列
- 聚合或离线统计

---

# 五、聚簇索引、回表和覆盖索引

这是从入门到进阶的重要一步。

## 1. 主键索引

在 MySQL InnoDB 中，表数据通常按照主键索引组织。主键索引的叶子节点保存完整行数据，因此也叫：

> 聚簇索引

例如：

```sql
SELECT *
FROM orders
WHERE id = 123;
```

通过主键可以直接找到整行数据。

---

## 2. 二级索引和回表

索引：

```sql
CREATE INDEX idx_orders_user_id
ON orders(user_id);
```

这个二级索引通常保存：

```text
user_id + 主键 id
```

执行：

```sql
SELECT *
FROM orders
WHERE user_id = 1001;
```

大致分两步：

1. 从 `user_id` 索引找到对应的主键 `id`
2. 再到主键索引中读取完整数据

第二步叫：

> **回表**

如果结果很多，就可能发生大量回表。

---

## 3. 覆盖索引

如果只查询：

```sql
SELECT id, user_id
FROM orders
WHERE user_id = 1001;
```

而 `user_id` 索引中已经包含了 `user_id` 和主键 `id`，数据库可能只读取索引，不需要回表。

这叫：

> **覆盖索引**

因此，不要习惯性地写：

```sql
SELECT *
```

应尽量只查询真正需要的字段：

```sql
SELECT id, status, amount
FROM orders
WHERE user_id = 1001;
```

必要时也可以建立包含这些字段的联合索引，但要权衡索引大小和写入成本。

---

# 六、慢查询：不是一种 SQL，而是一种现象

“慢查询”是指执行时间超过预期的 SQL。

慢不一定只有一个原因，常见原因包括：

1. 没有合适的索引
2. 查询返回数据太多
3. JOIN 数据量太大
4. 排序或分组产生大量临时数据
5. 深分页
6. 锁等待
7. 数据库 CPU、内存或磁盘压力过大
8. SQL 本身不复杂，但并发量太高
9. 数据统计信息不准确，优化器选错执行计划

因此，分析慢查询不能只说：

> “加个索引试试。”

---

# 七、用 EXPLAIN 查看 SQL 怎样执行

对于查询：

```sql
SELECT *
FROM orders
WHERE user_id = 1001
ORDER BY created_at DESC;
```

可以执行：

```sql
EXPLAIN
SELECT *
FROM orders
WHERE user_id = 1001
ORDER BY created_at DESC;
```

MySQL 8 还可以使用：

```sql
EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE user_id = 1001
ORDER BY created_at DESC;
```

`EXPLAIN` 是估算的执行计划，`EXPLAIN ANALYZE` 会真正执行并显示实际耗时，应注意对生产环境的影响。

初学时重点关注这些字段。

## 1. type

大致从较好到较差：

```text
const
eq_ref
ref
range
index
ALL
```

其中：

- `ref`：通过非唯一索引查找
- `range`：索引范围扫描
- `index`：扫描整个索引
- `ALL`：全表扫描

看到 `ALL` 不一定绝对有问题，例如表只有几十行。但如果是一张千万级表，就要重点检查。

---

## 2. key

表示实际选择了哪个索引。

如果是：

```text
NULL
```

说明没有使用索引。

---

## 3. rows

表示预计要检查多少行。

通常来说，检查行数越大，潜在成本越高。

---

## 4. Extra

常见内容包括：

### Using index

可能使用了覆盖索引，不需要回表。

### Using filesort

需要额外排序，不一定真的是磁盘排序，但意味着没有完全利用索引顺序。

### Using temporary

可能使用临时表，常见于复杂的：

```sql
GROUP BY
DISTINCT
ORDER BY
```

出现这些信息不代表 SQL 必然有问题，但需要结合数据量和耗时判断。

---

# 八、典型慢 SQL 及优化思路

## 1. 没有索引

原 SQL：

```sql
SELECT *
FROM orders
WHERE user_id = 1001;
```

优化：

```sql
CREATE INDEX idx_orders_user_id
ON orders(user_id);
```

---

## 2. 联合查询和排序

原 SQL：

```sql
SELECT id, status, amount, created_at
FROM orders
WHERE user_id = 1001
  AND status = 'PAID'
ORDER BY created_at DESC
LIMIT 20;
```

可以考虑：

```sql
CREATE INDEX idx_orders_user_status_created
ON orders(user_id, status, created_at);
```

这样索引既能帮助过滤，也可能帮助排序。

---

## 3. 深分页

下面的 SQL 在页码很大时可能很慢：

```sql
SELECT *
FROM orders
ORDER BY id
LIMIT 1000000, 20;
```

它并不是直接跳到第 100 万行，而可能需要扫描并丢弃前面大量记录。

如果是按主键连续翻页，推荐“游标分页”：

```sql
SELECT *
FROM orders
WHERE id > 1000000
ORDER BY id
LIMIT 20;
```

前端保存上一页最后一个 `id`，下一页从这个 `id` 之后继续查。

如果业务必须跳到任意页，可以先使用覆盖索引找 ID，再回表：

```sql
SELECT o.*
FROM orders o
JOIN (
    SELECT id
    FROM orders
    ORDER BY id
    LIMIT 1000000, 20
) t ON o.id = t.id
ORDER BY o.id;
```

这不是万能方案，但在行很宽时可能减少扫描成本。

---

## 4. 用 OR 查询多个字段

```sql
SELECT *
FROM users
WHERE phone = '13800138000'
   OR email = 'a@example.com';
```

如果两个字段都有独立索引，优化器有时可以使用索引合并，但不一定理想。可以根据实际执行计划考虑改成：

```sql
SELECT *
FROM users
WHERE phone = '13800138000'

UNION ALL

SELECT *
FROM users
WHERE email = 'a@example.com'
  AND phone <> '13800138000';
```

是否更快要通过 `EXPLAIN ANALYZE` 和实际数据验证，不能机械改写。

---

# 九、慢查询应该怎样系统排查？

推荐按照这个顺序。

## 第一步：确认“慢在哪里”

记录：

- SQL 执行时间
- 返回行数
- 扫描行数
- 调用频率
- 是否等待锁
- 是否只有高峰期慢

一条执行 2 秒、每天执行一次的 SQL，和一条执行 100 毫秒、每秒执行 1000 次的 SQL，后者可能危害更大。

---

## 第二步：获取真实 SQL 和参数

下面两条 SQL 的执行特征可能完全不同：

```sql
WHERE status = 'RARE'
```

```sql
WHERE status = 'NORMAL'
```

因为数据分布不同，所以排查时不能只有 SQL 模板，还应关注具体参数。

---

## 第三步：查看执行计划

```sql
EXPLAIN ANALYZE ...
```

重点观察：

- 是否全表扫描
- 使用了哪个索引
- 预计行数和实际行数差距是否很大
- 哪一步耗时最多
- 是否有大量排序、临时表、回表

---

## 第四步：检查索引和 SQL 写法

思考：

- WHERE 条件是否有合适索引？
- 联合索引顺序是否符合查询方式？
- 是否在索引列上使用函数？
- 是否查询了不需要的列？
- 是否返回太多行？
- JOIN 字段类型是否一致？
- 是否存在深分页？
- 是否能先过滤再关联？

---

## 第五步：检查锁和数据库资源

如果执行计划看起来正常，但仍然很慢，还要检查：

- 是否被其他事务阻塞
- 是否有长事务
- CPU 是否接近 100%
- 磁盘 I/O 是否过高
- 内存是否不足
- 数据库连接数是否过多

慢查询不一定是查询计划的问题，也可能是资源或并发问题。

---

# 十、慢查询日志

MySQL 可以记录超过指定时间的 SQL，常见配置思路如下：

```ini
slow_query_log = ON
long_query_time = 1
```

表示记录执行时间超过 1 秒的查询。

也可以关注：

```ini
log_queries_not_using_indexes
```

但开启后可能产生大量日志，而且“未使用索引”不等于“有问题”，例如小表全表扫描可能完全合理。

生产环境修改配置前，应确认 MySQL 版本、日志路径、磁盘空间以及性能影响。

常见分析工具：

- `mysqldumpslow`
- `pt-query-digest`
- 数据库监控平台/APM

分析时通常先按照以下指标排序：

- 总耗时
- 平均耗时
- 调用次数
- 扫描行数

---

# 十一、什么时候索引也解决不了？

假设订单表增长到几十亿行，即使有索引，也可能遇到：

- 索引非常大，难以全部放入内存
- 查询需要扫描大量历史数据
- 单机磁盘容量不够
- 写入压力过高
- 索引维护成本过高
- 备份和表结构变更耗时很长

这时候才可能考虑：

> 分区、归档、读写分离、分库分表等架构方案。

注意：不要一遇到慢 SQL 就分表。

通常优化顺序应是：

```text
优化 SQL
→ 建立合适索引
→ 减少无效数据访问
→ 缓存/归档
→ 升级硬件或数据库架构
→ 最后考虑分库分表
```

---

# 十二、分表是什么？

分表是把一张逻辑上的大表拆成多张物理表。

例如原来只有：

```text
orders
```

拆成：

```text
orders_00
orders_01
orders_02
...
orders_15
```

应用程序根据某个规则决定数据放到哪张表。

---

# 十三、垂直拆分和水平拆分

## 1. 垂直拆分：按照列拆

假设用户表字段很多：

```text
users
├── id
├── username
├── phone
├── avatar
├── introduction
├── preferences
└── ...
```

可以拆成：

```text
users
├── id
├── username
└── phone
```

以及：

```text
user_profiles
├── user_id
├── avatar
├── introduction
└── preferences
```

适合场景：

- 部分字段很大
- 部分字段很少访问
- 核心字段和扩展字段访问频率不同

这叫垂直分表。

---

## 2. 水平拆分：按照行拆

订单表按照用户 ID 拆成 16 张：

```text
表编号 = user_id % 16
```

例如：

```text
user_id = 1001
1001 % 16 = 9
```

那么数据进入：

```text
orders_09
```

示意代码：

```text
tableName = "orders_" + (userId % 16)
```

各张表结构相同，但保存不同用户的数据。

这叫水平分表。

---

# 十四、常见水平分表规则

## 1. 按 ID 取模

```text
table = order_id % 16
```

优点：

- 分布通常较均匀
- 路由简单
- 单表数据量容易控制

缺点：

- 按时间查询所有订单时，需要查多个表
- 从 16 张扩容到 32 张时，很多数据的目标表会变化
- 如果查询没有分片键，可能需要扫描所有表

---

## 2. 按用户 ID 取模

```text
table = user_id % 16
```

适合经常按照用户查询订单的系统：

```sql
WHERE user_id = ?
```

同一个用户的数据在同一张表里。

缺点：

- 超级大客户可能造成热点
- 如果只知道订单 ID，不知道用户 ID，可能无法直接确定表
- 全局统计需要扫描多张表

---

## 3. 按时间拆表

```text
orders_2026_01
orders_2026_02
orders_2026_03
```

适合：

- 日志
- 流水
- 历史订单
- 主要按照时间范围查询的数据

优点：

- 历史数据容易归档或删除
- 时间范围查询路由清晰

缺点：

- 当前月份可能成为热点
- 跨月查询要访问多张表
- 每张表数据量可能不均匀
- 自动建表和跨表查询更复杂

---

## 4. 范围拆分

```text
orders_0     保存 ID 1～1000 万
orders_1     保存 ID 1000 万～2000 万
orders_2     保存 ID 2000 万～3000 万
```

优点是规则直观，范围查询比较方便。

缺点是最新范围可能成为写入热点。

---

# 十五、分区表和分表不完全相同

MySQL 分区表可能写成：

```sql
CREATE TABLE orders (
    id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    amount DECIMAL(10, 2),
    PRIMARY KEY (id, created_at)
)
PARTITION BY RANGE COLUMNS(created_at) (
    PARTITION p202601 VALUES LESS THAN ('2026-02-01'),
    PARTITION p202602 VALUES LESS THAN ('2026-03-01'),
    PARTITION pmax VALUES LESS THAN (MAXVALUE)
);
```

从应用角度仍然查询同一张表：

```sql
SELECT *
FROM orders
WHERE created_at >= '2026-01-01'
  AND created_at < '2026-02-01';
```

数据库负责定位相关分区。

区别可以简单理解为：

| 方式 | 应用看到的表 | 路由负责方 |
|---|---|---|
| 分区表 | 一张表 | 数据库 |
| 物理分表 | 多张表 | 应用或中间件 |
| 分库分表 | 多库多表 | 应用或中间件 |

分区主要改善数据管理和特定范围访问，并不意味着所有查询都会自动变快。查询条件不包含分区键时，可能扫描多个分区。

---

# 十六、分表带来的新问题

分表不是免费的，它会把数据库问题变成系统架构问题。

## 1. 查询必须知道路由键

如果按照：

```text
user_id % 16
```

分表，那么：

```sql
WHERE user_id = 1001
```

容易定位到一张表。

但如果查询：

```sql
WHERE status = 'PAID'
```

没有 `user_id`，就可能需要查询全部 16 张表，再合并结果。

这叫：

> 跨分片查询或广播查询

因此，选择分片键时最重要的问题是：

> 系统最常见的查询条件是什么？

---

## 2. 跨表分页困难

例如查询全部订单：

```sql
ORDER BY created_at DESC
LIMIT 100, 20
```

如果数据在 16 张表中，可能需要：

1. 每张表取一批数据
2. 合并
3. 全局排序
4. 再截取第 100～120 条

页码越深，成本可能越高。

---

## 3. JOIN 变复杂

原来可以：

```sql
SELECT *
FROM orders o
JOIN users u ON o.user_id = u.id;
```

分库分表后，两份数据可能不在同一个数据库实例，普通 JOIN 可能无法直接完成。

常见解决方式：

- 相同分片键，让相关数据尽量放在同一分片
- 应用分别查询后合并
- 冗余少量数据
- 用搜索或分析系统完成复杂查询

---

## 4. 全局唯一 ID

多个分表不能都简单使用从 1 开始的自增 ID，否则会重复。

常见方案：

- UUID
- 雪花算法 Snowflake
- 数据库号段模式
- 单独的 ID 服务

如果 ID 还用于排序，要注意 UUID 的随机性可能影响索引写入性能。实际系统中常用有序或趋势递增 ID。

---

## 5. 分布式事务

单库事务：

```sql
BEGIN;
UPDATE account_a ...;
UPDATE account_b ...;
COMMIT;
```

比较容易保证原子性。

如果两个账户分布在不同数据库，事务会变复杂。可能需要：

- 分布式事务
- TCC
- Saga
- 本地消息表
- 事务消息
- 最终一致性与补偿机制

因此，分库分表会显著增加系统复杂度。

---

## 6. 扩容和数据迁移

如果原来：

```text
user_id % 4
```

扩展到：

```text
user_id % 8
```

大量数据的目标分片会改变，需要迁移。

更成熟的系统可能使用：

- 一致性哈希
- 虚拟分片
- 逻辑分片到物理节点的映射
- 双写与灰度迁移

初学阶段只需记住：

> 分片数量一旦确定，后续扩容并不简单，应该提前考虑迁移方案。

---

# 十七、一个完整的演进示例

假设你开发一个订单系统。

## 阶段 1：数据量较小

一张表即可：

```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at DATETIME NOT NULL,
    INDEX idx_user_created (user_id, created_at)
);
```

主要查询：

```sql
SELECT id, status, amount, created_at
FROM orders
WHERE user_id = 1001
ORDER BY created_at DESC
LIMIT 20;
```

---

## 阶段 2：出现慢查询

使用：

```sql
EXPLAIN ANALYZE
SELECT ...
```

发现：

- 扫描行数过多
- 索引不合适
- 查询了太多字段
- 使用了深分页

于是：

- 调整联合索引
- 改为游标分页
- 只查询必要字段
- 归档很久以前的历史订单

---

## 阶段 3：读请求过多

可以考虑：

- 缓存热点数据
- 读写分离
- 报表查询放到分析库
- 搜索需求放到 Elasticsearch
- 创建汇总表，避免重复扫描明细

---

## 阶段 4：单表和单机达到瓶颈

如果业务主要按用户查询订单，可以按：

```text
user_id % N
```

分库分表。

同时要设计：

- 分片键
- 全局 ID
- 跨分片查询
- 数据迁移
- 故障恢复
- 事务一致性
- 监控和对账

---

# 十八、初学者容易产生的误区

## 误区 1：有索引就一定快

不一定。返回百万行、数据分布极不均匀、发生大量回表时，依然会慢。

## 误区 2：索引越多越好

索引会增加存储空间和写入成本，还可能让优化器选择更复杂。

## 误区 3：看到全表扫描就必须优化

如果表很小，或者需要读取表中绝大多数数据，全表扫描可能是合理选择。

## 误区 4：慢查询只需要加索引

也可能是锁等待、深分页、数据量过大、网络传输或数据库资源不足。

## 误区 5：分表一定能解决慢查询

如果分片键选择错误，查询可能从扫描一张表变成扫描几十张表，反而更慢。

## 误区 6：数据到百万级就必须分表

没有固定数字。是否分表取决于：

- 单行大小
- 查询模式
- 索引大小
- 写入量
- 并发量
- 硬件资源
- 运维能力

设计合理的单表即使达到千万甚至更高数量级，也可能正常运行。

---

# 十九、推荐的学习顺序

## 第一阶段：掌握基础 SQL

学习：

```sql
SELECT
WHERE
ORDER BY
GROUP BY
HAVING
JOIN
LIMIT
```

理解：

- 主键
- 外键
- NULL
- 事务
- 锁的基本概念

## 第二阶段：掌握索引

重点学习：

- B+ 树的大致原理
- 主键索引和二级索引
- 联合索引
- 最左前缀
- 回表
- 覆盖索引
- 索引下推
- 索引选择性

## 第三阶段：学会分析慢查询

练习：

```sql
EXPLAIN
EXPLAIN ANALYZE
SHOW INDEX FROM orders;
```

能够判断：

- 扫描了多少行
- 使用哪个索引
- 是否发生额外排序
- 是否有临时表
- 实际瓶颈在哪一步

## 第四阶段：学习数据库运行机制

包括：

- 事务隔离级别
- MVCC
- 行锁与间隙锁
- Buffer Pool
- redo log、undo log、binlog
- 主从复制
- 读写分离

## 第五阶段：最后学习分库分表

重点不是“怎样拆成 16 张表”，而是：

- 为什么需要拆？
- 用什么分片键？
- 没有分片键时怎样查询？
- 如何扩容？
- 如何保证一致性？
- 如何迁移和回滚？

---

# 二十、一句话总结

可以记住这条主线：

> **索引是减少数据扫描，慢查询分析是找出时间消耗在哪里，分表是把超大数据集拆小，但会增加路由、事务、查询和运维复杂度。**

实际工作中通常遵循：

```text
先测量
→ 看执行计划
→ 优化 SQL
→ 设计合适索引
→ 控制返回数据量
→ 归档、缓存或读写分离
→ 确认单机确实达到瓶颈
→ 再考虑分库分表
```

最重要的原则是：

> 不凭感觉优化，使用真实数据和 `EXPLAIN ANALYZE` 验证。
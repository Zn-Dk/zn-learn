下面给出一套可直接运行的 **Docker + MySQL 8.4 SQL 性能实验环境**，可以测试：

- 无索引与有索引的区别
- 联合索引、最左前缀
- 回表与覆盖索引
- 索引失效
- 深分页与游标分页
- 慢查询日志
- 锁等待
- MySQL 分区表
- 水平分表

建议为 Docker 分配至少：

- 2 GB 内存
- 2 GB 可用磁盘

示例默认生成 **50 万条订单**。配置较低时，可以改成 10 万条。

---

# 一、项目目录

创建目录：

```bash
mkdir -p mysql-sql-demo/{conf,sql}
cd mysql-sql-demo
```

最终结构：

```text
mysql-sql-demo/
├── docker-compose.yml
├── conf/
│   └── demo.cnf
└── sql/
    ├── 00-init.sql
    ├── 01-index-test.sql
    ├── 02-pagination-test.sql
    ├── 03-partition-test.sql
    └── 04-sharding-test.sql
```

---

# 二、Docker Compose 配置

创建 `docker-compose.yml`：

```yaml
services:
  mysql:
    image: mysql:8.4
    container_name: mysql-sql-demo
    restart: unless-stopped

    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: sql_demo
      MYSQL_USER: demo
      MYSQL_PASSWORD: demo123
      TZ: Asia/Shanghai

    ports:
      - "3307:3306"

    volumes:
      - mysql_demo_data:/var/lib/mysql
      - ./conf/demo.cnf:/etc/mysql/conf.d/demo.cnf:ro
      - ./sql:/sql:ro

    healthcheck:
      test:
        [
          "CMD-SHELL",
          "mysqladmin ping -h localhost -uroot -p$$MYSQL_ROOT_PASSWORD --silent"
        ]
      interval: 5s
      timeout: 5s
      retries: 30

volumes:
  mysql_demo_data:
```

这里使用宿主机的 `3307` 端口，避免和本地 MySQL 的 `3306` 冲突。

---

# 三、MySQL 配置

创建 `conf/demo.cnf`：

```ini
[mysqld]
character-set-server = utf8mb4
collation-server = utf8mb4_0900_ai_ci

# 开启慢查询日志
slow_query_log = ON
long_query_time = 0.1

# 将慢查询写入 mysql.slow_log 表，方便实验查询
log_output = TABLE

# 实验环境下方便观察锁等待
innodb_lock_wait_timeout = 5

# 开启 Performance Schema
performance_schema = ON

[client]
default-character-set = utf8mb4
```

含义：

```text
long_query_time = 0.1
```

表示超过 0.1 秒的查询会被记录。

这是为了实验方便。生产环境阈值应该根据业务情况配置，不能机械使用 0.1 秒。

---

# 四、初始化 50 万条测试数据

创建 `sql/00-init.sql`：

```sql
USE sql_demo;

DROP TABLE IF EXISTS orders_no_index;
DROP TABLE IF EXISTS orders_indexed;
DROP TABLE IF EXISTS digits;

-- 用于快速生成数字
CREATE TABLE digits (
    n INT NOT NULL PRIMARY KEY
);

INSERT INTO digits(n) VALUES
(0), (1), (2), (3), (4),
(5), (6), (7), (8), (9);

-- 故意不建立业务二级索引
-- 但主键本身仍然是索引
CREATE TABLE orders_no_index (
    id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(200),
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

-- 生成 50 万条数据
INSERT INTO orders_no_index (
    id,
    user_id,
    status,
    amount,
    description,
    created_at
)
SELECT
    x.n AS id,

    -- 约 5 万个用户，每个用户大约 10 个订单
    MOD(x.n * 7919, 50000) + 1 AS user_id,

    -- 模拟不均匀的状态分布
    CASE
        WHEN MOD(x.n, 100) < 70 THEN 'CREATED'
        WHEN MOD(x.n, 100) < 90 THEN 'PAID'
        WHEN MOD(x.n, 100) < 97 THEN 'CANCELLED'
        ELSE 'REFUNDED'
    END AS status,

    ROUND(MOD(x.n * 37, 100000) / 100 + 1, 2) AS amount,

    CONCAT(
        '这是订单 ',
        x.n,
        ' 的测试描述，用于让数据行稍微宽一些'
    ) AS description,

    DATE_ADD(
        '2025-01-01 00:00:00',
        INTERVAL x.n MINUTE
    ) AS created_at
FROM (
    SELECT
        a.n
        + b.n * 10
        + c.n * 100
        + d.n * 1000
        + e.n * 10000
        + f.n * 100000 AS n
    FROM digits a
    CROSS JOIN digits b
    CROSS JOIN digits c
    CROSS JOIN digits d
    CROSS JOIN digits e
    CROSS JOIN digits f
) x
WHERE x.n BETWEEN 1 AND 500000;

-- 创建一份相同数据，用来测试有索引的情况
CREATE TABLE orders_indexed LIKE orders_no_index;

INSERT INTO orders_indexed
SELECT *
FROM orders_no_index;

-- 建立实验所需索引
CREATE INDEX idx_orders_user
ON orders_indexed(user_id);

CREATE INDEX idx_orders_created
ON orders_indexed(created_at);

CREATE INDEX idx_orders_user_status_created
ON orders_indexed(user_id, status, created_at);

ANALYZE TABLE orders_no_index;
ANALYZE TABLE orders_indexed;

SELECT COUNT(*) AS total_orders
FROM orders_no_index;

SHOW INDEX FROM orders_indexed;
```

如果电脑配置较低，可以把：

```sql
WHERE x.n BETWEEN 1 AND 500000
```

改成：

```sql
WHERE x.n BETWEEN 1 AND 100000
```

但分页实验中的偏移量也要相应减小。

---

# 五、启动 MySQL

启动容器：

```bash
docker compose up -d
```

查看启动状态：

```bash
docker compose ps
```

查看日志：

```bash
docker compose logs -f mysql
```

等待出现类似信息：

```text
ready for connections
```

因为初始化 50 万条数据需要一段时间，首次启动可能需要几十秒。

检查数据：

```bash
docker compose exec mysql \
  mysql -udemo -pdemo123 sql_demo \
  -e "SELECT COUNT(*) FROM orders_no_index;"
```

预期：

```text
COUNT(*)
500000
```

---

# 六、进入 MySQL

使用命令行连接：

```bash
docker compose exec mysql \
  mysql -udemo -pdemo123 sql_demo
```

也可以用本地数据库工具连接：

```text
Host:     127.0.0.1
Port:     3307
Database: sql_demo
Username: demo
Password: demo123
```

可以使用：

- DataGrip
- DBeaver
- Navicat
- MySQL Workbench

---

# 七、实验一：无索引与有索引

创建 `sql/01-index-test.sql`：

```sql
USE sql_demo;

-- =========================================================
-- 1. 查看索引
-- =========================================================

SHOW INDEX FROM orders_no_index;
SHOW INDEX FROM orders_indexed;

-- orders_no_index 只有主键索引
-- orders_indexed 有 user_id、created_at 和联合索引


-- =========================================================
-- 2. 无索引查询
-- =========================================================

EXPLAIN
SELECT *
FROM orders_no_index
WHERE user_id = 1001;

EXPLAIN ANALYZE
SELECT *
FROM orders_no_index
WHERE user_id = 1001;


-- =========================================================
-- 3. 有索引查询
-- =========================================================

EXPLAIN
SELECT *
FROM orders_indexed
WHERE user_id = 1001;

EXPLAIN ANALYZE
SELECT *
FROM orders_indexed
WHERE user_id = 1001;


-- =========================================================
-- 4. 联合索引
-- 索引顺序：(user_id, status, created_at)
-- =========================================================

EXPLAIN ANALYZE
SELECT id, user_id, status, amount, created_at
FROM orders_indexed
WHERE user_id = 1001
  AND status = 'PAID'
ORDER BY created_at DESC
LIMIT 20;


-- =========================================================
-- 5. 最左前缀
-- =========================================================

-- 可以使用联合索引的左侧 user_id
EXPLAIN
SELECT *
FROM orders_indexed
WHERE user_id = 1001;


-- 可以使用 user_id + status
EXPLAIN
SELECT *
FROM orders_indexed
WHERE user_id = 1001
  AND status = 'PAID';


-- status 跳过了最左边的 user_id
-- 通常无法有效使用联合索引
EXPLAIN
SELECT *
FROM orders_indexed
WHERE status = 'PAID';


-- =========================================================
-- 6. 回表
-- =========================================================

-- SELECT * 需要取得 description、amount 等字段
-- 二级索引没有这些字段，通常需要回表
EXPLAIN
SELECT *
FROM orders_indexed
WHERE user_id = 1001;


-- =========================================================
-- 7. 覆盖索引
-- =========================================================

-- 联合索引包含 user_id、status、created_at
-- InnoDB 二级索引中还包含主键 id
-- 因此下面的查询可能只读取索引
EXPLAIN
SELECT id, user_id, status, created_at
FROM orders_indexed
WHERE user_id = 1001
  AND status = 'PAID';


-- 对比 SELECT *
EXPLAIN
SELECT *
FROM orders_indexed
WHERE user_id = 1001
  AND status = 'PAID';


-- =========================================================
-- 8. 对索引列使用函数
-- =========================================================

-- created_at 有索引
-- 但是对索引列执行 DATE()，可能无法高效使用普通索引
EXPLAIN ANALYZE
SELECT *
FROM orders_indexed
WHERE DATE(created_at) = '2025-06-01';


-- 改写成范围查询
EXPLAIN ANALYZE
SELECT *
FROM orders_indexed
WHERE created_at >= '2025-06-01 00:00:00'
  AND created_at <  '2025-06-02 00:00:00';


-- =========================================================
-- 9. 低区分度字段
-- =========================================================

-- 大量数据的 status 都是 CREATED
-- 即使单独给 status 加索引，也不一定有很大收益
EXPLAIN ANALYZE
SELECT *
FROM orders_indexed
WHERE status = 'CREATED';


-- =========================================================
-- 10. 统计各状态的数据分布
-- =========================================================

SELECT
    status,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM orders_indexed
GROUP BY status
ORDER BY count DESC;
```

执行：

```bash
docker compose exec -T mysql \
  mysql -udemo -pdemo123 sql_demo \
  < sql/01-index-test.sql
```

也可以进入 MySQL 后逐条执行，更容易观察结果。

---

## 重点观察

### 无索引表

```sql
EXPLAIN
SELECT *
FROM orders_no_index
WHERE user_id = 1001;
```

通常可以看到：

```text
type: ALL
key: NULL
rows: 接近 500000
```

表示接近全表扫描。

### 有索引表

```sql
EXPLAIN
SELECT *
FROM orders_indexed
WHERE user_id = 1001;
```

通常可以看到：

```text
type: ref
key: idx_orders_user 或联合索引
rows: 约 10
```

数据库不需要扫描全部 50 万行。

### 覆盖索引

```sql
EXPLAIN
SELECT id, user_id, status, created_at
FROM orders_indexed
WHERE user_id = 1001
  AND status = 'PAID';
```

`Extra` 中可能看到：

```text
Using index
```

这通常表示使用了覆盖索引。

具体选择哪个索引由优化器决定，不同 MySQL 版本、数据统计信息下可能略有差异。

---

# 八、实验二：深分页

创建 `sql/02-pagination-test.sql`：

```sql
USE sql_demo;

-- =========================================================
-- 1. 普通第一页
-- =========================================================

EXPLAIN ANALYZE
SELECT *
FROM orders_indexed
ORDER BY id
LIMIT 20;


-- =========================================================
-- 2. 深分页
-- 扫描并丢弃前面约 40 万条
-- =========================================================

EXPLAIN ANALYZE
SELECT *
FROM orders_indexed
ORDER BY id
LIMIT 400000, 20;


-- =========================================================
-- 3. 游标分页
-- 假设上一页最后一个 id 是 400000
-- =========================================================

EXPLAIN ANALYZE
SELECT *
FROM orders_indexed
WHERE id > 400000
ORDER BY id
LIMIT 20;


-- =========================================================
-- 4. 先通过主键索引找 ID，再回表
-- 适用于必须使用偏移量分页的部分情况
-- =========================================================

EXPLAIN ANALYZE
SELECT o.*
FROM orders_indexed o
JOIN (
    SELECT id
    FROM orders_indexed
    ORDER BY id
    LIMIT 400000, 20
) page_ids
    ON o.id = page_ids.id
ORDER BY o.id;
```

执行：

```bash
docker compose exec -T mysql \
  mysql -udemo -pdemo123 sql_demo \
  < sql/02-pagination-test.sql
```

重点对比：

```sql
LIMIT 400000, 20
```

与：

```sql
WHERE id > 400000
ORDER BY id
LIMIT 20
```

游标分页的优势在于，可以直接从主键 `400000` 后面继续读取，而不是扫描并丢弃前面的 40 万行。

但游标分页通常不支持“任意跳转到第 10000 页”，更适合：

- 下拉加载
- 下一页
- 时间线
- 消息列表
- 订单连续翻页

---

# 九、实验三：慢查询日志

## 1. 清空慢查询日志

使用 root 用户：

```bash
docker compose exec mysql \
  mysql -uroot -proot123 \
  -e "TRUNCATE TABLE mysql.slow_log;"
```

---

## 2. 执行一个确定超过 0.1 秒的查询

```bash
docker compose exec mysql \
  mysql -udemo -pdemo123 sql_demo \
  -e "SELECT SLEEP(0.3);"
```

再执行无索引查询：

```bash
docker compose exec mysql \
  mysql -udemo -pdemo123 sql_demo \
  -e "SELECT SQL_NO_CACHE COUNT(*) FROM orders_no_index WHERE user_id = 1001;"
```

`SQL_NO_CACHE` 在现代 MySQL 中已经没有旧查询缓存的作用，实验核心仍然是观察扫描成本；如果当前版本提示不支持，可以删掉它：

```sql
SELECT COUNT(*)
FROM orders_no_index
WHERE user_id = 1001;
```

---

## 3. 查看慢查询日志

```bash
docker compose exec mysql \
  mysql -uroot -proot123 \
  -e "
SELECT
    start_time,
    query_time,
    lock_time,
    rows_sent,
    rows_examined,
    db,
    sql_text
FROM mysql.slow_log
ORDER BY start_time DESC
LIMIT 20;
"
```

重点关注：

- `query_time`：执行时间
- `lock_time`：锁等待时间
- `rows_sent`：返回行数
- `rows_examined`：扫描行数
- `sql_text`：SQL 内容

对于无索引查询，通常会出现：

```text
rows_sent: 1
rows_examined: 500000
```

这表示虽然只返回了一行统计结果，却扫描了大量数据。

---

## 4. 临时修改慢查询阈值

查看当前配置：

```bash
docker compose exec mysql \
  mysql -uroot -proot123 \
  -e "
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';
SHOW VARIABLES LIKE 'log_output';
"
```

临时调整成 50 毫秒：

```bash
docker compose exec mysql \
  mysql -uroot -proot123 \
  -e "SET GLOBAL long_query_time = 0.05;"
```

注意：

- `SET GLOBAL` 通常只影响之后新建的连接
- 容器重启后会恢复配置文件中的值
- 生产环境不宜设置得过低，否则日志量可能很大

---

# 十、实验四：锁等待导致的慢查询

慢 SQL 不一定是没有索引，也可能是在等待其他事务释放锁。

该实验需要打开两个终端。

---

## 终端 A：锁住一条订单

进入 MySQL：

```bash
docker compose exec mysql \
  mysql -udemo -pdemo123 sql_demo
```

执行：

```sql
BEGIN;

SELECT *
FROM orders_indexed
WHERE id = 1001
FOR UPDATE;
```

此时不要提交，保持事务打开。

---

## 终端 B：修改同一条订单

打开另一个终端：

```bash
docker compose exec mysql \
  mysql -udemo -pdemo123 sql_demo
```

执行：

```sql
UPDATE orders_indexed
SET amount = amount + 1
WHERE id = 1001;
```

这条 SQL 会等待终端 A 的事务释放行锁。

因为配置了：

```ini
innodb_lock_wait_timeout = 5
```

等待约 5 秒后，可能得到：

```text
ERROR 1205 (HY000): Lock wait timeout exceeded
```

---

## 终端 A：释放锁

```sql
ROLLBACK;
```

也可以使用：

```sql
COMMIT;
```

这个实验说明：

> 即使通过主键只更新一行，SQL 也可能因为锁等待而很慢。

可以用以下语句观察事务和锁等待：

```sql
SELECT *
FROM information_schema.innodb_trx\G
```

MySQL 8 还可以查看：

```sql
SELECT *
FROM performance_schema.data_lock_waits\G
```

以及锁信息：

```sql
SELECT *
FROM performance_schema.data_locks\G
```

---

# 十一、实验五：MySQL 分区表

创建 `sql/03-partition-test.sql`：

```sql
USE sql_demo;

DROP TABLE IF EXISTS orders_partitioned;

-- MySQL 分区表有一个重要限制：
-- 所有唯一键都必须包含分区键。
-- 因为按照 created_at 分区，所以主键包含 created_at。
CREATE TABLE orders_partitioned (
    id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(200),
    created_at DATETIME NOT NULL,

    PRIMARY KEY (id, created_at),
    INDEX idx_user_created (user_id, created_at)
)
ENGINE = InnoDB
PARTITION BY RANGE COLUMNS(created_at) (
    PARTITION p2025_h1 VALUES LESS THAN ('2025-07-01'),
    PARTITION p2025_h2 VALUES LESS THAN ('2026-01-01'),
    PARTITION p2026_h1 VALUES LESS THAN ('2026-07-01'),
    PARTITION pmax     VALUES LESS THAN (MAXVALUE)
);

INSERT INTO orders_partitioned
SELECT *
FROM orders_no_index;

ANALYZE TABLE orders_partitioned;

-- 查看分区及各分区估算行数
SELECT
    table_name,
    partition_name,
    partition_ordinal_position,
    table_rows
FROM information_schema.partitions
WHERE table_schema = 'sql_demo'
  AND table_name = 'orders_partitioned'
ORDER BY partition_ordinal_position;


-- =========================================================
-- 1. 包含分区键，可以进行分区裁剪
-- =========================================================

EXPLAIN
SELECT *
FROM orders_partitioned
WHERE created_at >= '2025-06-01'
  AND created_at <  '2025-06-02';


-- =========================================================
-- 2. 不包含分区键，可能访问多个分区
-- =========================================================

EXPLAIN
SELECT *
FROM orders_partitioned
WHERE status = 'PAID';


-- =========================================================
-- 3. 同时使用分区键和普通索引
-- =========================================================

EXPLAIN ANALYZE
SELECT *
FROM orders_partitioned
WHERE user_id = 1001
  AND created_at >= '2025-01-01'
  AND created_at <  '2025-07-01'
ORDER BY created_at DESC;
```

执行：

```bash
docker compose exec -T mysql \
  mysql -udemo -pdemo123 sql_demo \
  < sql/03-partition-test.sql
```

查看分区：

```bash
docker compose exec mysql \
  mysql -udemo -pdemo123 sql_demo \
  -e "
SELECT
    partition_name,
    table_rows
FROM information_schema.partitions
WHERE table_schema = 'sql_demo'
  AND table_name = 'orders_partitioned';
"
```

---

## 分区实验的关键点

如果查询包含分区键：

```sql
WHERE created_at >= '2025-06-01'
  AND created_at < '2025-06-02'
```

优化器可以只访问相关分区，这叫：

> 分区裁剪

如果查询不包含分区键：

```sql
WHERE status = 'PAID'
```

数据库可能要检查多个分区。

因此，分区并不是让所有 SQL 自动变快。

---

# 十二、实验六：水平分表

创建 `sql/04-sharding-test.sql`：

```sql
USE sql_demo;

DROP TABLE IF EXISTS orders_00;
DROP TABLE IF EXISTS orders_01;
DROP TABLE IF EXISTS orders_02;
DROP TABLE IF EXISTS orders_03;

CREATE TABLE orders_00 LIKE orders_indexed;
CREATE TABLE orders_01 LIKE orders_indexed;
CREATE TABLE orders_02 LIKE orders_indexed;
CREATE TABLE orders_03 LIKE orders_indexed;

-- 根据 user_id % 4 将数据放入四张表
INSERT INTO orders_00
SELECT *
FROM orders_indexed
WHERE MOD(user_id, 4) = 0;

INSERT INTO orders_01
SELECT *
FROM orders_indexed
WHERE MOD(user_id, 4) = 1;

INSERT INTO orders_02
SELECT *
FROM orders_indexed
WHERE MOD(user_id, 4) = 2;

INSERT INTO orders_03
SELECT *
FROM orders_indexed
WHERE MOD(user_id, 4) = 3;

ANALYZE TABLE orders_00;
ANALYZE TABLE orders_01;
ANALYZE TABLE orders_02;
ANALYZE TABLE orders_03;

-- 查看各分表的数据量
SELECT 'orders_00' AS table_name, COUNT(*) AS count FROM orders_00
UNION ALL
SELECT 'orders_01', COUNT(*) FROM orders_01
UNION ALL
SELECT 'orders_02', COUNT(*) FROM orders_02
UNION ALL
SELECT 'orders_03', COUNT(*) FROM orders_03;


-- =========================================================
-- 1. 有分片键，可以精确路由
-- =========================================================

-- 1001 % 4 = 1
SET @user_id = 1001;

SELECT MOD(@user_id, 4) AS shard_number;

EXPLAIN ANALYZE
SELECT *
FROM orders_01
WHERE user_id = @user_id
ORDER BY created_at DESC;


-- =========================================================
-- 2. 没有分片键，需要查询所有分表
-- =========================================================

SELECT SUM(paid_count) AS total_paid
FROM (
    SELECT COUNT(*) AS paid_count
    FROM orders_00
    WHERE status = 'PAID'

    UNION ALL

    SELECT COUNT(*)
    FROM orders_01
    WHERE status = 'PAID'

    UNION ALL

    SELECT COUNT(*)
    FROM orders_02
    WHERE status = 'PAID'

    UNION ALL

    SELECT COUNT(*)
    FROM orders_03
    WHERE status = 'PAID'
) shard_results;


-- =========================================================
-- 3. 跨分表的全局排序
-- =========================================================

SELECT *
FROM (
    SELECT id, user_id, status, amount, created_at
    FROM orders_00
    ORDER BY created_at DESC
    LIMIT 20
) s0

UNION ALL

SELECT *
FROM (
    SELECT id, user_id, status, amount, created_at
    FROM orders_01
    ORDER BY created_at DESC
    LIMIT 20
) s1

UNION ALL

SELECT *
FROM (
    SELECT id, user_id, status, amount, created_at
    FROM orders_02
    ORDER BY created_at DESC
    LIMIT 20
) s2

UNION ALL

SELECT *
FROM (
    SELECT id, user_id, status, amount, created_at
    FROM orders_03
    ORDER BY created_at DESC
    LIMIT 20
) s3

ORDER BY created_at DESC
LIMIT 20;
```

执行：

```bash
docker compose exec -T mysql \
  mysql -udemo -pdemo123 sql_demo \
  < sql/04-sharding-test.sql
```

---

# 十三、在程序中怎样确定分表？

如果使用：

```text
user_id % 4
```

作为分表规则，伪代码如下：

```java
long shardNumber = userId % 4;
String tableName = String.format("orders_%02d", shardNumber);
```

例如：

```text
user_id = 1001
1001 % 4 = 1
table = orders_01
```

最终 SQL：

```sql
SELECT *
FROM orders_01
WHERE user_id = 1001
ORDER BY created_at DESC;
```

实际项目中不要直接把用户输入拼接进表名。表名必须通过程序内部固定规则或白名单生成，避免 SQL 注入。

---

# 十四、对比分区和分表

## 分区表

应用仍然查询一张表：

```sql
SELECT *
FROM orders_partitioned
WHERE created_at >= '2025-06-01'
  AND created_at < '2025-07-01';
```

由 MySQL 决定访问哪些分区。

## 水平分表

应用需要确定表名：

```sql
SELECT *
FROM orders_01
WHERE user_id = 1001;
```

路由由以下组件负责：

- 应用程序
- ORM 插件
- ShardingSphere
- 数据库代理
- 自研分片中间件

---

# 十五、建议的完整实验顺序

## 第一步：启动环境

```bash
docker compose up -d
docker compose logs -f mysql
```

等待初始化完成。

---

## 第二步：确认数据

```bash
docker compose exec mysql \
  mysql -udemo -pdemo123 sql_demo \
  -e "
SELECT COUNT
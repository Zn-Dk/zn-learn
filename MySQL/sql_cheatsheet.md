## 登录

- 登录 `mysql -u root -p`
- 登录并指定数据库 `mysql -u root -p -D database_name`

## DATABASE

- 查看数据库 `show databases`

- 创建数据库 `create database database_name`

  - 如果创建时担心命名冲突增加检查 `CREATE DATABASE IF Not EXISTS database_name`
  - 指定字符集 (未指定时, MySQL 8.0+ 默认为 utf8mb4)

    ```sql
      create database
      DEFAULT CHARACTER SET = 'utf8mb4';
    ```

    > ‌MySQL 中的 utf8mb4 是 utf8 的超集字符集，核心区别在于完整支持 4 字节 Unicode 字符（如 Emoji 表情），存储容量和兼容性更优 ‌。

    > utf8mb4 与 utf8 的核心区别

        - ‌编码范围差异‌：
        utf8仅支持1-3字节字符（BMP基本多语言平面），覆盖常见语言文字。‌‌
        utf8mb4支持1-4字节字符，完整兼容Unicode标准（包括辅助平面字符）。‌‌

        ‌- 字符支持能力‌：
        utf8无法存储😊（笑脸Emoji）、🥇（奖牌符号）等4字节字符。‌‌
        utf8mb4可存储所有Unicode12.1规范字符（含最新Emoji及历史文字）。‌‌

        - ‌历史背景‌：
        MySQL早期错误地将3字节实现命名为utf8（应称为utf8mb3）。‌‌2010年后通过utf8mb4修复该历史遗留问题

- 删除数据库 **谨慎操作** `drop database database_name`

  - 同样的可以判断是否存在 `DROP DATABASE IF EXISTS database_name`

- 切换数据库 `use database_name`

## TABLE

- 在数据库中查看表 `show tables`

- 创建表 `create table table_name (column_name data_type, ...)`

  ```sql
    mysql > create table table_name (
      -> column_name data_type,
      -> column_name data_type,
      ...
      -> column_name ... PRIMARY KEY (可选)
      -> column_name ... AUTO_INCREMENT (可选)
      -> column_name ... NOT NULL (可选)
      -> );
  ```

  - NOT NULL 代表该列不允许为空
  - AUTO_INCREMENT 代表该列自增
    - 默认起始值为 1, 如果要指定起始值, 可以
    1. 创建表时
    ```sql
      CREATE TABLE name(
        ...
      ) auto_increment = 100;
    ```
    2. alter table
    ```sql
       ALTER TABLE t AUTO_INCREMENT = 100;
    ```
  - PRIMARY KEY 代表该列为主键
  - TIMESTAMP 类型可以使用 DEFAULT **CURRENT_TIMESTAMP** 设置默认值, 插入时自动使用当前时间戳
  - UNIQUE 唯一约束

    ```sql
      CREATE TABLE Persons (
          id INT NOT NULL,
          ...
          -- 指定 col1 内容唯一
          col1 UNIQUE ...,

          -- 自定义单列唯一约束 (比较推荐)
          -- 语法 UNIQUE KEY `key_name` (`colXX`)
          UNIQUE KEY uc_name (name)

          -- 多列唯一约束 name + email 唯一
          -- 与 CONSTRAINT 相同, 但为 MySQL特有
          UNIQUE KEY uc_name_email (name, email)
      );
    ```

    ```sql
    -- 后添加
    ALTER TABLE Persons
    ADD UNIQUE (id);
    ```

  - CONSTRAINT 约束 (与 UNIQUE KEY 类似, MySQL 外通用的约束)
    ```sql
      CREATE TABLE Persons (
          id INT NOT NULL,
          ...
          name VARCHAR(255),
          -- name + email 唯一
          CONSTRAINT uc_name_email UNIQUE (name, email)
          )
    ```
    ```sql
       -- 示例：用户在同一部门只能有一个职位
      CREATE TABLE user_departments (
          id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
          user_id int NOT NULL,
          department_id int NOT NULL,
          position VARCHAR(100),
          -- 确保同一用户在同一部门只能有一条记录
          CONSTRAINT `u_user_dept` UNIQUE (user_id, department_id)
      );
    ```
  - 删除 UNIQUE,
    - 使用 `ALTER table_name DROP INDEX constraint_name`
    - 或者 `DROP INDEX constraint_name on table_name`

- 进阶创建表 example

  ```sql
    CREATE TABLE user_photos (
      uid INT NOT NULL,
      url VARCHAR(255),
      -- 创建时间, 插入时记录为当前时间
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      -- 创建时间, 插入时记录为当前时间, 每次更新时自动更新 (ON UPDATE)
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (uid),
      -- 外键 uid, 指向 users 表的 id, 且当 users 表删除 id(ON DELETE), 当前表的 uid也跟随删除
      FOREIGN KEY (uid) REFERENCES users (id) ON DELETE CASCADE
      -- 先定义所有列，再定义 PRIMARY KEY，最后定义 FOREIGN KEY
    ) COMMENT '用户图片';
  ```

- 删除表 `drop table table_name`

- 重命名表 `alter table table_name rename to new_table_name`

- 查看表结构 `desc table_name`

- 查看创建表的语句 `show create table table_name`

- 查看表的约束情况

  ```sql
    SELECT
        CONSTRAINT_NAME AS '约束名称',
        CONSTRAINT_TYPE AS '约束类型',
        TABLE_NAME AS '表名'
    FROM
        INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE
        TABLE_SCHEMA = 'your_database_name'  -- 替换为你的数据库名
        AND TABLE_NAME = 'employees';         -- 替换为你的表名
  ```

- 查看外键的约束情况

  ```sql
    SELECT
        CONSTRAINT_NAME AS '外键名称',
        TABLE_NAME AS '当前表',
        COLUMN_NAME AS '当前列',
        REFERENCED_TABLE_NAME AS '引用表',
        REFERENCED_COLUMN_NAME AS '引用列'
    FROM
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE
        TABLE_SCHEMA = 'your_database_name'
        AND TABLE_NAME = 'employees'
        AND REFERENCED_TABLE_NAME IS NOT NULL;
  ```

- 查看索引 `show index from table_name`

- 查看外键
  ```sql
    SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_NAME = 'employees'
    AND REFERENCED_TABLE_NAME IS NOT NULL
    AND TABLE_SCHEMA = DATABASE();
  ```

## DATA

- 插入数据
  `insert into table_name (column_name, ...[需要指定列插入时]) values (value, ...)`

  - 从头开始插入

  ```sql
    insert into table_name values (;
    -> value,
    -> value,
    ...
    -> );
  ```

  - 选择指定列

  ```sql
    insert into table_name
    -> (name, age) values (;
    -> value1, value2,
    -> value1, value2,
    ...
    -> );
  ```

  - 插入多条数据

  ```sql
    Insert INTO users
    (name, age) VALUES
    ('Mary', 21),
    ('Peter', 22),
    ('Jack', 23);
  ```

  - 插入, 当某个键重复时

  ```sql
    insert into table_name (name, age) values ('Mary', 21) as new -- 定义 new 别名
    ON DUPLICATE KEY UPDATE
      -- age = age + 1;
      -- 支持多列判断, 使用 new 别名引用插入值
    name = IF(new.name != table_name.name, new.name, table_name.name),
    email = IF(new.email != table_name.email, new.email, table_name.email);
  ```

- 更新数据

  ```sql
    update table_name
    SET column1 = value1, column2 = value2, ...
    where condition; (如果省略 WHERE 子句，将更新表中的所有行。)
  ```

  - 表达式 (比如更新所有的 Electronics 商品价格)

  ```sql
    UPDATE products
    SET price = price * 1.1
    WHERE category = 'Electronics';
  ```

  - 子查询\* (计算每个 'Premium' 类型客户的总购买金额，并将该值更新到 total_purchases 列中。)

  ```sql
    UPDATE customers
    SET total_purchases = (
        SELECT SUM(amount)
        FROM orders
        WHERE orders.customer_id = customers.customer_id
    )
    WHERE customer_type = 'Premium';
  ```

- 删除数据
  ```sql
    delete from table_name
    where condition;
  ```

## ALTER 命令

- 当我们需要修改数据表名或者修改数据表字段时，就需要使用到 MySQL ALTER 命令。
- MySQL 的 ALTER 命令用于修改数据库、表和索引等对象的结构。
- ALTER 命令允许你添加、修改或删除数据库对象，并且可以用于更改表的列定义、添加约束、创建和删除索引等操作。

- 重命名表 `alter table table_name rename to new_table_name`

- 增加列 (示例 timestamp 字段)
  `ALTER TABLE `table_name`ADD COLUMN`timestamp` INT (DEFAULT ...)`

- 删除列
  `ALTER TABLE `table_name`DROP COLUMN`column_name`

- 修改列的信息 (示例修改 age 列的配置)

  > 注意: 不论是 MODIFY 还是 CHANGE 都是覆盖配置!

  - 直接 MODIFY, 不能重命名

  ```sql
    ALTER table users
    MODIFY age INT DEFAULT 1 COMMENT '年龄';
  ```

  - 使用 CHANGE, 能重命名

  ```sql
   ALTER table `table_name`
   CHANGE old_col_name new_col_name INT DEFAULT 1 COMMENT '年龄';
  ```

- 添加主键
  ```sql
    ALTER table `table_name`
    ADD PRIMARY KEY (id);
  ```

## Query

- 单列查询
  `SELECT column_name FROM table_name;`

- 多列查询
  `SELECT column_name1, column_name2 FROM table_name;`

- 查询所有列
  `SELECT * FROM table_name;`

- 别名 as 语法
  `SELECT column_name AS new_name FROM table_name;`

- 排序 ORDER BY

  ```sql
    SELECT column_name FROM table_name
    ORDER BY column_name ASC|DESC;
  ```

- 限制行 LIMIT

  - 一个参数为数量
    `SELECT column_name FROM table_name LIMIT 10;`
  - 两个参数为 (offset, limit)
    - offset 为偏移量 0 开始
    - limit 为查询的数量
      `SELECT column_name FROM table_name LIMIT offset, limit;`

- WHERE
  `SELECT column_name FROM table_name WHERE condition;`

  **condition 语法**

- 运算符

  - `col = value`
  - `col != value`
  - `col > < >= <= value`

- 逻辑符
  - `col BETWEEN value1 AND value2`
  - `col IN (value1, value2, ...)`
  - `col IS NULL`
  - `col LIKE '%value%'`
    1.  模糊匹配, 字母大小写忽略
    2.  通配符 %, 可做前后置匹配 代表任意字符
    3.  通配符 \_, 可做前后置匹配 代表单个字符(可多次使用)
  - `col AND/OR` (联合逻辑)
  - `col AND NOT col` (非逻辑符与联合条件合并)

## 表达式和函数

- AS 表达式, 起别名, 比如使用表达式 SELECT 时, 返回
  的列名是表达式, 可以使用 AS 为列起别名
- 算术表达式：可以执行基本的数学运算，例如加法、减法、乘法和除法。例如：`SELECT col1 + col2 AS sum FROM table_name`;
- 字符串表达式：可以对字符串进行操作，例如连接、截取和替换。例如：`SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM table_name;`
- 逻辑表达式：用于执行条件判断，返回布尔值（TRUE 或 FALSE）。例如：`SELECT * FROM table_name WHERE age > 18 AND gender = 'Male';`
- 条件表达式：用于根据条件返回不同的结果。例如：`SELECT CASE WHEN age < 18 THEN 'Minor' ELSE 'Adult' END AS age_group FROM table_name;`
- 聚合函数表达式：用于计算数据集的聚合值，例如求和、平均值、最大值和最小值。例如：`SELECT AVG(salary) AS average_salary FROM table_name;`
- 时间和日期表达式：用于处理时间和日期数据，例如提取年份、月份或计算日期差值。例如：`SELECT YEAR(date_column) AS year FROM table_name;`

---

> P.S. 常用函数的用法相比对 Excel 熟练者来说, 语法相似, 很容易上手。

- 字符串函数：

  - CONCAT(str1, str2, ...)：将多个字符串连接起来。
  - LEFT(str, length)：从字符串的左侧截取指定长度的子字符串。
  - RIGHT(str, length)：从字符串的右侧截取指定长度的子字符串。
  - SUBSTRING(str, start, length)：从字符串中提取子字符串. start 从 1 开始。
  - UPPER(str)：将字符串转换为大写。
  - LOWER(str)：将字符串转换为小写。
  - LENGTH(str)：返回字符串的长度。

- 数值函数：

  - ABS(x)：返回 x 的绝对值。
  - ROUND(x, d)：将 x 四舍五入为 d 位小数。
  - CEILING(x)：返回不小于 x 的最小整数。
  - FLOOR(x)：返回不大于 x 的最大整数。
  - RAND()：返回一个随机数。

- 日期和时间函数：
  - NOW()：返回当前日期和时间。
  - CURDATE()：返回当前日期。
  - CURTIME()：返回当前时间。
  - DATE_FORMAT(date, format)：将日期格式化为指定的格式。
  - DATEDIFF(date1, date2)：计算两个日期之间的天数差。

条件函数：

- IF 根据条件返回不同的值, 类似 EXCEL 函数
  `IF(condition, value_if_true, value_if_false)`

  ```sql
    SELECT
     name,
     age,
     IF(age > 10, '未成年', '成年') as 类型
     FROM users LIMIT 100;
  ```

- CASE 根据条件返回不同的结果。

  ```sql
    CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ELSE result END;
  ```

  ```sql
    SELECT
    name,
    age,
    CASE
    WHEN age <= 6 THEN '幼儿'
    WHEN age > 6 AND age <= 12 THEN '小学生'
    WHEN age > 12 AND age <= 18 THEN '中学生'
    WHEN age > 18 AND age < 21 THEN '大学生'
    ELSE '成人' END as 类型
    FROM users LIMIT 100
  ```

- 聚合函数：
  - COUNT(expr)：计算满足条件的行数。
  - SUM(expr)：计算表达式的总和。
  - AVG(expr)：计算表达式的平均值。
  - MAX(expr)：返回表达式的最大值。
  - MIN(expr)：返回表达式的最小值。

## 子查询

- 子查询是指查询结果集在一个查询中嵌套的查询。
- 子查询可以包含任何类型的查询，包括 SELECT、INSERT、UPDATE 和 DELETE 等语句，甚至是其他子查询。
- 子查询可以在 SELECT 语句中使用，可以在 WHERE 语句中使用，甚至是在 JOIN 语句中使用。

### 语法

- 使用小括号包裹子查询

```sql
SELECT
  column1, column2, ...
FROM
  table_name
WHERE
  column_name IN (
    SELECT column_name
    FROM table_name
    WHERE condition
  );
```

```sql
  SELECT * FROM user_photos WHERE uid IN (
    SELECT id FROM users
    WHERE id > 1
  )
```

## 连表

### 内联

- 常规语法

```sql
  SELECT column_name(s)
  FROM table1
  INNER JOIN table2 -- 或者直接 JOIN
  ON table1.column_name = table2.column_name;
```

- 等价简写 (from 后面 table 的顺序, 会影响结果集)

```sql
  SELECT * FROM table1, table2 WHERE table1.id = table2.id;
```

> 如果两者的数据条数不同, 则最终结果集的数据条数为以最少的数据条数为准

### 外联 (左链接 LEFT JOIN / 右链接 RIGHT JOIN)

- 左连接的左边的表为主表，右连接的右边的表为主表

```sql
  SELECT * FROM table1
  LEFT JOIN table2
  ON table1.id = table2.id;

  SELECT * FROM table1
  RIGHT JOIN table2
  ON table1.id = table2.id;
```

> 因此, 左连接的结果集包含 table1 的所有数据，右连接的结果集包含 table2 的所有数据

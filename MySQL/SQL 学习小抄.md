### 注释符号

```sql
-- 注释符号

# 注释符号

/* 注释符号 */ 
```

### 创建表 CREATE TABLE / 删除表 DROP TABLE

EXAMPLE: 

```sql
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
	id INT(10) NOT NULL AUTO_INCREMENT,
	real_name VARCHAR(20) NOT NULL DEFAULT '' COMMENT '姓名',
	age INT(2) NOT NULL DEFAULT '0' COMMENT '年龄',
	gender INT(1) NOT NULL DEFAULT '0' COMMENT '性别 0女 1男',
	salary double COMMENT '工资',
	PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
```



### 选择 SELECT

```sql
SELECT 列名称(,列2,列3...) FROM 表名称
SELECT * FROM 表名称 -- 选择所有列
```

 查询结果表头别名 (在字段名后加注释) 实际开发不应用中文

```sql
SELECT real_name '姓名', id, age '年龄' FROM test WHERE age > 18
```



#### SELECT DISTINCT

关键词 DISTINCT 用于返回唯一不同的值。

例如 Orders 表:

| Company  | OrderNumber |
| :------- | :---------- |
| IBM      | 3532        |
| W3School | 2356        |
| Apple    | 4698        |
| W3School | 6953        |

```
SELECT Company FROM Orders
```

结果：

| Company  |
| :------- |
| IBM      |
| W3School |
| Apple    |
| W3School |

使用 DISTINCT 就可以去除重复的 W3School

```sql
SELECT DISTINCT Company FROM Orders 
```

#### WHERE 

需有条件地从表中选取数据，可将 WHERE 子句添加到 SELECT 语句

```SQL
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
```

| 操作符  | 描述         |
| :------ | :----------- |
| =       | 等于         |
| <>      | 不等于       |
| >       | 大于         |
| <       | 小于         |
| >=      | 大于等于     |
| <=      | 小于等于     |
| BETWEEN | 在某个范围内 |
| LIKE    | 搜索某种模式 |

```
SELECT * FROM Persons WHERE City='Beijing'
SELECT * FROM Persons WHERE Year>1965
```

#### AND / OR

与和或操作符，很好理解， 不赘述。

```sql
SELECT * FROM Persons WHERE FirstName='Thomas' AND LastName='Carter'
SELECT * FROM Persons WHERE firstname='Thomas' OR lastname='Carter'
SELECT * FROM Persons WHERE (FirstName='Thomas' OR FirstName='William')
AND LastName='Carter'
```



#### ORDER BY 排序 

ORDER BY 语句默认按照**升序ASC**对记录进行排序。

```sql
SELECT Company, OrderNumber FROM Orders ORDER BY Company
```

有主次的排序:

先按字母顺序排序 Company , 再数字顺序**降序**显示 ID 列

```sql
SELECT Company, ID FROM Orders ORDER BY Company, ID DESC
```



### 插入 INSERT INTO

```sql
INSERT INTO 表名称 VALUES (值1, 值2,....)
```

也可以指定所要插入数据的列：

```sql
INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)
```

```sql
INSERT INTO test(real_name,age,gender,salary) VALUE('赵子龙',33,1,41332)
```

### 更新 UPDATE

```sql
UPDATE 表名称 SET 列名称 = 新值(, 列2 = 新值2 , 列3 = 新值3 ...) WHERE 列名称 = 某值(...)
```

```sql
UPDATE test SET salary = 4534 WHERE id = 1
UPDATE test SET gender = 1 WHERE id = 6
UPDATE Person SET Address = 'Zhongshan 23', City = 'Nanjing' WHERE LastName = 'Wilson'
```

### 删除 DELETE

```sql
DELETE FROM 表名称 WHERE 列名称 = 值
```

```sql
DELETE from test WHERE real_name = 'zz'
```



### 操作符号 

#### BETWEEN

操作符 BETWEEN ... AND 会选取介于两个值之间的数据范围。这些值可以是数值、文本或者日期

```SQL
SELECT column_name(s)
FROM table_name
WHERE column_name
BETWEEN value1 AND value2
```

```sql
SELECT real_name FROM test WHERE AGE BETWEEN 10 AND 20
```



#### TOP/LIMIT

TOP(SQL Server)/LIMIT(MySQL) 用于规定要返回的记录的数目

```sql
SELECT TOP number|percent column_name(s) FROM table
```

```sql
SELECT * FROM Persons LIMIT 5 -- 返回 5 条数据
```

#### LIKE 

- LIKE    % 匹配任意字符     _ 匹配一个字符
- LIKE  大小写不敏感

```sql
SELECT * FROM test WHERE real_name LIKE '赵%'
SELECT * FROM test WHERE real_name LIKE 'Andy'  -- andy Andy 都会被选中
```

#### IN

IN 操作符允许我们在 WHERE 子句中规定多个值。

```sql
SELECT .... WHERE column_name IN (value1,value2,...)
```

```sql
SELECT * FROM test WHERE real_name in ('赵六','小布丁')
```
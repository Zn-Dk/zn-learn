# AWK 命令学习笔记

## 概述
AWK 是一种强大的文本处理工具，特别适合处理结构化文本数据（如日志文件、CSV文件等）。

## 基本语法
```bash
awk 'pattern {action}' filename
```

- `pattern`：匹配模式（可选）
- `action`：对匹配行执行的操作
- `filename`：要处理的文件

## 常用示例

### 1. 基本用法：打印指定列
```bash
# 打印第一列
awk '{print $1}' filename

# 打印第一列和第三列
awk '{print $1, $3}' filename

# 打印最后一列
awk '{print $NF}' filename

# 打印整行
awk '{print $0}' filename
```

### 2. 处理lsof输出（实际应用）
```bash
# 提取PID（第二列）
lsof -i:3002 | awk '{print $2}'

# 提取进程名和PID
lsof -i:3002 | awk '{print $1, $2}'

# 结合grep过滤node进程
lsof -i:3002 | grep node | awk '{print $2}'
```

### 3. 条件过滤
```bash
# 只处理包含"node"的行
lsof -i:3002 | awk '/node/ {print $2}'

# 只处理PID大于1000的进程
ps aux | awk '$2 > 1000 {print $1, $2}'

# 多条件：用户为root且CPU使用率大于1%
ps aux | awk '$1 == "root" && $3 > 1.0 {print $2, $3}'

# 使用正则表达式匹配
awk '/^Error/ {print $0}' logfile.txt
```

## 内置变量

| 变量 | 描述 | 示例 |
|------|------|------|
| `NR` | 当前行号 | `awk '{print NR, $0}' file` |
| `NF` | 当前行的字段数 | `awk '{print NF, $0}' file` |
| `FS` | 字段分隔符 | `awk -F':' '{print $1}' file` |
| `OFS` | 输出字段分隔符 | `awk 'BEGIN{OFS="-"} {print $1,$2}' file` |
| `FILENAME` | 当前文件名 | `awk '{print FILENAME, $0}' file` |

### 内置变量使用示例
```bash
# 显示行号和整行内容
awk '{print NR, $0}' filename

# 显示字段数和整行内容
awk '{print NF, $0}' filename

# 使用冒号分隔（处理/etc/passwd）
awk -F':' '{print $1, $7}' /etc/passwd

# 自定义输出分隔符
awk 'BEGIN{OFS=" | "} {print $1, $2, $3}' filename
```

## 计算和统计

### 1. 基本统计
```bash
# 计算文件行数
awk 'END {print NR}' filename

# 计算列的总和
awk '{sum += $1} END {print sum}' filename

# 计算平均值
awk '{sum += $1; count++} END {print sum/count}' filename

# 计算最大值
awk 'NR==1 {max=$1} $1>max {max=$1} END {print max}' filename
```

### 2. 分组统计
```bash
# 按第一列分组统计第二列的和
awk '{sum[$1] += $2} END {for (key in sum) print key, sum[key]}' data.txt

# 统计每列的平均值
awk '{for(i=1;i<=NF;i++) {sum[i] += $i; count[i]++}} END {for(i=1;i<=NF;i++) print "列" i ":", sum[i]/count[i]}' file
```

## 格式化输出

### 1. printf格式化
```bash
# 格式化输出
awk '{printf "进程: %-10s PID: %-8s\n", $1, $2}' filename

# 添加表头
awk 'BEGIN {print "进程名\tPID\tCPU%"} {print $1 "\t" $2 "\t" $3}' filename

# 数字格式化
awk '{printf "%.2f\n", $1}' filename
```

### 2. 条件格式化
```bash
# 根据条件改变输出格式
awk '{if ($3 > 50) printf "[高负载] %s %s\n", $1, $3; else printf "[正常] %s %s\n", $1, $3}' ps_output.txt
```

## 实用场景示例

### 场景1：分析日志文件
```bash
# 提取nginx日志中的IP地址和状态码
awk '{print $1, $9}' /var/log/nginx/access.log

# 统计HTTP状态码出现次数
awk '{status[$9]++} END {for (code in status) print code, status[code]}' access.log

# 提取特定时间段的日志
awk '/2023-10-01 14:/,/2023-10-01 15:/' app.log
```

### 场景2：处理CSV文件
```bash
# 处理逗号分隔的文件
awk -F',' '{print $1, $3}' data.csv

# 处理制表符分隔的文件
awk -F'\t' '{print $1, $2}' data.tsv

# 处理多个分隔符
awk -F'[,;]' '{print $1, $2}' data.txt
```

### 场景3：系统监控
```bash
# 监控内存使用情况
ps aux | awk '{mem += $4} END {print "总内存使用率:", mem "%"}'

# 统计每个用户的进程数
ps aux | awk 'NR>1 {users[$1]++} END {for (user in users) print user, users[user]}'

# 找出CPU使用率最高的进程
ps aux | awk 'NR>1 {if ($3 > max) {max=$3; process=$11}} END {print "最高CPU进程:", process, max "%"}'
```

### 场景4：文件处理
```bash
# 统计文件行数、单词数、字符数（类似wc命令）
awk '{lines++; words+=NF; chars+=length($0)+1} END {print "行数:", lines, "单词数:", words, "字符数:", chars}' file

# 去除重复行
awk '!seen[$0]++' file.txt

# 反转文件行顺序
awk '{lines[NR]=$0} END {for(i=NR;i>0;i--) print lines[i]}' file.txt
```

## 高级技巧

### 1. BEGIN和END块
```bash
# 在开始前执行
awk 'BEGIN {print "开始处理文件..."} {print $0} END {print "处理完成"}' file

# 初始化变量
awk 'BEGIN {total=0} {total+=$1} END {print "总和:", total}' numbers.txt
```

### 2. 数组操作
```bash
# 统计单词频率
awk '{for(i=1;i<=NF;i++) words[$i]++} END {for(word in words) print word, words[word]}' text.txt

# 排序输出
awk '{arr[$1]=$2} END {n=asorti(arr,sorted); for(i=1;i<=n;i++) print sorted[i], arr[sorted[i]]}' file
```

### 3. 函数使用
```bash
# 使用内置函数
awk '{print toupper($1), length($2)}' file

# 自定义函数
awk 'function myfunc(x) {return x*2} {print $1, myfunc($1)}' numbers.txt
```

## 常见问题解决

### 1. 处理空行
```bash
# 跳过空行
awk 'NF > 0 {print $0}' file

# 统计非空行数
awk 'NF > 0 {count++} END {print count}' file
```

### 2. 处理特殊字符
```bash
# 处理包含空格的文件名
awk -F'\t' '{print $1}' "file with spaces.txt"

# 处理包含引号的字段
awk -F'"' '{print $2}' csv_file.csv
```

### 3. 性能优化
```bash
# 对于大文件，使用next提前退出
awk '/error/ {print; next} /warning/ {print}' large_log.txt

# 使用exit提前结束处理
awk '$1 > 100 {print; exit}' numbers.txt
```

## 总结

AWK 是一个功能强大的文本处理工具，掌握它可以大大提高命令行工作效率。关键要点：

1. **基本结构**：`pattern {action}`
2. **字段引用**：`$1, $2, ..., $NF`
3. **内置变量**：`NR, NF, FS, OFS`
4. **条件判断**：`if, else, &&, ||`
5. **循环控制**：`for, while`
6. **数组操作**：关联数组的强大功能

通过不断练习，你会发现AWK在处理结构化文本数据时的强大威力！
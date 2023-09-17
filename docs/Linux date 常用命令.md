# Linux date 命令

### 基本使用

```sh
Usage: date [OPTION]... [+FORMAT]
	# 常用的 OPTION  -d, --date=STRING
    # arg 可以是 unix时间戳/时间语义化语句
  or:  date [-u|--utc|--universal] [MMDDhhmm[[CC]YY][.ss]]
```

### FORMAT 格式

```sh
% H 小时（00..23）
% I 小时（01..12）
% k 小时（0..23）
% l 小时（1..12）
% M 分（00..59）
% p 显示出AM或PM
% r 时间（hh：mm：ss AM或PM），12小时
% s 从1970年1月1日00：00：00到目前经历的秒数
% S 秒（00..59）
% T 时间（24小时制）（hh:mm:ss）
% X 显示时间的格式（％H:％M:％S）
% Z 时区 日期域
% a 星期几的简称（ Sun..Sat）
% A 星期几的全称（ Sunday..Saturday）
% b 月的简称（Jan..Dec）
% B 月的全称（January..December）
% c 日期和时间（ Mon Nov 8 14：12：46 CST 1999）
% d 一个月的第几天（01..31）
% D 日期（mm／dd／yy）
% h 和%b选项相同
% j 一年的第几天（001..366）
% m 月（01..12）
% w 一个星期的第几天（0代表星期天）
% W 一年的第几个星期（00..53，星期一为第一天）
% x 显示日期的格式（mm/dd/yy）
% y 年的最后两个数字（ 1999则是99）
% Y 年（例如：1970，1996等）
```



### 示例

```sh
date +%Y%m%d
# 20230602
date +%F
# 2023-06-02

# 以下三句命令输出相同 - 2023-06-01
date -d yesterday +'%Y-%m-%d'
date -d yesterday +%F
date -d -1day +%F

date -d 20220101 +%F
# 2022-01-01
date -d @1640995200 +%F
# 2022-01-01
```


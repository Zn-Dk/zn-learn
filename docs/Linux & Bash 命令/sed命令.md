# sed文本处理工具

> 用法1：前置命令 | sed [选项] '条件指令'
> 用法2：sed [选项] '条件指令' 文件.. ..



## 主要功能

- 条件可以是行号或者/正则/
- 没有条件时，默认为所有条件
- 指令可以是增、删、改、查等指令
- 默认sed会将所有输出的内容都打印出来，可以使用-n屏蔽默认输出
- 选项中可以使用-r选项，让sed支持扩展正则



**sed命令的常用选项如下：**



## 修饰符

### -r

- 让sed支持扩展正则

### -i

- 默认sed只是通过内存临时修改文件并输出结果至 stdout，源文件无影响，加上 -i 后让 sed 直接修改源文件

### -n

- 屏蔽默认输出，默认sed会输出读取文档的全部内容, 配合 p 指令使用

- 格式 

  - 打印某行 `sed -n '(line)p' file` 

  - 打印 start-end 行 `sed -n '(start), (end)p' file`

  - 打印奇数行 `sed -n '1~2p' file`

  - 打印偶数行 `sed -n '2~2p' file`

  - 正则用法: `-n -r /Regex/p` (**如果不使用 -r 只能支持普通正则**)

    - 打印包含 root 的行 `sed -n '/root/p' file`
    - 打印以 bash 结尾的行 `sed -n '/bash$/p' file`

  - 输出文件的行数 `sed  -n '$=' file`

    

- 用例

```sh
// example.txt
The quick brown it do it make her!
beautiful
Bright

sed -n '1p' example.txt  # 只输出第一行的数据
# The quick brown it do it make her!

sed -n '1,2p' example.txt  # 用逗号分隔, 输出第 1-2 行的数据
# The quick brown it do it make her!
# beautiful

sed -n '1p; 3p' example.txt  # 输出第 1 和 第 3 行的数据
# The quick brown it do it make her!
# Bright

sed -n -r '/^[bB].+/p' example.txt # 支持拓展正则的搜索方法
# beautiful
# Bright  
```



## 字符串指令

### d 删除指令

- 删除指令的用法与 p 修饰符类似, 可以参考

```sh
sed  '3,5d' a.txt             //删除第3~5行
sed  '/xml/d' a.txt            //删除所有包含xml的行
sed  '/xml/!d' a.txt         //删除不包含xml的行，!符号表示取反
sed  '/^install/d' a.txt    //删除以install开头的行
sed  '$d' a.txt                //删除文件的最后一行
sed  '/^$/d' a.txt             //删除所有空行
```



### s 替换指令

```sh
sed 's/xml/XML/'  a.txt        //将每行中第一个xml替换为XML
sed 's/xml/XML/3' a.txt     //将每行中的第3个xml替换为XML
sed 's/xml/XML/g' a.txt     //将所有的xml都替换为XML
sed 's/xml//g'     a.txt     //将所有的xml都删除（替换为空串）
sed 's#/bin/bash#/sbin/sh#' a.txt  //将/bin/bash替换为/sbin/sh
sed '4,7s/^/#/'   a.txt         //将第4~7行注释掉（行首加#号）
sed 's/^#an/an/'  a.txt         //解除以#an开头的行的注释（去除行首的#号）
sed -r 's/br|be/bro/i' a.txt // 替换 br或be 开头的文本为 bro, 忽略大小写
```



### 多行文本指令

- i：在指定的行之前**插入新行**, 文本为 i 后面的内容
- a：在指定的行之后**插入新行**, 文本为 a 后面的内容
- c：替换指定的行

```sh
sed  '2a XX'   a.txt            //在第二行后面，追加XX
sed  '2i XX'   a.txt            //在第二行前面，插入XX
sed  '2c XX'   a.txt            //将第二行替换为XX
```




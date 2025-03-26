# sort + uniq 命令



### 交集

```bash
sort a.txt b.txt | uniq -d
```

### 并集

```bash
sort a.txt b.txt | uniq
```



### 差集

`a.txt - b.txt:`

```bash
sort a.txt b.txt b.txt | uniq -u
```

`b.txt - a.txt:`

```bash
sort b.txt a.txt a.txt | uniq -u
```



### 原理

> 使用sort可以将文件进行排序，
>
>  -n 按照数字格式排序，
>
>  -i 忽略大小写，
>
>  -r 为逆序输出等
>
> 
>
> uniq为删除文件中重复的行，得到文件中唯一的行，后面的命令 -d 表示的是输出出现次数大于1的内容 -u表示的是输出出现次数为1的内容，那么对于上述的求交集并集差集的命令做如下的解释：
>
> 
>
> 1. sort a.txt b.txt | uniq -d：将a.txt b.txt文件进行排序，uniq使得两个文件中的内容为唯一的，使用-d输出两个文件中次数大于1的内容，即是得到交集
>
> 2. sort a.txt b.txt | uniq ：将a.txt b.txt文件进行排序，uniq使得两个文件中的内容为唯一的，即可得到两个文件的并集
>
> 3. sort a.txt b.txt b.txt | uniq -u：将两个文件排序，最后输出a.txt b.txt b.txt文件中只出现过一次的内容，因为有两个b.txt所以只会输出只在a.txt出现过一次的内容，即是a.txt-b.txt差集
>
> ​    对于b.txt-a.txt为同理



### 注意!

确保文件中的行以相同的方式结束。有时，来自不同操作系统的文件可能会使用不同的行尾（例如，Windows 通常使用 `\r\n`，而 Linux 使用 `\n`）。你可以使用 `dos2unix` 或 `tr` 等工具将 Windows 格式的文件转换为 Unix 格式。例如：



```bash
dos2unix file1.txt
dos2unix file2.txt
```

或者

```bash
tr -d '\r' < file1.txt > unix_file1.txt
tr -d '\r' < file2.txt > unix_file2.txt
```

# Bash



## 变量基本概念及其初始化

### 规则

- 只能包含字母、数字和下划线，并且不能以数字开头
- 大小写敏感
- 不能和系统变量重名
- 导出为全局变量，名称最好要全部大写。这只是一种习惯的约定，并非严格的约束。



### 新建变量

Bash中的变量和其他脚本语言一样，都是无需声明，直接拿来用的。
所以变量的第一次出现都是伴随着初始化的。
Bash中的初始化（或赋值）方式共有三种：**直接赋值、读取输入和命令替换。**

使用 echo 命令在控制台输出语句

#### 直接赋值 

> 注意 等号左右不能有空格!!
> 如果你写作 a = 123。那么系统会将视作你在执行一个命令a 而= 和123都是这个命令的参数。

```bash
a=123
b=abc
c='123'
d=“hello world”

echo $a
echo 'Jelly:"Hi"'
```
拼合字符串 使用双引号 "", `` 则是执行命令, 单引号则会转义变量
```bash
name="Sam"
echo "My name is $name"
echo `My name is $name`  # My: command not found
echo 'My name is $name'
```

#### 读取输入

> 读取终端的输入给变量赋值，就是使用read命令。read和echo一样都是内嵌命令。

```bash
echo -n "请输入用户名:"
read name
echo "欢迎你, 尊敬的 $name"

# 使用 read -p 简化上述代码
read -p "Please input your name: " name1
echo "$name1 welcome to Bash!"
```

#### 命令替换

>  利用其他命令的输出来给一个变量赋值。
>  这需要用到反引用符号 ` ` 。
>  以下代码调用了 pwd 和 date 两个命令并赋值给变量

```bash
dir=`pwd`
t=`date -R`
ls=$(ls)
echo "当前目录是 $dir"
echo "现在时间是 $t"
echo "文件夹信息"  $ls

# 附加: $RANDOM 生成随机数
echo "随机数 $RANDOM"
```



### 特殊变量

#### 引入参数

```bash
>>> test.sh
echo $0 $1 $2 $3 
>>> 执行脚本
sh test.sh A B C
>>> 输出 test.sh A B C
```

> 数字变量0，保存的是这个执行脚本的名称，其他的数字1到n保存该脚本运行时的第1到第n个参数。
>
> 如果没有脚本在运行，比如直接在终端中键入echo $0，那么显示的是shell的名称。(比如 bash)

#### 参数的个数 $#

```bash
>>> test.sh A B C
echo $0 $1 $2 $3 
echo 本脚本 $0 输入的参数个数为 $#
>>> 输出:  本脚本 test.sh 输入的参数个数为 3
```

#### 输出所有参数 $* $@

```bash
>>> test.sh A B C
echo $0 $1 $2 $3 
echo 本脚本目前的参数有 $*
echo 本脚本目前的参数有 $@
>>> 输出:  本脚本目前的参数有 A B C
本脚本目前的参数有 A B C
```

> 通配符*将所有参数视作一个变量，而@则可以理解为所有参数的集合。
> 

![img](assets\sedfwetg14124.png)



#### 其他

- $_  保存的是命令（或脚本）的最后一个参数。
- $?  退出码  ***exit code***（或称返回码）从而判断命令是否正确执行。
- $$  输出当前进程的PID 



## if 选择结构

Bash 内的 if 使用 [] 方括号作为语句边界,  ***注意if和[ ]之间要有空格。if [ ... ]***

`if [ condition ]`

Bash中的 if 同样支持与 if 配对的else 和 else if的概念，只不过，else if在这里写法是 elif。

Bash的if语句闭合作用域使用的是 if 的“反语”——fi。

if语句基本结构是这样：

```bash
if  [ <条件1> ]  
then
        语句1
elif  [ <条件2> ] 
        语句2
elif  [ <条件k> ] 
        语句...
else
        语句n
fi
```

>  关于 then，if的条件后面都需要加一个保留字then。你也可以把它们写作同一行，但是需要注意的是要用分号来分隔，这些bash解释器才知道then不是if条件的一部分。否则会报错。

示例 1

```bash
score=67

checkScore(){
    if [ $score -gt 60 ];then
        echo 'u passed the exam'
    else
        echo 'u did not passed the exam'
    fi
}

checkScore $score  # u passed the exam
```

示例 2

```bash
read -p "猜猜随机数" ipt
if [ $ipt -gt $RANDOM ];then
    echo "你输入的数比生成的随机数 $RANDOM 大"
else
    echo "你输入的数比生成的随机数 $RANDOM 小"
fi
```

示例 3 (判断文件)

```bash
read -p "请输入一个文件名:" name
if [ -e $name ]
then
    echo -n "$name存在，"
    if [ -d $name ]
    then
        echo "并且是一个目录"
    else
        echo "但不是一个目录"
    fi
else
    echo "$name不存在"
fi
```

### if与逻辑表达式

与其他语言一样，Bash中的if同样可以和 与或非 组合使用。并且通过结合内部或外部的命令一起使用，能够达到其他语言达不到的效果。

比如：

```bash
if [ -e $filename ] && rm $filename
then
    echo "$filaname 不存在！"
fi
```



## case 选择结构

bash中的代码块风格不是很统一。但是在选择结构中是相同的——**反语**。if结构使用***if...fi***标识一个代码块的作用域，而case也是用***case...esac***表示块作用域的。



例子 1

```bash
read -p "你喜欢什么颜色：" color
case $color in
    red) echo -e "\e[1;31m$color \e[0m";;
    green) echo -e "\e[1;32m$color \e[0m";;
    yellow) echo -e "\e[1;33m$color \e[0m";;
    blue) echo -e "\e[1;34m$color \e[0m";;
    *) echo -e "\e[1;30m这是什么颜色?\e[0m";;
esac
```

> 把变量color的值，依次和下面右括号里的值做比较，如果相同，就执行后面的语句。

- case 的语句的条件使用 **) 右括号**作区分 **每个选项以 ;; 两个分号结束**

例子 2

```
# bash 实现 如下的效果 匹配多个选项
# case 1:
# case 2;break;
# case 3:
# case 4;break;

# 使用 ;&
read -p "你有什么爱好:(唱/跳/RAP)" ans
case $ans in
    唱);&
    跳);&
    RAP) echo '你是真正的 ikun';;
    *) echo '对不起 你是小黑子';;
esac
```

- ;& 匹配合并的情况

```bash
read -p "你有什么爱好:(唱/跳/RAP)" ans
case $ans in
    唱);&
    跳);&
    RAP) echo '你是真正的 ikun';;
    *) echo '对不起 你是小黑子';;
esac
```

- ;;& 精确匹配

```bash
read -p "请输入一个区号:" num
case $num in
    *)echo -n "中国";;&
    03*)echo -n "河北省";;&
        ??10)echo "邯郸市";;
        ??11)echo "石家庄";;
        ??17)echo "沧州市";;
        *)echo "区号错误";;
    07*)echo -n "江西省";;&
        ??91)echo "南昌市";;
        ??92)echo "九江市";;
        ??97)echo "赣州市";;
        *)echo "区号错误";;
esac
```

- 正则

```bash
# 支持 * ? []  () <-需要转义 写成 (\)
read -p "输入数字" n
case $n in
    [[:digit:]]*) echo "是数字";;&
    [0-9]) echo "数字小于10";;&
    [1-9][0-9]*) echo "数字大于10";;&
    (111|222|333\)) echo "特殊数字!";;
esac
```

表 POSIX字符集

| 类           | 描 述                                        | 扩 展                                   |
| ------------ | -------------------------------------------- | --------------------------------------- |
| `[:alnum:]`  | 字母和数字字符                               | `[0-9a-zA-Z]`                           |
| `[:alpha:]`  | (letters)字母字符（字母）                    | `[a-zA-Z]`                              |
| `[:ascii:]`  | 7位ASCII                                     | `[\x01-\x7F]`                           |
| `[:blank:]`  | 水平空白符(空格、制表符)                     | `[ \t]`                                 |
| `[:cntrl:]`  | 控制字符                                     | `[\x01-\x1F]`                           |
| `[:digit:]`  | 数字                                         | `[0-9]`                                 |
| `[:graph:]`  | 用墨水打印的字符(非空格、非控制字符)         | `[^\x01-\x20]`                          |
| `[:lower:]`  | 小写字母                                     | `[a-z]`                                 |
| `[:print:]`  | 可打印字符(图形类加空格和制表符)             | `[\t\x20-\xFF]`                         |
| `[:punct:]`  | 任意标点符号，如句点(.)和分号(;)             | `[-!"#$%&'( )*+,./:;<=>?@[\\\]^_'{|}~]` |
| `[:space:]`  | 空白（换行、回车、制表符、空格、垂直制表符） | `[\n\r\t \x0B]`                         |
| `[:upper:]`  | 大写字母                                     | `[A-Z]`                                 |
| `[:xdigit:]` | 十六进制数字                                 | `[0-9a-fA-F]`                           |



## 数值运算

Bash中的数学运算并不如其他语言般简便，因为Bash把所有变量都视作[字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)，所以a=1+2，a并不等于3，而是等于字符串1+2。有下面几种方案解决

### 运算符  []

使用方法 $[ ... ]

```bash
a=2
b=3
c=$[a+b]
d=$[a-b]
e=$[a*b]
f=$[a/b]
g=$[a%b] 
```

支持字面量

```bash
c=$[2+3]
d=$[2-3]
e=$[2*3]
f=$[2/3]
```

需要注意的是：

- 该运算只支持整数，如果a或者b是小数，则会报错。运算结果是小数的也会自动取整。
- 该运算[ ]的操作符（+-*/）和变量之间可以有空格。即可写作c=$[a + b]

### 运算符(())  类似 []

### expr 命令

```bash
a=2
b=3
expr $a + $b
expr $a - $b
expr $a \* $b
expr $a / $b
expr $a % $b
# 如果要将计算结果赋值..
c=`expr $a + $b`
```

需要注意的是：

- 操作符和操作数之间**一定要**有空格间隔
- 操作数（即变量）前必须有$符
- 乘号*，要用反斜杠\进行转义
- 该命令会将计算结果打印到标准输出
- 仅支持整数运算
- 也可以直接使用数字的字面值

### bc 命令(支持浮点运算)

因为bc的默认精度是0。你可能会想到的解决方案是：echo '2.0/3'|bc。但是输出结果依旧是0。

其他运算，比如加、减和乘。都会自动取操作数中的最大精度为输出结果的精度。
```bash
echo '2.0*3.00'|bc #6.00
echo '2.25+4.5'|bc #6.75
echo '5.66-7.888'|bc #-2.228 
```


但是除法不行，你必须手动设置。

```bash
echo 'scale=3;2/3'|bc
# .666
```

.666为输出的结果。因为设置了精度scale=3。前导0会被忽略。
bc功能强大，你甚至能直接利用bc来进行进制转换。

![img](assets\456456.png)

obase为输出的进制，ibase为输入的进制。

### 自增自减

进行自增自减运算需要注意的有两点：

1. 操作数必须是变量
2. 操作数必须是整数

Bash中要实现这一功能需要借助命令***let***（内部命令）,且不需要 $。

![img](assets\432563463.png)

## for 循环结构

### 基本格式

```bash
for 变量 in 取值列表
do
    各种操作
done
```

还有罕见的写法就是都写作一行里：

`for 变量 in 取值列表 ; do 各种操作 ;done`

取值列表大致可以分成枚举和迭代两类

### 枚举

#### 普通枚举

取值列表为空格或回车符分割的字符串

```bash
for i in 'apple' 'meat' 'sleep' 'woman'
do
    echo I like $i
done
```

在终端执行该脚本for.sh。运行结果

```bash
I like apple
I like meat
I like sleep
I like woman
```

#### 配合命令替换

命令替换即和$( )两种操作符的使用。命令替换配合 for 循环很常见。
比如我系统的用户叫做jelly，现在我新建了一个叫做guodong的用户。 但是guodong用户缺少很多组权限。我想让guodong拥有jelly所在的全部组。
那么我可以这样：

```bash
for var in `groups jelly`
do
    echo $var #打印组名
    gpasswd -a guodong $var
done
```

请用root运行该脚本，这样就完成了一个给用户guodong批量添加组的任务。

### 迭代 { }

- 数字迭代，比如{1..100}
- 字母迭代，比如{a..z},{A..Z},{Z..A}
- ASCII字符迭代，比如{a..A}

```bash
# 定义数组
declare -A arr
arr[0]=1
arr[1]=2
arr[2]=3
for i in {0..2}
do
  echo ${arr[$i]}
done
```

计算一下1加到100的和

```bash
#!/bin/bash
ans=0
for i in {1..100}
do
    let ans+=$i
done
echo $ans
```


花括号的迭代还可以指定指定增量，格式如下：

**{首..尾..增量}**  

计算一下1到100以内的所有奇数的和：

```bash
ans=0
for i in {1..100..2}
do
  let ans+=$i
done
echo 1 到 100 的奇数和是 : $ans
```



### seq

需要配合命令替换 `` 使用。seq 命令的格式为：

**seq 首数 [增量] 末数**
请注意增量的位置在中间，这与前面提到的花括号不同。

```bash
#使用脚本 ping 局域网主机:
PREFIX=192.168.1.
for i in `seq 100 110`
do
  echo -n IP Address: "${PREFIX}$i "
  # -c5 执行 5 次 -w(?sec) 设定执行时间
  ping -c2 -w1 ${PREFIX}$i >/dev/null 2>&1
  # >/dev/null 2>&1 默认情况是1，也就是等同于1>/dev/null 2>&1。
  # 意思就是把标准输出重定向到“黑洞”，还把错误输出2重定向到标准输出1，也就是标准输出和错误输出都进了“黑洞”
  if [ $? -eq 0 ]; then
  # 在 shell 脚本中，表示 $? 代表上一个命令执行后的退出状态；
  # -eq：表示等于；
  # 语句if [ $? -eq 0 ]表示 shell 传递到脚本的参数等于0，则执行 then 中的语句。
    echo "OK"
  else
    echo "Failed"
  fi
done
```

```bash
$ bash ping.sh 
192.168.1.100 Failed
192.168.1.101 Failed
192.168.1.102 OK
192.168.1.103 OK
192.168.1.104 OK
192.168.1.105 OK
192.168.1.106 Failed
192.168.1.107 Failed
192.168.1.108 Failed
192.168.1.109 Failed
192.168.1.110 Failed
```



## while 循环结构

```sh
while 条件
do
    循环体
done
```

和for语句一样，它的循环体同样是do…done结构。我们可以把while语句再折叠一下

```sh
while 条件;do
    循环体
done
```

还能进一步折叠成一行体

```sh
while 条件;do 循环体;done
```

### while 条件 []

和if语句的条件相同。即操作符[ ]。关于[ ]的用法请参考之前的文章。

```bash
#!/bin/bash
n=1
while [ $n -le 10 ]
do
    echo $n
    let n++    #或者写作n=$(( $n + 1 ))
done
```

操作符`[ ]`和`test`语句是等价的，所以这里也可以用test语句来作条件

### 终端命令

while的条件可以是各种终端的命令。包括外部命令或bash内建（built-in）命令都可以。因为命令都是有返回值的（可以用echo $?查看），命令执行的成功与否就是while条件的真或假。

以read命令来举个例子

```bash
#!/bin/bash
while read var;do
    echo "您输入的是$var"
done
```

这个程序是个死循环，将不停地等待您的输入，并回显出来。

这里的命令可以是单个命令也可以是组合命令，比如用逻辑连接符连接的命令，或者管道、重定向组成的长命令


### 死循环

除了让while条件恒成立外，编程语言都有一种简洁的死循环写法。比如C语言中典型的死循环条件是while(1)，而java中的写法是while(true)。 
而Bash中的写法则简单的多，只需要一个冒号。

```sh
#!/bin/bash
while :
do
    echo I love you forever
done
```

这是一个死循环，执行之后请用按组合键Ctrl+C来终止它。 
此外，还有一种死循环写法就是利用系统自带的true命令（/bin/true）

```sh
#!/bin/bash
while /bin/true
do
    echo I love you forever
done
```

由于我们的系统环境变量（PATH）中一般都包含了路径/bin，所有我们也可以简写成while true

### 重定向

#### 输入重定向 <

格式为

```sh
while 命令
do
    循环体
done < 文件名
```

相当于将文件内容逐行传递给while后面的命令(类似管道)，然后再执行循环体。 
当循环体为空的时候，这个结构的功能通常和cat没有两样，比如：

```sh
while grep "love"
do
done < letter
```

从文件letter中查找love这个单词，其实和cat letter|grep “love”没什么两样。

这个结构更习惯的用法和read联用，来将文件内容逐行取出，赋值给read后面的变量。比如：

```sh
#!/bin/bash
#从/etc/passwd文件中读取用户名并输出
oldIFS=$IFS #IFS是文件内部分隔符
IFS=":"     #设置分隔符为:
while  read username var #var变量不可少
do
    echo "用户名:$username"
done < /etc/passwd 
IFS=$oldIFS
```

熟悉/etc/passwd文件结构的朋友都知道这个文件的每一行包含了一个用户的大量信息（用户名只是第一项）。 
这里我们实际只输出了用户名。但是注意while的read后面除变量username外还有个var，尽管我们并不输出这个变量的值。 
但它却必不可少，如果我们写成while read username那么username的值等于passwd文件这一整行的内容（IFS=”:”也就不起作用了）

bash中，只有当有多个变量要从一行文本赋值的时候，才尝试去用IFS来分割，然后赋值。

### 输出重定向 >

这个结构会将命令的输出，以及循环体中的标准输出都重定向到指定的文件中。 
比如：

```sh
#!/bin/bash
#每隔3s，ping一下局域网内主机192.168.1.101，
#并把结果记录到ping.txt文件中
while date
do
    ping -c5 192.168.1.101 >/dev/null 2>&1 
    if [ $? = 0 ];then
        echo OK
    else
        echo FAIL
    fi
    sleep 3 # 1 = 1s
done > ping.txt
```

cat一下ping.txt文件，看一看：

```sh
Tue Jan 17 17:23:49 CST 2023
OK
Tue Jan 17 17:23:53 CST 2023
OK
Tue Jan 17 17:23:57 CST 2023
OK
```



## 测试命令

### 关于真值

与其他语言不同，Bash（包括其他Shell）中，是用0表示真，非0表示假的。
之所以用0表示成功，而不是1来表示。我认为也是有一定道理的，因为成功的情况只有一种，而出错的可能却有许多，所以用正数来表示错误。不同的正数代表着不同的错误，所以一般情况下可以通过正数的值来判断是出了什么错误。

### 测试整数

整数的test就是大小关系的比较，与其他语言不同，Bash中没有使用<,>来做大于等于号，而是使用了 - 开头的选项来比较。

假如有两个整数变量a和b。那么比较a是否大于b，就写作test $a -gt $b，符合条件返回真值0。
实际在终端里测试的时候可以这样写来看test语句的执行结果:

`test $a -gt $b && echo Yes || echo No`
如果条件成立打印 Yes，不成立打印 No。

| 选项 |   描述   |     英文全称     |
| :--- | :------: | :--------------: |
| eq   |   等于   |      equal       |
| gt   |   大于   |   greater than   |
| lt   |   小于   |    less than     |
| ne   |  不等于  |    not equal     |
| ge   | 大于等于 | greater or equal |
| le   | 小于等于 |  less or equal   |

>还要注意的是使用以上操作符，那么操作符两边一定要是整数。
>在Bash中，即使给整数加了引号，比如"123"，也视作整数。但如果某一位含有整数[0-9]以外的字符比如，12a，"12a"，则不行。

```bash
a=2;
b=1;
c=false;
test $a -eq $b && echo Yes || echo No # No
test $a -gt $b && echo Yes || echo No # Yes
test $a -gt $c && echo Yes || echo No # test: false: integer expression expected
```

### 测试字符串

假设str1和str2是持有两个字符串的变量(直接测试两个字符串，而非字符串变量时，则不加$，这很好理解)。具体用法为：

| 选项                |                描述                 |
| :------------------ | :---------------------------------: |
| test $str1 = $str2  |       测试是否相等，相等返回0       |
| test $str1 != $str2 |       测试是否不等，不等返回0       |
| test $str1 \< $str2 | 如果str1的字典序在str2之后，则返回0 |
| test $str1 \> $str2 | 如果str1的字典序在str2之前，则返回0 |
| test $str1          |              总是返回0              |
| test -n $str1       |           如果不为空返回0           |
| test -z $str1       |          如果是空串，返回0          |

> PS : 关于字典序的那两个比较，其实就是大于号`>`和小于号`<`。因为bash中这两个符号有重定向的意思，所以这里要使用反斜杠`\` 转义。
>
> PS : 选项`-n`是 nonzero 的缩写，理解为**长度不为0**。**但需要特别指出的是**：-n选项测试时请将引用变量外加上双引号。
>
> Bash中的引用变量的方法有很多种，我认为此处应该是加不加双引号无所谓的。
> 经测试，如果我有当前未定义变量var（或者定义为var=""），那么理论上讲，var就是空串。
> test -n $var应该是返回1（假）的，因为他的长度是0。但其实此时无论var是否为空串都会返回真值0。
> 但是加上双引号（注意不能是单引号），也就是test -n "$var"，效果就能如期，即只有在var为空的时候返回真值0。
> 而选项-z（是 zero 的缩写，理解为长度为0）引用变量的时候加不加双引号无所谓。

```bash
str1="abc"
str2="acb"
str3=""
test $str1 && echo str is exist
test -n "$str1" && echo str is not empty
test -n "$str3" && echo str is not empty
test -z $str3 && echo str is empty
test $str1!=$str2 && echo Yes
test $str1 \< $str2 && echo 'str1 < str2'
```



### 测试文件

- 测试单个文件

| 选项 | 描述               |
| :--- | :----------------- |
| d    | 是否为目录         |
| f    | 是否为普通文件     |
| x    | 是否有执行权限     |
| r    | 是否有读权限       |
| w    | 是否有写权限       |
| e    | 是否存在           |
| s    | 文件大小是否大于0  |
| c    | 是否为字符设备文件 |
| b    | 是否为块设备文件   |

```bash
test -e ~/.gitconfig && echo file exist
test -w ~/.gitconfig && echo .gitconfig can be write
test -x ~/.gitconfig && echo .gitconfig can be excute
test -f ~/.gitconfig && echo is a file
test -d ~/git && echo is a folder
test -d `pwd` && echo is a folder
```

- 测试多个文件

| **用法**             | 描述                                              |
| :------------------- | :------------------------------------------------ |
| test file1 -nt file2 | 测试file1的修改时间是不是比file2 newer than(新)   |
| test file1 -ot file2 | 测试file1的修改时间是不是比file2 older than（旧） |
| test file1 -ef file2 | 测试两者是相同的设备和具有相同的结点（inode）数   |

### 逻辑运算

Bash中同样有&&，||但是并非是在test内部，而是用来组合多条shell语句，前面我们应该看到过了，只有当&&前面的语句执行成功时，才执行后面的语句。而在test内部：

| 运算符 | 描述   |
| :----- | :----- |
| -a     | 逻辑与 |
| -o     | 逻辑或 |
| !      | 逻辑非 |

```bash
test $a -lt $b -a $a -gt $c
test $a -lt $b -o $a -gt $c
# 上述命令等同于
test $a -lt $b -a test $a -gt $c
test $a -lt $b -o test $a -gt $c

test ! -d sleep.sh && echo Yes #如果sleep.sh不是目录，就打印Yes
```

### 简化 (前后空格不能省略)

```bash
# 这里面要使用test 特有的逻辑运算符, && || 是不可以的
# test -f hello.c  === [ -f hello.c ]
[ 1 -lt 0 ] && echo Yes
[ 1 -gt 0 ] && echo Yes


# 如果要使用算术扩展 使用 (())
(( "$a" < "$b" && "$b" > 0)) && echo 0
```


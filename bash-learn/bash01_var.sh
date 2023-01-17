# bash 的变量

# 注意以下规则：
# 只能包含字母、数字和下划线，并且不能以数字开头
# 大小写敏感
# 不能和系统变量重名
# 导出为全局变量，名称最好要全部大写。这只是一种习惯的约定，并非严格的约束。


# 新建变量
# Bash中的变量和其他脚本语言一样，都是无需声明，直接拿来用的。
# 所以变量的第一次出现都是伴随着初始化的。
# Bash中的初始化（或赋值）方式共有三种：直接赋值、读取输入和命令替换。

# 直接赋值 注意 等号左右不能有空格!!
# 如果你写作 a = 123。那么系统会将视作你在执行一个命令a 而= 和123都是这个命令的参数。
# a=123
# b=abc
# c=‘123’
# d=“hello world”

a="foo"
echo $a
echo 'Jelly:"Hi"'
# 拼合字符串 使用双引号 "", `` 则是执行命令,  单引号则会转义
name="Sam"
echo "My name is $name"
# echo `My name is $name`  My: command not found
echo 'My name is $name'


# 读取输入
# 读取终端的输入给变量赋值，就是使用read命令。read和echo一样都是内嵌命令。
echo -n "请输入用户名:"
read name
echo "欢迎你, 尊敬的 $name"

# 使用 read -p 简化上述代码
read -p "Please input your name: " name1
echo "$name1 welcome to Bash!"


# 命令替换
# 利用其他命令的输出来给一个变量赋值。
# 这需要用到反引用符号 ` ` 。
# 以下代码调用了pwd和date两个命令并赋值给变量
dir=`pwd`
t=`date -R`
ls=$(ls)
echo "当前目录是 $dir"
echo "现在时间是 $t"
echo "文件夹信息"  $ls


# 生成随机数
echo "随机数 $RANDOM"
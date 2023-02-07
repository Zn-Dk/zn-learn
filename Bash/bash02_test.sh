# 假如有两个整数变量a和b。那么比较a是否大于b，就写作test $a -gt $b，符合条件返回真值0。
# 实际在终端里测试的时候可以这样写来看test语句的执行结果:

# 测试整数
a=2;
b=1;
c=false;
test $a -eq $b && echo Yes || echo No #No
test $a -gt $b && echo Yes || echo No #Yes
# test $a -gt $c && echo Yes || echo No # test: false: integer expression expected

# 测试字符串
str1="abc"
str2="acb"
str3=""
test $str1 && echo str is exist
test -n "$str1" && echo str is not empty
test -n "$str3" && echo str is not empty
test -z $str3 && echo str is empty
test $str1!=$str2 && echo Yes
test $str1 \< $str2 && echo 'str1 < str2'

# 测试文件
test -e ~/.gitconfig && echo file exist
test -w ~/.gitconfig && echo .gitconfig can be write
test -x ~/.gitconfig && echo .gitconfig can be excute
test -f ~/.gitconfig && echo is a file
test -d ~/git && echo is a folder
test -d `pwd` && echo is a folder

# 逻辑运算 简化 -a &&    -o ||    not !
a=1
b=2
c=1
test $a -lt $b -a $a -eq $c && echo 'test passed'
test $a -lt $b -o $a -gt $c && echo 'test passed'
test ! -d bash00.sh && echo bash00.sh is not a folder

# test 命令的简化 (前后空格不能省略)
# 这里面要使用test 特有的逻辑运算符, && || 是不可以的
# test -f hello.c  === [ -f hello.c ]
[ 1 -lt 0 ] && echo Yes
[ 1 -gt 0 ] && echo Yes

# 如果要使用算术扩展 使用 (())
(( "$a" < "$b" && "$b" > 0)) && echo 0



main() {
  echo "main function is running"
}

echo `main`
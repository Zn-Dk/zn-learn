# 特殊变量


# 引入参数
echo $0 $1 $2 $3
# 数字变量0，保存的是这个执行脚本的名称，其他的数字1到n保存该脚本运行时的第1到第n个参数。
# bash03_special_var.sh A B C

# 参数的个数 $#
echo 本脚本$0 的参数个数为 $#

# 打印所有的参数 $* / $@
echo 本脚本目前的参数有 $*
echo 本脚本目前的参数有 $@


echo "遍历不带引号的变量*"
for i in $*
do
    echo $i
done
echo "遍历带引号的变量*"
for i in "$*"
do
    echo $i
done
echo "遍历不带引号的变量@"
for i in $@
do
    echo $i
done
echo "遍历带引号的变量@"
for i in "$@"
do
    echo $i
done

echo "exit code: $?"


echo "当前进程的PID为$$"
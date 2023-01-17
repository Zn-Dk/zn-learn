#!/bin/bash

# for 循环体

# for 变量 in 取值列表
# do
#     各种操作
# done


# 枚举
for i in 'apple' 'foo' 'orange'
do
  echo I love $i
done

# 迭代, 简单数字, $ 代表变量
# 定义数组
declare -A arr
arr[0]=1
arr[1]=2
arr[2]=3
for i in {0..2}
do
  echo ${arr[$i]}
done

# 计算 100!
ans=0
for i in {0..100}
do
  let ans+=$i
done
echo 1 到 100 的和是 : $ans

# 可以指定步进数(增量) {首..尾..增量}
ans=0
for i in {1..100..2}
do
  let ans+=$i
done
echo 1 到 100 的奇数和是 : $ans

# seq 命令   seq 起始数 [增量] 末数

# 简单输出
for i in `seq 2 2 10`
do
  echo $i
done

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

#每隔3秒，ping一下主机9.135.14.141，
#并把结果记录到ping.txt文件中
while date
do
  ping -w1 9.135.14.141 >/dev/null 2>&1
  if [ $? = 0 ];then
    echo OK
  else
    echo FAIL
  fi
  sleep 3
done > ping.txt
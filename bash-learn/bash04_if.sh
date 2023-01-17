# if 选择结构

# 注意if和[ ]之间要有空格。if [ ... ]

score=67

checkScore(){
    if [ $score -gt 60 ];then
        echo 'u passed the exam'
    else
        echo 'u did not passed the exam'
    fi
}

checkScore $score


read -p "猜猜随机数" ipt
if [ $ipt -gt $RANDOM ];then
    echo "你输入的数比生成的随机数 $RANDOM 大"
else
    echo "你输入的数比生成的随机数 $RANDOM 小"
fi

read -p "请输入一个文件名:" name
if [ -e `$name` ]
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

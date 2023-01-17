# # case 选择结构

read -p "你喜欢什么颜色：" color
case $color in
    red) echo -e "\e[1;31m$color \e[0m";;
    green) echo -e "\e[1;32m$color \e[0m";;
    yellow) echo -e "\e[1;33m$color \e[0m";;
    blue) echo -e "\e[1;34m$color \e[0m";;
    *) echo -e "\e[1;30m这是什么颜色?\e[0m";;
esac


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


# 更精确的匹配 ;;&
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


# 匹配正则
# 支持 * ? []  () <-需要转义 写成 (\)
read -p "输入数字" n
case $n in
    [[:digit:]]*) echo "是数字";;&
    [0-9]) echo "数字小于10";;&
    [1-9][0-9]*) echo "数字大于10";;&
    (111|222|333\)) echo "特殊数字!";;
esac
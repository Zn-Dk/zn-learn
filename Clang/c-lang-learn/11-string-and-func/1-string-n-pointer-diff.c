#include <stdio.h>

int main(void)
{
    // 数组表示和指针表示字符串 两者的区别
    char  ar_str[] = "Helvolta";
    char* pt_str   = "Helvolta";

    // 1. ✔️ 数组表示
    printf("ar_str[0] = %c, pt_str[0] = %c\n", ar_str[0], pt_str[0]);

    // 2. ✔️ 加减运算
    printf("*(ar_str + 2) = %c, *(pt_str + 2) = %c\n", *(ar_str + 2), *(pt_str + 2));

    // 3. 自加减运算 数组不允许自身移动
    // printf("*(ar_str++) = %c", *(ar_str++)); 报错
    printf("*(pt_str++) = %c\n", *(pt_str++));

    pt_str--;
    // 因此只有指针形态的允许这样遍历
    while (*(pt_str) != '\0')
        putchar(*(pt_str++));

    // 4. 因为数组名（非const数组元素是变量）是常量, 指针是变量
    pt_str = ar_str;  // 指针指向数组, 成立
    // ar_str = pt_str; 数组不能被赋值

    return 0;
}
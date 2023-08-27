#include <stdio.h>

int main(void)
{
    // 强制类型转换运算符 cast operator
    // 这会使得右侧的值转换成括号内的指定类型
    int i;
    i = (int)(5.0 * 2.0);
    printf("%d \n", i);

    float a = 1.6, b = 1.7;
    int   result;

    result = a + b;  // 3.3
    // 在 printf 中进行自动类型转换, 触发整数的截断
    printf("%d \n", result);  // 3

    // 提前对两个运算对象进行转换
    result = (int)a + (int)b;  // 1 + 1
    printf("%d \n", result);   // 2

    return 0;
}
#include <stdio.h>
#include <stdlib.h>

/*
编写一个函数，把double类型数组中的数据倒序排列，并在一个简单
的程序中测试该函数。
 */

// 验证函数
void print_arr(double* target, int len)
{
    for (int i = 0; i < len; i++)
        printf("%.1lf,", target[i]);
    putchar('\n');
}

// 1. 修改原数组
void reverse(double ar[], int len)
{
    double tmp;
    for (int i = 0; i < (len / 2); i++) {
        tmp             = ar[i];
        ar[i]           = ar[len - i - 1];
        ar[len - i - 1] = tmp;
    }
}

// 2. 返回新数组 (高级用法)
double* to_reverse(double ar[], int len)
{
    double* tmp = (double*)malloc(len * sizeof(double));  // 分配内存;
    for (int i = 0; i < len; i++) {
        tmp[i] = ar[len - i - 1];
    }
    return tmp;
}

int main(void)
{
    double source[5] = {1.1, 2.2, 3.3, 4.4, 5.5};

    printf("to_reverse, no modify source, result is: \n");
    double* reversed = to_reverse(source, 5);
    print_arr(reversed, 5);
    // free(reversed);  // 释放内存

    printf("after to_reverse, source: \n");
    print_arr(source, 5);
    putchar('\n');
    printf("reverse, will modify source, ");
    reverse(source, 5);
    printf("after reverse, source: \n");
    print_arr(source, 5);
    return 0;
}
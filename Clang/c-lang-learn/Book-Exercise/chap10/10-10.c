#include <stdio.h>

/*
编写一个函数，把两个数组中相对应的元素相加，然后把结果储存
到第 3 个数组中。也就是说，如果数组1中包含的值是2、4、5、8，数组2中
包含的值是1、0、4、6，那么该函数把3、4、9、14赋给第3个数组。函数接
受3个数组名和一个数组大小。在一个简单的程序中测试该函数。
 */

void sum_arr(const int a[], const int b[], int sum[], int len)
{
    for (int i = 0; i < len; i++)
        sum[i] = a[i] + b[i];
}

void print_arr(int target[], int len)
{
    for (int i = 0; i < len; i++)
        printf("%d,", target[i]);
    putchar('\n');
}

int main(void)
{
    int a[4] = {2, 4, 5, 8};
    int b[4] = {1, 0, 4, 6};
    int target[4];

    sum_arr(a, b, target, 4);

    print_arr(target, 4);
    return 0;
}
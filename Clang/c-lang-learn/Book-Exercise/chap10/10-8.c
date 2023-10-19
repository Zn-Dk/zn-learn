#include <stdio.h>

/*
使用编程练习2中的拷贝函数，把一个内含7个元素的数组中第3～第5
个元素拷贝至内含3个元素的数组中。该函数本身不需要修改，只需要选择
合适的实际参数（实际参数不需要是数组名和数组大小，只需要是数组元素
的地址和待处理元素的个数）。

 */

void copy_ar(double target[], const double source[], int len)
{
    for (int i = 0; i < len; i++)
        target[i] = source[i];
}

void print_arr(double target[], int len)
{
    for (int i = 0; i < len; i++)
        printf("%.1lf,", target[i]);
    putchar('\n');
}

int main(void)
{
    double source[7] = {1, 2, 3, 4, 5, 6, 7};
    double target[3];

    copy_ar(target, &source[3], 3);  // 放指针

    print_arr(target, 3);
    return 0;
}
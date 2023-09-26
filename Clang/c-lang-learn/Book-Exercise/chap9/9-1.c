#include <stdio.h>

/*
设计一个函数min(x, y)，返回两个double类型值的较小值。在一个简单
的驱动程序中测试该函数。
 */

double min(double x, double y);

int main(void)
{
    double x, y;
    
    printf("Enter two floating number: ");

    while (scanf("%lf %lf", &x, &y) == 2) {
        printf("x=%.2f, y=%.2f, min=%.2f\n", x, y, min(x, y));
        printf("Enter another two floating number: ");
    }

    return 0;
}

double min(double x, double y)
{
    return x > y ? y : x;
}
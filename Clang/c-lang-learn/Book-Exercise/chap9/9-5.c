#include <stdio.h>
/*
  编写并测试一个函数larger_of()，该函数把两个double类型变量的值替
  换为较大的值。例如， larger_of(x, y)会把x和y中较大的值重新赋给两个变
  量。
*/

void large_of(double* x, double* y);

int main(void)
{
    double x = 1.5;
    double y = 6.6;

    printf("x=%.2f, y=%.2f\n", x, y);

    large_of(&x, &y);

    printf("Now, x=%.2f, y=%.2f\n", x, y);

    return 0;
}

void large_of(double* x, double* y)
{
    *x = *x > *y ? *x : *y;
    *y = *x;
}
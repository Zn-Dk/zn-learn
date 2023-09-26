#include <stdio.h>

/*
  两数的调和平均数这样计算：先得到两数的倒数，然后计算两个倒数
  的平均值，最后取计算结果的倒数。编写一个函数，接受两个double类型的
  参数，返回这两个参数的调和平均数。
 */
double harmonic_avg(double x, double y);

int main(void)
{
    double x, y;
    printf("Enter two double: ");
    scanf("%lf %lf", &x, &y);
    printf("Harmonic average of %.2f,%.2f is %.2f", x, y, harmonic_avg(x, y));
    return 0;
}

double harmonic_avg(double x, double y)
{
    return 1 / ((1 / x + 1 / y) / 2);
}
#include <stdbool.h>
#include <stdio.h>

/*
.第6章的程序清单6.20中，power()函数返回一个double类型数的正整数
次幂。改进该函数，使其能正确计算负幂。另外，函数要处理0的任何次幂
都为0，任何数的0次幂都为1（函数应报告0的0次幂未定义，因此把该值处
理为1）。要使用一个循环，并在程序中测试该函数。

6.20 -------

double power(double n, int p)
{
    double pow = 1;
    int i;
    for (i = 1; i <= p; i++)
    pow *= n;
    return pow; // 返回pow的值
}


 */

double power(double base, int p);

int main(void)
{
    double n;
    int    p;
    printf("Power calc test, enter like 2^5 or 3.5^-2 : ");

    while ((scanf("%lf^%d", &n, &p)) == 2) {
        printf("%.2f^%d is %.4f\n", n, p, power(n, p));
        printf("Power calc test, enter like 2^5 or 3.5^-2 : ");
    }

    return 0;
}

double power(double base, int p)
{
    double pow = 1.0;
    int    i;
    bool   is_neg = false;

    // 0 的其他非 0 次幂
    if (base == 0 && p != 0)
        return 0;

    // 任意数的 0 次幂
    if (p == 0) {
        // 如果是 0 报告给用户
        if (base == 0) {
            printf("0 expr 0 is undefined, I will return 1.0 for this calc!\n");
        }
        return pow;
    }

    if (p < 0) {
        is_neg = true;
        p      = -p;
    }

    for (i = 1; i <= p; i++) {
        // 负幂处理
        if (is_neg)
            pow /= base;
        else
            pow *= base;
    }

    return pow;  // 返回pow的值
}
#include <stdio.h>

int square(int n)
{
    return n * n;
}

unsigned long power(int n, int p)
{
    unsigned long sums = 1;
    for (int i = 0; i < p; i++) {
        sums *= n;
    }
    return sums;
}

/** power 浮点数版
 * 0的任何次幂都为0，
 * 任何数的0次幂都为1（函数提示)
 */
double power_db(double base, int p)
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

double min(double x, double y)
{
    return x > y ? y : x;
}

/** 调和平均值 */
double harmonic_avg(double x, double y)
{
    return 1 / ((1 / x + 1 / y) / 2);
}

/** 把两个double类型变量的值替换为较大的值。 */
void large_of(double* x, double* y)
{
    *x = *x > *y ? *x : *y;
    *y = *x;
}

/** 是否为素数 */
bool is_prime(unsigned long num)
{
    unsigned long div;
    bool          isPrime = true;

    for (div = 2; (div * div) <= num; div++) {
        if (num % div == 0) {
            isPrime = false;
        }
    }

    return isPrime;
}

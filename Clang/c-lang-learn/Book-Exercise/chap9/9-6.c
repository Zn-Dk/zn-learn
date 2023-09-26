#include <stdio.h>

/*
  编写并测试一个函数，该函数以3个double变量的地址作为参数，把最
  小值放入第1个函数，中间值放入第2个变量，最大值放入第3个变量。
 */
void exchange(double* a, double* b, double* c);

int main(void)
{
    double x = 1.5, y = 1.8, z = 1.4;

    printf("We have x=%.1f, y=%.1f, yz=%.1f\n", x, y, z);
    exchange(&x, &y, &z);
    printf("Now we have sorted x=%.1f, y=%.1f, yz=%.1f\n", x, y, z);
    return 0;
}

void exchange(double* a, double* b, double* c)
{
    double tmp;

    // 2-8-1  先交换 bc 2-1-8 , 再交换 ab 1-2-8
    // 3-1-2  先交换 ab 1-3-2 , 再交换 bc 1-2-3

    // 先比较 a b
    if (*a > *b) {
        tmp = *a;
        *a  = *b;
        *b  = tmp;
    }

    // 否则再比较 b c
    if (*b > *c) {
        tmp = *b;
        *b  = *c;
        *c  = tmp;
        // bc 如果交换了, 然后再对比一次 a b(c)
        if (*a > *b) {
            tmp = *a;
            *a  = *b;
            *b  = tmp;
        }
    }
}

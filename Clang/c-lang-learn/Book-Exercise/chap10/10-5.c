#include <stdio.h>

/*
编写一个函数，返回储存在double类型数组中最大值和最小值的差
值，并在一个简单的程序中测试该函数。
 */

double max_diff(double ar[], int len)
{
    double min = *ar, max = *ar;
    for (int i = 0; i < len; i++) {
        if (ar[i] < min) {
            min = ar[i];
        }
        else if (ar[i] > max) {
            max = ar[i];
        }
    }
    printf("min: %.1f, max: %.1f ", min, max);
    return max - min;
}

int main(void)
{
    double source[5] = {1.1, 2.2, 3.3, 4.4, 5.5};

    printf("max diff %.1f", max_diff(source, 5));

    return 0;
}
#include <stdio.h>
/*
编写一个程序，读取整数直到用户输入 0。输入结束后，程序应报告
用户输入的偶数（不包括 0）个数、这些偶数的平均值、输入的奇数个数及
其奇数的平均值
 */
int main(void)
{
    int n, even_ct, even_sums, odd_ct, odd_sums;
    even_ct = even_sums = odd_ct = odd_sums = 0;

    printf("Enter a series of integer: (0 to quit): \n");
    while (scanf("%d", &n) != 0 && n != 0) {
        if (n % 2 == 0) {
            even_ct++;
            even_sums += n;
        }
        else {
            odd_ct++;
            odd_sums += n;
        }
    }

    printf("Series number analysis: \n");

    // 必须先有 sums 再计算平均值, 防止出现无法输出的情况
    if (odd_sums)
        printf("Odd:   count: %d  avg: %.2f\n", odd_ct, (float) odd_sums / odd_ct);

    if (even_sums)
        printf("Even:  count: %d  avg: %.2f\n", even_ct, (float) even_sums / even_ct);

    /*
        Enter a series of integer: (0 to quit):
        1 2 3 4 5 6 7 8 9 10
        0
        Series number analysis:
        Odd:  count: 5  avg: 5.00
        Even:  count: 5  avg: 6.00
     */

    return 0;
}
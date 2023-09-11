#include <stdio.h>
/*
    编写一个程序，创建一个包含8个元素的int类型数组，分别把数组元
    素设置为2的前8次幂。使用for循环设置数组元素的值，使用do while循环显
    示数组元素的值。
 */
unsigned long power(int n, int p);

int main(void)
{
    const int SIZE = 8;
    int       nums[SIZE];
    int       i;

    for (i = 0; i < SIZE; i++) {
        nums[i] = power(2, i + 1);
    }
    
    i = 7;

    do {
        printf("2^%d is %d\n", i + 1, nums[i]);
        i--;
    } while (i >= 0);

    return 0;
}

unsigned long power(int n, int p)
{
    unsigned long sums = 1;
    for (int i = 0; i < p; i++) {
        sums *= n;
    }
    return sums;
}
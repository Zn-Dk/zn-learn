#include <stdio.h>
/*
编写一个程序，要求用户输入一个上限整数和一个下限整数，计算
从上限到下限范围内所有整数的平方和，并显示计算结果。然后程序继续提
示用户输入上限和下限整数，并显示结果，直到用户输入的上限整数小于等于下
限整数为止。程序的运行示例如下：
    Enter lower and upper integer limits: 5 9
    The sums of the squares from 25 to 81 is 255
    Enter next set of limits: 3 25
    The sums of the squares from 9 to 625 is 5520
    Enter next set of limits: 5 5
    Done
 */
int square(int n);
int sum_square(int min, int max);
int main(void)
{
    int sum, min, max;
    printf("Enter lower and upper integer limits: ");

    while (scanf("%d %d", &min, &max) == 2 && max > min) {
        printf("The sums of the squares from %d to %d is %d\n", 
                square(min), square(max),sum_square(min, max));
        printf("Enter next set of limits: ");
    };

    printf("Done");

    return 0;
}

int square(int n)
{
    return n * n;
}

int sum_square(int min, int max)
{
    int sum;
    for (int i = min; i <= max; i++) {
        sum += square(i);
    }
    return sum;
}
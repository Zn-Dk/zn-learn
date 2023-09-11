#include <stdio.h>
/*
  编写一个程序打印一个表格，每一行打印一个整数、该数的平方、该
  数的立方。要求用户输入表格的上下限。使用一个for循环。
 */

unsigned long power(int n, int p);

int main(void)
{
    int num;
    int min, max;

    do {
        printf("Enter min~max (integer)range, split range by space: ");
        scanf("%d %d", &min, &max);
        getchar();
    } while (min >= max);

    printf("|Int        |Square     |Cube       |\n");
    for (int i = min; i <= max; i++) {
        printf("|-----------|-----------|-----------|\n");
        printf("|%-11d|%-11d|%-11d|\n", i, power(i, 2), power(i, 3));
        printf("|-----------|-----------|-----------|\n");
    }

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
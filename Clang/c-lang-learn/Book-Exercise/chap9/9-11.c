#include <ctype.h>
#include <stdio.h>

unsigned long fibo(int n);
unsigned long fibo_optimize(int n);

// 编写并测试Fibonacci()函数，该函数用循环代替递归计算斐波那契数。
int main(void)
{
    int           n;
    unsigned long result;
    do {
        if (n) {
            printf("is %ld \n", fibo_optimize(n));
        }

        printf("fibonacci: ");
    } while (scanf("%d", &n) == 1);

    return 0;
}

// 循环法计算斐波那契数列
unsigned long fibo(int n)
{
    // 用数组记录前面的值
    unsigned long arr[40];
    arr[0] = 1;
    arr[1] = 1;

    if (n < 0)
        return 0;

    for (int i = 2; i < n; i++)
        arr[i] = arr[i - 1] + arr[i - 2];

    return arr[n - 1];
}

// 循环法计算斐波那契数列 优化
unsigned long fibo_optimize(int n)
{
    // 不需要使用数组 每次记录下前两位数即可

    if (n < 0)
        return 0;
    if (n <= 2)
        return 1;

    unsigned long fib_n = 1, fib_n1 = 1, fib_n2 = 1;

    for (int i = 3; i <= n; i++) {
        // n-2 为上次的 n-1
        fib_n2 = fib_n1;
        // n-1 为上次的 n
        fib_n1 = fib_n;
        fib_n  = fib_n1 + fib_n2;
    }

    return fib_n;
}
#include <stdio.h>

unsigned long fibonacci(int n);

int main(void)
{
    int n;
    printf("Enter the index of fibonacci number: ");
    while (scanf("%d", &n) == 1) {
        printf("%d's fibonacci number is %d\n", n, fibonacci(n));

        printf("Enter another fibonacci number: ");
    };

    return 0;
}

unsigned long fibonacci(int n)
{
    if (n < 0)
        return 0;

    if (n < 2)
        return 1;

    return fibonacci(n - 2) + fibonacci(n - 1);
}
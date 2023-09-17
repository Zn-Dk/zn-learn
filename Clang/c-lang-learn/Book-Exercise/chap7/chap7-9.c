#include <stdbool.h>
#include <stdio.h>

/*
    编写一个程序，只接受正整数输入，然后显示所有小于或等于该数的
    素数。
 */

bool is_prime(unsigned long num);

int main(void)
{
    int num;

    printf("Enter a positive integer:(<=0 to exit): ");
    while (scanf("%d", &num) != 0 && num > 0) {
        for (int i = 1; i < num; i++)
            if (is_prime(i))
                printf("Prime %d is below %d\n", i, num);
        printf("Enter another positive integer:(<=0 to exit): ");
    }

    return 0;
}

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

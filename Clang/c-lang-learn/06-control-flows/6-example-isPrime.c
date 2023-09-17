#include <stdbool.h>
#include <stdio.h>

bool is_prime(int num);
int  main(void)
{
    /** 判断用户输入的数字是否是素数, 如果不是, 则逐行打印它的约数 */
    bool          isPrime = true;
    unsigned long num;  // 用户输入

    printf("Enter a number(q to exit): ");
    while (scanf("%d", &num) == 1) {
        isPrime = is_prime(num);
        if (isPrime)
            printf("Number %d is a Prime\n\n");
        else
            printf("Number %d is not a Prime\n\n");
        printf("Now enter another number(q to exit): ");
    };

    printf("Done!");

    return 0;
}

bool is_prime(int num)
{
    unsigned long div;  // 约数
    bool          isPrime = true;

    /**
     * 约数计算只需要平方根满足小于该数字,
     * 后半部分可以在前半部分直接与数字进行除法得商,
     * 故循环只需要对半, 减少时间
     * */
    for (div = 2; (div * div) <= num; div++) {
        /** 可被整除 视为约数 */
        if (num % div == 0) {
            if (div * div == num) /* 如果是正好是平方根, 比如 12 * 12 = 144, 则只输出一个约数  */
                printf("%d can be divided by %d \n", num, div);
            else /* 否则就输出 当前约数 和 输入数字与约数的商(同时计算另一个约数, ) */
                printf("%d can be divided by %d and %d \n", num, div, num / div);

            isPrime = false; /** 满足 if 标记为合数 */
        }
    }

    return isPrime;
}

/*
    Enter a number(q to exit): 11
    Number 11 is a Prime

    Now enter another number(q to exit): 144
    144 can be divided by 2 and 72
    144 can be divided by 3 and 48
    144 can be divided by 4 and 36
    144 can be divided by 6 and 24
    144 can be divided by 8 and 18
    144 can be divided by 9 and 16
    144 can be divided by 12
    Number 144 is not a Prime

    Now enter another number(q to exit): q
    Done!
 */
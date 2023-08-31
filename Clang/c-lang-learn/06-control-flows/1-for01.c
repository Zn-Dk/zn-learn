#include <stdio.h>

int main(void)
{
    // 简单模式
    for (int i = 0; i < 5; i++)
        printf("i: %d\n", i);

    // 复合语句模式
    for (int i = 0; i < 5; i++) {
        printf("-----\n");
        printf("| %d |\n", i);
        printf("-----\n");
    }

    // 测试条件也可以是任意的合法表达式
    double debt;
    for (debt = 100.0; debt < 150.0; debt *= 1.1)
        printf("Your debt is %.1f now!\n", debt);

    printf("Your debt is overflown! It's %.1f now!\n", debt);
    /*
      Your debt is 100.0 now!
      Your debt is 110.0 now!
      Your debt is 121.0 now!
      Your debt is 133.1 now!
      Your debt is 146.4 now!
      Your debt is overflown! It's 161.1 now!
     */

    return 0;
}
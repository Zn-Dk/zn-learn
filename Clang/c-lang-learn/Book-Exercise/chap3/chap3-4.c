#include <stdio.h>

/*
    编写一个程序，读取一个浮点数，先打印成小数点形式，再打印成指
    数形式。然后，如果系统支持，再打印成p记数法
 */
int main(void)
{
    float fl;

    printf("Enter a floating point value:  \b");
    scanf("%f", &fl);
    printf("fixed-point notation: %f\n", fl);
    printf("exponential notation: %e\n", fl);
    printf("p notation: %a\n", fl);
    // Enter a floating point value: 64.25
    // fixed-point notation: 64.250000
    // exponential notation: 6.425000e+001
    // p notation: 0x1.010000p+6

    return 0;
}
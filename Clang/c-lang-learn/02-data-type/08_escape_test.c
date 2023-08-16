#include <stdio.h>
int main(void)

/** 老式 工资计算器 */
{
    float s = 2.34E07;
    printf("%.2e\n", s);
    float salary;
    printf("\aEnter your desired monthly salary:"); /* 提示输入工资 \a 只有在老机器上能有蜂鸣 */
    printf(" $_______\b\b\b\b\b\b\b");              /* 退格键让光标回到起始点右一位 */
    scanf("%f", &salary);                           /* scanf 在同一行覆盖 _ */
    printf("\n\t$%.2f a month is $%.2f a year.", salary, salary * 12.0); /* 换行并移动到制表点 输出计算工资 */
    printf("\rGee!\n"); /* 开头没有换行, 并通过回车符让光标同一行的开头 */

    // Enter your desired monthly salary: $1234.5_
    // Gee!    $1234.50 a month is $14814.00 a year.
    return 0;
}

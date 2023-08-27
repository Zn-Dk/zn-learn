#include <stdio.h>
/*
  编写一个程序，提示用户输入天数，然后将其转换成周数和天数。
  例如，用户输入18，则转换成2周4天。
  以下面的格式显示结果：
  18 days are 2 weeks, 4 days.
  通过while循环让用户重复输入天数，当用户输入一个非正值时（如0
  或-20），循环结束。
 */

int main(void)
{
    int days;
    int day_w, day_d;

    printf("Enter days (<=0 to Exit): ");
    scanf("%d", &days);

    while (days > 0) {
        day_w = days / 7;
        day_d = days % 7;

        printf("%3d days are %3d weeks, %3d days.\n", days, day_w, day_d);
        scanf("%d", &days);
    }

    return 0;
}

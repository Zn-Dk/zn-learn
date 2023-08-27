#include <stdio.h>
/*
  编写一个程序，把用分钟表示的时间转换成用小时和分钟表示的时间。
  使用#define或const创建一个表示60的符号常量或const变量。
  通过while循环让用户重复输入值，直到用户输入小于或等于0的值才停止循环。
 */

const int HOUR_T_MIN = 60;

int main(void)
{
    int m_time, time_h, time_m;

    printf("Enter a time in minute(<=0 to quit): \n");
    scanf("%d", &m_time);

    while (m_time > 0) {
        time_h = m_time / HOUR_T_MIN;
        time_m = m_time % HOUR_T_MIN;
        printf("%d min equals %d hour(s), %d minute(s)\n", m_time, time_h, time_m);

        scanf("%d", &m_time);
    }

    printf("Exit the program! \n");

    return 0;
}
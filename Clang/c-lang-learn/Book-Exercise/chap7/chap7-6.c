#include <stdio.h>

/*
    编写程序读取输入，读到#停止，报告  "ei"  出现的次数。
    注意
    该程序要记录前一个字符和当前字符。用“Receive your eieio award”这
    样的输入来测试。
 */
int main(void)
{
    char prev, ch;
    int  count = 0;

    printf("Enter a text(# marks end): \n");
    while ((ch = getchar()) != '#') {
        if (prev == 'e' && ch == 'i')
            count++;
        prev = ch;
    }

    printf("\"ei\" count is %d.", count);
    /* 
        Enter a text(# marks end): 
        Receive your eieio award#
        "ei" count is 3.
     */
    return 0;
}
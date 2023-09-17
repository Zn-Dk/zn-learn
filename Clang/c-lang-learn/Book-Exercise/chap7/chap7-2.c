#include <stdio.h>

/*
编写一个程序读取输入，读到#字符停止。程序要打印每个输入的字
符以及对应的ASCII码（十进制）。一行打印8个字符。建议:使用字符计数
和求模运算符（%）在每8个循环周期时打印一个换行符。
 */
int main(void)
{
    char ch;
    int  count = 0;

    printf("Enter a text(# marks end): \n");
    while ((ch = getchar()) != '#') {
        if (ch == '\n')
            continue;

        printf("|%c|%3d|| ", ch, ch);
        count++;

        if (count % 8 == 0)
            printf("\n");
    }

    return 0;
}
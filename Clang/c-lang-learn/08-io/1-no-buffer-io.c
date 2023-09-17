#include <stdio.h>
#include <conio.h>
int main(void)
{
    char ch;

    // 引入 conio.h 实现无缓冲输入
    // getche() - 回显的无缓冲 getch() - 无回显无缓冲
    while ((ch = getche()) != '#')
        putchar(ch);

    // while ((ch = getchar()) != '#')
    //     putchar(ch);

    return 0;
}
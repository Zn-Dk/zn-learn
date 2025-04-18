#include <stdio.h>

/*
使用 switch 语句编写一个程序读取输入，读到#停止。用感叹号替换句
号，用两个感叹号替换原来的感叹号，最后报告进行了多少次替换。
 */
int main(void)
{
    char ch;
    int  replace_time;

    printf("Enter a text(# marks end): \n");
    while ((ch = getchar()) != '#') {
        switch (ch) {
            case '.':
                putchar('!');
                replace_time++;
                break;
            case '!':
                printf("!!");
                replace_time++;
                break;

            default:
                putchar(ch);
                break;
        }
    }

    printf("Replaced %d time(s)", replace_time);
    /*
        Enter a text(# marks end):
        They do love! The world. Yes!
        They do love!! The world! Yes!!
        #
        Replaced 3 time(s)
    */
    return 0;
}
#include <stdio.h>

/*
    编写一个程序读取输入，读到#字符停止，然后报告读取的空格数、
    换行符数和所有其他字符的数量。
 */
int main(void)
{
    char ch;
    int  s_ct, n_ct, o_ct;  // s - space n - \n o - others
    s_ct = n_ct = o_ct = 0;

    printf("Enter a text(# marks end): \n");
    while ((ch = getchar()) != '#') {
        if (ch == ' ') {
            s_ct++;
        }
        else if (ch == '\n') {
            n_ct++;
        }
        else {
            o_ct++;
        }
    }

    printf("Text analysis:    Space    Return    Others\n");
    printf("              %9d%9d%9d", s_ct, n_ct, o_ct);


    /* 
          Enter a text(# marks end): 
          The quick brown fox, just
          casually jumps over the lazy
          dog! Haha!#
          Text analysis:    Space    Return    Others
                                9        2        54
     */
    return 0;
}
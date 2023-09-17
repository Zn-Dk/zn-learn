#include <ctype.h>
#include <stdio.h>

/*
  编写一个程序，在遇到 EOF 之前，把输入作为字符流读取。该程序
要报告输入中的大写字母和小写字母的个数。假设大小写字母数值是连续
的。或者使用ctype.h库中合适的分类函数更方便。
 */
int main(void)
{
    int ch;
    int up_ct, lo_ct;
    up_ct = lo_ct = 0;

    printf("Input flow: \n");
    while ((ch = getchar()) != EOF) {
        if (islower(ch))
            lo_ct++;
        if (isupper(ch))
            up_ct++;
    }
    printf("\n--------------------------\n");
    printf("Reported: %4d uppercase and %4d lowercase alphabet in this input", up_ct, lo_ct);

    return 0;
}
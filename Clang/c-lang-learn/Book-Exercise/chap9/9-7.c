#include <ctype.h>
#include <stdio.h>

/*
编写一个函数，从标准输入中读取字符，直到遇到文件结尾。程序要
报告每个字符是否是字母。如果是，还要报告该字母在字母表中的数值位
置。例如，c和C在字母表中的位置都是3。合并一个函数，以一个字符作为
参数，如果该字符是一个字母则返回一个数值位置，否则返回-1。
 */
int  get_alpha_pos(int ch);
void clear_buf();

int main(void)
{
    int ch;

    while ((ch = getchar()) != EOF) {
        if (ch == '\n')
            continue;

        if (isalpha(ch)) {
            printf("Char: %c, is an alphabet, position=%d\n", ch, get_alpha_pos(ch));
        }
        else
            printf("Char: %c, is not an alphabet\n", ch);
    }

    return 0;
}

int get_alpha_pos(int ch)
{
    if (!isalpha(ch))
        return -1;

    return tolower(ch) - 'a' + 1;
}

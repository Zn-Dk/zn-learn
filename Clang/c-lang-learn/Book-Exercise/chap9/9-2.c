#include <stdio.h>

/*
  设计一个函数chline(ch, i, j)，打印指定的字符j行i列。在一个简单的驱
  动程序中测试该函数
 */
void chline(char ch, int i, int j);

int main(void)
{
    chline('$', 7, 5);
    return 0;
}

void chline(char ch, int i, int j)
{
    for (int row = 0; row < j; row++) {
        for (int col = 0; col < i; col++) {
            putchar(ch);
        }
        putchar('\n');
    }
}
#include <ctype.h>
#include <stdio.h>
/*
修改程序清单8.8中的get_first()函数，让该函数返回读取的第1个非空
白字符，并在一个简单的程序中测试。

char get_first(void)
{
  int ch;
  ch = getchar();
  while (getchar() != '\n')
    continue;
  return ch;
}

 */

char get_first(void);

int main(void)
{
    int ch;
    ch = get_first();
    printf("first char:%c|", ch);

    return 0;
}

char get_first(void)
{
    int ch;
    do {
        ch = getchar();
    } while (isspace(ch));

    while (getchar() != '\n')
        continue;
    return ch;
}
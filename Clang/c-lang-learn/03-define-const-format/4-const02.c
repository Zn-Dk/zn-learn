#include <stdio.h>

// 值得注意的是, 初始化可以在函数外部进行
const int   MAGIC_NUM = 42;
const float PI        = 3.1415926;
char        a         = 'A';

int main(void)
{
    printf("%d %.6f \n", MAGIC_NUM, PI);
    printf("a %c \n", a);

    return 0;
}
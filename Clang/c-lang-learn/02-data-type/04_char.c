#include <stdio.h>

int main(void)
{
    // char 存储字符, 但是技术层面是 ASCII 也就是整型
    //
    char broiled;
    // 使用单引号储存字符常量
    broiled = 'B';

    char enter_char = '\n';

    //%c 表示字符的说明
    printf("broiled = %c%chello", broiled, enter_char);
    // broiled = B
    // hello

    return 0;
}
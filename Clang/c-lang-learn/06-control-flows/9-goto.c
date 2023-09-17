#include <stdio.h>

int main(void)
{
    // C 语言保留类似 BASIC Fortran 的 goto 能力
    // 因为他们没有 break/continue, 而且不支持 if 后跟块或复合语句, 所以逻辑上实现不方便

    // 教材说: 原则上 根本不要在 C 语言中使用 goto
    // 跳出嵌套循环的时候, 用 goto 比较方便

    // goto 的模式:   if ( ... ) goto tag_name
    // tag_name:  some code

    char ch = getchar();

    if (ch == 'X')
        goto part_x;
    goto part_nor;

part_x:
    printf("Oh, something happen!\n");
part_nor:
    printf("normal routine finished.\n");

    return 0;
}
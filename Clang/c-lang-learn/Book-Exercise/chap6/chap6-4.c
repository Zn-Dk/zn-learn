#include <stdio.h>

/*
    使用嵌套循环，按下面的格式打印字母：
    A
    BC
    DEF
    GHIJ
    KLMNO
    PQRSTU
 */
int main(void)
{
    char ch = 'A';
    int  i, j;
    for (i = 0; i < 6; i++) {
        for (j = 0; j <= i; j++) {
            printf("%c", ch++);  // 最难想到的一点: 打印然后 ch++
        }
        printf("\n");
    }

    return 0;
}
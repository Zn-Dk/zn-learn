#include <stdio.h>

int main(void)
{
    /** 形式一 单行语句 */

    if (0)
        printf("1");
    else
        printf("0");

    /** 形式二 复合语句 */
    printf("\n");

    if (1) {
        printf("A");
        printf("AB");
    }
    else {
        printf("B");
    }

    /** 形式三 组合 */
    printf("\n");

    if (1 < 0) {
        printf("code");
    }
    else
        printf("bar");

    return 0;
}
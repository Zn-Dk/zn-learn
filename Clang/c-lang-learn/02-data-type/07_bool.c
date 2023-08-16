#include <stdio.h>

int main(void)
{
    // 声明 布尔值
    // 赋值使用 0 | 1
    _Bool bol = 1;
    int   num = 0;

    printf("%d\n", bol);
    // 0

    printf("sizeof bol: %zd\n", sizeof(bol));
    printf("sizeof num: %zd\n", sizeof(num));
    // sizeof bol: 1
    // sizeof num: 4

    if (!bol) {
        printf("bol is false\n");
        // bol is false
    }

    return 0;
}
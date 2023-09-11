#include <stdio.h>

int main(void)
{
    const int SIZE = 10;
    // 声明动态数组并初始化
    int nums[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int i      = 0;

    for (i; i < SIZE; i++) {
        printf("%d-", nums[i]);
    }

    return 0;
}
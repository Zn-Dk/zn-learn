#include <stdio.h>

int main(void)
{
    // 声明动态数组并初始化
    int nums[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int i;

    printf("Array size: %d, sizeof an element of Array: %d\n", sizeof nums, sizeof nums[0]);
    // 使用 sizeof 统计长度
    for (i = 0; i < sizeof nums / sizeof nums[0]; i++) {
        if (i > 0)
            putchar('-');
        printf("%d", nums[i]);
    }

    return 0;
}

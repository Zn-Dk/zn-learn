#include <stdio.h>
#include <string.h>

/** 通过给 str 提前加入 \0 空字符使得打印 */
void fit(char* str, unsigned int limit)
{
    if (strlen(str) > limit)
        str[limit] = '\0';
}

int main(void)
{
    /** strlen 统计字符串长度, 遇到 \0 停止计数 */

    char str[] = "testStringWonder.";

    printf("Before: %s\n", str);
    // Before: testStringWonder.

    fit(str, 10);
    printf("After: %s\n", str);
    // After: testString

    puts(str + (strlen(str) + 1));  // strlen(str) + 1 = 10 + 1
    printf("Rest of string counts: %d", strlen(str + 11));
    // onder.
    // Rest of string counts: 6
    // 移动指针, 我们可以把剩余的部分打印出来
    // 注意原来 [10] 的 W 被替换成了 \0

    return 0;
}
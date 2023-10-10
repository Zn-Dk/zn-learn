#include <stdio.h>

// strlen 的依赖原型
#include <string.h>

int main(void)
{
    // 一般为了方便, 我们可以不声明字符串长度, 让编译器自动计算即可
    char str[] = "This is a string";

    printf("string: %s, length = %d", str, strlen(str));
    // string: This is a string, length = 16

    return 0;
}
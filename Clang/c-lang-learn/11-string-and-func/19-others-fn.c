#include <stdio.h>
#include <string.h>

int main(void)
{
    char  test[] = "abcdefedcba";
    char* pt;

    // strchr 返回字符串是否出现某个字符, 查找到则返回首个出现的指针
    // 从左往右查找, 类似 findIndex, 如果找不到则返回空指针

    // 在 test 中查找 'd'
    pt = strchr(test, 'd');
    puts(pt);
    // defedcba
    printf("%d\n", pt - test);
    // 3 <- idx

    pt = strchr(test, 'z');
    printf("%d\n", pt == '\0');  // 1

    // strrchr 从右往左查找, findLastIndex
    pt = strrchr(test, 'd');
    puts(pt);
    // dcba
    printf("%d\n", pt - test);
    // 7

    // strpbrk(char* s1, char* s2) s1 是否包含 s2 内的任意字符
    // (注意只是包含不是要求符合该格式)
    // 是则返回 s1 否则返回空字符
    pt = strpbrk(test, "bf");
    puts(pt);
    pt = strpbrk(test, "v");
    printf("%d\n", pt == '\0');  // 1

    // strstr(char* s1, char* s2) s1 是否包含 s2 的字符串**
    // (要求符合该格式)
    // 是则返回 s1 否则返回空字符
    pt = strstr(test, "bcd");
    puts(pt);
    pt = strstr(test, "bcdz");
    printf("%d\n", pt == '\0');  // 1

    return 0;
}
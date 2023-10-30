#include "sget.h"
#include <stdio.h>
#include <string.h>

#define SIZE 30
#define MSG "HELLO WORLD"
int main(void)
{
    char  str1[SIZE] = MSG;
    char  str2[SIZE];
    char* pt;

    // 已知
    // 1. ❌  str2 = "String" 不能字面量赋给指针变量
    // 2. ❌  str2 = str1 只是复制指针

    /**
     * strcpy 复制函数
     * 另: strncpy 也是加入 第三个参数限制拷贝的容量, 具体看 17-strcpy-strncpy_2.c 的演示
     * */

    strcpy(str2, str1);
    puts(str2);
    // HELLO WORLD

    strcpy(str2, str1 + 6);  // 从下标5开始复制
    puts(str2);
    // WORLD

    strcpy(str2, str1);               // 先原样复制
    pt = strcpy(str2 + 3, str1 + 6);  // 从源字符串(下标5)剪切到目标字符串(下标3)
    puts(str2);
    // HELWORLD
    puts(pt);
    // 函数返回的指针是 str2 + 3 因此打印 WORLD

    char target[20] = "HELLO";
    char source[10] = "WELOVEYOU";

    pt = strcpy(target + 4, source + 2);
    // 从源[2]剪切, 粘贴覆盖目标[4]
    puts(target);
    // HELLLOVEYOU
    puts(pt);
    // 函数返回的指针是 target + 4 因此打印 LOVEYOU

    return 0;
}
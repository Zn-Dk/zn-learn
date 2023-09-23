#include <stdio.h>
// 引入本地头文件 使用 ""
#include "test.h"

int main(void)
{
    say_hi();
    
    // 直接获取到 define 常量
    printf("A %c B %c C %c\n", A, B, C);

    printf("add 1 + 2 = %d\n", add(1, 2));


    // 直接使用 .h 内置的函数
    foo();

    bar(3);

    return 0;

    /*
      Hello, this function is defined in test.h
      A 1 B 2 C 3
      add 1 + 2 = 3
     */
}

// 函数声明已在头文件包含 因此不需要在本文声明
void say_hi(void)
{
    printf("Hello, this function is defined in test.h\n");
}

int add(int x, int y)
{
    return x + y;
}
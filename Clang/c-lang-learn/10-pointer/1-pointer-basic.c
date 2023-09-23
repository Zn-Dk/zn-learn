#include <stdio.h>

int main(void)
{
    int num = 42;

    // 一元 & 给出变量指针, 并通过 %p 转换声明打印出来
    printf("num is %d, its pointer %p", num, &num);
    // num is 42, its pointer 000000000061FE1C

    return 0;
}

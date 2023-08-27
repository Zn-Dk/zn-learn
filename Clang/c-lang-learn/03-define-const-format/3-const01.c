#include <stdio.h>

int main(void)
{
    // 使用 const 关键字声明不可变的常量变量
    const int NO_CHANGE = 100;

    NO_CHANGE = 200;  // error: assignment of read-only variable 'NO_CHANGE'

    printf("%d", NO_CHANGE);

    return 0;
}
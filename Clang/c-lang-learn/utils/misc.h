#include <stdio.h>

void swap(int* m, int* n)
{
    int temp;
    temp = *m;  // 从指针取值
    // 交换, 赋值要解引用 而非 m = *n(将值赋给了指针变量, 错误);
    *m = *n;
    *n = temp;
}
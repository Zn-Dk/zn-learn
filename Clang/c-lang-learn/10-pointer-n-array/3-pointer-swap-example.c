#include <stdio.h>

// 因为直接修改, 无需返回值
// 声明指针变量 (类型* 形参 ...)
void swap(int* m, int* n);

int main(void)
{
    /** 使用指针改变主调函数的变量 x, y 交换它们的值 */
    int x = 4, y = 8;

    printf("Before x=%d y=%d\n", x, y);
    // 传入指针(址) 而非传值
    swap(&x, &y);
    printf("After x=%d y=%d\n", x, y);

    // Before x=4 y=8
    // After x=8 y=4
    return 0;
}

void swap(int* m, int* n)
{
    int temp;
    temp = *m;  // 从指针取值
    // 交换, 赋值要解引用 而非 m = *n(将值赋给了指针变量, 错误);
    *m = *n;
    *n = temp;
}
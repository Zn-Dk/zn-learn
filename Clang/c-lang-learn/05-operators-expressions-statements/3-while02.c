#include <stdio.h>

// 函数声明必须给出 否则会无法运行
void printSharp(int count);

// 假如像下面这样, 不声明参数的类型, 会导致什么?
// void printSharp();
// 1.printSharp(f) 无法正常输出, 因为入参时 float 被升级成了 double 而非降级到 int
// 2.除非使用强制类型转换符: printSharp((int)f) - 不过如果 float 值太大 超过了 int 范围了也会有问题
// 3.上面所说的情形其实都应该避免, 但论安全性, 强制转换更好一点(个人观点)

void printSharp();

int main(void)
{
    float f  = 8.0;
    int   i  = 5;
    char  ch = '!';

    printSharp(i);
    printSharp(f);
    printSharp(ch);

    return 0;
}

void printSharp(int count)
{
    while (count-- > 0)
        printf("#");  // 只有一条语句时, while 可以不用括号括起
    printf("\n");
}
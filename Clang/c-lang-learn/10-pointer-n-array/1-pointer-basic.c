#include <stdio.h>
void test(int num);

int main(void)
{
    int num = 42;

    // 一元 & 给出变量指针, 并通过 %p 转换声明打印出来
    printf("num is %d, its pointer %#p\n", num, &num);
    // num is 42, its pointer 000000000061FE1C (WINDOWS)
    // num is 42, its pointer 0x7fffe26adf3c  (LINUX)

    test(num);

    return 0;
}

void test(int num)
{
    printf("In function test, num is %d, its pointer %#p\n", num, &num);
    // In function test, num is 42, its pointer 0X000000000061FDF0 (WINDOWS)
    // In function test, num is 42, its pointer 0x7fffe26adf1c (LINUX)
}

// 可以看到 在函数 test 中即便传入的都是 num 变量, 他们的内存地址(指针) 是不一样的,
// test 中的 num 是局部变量
// C 这样默认传值非传址的设计是为了防止函数本身直接产生的副作用

// 地址
// 看起来不同系统下内存的位数 bit 不一致,
// Windows 下是 16 位 16进制数 -> 16 * 4 =  64 位地址
// Linux/Unix 下是 12 位 16进制数 -> 12 * 4 =  48 位地址
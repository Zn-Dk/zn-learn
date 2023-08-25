#include <stdio.h>

int main(void)
{
    // int 修饰符

    // signed 默认, 整数范围正负各一半
    // unsigned 表示范围非负整数

    // short
    // unsigned short i;　i可以表示0~65535
    // signed（默认）short i;　i可以表示-32768~+32767
    unsigned short s1 = 65535;
    short          s2 = 65535;
    printf("s1 = %d, s2 = %d\n", s1, s2);
    // s1 = 65535, s2 = -1 <- s2 已经溢出了

    // int 目前一般现代系统是 32 位 同 long 最大值是 21亿多的数
    int          i  = 2147483647;
    unsigned int i2 = 4294967295;  // unsigned int 使用 %u
    printf("i = %d, i2 = %u\n", i, i2);

    // long
    long          l1       = 123456789;
    long          l2       = 123456789L;  // <- 后缀标识 支持
    long          l_max    = 2147483647;  // long_max => int_max
    unsigned long us_l_max = 4294967295;  // unsigned long_max => unsigned int_max
    printf("l1 = %ld\n", l1);
    printf("long_max = %d\n", l_max);              // 如果系统 int long 范围一致可以直接 %d
    printf("unsigned long_max = %u\n", us_l_max);  // 如果系统 int long 范围一致可以直接 %d

    // long long 注意空格
    long long ll1 = 123244543654747;
    long long ll2 = 123244543654747LL;  // <- 后缀标识 支持

    printf("ll1 = %lld\n", ll1);
    printf("ll2 = %lld\n", ll2);
    return 0;
}

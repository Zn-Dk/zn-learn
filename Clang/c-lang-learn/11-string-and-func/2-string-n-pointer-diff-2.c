#include <stdio.h>

#define RDM "STR"

int main(void)
{
    // 探讨 字符串字面量, 指针引用字面量的区别

    char* pt_ch   = "STR";
    char  ar_ch[] = "STR";

    printf(" \"STR\"= %p, define RDM = %p \n", "STR", RDM);
    // "STR"= 0x402010, define RDM = 0x402010
    printf("pt_ch = %p, ar_ch = %p \n", pt_ch, ar_ch);
    // pt_ch = 0x402010, ar_ch = 0x7fff27b78ffc

    // 是否非常神奇, 当一个文件中声明了一模一样的字符串字面量时, 编译器只会使用一个内存地址存储

    // 字面量是在初始化时存储在静态存储区中的,
    // 而数组声明的字符串, 其右值字面量也会经历这个过程,
    // 但是只有在运行时才会为数组分配内存, 此时才把字符串拷贝到数组中
    // 这样一来 字符串有两个副本, 一个是静态内存的字符串字面量, 另一个是储存在 ar_ch 的字符串.

    // 语法检查可能不会报错, 但是可能会在运行导致内存错误
    // 如果编译器允许这样修改, 则影响所有使用这个字面量的代码! STR -> KTR
    // pt_ch[0] = 'K';

    // 推荐写法
    const char* pt_ch_const = "STR";

    // 因为数组是获得字符串副本, 则不会有这个问题
    ar_ch[0] = 'A';
    printf("ar_ch = %s, pt_ch = %s", ar_ch, pt_ch);
    // ar_ch = ATR, pt_ch = STR

    // 总结: 如果不修改字符串, 不要用指针指向字符串字面量

    return 0;
}
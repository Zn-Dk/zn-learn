#include <stdio.h>

int main(void)
{
    char* str = "TheString";
    char* copy;
    copy = str;

    printf("str- value = %s, &str = %p, *str = %p\n", str, &str, *str);
    // str- value = TheString, &str = 0x7ffc881ac3c8, *str = 0x54
    printf("copy- value = %s, &copy = %p, *copy = %p\n", copy, &copy, *copy);
    // copy- value = TheString, &copy = 0x7ffc881ac3c0, *copy = 0x54

    // copy 和 str 引用的值的地址是一样的
    return 0;
}
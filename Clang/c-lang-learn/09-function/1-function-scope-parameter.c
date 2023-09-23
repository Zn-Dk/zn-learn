#include <stdio.h>
int mod_num(int n);

int main(void)
{
    int num = 200;

    printf("modify num %d\n", mod_num(num));
    printf("num %d\n", num);

    return 0;
}

int mod_num(int n)
{
    // 局部变量 并不修改原数字
    n += 200;
    return n;
}
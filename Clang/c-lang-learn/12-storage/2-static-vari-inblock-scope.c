#include <stdio.h>

void print_var(void);

int main(void)
{
    int i = 0;
    while (i++ < 3)
        print_var();

    /*
    var=1, immutable=1
    var=1, immutable=2
    var=1, immutable=3
     */

    return 0;
}
void print_var(void)
{
    int var = 1;
    // 只在函数编译的时候初次声明, 再次执行会跳过这个语句
    static int immutable = 1;
    printf("var=%d, immutable=%d\n", var++, immutable++);
}
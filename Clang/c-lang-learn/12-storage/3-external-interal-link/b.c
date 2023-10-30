#include <stdio.h>
extern int global_var;  // 注入外部链接变量

int fn_b(void)
{
    printf("b.c global_val %d\n", global_var);
    global_var = 10;
    printf("now, b.c global_val %d\n", global_var);

    return 0;
}
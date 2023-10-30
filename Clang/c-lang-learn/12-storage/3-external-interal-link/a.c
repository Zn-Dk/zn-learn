#include <stdio.h>
extern int global_var;  // 注入外部链接变量

static int secret_var_a = 42;  // y定义内部链接变量

int fn_a(void)
{
    printf("a.c global_val %d\n", global_var);
    global_var = 30;
    printf("now, a.c global_val %d\n", global_var);
    printf("[a.c] secret_var_a %d\n", secret_var_a);

    return 0;
}
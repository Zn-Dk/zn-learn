#include "head.h"  // 引入头文件声明 fn_a fn_b
#include <stdio.h>

int global_var;  // main 里定义一个全局变量, 不加 static

int main(void)
{
    global_var = 20;
    // extern int secret_var_a;  // 内部链接, 引入报错
    // printf("[main.c] secret_var_a %d\n", secret_var_a);

    printf("At start, main.c global_val %d\n", global_var);
    fn_a();
    fn_b();
    printf("Finally, main.c global_val %d\n", global_var);

    return 0;
}
#include <stdio.h>

// 使用 stdbool 头文件 将 _Bool 类型定义为 bool 关键字 并定义常量使 true = 1, false = 0
#include <stdbool.h>

int main(void)
{
    bool bol_a, bol_b;

    bol_a = 10 > 2;
    bol_b = 1 == 0;

    printf("bol_a: %d bol_b: %d \n", bol_a, bol_b);

    // while (bol_a == true) {
    while (bol_a) {
        printf("Y\n");
        bol_a = false;
    }

    bol_b = true;
    printf("Now bol_b: %d", bol_b);

    return 0;
}
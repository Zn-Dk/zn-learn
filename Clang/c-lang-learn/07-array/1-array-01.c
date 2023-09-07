#include <stdio.h>

int main(void)
{
    float fl_arr[20];

    // 普通赋值
    fl_arr[0] = 1.23;
    // io 赋值
    scanf("%f", &fl_arr[1]);

    printf("arr[%.2f, %.2f]", fl_arr[0], fl_arr[1]);

    // 注意 C编译器不会检查数组的下标是否正确, 可能会影响其他数据!
    fl_arr[20] = 2.33;
    fl_arr[22] = 4.33;

    return 0;
}
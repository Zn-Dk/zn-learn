#include <float.h>
#include <stdio.h>

/*
    编写一个程序，将一个double类型的变量设置为1.0/3.0，一个float类型的变量设置为1.0/3.0。
    分别显示两次计算的结果各3次：
    一次显示小数点后面6位数字；
    一次显示小数点后面12位数字；
    一次显示小数点后面16位数字。
    程序中要包含float.h头文件，并显示FLT_DIG和DBL_DIG的值。
    1.0/3.0 的值与这些值一致吗？
 */
int main(void)
{
    float  fl_res = 1.0 / 3.0f;
    double db_res = 1.0 / 3.0;

    printf("fl_res %.6f db_res %.6f \n", fl_res, db_res);
    // fl_res 0.333333 db_res 0.333333
    printf("fl_res %.12f db_res %.12f \n", fl_res, db_res);
    // fl_res 0.333333343267 db_res 0.333333333333
    printf("fl_res %.16f db_res %.16f \n", fl_res, db_res);
    // fl_res 0.3333333432674408 db_res 0.3333333333333333

    // FLT_DIG  6, DBL_DIG 15
    printf("FLT_DIG  %d, DBL_DIG %d \n", FLT_DIG, DBL_DIG);

    // 结论 在 FLT_DIG 精度内, float 和 double 的输出值保持一致, 超过精度数字后不一致
    return 0;
}
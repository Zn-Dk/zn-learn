#include <stdio.h>

int main(void)
{
    int field;
    int num = 123;
    /**  printf * 修饰符 作用 提供字段宽度 */

    printf("Enter width of field\n");
    scanf("%d", &field);
    // 6

    // * 用于转换宽度 最后变为 %6d
    printf("field: |%*d|\n", field, num);
    // field: |   123|

    float fl = 123.456;
    int   precision;
    printf("Enter width and precision of field\n");
    scanf("%d %d", &field, &precision);
    // 8 2

    // * 按参数位次可以有多个, 例如: 用于打印浮点数
    printf("field: |%*.*f|\n", field, precision, fl);
    // field: |  123.46|

    return 0;
}
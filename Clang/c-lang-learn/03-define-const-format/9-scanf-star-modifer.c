#include <stdio.h>

int main(void)
{
    /**  scanf * 修饰符 作用 跳过字段 */
    float salary;

    printf("Name Age Gender Salary\n");

    scanf("%*s %*d %*s %f", &salary);
    // John 20 Male 12300.32

    printf("Oh I' see, your salary is %.2f\n", salary);
    // Oh I' see, your salary is 12300.32

    // 应用场景: 读取表格文件的特定列信息
    return 0;
}
#include <math.h>
#include <stdio.h>

int main(void)
{
    float  f1 = 1.23456789012345;  // float 仅支持 6 位有效数字
    double d1 = 1.23456789012345;

    // 1. float 与 double 都使用 %f 打印
    // 2. %f 默认打印 6 为有效数字, 这也是 float 的最小有效数字要求

    printf("%f\n", f1);
    // 1.234568

    // 3.可以看到 float 在超过 6 位有效数字后 精确度变得不好保证, 故超过 6 位的小数应使用 double 保存

    printf("%.7f\n", f1);
    // 1.2345679
    printf("%.8f\n", f1);
    // 1.23456788            <= 丢失精度
    printf("%.9f\n", f1);
    // 1.234567881           <= 丢失精度
    printf("%.10f\n", f1);
    // 1.2345678806          <= 丢失精度

    printf("%.10f\n", d1);
    // 1.2345678901          <= double 精度依然保证
    printf("%.14f\n", d1);
    // 1.23456789012345      <= double 精度依然保证

    // 显式声明 4.0 2.0 为 float 而不是默认 double 提升性能
    float some_float = 4.0f * 2.0f;
    printf("some float: %.1f\n", some_float);
    // some float: 8.0

    // 打印指数计数
    float exp_float = 1.5e6f;
    printf("in exp %.1e", exp_float);
    // in exp 1.5e+006

    // 上溢出
    float toobig = 3.4E38 * 100.0f;
    printf("too big: %e\n", toobig);
    // 1.#INF00e+000

    return 0;
}
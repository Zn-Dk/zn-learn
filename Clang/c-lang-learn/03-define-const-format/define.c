#include <stdio.h>

/** 定义常量格式 #define NAME value */
#define WORD "Hello"

/* 常量定义不需要分号结尾 */
#define PI 3.1415926

/* 高阶 使用常量定义函数 */
#define AREA(r) (PI * r * r)

int main(void)
{
    float radius;

    printf("%s\n", WORD);
    // Hello
    printf("circle radius? ");
    // circle radius? 5.5
    scanf("%f", &radius);

    printf("PI is using %.7f\n", PI);
    // PI is using 3.1415926
    printf("circle radius = %.1f, covers area of %.7f\n", radius, AREA(radius));
    // circle radius = 5.5, covers area of 95.0331762

    return 0;
}
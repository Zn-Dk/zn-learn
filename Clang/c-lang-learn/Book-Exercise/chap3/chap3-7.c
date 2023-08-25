#include <stdio.h>

/*
    1英寸相当于2.54厘米。编写一个程序，提示用户输入身高（/英寸），然后以厘米为单位显示身高。
 */
int main(void)
{
    int   height;
    float cm_per_inch = 2.54f;
    float inch_in_cm;

    printf("--- inch to cm ---\n");
    printf("how tall you are(in inch)? ");
    scanf("%d", &height);

    printf("Your height is %.2fcm", height * cm_per_inch);

    return 0;
}
#include <stdio.h>

int main(void)
{
    float fl_arr[20];

    // 普通赋值
    fl_arr[0] = 1.23;
    // io 赋值
    scanf("%f", &fl_arr[1]);

    printf("arr[0,1] = [%.2f, %.2f]\n", fl_arr[0], fl_arr[1]);

    // 如果数组进行了部分初始化, 那么剩余的数组元素(数值型的数组) 会被初始化为 0
    printf("arr[2] = %.2f\n", fl_arr[2]);

    // 注意 C 的编译器不检查数组边界(为了快) 超过数组下标的语句编译器可能不会检查到, 或者会导致错误退出
    // fl_arr[20] = 2.33;
    // fl_arr[22] = 4.33;

    // 字符串的部分初始化则其他元素为不可打印的字符(应该是内存的一系列垃圾数据)
    char str[10];

    str[0] = 'a';
    str[1] = 'b';

    // printf("|%-10s|", str);
    // |ab        |

    for (int i = 0; i < 10; i++) {
        printf("str[%d]=%d\n", i, str[i]);
    }

    /*
        str[0]=97   <-初始化过的字符
        str[1]=98   <-初始化过的字符
        str[2]=-122
        str[3]=-86
        str[4]=107
        str[5]=85
        str[6]=-4
        str[7]=127
        str[8]=0
        str[9]=0
     */

    return 0;
}
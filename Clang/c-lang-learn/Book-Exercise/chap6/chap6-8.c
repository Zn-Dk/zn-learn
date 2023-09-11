#include <stdio.h>
/*
  编写一个程序，要求用户输入两个浮点数，并打印两数之差除以两数
  乘积的结果。在用户输入非数字之前，程序应循环处理用户输入的每对值
 */
double calc_num(double a, double b);

int main(void)
{
    double a, b;
    do {
        printf("Enter two double: \n");
        getchar();  // 加上这个防止读取回车符导致无限循环
        /* 
          当你输入一个字符按回车后，你实际上是在缓冲区输入了两个字符，
          一个是你输入的，一个是回车符本身，这会导致你输入一个字符后就会循环两次，
          解决方法是清除缓冲或吃掉那个回车，方法很多，比如用fflush(stdin)或者getchar()都行
         */
    } while (scanf("%lf %lf", &a, &b) != 2);

    printf("Result %lf", calc_num(a, b));
    return 0;
}

double calc_num(double a, double b)
{
    return a - b / a * b;
}
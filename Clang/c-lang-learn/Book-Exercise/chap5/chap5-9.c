#include <stdio.h>
/*
    编写一个程序，要求用户输入一个华氏温度。程序应读取double类型
    的值作为温度值，并把该值作为参数传递给一个用户自定义的函数 Temperatures()。

    该函数计算摄氏温度和开氏温度，并以小数点后面两位数字的精度显示3种温度。
    要使用不同的温标来表示这3个温度值。
    下面是华氏温度转摄氏温度的公式：
    摄氏温度 = 5.0 / 9.0 * (华氏温度 - 32.0)

    开氏温标常用于科学研究，0表示绝对零，代表最低的温度。
    下面是摄氏温度转开氏温度的公式：
    开氏温度 = 摄氏温度 + 273.16

    Temperatures()函数中用const创建温度转换中使用的变量。

    在main()函数中使用一个循环让用户重复输入温度，当用户输入 q 或其他非数字时，循环
    结束。

    scanf()函数返回读取数据的数量，所以如果读取数字则返回1，如果
    读取q则不返回1。

    可以使用==运算符将scanf()的返回值和1作比较，测试两值是否相等。
 */

void Temperatures(double f_temp);

int main(void)
{
    double f_temp;
    int    res;

    printf("Enter a Fahrenheit temp: ");

    while (scanf("%lf", &f_temp) == 1) {
        Temperatures(f_temp);
        printf("Enter another Fahrenheit"
               " temp (non-number to exit): ");
    }

    printf("Exit!\n");
    /*
      Enter a Fahrenheit temp: 98.5
              | oF:  98.50 | oC:  36.94 | oK: 310.10 |
      Enter another Fahrenheit temp (non-number to exit): 103
              | oF: 103.00 | oC:  39.44 | oK: 312.60 |
      Enter another Fahrenheit temp (non-number to exit): q
      Exit!
     */
    return 0;
}

void Temperatures(double f_temp)
{
    const double K_ZERO = 273.16;
    double       c_temp, k_temp;

    c_temp = 5.0 / 9.0 * (f_temp - 32);
    k_temp = K_ZERO + c_temp;

    printf("\t| oF: %6.2f | oC: %6.2f | oK: %6.2f | \n", f_temp, c_temp, k_temp);
}
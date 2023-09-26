#include <stdio.h>

/*
    为了让程序清单9.8中的to_binary()函数更通用，编写一个to_base_n()
    函数接受两个在2～10范围内的参数，然后以第2个参数中指定的进制打印第
    1个参数的数值。例如，to_base_n(129， 8)显示的结果为201，也就是129的
    八进制数。在一个完整的程序中测试该函数
 */

void to_base_n(unsigned long n, int radix);

int main(void)
{
    int n, radix;
    do {
        if (n && radix) {
            printf("%d(10) to radix %d is ", n, radix);
            to_base_n(n, radix);
            putchar('\n');
        }

        printf("Enter a decimal number follow by radix(2-10) you want to convert(q to exit): ");
    } while (scanf("%d %d", &n, &radix) == 2);

    printf("Bye!");

    /*
    Enter a decimal number follow by radix(2-10) you want to convert(q to exit): 129 8
    129(10) to radix 8 is 201
    Enter a decimal number follow by radix(2-10) you want to convert(q to exit): 88 2
    88(10) to radix 2 is 1011000
    Enter a decimal number follow by radix(2-10) you want to convert(q to exit): 11 1
    11(10) to radix 1 is Invalid input, retry.
    Enter a decimal number follow by radix(2-10) you want to convert(q to exit): q
    Bye!
     */
    return 0;
}

void to_base_n(unsigned long n, int radix)
{
    if (radix < 2 || radix > 10) {
        printf("Invalid input, retry.");
        return;
    }

    if (n < radix) {
        printf("%d", n % radix);
        return;
    }

    to_base_n(n / radix, radix);
    printf("%d", n % radix);
}
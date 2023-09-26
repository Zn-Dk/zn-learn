#include <stdio.h>
#include <string.h>

void to_binary(unsigned long n);
void radix_convert(unsigned long n, int radix);

int main(void)
{
    /** 利用递归处理 计算十进制数字的二进制值 */
    unsigned long n;

    // 测试 10 转 8
    printf("72(10) -> (\?\?)(8): ");
    radix_convert(72, 8);  // 110
    printf("\n");

    printf("Enter a decimal int: ");
    while (scanf("%d", &n) == 1) {
        printf("(%d) in decimal = (", n);
        to_binary(n);
        printf(") in binary! \n");

        printf("Enter next one: ");
    }

    printf("Bye.");
    return 0;
}

/** 十进制转二进制 */
void to_binary(unsigned long n)
{
    char ch;
    // 这个数先被模运算得到尾数, 然后再整数除法 进入下一轮递归
    // 5 % 2 = 1 (最后位)  5 / 2 = 2 (进入递归)
    // 2 % 2 = 0 (倒数第二位) 2 / 2 = 1 (进入递归)
    // 1 % 2 = 1 (第一位)  1 / 2 = 0 (整数除法, 此时递归条件终止, 跳出)

    // 将上述过程反过来, 先进入递归, 就能够将结果倒着打印出来了
    if (n / 2)
        to_binary(n / 2);
    // 这里将结果转为字符串
    ch = n % 2 ? '1' : '0';
    putchar(ch);
}

/** 十进制转任意进制 */
void radix_convert(unsigned long n, int radix)
{
    if (radix < 2 || radix > 10) {
        printf("Invalid input, retry.");
        return;
    }

    if (n < radix) {
        printf("%d", n % radix);
        return;
    }

    radix_convert(n / radix, radix);
    printf("%d", n % radix);
}

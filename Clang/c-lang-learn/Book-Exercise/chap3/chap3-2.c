#include <stdio.h>

// 编写一个程序，要求提示输入一个ASCII码值（如，66），然后打印输入的字符
int main(void)
{
    char ch;

    printf("Please enter an ASCII code(0-127), I will log the actual character for you.\n");
    printf("Code: ___\b\b\b");
    scanf("%d", &ch);
    printf("The character for ASCII code %d is %c\n", ch, ch);

    // Please enter an ASCII code, I will log the actual character for you.
    // Code: 66_
    // The character for ASCII code 66 is B
    return 0;
}
#include <stdio.h>
int main(void)
{
    char ch;

    printf("Enter a character: ");
    // & 表示将用户输入的值赋值给 ch
    scanf("%c", &ch);
    // 使用 %d 可以将 char 的 ascii 码输出
    printf("ch = %c, code is %d", ch, ch);
    // Enter a character: %
    // ch = %, code is 37

    return 0;
}
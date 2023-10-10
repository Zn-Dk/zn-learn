#include <stdio.h>

int main(void)
{
    char ch;

    ch = getchar();
    // equals scanf("%c", &ch);

    putchar(ch + 1);
    printf("\n");
    printf("%c", ch + 1);  // equals

    return 0;
}
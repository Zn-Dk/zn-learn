#include <stdio.h>

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
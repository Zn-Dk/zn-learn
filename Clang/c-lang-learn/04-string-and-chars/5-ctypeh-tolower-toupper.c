#include <ctype.h>
#include <stdio.h>

int main(void)
{
    // tolower toupper 转换成小写/大写(返回新的字符 不在原有上修改)
    char ch;

    printf("Enter a string, print out reversed case: ");
    while ((ch = getchar()) != '\n') {
        if (!isalpha(ch))
            putchar(ch);
        else if (islower(ch))
            putchar(toupper(ch));
        else
            putchar(tolower(ch));
    }
    // Enter a string: Professior Wang was born in 1984.
    // pROFESSIOR wANG WAS BORN IN 1984.

    return 0;
}
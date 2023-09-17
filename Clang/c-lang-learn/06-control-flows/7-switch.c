#include <stdio.h>

int main(void)
{
    char ch;

    printf("enter a char, # to exit: ");
    while ((ch = getchar()) != '#') {
        switch (ch) {
            case 'a':
                printf("this is a\n");
                break;
            case 'b':
                printf("this is b\n");
                break;
            case 'c':
                printf("this is c\n");
            case 'd':
                printf("this is d or c\n");
                break;
            // 多 case
            case 'e':
            case 'E':
                printf("this is e or E\n");
                break;
            default:
                printf("404 not found\n");
        }
        // 跳过剩余部分
        getchar();
        // while (getchar() != '\n')
        //     continue;

        printf("Now Enter another one, # to exit: ");
    }

    printf("Goodbye!");
    return 0;
}

#include <stdio.h>

int main(void)
{
    char ch;

    while ((ch = getchar()) != '#') {
        if (ch != '\n') {
            printf("S1\n");
            if (ch != 'b')
                break;
            else if (ch != 'c') {
                if (ch != 'h') {
                    printf("S2\n");
                }
                printf("S3\n");
            }
        }
    }

    return 0;
}
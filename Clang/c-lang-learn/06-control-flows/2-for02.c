#include <stdio.h>

int main(void)
{
    // demo 输出字母三角形
    const int MAX_LINE = 10;
    const int ROWS     = MAX_LINE;
    char      CH       = 'A';
    int       row, ch;

    for (row = 0; row < ROWS; row++) {
        for (ch = CH + row; ch < CH + MAX_LINE; ch++) {
            printf("%c", ch);
        }
        printf("\n");
    }
    /*
        ABCDEFGHIJ
        BCDEFGHIJ
        CDEFGHIJ
        DEFGHIJ
        EFGHIJ
        FGHIJ
        GHIJ
        HIJ
        IJ
        J
    */
    return 0;
}
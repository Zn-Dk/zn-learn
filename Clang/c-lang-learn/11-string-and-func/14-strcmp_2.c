#include "sget.h"
#include <stdio.h>
#include <string.h>

#define ROW 10
#define SIZE 30
int main(void)
{
    char data[ROW][SIZE];
    char ipt[SIZE];
    int  idx;

    puts("Enter up to %d rows of string: (q to quit)");

    while (idx < ROW && sgets(ipt, SIZE) != NULL && strcmp(ipt, "q") != 0) {
        idx++;
    }

    printf("%d rows of data received", idx);

    return 0;
}
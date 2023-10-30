#include "sget.h"
#include <stdio.h>
#include <string.h>

#define ROW 10
#define SIZE 30

#define PREFIX "astro"
int main(void)
{
    char data[ROW][SIZE] = {
        "astrol", "astroid", "autocue", "astro", "astoria", "assorted",
    };

    /** strncmp, 比较时可传入第三个参数限制比较几个字符(实现 startsWith) */
    for (int i = 0; i < ROW; i++) {
        if (!strncmp(data[i], PREFIX, strlen(PREFIX)))
            printf("Found data[%d] = %s, starts with prefix \"%s\"\n", i, data[i], PREFIX);
    }
    /*
        Found data[0] = astrol, starts with prefix "astro"
        Found data[1] = astroid, starts with prefix "astro"
        Found data[3] = astro, starts with prefix "astro"
     */

    return 0;
}
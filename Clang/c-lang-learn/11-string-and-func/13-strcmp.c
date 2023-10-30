#include "sget.h"
#include <stdio.h>
#include <string.h>

#define ANS "John Doe"
#define SIZE 30
int main(void)
{
    /**
     *  strcmp 比较两个字符串是否相等
     *  返回值 0 - 相等  非零 - 不相等(ASCII 差值)
     */

    char input[SIZE];

    puts("who stolen the key?");
    do {
        if (sgets(input, SIZE)) {
            puts("wrong answer, try again!");
        }
    } while (strcmp(input, ANS));

    puts("your are right!");
    /*
      who stolen the key?
      Kevin
      wrong answer, try again!
      John Doe
      wrong answer, try again!
      your are right!
     */

    printf("strcmp(\"A\", \"B\" = %d)\n", strcmp("A", "B"));
    printf("strcmp(\"B\", \"A\" = %d)\n", strcmp("B", "A"));
    printf("strcmp(\"ab\", \"abc\" = %d)\n", strcmp("ab", "abc"));
    printf("strcmp(\"abc\", \"Ab\" = %d)\n", strcmp("abc", "Ab"));
    printf("strcmp(\"aba\", \"abD\" = %d)\n", strcmp("aba", "abD"));
    /*
      strcmp("A", "B" = -1)
      strcmp("B", "A" = 1)
      strcmp("ab", "abc" = -1)
      strcmp("abc", "Ab" = 1)
      strcmp("aba", "abD" = 1)
     */
    return 0;
}
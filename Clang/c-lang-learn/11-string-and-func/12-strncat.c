#include "sget.h"
#include <stdio.h>
#include <string.h>

#define SIZE 50
#define BUG_SIZE 20

int main(void)
{
    /**
     * strncat 增加了第三个参数限制最大添加量(要考虑 +1 以包含结尾 \0)
     */

    char msg[] = ",welcome to my program!";
    char full_msg[SIZE];
    char bug_msg[BUG_SIZE];
    int  available;

    puts("What is your name? ");

    if (sgets(full_msg, SIZE)) {
        available = SIZE - strlen(full_msg) - 1;
        strncat(full_msg, msg, available);
        puts(full_msg);
    }

    puts("What is your name? (Bug size) ");
    if (sgets(bug_msg, SIZE)) {
        available = BUG_SIZE - strlen(bug_msg) - 1;
        strncat(bug_msg, msg, available);
        puts(bug_msg);
    }

    /*
        What is your name?
        Lucky Star
        Lucky Star,welcome to my program!
        What is your name? (Bug size)
        Lucky Star
        Lucky Star,welcome

     */

    return 0;
}
#include "sget.h"
#include <stdio.h>
#include <string.h>

#define SIZE 50

int main(void)
{
    /**
     * strcat
     * 参数: 两个字符串, 第1个为被拼接串, 第2个为拼接串(不变)
     * 返回: 第一个参数(char *)
     */

    char msg[] = ",welcome to my program!";
    char full_msg[SIZE];

    puts("What is your name? ");

    // 自己实现的 sgets
    if (sgets(full_msg, SIZE)) {
        strcat(full_msg, msg);
        puts(full_msg);
        puts(msg);
    }

    /*
        What is your name?
        Founkder Strien
        Founkder Strien,welcome to my program!
        ,welcome to my program!
     */

    /*
        无法检查第一个字符串是否能容纳第二个字符串,
        如果 SIZE 调整为 20
        What is your name?
        abcdefgihjklmn
        abcdefgihjklmn,welcome to my program!
        gram!   <-- 留意这里
     */

    return 0;
}
#include <stdio.h>

/*
    一年大约有3.156×10^7秒。编写一个程序，提示用户输入年龄，然后显示该年龄对应的秒数。
 */
int main(void)
{
    int  user_age;
    long user_age_in_sec;
    int  one_year_in_sec = 3.156e7;

    printf("Input your age, and I will calculate \nhow many seconds have passed since you were born: __\b\b");
    scanf("%d", &user_age);
    user_age_in_sec = user_age * one_year_in_sec;
    printf("Your age in seconds is: %ld", user_age_in_sec);

    return 0;
}
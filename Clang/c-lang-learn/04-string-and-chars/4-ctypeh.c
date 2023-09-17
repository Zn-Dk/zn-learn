#include <ctype.h>
#include <stdio.h>

int main(void)
{
    // isalnum  判断字母/数字
    // isalpha  判断是否字母
    // isblank  判断是否标准空白字符 空格 \t \n
    // isspace  判断是否空白字符 (还包括换页 回车 其他制表符)
    // isdigit 是否数字字符(注意不是数字) isxdigit 16进制 
    // islower isupper 判断大小写字母

    // tolower toupper 转换成小写/大写(返回新的字符 不在原有上修改)
    char ch;

    printf("enter a char:");
    ch = getchar();
    if (isalpha(ch)) {
        printf("is a char\n");
    }
    else {
        printf("not a char\n");
    }

    // printf("enter a digit:");
    // ch = getchar();
    // if (isdigit(ch)) {
    //     printf("is a digit\n");
    // }
    // else {
    //     printf("not a digit\n");
    // }

    // printf("\n");
    // printf("enter a UPPER Char:");
    // ch = getchar();
    // if (isupper(ch)) {
    //     printf("is a UPPER\n");
    // }
    // else {
    //     printf("not a UPPER\n");
    // }

    printf("Enter a string: ");
    while ((ch = getchar()) != '\n') {
        if (isalpha(ch))
            putchar(ch + 1);
        else
            putchar(ch);
    }
    // Enter a string: The quick brown fox
    // Uif rvjdl cspxo gpy

    return 0;
}
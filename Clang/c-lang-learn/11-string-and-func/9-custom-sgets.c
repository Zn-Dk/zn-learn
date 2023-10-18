#include "sget.h"
#include <stdio.h>
#define SIZE 10

// char* sgets(char* str, int size)
// {
//     char* pt;
//     int   i = 0;
//     pt      = fgets(str, size, stdin);
//     if (pt)  // pt != NULL
//     {
//         while (pt[i] != '\n' && pt[i] != '\0')
//             i++;
//         if (pt[i] == '\n')
//             pt[i] == '\0';
//         else
//             while (getchar() != '\n')
//                 continue;
//     }

//     return pt;
// }

int main(void)
{
    // 创建一个工具函数实现读取整行输入, 并丢弃空字符
    // 参考 7-string-fgets-3.c

    char str[SIZE];

    printf("Enter a string: ");
    sgets(str, SIZE);
    printf("You entered: ");
    puts(str);

    return 0;
}
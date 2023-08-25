#include <stdio.h>

#define WORD "Hello World!"

int main(void)
{
    printf("[%2s]\n", WORD);
    // [Hello World!]

    printf("[%20s]\n", WORD);
    // [        Hello World!]

    printf("[%-20s]\n", WORD);
    // [Hello World!        ]

    /** 用 .数字 表示应输出字符串中的多少个字符, 如果超出了原有数量则显示全部 */

    printf("[%20.5s]\n", WORD);
    // [               Hello]
    printf("[%-20.5s]\n", WORD);
    // [Hello               ]
    printf("[%-20.15s]\n", WORD);
    // [Hello World!        ]

    return 0;
}
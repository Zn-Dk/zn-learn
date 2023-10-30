#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 翻转字符串
char* to_reverse(const char* str)
{
    // 内部分配一块空间
    char* temp = (char*)malloc(strlen(str) * sizeof(char));

    for (int i = 0; i < strlen(str); i++) {
        temp[i] = str[strlen(str) - i - 1];
    }

    return temp;
}

int main(void)
{
    char* str = "The Hello World";
    char* tmp;

    tmp = to_reverse(str);

    puts(tmp);  // dlroW olleH ehT

    free(tmp);

    return 0;
}
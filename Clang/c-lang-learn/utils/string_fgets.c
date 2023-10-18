#include <stdio.h>
#define SIZE 10

int main(void)
{
    char word[SIZE];

    // fgets 返回指向char的指针, 如果读取成功, 返回第一个参数的指针
    puts("Enter a string(empty line to exit)");
    // 如果读取文件/文字流读到 EOF, 返回空指针 null pointer, 用 NULL 作为标识
    while (fgets(word, SIZE, stdin) != NULL && word[0] != '\n')
        fputs(word, stdout);

    puts("Done!");

    return 0;
}
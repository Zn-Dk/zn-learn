#include <stdio.h>
#define SIZE 10

int main(void)
{
    char word[SIZE];
    int  i;
    puts("Enter a string(empty line to exit)");

    // 6-string-fgets-2.c 的程序变为截断输入, 可以这么处理
    while (fgets(word, SIZE, stdin) != NULL && word[0] != '\n') {
        // 每次重置计数器
        i = 0;

        // 遍历 fgets 已读取完的非空字符
        while (word[i] != '\n' && word[i] != '\0')
            i++;

        // 如果遇到换行符, 替换
        if (word[i] == '\n')
            word[i] = '\0';
        else
            // 清理剩余的缓冲区内容, 也包括 \0
            while (getchar() != '\n')
                continue;

        // 最后我们用 puts 输出也不会多打印换行符
        puts(word);
    }

    puts("Done!");

    return 0;
}
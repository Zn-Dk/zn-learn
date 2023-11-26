#include <stdio.h>

int main(void)
{
    FILE* fp;  // 定义文件指针

    // fopen 打开文件 (当前目录下 example.txt 模式为追加)
    if ((fp = fopen("example2.txt", "a+")) != NULL) {
        fprintf(fp, "Appending text to file..\n");
    }

    return 0;
}
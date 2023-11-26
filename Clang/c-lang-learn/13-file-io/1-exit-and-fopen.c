#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    // fopen() 标准 stdio 的文件打开函数
    // 参数 1 filename 文件名字符串
    // 参数 2 mode 打开模式

    // stdlib 提供 exit() 的原型和常量, 使得程序执行中主函数可以手动终止
    // EXIT_FAILURE = 1
    // EXIT_SUCCESS = 0
    exit(EXIT_FAILURE);

    // return 0 和 exit 0 效力相同
    exit(EXIT_SUCCESS);
    // return 0;

    /**
     * 常用文件 6种模式
     * 只有 r/r+ 必须要求文件存在, 否则返回 NULL
     * r/w 模式都指向文件开头, a 模式指向末尾
     */
    FILE* file1 = fopen("example.txt", "r");   // 只读模式
    FILE* file2 = fopen("example.txt", "r+");  // 读写模式
    FILE* file3 = fopen("example.txt", "w");   // 写模式
    FILE* file4 = fopen("example.txt", "w+");  // 读写模式
    FILE* file5 = fopen("example.txt", "a");   // 追加模式
    FILE* file6 = fopen("example.txt", "a+");  // 读写追加模式
}
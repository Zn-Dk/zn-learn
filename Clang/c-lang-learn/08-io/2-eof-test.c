#include <stdio.h>

int main(void)
{
    // EOF -1 不属于 char 范围故定义为 int 类型
    int ch;
    
    // 1.EOF 是用于判断文件结尾的
    // 2.EOF 可以在引入 stdio.h 后直接使用的 define 常量
    // 3.计算机可以尝试用 Ctrl+D(unix/linux)  Ctrl+Z(unix/linux/PC) 发送EOF
    // 4.以这个程序配合操作系统重定向符, 就可以实现 读取文件内容(<) 和 将用户输入的内容写入文本文件(>)
    while ((ch = getchar()) != EOF)

        putchar(ch);

    return 0;
}
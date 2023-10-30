#include <stdio.h>

/*
  命令行参数 command line arguments
  C 程序可通过 main 函数读取输入命令行的参数
 */

// 如果希望读取, 则可以在 main 函数中接收参数
//  下标[0]位是程序执行路径(含文件名), 实参从 [1] 开始
// 参数 1 int , 常称作 argc ( argument count ) 第一位是程序名称, 所以是接收参数的个数 + 1
// 参数 2 char* argv[] , 字符串数组, 常称作 argv ( argument value ) 接收参数的值
int main(int argc, char* argv[])
{
    int ct;
    printf("Your program has %d actual arguments\n", argc - 1);

    for (int ct = 0; ct < argc; ct++)
        printf("[%d]: %s\n", ct, argv[ct]);
    putchar('\n');

    /*
      执行: .\21-cli-arguments.exe foo=1 bguments.exe foo=1 bar=2 -t -D Hello
      Your program has 5 actual arguments
      [0]: D:\Git\zn-learn\Clang\c-lang-learn\11-string-and-func\21-cli-arguments.exe
      [1]: foo=1
      [2]: bar=2
      [3]: -t
      [4]: -D
      [5]: Hello
     */
    return 0;
}
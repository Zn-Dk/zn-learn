#include <stdio.h>

#define SIZE 10

int main(void)
{
    char word[SIZE] = {0};
    int  i;
    puts("Enter a string(empty line to exit)");
    gets_s(word, SIZE);  // 不能直接使用, gcc 没有内置扩展
    puts(word);
    // 如果超过了 SIZE, 运行"处理函数" 可能程序会终止

    return 0;
}
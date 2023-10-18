#include <stdio.h>
#include <string.h>
#define SIZE 10

int main(void)
{
    // 字符串的输入输出函数

    // 指针变量没有分配内存地址, 不能用来读取
    // char *word; ❌
    char word[SIZE];

    // 1. scanf (可以使用数字修饰符限制读取长度)
    scanf("%5s", word);
    // abcdefghi
    printf("%s\n", word);
    // abcde
    while (getchar() != '\n')
        continue;

    puts("Enter a string: ");

    // 2. ❌ gets (不要使用 C11 标准这个函数已经废弃)
    // 自动生成换行符, 读取用户输入字符串直至换行符, 存储
    // warning: the `gets' function is dangerous and should not be used.
    // 这个函数不会知道你输入会不会超出数组容量而导致 buffer 泄露!
    // gets(word);
    // puts(word);

    // 3. 使用 fgets 替换

    // fgets 使用起来比较麻烦 有3个参数
    // fgets 第2个参数 字符大小, 限制字符数解决溢出问题
    // fgets 第3个参数 读入的文件, 键盘输入为 stdin 标识

    fgets(word, SIZE, stdin);
    puts(word);
    // Enter a string:
    // 1234567898765
    // 123456789

    // 如果输入的字符串提前遇到换行符(小于SIZE), 则最后一位就是换行符
    printf("(word[strlen(word) - 1] == '\\n') = %d\n", word[strlen(word) - 1] == '\n');

    // 4. fputs 函数搭配 fgets
    // 参数1: 字符串变量, 参数2: 要写入的文件，如果输出至显示器， 需要用 `stdout` 参数
    // 输出时丢弃末尾的换行符
    puts("string logout: puts then fputs");
    puts(word);
    fputs(word, stdout);
    // string logout: puts then fputs
    // abc

    // abc

    puts("enter again");
    fgets(word, SIZE, stdin);

    puts("string logout: puts then fputs");
    puts(word);
    fputs(word, stdout);

    puts("Done!");
    // enter again
    // abcdefghijklmn
    // string logout: puts then fputs
    // abcdefghi
    // abcdefghiDone!

    return 0;
}
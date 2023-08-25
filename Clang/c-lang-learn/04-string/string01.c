#include <stdio.h>

/** 使用 #define 定义一个常量 */
#define TEST_WORD "Nice to meet you"

int main(void)
{
    // 字符串 在 c 中使用字符数组进行声明
    // 下面声明了一个40字节的字符串数组(实际39, 最后一位是空字符null)
    char name[40];

    printf("What's your name? ");

    // 字符串转换声明 %s

    scanf("%s", name);  // 注意 字符串数组不需要 &
    printf("%s, %s!\n", TEST_WORD, name);

    /*
      What's your name? Lucy
      Nice to meet you, Lucy!
     */

    /*
      需要注意的特例:
      What's your name? John Doe
      Nice to meet you, John!

      如果 scanf 输入的字符串带有空格, 空格后的内容不会被记录
      (因为 %s 只会读取字符串的第一个单词,而非整句, 后续可以用 fget())
     */
    return 0;
}
#include <stdio.h>

// 1. define 常量 字面量字符串
#define STR "Hello World"

int main(void)
{
    // 2. 数组声明
    char word[20] = "Professional";

    // 3. 指针表示
    char* p_str = "The C Programming Language";

    // 4 连续或者空白字符隔开的字符串常量也会被串联
    char longstr[50] = "This "
                       "is a "
                       "long string "
                       "and break "
                       "word "
                       "down";

    // 使用 puts 函数 (stdio.h)
    // puts 函数仅用于输出字符串
    // puts 函数打印字符串的结尾会自动生成一个换行符

    puts(word);
    puts(p_str);
    puts(STR);
    puts(longstr);
    puts("Lexius formantic");

    word[7] = 'k';
    puts(word);

    puts("Now use index or ptr + n to slice a string: \n");
    // 提前移动指针, 以实现 slice. 打印 从下标/指针开始(即包含当前) 到字符串末尾的值
    puts(&word[4]);
    puts(p_str + 4);

    // Professional
    // The C Programming Language
    // Hello World
    // This is a long string and break word down
    // Lexius formantic
    // Professkonal

    // Now use index or ptr + n to slice a string:
    // esskonal
    // C Programming Language

    char no[] = {'N', 'O', '!'};
    puts(no);
    // NO!This is a long string and break word down
    // 不能这样用! 因为puts不知道打印到哪结尾
    // 他从相邻的位置中取到了另一个字符串的空字符作为结尾, 并打印了出来

    return 0;
}
#include <stdio.h>

/*
    编写一个程序，提示用户输入大写字母。使用嵌套循环以下面金字塔型的格式打印字母：
//      A
//     ABA
//    ABCBA
//   ABCDCBA
//  ABCDEDCBA

        打印这样的图形，要根据用户输入的字母来决定。例如，上面的图形是在用户输入E后的打印结果。
        tips: 用外层循环处理行，每行使用3个内层循环，分别处理空格、以升序打印字母、以降序打印字母
 */

void print_space(int n);

int main(void)
{
    char ch;
    char ch1, ch2;
    // 需要用两个字符变量控制
    // ch1 处理外层
    // ch2 处理内层
    int i, j, diff;

    // 控制流程
    do {
        printf("Enter an alphabet in UPPERCASE: ");
        scanf("%c", &ch);
    } while (ch < 'A' || ch > 'Z');

    for (ch1 = 'A'; ch1 <= ch; ch1++) {
        diff = ch - ch1;
        // 起始和结束空格的数量
        print_space(diff);

        // 升序打印 ( 小于外层 ch1 )
        for (ch2 = 'A'; ch2 < ch1; ch2++) {
            printf("%c", ch2);
        }
        // 降序打印
        for (; ch2 >= 'A'; ch2--) {
            printf("%c", ch2);
        }

        // 结束空格
        print_space(diff);
        printf("\n");
    }

    return 0;
}

// 打印空格函数
void print_space(int n)
{
    for (int i = 0; i < n; i++) {
        printf(" ");
    }
}
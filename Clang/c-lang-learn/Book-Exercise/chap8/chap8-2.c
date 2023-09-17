#include <stdio.h>
/*
  编写一个程序，在遇到 EOF 之前，把输入作为字符流读取。程序要

  打印每个输入的字符及其相应的ASCII十进制值。
  注意，在ASCII序列中，空格字符前面的字符都是非打印字符，要特殊处理这些字符。
  如果非打印字符是换行符或制表符，则分别打印\n或\t。
  否则，使用控制字符表示法。
  例如，ASCII的1是Ctrl+A，可显示为^A。
  注意，A的ASCII值是Ctrl+A的值加上 64。其他非打印字符也有类似的关系。
  除每次遇到换行符打印新的一行之外，每行打印10值。（注意：不同的操作系统其控制字符可能不同。
 */
int main(void)
{
    int ch;
    int count = 0;

    printf("Input flow: \n");
    while ((ch = getchar()) != EOF) {
        if (ch >= ' ')  // >= 32 A
            printf("|%c %4d|", ch, ch);
        else if (ch == '\n')
            printf("|\\n %3d|", ch);
        else if (ch == '\t')
            printf("|\\t %3d|", ch);
        else  // ascii control characters
            printf("|^%c %3d|", ch + 64, ch);

        if (++count % 10 == 0 || ch == '\n')
            printf("\n");
    }
    printf("\n--------------------------\nDone!");

    return 0;
}
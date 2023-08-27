#include <stdio.h>
/*
  编写一个程序，提示用户输入一个整数，然后打印从该数到比该数大
10的所有整数（例如，用户输入5，则打印5～15的所有整数，包括5和
15）。要求打印的各值之间用一个空格、制表符或换行符分开。
 */

int main(void)
{
    int num, end;
    int i = 0;
    printf("Enter a num: ");
    scanf("%d", &num);

    // end = num + 10;

    // while (num <= end) {
    //     printf("\n %d", num);
    //     num++;
    // }

    while (i <= 10) {
        printf("\n %d", num + i);
        i++;
    }

    return 0;
}
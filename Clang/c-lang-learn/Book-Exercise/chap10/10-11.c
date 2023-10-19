#include <stdio.h>
/*
编写一个程序，声明一个int类型的3×5二维数组，并用合适的值初始
化它。该程序打印数组中的值，然后各值翻倍（即是原值的2倍），并显示
出各元素的新值。编写一个函数显示数组的内容，再编写一个函数把各元素
的值翻倍。这两个函数都以函数名和行数作为参数。
 */

void print_arr(int target[], int len)
{
    for (int i = 0; i < len; i++)
        printf("%d,", target[i]);
    putchar('\n');
}

void double_ar(int row, int col, int ar[row][col])
{
    for (int r = 0; r < row; r++) {
        printf("Before: ");
        print_arr(ar[r], col);
        for (int c = 0; c < col; c++) {
            ar[r][c] *= 2;
        }
        printf("After: ");
        print_arr(ar[r], col);
    }
}

int main(void)
{
    int ar[3][5] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};

    double_ar(3, 5, ar);
    return 0;
}
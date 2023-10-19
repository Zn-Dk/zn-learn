#include <stdio.h>
/*

  编写一个程序，初始化一个double类型的二维数组，使用编程练习2中
  的一个拷贝函数把该数组中的数据拷贝至另一个二维数组中
  （因为二维数组是数组的数组，所以可以使用处理一维数组的拷贝函数来处理数组中的每个
  子数组）。
 */

/** 打印数组 - 一维 */
void print_arr(double* target, int len)
{
    for (int i = 0; i < len; i++)
        printf("%.1lf,", target[i]);
    putchar('\n');
}

/** 复制数组 - 一维 */
void copy_ar(double* target, const double* source, int len)
{
    // 使用带指针表示法和指针递增的函数进行第2份拷贝。
    int idx = 0;
    while (idx++ < len) {
        *target++ = *source++;
        // target++;
    }
}

/*
    10-9 的编程练习与本例函数达到的目的相同:
    编写一个程序，初始化一个double类型的3×5二维数组，使用一个处理
    变长数组的函数将其拷贝至另一个二维数组中。
    还要编写一个以变长数组为形参的函数以显示两个数组的内容。
    这两个函数应该能处理任意N×M数组
    （如果编译器不支持变长数组，就使用传统C函数处理N×5的数组）。
 */

void copy_2d(int row, int col, double source[row][col], double target[row][col])
{
    for (int r = 0; r < row; r++)
        copy_ar(target[r], source[r], col);
}

void print_2d(int row, int col, double ar[row][col])
{
    for (int r = 0; r < row; r++) {
        print_arr(ar[r], col);
        putchar('\n');
    }
}

int main(void)
{
    double source[3][5] = {
        {1.1, 1.2, 1.3, 1.4, 1.5},
        {2.2, 2.2, 2.3, 2.4, 2.5},
        {3.3, 3.2, 3.3, 3.4, 3.5},
    };

    double target[3][5];

    copy_2d(3, 5, source, target);

    print_2d(3, 5, target);

    return 0;
}
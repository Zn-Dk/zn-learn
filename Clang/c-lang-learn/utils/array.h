#include <stdio.h>
#include <stdlib.h>

/** ---------- 一维数组  ---------- */

void print_arr(double target[], int len)
{
    putchar('[');

    for (int i = 0; i < len; i++) {
        printf("%.1lf", target[i]);
        if (i != len - 1)
            printf(", ");
    }

    putchar(']');
}

void copy_ar(double target[], const double source[], int len)
{
    for (int i = 0; i < len; i++)
        target[i] = source[i];
}

void copy_ar2(double* target, const double* source, int len)
{
    // 使用带指针表示法和指针递增的函数进行第2份拷贝。
    int idx = 0;
    while (idx++ < len) {
        *target++ = *source++;
        // target++;
    }
}

void copy_ar3(double* target, const double* start, const double* end)
{
    // 以目标数组名、源数组名和指向源数组最后一个元素后面的元素的指针。
    while (start < end) {
        *target++ = *start++;
    }
}

// 返回储存在int类型数组中的最大值
int max_in_ar(int* ar, int len)
{
    int tmp;
    for (int i = 0; i < len; i++) {
        tmp = ar[i] > tmp ? ar[i] : tmp;
    }

    return tmp;
}

// 返回储存在int类型数组中的最大值下标
int max_index(int* ar, int len)
{
    int max_idx;

    for (int i = 0; i < len; i++, ar++) {
        // 使用指针记录下标
        if (*(ar + i) > *(ar + max_idx)) {
            max_idx = i;
        }
    }
    return max_idx;
}

// 倒转1. 修改原数组
void reverse(double ar[], int len)
{
    double tmp;
    for (int i = 0; i < (len / 2); i++) {
        tmp             = ar[i];
        ar[i]           = ar[len - i - 1];
        ar[len - i - 1] = tmp;
    }
}

// 倒转2. 返回新数组 (高级用法)
double* to_reverse(double ar[], int len)
{
    double* tmp = (double*)malloc(len * sizeof(double));  // 分配内存;
    for (int i = 0; i < len; i++) {
        tmp[i] = ar[len - i - 1];
    }
    return tmp;
}

/** ---------- 二维数组  ---------- */
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
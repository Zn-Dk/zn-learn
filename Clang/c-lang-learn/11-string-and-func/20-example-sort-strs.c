#include "sget.h"
#include <ctype.h>
#include <stdio.h>
#include <string.h>

#define ROWS 5
#define SIZE 50

/**
 * 选择排序算法
 * type 1 desc, -1 asc
 */
void strsort(char* pts[], int size, int type)
{
    int   sort_type = type;
    char* tmp;

    for (int i = 0; i < size - 1; i++)
        for (int j = i + 1; j < size; j++) {
            // 倒序时,为后面比前面 大于 0 交换, 正序则为小于 0 交换
            if (sort_type * strcmp(pts[j], pts[i]) > 0) {
                tmp    = pts[i];
                pts[i] = pts[j];
                pts[j] = tmp;
            }
        }
}

void print_str_arr(char* arr[], int count)
{
    for (int r = 0; r < count; r++)
        puts(arr[r]);

    putchar('\n');
}

int main(void)
{
    char source[ROWS][SIZE];
    // 使用指针变量去排序(更改指针指向) 而不是修改原数组
    char* pts[ROWS];
    int   ct = 0;

    printf("Enter up to %d rows of string, press Enter on empty row to finished\n", ROWS);

    while (ct < ROWS && s_gets(source[ct], SIZE)) {
        pts[ct] = source[ct];
        ct++;
    }

    printf("Entered %d rows, now logging out the sorted(desc) strings: \n", ct);
    // strsort
    strsort(pts, ROWS, -1);
    print_str_arr(pts, ct);

    /*
      Enter up to 5 rows of string, press Enter on empty row to finished
      USA
      China
      Japan
      Canada
      The UK
      Entered 5 rows, now logging out the sorted(desc) strings:
      USA
      The UK
      Japan
      China
      Canada
     */
    return 0;
}
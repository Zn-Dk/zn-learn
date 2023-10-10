#include <stdio.h>

#define SIZE 4
#define LEN 20

void print_pt_arr(int size, char** arr)
{
    char* pt;
    for (int i = 0; i < size; i++) {
        // pt = *arr;
        // while (*pt != '\0')
        //     putchar(*pt++);
        // *arr++;
        // putchar('-');

        puts(*arr++);
    }

    putchar('\n');
}

void print_arr(int row, int col, char (*arr)[col])
{
    for (int r = 0; r < row; r++)
        puts(*arr++);

    putchar('\n');
}

int main(void)
{
    // 字符串数组

    // 1. 数组形式
    // 我们无法这样声明一个字符串数组: st_array[SIZE][], 让元素数量固定而值的长度不定
    // 因此所有数组形式的字符串数组都是矩形数组, 元素长度相同
    char st_array[SIZE][LEN] = {
        "aaa",
        "bbb",
        "ccc",
        "ddd",
    };

    print_arr(SIZE, LEN, st_array);

    // 2. 指针形式

    // 指针形式则非常灵活高效, 能够声明不同长度的字符串数组
    // 因为本质上是用 SIZE 个指针变量存储字符串字面量
    char* pt_str[SIZE] = {
        "aaa",
        "bbbbbb",
        "cc",
        "d",
    };
    print_pt_arr(SIZE, pt_str);

    return 0;
}
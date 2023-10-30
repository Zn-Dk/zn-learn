#include <ctype.h>

void print_str_arr(char* arr[], int count)
{
    for (int r = 0; r < count; r++)
        puts(arr[r]);

    putchar('\n');
}

void str_toupper(char* str)
{
    do {
        *str = toupper(*str);
    } while (*str++);
}

void str_tolower(char* str)
{
    do {
        *str = tolower(*str);
    } while (*str++);
}

/**
 * 字符串排序 - 选择排序算法
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

char* to_reverse(const char* str)
{
    char* temp = (char*)malloc(strlen(str) * sizeof(char));

    for (int i = 0; i < strlen(str); i++) {
        temp[i] = str[strlen(str) - i - 1];
    }

    return temp;
}
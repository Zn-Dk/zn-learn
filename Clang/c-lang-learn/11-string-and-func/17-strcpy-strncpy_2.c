#include "sget.h"
#include <stdio.h>
#include <string.h>

#define ROW 2
#define INPUT_SIZE 30
#define DATA_SIZE 10

#define PREFIX "astro"

void print_str_arr(int row, int size, char str_ar[row][size])
{
    putchar('[');

    for (int i = 0; i < row; i++) {
        fputs(str_ar[i], stdout);
        if (i != row - 1)
            printf(", ");
    }

    putchar(']');
}

int main(void)
{
    char data[ROW][DATA_SIZE];
    char temp[INPUT_SIZE];
    int  idx = 0;

    printf("Enter up to %d rows of word, start with prefix: \"%s\"\n", ROW, PREFIX);

    while (idx < ROW && sgets(temp, INPUT_SIZE)) {
        if (strncmp(temp, PREFIX, strlen(PREFIX)))
            printf("Your entered: %s, is not qualified. try again!\n", temp);
        else {
            // strcpy(data[idx], temp); 不够安全
            // 使用 strncpy
            // 手动补上 \0, 因为输入 INPUT_SIZE 大于 DATA_SIZE,
            // 如果是 DATA_SIZE, temp[DATA_SIZE] 最后一位可能是非空字符导致溢出
            strncpy(data[idx], temp, DATA_SIZE - 1);
            data[idx][DATA_SIZE] = '\0';
            idx++;
        }
    }

    print_str_arr(ROW, DATA_SIZE, data);
    /*
        Enter up to 5 rows of word, start with prefix: "astro"
        astrol
        astroid
        autocue
        Your entered: autocue, is not qualified. try again!
        astro
        astroia
        astrolen
        [astrol, astroid, astro, astroia, astrolen]
    */
    return 0;
}
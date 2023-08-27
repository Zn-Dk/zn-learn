#include <stdio.h>

int main(void)
{
    int start, end, current;

    printf("Enter start and end number range like this (start,end): \n ");
    scanf("%d,%d", &start, &end);

    current = start;

    printf("\t| current |\n");

    // 下面这种写法在 C 也很常见, 因为将判断和递增操作(不论是前缀还是后缀)放在一起, 更不容易忘记
    // while (current++ < end) {

    // 不过要注意你需要打印的值是否是在自增之后的, 以及结束时机 (比如这里就只能放到后面)
    while (current <= end) {
        printf("\t| %-7d |\n", current);
        current++;
    }

    printf("---- DONE ----");

    return 0;
}
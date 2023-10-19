#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// 编写一个函数，返回储存在int类型数组中的最大值，并在一个简单的程序中测试该函数
int max(int* ar, int len)
{
    int tmp;
    for (int i = 0; i < len; i++) {
        tmp = ar[i] > tmp ? ar[i] : tmp;
    }

    return tmp;
}

void print_arr(int target[], int len)
{
    putchar('[');

    for (int i = 0; i < len; i++) {
        printf("%d", target[i]);
        if (i != len - 1)
            printf(", ");
    }

    putchar(']');
}

#define SIZE 6

int main(void)
{
    int test[SIZE];

    srand(time(NULL));  // 随机时钟保证rand 每次运行程序结果不同

    for (int i = 0; i < SIZE; i++)
        test[i] = rand() % 100;

    print_arr(test, SIZE);
    putchar('\n');
    printf("max number in test is %d", max(test, SIZE));
    /*
        [92, 49, 4, 92, 85, 84]
        max number in test is 92
     */
    return 0;
}
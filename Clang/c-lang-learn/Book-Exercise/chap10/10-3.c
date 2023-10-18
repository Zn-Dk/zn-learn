#include <stdio.h>

// 编写一个函数，返回储存在int类型数组中的最大值，并在一个简单的程序中测试该函数
int max(int* ar, int len)
{
    int tmp;
    for (int i = 0; i < len; i++) {
        tmp = ar[i] > tmp ? ar[i] : tmp;
    }

    return tmp;
}

int main(void)
{
    int test[6] = {1, 3, 6, 2, 13, 4};

    printf("max number in test is %d", max(test, 6));

    return 0;
}
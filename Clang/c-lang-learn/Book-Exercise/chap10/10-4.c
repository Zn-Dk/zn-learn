#include <stdio.h>

// 编写一个函数，返回储存在double类型数组中最大值的下标，并在一
// 个简单的程序中测试该函数
int max_index(int* ar, int len)
{
    int max, idx;

    for (int i = 0; i < len; i++, ar++) {
        if (*ar > max) {
            max = *ar;
            idx = i;
        }
    }
    return idx;
}

int main(void)
{
    int test[6] = {1, 3, 6, 2, 13, 4};

    printf("index of max number in test is %d", max_index(test, 6));

    return 0;
}
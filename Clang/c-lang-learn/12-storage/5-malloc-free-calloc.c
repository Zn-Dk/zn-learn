#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
    // malloc();

    double* ptd;
    ptd    = (double*)malloc(30 * sizeof(double));  // 手动分配一个 double 数组空间
    ptd[0] = 1.1;
    ptd[1] = 1.2;
    printf("ptd[0] = %.2f, ptd[1] = %.2f, ptd[2] = %.2f\n", ptd[0], ptd[1], ptd[2]);

    char* ptc = (char*)malloc((50 + 1) * sizeof(char));  // 分配 50 size 的字符串(计算\0)
    strcpy(ptc, "Alphabet");
    puts(ptc + 2);

    // free 与 malloc 配合使用, 来释放变量内存
    // 有些操作系统可以自动在结束后清理内存, 但有的不一定, 强烈推荐自行 free

    // ptd++;  // 如果移动了指针则会报错 munmap_chunk(): invalid pointer
    free(ptd);
    free(ptc);

    // calloc 与 malloc 类似(参数不同)
    int* pti = calloc(10, sizeof(int));
    pti[1]   = 123;
    free(pti);

    return 0;
}
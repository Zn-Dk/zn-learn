#include <stdio.h>

int main(void)
{
    // 声明 二维数组
    int table[4][2] = {{1, 3}, {5, 7}, {2, 4}, {6, 8}};

    // 打印探究指针的关系

    printf("table = %p, table[0] = %p\n", table, table[0]);
    // table = 0x7ffcca0c40e0, table[0] = 0x7ffcca0c40e0
    // 结论1. table 的地址指向 table 的第一个元素 (含两个int的数组), *table == table[0]


    printf("*table = %p, *table + 1 = %p, table + 1 = %p\n", *table, *table + 1, table + 1);
    // *table = 0x7ffcca0c40e0, *table + 1 = 0x7ffcca0c40e4, table + 1 = 0x7ffcca0c40e8
    printf("table[0] = %p, table[0] + 1 = %p\n", table, table[0] + 1);
    // table[0] = 0x7ffcca0c40e0, table[0] + 1 = 0x7ffcca0c40e4
    // 结论2. *table + 1 是第一维下移动到第二维数组的 + 1位元素, table + 1 是移动到下一个二维数组


    printf("table[0] + 2 = %p, *table + 2 = %p\n", table[0] + 2, *table + 2);
    // table[0] + 2 = 0x7ffcca0c40e8, *table + 2 = 0x7ffcca0c40e8
    printf("*(table[0] + 2) = %d, *(*table + 2) = %d\n", *(table[0] + 2), *(*table + 2));
    // *(table[0] + 2) = 5, *(*table + 2) = 5
    // 结论3. 指针递增超过数组容量, 地址移向下一个数组的首位(验证多维数组在内存分配的连续性)


    printf("*table[0] = %d, table[0][0] = %d, **table = %d\n", *table[0], table[0][0], **table);
    // *table[0] = 1, table[0][0] = 1, **table = 1
    // 结论4. 对*table[0] 进行解引用 就得到了第二维数组的首位
    // 结论5. **table 两次解引用和 table[0][0] 作用相同, 都是到了第二维数组的首位


    printf("table[2][1] = %d, *(*(table + 2) + 1) = %d", table[2][1], *(*(table + 2) + 1));
    // table[2][1] = 4, *(*(table + 2) + 1) = 4
    // 上面演示了如何用指针取得 二维数组的值
    return 0;
}
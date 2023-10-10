#include <stdio.h>

int main(void)
{
    int table[4][2] = {{1, 3}, {5, 7}, {2, 4}, {6, 8}};

    // 创建一个指向二维数组的指针
    // 需要先将*与变量用圆括号包裹, 否则是声明数组
    int(*ptr)[2];

    ptr = table;

    printf("ptr = %p, table = %p \n", ptr, table);
    // ptr = 0x7fff7799df10, table = 0x7fff7799df10

    printf("*ptr = %p, *table = %p , table[0] = %p \n", *ptr, *table, table[0]);
    // *ptr = 0x7fff7799df10, *table = 0x7fff7799df10 , table[0] = 0x7fff7799df10 

    printf("ptr = %p, ptr + 1 = %p \n", ptr, ptr + 1);
    // ptr = 0x7fff7799df10, ptr + 1 = 0x7fff7799df18 

    printf("*ptr = %p, *ptr + 1 = %p \n", *ptr, *ptr + 1);
    // *ptr = 0x7fff7799df10, *ptr + 1 = 0x7fff7799df14 

    printf("**ptr = %d, *ptr[0] = %d, ptr[0][0] = %d, table[0][0] = %d\n", **ptr, *ptr[0],
            ptr[0][0], table[0][0]);
    // **ptr = 1, *ptr[0] = 1, ptr[0][0] = 1, table[0][0] = 1
    
    printf("ptr[1][1] = %d, *(*(ptr + 1) + 1) = %d\n", ptr[1][1], *(*(ptr + 1) + 1));
    // ptr[1][1] = 7, *(*(ptr + 1) + 1) = 7
    return 0;
}
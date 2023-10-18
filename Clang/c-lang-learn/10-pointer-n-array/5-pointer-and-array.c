#include <stdio.h>

int main(void)
{
    // 创建数组
    int nums[] = {1, 2, 3, 4, 5, 6};
    // 创建数组指针 (赋值的时候不需要加 &)
    int* pta = nums;

    printf("Pointer address %p, value %d\n", pta, *pta);
    // Pointer address 0x7ffccd6c1160, value 1

    for (int i = 0; i < sizeof nums / sizeof *pta; i++) {
        // 1) pta + i -> 地址后移 sizeof arr[n] -> sizeof int -> 4
        // 2) *(pta + i) == nums[i]
        printf("Index:%d, Pointer:%p, Value: %d\n", i, pta + i, *(pta + i));
        // *(pta + i) *=  2; 用指针修改值
    }

    /*
      Index:0, Pointer:0x7ffccd6c1160, Value: 1
      Index:1, Pointer:0x7ffccd6c1164, Value: 2
      Index:2, Pointer:0x7ffccd6c1168, Value: 3
      Index:3, Pointer:0x7ffccd6c116c, Value: 4
      Index:4, Pointer:0x7ffccd6c1170, Value: 5
      Index:5, Pointer:0x7ffccd6c1174, Value: 6
     */

    return 0;
}
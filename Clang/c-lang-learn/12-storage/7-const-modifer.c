#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    // const 限定符, 限定变量不能通过通过赋值/递增、递减修改

    // 普通变量, 用法易懂,不再解释
    const int i    = 1;
    int       ar[] = {1, 2, 3, 4};

    // 指针变量 case 1
    const int* nums = (int*)calloc(5, sizeof(int));
    // nums[1]         = 2;  // ❌
    nums++;     // ✅
    nums = ar;  // ✅ 这个指针变量改变指向, 只是不能改变指向的值
    printf("%d\n", nums[2]);

    // 指针变量 case 2
    int* const nums2 = (int*)calloc(5, sizeof(int));
    // nums2++;  // ❌
    nums2[2] = 42;  // ✅
    printf("%d\n", nums2[2]);

    // 指针变量 case 3 不能修改值和指针
    const int* const nums3 = (int*)calloc(5, sizeof(int));
    // nums3++;  // ❌
    // nums3[2] = 42;  //❌

    /*
      const 放 * 左侧任意位置, 代表指针指向的数据不可改变
      const 放 * 右侧任意位置, 代表指针本身不可改变
     */
    return 0;
}
#include <stdio.h>

#define SIZE 6

unsigned sum_pt(int* start, int* end);

int main(void)
{
    // 使用指针表示法 在函数中传递数组
    int nums[SIZE] = {1, 2, 3, 4, 5, 6};
    // 数组指向指针 为数组第一位元素 (注意数组整体赋值指针变量时, 不需要 &)
    int* ptr_start = nums;
    //  注意index 是从 0开始的, 将指针指向实际的数组结尾的后一位(C语言保证了该指针有效)
    int* ptr_end = ptr_start + SIZE;

    printf("Total of array nums: %u", sum_pt(ptr_start, ptr_end));
    // Total of array nums: 21

    return 0;
}

// 因为 start end 都指向同一数组, 我们不再需要传递数组变量
// 只需要移动指针就可以遍历数组的值
unsigned sum_pt(int* start, int* end)
{
    unsigned sum = 0;

    // 指针地址本身也可以做关系运算
    while (start < end) {
        // sum += *start;
        // start++;

        // 进一步简化
        // sum += *start++; 等价
        sum += *(start++);
    }

    return sum;
}
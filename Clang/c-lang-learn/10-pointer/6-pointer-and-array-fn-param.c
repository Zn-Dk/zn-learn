#include <stdio.h>

// 声明一个统计数组之和的函数
// 以下两个声明都是等价的, 挑选任意的都可以, 只不过数组形式的只能用在函数形参中
unsigned sum(int* arr, int size);  // 指针形式
// unsigned sum(int arr[], int size);  // 数组形参形式

// 很可惜 C 语言如果希望快捷获取数组的长度, 需要通过定义宏来实现
// 因为函数只能接收 arr 的指针变量, 无法得到函数的实际大小
// 我们这样定义
#define ARR_SIZE(arr) sizeof arr / sizeof(arr[0])

int main(void)
{
    // 在 4 中知道 数组元素与指针变量的关系
    // 那么如何在函数中传递数组呢

    int nums[] = {1, 2, 3, 4, 5, 6};

    printf("length of nums: %zd\n", ARR_SIZE(nums));
    // length of nums: 6

    printf("Sums of nums array: %u", sum(nums, ARR_SIZE(nums)));
    // Sums of nums array: 21
    return 0;
}

// 由外部传入函数长度
unsigned sum(int* arr, int size)
{
    unsigned sum;
    printf("Array pointer has sizeof %zd Bytes\n", sizeof arr);
    printf("Array's value has sizeof %zd Bytes\n", sizeof *arr);
    // Array pointer has sizeof 8 Bytes <- 指针变量的大小是 8 字节
    // Array's value has sizeof 4 Bytes <- 这是一个 int/long

    for (int i = 0; i < size; i++) {
        // 已知 *(arr + i) == arr[i] 所以可以直接使用
        sum += arr[i];
    }

    return sum;
}
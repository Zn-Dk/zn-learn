#include <stdio.h>

int main(void)
{
    // 变长数组
    // 限制1. 无法在声明中初始化
    // 限制2. 无法实现 static 和 extern 说明符
    // 限制3. 变长数组只是可以在声明使用变量, 而非创建后修改维度
    int rows = 2;
    int cols = 2;

    int arr[rows][cols];  // 声明变长数组
    int(*ptr)[cols];
    ptr       = arr;
    arr[1][0] = 1;
    arr[1][1] = 2;

    printf("arr[1]: {%d, %d}\n", arr[1][0], arr[1][1]);
    rows      = 3;
    cols      = 3;
    arr[1][2] = 3;
    // 这是个不能被编译器检查出来的问题, 其实就相当于 *(*(ptr + 1) + 2) = 3 ,
    // 数组没有变化, 因为数组值在内存上是连续的, 你只不过是覆盖了第二个二维数组的第一个值, 不信你解开试试下面的语句;
    // *(*(ptr + 1) + 2) = 3;
    printf("Now, change VLA arr to %d rows, %d cols, and let 'arr[1][2] = 3' \n", rows, cols);

    printf("arr[1][2] = %d, arr[2][0] = %d\n", arr[1][2], arr[2][0]);
    // arr[1][2] = 3, arr[2][0] = 3
    // 打印的结果, 也表明了 VLA 在声明后 数组本身没有改变

    printf("In conclusion: VLA doesn't mean you can change the dimension\n"
           "of the array after initialization, but to use a variable to define it.");
    return 0;
}
#include <stdio.h>

int main(void)
{
    // 已知 变量 foo, 我们使用指针运算符将 foo 的内存地址指向一个 "指针变量" ptr
    int foo = 100;
    // 声明指针变量 类型和变量名之间加 * (空格一般在声明的时候加, 或者*紧跟类型 区分赋值解引用*)
    // int * ptr || int* ptr
    int* ptr = &foo;

    // 注意连续声明的时候 只有第一个变量是指针变量
    int *ptr1, ptr2, ptr3;
    // 因此要么写成
    int *ptr1, *ptr2, *ptr3;
    // 要么单行声明(推荐)
    int* ptr1;
    int* ptr2;
    int* ptr3;

    // 赋值解引用 *ptr -> 拿到 foo 的值
    printf("ptr: %p, ptr value: %d", ptr, *ptr);
    // ptr: 000000000061FE14, ptr value: 100
    return 0;
}
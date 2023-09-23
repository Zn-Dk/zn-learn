#include <stdio.h>

void onion(int current, int depth);
int  main(void)
{
    onion(1, 5);
    return 0;
}

void onion(int current, int depth)
{
    // %p 指针修饰符, & 显示内存地址
    printf("[START]Current depth: %d, %p\n", current, &current);

    if (current < depth)
        onion(current + 1, depth);

    printf("[END]Current depth: %d, %p\n", current, &current);
}

/*
  递归洋葱模型:
    [START]Current depth: 1, 000000000061FE00
    [START]Current depth: 2, 000000000061FDD0
    [START]Current depth: 3, 000000000061FDA0
    [START]Current depth: 4, 000000000061FD70
    [START]Current depth: 5, 000000000061FD40
    [END]Current depth: 5, 000000000061FD40
    [END]Current depth: 4, 000000000061FD70
    [END]Current depth: 3, 000000000061FDA0
    [END]Current depth: 2, 000000000061FDD0
    [END]Current depth: 1, 000000000061FE00
    
  从这里的内存地址也看得出, 每次传入的 current 实参都是局部变量,
 */
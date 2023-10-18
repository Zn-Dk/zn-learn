#include <stdio.h>
#define SIZE 6
int main(void)
{
    int              nums[SIZE] = {1, 2, 3, 4, 5, 6};
    int*             ptr1;
    int*             ptr2;
    int*             ptr3;
    const int* const p4 = &nums[2];
    printf("*p4: %d", *p4);
    /** 赋值 */

    // 1. 数组变量赋值 (不加&)
    ptr1 = nums;
    // 2. 数组元素变量赋值 (加&)
    ptr2 = &nums[2];
    // 3. 指针对指针赋值
    ptr3 = ptr1;

    /** 取址并打印  &ptr + %p */
    printf("ptr1: %p |ptr2: %p |ptr3: %p |\n", ptr1, ptr2, ptr3);
    // ptr1: 0x7ffe225fb980 |ptr2: 0x7ffe225fb988 |ptr3: 0x7ffe225fb980 |
    printf("&ptr1: %p |&ptr2: %p |&ptr3: %p |\n", &ptr1, &ptr2, &ptr3);
    // &ptr1: 0x7ffe225fb978 |&ptr2: 0x7ffe225fb970 |&ptr3: 0x7ffe225fb968 |

    // 1. ptr1 ptr3 所指向值(即直接打印ptr)的内存地址相同, 但他们自身被分配的内存地址不同
    // 2. ptr1 ptr2 ptr3 本身的指针对象(即打印&ptr)内存地址是不变的,
    // 即便指向的值发生了改变(可以观察下面的结果)

    /** 取值(解引用) */
    printf("ptr1 value: %d |ptr2 value: %d |ptr3 value: %d |\n", *ptr1, *ptr2, *ptr3);
    // ptr1 value: 1 |ptr2 value: 3 |ptr3 value: 1 |

    /** 指针加法 */
    printf("ptr3 + 2 addr: %p , value: %d, ptr2 addr: %p\n", ptr3 + 2, *(ptr3 + 2), ptr2);
    // ptr3 + 2 addr: 0x7ffe225fb988 , value: 3, ptr2 addr: 0x7ffe225fb988
    printf("*(ptr3 + 2) == nums[2]: %d,  *(ptr3 + 2) == ptr2: %d\n", *(ptr3 + 2) == nums[2],
           ptr3 + 2 == ptr2);
    //*(ptr3 + 2) == nums[2]: 1,  *(ptr3 + 2) == ptr2: 1

    /** 指针自加减 */
    ptr1++;
    ptr2--;
    printf("after ptr1++:  ptr1: %p | *ptr1: %d, | &ptr1: %p\n", ptr1, *ptr1, &ptr1);
    // after ptr1++:  ptr1: 0x7ffe225fb984 | *ptr1: 2, | &ptr1: 0x7ffe225fb978
    printf("after ptr2--:  ptr2: %p | *ptr2: %d, | &ptr2: %p\n", ptr2, *ptr2, &ptr2);
    // after ptr2--:  ptr2: 0x7ffe225fb984 | *ptr2: 2, | &ptr2: 0x7ffe225fb970
    // ptr1 的指针值地址改变(指向下一个元素), 但是指针本身的内存地址不变

    /** reset (打印的时候值先从右往左操作) */
    printf("reset: ++ptr2: %p *ptr2: %d | --ptr1: %p *ptr1: %d\n", ptr2, *++ptr2, ptr1, *--ptr1);
    // reset: ++ptr2: 0x7ffe225fb988 *ptr2: 3 | --ptr1: 0x7ffe225fb980 *ptr1: 1

    /** 指针求差, 得到两指针之间的距离(地址/数组单元大小) */
    printf("ptr2 = %p|ptr1 = %p|ptr2 - ptr1 = %d\n", ptr2, ptr1, ptr2 - ptr1);
    // ptr2 = 0x7ffe225fb988|ptr1 = 0x7ffe225fb980|ptr2 - ptr1 = 2

    /** 比较 */
    printf("ptr2 > ptr1: %d| ptr1 == ptr3: %d\n", ptr2 > ptr1, ptr1 == ptr3);
    // ptr2 > ptr1: 1| ptr1 == ptr3: 1

    return 0;
}
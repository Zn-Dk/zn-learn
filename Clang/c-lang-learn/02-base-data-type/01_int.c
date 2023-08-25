#include <stdio.h>

int main(void)
{
    // 变量初始化 的几种方式
    int a;
    a = 1;

    int b = 2;

    int c = 3, d = 4;

    int e, f = 5;  // Bad 不好的书写方式 只初始化了 f
    printf("a: %d b: %d c: %d d: %d e: %d f: %d\n", a, b, c, d, e, f);
    // a: 1 b: 2 c: 3 d: 4 e: 56 f: 5 <- 可以看到 e 是个随机值 在很可能造成问题

    int ten = 10;
    int two = 2;
    printf("Doing it right: ");
    printf("%d minus %d is %d\n", ten, 2, ten - two);
    // Doing it right: 10 minus 2 is 8
    printf("Doing it wrong: ");
    printf("%d minus %d is %d\n", ten);  // 遗漏2个参数
    // Doing it wrong: 10 minus -1971365568 is 6414880

    return 0;
}

// 在第二行输出中，第1个%d 对应ten的值，
// 但是由于没有给后两个%d提供任何值，所以打印出的值是**内存中的任意值**
// 你可能会抱怨编译器为何不能捕获这种明显的错误，但实际上问题出在
// printf()不寻常的设计。printf()函数的参数数目不定，编译器也爱莫能助。
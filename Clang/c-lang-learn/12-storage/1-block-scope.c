#include <stdio.h>

/** C 中的块级作用域 */
int main(void)
{
    int i;
    for (int i = 0; i < 10; i++) {
        int j = i + 1;  // j 作用域开始, 仅这个作用域和子作用域

        if (i > 5) {
            int k = 3;  // k 作用域开始
            printf("i=%d,j=%d,k=%d\n", i, j, k);
        }  // k 作用域结束

        printf("i=%d,j=%d\n", i, j);
        // identifier "k" is undefined

    }  // j 作用域结束

    printf("i=%d\n");
    // identifier "j" "k" is undefined

    return 0;
}
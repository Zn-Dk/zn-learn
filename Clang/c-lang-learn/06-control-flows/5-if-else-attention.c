#include <ctype.h>
#include <stdio.h>

int main(void)
{
    int n;
    printf("Enter number: ");
    scanf("%d", &n);

    /**
     * if - else 匹配的注意事项
     * 规则是, 如果没有花括号, else 与离他最近的 if 匹配
     */


    // 如果不加花括号, else 其实是 与 n < 12 的 if 匹配
    if (n > 6) 
        if (n < 12) 
            printf("You are right");
    else
        printf("You lose");

        // n = 5 , 无输出
        // n = 8 , You are right
        // n = 16 , You lose




    // 如果需要让最外层 if else 匹配 必须加上括号(实际也推荐编写代码这样操作)
    // if (n > 6) {
    //     if (n < 12) {
    //         printf("You are right");
    //     }
    // }
    // else
    //     printf("You lose");

    return 0;
}
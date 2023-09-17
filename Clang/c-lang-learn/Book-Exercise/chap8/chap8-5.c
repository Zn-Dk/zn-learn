#include <stdbool.h>
#include <stdio.h>

/*

    修改程序清单8.4的猜数字程序，使用更智能的猜测策略。
    例如，程序最初猜50，询问用户是猜大了、猜小了还是猜对了。
    如果猜小了，那么下一次猜测的值应是50和100中值，也就是75。
    如果这次猜大了，那么下一次猜测的值应是50和75的中值，等等。
    使用二分查找（binary search）策略，如果用户没有欺骗程序，那么程序很快就会猜到正确的答案。

 */

int main(void)
{
    int  min = 0;
    int  max = 100;
    int  ch, target, middle;
    bool isFirst = true;

    printf("I will try to guess number,range [1, 100], tell me if I'm right [y]\n");
    printf("If I'm wrong, tell me the guess is lower[l] or greater[g]: \n");
    middle = (min + max) / 2;
    printf("So I guess %d, am I correct? ", middle);

    while (((ch = getchar()) != 'y')) {
        getchar();

        if (ch == 'l')
            min = middle;
        else if (ch == 'g')
            max = middle;
        else {
            printf("\nI don't know what do you mean, try again: ");
            continue;
        }

        middle = (min + max) / 2;
        printf("Now my guess range [%d, %d] How about %d?", min, max, middle);
    }

    printf("Yes, the number is %d!", middle);

    return 0;
}

/*
        I will try to guess number,range [1, 100], tell me if I'm right [y]
        If I'm wrong, tell me the guess is lower[l] or greater[g]:
        So I guess 50, am I correct? g
        Now my guess range [0, 50] How about 25?l
        Now my guess range [25, 50] How about 37?l
        Now my guess range [37, 50] How about 43?g
        Now my guess range [37, 43] How about 40?l
        Now my guess range [40, 43] How about 41?l
        Now my guess range [41, 43] How about 42?y
        Yes, the number is 42!
 */
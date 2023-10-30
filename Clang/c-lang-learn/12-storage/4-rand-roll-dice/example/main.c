#include "diceroll.h"  // 引入本地头文件
#include <time.h>      // 支持时间种子
/**
 * 本程序将根据用户输入投骰子数和面数进行
 * 输出最终的骰子结果和投掷次数
 * 合并编译:  gcc ./diceroll.c ./diceroll.h ./main.c -o ./test
 */
int main(void)
{
    int sides, dices, total;
    srand(time(0));

    puts("Enter the number of sides of dice (0 to stop)");

    while (scanf("%d", &sides) && sides > 0) {
        puts("How many dice do you want?");

        if (!scanf("%d", &dices)) {
            if (dices == EOF)
                break;

            puts("Not an integer, try again");
            while (getchar() != '\n')
                continue;

            puts("Enter the number of sides of dice");
            continue;
        }

        total = roll_dice(dices, sides);
        printf("You rolled total of %d using %d of %d-sided dice\n", total, dices, sides);
        puts("Enter the number of sides of dice (0 to stop)");
    }

    printf("The cyber_dice is rolled %d times. \n", roll_count);  // 赛博骰子总掷过的次数
    puts("Bye!");

    return 0;
}

/*
Enter the number of sides of dice (0 to stop)
6
How many dice do you want?
2
You rolled total of 4 using 2 of 6-sided dice
Enter the number of sides of dice (0 to stop)
6
How many dice do you want?
2
You rolled total of 3 using 2 of 6-sided dice
Enter the number of sides of dice (0 to stop)
6
How many dice do you want?
10
You rolled total of 33 using 10 of 6-sided dice
Enter the number of sides of dice (0 to stop)
0
The cyber_dice is rolled 14 times.
Bye!

 */
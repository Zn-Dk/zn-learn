#include "diceroll.h"

int roll_count = 0;  // 投骰子次数

static int cyber_dice(int sides)  // 定义为文件私有
{
    int roll;
    roll = rand() % sides + 1;
    roll_count++;
    return roll;
}

int roll_dice(int time, int sides)  // 公有函数
{
    int total = 0;
    if (time < 1) {
        puts("At least 1 time!");
        return -1;
    }
    if (sides < 2) {
        puts("At least 2 sides!");
        return -2;
    }

    for (int i = 0; i < time; i++)
        total += cyber_dice(sides);

    return total;
}
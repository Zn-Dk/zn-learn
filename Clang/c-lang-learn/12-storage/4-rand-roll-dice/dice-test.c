#include <stdio.h>
#include <stdlib.h>
#include <time.h>

/**
 * 赛博骰子
 * @param sides 面数, 如 6 面生成 1~6
 */
int cyber_dice(int sides)
{
    int roll;
    roll = rand() % sides + 1;
    return roll;
}

int main(void)
{
    srand(time(0));  // 必须 随机种子 time() 需要引入 time.h
    printf("%d", cyber_dice(6));

    return 0;
}
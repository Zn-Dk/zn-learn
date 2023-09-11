#include <stdio.h>

/*
    Chuckie Lucky赢得了100万美元（税后），他把奖金存入年利率8%的
    账户。在每年的最后一天， Chuckie取出10万美元。编写一个程序，计算多
    少年后Chuckie会取完账户的钱
 */

int main(void)
{
    double money = 1000000;
    int    yrs   = 0;

    do {
        money -= 100000;
        money *= 1.08;
        yrs++;
    } while (money > 0);

    printf("Spend %d years to spend out money!", yrs);
    // 21 / 18
    // 这个答案不确定, 如果是第一年期满之前先取钱 答案是 18 <-本代码解
    // 如果是先存一年满再在第二年满之前一天取钱 答案是 21

    return 0;
}
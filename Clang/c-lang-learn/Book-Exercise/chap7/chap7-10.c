#include <stdbool.h>
#include <stdio.h>

/*
    1988年的美国联邦税收计划是近代最简单的税收方案。它分为4个类
    别，每个类别有两个等级。
    下面是该税收计划的摘要（美元数为应征税的收入）：
      See page 215

    例如，一位工资为20000美元的单身纳税人，应缴纳税费
    0.15×17850+0.28×（20000−17850）美元。编写一个程序，让用户指定缴纳
    税金的种类和应纳税收入，然后计算税金。程序应通过循环让用户可以多次输入。
 */

/** case 1 单身 */
#define NOT_MARRY 1
/** case 2 户主 */
#define HOUSE_HOLDER 2
/** case 3 已婚共有 */
#define MARRY_COM 3
/** case 4 已婚离异 */
#define MARRY_DV 4

/** 一档税率 */
#define BASE_RATE 0.15
/** 二档税率 */
#define SEC_RATE 0.28
int main(void)
{
    int   cat, rate_switch_amount; // cat - 分类 | rate_switch 一档税率跳点
    float tax, salary, overflow;
    rate_switch_amount = 0;
    tax = salary = overflow = 0;

    printf("Enter your category and salary, split by | (q to exit): \n");
    printf("******************************************************************************\n");
    printf("* category: 1-not marry | 2-householder | 3-marry,common | 4-marry-divorced  *\n");
    printf("******************************************************************************\n");
    while (scanf("%d|%f", &cat, &salary) == 2) {
        switch (cat) {
            case NOT_MARRY:
                rate_switch_amount = 17850;
                break;
            case HOUSE_HOLDER:
                rate_switch_amount = 23900;
                break;
            case MARRY_COM:
                rate_switch_amount = 29750;
                break;
            case MARRY_DV:
                rate_switch_amount = 14875;
                break;

            default:
                printf("wrong input, retry!");
                break;
        }

        overflow = salary - rate_switch_amount;
        tax      = rate_switch_amount * BASE_RATE + (overflow > 0 ? overflow : 0) * SEC_RATE;

        if (tax && salary)
            printf("Your salary is $%8.2f, taxes is $%8.2f, final income is $%8.2f.\n", 
                    salary, tax, salary - tax);

        printf("Now enter again, split by | (q to exit): \n");
    }

    printf("Bye!");

    return 0;
}

/* 
    Enter your category and salary, split by | (q to exit): 
    ******************************************************************************
    * category: 1-not marry | 2-householder | 3-marry,common | 4-marry-divorced  *
    ******************************************************************************
    1|20000
    Your salary is $20000.00, taxes is $ 3279.50, final income is $16720.50.
    Now enter again, split by | (q to exit):
    1|17850
    Your salary is $17850.00, taxes is $ 2677.50, final income is $15172.50.
    Now enter again, split by | (q to exit):
    4|50000
    Your salary is $50000.00, taxes is $12066.25, final income is $37933.75.
    Now enter again, split by | (q to exit):
    q
    Bye!
 */
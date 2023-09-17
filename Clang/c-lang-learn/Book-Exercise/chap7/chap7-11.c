#include <ctype.h>
#include <stdio.h>

/*
    ABC 邮购杂货店出售的

    洋蓟售价为 2.05 美元/磅，甜菜售价为 1.15美元/磅，胡萝卜售价为 1.09美元/磅。

    在添加运费之前，100美元的订单有5%的打折优惠。

    少于或等于5磅的订单收取6.5美元的运费和包装费，5磅～20磅的订单收取14美元的运费和包装费，
    超过20磅的订单在14美元的基础上每续重1磅增加0.5美元。

    编写一个程序，在循环中用switch语句实现用户输入不同的字母时有不同的响应，
    即输入a的响应是让用户输入洋蓟的磅数，b是甜菜的磅数，c是胡萝卜的磅数，q 是退出订购。
    程序要记录累计的重量。

    1.即，如果用户输入 4 磅的甜菜，然后输入 5磅的甜菜，程序应报告9磅的甜菜。
    2.然后，该程序要计算货物总价、折扣（如果有的话）、运费和包装费。
    3.随后，程序应显示所有的购买信息：
    物品售价、订购的重量（单位：磅）、订购的蔬菜费用、订单的总费用、折扣（如果有的话）、运费和包装
    费，以及所有的费用总额。

 */

#define PZ_A 2.05f
#define PZ_B 1.15f
#define PZ_C 1.09f

#define DISCOUNT_THRESHOLD 100
#define DISCOUNT_RATE 0.05

float count_price(float weight, float price);
float count_shipping(float weight);

int main(void)
{
    char category;
    // 重量
    float weight = 0;
    float w_a, w_b, w_c, w_total;
    // 费用
    float pz_a, pz_b, pz_c, pz_total, shipping;
    float discount;
    w_a = w_b = w_c = w_total = 0;
    pz_a = pz_b = pz_c = pz_total = shipping = discount = 0;

    printf("Enter your shopping list, e.g. \"a|4\" means 4 pounds of a (q to finish shopping): \n");
    while (scanf("%c|%f", &category, &weight) == 2) {
        getchar();
        category = tolower(category);
        switch (category) {
            case 'a':
                w_a += weight;
                break;
            case 'b':
                w_b += weight;
                break;
            case 'c':
                w_c += weight;
                break;
            default:
                printf("error!");
                break;
        }
    }

    w_total  = w_a + w_b + w_c;
    pz_a     = count_price(w_a, PZ_A);
    pz_b     = count_price(w_b, PZ_B);
    pz_c     = count_price(w_c, PZ_C);
    pz_total = pz_a + pz_b + pz_c;

    shipping = count_shipping(w_total);

    // Check if has discount
    if (pz_total >= DISCOUNT_THRESHOLD) {
        discount = pz_total * DISCOUNT_RATE;
    }

    printf("Shopping Cart: \n");
    printf("-----------------------------------------------------------\n");
    printf("| category | price/pound | weight(pound) | total price($) |\n");
    printf("|   a      | $%-11.2f| $%-13.2f| $%-14.2f|\n", PZ_A, w_a, pz_a);
    printf("|   b      | $%-11.2f| $%-13.2f| $%-14.2f|\n", PZ_B, w_b, pz_b);
    printf("|   c      | $%-11.2f| $%-13.2f| $%-14.2f|\n", PZ_C, w_c, pz_c);
    printf("-----------------------------------------------------------\n");

    printf("Items Price: $%.2f(discount: $%.2f), Packaging and Shipping cost: $%.2f\n"
        "Final Price: $%.2f", pz_total, discount, shipping, pz_total - discount + shipping);

    return 0;
}

float count_price(float weight, float price)
{
    return weight * price;
}

float count_shipping(float weight)
{
    if (weight <= 5)
        return 6.5f;
    else if (weight <= 20)
        return 14.0f;
    else
        return 14.0f + (weight - 20) * 0.5;
}


/* 
Example:
            Enter your shopping list, e.g. "a|4" means 4 pounds of a (q to finish shopping): 
            a|26
            b|4
            c|40
            a|8
            q
            Shopping Cart:
            -----------------------------------------------------------
            | category | price/pound | weight(pound) | total price($) |
            |   a      | $2.05       | $34.00        | $69.70         |
            |   b      | $1.15       | $4.00         | $4.60          |
            |   c      | $1.09       | $40.00        | $43.60         |
            -----------------------------------------------------------
            Items Price: $117.90(discount: $5.89), Packaging and Shipping cost: $43.00
            Final Price: $155.01
 */
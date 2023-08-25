#include <stdio.h>

/*
    1个水分子的质量约为3.0×10^−23克。1夸脱水大约是950克。编写一个程序，提示用户输入水的夸脱数，并显示水分子的数量。
 */
int main(void)
{
    int    weight;
    short  quart_to_gram            = 950;
    double weight_of_water_molecule = 3.0e-23;
    double amount_of_water_molecule;

    printf("how many quart of water do you have: ");
    scanf("%d", &weight);

    amount_of_water_molecule = (weight * quart_to_gram) / weight_of_water_molecule;
    printf("%d quart(s) of water contains %e water-molecules", weight, amount_of_water_molecule);

    return 0;
}
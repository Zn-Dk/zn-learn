#include <stdio.h>
/*
    Daphne以10%的单利息投资了100美元（也就是说，每年投资获利相
    当于原始投资的10%）。

    Deirdre以 5%的复合利息投资了 100 美元（也就是
    说，利息是当前余额的 5%，包含之前的利息）。

    编写一个程序，计算需要多少年Deirdre的投资额才会超过Daphne，并显示那时两人的投资额。
 */
int main(void)
{
    const double MONEY    = 100;
    double       daphne_m = MONEY, deirdre_m = MONEY;
    int          yrs = 0;

    do {
        daphne_m += 0.1 * MONEY;
        deirdre_m *= 1.05;
        yrs++;
    } while (deirdre_m <= daphne_m);

    printf("It takes %d years for Deirdre's profit to exceeds Daphne's. \n", yrs);
    printf("By that time, Deirdre will gain $%.2lf, Daphne will gain $%.2lf", deirdre_m, daphne_m);

    /* 
      It takes 27 years for Deirdre's profit to exceeds Daphne's. 
      By that time, Deirdre will gain $373.35, Daphne will gain $370.00
     */

    return 0;
}
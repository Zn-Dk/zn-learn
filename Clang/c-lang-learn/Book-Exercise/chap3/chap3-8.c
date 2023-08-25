#include <stdio.h>

/*
    在美国的体积测量系统中，1品脱等于2杯，1杯等于8盎司，1盎司等
    于2大汤勺，1大汤勺等于3茶勺。编写一个程序，提示用户输入杯数，并以
    品脱、盎司、汤勺、茶勺为单位显示等价容量。思考对于该程序，为何使用
    浮点类型比整数类型更合适
 */
int main(void)
{
    float pints, cup, oc, tablespoons, teaspoons;

    printf("amount of cup? ");
    scanf("%f", &cup);

    pints       = cup / 2;
    oc          = cup * 8;
    tablespoons = oc * 2;
    teaspoons   = tablespoons * 3;

    printf("Result: \n");
    printf("\t cup(input): %.1f \n", cup);
    printf("\t pints: %.2f \n", pints);
    printf("\t oc: %.2f \n", oc);
    printf("\t tablespoons: %.2f \n", tablespoons);
    printf("\t teaspoons: %.2f \n", teaspoons);

    // amount of cup? 5
    // Result:
    //          cup(input): 5.0
    //          pints: 2.50
    //          oc: 40.00
    //          tablespoons: 80.00
    //          teaspoons: 240.00

    return 0;
}
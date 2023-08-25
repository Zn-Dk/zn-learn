#include <stdio.h>

/*
    编写一个程序，提示用户输入旅行的里程和消耗的汽油量。然后计算
    并显示消耗每加仑汽油行驶的英里数，显示小数点后面一位数字。接下来，
    使用1加仑大约3.785升，1英里大约为1.609千米，把单位是英里/加仑的值转
    换为升/100公里（欧洲通用的燃料消耗表示法），并显示结果，显示小数点
    后面 1 位数字。
    注意，美国采用的方案测量消耗单位燃料的行程（值越大越好），而欧洲则采用单位距离消耗的燃料测量方案（值越低越好）。
    使用 #define 创建符号常量或使用 const 限定符创建变量来表示两个转换系数。

 */

#define GAL_TO_L 3.785f
#define MILES_TO_KM 1.609f

int main(void)
{
    float distance, gas_cost;
    float miles_per_gal, litter_per_100km;
    printf("input distance(miles), gas_cost(gallon): ");
    scanf("%f,%f", &distance, &gas_cost);

    miles_per_gal    = distance / gas_cost;
    litter_per_100km = (100 / miles_per_gal) * (GAL_TO_L / MILES_TO_KM);

    printf("FUEL CONSUME MEASURE(US) %.1f miles/gallon \n", miles_per_gal);
    printf("FUEL CONSUME MEASURE(EU) %.1f L/100km \n", litter_per_100km);  // 建议用笔算算

    // input distance(miles), gas_cost(gallon): 35,6.5
    // FUEL CONSUME MEASURE(US) 5.4 miles/gallon
    // FUEL CONSUME MEASURE(EU) 43.7 L/100km
    return 0;
}
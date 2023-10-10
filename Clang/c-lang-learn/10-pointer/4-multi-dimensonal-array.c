#include <stdio.h>

#define MONTHS 12
#define YEARS 5
int main(void)
{
    // 多维数组的声明
    // 如计算 5 年中的某个统计数据
    // 使用二维数组 就能方便进行年维度和月维度的求和和平均
    float statistic[YEARS][MONTHS] = {
        {1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.1, 2.2},
        {2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.1, 2.2},
        {4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 2.1, 2.2},
        {5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 2.1, 2.2},
        {3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 2.1, 2.2},
    };

    float total, sub_total;
    printf("YEAR     TOTAL\n");
    for (int yr = 0; yr < YEARS; yr++) {
        for (int month = 0; month < MONTHS; month++) {
            sub_total += statistic[yr][month];
        }
        printf("202%d%10.1f\n", yr, sub_total);
        total += sub_total;
        sub_total = 0;
    }
    printf("---------------\n", total);
    printf("SUMS=%10.1f\n", total);

    /*
      YEAR     TOTAL
      2020      18.8
      2021      28.8
      2022      48.8
      2023      58.8
      2024      38.8
      ---------------
      SUMS=     194.0
     */

    return 0;
}
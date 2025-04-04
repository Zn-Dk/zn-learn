#include <stdio.h>

/* rain.c -- 计算每年的总降水量、年平均降水量和5年中每月的平均降
水量 */
#define MONTHS 12  // 一年的月份数
#define YEARS 5    // 年数

/*
  程序清单10.7 rain.c程序
  int main(void)
{
    // 用2010～2014年的降水量数据初始化数组
    const float rain[YEARS][MONTHS] = {
        {4.3, 4.3, 4.3, 3.0, 2.0, 1.2, 0.2, 0.2, 0.4, 2.4, 3.5, 6.6},
        {8.5, 8.2, 1.2, 1.6, 2.4, 0.0, 5.2, 0.9, 0.3, 0.9, 1.4, 7.3},
        {9.1, 8.5, 6.7, 4.3, 2.1, 0.8, 0.2, 0.2, 1.1, 2.3, 6.1, 8.4},
        {7.2, 9.9, 8.4, 3.3, 1.2, 0.8, 0.4, 0.0, 0.6, 1.7, 4.3, 6.2},
        {7.6, 5.6, 3.8, 2.8, 3.8, 0.2, 0.0, 0.0, 0.0, 1.3, 2.6, 5.2}};
    int   year, month;
    float subtot, total;
    printf(" YEAR RAINFALL (inches)\n");
    for (year = 0, total = 0; year < YEARS; year++) {  // 每一年，各月的降水量总和
        for (month = 0, subtot = 0; month < MONTHS; month++)
            subtot += rain[year][month];
        printf("%5d %15.1f\n", 2010 + year, subtot);
        total += subtot;  // 5年的总降水量
    }
    printf("\nThe yearly average is %.1f inches.\n\n", total / YEARS);
    printf("MONTHLY AVERAGES:\n\n");
    printf(" Jan Feb Mar Apr May Jun Jul Aug Sep Oct ");
    printf(" Nov Dec\n");
    for (month = 0; month < MONTHS; month++) {  // 每个月，5年的总降水量
        for (year = 0, subtot = 0; year < YEARS; year++)
            subtot += rain[year][month];
        printf("%4.1f ", subtot / YEARS);
    }
    printf("\n");

    return 0;
}
  修改这个程序, 使用指针进行实现
 */

int main(void)
{
    // 用2010～2014年的降水量数据初始化数组
    const float rain[YEARS][MONTHS] = {
        {4.3, 4.3, 4.3, 3.0, 2.0, 1.2, 0.2, 0.2, 0.4, 2.4, 3.5, 6.6},
        {8.5, 8.2, 1.2, 1.6, 2.4, 0.0, 5.2, 0.9, 0.3, 0.9, 1.4, 7.3},
        {9.1, 8.5, 6.7, 4.3, 2.1, 0.8, 0.2, 0.2, 1.1, 2.3, 6.1, 8.4},
        {7.2, 9.9, 8.4, 3.3, 1.2, 0.8, 0.4, 0.0, 0.6, 1.7, 4.3, 6.2},
        {7.6, 5.6, 3.8, 2.8, 3.8, 0.2, 0.0, 0.0, 0.0, 1.3, 2.6, 5.2}};
    int   year, month;
    float subtot, total;

    printf(" YEAR RAINFALL (inches)\n");

    const float(*pt_yr)[MONTHS] = rain;
    const float* pt_month;
    while (pt_yr < rain + YEARS) {  // 限制年份
        subtot   = 0;
        pt_month = *pt_yr;
        while (pt_month < *pt_yr + MONTHS) {  // 限制月份
            subtot += *pt_month;
            pt_month++;
        }

        printf("%5d %15.1f\n", 2010 + (pt_yr - rain), subtot);  // 用 pt_yr - rain 计算移动的距离
        total += subtot;                                        // 5年的总降水量
        pt_yr++;
    }
    printf("\nThe yearly average is %.1f inches.\n\n", total / YEARS);

    printf("MONTHLY AVERAGES:\n\n");
    printf(" Jan Feb Mar Apr May Jun Jul Aug Sep Oct ");
    printf(" Nov Dec\n");

    for (month = 0; month < MONTHS; month++) {  // 每个月，5年的总降水量
        for (year = 0, subtot = 0; year < YEARS; year++)
            subtot += *(*(rain + year) + month);
        // 记住指针是 先移动 year 个年份 -> 解引用至一维 -> 用 month 获取年份对应月的下标值
        printf("%4.1f ", subtot / YEARS);
    }
    printf("\n");

    return 0;
}
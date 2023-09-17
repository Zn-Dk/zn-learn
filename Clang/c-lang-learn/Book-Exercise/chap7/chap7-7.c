#include <stdio.h>

/*
      编写一个程序，提示用户输入一周工作的小时数，然后打印工资总额、税金和净收入。
      做如下假设：
      a.基本工资 = 1000美元/小时
      b.加班（超过40小时） = 1.5倍的时间
      c.税率： 前300美元为15%
              续150美元为20%
              余下的为25%
      用#define定义符号常量。不用在意是否符合当前的税法。
 */

#define BASE_SALARY_H 1000
#define BASE_TIME 40
#define OVERTIME_R 1.5
#define TAX_R_300 0.15
#define TAX_R_150 0.20
#define TAX_R_O 0.25

int main(void)
{
    int time, overtime;
    float salary;
    float tax = 0;
    time = overtime = 0;

    printf("Enter a weekday work time: ");
    scanf("%d", &time);

    salary = BASE_SALARY_H * BASE_TIME;
    overtime = time - BASE_TIME;

    if (overtime > 0) {
        salary += overtime * OVERTIME_R * BASE_SALARY_H;
    }

    tax = 300 * TAX_R_300 + 150 * TAX_R_150 + (salary - 450) * TAX_R_O;

    printf("Your salary is %.2f in total, tax %.2f, so you earn %.2f", 
            salary, tax, salary - tax);

    /* 
      Enter a weekday work time: 45
      Your salary is 47500.00 in total, tax 11837.50, so you earn 35662.50
     */
    return 0;
}
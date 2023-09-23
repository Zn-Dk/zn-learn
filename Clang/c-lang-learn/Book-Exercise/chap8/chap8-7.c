#include <ctype.h>
#include <stdio.h>

/*
    .修改第7章的编程练习8，用字符代替数字标记菜单的选项。用q代替5
作为结束输入的标记

    编写一个程序，提示用户输入一周工作的小时数，然后打印工资总额、税金和净收入。
    做如下假设：
    a.基本工资 = 1000美元/小时
    b.加班（超过40小时） = 1.5倍的时间
    c.税率： 前300美元为15%
            续150美元为20%
            余下的为25%
    用#define定义符号常量。不用在意是否符合当前的税法。

    8. 修改练习7的假设a，让程序可以给出一个供选择的工资等级菜单。使
        用switch完成工资等级选择。运行程序后，显示的菜单应该类似这样：
        *****************************************************************
        Enter the number corresponding to the desired pay rate or action:
        1) $8.75/hr  2) $9.33/hr
        3) $10.00/hr 4) $11.20/hr
        5) quit
        *****************************************************************
        如果选择 1～4 其中的一个数字，程序应该询问用户工作的小时数。程
        序要通过循环运行，除非用户输入 5。如果输入 1～5 以外的数字，程序应
        提醒用户输入正确的选项，然后再重复显示菜单提示用户输入。使用#define
        创建符号常量表示各工资等级和税率。
 */

#define BASE_TIME 40
#define OVERTIME_R 1.5f
#define TAX_R_300 0.15f
#define TAX_R_150 0.20f
#define TAX_R_O 0.25f

#define LV_1 8.75f
#define LV_2 9.33f
#define LV_3 10.00f
#define LV_4 11.20f

void flush_buffer();

int main(void)
{
    int   category, time, overtime;
    float salary, salary_per_h;
    float tax    = 0;
    salary_per_h = time = overtime = 0;

    printf("*****************************************************************\n"
           "Enter the number corresponding to the desired pay rate or action:\n"
           "a) $8.75/hr  b) $9.33/hr\n"
           "c) $10.00/hr d) $11.20/hr\n"
           "q) quit\n"
           "*****************************************************************\n");

    while ((category = getchar()) != '\n') {
        category = tolower(category);

        switch (category) {
            case 'a':
                salary_per_h = LV_1;
                break;
            case 'b':
                salary_per_h = LV_2;
                break;
            case 'c':
                salary_per_h = LV_3;
                break;
            case 'd':
                salary_per_h = LV_4;
                break;
            case 'q':
                goto done;
                break;
            // 处理错误输出
            default:
                printf("wrong category, retry: ");
                flush_buffer();
                continue;
        }

        printf("Enter a weekday work time: ");
        scanf("%d", &time);

        salary   = salary_per_h * BASE_TIME;
        overtime = time - BASE_TIME;

        if (overtime > 0) {
            salary += overtime * OVERTIME_R * salary_per_h;
        }

        tax = 300 * TAX_R_300 + 150 * TAX_R_150 + (salary - 450) * TAX_R_O;

        printf("Your salary is %.2f in total, tax %.2f, so you earn %.2f\n", 
                salary, tax,  salary - tax);

        /*
          Enter a weekday work time: 45
          Your salary is 47500.00 in total, tax 11837.50, so you earn 35662.50
         */
    }

done:
    printf("Done!\n");

    return 0;
}

void flush_buffer()
{
    while (getchar() != '\n')
        continue;
}

float calc_tax(float salary) {}
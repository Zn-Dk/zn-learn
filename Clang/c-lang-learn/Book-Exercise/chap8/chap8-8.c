#include <ctype.h>
#include <stdio.h>
/*
编写一个程序，显示一个提供加法、减法、乘法、除法的菜单。获得
用户选择的选项后，程序提示用户输入两个数字，然后执行用户刚才选择的
操作。该程序只接受菜单提供的选项。程序使用float类型的变量储存用户输
入的数字，如果用户输入失败，则允许再次输入。进行除法运算时，如果用
户输入0作为第2个数（除数），程序应提示用户重新输入一个新值。

Enter the operation of your choice:
a. add s. subtract
m. multiply d. divide
q. quit

 */
void  flush_buffer();
int   get_choice();
float get_num();

int main(void)
{
    float first_n, sec_n;
    int   choice;

    while ((choice = get_choice()) != 'q') {
        printf("Enter first number: ");
        first_n = get_num();
        printf("Enter second number: ");
        sec_n = get_num();

        choice = tolower(choice);
        switch (choice) {
            case 'a':
                printf("%.3f + %.3f = %.3f\n", first_n, sec_n, first_n + sec_n);
                break;
            case 's':
                printf("%.3f - %.3f = %.3f\n", first_n, sec_n, first_n - sec_n);
                break;
            case 'm':
                printf("%.3f * %.3f = %.3f\n", first_n, sec_n, first_n * sec_n);
                break;
            case 'd':
                // 除法 检查除数
                while (sec_n == 0) {
                    printf("Enter a number other than 0: ");
                    sec_n = get_num();
                }
                printf("%.3f / %.3f = %.3f\n", first_n, sec_n, first_n / sec_n);
                break;
            // 处理错误输出
            default:
                printf("wrong operation, retry: \n");
        }
        flush_buffer();
    }

done:
    printf("Bye.\n");

    return 0;
}

void flush_buffer()
{
    while (getchar() != '\n')
        continue;
}

int get_choice()
{
    int ch;

    do {
        printf("***********************************\n"
               "Enter the operation of your choice:\n"
               "a. add               s. subtract\n"
               "m. multiply          d. divide\n"
               "q. quit\n"
               "***********************************\n");
    } while (isspace(ch = getchar()));

    flush_buffer();

    return ch;
}

float get_num()
{
    int   ch;
    float num;
    while (scanf("%f", &num) != 1) {
        // scanf 不成功 打印用户失败的输入
        while ((ch = getchar()) != '\n')
            putchar(ch);
        printf(" is not an number. \n");

        printf("Please enter a number, such as 2.5, -1.78E8, or 3: ");
    }
    return num;
}
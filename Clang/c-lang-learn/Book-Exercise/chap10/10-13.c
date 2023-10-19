#include <stdbool.h>
#include <stdio.h>

/*
编写一个程序，提示用户输入3组数，每组数包含5个double类型的数
（假设用户都正确地响应，不会输入非数值数据）。该程序应完成下列任务。

a.把用户输入的数据储存在3×5的数组中
b.计算每组（5个）数据的平均值
c.计算所有数据的平均值
d.找出这15个数据中的最大值
e.打印结果

每个任务都要用单独的函数来完成（使用传统C处理数组的方式）。
完成任务b，要编写一个计算并返回一维数组平均值的函数，利用循环调用该函数3次。
对于处理其他任务的函数，应该把整个数组作为参数，
完成任务c和d的函数应把结果返回主调函数。

 */
void clear_buf()
{
    while (getchar() != '\n')
        continue;
}

void print_arr(double target[], int len)
{
    putchar('[');

    for (int i = 0; i < len; i++) {
        printf("%.1lf", target[i]);
        if (i != len - 1)
            printf(", ");
    }

    putchar(']');
}

bool read_input(int col, double source[col])
{
    for (int i = 0; i < col; i++) {
        if (!scanf("%lf,", &source[i])) {
            return false;  // 读取失败, 退出
        };
    }

    return true;
}

void get_data(int row, int col, double ar[row][col])
{
    bool validInput;  // 读取合法标识

    printf("Enter %d rows of %d doubles, in each row, each data is\n", row, col);
    puts("splitted by comma, when finished input, press enter to next row");
    puts("////// Example: 1.1,2.1,3.1,4.1,5.1");

    for (int r = 0; r < row; r++) {
        do {
            validInput = true;
            printf("row[%d]: ", r);
            validInput = read_input(col, ar[r]);
            clear_buf();

            if (!validInput) {
                puts("wrong input, try again!");
            }
        } while (!validInput);
        // print_arr(ar[r], col); 验证
    }
}

double arr_avg(int col, double target[col])
{
    double total = 0;
    for (int i = 0; i < col; i++)
        total += target[i];

    return total / col;
}

void get_row_avg(int row, int col, double target[row][col], double result[row])
{
    for (int i = 0; i < row; i++)
        result[i] = arr_avg(col, target[i]);
}

double arr_avg_2d(int row, int col, double target[row][col])
{
    double total;
    for (int i = 0; i < row; i++)
        for (int j = 0; j < col; j++)
            total += target[i][j];

    return total / (row * col);
}

double get_max(double* start, double* end)
{
    double max = 0;
    while (start < end) {
        max = *start > max ? *start : max;
        start++;
    }

    return max;
}

#define ROW 3
#define COL 5

int main(void)
{
    /** 数据数组 */
    double ar[ROW][COL];
    /** 行平均值 */
    double ar_row_avg[ROW];

    double all_avg, all_max;

    // a. 把用户输入的数据储存在3×5的数组中
    get_data(ROW, COL, ar);
    // b. 计算每组（5个）数据的平均值 编写一个计算并返回一维数组平均值的函数
    get_row_avg(ROW, COL, ar, ar_row_avg);
    // c.计算所有数据的平均值
    all_avg = arr_avg_2d(ROW, COL, ar);
    // d.找出这15个数据中的最大值
    all_max = get_max(*ar, &ar[ROW - 1][COL - 1]);

    puts("\n**** RESULT ****\n");
    printf("Each row's avg: ");
    print_arr(ar_row_avg, ROW);
    putchar('\n');
    printf("Avg of Data: %.2f\n", all_avg);
    printf("Maxmium of Data: %.2f\n", all_max);
    /*
    Enter 3 rows of 5 doubles, in each row, each data is
    splitted by comma, when finished input, press enter to next row
    ////// Example: 1.1,2.1,3.1,4.1,5.1
    row[0]: 1,1,2,3,5
    row[1]: 8,11,4,2,6
    row[2]: 45,7,22,1,0

    **** RESULT ****

    Each row's avg:
    2.4, 6.2, 15.0
    Avg of Data: 7.87
    Maxmium of Data: 45.00

    */
    return 0;
}